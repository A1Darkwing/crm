var customTagsInputDirective = function () {
  var elementToFind = 'tags-input';

  //Functions

  /**
   * check whether this source item matched query
   */
  function isSearchMatched(source, query) {
    if (isUndefined(source)) {
      return false;
    }

    if ($.isArray(source)) {
      source.foreach(function (sourceItem) {
        return isSearchMatched(sourceItem, query);
      });
    } else {
      if (isContainsIgnoreCase(normalize(source), normalize(query))) {
        return true;
      }
    }

    return false;
  }

  return {
    restrict: 'E',
    scope: {
      ngModel: '=',
      label: '@',
      csStyle: '@',
      placeHolder: '@',
      fieldName: '@',
      displayProperty: '@',
      sourceData: '=',
      searchField: '@',
      tabIndex: '@'
    },
    templateUrl: function (els, attrs) {
      return '/js/directive/template/custom-tags-input.html';;
    },
    require: '?ngModel',
    controller: ['$scope', '$element', function ($scope, $element) {
      if (!$scope.tabIndex) {
        $scope.tabIndex = 0;
      }

      // Validation stuff
      $scope.errorMessage = '';
      $scope.failHandler = function (constraint) {
        $scope.errorMessage = constraint.messageId;
      };

      $scope.passHandler = function (constraint) {
        $scope.errorMessage = '';
      };

    }],
    link: function (scope, element, attrs, ngModelCtrl) {
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

      // formatters from model value to view value
      // If model item is a string we will convert they to below formula that tags input can read
      // {'text': item}
      ngModelCtrl.$formatters.push(function (value) {
        var parsedValue = {};
        parsedValue.tagsInput = [];
        if (value && value.length > 0) {
          try {
            value.forEach(function (item) {
              if (isString(item)) {
                parsedValue.tagsInput.push({'text': item});
              } else {
                throw BreakException;
              }
            });
          } catch (error) {
            if (error !== BreakException) throw error;
            parsedValue.tagsInput = value;
          }
        }

        return parsedValue;
      } );

      // render value to DOM object
      ngModelCtrl.$render = function () {
        scope.tagsinput = ngModelCtrl.$viewValue.tagsInput;
      };

      scope.$watchCollection('tagsinput', function (newValue, oldValue) {
        if (newValue != oldValue) {
          ngModelCtrl.$setViewValue({'tagsInput': newValue});
        }
      });

      // Parser from View Value to Model Value
      ngModelCtrl.$parsers.push(function (value) {
        var parsedValue = [];

        try {
          value.tagsInput.some(function (item) {
            if (Object.keys(item).length == 1 && Object.keys(item)[0] == 'text') {
              parsedValue.push(item.text);
            } else {
              throw BreakException;
            }
          });
        } catch (e) {
          if (e !== BreakException) throw e;
          parsedValue = value.tagsInput;
        }

        return parsedValue;
      } );

      scope.loadTagsSource = function (query) {
        var sources = scope.sourceData;
        var results = [];
        var searchField = scope.searchField;

        if (sources == undefined) {
          return results;
        }

        for (var index = 0; index < sources.length; index++) {
          var sourceItem = sources[index];
          var searchFieldValue = sourceItem[searchField];

          if (isSearchMatched(searchFieldValue, query)) {
            results.push(sourceItem);
          }
        }

        if (results.length == 0) {
          return sources;
        }
        return results;
      }

      scope.getSourceData = function () {
        return scope.sourceData;
      }

      scope.validate = function () {
        var validator = scope.$parent.validator;
        if (!validator) {
          return;
        }
        validator.validateField(formName, scope.fieldName, scope.ngModel, scope.failHandler, scope.passHandler);
      }

    }
  }
};