/**
 * 适配器模式
 * 将一个类（对象）的接口转化成另外一个接口以满足需求
 * 以解决类（对象）之间接口的不兼容问题
 */
//举例：异类框架A适配JQuery
let A = A || {}
A.g = function (id) {
    return document.getElementById(id)
}
A.on = function (id, type, fn) {
    let dom = typeof id === 'string' ? this.g(id) : id
    if (dom.addEventListener) {
        dom.addEventListener(type, fn, false)
    } else if (dom.attachEvent) {
        dom.attachEvent('on' + type, fn)
    } else {
        dom['on' + type] = fn
    }
}
A.on(window, 'load', function () {
    A.on('btn', 'click', function () {
        //do sth
    })
})
//引入JQuery改写A框架
A.g = function (id) {
    return $(id).get(0)
}
A.on = function (id, type, fn) {
    const dom = typeof id === 'string' ? $('#' + id) : $(id)
    dom.on(type, fn)
}