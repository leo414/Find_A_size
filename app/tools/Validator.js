const TelPattern = /^1[34578]\d{9}$/
const MailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

const Strategies = {
  isNoEmpty(value, errorMsg) {
    if(value === '') return errorMsg
  },

  minLength(value, length, errorMsg) {
    if(value.length < length) return errorMsg
  },

  isMobile(value, errorMsg) {
    if(!TelPattern.test(value)) return errorMsg
  },

  isEmail(value, errorMsg) {
    if(!MailPattern.test(value)) return errorMsg
  },
}

const Validator = function() {
  this.cache = []
}

Validator.prototype.add = function(value, rules) {
  const Self = this

  for(let i = 0, rule; rule = rules[i++];) {
    (function(rule) {
      let strategyAry = rule.strategyAry.split(':')
      let errorMsg = rule.errorMsg

      Self.cache.push(() => {
        let strategy = strategyAry.shift()
        strategyAry.unshift(value)
        strategyAry.push(errorMsg)
        return strategies[strategy].apply(value, strategyAry)
      })
    })(rule)
  }
}

Validator.prototype.start = function() {
  for(let i = 0, validatorFunc; validatorFunc = this.cache[i++]) {
    let errorMsg = validatorFunc()
    if(errorMsg) return errorMsg
  }
}

export default Validator
