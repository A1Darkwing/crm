/**
 * Copyright(c) 2017 Hiep Nguyen
 */

var customUploadSimpleDirective = function($parse) {
  return {
    restrict : 'A',
    link : function(scope, element, attrs) {
      var model = $parse(attrs.csUploadSimpleModel);
      var isMultiple = attrs.multiple;
      var modelSetter = model.assign;

      element.bind('change', function() {
        var values = element[0].files;
        scope.$apply(function() {
          if (isMultiple) {
            modelSetter(scope, values);
          } else {
            modelSetter(scope, values[0]);
          }
        });
      });
    }
  };
}