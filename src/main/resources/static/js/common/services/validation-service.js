/**
 * @Deprecated
 *
 * Copyright(c) 2017 Phuoc Vo
 *
 * Validation Service used to load validation constraints and initiate client validator
 */

function ValidationService(q, ajax) {
  this.q = q;
  this.ajax = ajax;
}

/**
 * Create Validator with constraints base on Form Name(s). Validator will be provided as a promise to make sure
 * validation constraints was loaded.
 * @param formNames
 * @returns {Promise}
 */
ValidationService.prototype.createValidator = function (formNames) {
  var validatorService = this;
  // Load constraints
  var constraintsReqData = {'formMeta': []};
  $(formNames).each(function (index, item) {
    constraintsReqData.formMeta.push(item);
  });
  var deferred = validatorService.q.defer();
  validatorService.ajax.post("/validation/constraint", constraintsReqData, null, null).then(
      function success(response) {
        var constraints = {};
        if (response.data.result !== null) {
          $(response.data.result).each(function (index, item) {
            constraints[item.formMeta] = item.validatorFieldConstraints;
          });
        }
        deferred.resolve(new Validator(constraints, validatorService.q, validatorService.ajax));
      }, function error(response) {
        deferred.reject(response);
      }
  );
  return deferred.promise;
};

/**
 * Validator object, used to run client validation base on constraints.
 *
 * Constraint structure:
 *  constraints: [
 *    form1 : [
 *      {
 *        field: 'field name',
 *        validatorConstraints: [
 *          {
 *            "constraint": "NotBlank",
 *            "messageId": "request.general.id",
 *            "arguments": []
 *          },..
 *        ]
 *      }
 *    ],
 *    form2: ...
 *  ]
 */
function Validator(constraints, $q, ajax) {
  this.constraints = constraints;
  this.message = {};
  this.$q = $q;
  this.ajax = ajax;
}

/**
 * Run the validation for Form.
 *   - Return TRUE when:
 *     + All fields are valid.
 *     + Form without requestData and fromMeta.
 *   - Otherwise:
 *     + Form has formMeta but without Validation Constraint will be treated as Fail Validation.
 *     + Form has requestData but did not provide formMeta.
 *
 * @param formMeta Form name
 * @param requestData Data to be validated
 * @returns {boolean} TRUE if form is valid, otherwise, FALSE
 */
Validator.prototype.validateForm = function (formMeta, requestData) {
  if (!requestData && !formMeta)
    return false;
  if (requestData && !formMeta)
    return false;

  if (!this.constraints[formMeta] || this.constraints[formMeta].length <= 0)
    return false;

  var failed = false;
  var calculated = false;
  this.message = {};
  var thisValidator = this;

  // Run through Each Fields
  $(this.constraints[formMeta]).each(function (index, item) {
    var thisField = item.field;
    calculated = thisValidator.validateField(item, requestData[thisField], thisValidator.message);
    //TRUE means failed
    if (calculated) {
      failed = calculated;
    }
  });
  return !failed;
};

/**
 * Internal method only.
 * Run the validation for a specific field.
 *
 * @param item Form ValidatorFieldConstraint
 * @param value value need to be validated
 * @param messages Error messages
 * @param fnGetSourceData
 * @param fnHandlePromise
 * @param fnCustomValidate
 * @returns {boolean} TRUE if there is any constraint failed
 */
