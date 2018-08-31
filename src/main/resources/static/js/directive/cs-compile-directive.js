var compileDirective = function ($compile) {
  return function(scope, element, attrs) {
    scope.$watch(
      function(scope) {
        // watch the 'csCompile' expression for changes
        return scope.$eval(attrs.csCompile);
      },
      function(newValue) {
        // when the 'csCompile' expression changes
        // assign it into the current DOM
        element.html(newValue);

        // compile the new DOM and link it to the current
        // scope.
        // NOTE: we only compile .childNodes so that
        // we don't get into infinite loop compiling ourselves
        $compile(element.contents())(scope);

        // notifies that the DOM has been rendered
        scope.isRedered = true;
      }
    );
  };
};