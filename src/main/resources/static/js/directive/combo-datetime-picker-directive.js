var customComboDatetimePickerDirective = function () {
  // Define fuction for getting the maximum date for a month.
  function maxDate(month, year) {
    var res = 31;
    if (month != null) {
      if (month == 4 || month == 6 || month == 9 || month == 11) {
        res = 30;
      }
      if (year != null && month == 2) {
        res = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0) ? 29 : 28;
      }
    }
    return res;
  }

  // Define function for adjust timezone.
  function adjustTimezone(myDate, myTimezone) {
    var offset = isNaN(myTimezone) ? new Date().getTimezoneOffset() : parseFloat(myTimezone) * 60;
    return new Date(myDate.getTime() + offset * 60 * 1000);
  }

  // Define function for parse dates.
  function parseDate(myDate, myTimezone) {
    var res = null;
    if (myDate !== undefined && myDate !== null) {
      if (myDate instanceof Date) {
        res = myDate;
      } else {
        if (typeof myDate == 'number' || typeof myDate == 'string') {
          // Parse date.
          res = new Date(isNaN(myDate) ? myDate : parseInt(myDate, 10));

          // Adjust timezone.
          res = adjustTimezone(res, myTimezone);
        }
      }
    }
    return res;
  };

  // Function to parse an string returning either a number or 'null' (instead of NaN).
  function parseIntStrict(num) {
    return (num !== null && num !== '' && parseInt(num) != NaN) ? parseInt(num) : null;
  };

  // Function to parse a JSON object.
  function parseJsonPlus(jsonObj) {
    var res = null;
    if (jsonObj != null) {
      try {
        res = JSON.parse(jsonObj);
      } catch (ex) {
      }
      if (res == null) try {
        res = JSON.parse(jsonObj.replace(/'/g, '"'));
      } catch (ex) {
      }
    }
    return res;
  }

  // Function to parse Date Expression to Date Object
  function processDateExpression(dateExpression, timeZone) {
    switch (dateExpression) {
      case 'today':
        return new Date();
      default:
        return parseDate(dateExpression, timeZone);
    }
  }

  function getClosetMinuteStep(minute, step) {
    if (minute === '') {
      return minute;
    }
    return Math.ceil(minute / step) * step;
  }

  return {
    restrict: 'E',
    scope: {
      label: '@',
      ngModel: '=',
      csStyle: '@',
      placeholder: '@',
      fieldName: '@',
      comboStyle: '@',
      comboMonths: '@',
      comboOrder: '@',
      minModel: '=?minModel',
      maxModel: '=?maxModel',
      minDate: '@',
      maxDate: '@',
      timePicker: '@',
      minuteStep: '=?',
      boxStyle: '@',
      tabIndex: '@',
      showTimePickerLabel: '@'
    },
    controller: ['$scope',
      function ($scope) {
        // Initialize models.
        $scope.isValidationOnBlur = true;
        $scope.minModel = parseDate($scope.minModel, $scope.ngTimezone);
        $scope.maxModel = parseDate($scope.maxModel, $scope.ngTimezone);
        $scope.isShowTimePicker = false;

        // set default attribute value
        if (!$scope.timePicker) {
          $scope.timePicker = 'none';
        } else {
          $scope.timePicker = $scope.timePicker.toLowerCase();
          if ($scope.timePicker == 'show') {
            $scope.isShowTimePicker = true;
          }
        }

        if (!$scope.showTimePickerLabel) {
          $scope.showTimePickerLabel = 'Show time';
        }

        if ($scope.ngModel && $scope.isShowTimePicker == false) {
          var date = new Date($scope.ngModel);

          date.setHours(0);
          date.setMinutes(0);
          date.setMilliseconds(0);

          $scope.ngModel = date.getTime();
        }

        // Initialize order
        if (typeof $scope.comboOrder != 'string') {
          $scope.comboOrder = 'dmy';
        } else {
          $scope.comboOrder = $scope.comboOrder.toLowerCase();
        }
        // Initialize tabindex
        if ($scope.tabIndex) {
          $scope.tabIndex = parseIntStrict($scope.tabIndex);
        }

        // Initialize minimal and maximum values.
        if ($scope.minDate) {
          $scope.minModel = processDateExpression($scope.minDate, $scope.ngTimezone);
        }
        if (!$scope.minModel) {
          var now = new Date();
          $scope.minModel = new Date(now.getFullYear() - 100, now.getMonth(), now.getDate(),
              now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
        }
        if ($scope.maxDate) {
          $scope.maxModel = processDateExpression($scope.maxDate, $scope.ngTimezone);
        }
        if (!$scope.maxModel) {
          $scope.maxModel = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate(),
              now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
        }

        // Watch for changes in the minimum and maximum dates.
        $scope.$watch('[minModel, maxModel]', function () {
          // Update list of years (if possible).
          if ($scope.minModel && $scope.maxModel) {
            // Get list of years.
            $scope.years = [];
            for (var i = $scope.maxModel.getFullYear(); i >= $scope.minModel.getFullYear(); i--) {
              $scope.years.push({value: i, name: i});
            }

            // Prepend the years placeholder
            if ($scope.placeHolders) $scope.years.unshift($scope.placeHolders[0]);
          }

          // Verify if selected date is in the valid range.
          if ($scope.ngModel && $scope.minModel && $scope.ngModel < $scope.minModel) $scope.ngModel = $scope.minModel;
          if ($scope.ngModel && $scope.maxModel && $scope.ngModel > $scope.maxModel) $scope.ngModel = $scope.maxModel;
        });

        // Initialize place holders.
        $scope.placeHolders = null;
        if ($scope.placeholder !== undefined && $scope.placeholder !== null && (typeof $scope.placeholder == 'string' || Array.isArray($scope.placeholder))) {
          var holders = typeof $scope.placeholder == 'string' ? $scope.placeholder.split(',') : $scope.placeholder;
          if (holders.length == 5) {
            $scope.placeHolders = [];
            for (var h = 0; h < holders.length; h++) {
              $scope.placeHolders.push({value: '', name: holders[h], disabled: false});
            }
          }
        }

        // Initialize list of months names.
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if ($scope.comboMonths !== undefined && $scope.comboMonths !== null) {
          if (typeof $scope.comboMonths == 'string') {
            var months = $scope.comboMonths.split(',');
            if (months.length == 12) monthNames = months;
          }
          if (Array.isArray($scope.comboMonths) && $scope.comboMonths.length == 12) {
            monthNames = $scope.comboMonths;
          }
        }

        // Update list of months.
        $scope.updateMonthList = function (year) {
          // Parse parameter.
          year = parseIntStrict(year);

          // Some months can not be choosed if the year matchs with the year of the minimum or maximum dates.
          var start = year !== null && year == $scope.minModel.getFullYear() ? $scope.minModel.getMonth() : 0;
          var end = year !== null && year == $scope.maxModel.getFullYear() ? $scope.maxModel.getMonth() : 11;

          // Generate list.
          $scope.months = [];
          if ($scope.placeHolders) $scope.months.push($scope.placeHolders[1]);
          for (var i = start; i <= end; i++) {
            $scope.months.push({value: i, name: monthNames[i]});
          }
        };

        // Initialize list of days.
        $scope.updateDateList = function (month, year) {
          // Parse parameters.
          month = parseIntStrict(month);
          year = parseIntStrict(year);

          // Start date is 1, unless the selected month and year matchs the minimum date.
          var start = 1;
          if (month !== null && month == $scope.minModel.getMonth() &&
              year !== null && year == $scope.minModel.getFullYear()) {
            start = $scope.minModel.getDate();
          }

          // End date is 30 or 31 (28 or 29 in February), unless the selected month and year matchs the maximum date.
          var end = maxDate(month !== null ? (month + 1) : null, year);
          if (month !== null && month == $scope.maxModel.getMonth() &&
              year !== null && year == $scope.maxModel.getFullYear()) {
            end = $scope.maxModel.getDate();
          }

          // Generate list.
          $scope.dates = [];
          if ($scope.placeHolders) $scope.dates.push($scope.placeHolders[2]);
          for (var i = start; i <= end; i++) {
            $scope.dates.push({value: i, name: i});
          }
        };

        // Defaut scope value
        $scope.minuteStep = 1;
        $scope.initTimepicker = function () {
          if ($scope.timePicker == 'none') {
            return;
          }
          $scope.initHours();
          $scope.initMinutes();
        }

        $scope.initHours = function () {
          $scope.hours = [];

          if ($scope.placeHolders[3]) {
            $scope.hours.push($scope.placeHolders[3]);
          }

          for (var hour = 0; hour < 24; hour++) {
            var name = hour;
            if (name < 10) {
              name = '0' + name;
            }
            $scope.hours.push({value: hour, name: name});
          }

        }

        $scope.initMinutes = function () {
          $scope.minutes = [];

          if ($scope.placeHolders[4]) {
            $scope.minutes.push($scope.placeHolders[4]);
          }

          if ($scope.minuteStep) {
            step = $scope.minuteStep;
          }

          for (var minute = 0; minute < 60; minute += step) {
            var name = minute;
            if (name < 10) {
              name = '0' + name;
            }
            $scope.minutes.push({value: minute, name: name});
          }

        }

        $scope.isInvalidDate = function () {
          return ($scope.date == null || $scope.date === '');
        }

        $scope.isInvalidMonth = function () {
          return ($scope.month == null || $scope.month === '');
        }

        $scope.isInvalidYear = function () {
          return ($scope.year == null || $scope.year === '');
        }

        $scope.isInvalidHour = function () {
          return ($scope.hour == null || $scope.hour === '');
        }

        $scope.isInvalidMinute = function () {
          return ($scope.minute == null || $scope.minute === '');
        }
      }],
    require: '?ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {
      var DATE_SELECTOR = '-date-select';
      var MONTH_SELECTOR = '-month-select';

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
        scope.binding = parseToIdName(formName + '-' + scope.fieldName);
        DATE_SELECTOR = '#' + scope.binding + DATE_SELECTOR;
        MONTH_SELECTOR = '#' + scope.binding + MONTH_SELECTOR;
        formNameWatcher(); // unbind this watcher
      });

      // Initialize variables.
      var jqLite = angular.element;
      var dateSelectContainer = jqLite(element.find('.date-select'));
      var children = dateSelectContainer.children();
      var order = scope.comboOrder.split('');

      // Reorder elements set tab-index
      scope.tabIndexs = {date: 0, month: 0, year: 0, hour: 0, minute: 0};
      for (var i = 0; i < order.length; i++) {
        if (order[i] == 'd') {
          jqLite(dateSelectContainer).append(children[0]);
          scope.tabIndexs.date = scope.tabIndex + i;
        }
        if (order[i] == 'm') {
          jqLite(dateSelectContainer).append(children[1]);
          scope.tabIndexs.month = scope.tabIndex + i;
        }
        if (order[i] == 'y') {
          jqLite(dateSelectContainer).append(children[2]);
          scope.tabIndexs.year = scope.tabIndex + i;
        }
      }
      if (scope.timePicker != 'none') {
        scope.tabIndexs.hour = scope.tabIndex + 3;
        scope.tabIndexs.minute = scope.tabIndex + 4;
      }

      // Add formater to convert time in milisecond to Date
      ngModelCtrl.$formatters.push(function (value) {
        scope.lastModelValue = value;

        var res = {date: null, month: null, year: null, hour: null, minute: null};
        if (value) {
          try {
            var date = new Date(value);
            res.date = date.getDate();
            res.month = date.getMonth();
            res.year = date.getFullYear();
            res.hour = date.getHours();
            res.minute = date.getMinutes();
          } catch (error) {
          }
        } else {
          res.date = '';
          res.month = '';
          res.year = '';
          res.hour = '';
          res.minute = '';
        }

        // Initilize days and months list according to the min and max dates.
        scope.updateMonthList(res.year);
        scope.updateDateList(res.month, res.year);
        scope.initTimepicker();
        return res;
      });

      // Render from view value to scope value
      ngModelCtrl.$render = function () {
        if (ngModelCtrl.$viewValue) {
          scope.date = ngModelCtrl.$viewValue.date;
          scope.month = ngModelCtrl.$viewValue.month;
          scope.year = ngModelCtrl.$viewValue.year;
          scope.hour = ngModelCtrl.$viewValue.hour;
          var minute = ngModelCtrl.$viewValue.minute;
          scope.minute = getClosetMinuteStep(minute, scope.minuteStep);
        } else {
          scope.date = '';
          scope.month = '';
          scope.year = '';
          scope.hour = '';
          scope.minute = '';
        }
      }

      var refreshSelectBox = function (selectElement, newValue) {
        selectElement.selectpicker('val', 'number:' + newValue);
        selectElement.selectpicker('setStyle', scope.boxStyle).selectpicker('refresh');
      }

      scope.$watch('date', function (newValue, oldValue) {
        if (newValue != oldValue) {
          if (newValue == null) {
            scope.date = '';
          }
          ngModelCtrl.$setViewValue(
              {
                date: scope.date,
                month: scope.month,
                year: scope.year,
                hour: scope.hour,
                minute: scope.minute
              }
          );

          refreshSelectBox($(element).find(DATE_SELECTOR), scope.date);
        }
      });

      scope.$watch('month', function (newValue, oldValue) {
        if (!(newValue === oldValue)) {
          if (newValue == null) {
            scope.month = '';
          }
          scope.updateDateList(scope.month, scope.year);
          ngModelCtrl.$setViewValue(
              {
                date: scope.date,
                month: scope.month,
                year: scope.year,
                hour: scope.hour,
                minute: scope.minute
              }
          );

          refreshSelectBox($(element).find(MONTH_SELECTOR), scope.month);
        }
      });

      scope.$watch('year', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          scope.updateMonthList(scope.year);
          scope.updateDateList(scope.month, scope.year);

          ngModelCtrl.$setViewValue(
              {
                date: scope.date,
                month: scope.month,
                year: scope.year,
                hour: scope.hour,
                minute: scope.minute
              }
          );

          refreshSelectBox($(element).find('#' + scope.binding + '-year-select'), scope.year);
        }
      });

      scope.$watch('hour', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          ngModelCtrl.$setViewValue(
              {
                date: scope.date,
                month: scope.month,
                year: scope.year,
                hour: scope.hour,
                minute: scope.minute
              }
          );

          refreshSelectBox($(element).find('#' + scope.binding + '-hour-select'), scope.hour);
        }
      });

      scope.$watch('minute', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          ngModelCtrl.$setViewValue(
              {
                date: scope.date,
                month: scope.month,
                year: scope.year,
                hour: scope.hour,
                minute: scope.minute
              }
          );

          refreshSelectBox($(element).find('#' + scope.binding + '-minute-select'), scope.minute);
        }
      });

      // Parser from View Value to Model Value
      ngModelCtrl.$parsers.push(function (value) {
        if (scope.isInvalidDate() && scope.isInvalidMonth() && scope.isInvalidYear()) {
          if (scope.timePicker != 'none' && scope.isShowTimePicker == true) {
            if (scope.isInvalidHour() && scope.isInvalidMinute()) {
              return null;
            }
          } else {
            return null;
          }
        }

        if (scope.isInvalidDate() || scope.isInvalidMonth() || scope.isInvalidYear()) {
          return new Date('');
        } else {
          if ((scope.timePicker != 'none' && scope.isShowTimePicker == true) &&
              (scope.isInvalidHour() || scope.isInvalidMinute())) {
            return new Date('');
          }
        }

        var newDate;
        if (scope.timePicker != 'none' && scope.isShowTimePicker == true) {
          newDate = new Date(value.year, value.month, value.date, value.hour, value.minute, 0, 0);
        } else {
          newDate = new Date(value.year, value.month, value.date, 0, 0, 0, 0);
        }

        var modelValue;
        if (newDate instanceof Date) {
          modelValue = newDate.getTime();
        } else {
          modelValue = null;
        }

        return modelValue;
      });

      scope.$watchCollection(function() {
        return $(element).find(MONTH_SELECTOR).find('option').length;
      }, function(newValue, oldValue) {
        if (newValue != oldValue) {
          $(element).find(MONTH_SELECTOR).selectpicker('setStyle', scope.boxStyle).selectpicker('refresh');
        }
      });

      scope.$watchCollection(function() {
        return $(element).find(DATE_SELECTOR).find('option').length;
      }, function(newValue, oldValue) {
        if (newValue != oldValue) {
          $(element).find(DATE_SELECTOR).selectpicker('setStyle', scope.boxStyle).selectpicker('refresh');
        }
      });

      // Init Bootstrap Select
      var selectBoxes = $(element).find('select');
      scope.$applyAsync(function () {
        $(selectBoxes).each(function () {
          $(this).selectpicker('setStyle', scope.boxStyle);
        })

        // Initilize event Blur for directive
        initEventForComplexElement('blur', 'all', '.dropdown-toggle,.dropdown-menu', 'div.combo-date-picker.row',
            $(element));
      });

      // Validation stuff
      scope.errorMessage = '';

      var failHandler = function (constraint) {
        scope.errorMessage = constraint.messageId;
      };

      var passHandler = function (constraint) {
        scope.errorMessage = '';
      };

      $(element).on('blur', function (event) {
        if (scope.isValidationOnBlur) {
          scope.validate();
          scope.isValidationOnBlur = false;
        }
      });

      $(element).on('change', function (event) {
        if (scope.lastModelValue != scope.ngModel) {
          scope.validate();

          scope.isValidationOnBlur = false;
          scope.lastModelValue = scope.ngModel;
        }
      });

      scope.validate = function () {
        var validator = scope.$parent.validator;
        if (!validator) {
          return;
        }

        validator.validateField(formName, scope.fieldName, scope.ngModel, failHandler, passHandler);
      }


      scope.showTimePicker = function () {
        scope.isShowTimePicker = true;
        $(document.activeElement).blur();
      }

    },
    templateUrl: function (elem, attr) {
      var templateUrl = '/js/directive/template/custom-ng-combo-datetime-picker.html';
      return templateUrl;
    }
  }; //end return
};
