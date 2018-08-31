var imageDirective = function () {
  return {
    scope: {
      hideWhenNull: '@'
    },
    link: function (scope, element, attrs) {
      element.bind('error', function () {
        if (attrs.src != attrs.errSrc) {
          if (scope.hideWhenNull != undefined) {
            attrs.$set('style', 'display:none;');
          } else {
            attrs.$set('src', '/images/common/placeholder.jpg');
          }
        }
      });
      element.bind('load', function() {
        attrs.$set('style', '');
      });
      if (attrs.src == undefined || attrs.src == "") {
        if (scope.hideWhenNull != undefined) {
          attrs.$set('style', 'display:none;');
        } else {
          attrs.$set('src', '/images/common/placeholder.jpg');
        }
      }
    }
  };
};