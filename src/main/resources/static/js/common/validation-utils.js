/**
 * Validation Utility Methods
 *
 * @author Phuoc Vo, Anh Tran
 * @Copyright 2017 by Junto Team
 */

/**
 * Initilize Validation for input
 *
 * @param scope angularjs scope object
 * @param element angularjs element
 * @param elementToFind input elements inside element that we used to trigger validation
 * @param triggerEvent event that we use to trigger validation (default is only 'blur')
 */
function initValidate(scope, element, elementToFind, triggerEvent) {
  if (!triggerEvent || triggerEvent.length == 0) {
    addValidationEventListener(scope, element, elementToFind, 'blur');
  } else {
    $(triggerEvent).each(function(index, item) {
      addValidationEventListener(scope, element, elementToFind, item);
    } );
  }
}

/**
 * add Validation Event Listener to trigger validation
 *
 * @param scope
 * @param element
 * @param elementToFind
 * @param triggerEvent
 */
function addValidationEventListener(scope, element, elementToFind, triggerEvent) {
  var errorMessager = getErrorMessager(element);

  // Verify if Validator has been provided in scope.
  var validator = scope.$parent.validator;
  if (!validator) {
    // Log for DEV only. Will need to remove in Prod!!!
    return;
  }

  var formName = getFormName(element);

  if (elementToFind != null) {
    $(element).find(elementToFind).on(triggerEvent, function () {
      runValidate(validator, formName, scope, $(this).val(), errorMessager, scope.parseError, scope.customValidate);
    });
  } else {
    $(element).on(triggerEvent, function () {
      runValidate(validator, formName, scope, scope.ngModel, errorMessager, scope.parseError,
          scope.customValidate);
    });
  }
}

function getErrorMessager(element) {
  return $(element).find('#error');
}

function clearErrorMessager(errorMessager) {
  errorMessager.html('');
  errorMessager.hide();
}

function getFormName(element) {
  var parentForm = $(element).closest('form');
  if (!parentForm || !$(parentForm).attr('name')) {
    // Log for DEV only. Will need to remove in Prod!!!
    console
        .log('DEV ONLY: Input should be put inside a well defined form with form name!');
    return;
  }

  return $(parentForm).attr('name');
}

function runValidate(validator, formName, scope, value, errorMessager, fnParseErrors, fnCustomValidate) {
  function handlePromise(field, messageKey, promise) {
    promise.then(function (data) {
      if (data) {
        validator.message[field] = messageKey;
        if (messageKey) {
          var message = fnParseErrors(messageKey);
          errorMessager.append(message);
          errorMessager.show();
        }
      }
    });
  }

  clearErrorMessager(errorMessager);
  if (!validator.validate(formName, scope.fieldName, value, null, handlePromise, fnCustomValidate)) {
    var errorMessages = validator.message[scope.fieldName];
    if (errorMessages) {
      var message = fnParseErrors(errorMessages)
      errorMessager.append(message);
    }
    // The below code will show all error message
    //$(errorMessages).each(function (index, item) {
    //errorMessager.append(item + '<br/>');
    //});
    errorMessager.show();
  } else {
    // Log for DEV only.
  }
}