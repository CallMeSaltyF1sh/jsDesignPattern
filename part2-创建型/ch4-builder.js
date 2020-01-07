/**
 * 建造者模式
 * 关注创建对象的每一个细节
 */
//举例：个人应聘信息
var Person = function(param) {
    this.name = param && param.name || ''
    this.skill = param && param.skill || ''
    this.hobby = param && param.hobby || ''
}
Person.prototype = {
    getName: function() {
        return this.name
    },
    getSkill: function() {
        return this.skill
    },
    getHobby: function() {
        return this.hobby
    }
}
var Position = function(pos) {
    const self = this
    (function(pos, self) {
        switch(pos) {
            case 'pos0':
                //...codes
            case 'pos1':
                //...codes
            default:
                self.position = pos
                self.posDesc = 'not known'
        }
    })(pos, self)
}
Position.prototype.changePosDesc = function(desc) {
    this.posDesc = desc
}
var Employer = function(info, pos) {
    var _person = new Person(info)
    _person.position = new Position(pos)
    return _person
}