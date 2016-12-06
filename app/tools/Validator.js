const TelPattern = /^1[34578]\d{9}$/
const MailPattern = /^(\+\d{1,3}[- ]?)?\d{10}$/

const strategies = {
  isNoEmpty(value, errorMsg) {
    if(value == '') return errorMsg
  },

  minLength(value, length, errorMsg) {
    if(value.length < length) return errorMsg
  },

  isMobile(value, errorMsg) {
    if(!TelPattern.test(value)) return errorMsg
  },

  isEmail(value, errorMsg) {
    if(!MailPattern.test(value)) return errorMsg
  },a
}

const Validator = function(){
  this.cache = []
}

Validator.prototype.add = function(value, rules=[]) {
  const self = this
  rules.forEach(rule => {
    let strategyAry = rule.strategy.split(':')
    let errorMsg = rule.errorMsg

    self.cache.push(function() {
      let strategy = strategyAry.shift()
      strategyAry.unshift(value)
      strategyAry.push(errorMsg)
      return strategies[strategy](...strategyAry)
    })
  })
}

Validator.prototype.start = function(){
  for(let i = 0; i < this.cache.length; i++){
    var errorMsg = this.cache[i]();
    if ( errorMsg ){
      return errorMsg;
    }
  }
}

const validataFunc = (registerForm = []) => {
  var validator = new Validator();
  registerForm.forEach(item => validator.add(item.value,item.rules))

  var errorMsg = validator.start();
  return errorMsg;
}

export default validataFunc

// const registerForm = [
//   {
//     value: '',
//     rules: [
//       {
//         strategy: 'isNoEmpty',
//         errorMsg: 'password '
//       },{
//         strategy: 'isNoEmpty',
//         errorMsg: '',
//       }
//     ]
//   },
//
//   {
//     value: 'adwd',
//     rules: [
//       {
//         strategy: 'minLength:6',
//         errorMsg: '',
//       }
//     ]
//   }
// ]
