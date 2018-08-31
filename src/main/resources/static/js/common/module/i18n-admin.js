angular.module('i18n', [ 'pascalprecht.translate', 'ngCookies']).config(['$translateProvider', function($translateProvider) {
	/*$.postSync('/i18n/curr', '', function(data) {
		alert(data);
	});*/
  
	$translateProvider.useUrlLoader('/i18n/admin/lang.json');
	if (lang != "") {
		$translateProvider.preferredLanguage(lang);
		Cookies.set("defaultLang", lang, { expires: 60 });
	} else {
		var defaultLang = Cookies.get("defaultLang");
		if(!$.isBlank(defaultLang)) {
			lang = defaultLang;
			$translateProvider.preferredLanguage(defaultLang);
		} else {
		  $translateProvider
		  .registerAvailableLanguageKeys(['en', 'vi'], {
		    /*'en_*': 'en',*/
		    '*': 'en'
		  })
		  .determinePreferredLanguage();
		}
	}
	
	$translateProvider.useSanitizeValueStrategy("escape");
} ]);

app.factory('customStorage',['ajax'], function (ajax) {
  return {
    put: function (name, value) {
      // store `value` under `name` somehow
    },
    get: function (name) {
      // request value of `name` somehow
    }
  };
});