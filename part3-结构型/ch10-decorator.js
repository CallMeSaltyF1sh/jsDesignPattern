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