class Car {
    drive = 'right'
    color = 'white'
    brand = 'Toyota'
    airbags = 2
    convertible = function () {
        console.log('Convertible')
        car.convertibleDrive = true
    }

    get getDrive() {
        return this._convertibleDrive
    }

    setAirbags(airbags) {
        this.airbags = airbags
    }
}

let car = new Car()
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

console.log(car.getDrive)

car.setAirbags(4)
console.log(car)