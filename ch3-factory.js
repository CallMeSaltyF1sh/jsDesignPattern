/**
 * 安全模式创建的工厂类
 */
//情景举例：为不同type的信息添加相应内容
var Factory = function (type, content) {
    if (this instanceof Factory) {
        const s = new this[type](content)
        return s
    } else {
        return new Factory(type, content)
    }
}
Factory.prototype = {
    type0: content => {
        //...codes
    },
    type1: content => {
        //...codes
    },
    //...others
}
//使用
Factory(type0, 'lalala')

/**
 * 抽象工厂模式
 */
//举例：Vehicle类
//抽象工厂方法
var VehicleFactory = (subType, superType) => {
    if (typeof VehicleFactory[superType] === 'function') {
        function F() { }
        F.prototype = new VehicleFactory[superType]();
        subType.constructor = subType
        subType.prototype = new F()
    } else {
        throw new Error('未创建该抽象类')
    }
}
//Car抽象类
VehicleFactory.Car = function () {
    this.type = 'car'
}
VehicleFactory.Car.prototype = {
    getPrice: function () {
        return new Error('抽象方法不能调用')
    },
    getSpeed: function () {
        return new Error('抽象方法不能调用')
    },
}
//Bus抽象类
VehicleFactory.Bus = function () {
    this.type = 'bus'
}
VehicleFactory.Bus.prototype = {
    getPrice: function () {
        return new Error('抽象方法不能调用')
    },
    getSpeed: function () {
        return new Error('抽象方法不能调用')
    },
}
//...others

//使用
var BMW = function (price, speed) {
    this.price = price
    this.speed = speed
}
VehicleFactory(BMW, 'Car')
BMW.prototype.getPrice = function () {
    return this.price
}
BMW.prototype.getSpeed = function () {
    return this.speed
}
