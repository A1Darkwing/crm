<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<!-- If you using JSON, then it is not possible to submit the CSRF token within an HTTP parameter.
Instead you can submit the token within a HTTP header. A typical pattern would be to include the CSRF token within your meta tags. -->
<meta name="_csrf" content="${_csrf.token}"/>
<!-- default header name is X-CSRF-TOKEN -->
<meta name="_csrf_header" content="${_csrf.headerName}"/>

<!-- Fonts and Icons -->
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"/>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" href="/libs/font-awesome/css/font-awesome.min.css"/>

<!-- Jquery -->
<script src="/libs/jquery/dist/jquery.min.js"></script>
<script src="/libs/components-jqueryui/jquery-ui.js"></script>
<script src="/libs/components-jqueryui/ui/position.js"></script>
<script src="/libs/js-polyfills/polyfill.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/core-js/2.4.1/core.js"></script>

<!-- Theme plugin -->
<script src="/libs/perfect-scrollbar/dist/perfect-scrollbar.min.js"></script>
<link rel="stylesheet" href="/libs/perfect-scrollbar/css/perfect-scrollbar.css"/>
<script src="/libs/popper.js/dist/umd/popper.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/core-js/2.4.1/core.js"></script>
<script src="/libs/arrive/minified/arrive.min.js"></script>
<script src="/libs/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js"></script>
<script src="/libs/chartist/dist/chartist.min.js"></script>
<script src="/libs/bootstrap-select/dist/js/bootstrap-select.js"></script>
<script src="/libs/sweetalert2/dist/sweetalert2.js"></script>

<script src="/libs/domurl/url.js"></script>
<script src="/libs/jasny-bootstrap/js/fileinput.js"></script>

<!-- Bootstrap CSS -->
<!--
<link rel="stylesheet" type="text/css" href="/libs/bootstrap3/dist/css/bootstrap.min.css">
-->
<script src="/libs/bootstrap3/dist/js/bootstrap.min.js"></script>

<!-- UI -->

<link rel="stylesheet" type="text/css" href="/custom-libs/material/material-dashboard.css">

<script src="/custom-libs/material/material.min.js"></script>
<!--should loaded after loading field
<script src="/custom-libs/material/material-dashboard.js"></script>
-->
<script src="/custom-libs/material/bootstrap-notify.js"></script>



<script src="/custom-libs/material/core/popper.min.js" type="text/javascript"></script>
<script src="/custom-libs/material/core/bootstrap-material-design.min.js" type="text/javascript"></script>
<script src="/custom-libs/material/core/perfect-scrollbar.jquery.min.js" type="text/javascript"></script>

<!--
<link rel="stylesheet" type="text/css" href="/css/common/admin.css">
-->
<script src="/libs/autosize/dist/autosize.min.js"></script>
<link rel="stylesheet" type="text/css" href="/css/common/mobile-fix.css">

<!-- Angular -->
<script src="/libs/angular/angular.min.js"></script>
<script src="/libs/angular-route/angular-route.min.js"></script>
<script src="/libs/angular-resource/angular-resource.min.js"></script>
<script src="/libs/angular-cookies/angular-cookies.min.js"></script>
<script src="/libs/angular-translate/dist/angular-translate.js"></script>
<script src="/libs/angular-translate-loader-static-files/angular-translate-loader-static-files.js"></script>
<script src="/libs/angular-translate-loader-url/angular-translate-loader-url.js"></script>
<script src="/libs/angular-translate-storage-local/angular-translate-storage-local.js"></script>
<script src="/libs/angular-translate-storage-cookie/angular-translate-storage-cookie.js"></script>
<script src="/libs/angular-animate/angular-animate.min.js"></script>
<script src="/libs/angular-sanitize/angular-sanitize.js"></script>
<script src="/libs/angular-paging/dist/paging.js"></script>
<script src="/libs/sockjs-client/dist/sockjs.min.js"></script>
<script src="/libs/stomp-websocket/lib/stomp.min.js"></script>
<script src="/js/common/module/stomp-client.js"></script>
<script src="/js/directive/on-scroll-directive.js"></script>
<script src="/libs/ng-idle/angular-idle.min.js"></script>
<script src="/js/directive/cs-compile-directive.js"></script>

<!-- Interceptors -->
<script src="/js/common/interceptors/exception-interceptor.js"></script>

<!-- Common -->
<script src="/js/common/common.js"></script>
<script src="/js/common/validation-utils.js"></script>
<script src="/js/common/form-meta-constant.js"></script>
<script src="/js/common/services/ajax-service.js"></script>
<script src="/js/common/services/validation-service.js"></script>
<script src="/js/directive/input-directive.js"></script>
<script src="/js/common/services/validation-service-new.js"></script>
<script src="/js/directive/select-directive.js"></script>
<script src="/js/directive/combo-datetime-picker-directive.js"></script>
<script src="/js/directive/tags-input-directive.js"></script>
<script src="/js/directive/upload-simple-directive.js"></script>
<script src="/js/directive/carousel-directive.js"></script>
<script src="/js/common/module/angular-location-update.js"></script>
<script src="/js/common/common-module.js"></script>
<script src="/js/common/module/i18n-admin.js"></script>

<!-- Angular Tags input -->
<script src="/libs/ng-tags-input/build/ng-tags-input.min.js"></script>
<!--
<link rel="stylesheet" type="text/css" href="/css/common/ng-tags-input-custom.css">
-->
<!-- Angular ngComboDatePicker -->

<link rel="stylesheet" type="text/css" href="/libs/angular-auto-complete/angular-auto-complete.css">
<script src="/libs/angular-auto-complete/angular-auto-complete.js"></script>

<script src="/libs/js-cookie/src/js.cookie.js"></script>


<!-- Other libraries -->
<script src="/libs/pnotify/dist/pnotify.js"></script>
<script src="/libs/pnotify/dist/pnotify.buttons.js"></script>
<link rel="stylesheet" href="/libs/pnotify/dist/pnotify.css"/>
<link rel="stylesheet" href="/libs/pnotify/dist/pnotify.brighttheme.css"/>
<link rel="stylesheet" href="/libs/pnotify/dist/pnotify.buttons.css"/>
<link rel="stylesheet" href="/libs/ionicons/dist/css/ionicons.min.css"/>
<link rel="stylesheet" type="text/css" href="/libs/animate.css/animate.css">

<!-- Upload -->
<script src="/libs/ng-file-upload/dist/ng-file-upload-all.min.js"></script>

<script src="/libs/angular-loading-bar/build/loading-bar.js"></script>
<link rel="stylesheet" type="text/css" href="/libs/angular-loading-bar/build/loading-bar.css">

<script>
  var DOMAIN = "${pageContext.request.contextPath}";
  var lang = "vi";
  //require CSRF token within an HTTP parameter
  var csrf_token = document.querySelector('meta[name="_csrf"]').getAttribute('content');
  var timeOffset = 7.0;
</script>

