/**
 * 封装
 */
var Book = function () {
    //私有属性
    var num = 1
    //私有方法
    function checkId() { }
    //特权方法
    this.getName = function () { }
    this.getPrice = function () { }
    this.setName = function () { }
    this.setPrice = function () { }
    //公有属性
    this.id = id
    //公有方法
    this.copy = function () { }
    //构造器（初始化属性）
    this.setName(name)
    this.setPrice(price)
}
//在类之外通过prototype定义的属性方法称为共有属性|方法，在实例中可以通过this访问到
//以下两种添加方法不能混用
//方式一
Book.prototype.display = function () { }
//方式二
Book.prototype = {
    display: function () { }
}
//在类外面直接通过点定义的属性和方法称为静态共有属性|方法，只能通过类来使用
Book.isChinese = true
Book.resetTime = function () { }
Book.resetTime();
//每次创建新对象时，通过this定义的属性和方法都会重新创建
//而通过prototype访问获取的属性方法不会再次创建
var book = new Book(0, 'js设计模式', 50)
//book的_proto_属性指向Book prototype对象
//Book prototype对象的constructor属性指向Book类

/**
 * 闭包实现
 */
var Book = (function () {
    //静态私有变量
    var bookNum = 0
    //静态私有方法
    function checkBook(name) { }
    //创建类
    function _book(newId, newName, newPrice) {
        //私有变量
        var name, price
        //私有方法
        function checkId(id) { }
        //特权方法
        this.getName = function () { }
        this.getPrice = function () { }
        this.setName = function () { }
        this.setPrice = function () { }
        //公有属性
        this.id = newId
        //公有方法
        this.copy = function () { }
        //构造器（初始化属性）
        this.setName(name)
        this.setPrice(price)
    }
    //构造原型
    _book.prototype = {
        //静态公有属性
        isJSBook: true,
        //静态公有方法
        display: function () { }
    }
    return _book
})()

/**
 * 创建对象的安全模式
 */
//在创建对象时如果忘记写new就相当于在全局作用域中执行，属性和方法会被添加到window对象
var Book = function (title, time, type) {
    //判断执行过程中this是否是当前对象
    if (this instanceof Book) {
        this.title = title
        this.time = time
        this.type = type
    } else {
        return new Book(title, time, type)
    }
}


/**
 * 继承
 */

/**
 * 类式继承
 */
function SuperClass() {
    this.superValue = true
}
SuperClass.prototype.getSuperValue = function () {
    return this.superValue
}
function SubClass() {
    this.subValue = false
}
//继承父类
//复制父类构造函数内的属性和方法并将原型_proto_指向父类的原型对象
SubClass.prototype = new SuperClass()
//实例化
var instance = new SubClass()
console.log(instance instanceof SuperClass)  //true
console.log(instance instanceof SubClass)  //true
console.log(SubClass instanceof SuperClass)  //false
console.log(SubClass.prototype instanceof SuperClass)  //true
//缺点
//如果父类的公有属性是引用类型，会被子类的所有实例共用（如 Object，Array，Date，Function）
//实例化父类的时候无法对父类构造函数内的属性进行初始化（无法传参）

/**
 * 构造函数继承
 */
function SuperClass(id) {
    this.books = ['js', 'html', 'css']
    this.id = id
}
SuperClass.prototype.showBooks = function () { }
function SubClass(id) {
    //继承父类
    SuperClass.call(this, id)
}
var instance = new SubClass(1)
//缺点
//父类的原型方法不会被继承

/**
 * 组合继承
 */
function SuperClass(name) {
    //值类型共有属性
    this.name = name
    //引用类型共有属性
    this.books = ['js', 'html', 'css']
}
SuperClass.prototype.getName = function () {
    return this.name
}
function SubClass(name, time) {
    //构造函数式继承父类name属性
    SuperClass.call(this, name)
    //子类中新增共有属性
    this.time = time
}
//使用类式继承，子类原型继承父类
SubClass.prototype = new SuperClass()
var instance = new SubClass('JS Book', 2019)
//缺点
//父类构造函数调用了两遍
//子类不是父类的实例，子类的原型是父类的实例

/**
 * 原型式继承
 */
function inheritObject(o) {
    //声明一个过渡对象
    function F() { }
    //过渡对象的原型继承父对象
    F.prototype = o
    return new F()
}
var book = {
    name: 'js book'
}
var newBook = inheritObject(book)
//缺点
//与类式继承类似，引用类型属性会被共用

/**
 * 寄生式继承（对原型继承的二次封装）
 */
function createBook(obj) {
    //通过原型式继承创建新对象
    var o = new inheritObject(obj)
    //拓展新对象
    o.getName = function () {
        return name
    }
    return o
}

/**
 * 寄生组合式继承（构造函数式+寄生式）
 */
function inheritPrototype(subClass, superClass) {
    //复制父类的原型
    var p = inheritObject(superClass.prototype)
    //修正p的constructor属性
    p.constructor = subClass
    //设置子类原型
    subClass.prototype = p
}
//使用
function SuperClass(name) {
    this.name = name
    this.books = ['js', 'html', 'css']
}
SuperClass.prototype.getName = function () {
    return this.name
}
function SubClass(name, time) {
    //构造函数式继承父类name属性
    SuperClass.call(this, name)
    this.time = time
}
//寄生式继承父类原型
inheritPrototype(SubClass, SuperClass)

/**
 * 单继承 属性复制（浅拷贝）
 */
var extend = function (target, source) {
    for (let property in source) {
        target[property] = source[property]
    }
    return target
}

/**
 * 多继承 属性复制（浅拷贝）
 */
var mix = function () {
    let i = 1,
        len = arguments.length,
        target = arguments[0],
        arg
    for (; i < len; i++) {
        arg = arguments[i]
        for (let property in arg) {
            target[property] = arg[property]
        }
    }
    return target
}