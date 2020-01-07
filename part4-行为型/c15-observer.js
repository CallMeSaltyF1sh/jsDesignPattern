/**
 * Observer 观察者模式
 * 又称发布-订阅者模式或消息机制
 */

var Observer = (function () {
    var __messages = {}
    return {
        subscribe: function (type, fn) {
            if (typeof __messages[type] === 'undefined') {
                __messages[type] = [fn]
            } else {
                __messages[type].push(fn)
            }
        },
        dispatch: function (type, args) {
            if (!__messages[type]) {
                return
            }
            var events = {
                type: type,
                args: args || {}
            }
            var len = __messages[type].length
            for (let i = 0; i < len; i++) {
                __messages[type][i].call(this, events)
            }
        },
        unsubscribe: function (type, fn) {
            if (__messages[type] instanceof Array) {
                for (let i = __messages[type].length - 1; i >= 0; i--) {
                    //若在消息动作序列里存在fn这个动作则移除
                    __messages[type][i] === fn && __messages[type].splice(i, 1)
                }
            }
        }
    }
})()

//举例：用户追加评论的功能
(function() {
    function addMsgItem(e) {
        var txt = e.args.text,   //获取添加的内容
            ul = document.getElementById('msg'),
            li = document.createElement('li')   //内容容器
            span = document.createElement('span')  //创建删除按钮
        li.innerHTML = txt
        span.onclick = function() {
            ul.removeChild(li)
            Observer.dispatch('removeMsg', {
                num: -1
            })
        }
        li.appendChild(span)  //添加删除按钮
        ul.appendChild(li)
    }
    Observer.subscribe('addMsg', addMsgItem)
})()

(function() {
    function changeMsgNum(e) {
        var num = e.args.num,
            msg_num = document.getElementById('msg_num')
        msg_num.innerHTML = parseInt(msg_num.innerHTML) + num
    }
    Observer.subscribe('addMsg', changeMsgNum).subscribe('removeMsg', changeMsgNum)
})()

(function() {
    document.getElementById('submit_btn').onclick = function() {
        var txt = document.getElementById('user_input')
        if(txt.value === '') {
            return
        }
        Observer.dispatch('addMsg', {
            text: txt.value,
            num: 1
        })
        text.value = ''  //输入框清空
    }
})()