Validator.prototype.validateField = function (item, value, messages, fnGetSourceData, fnHandlePromise, fnCustomValidate) { 
  var thisField = item.field;
  var failed = false;
  if (!item.validatorConstraints)
    return true;

  // Run through each Constraints
  var thisValidator = this;

  try {
    var constraints = item.validatorConstraints;
    $(constraints).each(function (index, item) {
      if (typeof thisValidator.builtIns[item.constraint] === 'function') {
        if (!thisValidator.builtIns[item.constraint].apply(thisValidator, [thisField, item, value, fnGetSourceData, fnHandlePromise
          , fnCustomValidate])) {
          failed = true;
          if (!messages[thisField])
          messages[thisField] = item.messageId;
          throw BreakException; // beak at the first error remove it to run all constraints if need it
        }
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }
  return failed;
};

/**
 * Run validation for a specific field of a specific form.
 * @param formMeta
 * @param fieldName
 * @param data
 * @param fnGetSourceData
 * @param fnHandlePromise
 * @param fnCustomValidate
 * @returns {boolean}
 */
Validator.prototype.validate = function (formMeta, fieldName, data, fnGetSourceData, fnHandlePromise, fnCustomValidate) {
  if (!formMeta || !fieldName)
    return false;

  // Find and verify if constraint for form is existing.
  if (!this.constraints[formMeta])
    return true;
  var formConstraint = this.constraints[formMeta];
  // Find and verify if constraint for field is existing.
  var fieldConstraints = this.findFieldConstraint(formConstraint, fieldName);
  if (!fieldConstraints || !fieldConstraints[0])
    return true;

  this.message = {};
  return !this.validateField(fieldConstraints[0], data, this.message, fnGetSourceData, fnHandlePromise, fnCustomValidate);
};

/**
 * find Field Constraint
 */
Validator.prototype.findFieldConstraint = function (formConstraint, fieldName) {
  return jQuery.grep(formConstraint, function (constraint) {
    return constraint.field == fieldName;
  })
};

/**
 * Built-in Validation Constraints
 */
Validator.prototype.builtIns = {
  NotNull: function (field, validatorContraints, value) {
    return value != null;
  },
  NotBlank: function (field, validatorConstraints, value) {
    return (value && value.trim().length > 0);
  },
  Range: function (field, validatorConstraints, value) {
    return true;
  },
  NotDuplicatedPostTitle: function(field, validatorConstraints, value) {
    // to be continue
    return true;
  },
  NotEmpty: function (field, validatorConstrains, value, $scope) {
    return (value && $.isArray(value) && value.length > 0);
  },
  ListSize: function (field, validatorConstrains, value, $scope) {
    if (!value) {
      return true;
    }

    if (!($.isArray(value))) {
      return false;
    }

    if (value.length == 0) {
      return true;
    }

    var min = -1;
    var max = -1;
    try {
      min = parseInt(validatorConstrains.arguments[0]);
      max = parseInt(validatorConstrains.arguments[1]);
    } catch (e) {
      return false;
    }
    if (min == -1 || max == -1) {
      return false;
    }

    var size = value.length;
    return (size >= min && size <= max);
  },
  InCharityField: function (field, validatorConstraints, value, fnGetSourceData) {
    if (!value || !fnGetSourceData) {
      return true;
    }

    var sourceData = fnGetSourceData();
    if (!sourceData) {
      return false;
    }

    if ($.isArray(value)) {
      if (value.length == 0) {
        return true;
      }

      try {
        $(value).each(function (index, item) {
          if (!item.id || !item.fieldName) {
            throw BreakException;
          }

          if (!isExistInFieldList(sourceData, item)) {
            throw BreakException;
          }
        });
      } catch (e) {
        if (e !== BreakException) throw e;
        return false;
      }

      return true;
    }

    return isExistInFieldList(sourceData, value);
  },
  TextLength: function(field, constraints, value) {
    if (!value) {
      return true;
    }

    var min = -1;
    var max = -1;
    try {
      min = parseInt(constraints.arguments[0]);
      max = parseInt(constraints.arguments[1]);
    } catch (e) {
      return false;
    }
    if (min == -1 || max == -1) {
      return false;
    }

    if ($.isArray(value)) {
      if (value.length == 0) {
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
        return result;
      }

      return result;
    }

    return checkTextLength(value, min, max);
  },
  NameValid: function(field, constraints, value) {
    if (!value || value.length <= 0) {
      return false;
    }

    var regexStr = constraints.arguments[0];
    if (!regexStr || regexStr.length == 0) {
      return false;
    }

    var regex = new RegExp(regexStr);
    return regex.test(value);
  },
  ValueUnique: function(field, constraint, value, fnGetSourceData, fnHandlePromise) {
    var validator = this;
    if (!value || !fnHandlePromise) {
      return true;
    }

    var link = constraint.arguments[0];
    if (!link) {
      return false;
    }

    var data = {'checkValue': value};
    var deferred = validator.$q.defer();
    validator.ajax.post(link, data, null, null).then(
        function success(response) {
          deferred.resolve(response.data.result.exist);
        }, function error(response) {
          deferred.reject();
        }
    );

    fnHandlePromise(field, constraint.messageId, deferred.promise);
    return true;
  },
  DateTimeValid: function(field, constaints, value, fnGetSourceData, fnHandlePromise, fnCustomValidate) {
    if (!value) {
      return true;
    }

    if (value instanceof Date && value.toString() == 'Invalid Date') {
      return false;
    }

    try {
      var parsedDate = new Date(value);
      return true
    } catch (error) {
      return false;
    }

    return false;
  },
  TextPattern: function(field, constraints, value) {
    if (!value || value.length <= 0) {
      return true;
    }

    var regexStr = constraints.arguments[0];
    if (!regexStr || regexStr.length == 0) {
      return false;
    }

    var regex = new RegExp(regexStr);
    return regex.test(value);
  },
  ValidPhone: function(field, constraints, value) {
    if (!value || value.length <= 0) {
      return true;
    }

    var regexStr1 = constraints.arguments[0];
    var regexStr2 = constraints.arguments[1];
    var regexStr3 = constraints.arguments[2];
    var regexStr4 = constraints.arguments[3];

    var regex = new RegExp(regexStr1);
    if (regex.test(value)) {
      return true;
    } else {
      var regex = new RegExp(regexStr2);
      if (regex.test(value)) {
        return true
      } else {
        var regex = new RegExp(regexStr3);
        if (regex.test(value)) {
          return true
        } else {
          var regex = new RegExp(regexStr4);
          if (regex.test(value)) {
            return true
          } else {
            return false;
          }
        }
      }
    }
    return false;
  },
  DatetimeBeforeNow: function(field, constraints, value) {
    if (!value) {
      return true;
    }

    if (isNaN(value)) {
      return false;
    }

    var now = new Date();
    return value <= now.getTime();
  }

};

/**
 * check Text Length of a value
 *
 * @param value
 * @param min
 * @param max
 */
function checkTextLength(value, min, max) {
  if (!(typeof value === 'string')) {
    return false;
  }

  if (!value) {
    return true;
  }

  var length = value.length;

  return (length >= min && length <= max);
}

/**
 * is Exist In Field List
 */
function isExistInFieldList(fields, fieldId) {
  try {
    $(fields).each(function (i, it) {
      if (!it.id) {
        throw BreakException;
      }

      if (fieldId === it.id) {
        throw BreakException;
      }
    });
  } catch (error) {
    if (e !== BreakException) throw e;
    return true;
  }

  return false;
}