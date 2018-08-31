var customInputDirective = function ($translate, $sce) {
  return {
    restrict: 'E',
    scope: {
      ngModel: '=',
      label: '@',
      csStyle: '@',
      placeHolder: '@',
      type: '@',
      fieldName: '@',
      onChange: '&',
      enterMethod: '&',
      inputGuide: '@',
      disabled: '@',
      maxlength: '@',
      tabIndex: '@'
    },
    templateUrl: function (elem, attr) {
      var templateUrl = '';
      switch (attr.type) {
        case "text":
        case "number":
        case "password":
        case "email":
        case "hidden":
          templateUrl = '/js/directive/template/custom-input.html';
          attr.elementToFind = 'input';
          break;
        case "text-area":
          templateUrl = '/js/directive/template/custom-text-area-input.html';
          attr.elementToFind = 'textarea';
          break;
        case "radio":
          templateUrl = '/js/directive/template/blank.html';
          break;
        default:
          templateUrl = '/js/directive/template/blank.html';
      }
      return templateUrl;
    },
    require: '?ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {
      scope.isValidationOnBlur = true;

      ngModelCtrl.$render = function () {
        scope.innerModel = ngModelCtrl.$viewValue;
      }
      scope.innerOnChange = function () {
        ngModelCtrl.$setViewValue(scope.innerModel);
        scope.onChange(scope.innerModel);
      }

      // Define binding name used for html element's ID.
      scope.binding = '';
      var parentForm = $(element).closest('form');
      var formName = '';

      // Define a one time watch for formName
      var formNameWatcher = scope.$watch(function() {
        if (parentForm) {
          return parentForm.attr('name');
        }
        return '';
      }, function () {
        formName = parentForm.attr('name');
        scope.binding = formName + '-' + scope.fieldName;
        formNameWatcher(); // unbind this watcher
      });

      // Validation stuff
      scope.errorMessage = '';

      var failHandler = function (constraint) {
        scope.errorMessage = constraint.messageId;
      };

      var passHandler = function (constraint) {
        scope.errorMessage = '';
      };

      element.find(attrs.elementToFind).on('change blur', function (event) {
        if (event.type != 'blur' || scope.isValidationOnBlur) {
          var validator = scope.$parent.validator;
          if (!validator) {
            return;
          }

          validator.validateField(formName, scope.fieldName, scope.innerModel, failHandler, passHandler, event.type);
          scope.isValidationOnBlur = false;
        }
      });

      element.bind("keypress", function (event) {
        if (event.which === 13 || event.keycode == 13) {
          if (event.target.type == 'textarea') {
            event.target.value = event.target.value + '\n';
          }
          scope.enterMethod();
          event.preventDefault();
        }
      });

      if (scope.disabled == null || scope.disabled == undefined) {
        scope.disabled = false;
      }

      autosize($('.commentTextArea'));

      scope.displayPopover = function () {
        var input = $(element.find('input'));
        input.focus();
        input.popover({
          content: $sce.getTrustedHtml($translate.instant(scope.inputGuide, {}, undefined, false, 'escapeParameters')),
          html: true,
          placement: 'bottom'
        }).popover('show');
      }

      $(element.find('input')).blur(function () {
        $(this).popover('dispose');
      });
    }
  };
};

/**
 * Directive for enterSubmit
 * @author Minh Nguyen
 * Copyright(c) 2017 by Junto Team
 */
var enterSubmit = function () {
  return {
    'restrict': 'A',
    'link': function (scope, elem, attrs) {

      elem.bind('keydown', function (event) {
        var code = event.keyCode || event.which;
        var textValue = event.target.value.trim();
        if (code === 13) {
          if (!textValue) {
            // Prevent adding line break even there is no text in the first row.
            event.preventDefault();
          }
          if (!event.shiftKey && textValue) {
            event.preventDefault();
            scope.$apply(attrs.csEnterSubmit);
          }
        }
      });
    }
  }
}

var escKey = function () {
  return {
    'restrict': 'A',
    'link': function (scope, elem, attrs) {

      elem.bind('keydown keypress', function (event) {
        var code = event.keyCode || event.which;
        if (code === 27) { // 27 = esc key
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          scope.$apply(attrs.escKey);
        }
      });
    }
  }
}

var resizeTextArea = function () {
  return function (scope, element, attrs) {
    scope.$watch(
        function (scope) {
          // watch the 'csResizeTextArea' expression for changes
          return scope.$eval(attrs.csResizeTextArea);
        },
        function (newValue) {
          if (true == newValue) {
            autosize($('.commentTextArea'));
            autosize.update($('.commentTextArea'));
          }
        }
    );
  };
};