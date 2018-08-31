/**
 * Validation Service used to load validation constraints and initiate client validator
 *
 * Copyright(c) 2018 Phuoc Vo
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
          constraints = response.data.result.constraints;
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
 * @param constraints
 * @param $q
 * @param ajax
 * @constructor
 */
function Validator(constraints, $q, ajax) {
  this.constraints = constraints;
  this.$q = $q;
  this.ajax = ajax;
}

Validator.prototype.failHandlerWrapper = function (constraint, formName, fieldName, failHandler) {
  var thisValidator = this;
  var execute = function () {
    if (thisValidator.constraints[formName].failFields.indexOf(fieldName) < 0) {
      thisValidator.constraints[formName].failFields.push(fieldName);
    }
    failHandler(constraint);
  };
  return execute;
}

Validator.prototype.passHandlerWrapper = function (constraint, formName, fieldName, passHandler) {
  var thisValidator = this;
  var execute = function () {
    if (thisValidator.constraints[formName].failFields.indexOf(fieldName) != -1) {
      var index = thisValidator.constraints[formName].failFields.indexOf(fieldName);
      thisValidator.constraints[formName].failFields.splice(index, 1);
    }
    passHandler(constraint);
  };
  return execute;
}

Validator.prototype.validateField = function (formName, fieldName, fieldValue, failHandler, passHandler,
                                              triggerEventType) {
  if (!this.constraints[formName] && !this.constraints[formName].fields[fieldName]) return;
  var fieldConstraints = this.constraints[formName].fields[fieldName];
  var thisValidator = this;

  try {
    $(fieldConstraints).each(function (index, constraint) {
      if (typeof thisValidator.builtInFieldConstraints[constraint.constraint] === 'function') {
        var passWrapper = thisValidator.passHandlerWrapper(constraint, formName, fieldName, passHandler);
        var failWrapper = thisValidator.failHandlerWrapper(constraint, formName, fieldName, failHandler);
        var validationRule = thisValidator.builtInFieldConstraints[constraint.constraint];
        if (!thisValidator.validationRuleConfiguration[constraint.constraint] ||
            thisValidator.validationRuleConfiguration[constraint.constraint].triggerEventTypes
                .indexOf(triggerEventType) != -1) {

          var validationParameter = {};
          validationParameter.constraint = constraint;
          validationParameter.value = fieldValue;
          validationParameter.failHandler = failWrapper;
          validationParameter.passHandler = passWrapper;
          validationParameter.isAsync = false;

          if (!thisValidator.builtInFieldConstraints[constraint.constraint].apply(thisValidator,
                  [validationParameter])) {
            throw BreakException;
          }
        }
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }
}

Validator.prototype.validateForm = function () {
  return true;
}