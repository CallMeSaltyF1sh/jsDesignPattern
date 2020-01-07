/**
 * 外观模式
 * 为一组复杂的子系统接口提供更高级的统一接口（对接口二次封装）
 * 使得对系统接口的访问更加容易
 */
//举例：添加事件
function addEvent(dom, type, fn) {
    if (dom.addEventListener) {
        dom.addEventListener(type, fn, false)
    } else if (dom.attachEvent) {
        dom.attachEvent('on' + type, fn)
    } else {
        dom['on' + type] = fn
    }
}
//兼容e.target和e.preventDefault
var getEvent = function (e) {
    return e || window.event
}
var getTarget = function (e) {
    var event = getEvent(e)
    return event.target || event.srcElement
}
var preventDefault = function (e) {
    var event = getEvent(e)
    if (event.preventDefault) {
        event.preventDefault()
    } else {
        event.returnValue = false
    }
}
