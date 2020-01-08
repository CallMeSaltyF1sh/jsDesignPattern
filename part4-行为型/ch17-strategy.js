/**
 * Strategy 策略模式
 */

//举例：表单验证
var CheckInputStrategy = function () {
    var strategy = {
        checkNull: function (val) {
            return /\s+/.test(val) ? '请输入内容' : ''
        },
        checkNumber: function (val) {
            return /^[0-9] + (\.[0-9]+)?$/.test(val) ? '' : '请输入合法数字'
        },
        checkTel: function (val) {
            return /^1[3578]\d{9}$/.test(val) ? '' : '请输入合法手机号'
        },
        checkEmail: function (val) {
            return /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/.test(val) ? '' : '请输入合法邮箱地址'
        },
        //...
    }
    return {
        check: function (type, val) {
            val = val.replace(/^\s+|\s+$/g, '')
            return strategy[type] && strategy[type](val)
        },
        addStrategy: function (type, fn) {
            strategy[type] = fn
        }
    }
}

document.getElementById('tip-span').innerHTML = CheckInputStrategy.check('checkNull', document.getElementById('name-input').value)