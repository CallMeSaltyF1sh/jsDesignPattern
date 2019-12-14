//实现一个验证表单的功能

/**
 * 用对象收编变量
 */
var CheckObject = {
    checkName: function () { },
    checkEmail: function () { },
    checkPassword: function () { }
};
/**
 * 另一种形式
 */
var CheckObject = function () { }
CheckObject.checkName = function () { }
CheckObject.checkEmail = function () { }
CheckObject.checkPassword = function () { }

/**
 * 在调用时返回对象
 */
var CheckObject = function () {
    return {
        checkName: function () { },
        checkEmail: function () { },
        checkPassword: function () { }
    }
}
var obj = CheckObject();
obj.checkEmail();

/**
 * 类也可以
 */
var CheckObject = function () {
    this.checkName = function () { }
    this.checkEmail = function () { }
    this.checkPassword = function () { }
}
var obj = new CheckObject();
obj.checkName()

/**
 * 通过原型链创建
 */
var CheckObject = function () { }
CheckObject.prototype = {
    checkName: function () { },
    checkEmail: function () { },
    checkPassword: function () { }
}
/**
 * 可以这样简化调用
 */
CheckObject.prototype = {
    checkName: function () {
        //...codes
        return this
    },
    checkEmail: function () {
        //...codes
        return this
    },
    checkPassword: function () {
        //...codes
        return this
    }
}
var newObj = new CheckObject();
newObj.checkName().checkEmail().checkPassword()

/**
 * 给函数的祖先添加addMethod
 */
Function.prototype.addMethod = function (name, fn) {
    this.prototype[name] = fn
    return this
}
var Methods = function () { }
Methods.addMethod('checkName', function () {
    //...codes
}).addMethod('checkEmail', function () {
    //...codes
})
var m = new Methods();
m.checkEmail()