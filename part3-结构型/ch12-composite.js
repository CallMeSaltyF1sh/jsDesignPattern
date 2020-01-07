/**
 * 组合模式
 * 常用于创建表单等场景
 */
//举例：设计一个新闻模块
//新闻抽象类
const News = function() {
    this.children = []  //子组件容器
    this.element = null   //当前组件元素
}
News.prototype = {
    init: function() {
        throw new Error('please rewrite ur func')
    },
    add: function() {
        throw new Error('please rewrite ur func')
    },
    getElement: function() {
        throw new Error('please rewrite ur func')
    },
}

//把寄生式继承的方法搬过来
function inheritObject(o) {
    function F() { }
    F.prototype = o
    return new F()
}
function inheritPrototype(subClass, superClass) {
    var p = inheritObject(superClass.prototype)
    p.constructor = subClass
    subClass.prototype = p
}

//容器类构造函数
const Container = function(id, parent) {
    News.call(this)
    this.id = id
    this.parent = parent
    this.init()
}
inheritObject(Container, News)
Container.prototype.init = function() {
    this.element = document.createElement('ul')
    this.element.id = this.id
    this.element.className = 'news-container'
}
Container.prototype.add = function(child) {
    this.children.push(child)
    this.element.appendChild(child.getElement())
    return this
}
Container.prototype.getElement =function() {
    return this.element
}
Container.prototype.show = function() {
    this.parent.appendChild(this.element)
}

const Item = function(classname) {
    News.call(this)
    this.classname = classname || ''
    this.init()
}
inheritPrototype(Item, News)
Item.prototype.init = function() {
    this.element = document.createElement('li')
    this.element.className = this.classname
}
Item.prototype.add = function(child) {
    this.children.push(child)
    this.element.appendChild(child.getElement())
    return this
}
Item.prototype.getElement = function() {
    return this.element
}

const NewsGroup = function(classname) {
    News.call(this)
    this.classname = classname || ''
    this.init()
}
inheritPrototype(NewsGroup, News)
Item.prototype.init = function() {
    this.element = document.createElement('div')
    this.element.className = this.classname
}
Item.prototype.add = function(child) {
    this.children.push(child)
    this.element.appendChild(child.getElement())
    return this
}
Item.prototype.getElement = function() {
    return this.element
}

const ImageNews = function(url, href, classname) {
    News.call(this)
    this.url = url || ''
    this.href = href || '#'
    this.classname = classname || 'normal'
    this.init()
}
inheritPrototype(ImageNews, News)
Item.prototype.init = function() {
    this.element = document.createElement('a')
    const img = new Image()
    img.src = this.url
    this.element.appendChild(img)
    this.element.className = `image-news ${this.classname}`
    this.element.href = this.href
}
Item.prototype.add = function() {}
Item.prototype.getElement = function() {
    return this.element
}

const IconNews = function(text, href, type) {
    News.call(this)
    this.text = text || ''
    this.href = href || '#'
    this.type = type || 'video'
    this.init()
}
inheritPrototype(IconNews, News)
Item.prototype.init = function() {
    this.element = document.createElement('a')
    this.element.innerHTML = this.text
    this.element.className = `icon ${this.type}`
    this.element.href = this.href
}
Item.prototype.add = function() {}
Item.prototype.getElement = function() {
    return this.element
}

const PureNews = function(text, href) {
    News.call(this)
    this.text = text || ''
    this.href = href || '#'
    this.init()
}
inheritPrototype(PureNews, News)
Item.prototype.init = function() {
    this.element = document.createElement('a')
    this.element.innerHTML = this.text
    this.element.className = 'text'
    this.element.href = this.href
}
Item.prototype.add = function() {}
Item.prototype.getElement = function() {
    return this.element
}

//创建新闻模块
let news = new Container('news', document.body)
news.add(
    new Item('normal').add(
        new IconNews('news 0', '#', 'video')
    )
).add(
    new Item('normal').add(
        new NewsGroup('has-img').add(
            new ImageNews('img/new0.ipg', '#', 'small')
        ).add(
            new PureNews('news 1', "#")
        ).add(
            new PureNews('news 2', '#')
        )
    )
).show()