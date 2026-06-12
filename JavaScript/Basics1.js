let car = {
    drive: 'right',
    color: 'white',
    brand: 'Toyota',
    airbags: 2,
    convertible: function () {
        console.log('Convertible')
        car.convertibleDrive = true
    }
}

console.log(car)
console.log(car.color)
console.log(car['brand'])
console.log(car['airbags'])
car.breaks = 'ABS'
console.log(car)
delete car.airbags
console.log(car)

console.log('airbags' in car)

for (let key in car) {
    console.log(key + " : " + car[key])
}

console.log(car.convertible())
console.log(car)