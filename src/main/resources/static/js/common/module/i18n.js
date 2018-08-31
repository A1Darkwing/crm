angular.module('i18n', [ 'pascalprecht.translate', 'ngCookies']).config(['$translateProvider', function($translateProvider) {
  $translateProvider.useSanitizeValueStrategy('sanitize');
	$translateProvider.useUrlLoader('/i18n/lang.json');
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
		    '*': 'vi'
		  })
		  .determinePreferredLanguage();
		  lang = "vi";
		}
	}
	
	$translateProvider.useSanitizeValueStrategy("escape");
} ]);