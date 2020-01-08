/**
 * Mediator 中介者模式
 * 通过中介者封装对象间的交互
 * 如MVC中的control层就是中介者
 */

 //举例
function View() {
    this.div = document.createElement('div')
    this.getDiv = function() {
        return this.div
    }
}
function Model(info) {
    this.alertInfo = function() {
        alert(info)
    }
}
function Control(view) {
    this.view = view
    this.model = new Model({
        name: 'uguess',
        desc: 'lalala'
    })
    this.init = function() {
        this.view.getDiv().onclick = function() {
            this.model.alertInfo()
        }
    }
}

new Control(new View()).init()