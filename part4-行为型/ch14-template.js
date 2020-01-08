/**
 * Template Method 模板方法模式
 * 父类中定义结构骨架，子类重新定义某些实现步骤
*/
//场景举例:提示框模板

//模板类
var Alert = function(data) {
    if(!data) {
        return
    }
    this.content = data.content
    this.panel = document.createElement("div")  //面板节点
    this.contentNode = document.createElement("p")  //提示内容节点
    this.confirmBtn = document.createElement("span")  //确定按钮节点
    this.closeBtn = document.createElement("span")  //关闭节点
    //添加对应css类
    this.panel.className = 'panel'
    this.confirmBtn.className  = 'confirm-btn'
    this.closeBtn.className = 'close-btn'
    //添加文案
    this.contentNode.innerHTML = this.content
    this.confirmBtn.innerHTML = data.confirm || '确认'
    //添加响应函数
    this.success = data.success || function() {}
    this.fail = data.fail || function() {}
}

Alert.prototype = {
    init: function() {
        this.panel.appendChild(this.contentNode)
        this.panel.appendChild(this.confirmBtn)
        this.panel.appendChild(this.closeBtn)
        document.body.appendChild(this.panel)
        this.bindEvent()
        this.show()
    },
    bindEvent: function() {
        var self = this
        this.confirmBtn.onclick = function() {
            self.success()
            self.hide()
        }
        this.closeBtn.onclick = function() {
            self.fail()
            self.hide()
        }
    },
    show: function() {
        this.panel.style.display = 'block'
    },
    hide: function() {
        this.panel.style.display = 'none'
    }
}

//利用模板类构造标题提示框
var TitleAlert = function(data) {
    Alert.call(this, data)
    this.title = data.title
    this.titleNode = document.createElement('h2')
    this.titleNode.innerHTML = this.title
}
TitleAlert.prototype = new Alert()
TitleAlert.prototype.init = function() {
    this.panel.insertBefore(this.titleNode, this.panel.firstChild);
    Alert.prototype.init.call(this)
}

//继续创建带取消按钮的标题提示框
var CancelAlert = function(data) {
    TitleAlert.call(this, data)
    this.cancel = data.cancel;
    this.cancelBtn = document.createElement('span')
    this.cancelBtn.className = 'cancel-btn'
    this.cancelBtn.innerHTML = this.cancel || '取消'
}
CancelAlert.prototype = new Alert()
CancelAlert.prototype.init = function() {
    TitleAlert.prototype.init.call(this)
    this.panel.appendChild(this.cancelBtn)
}
CancelAlert.prototype.bindEvent = function() {
    var self = this
    TitleAlert.prototype.bindEvent.call(self);
    this.cancelBtn.onclick = function() {
        self.fail()
        self.hide()
    }
}

//创建一个提示框
new CancelAlert({
    title: 'lalala',
    content: 'nothing',
    success: function() {
        console.log('ok')
    },
    fail: function() {
        console.log('cancel')
    }
}).init()