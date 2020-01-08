/**
 * State 状态模式
 * 对象内部状态改变会导致行为的改变
 */
var TakeAction = function () {
    var states = {
        state0: function () { },
        state1: function () { },
        state2: function () { },
        //...
    }
    function act(state) {
        states['state' + state] && states['state' + state]()
    }
    return {
        act: act
    }
}
TakeAction.act(0)