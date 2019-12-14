/**
 * 原型模式
 * 将可复用的、可共享的、耗时大的从基类中提取出来放入原型中
 * 通过组合或寄生组合式将属性和方法继承下来
 */
//举例：轮播图
var LoopImages = function (imgArr, container) {
    this.imgArr = imgArr
    this.container = container
}
LoopImages.prototype = {
    createImage: function () { },
    changeImage: function () { }   //切换图片
}
//滑动切换类
var SlideLoopImg = function (imgArr, container) {
    LoopImages.call(this, imgArr, container)
}
SlideLoopImg.prototype = new LoopImages()
//重写changeImage方法
SlideLoopImg.prototype.changeImage = function () { }
//渐隐切换类
var FadeLoopImg = function (imgArr, container, arrow) {
    LoopImages.call(this, imgArr, container)
    this.arrow = arrow
}
FadeLoopImg.prototype = new LoopImages()
FadeLoopImg.prototype.changeImage = function () { }
//实例化
var fadeBanner = new FadeLoopImg([
    '0.jpg', '1.jpg', '2.jpg'
], 'slide', [
    'left.png', 'right.png'
])