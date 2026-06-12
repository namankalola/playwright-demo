const ExcelJs = require('exceljs');

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
    const {worksheet, workbook} = await getExcelFile(sheetName, filePath);
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


async function main() {
    const filePath = 'C:\\Users\\BAPS\\Desktop\\account.xlsx';
    const sheetName = 'Sheet1';

    await readExcelFile(sheetName, filePath, 'Graphic Design');
    await readAndReplaceInExcelFile('Graphic Design', 'Web Design', sheetName, filePath);
    await readAndReplaceInExcelFile('Web Design', 'Graphic Design', sheetName, filePath);

    await replaceValueAtCell('Graphic Design', { row: 1, column: 1 }, sheetName, filePath);
}

main().catch((err) => {
    console.error(err.message);
});
