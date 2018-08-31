/**
 * Define client rules for validation constraints
 * Copyright(c) 2018 Phuoc Vo
 */

Validator.prototype.validationRuleConfiguration = {
  ValueUnique : {triggerEventTypes: ['change']},
};

/**
 * Define validationParameter field:
 * 1. constraint : constraint Data
 * 2. value : field Value
 * 3. failHandler : function will run when validate fail
 * 4. passHandler : function will run when validate pass
 * 5. isAsync : used for Validation that call AJAX default is "False"
 */
Validator.prototype.builtInFieldConstraints = {
  DatetimeMax: function (validationParameter) {
    var value = validationParameter.value;
    var passHandler = validationParameter.passHandler;
    var failHandler = validationParameter.failHandler;

    if (!value || isNaN(value)) {
      passHandler();
      return true;
    }

    if (validationParameter.constraint.arguments[0]) {
      var maxDatetime = validationParameter.constraint.arguments[0];
      if (value > parseInt(maxDatetime)) {
        failHandler();
        return false;
      }
    }

    passHandler();
    return true;
  },
  DatetimeMin: function (validationParameter) {
    var value = validationParameter.value;
    var passHandler = validationParameter.passHandler;
    var failHandler = validationParameter.failHandler;

    if (!value || isNaN(value)) {
      passHandler();
      return true;
    }

    if (validationParameter.constraint.arguments[0]) {
      var minDateTime = validationParameter.constraint.arguments[0];
      if (value < parseInt(minDateTime)) {
        failHandler();
        return false;
      }
    }

    passHandler();
    return true;
  },
  DateTimeValid: function (validationParameter) {
    var value = validationParameter.value;
    var passHandler = validationParameter.passHandler;
    var failHandler = validationParameter.failHandler;

    if (!value) {
      passHandler();
      return true;
    }

    if (value instanceof Date && value.toString() == 'Invalid Date') {
      failHandler();
      return false;
    }

    try {
      var parsedDate = new Date(value);
      passHandler();
      return true;
    } catch (error) {
      failHandler();
      return false;
    }

    failHandler();
    return false;
  },
  NameValid: function (validationParameter) {
    var value = validationParameter.value;
    var passHandler = validationParameter.passHandler;
    var failHandler = validationParameter.failHandler;

    var regexStr = validationParameter.constraint.arguments[0];
    if (!value || value.length <= 0 || !regexStr || regexStr.length == 0) {
      passHandler();
      return true;
    }

    var regex = new RegExp(regexStr);
    if (!regex.test(value)) {
      failHandler();
      return false;
    }

    passHandler();
    return true;
  },
  NotNull: function (validationParameter) {
    if (validationParameter.value != null) {
      validationParameter.passHandler();
      return true;
    } else {
      validationParameter.failHandler();
      return false;
    }
  },
  NotBlank: function (validationParameter) {
    var value = validationParameter.value;

    if (value && value.trim().length > 0) {
      validationParameter.passHandler();
      return true;
    } else {
      validationParameter.failHandler();
      return false;
    }
  },
  NotEmpty: function (validationParameter) {
    var value = validationParameter.value;

    if (value && $.isArray(value) && value.length > 0) {
      validationParameter.passHandler();
      return true;
    } else {
      validationParameter.failHandler();
      return false;
    }
  },
  ListSize: function (validationParameter) {
    var value = validationParameter.value;
    var passHandler = validationParameter.passHandler;
    var failHandler = validationParameter.failHandler;

    if (!value) {
      passHandler();
      return true;
    }

    if (!($.isArray(value))) {
      failHandler();
      return false;
    }

    if (value.length == 0) {
      passHandler();
      return true;
    }

    var min = -1;
    var max = -1;
    try {
      var constraint = validationParameter.constraint;
      min = parseInt(constraint.arguments[0]);
      max = parseInt(constraint.arguments[1]);
    } catch (e) {
      failHandler();
      return false;
    }
    if (min == -1 || max == -1) {
      failHandler();
      return false;
    }

    var size = value.length;
    if (size < min || size > max) {
      failHandler();
      return false;
    }

    passHandler();
    return true;
  },
  TextLength: function (validationParameter) {
    var value = validationParameter.value;
    var passHandler = validationParameter.passHandler;
    var failHandler = validationParameter.failHandler;

    if (!value) {
      passHandler();
      return true;
    }

    var min = -1;
    var max = -1;
    try {
      var constraint = validationParameter.constraint;
      min = parseInt(constraint.arguments[0]);
      max = parseInt(constraint.arguments[1]);
    } catch (e) {
      passHandler();
      return true;
    }
    if (min == -1 || max == -1) {
      passHandler();
      return true;
    }

    if ($.isArray(value)) {
      if (value.length == 0) {
        passHandler();
        return true;
      }

      var result = true;
      try {
        $.each(value, function(index, item) {
          result = checkTextLength(item, min, max);
          if (!result) {
            throw BreakException;
          }
        } );
      } catch (e) {
        if (e !== BreakException) throw e;
        failHandler();
        return false;
      }

      passHandler();
      return true;
    } else {
      if (!checkTextLength(value, min, max)) {
        failHandler();
        return false;
      }
    }

    passHandler();
    return true;
  },
  TextPattern: function (validationParameter) {
    var value = validationParameter.value;
    var passHandler = validationParameter.passHandler;
    var failHandler = validationParameter.failHandler;

    var regexStr = validationParameter.constraint.arguments[0];
    if (!value || value.length <= 0 || !regexStr || regexStr.length == 0) {
      passHandler();
      return true;
    }

    var regex = new RegExp(regexStr);
    if (!regex.test(value)) {
      failHandler();
      return false;
    }

    passHandler();
    return true;
  },
  ValidPhone: function (validationParameter) {
    var value = validationParameter.value;

    if (!value || value.length <= 0) {
      return true;
    }

    var constraint = validationParameter.constraint;
    var regexStr1 = constraint.arguments[0];
    var regexStr2 = constraint.arguments[1];
    var regexStr3 = constraint.arguments[2];
    var regexStr4 = constraint.arguments[3];

    var regex1 = new RegExp(regexStr1);
    var regex2 = new RegExp(regexStr2);
    var regex3 = new RegExp(regexStr3);
    var regex4 = new RegExp(regexStr4);
    if (!regex1.test(value) && !regex2.test(value) && !regex3.test(value) && !regex4.test(value)) {
      validationParameter.failHandler();
      return false;
    }

    validationParameter.passHandler();
    return true;
  },
  ValueUnique: function (validationParameter) {
    this.triggerEventTypes = ['change'];

    var value = validationParameter.value;
    var passHandler = validationParameter.passHandler;
    var failHandler = validationParameter.failHandler;

    var validator = this;
    if (!value) {
      passHandler();
      return true;
    }

    var link = validationParameter.constraint.arguments[0];
    if (!link) {
      passHandler();
      return true;
    }

    var data = {'checkValue': value};
    var deferred = validator.$q.defer();
    try {
      if (!validationParameter.isAsync) {
        validator.ajax.post(link, data).then(
            function success(response) {
              if (response.result.exist) {
                failHandler();
                return false;
              }
            }, function error(response) {
              passHandler();
              return true;
            }
        );
      } else {
        validator.ajax.postSync(link, data).then(
            function success(response) {
              if (response.result.exist) {
                failHandler();
                return false;
              }
            }, function error(response) {
              passHandler();
              return true;
            }
        );
      }
    } catch (exception) {
      // intentionally left blank
    }
  },
};

/**
 * check Text Length of a value
 *
 * @param value
 * @param min
 * @param max
 */
var checkTextLength = function(value, min, max) {
  if (!(typeof value === 'string')) {
    return false;
  }

  if (!value) {
    return true;
  }

  var length = value.length;

  return (length >= min && length <= max);
}