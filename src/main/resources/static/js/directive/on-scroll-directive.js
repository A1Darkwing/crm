var onScrollDirective = function ($window) {
  return {
    restrict: 'E',
    scope: {
      onChange: '&',
      gridBegin: '@',
      gridEnd: '@'
    },
    link: function (scope, element, attrs, $window) {
      $(window).on('scroll', function (event) {
        var windowHeight = $(screen)[0].height;
        var windowTop = $(window).scrollTop();
        var gridBegin = windowTop + windowHeight*scope.gridBegin/10;
        var gridEnd = windowTop + windowHeight*scope.gridEnd/10;
        $('.scroll-element-child').each(function() {
          var thisTop = $(this).offset().top;
          if (thisTop >= gridBegin && (thisTop + $(this).height()) < gridEnd) {
            var parentDiv = $(this).closest('div.scroll-element-parent');
            var parentId = parentDiv[0].id;
            scope.onChange({'divId': parentId});
            return;
          }
        });
      });
    }
  };
};