/**
 * 桥接模式
 * 抽象提取公共部分，将实现和抽象连接在一起，弱化代码的耦合
 */
//举例：添加事件交互
const changeColor = (dom, color, bg) => {
    dom.style.color = color
    dom.style.background = bg
}
const spans = document.getElementsByTagName('span')
spans[0].onmouseover = () => {
    changeColor(this, '#eee', '#333')
}

//联接多个类
function Move(x, y) {
    this.x = x
    this.y = y
}
Move.prototype.run = function () { }
function Paint(color) {
    this.color = color
}
Paint.prototype.paint = function () { }
function Ball(x, y, c) {
    this.move = new Move(x, y)
    this.color = new Color(c)
}
Ball.prototype.init = function () {
    this.move.run()
    this.color.paint()
}