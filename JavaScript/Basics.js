console.log('Welcome')

let a = 5
console.log(a)

console.log(typeof (a))

let b = 65.909

let c = a + b
console.log(c)

let found = false
console.log(typeof (found))
console.log(!found)

if (found)
    console.log('Found')
else
    console.log('Not Found')

let i = 0
while (i < 10) {
    i++
    console.log(i)
}

console.log('*********** Array Operations *************')
let array = [10, 35, 45, 1, 65, 150]

console.log(array)

array.push(200)
console.log(array)

array.pop()
console.log(array)

array.unshift(250)
console.log(array)

console.log(array.indexOf(100))

console.log(array.indexOf(150))

console.log(array.includes(100))

console.log(array.includes(150))

var sum = 0
for (let i = 0; i < array.length; i++) {
    sum = sum + array[i]
}
console.log(sum)


let total = array.reduce((sum, total) => sum + total, 0)
console.log("Total : " + total)

var numbers = [12, 32, 111, 434, 90, 889]
var even = []
var odd = []

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 == 0)
        even.push(numbers[i])
    else
        odd.push(numbers[i])
}

console.log('Even Numbers : ' + even)
console.log('Odd Numbers : ' + odd)

let evenFilter = numbers.filter(num => num % 2 == 0)
console.log('Even Numbers by Filter : ' + evenFilter)

let mapEven = numbers.map(num => num * 3)
console.log("Even map after multiply by 3 : "+ mapEven)

console.log(mapEven.reduce((sum, val)=>sum+val,0))

console.log(numbers.filter(num => num % 2 == 0).map(num => num * 3).reduce((sum, val)=>sum+val,0))

let colors = ["Red", "Green", "White", "Yellow", "Grey"]

colors.sort()

console.log(colors)

let date = 25
let nextdate = '31'
let diff = parseInt(nextdate) - parseInt(date)
console.log('diff: ' + diff)

let day = 'Monday is first day of week and Sunday is last day of week'

console.log("day.indexOf('day'): " + day.indexOf('day',6))

let count = 0
let index = day.indexOf('day')
while (index != -1) {
    count++
    index = day.indexOf('day', index + 1)
    console.log("index: " + index)
}
console.log("Total count of 'day' in string: " + count)