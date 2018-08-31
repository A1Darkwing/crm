var selectDirective = function ($translate, $timeout) {
  // Check whether directive initialized select picker or not
  function isSelectedPickerInitialized(element) {
    var isHaveButton = $('div .btn-group,div .bootstrap-select', element).length > 0;
    var isHaveDropdown = $('div .dropdown-menu,div .open', element).length > 0;
    var isHaveItemsContainer = $('ul .dropdown-menu,div .inner', element).length > 0;
    return isHaveButton && isHaveDropdown && isHaveItemsContainer;
  }

  return {
    restrict: 'E',
    scope: {
      ngModel: '=',
      csStyle: '@',
      boxStyle: '@',
      fieldName: '@',
      items: '=',
      onChange: '&',
      placeHolder: '@',
      inputGuide: '@',
      tabIndex: '@'
    },
    templateUrl: '/js/directive/template/custom-select.html',
    require: '?ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {
      var selectBox = $(element).find('select');
      scope.isValidationOnBlur = true;

      ngModelCtrl.$render = function () {
        scope.innerModel = ngModelCtrl.$viewValue;
        var selectedItem = selectBox.val();
        if (isSelectedPickerInitialized(element) && scope.innerModel != null &&
            scope.innerModel != selectedItem) {
          selectBox.selectpicker('val', scope.innerModel.id);
        }
      }
      scope.$watch(function () {
        return scope.items;
      }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
          selectBox.selectpicker('refresh');
        }
      }, true);

      scope.$watch(function () {
        return scope.ngModel;
      }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
          selectBox.selectpicker('setStyle', scope.boxStyle).selectpicker('refresh');
        }
      }, true);

      scope.innerOnChange = function () {
        ngModelCtrl.$setViewValue(scope.innerModel);
        scope.onChange(scope.innerModel);
      }

      // Define binding name used for html element's ID.
      scope.binding = '';
      var parentForm = $(element).closest('form');
      var formName = '';

      // Define a one time watcher for formName
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

      element.find('select').on('change blur', function (event) {
        if (event.type != 'blur' || scope.isValidationOnBlur) {
          var validator = scope.$parent.validator;
          if (!validator) {
            return;
          }

          validator.validateField(formName, scope.fieldName, scope.innerModel, failHandler, passHandler);
          scope.isValidationOnBlur = false;
        }
      });

      // Init Bootstrap Select
      scope.$applyAsync(function () {
        selectBox.selectpicker({});
      });

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