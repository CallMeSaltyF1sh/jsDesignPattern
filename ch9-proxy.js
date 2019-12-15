/**
 * 代理模式
 * 常用的有虚拟代理、缓存代理
 */
//举例：懒加载
//没加代理的图片懒加载
const loadImage = (function() {
    const imgNode = document.createElement('img')
    document.body.appendChild(imgNode)
    return {
        setSrc: (src) => {
            imgNode.src = src
        }
    }
})()
loadImage.setSrc('img.jpg')
//引入代理对象
const proxyImage = (function() {
    let img = new Image()
    img.onload = function() {
        loadImage.setSrc(this.src)
    }
    return {
        setSrc: (src) => {
            loadImage.setSrc('loading.jpg')
            img.src = src
        }
    }
})()
proxyImage.setSrc('img.jpg')