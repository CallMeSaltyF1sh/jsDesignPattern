/**
 * 享元模式
 * 运用共享技术支持大量细粒度的对象
 * 避免对象间拥有相同内容造成多余的开销
 */
//举例：接ch12中的实例，对新闻进行分页
const Flyweight = function () {
    let created = []
    function create() {
        const dom = document.createElement('div')
        document.getElementById('container').appendChild(dom)
        created.push(dom)
        return dom
    }
    return {
        getDiv: function () {
            if (created.length < 5) {
                return create()
            } else {
                const div = created.shift()
                created.push(div)
                return div
            }
        }
    }
}

let page = 0,
    num = 5,
    len = article.length
for (let i = 0; i < len; i++) {
    if (article[i]) {
        Flyweight.getDiv().innerHTML = article[i]
    }
}
//实现跳转下一页
document.getElementById('next_page').onclick = function () {
    if (len < 5) {
        return
    }
    let n = ++page * num % len
    for (let j = 0; j < 5; j++) {
        if (article[n + j]) {
            Flyweight.getDiv().innerHTML = article[n + j]
        } else if (article[n + j - len]) {
            Flyweight.getDiv().innerHTML = article[n + j - len]
        } else {
            Flyweight.getDiv().innerHTML = ''
        }
    }
}
//实现跳转上一页
document.getElementById('prev_page').onclick = function() {
    if(len < 5) {
        return
    }
    let n = --page * num
    for(let j = 0; j < 5; j++) {
        Flyweight.getDiv().innerHTML = article[j + n]
    }
}