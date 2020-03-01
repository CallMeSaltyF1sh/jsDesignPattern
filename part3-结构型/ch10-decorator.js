/**
 * 装饰者模式
 * 在不改变原对象的基础上包装拓展以满足新的需求
 */
//举例：修饰输入框
const decorator = (input, fn) => {
    const i = document.getElementById(input)
    if (typeof i.onclick === 'function') {
        const oldClickFn = i.onclick
        i.onclick = () => {
            oldClickFn()
            fn()
        }
    } else {
        input.onclick = fn
    }
    //...codes
}
//调用
decorator('name_input', () => {
    document.getElementById('name_text').style.display = 'none'
})

//补充ES7 decorator装饰器
function mixins(...list) {
    return function(target) {
        Object.assign(target.prototype, ...list);
    }
}
const Test = {
    test() { console.log('test'); }
};
//在MyClass类上混入Test对象的方法
@mixins(Test)   
class MyClass() {}
const obj = new MyClass();
obj.test();   // 'test'


//Redux中的connect也可用作装饰器 （其实HOC就是装饰器的应用）
class MyReactComponent extends React.Component {}
export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);
//等同于
@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}