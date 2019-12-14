/**
 * 单例模式
 * 把定义的功能放在一个对象里，定义一个命名空间
 */
var A = {
    Util: {
        util_method0: function () { },
        util_method1: function () { }
    },
    Tool: {
        tool_method0: function () { },
        tool_method1: function () { }
    },
    //...others
}
A.Util.util_method0()

/**
 * 无法修改的静态变量
 */
var Conf = (function () {
    var conf = {
        MAX_NUM: 100,
        MIN_NUM: 1,
    }
    return {
        get: function (name) {
            return conf[name] ? conf[name] : null
        }
    }
})
var cnt = Conf.get('MAX_NUM')

/**
 * 惰性单例（延迟创建）
 */
var LazySingle = (function () {
    var _instance = null
    function Single() {
        return {
            publicMethod: function () { },
            publicProperty: '1.0'
        }
    }
    return function () {
        if (!_instance) {
            _instance = Single()
        }
        return _instance
    }
})()
console.log(LazySingle().publicProperty)  //1.0
