var carouselIndicator = function () {
  return {
    scope: {
      index: '@'
    },
    link: function (scope, element, attrs) {
      $(element).attr('data-slide-to', scope.index).css('cursor', 'pointer');
    }
  };
}