const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function getExcelFile(sheetName, filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(sheetName);
    if (!worksheet) {
        throw new Error(`Worksheet '${sheetName}' was not found in '${filePath}'.`);
    }

    return { workbook, worksheet };
}

async function readExcelFile(sheetName, filePath, searchValue) {
    let position = { row: -1, column: -1 };
    const { worksheet } = await getExcelFile(sheetName, filePath);
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            // const searchValue = 'Madhurya website';
            if (cell.value === searchValue) {
                position = { row: rowNumber, column: colNumber };
                console.log(`Found '${searchValue}' at Row ${rowNumber}, Column ${colNumber}`);
            }
        });
    });


    return position;
}

async function replaceValueAtCell(value, position, sheetName, filePath) {
    const { worksheet, workbook } = await getExcelFile(sheetName, filePath);
    const cell = worksheet.getCell(position.row, position.column);
    cell.value = value;
    await workbook.xlsx.writeFile(filePath);
    console.log(`Updated row ${position.row}, column ${position.column} in the Excel file.`);
}

async function readAndReplaceInExcelFile(searchValue, replaceValue, sheetName, filePath) {

    const { workbook, worksheet } = await getExcelFile(sheetName, filePath);
    let found = false;
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            // const searchValue = 'Madhurya website';
            if (cell.value === searchValue) {
                found = true;
                console.log(`Found '${searchValue}' at Row ${rowNumber}, Column ${colNumber}`);
                cell.value = replaceValue;
            }
        });
    });

    if (!found) {
        console.log(`'${searchValue}' was not found in the Excel file.`);
        return;
    }

    await workbook.xlsx.writeFile(filePath);
    console.log(`Replaced '${searchValue}' with '${replaceValue}' in the Excel file.`);
}

test("Download File", async ({ page }) => {

    const searchValue = 'Mango';
    const replaceValue = 350;
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    await download.saveAs('./downloads/download.xlsx');
    // await replaceValueAtCell('Mango', '350', 'Sheet1', './downloads/download.xlsx');
    const position = await readExcelFile('Sheet1', './downloads/download.xlsx', searchValue);
    await replaceValueAtCell(replaceValue, { row: position.row, column: position.column + 2 }, 'Sheet1', './downloads/download.xlsx');
    // await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles('./downloads/download.xlsx');

    await expect(page.getByText('Updated Excel Data Successfully.')).toBeVisible();

    console.log('File uploaded successfully.');

    const searchText = page.getByText(searchValue);
    const updatedRow = await page.getByRole('row').filter({ has: searchText });
    await expect (updatedRow.locator('#cell-4-undefined')).toContainText(replaceValue.toString());

});
