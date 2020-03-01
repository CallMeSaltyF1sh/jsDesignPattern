/**
 * 代理模式
 * 常用的有虚拟代理、缓存代理、事件代理、保护代理
 */
//场景举例
//事件代理场景：父元素监听子元素事件
//缓存代理场景：对于复杂计算加一个计算结果的缓存
//保护代理场景：定义Proxy，设置getter、setter进行校验和拦截

//虚拟代理举例：图片懒加载
//没加代理时
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
//引入代理对象观察图片的加载情况
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