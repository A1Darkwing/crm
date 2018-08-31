function determineBaseURL() {
  var u  = new Url;
  return (!u.path.startsWith('/admin'));
}

function showNotification(type, content) {
  $.notify({
      icon: "notifications",
      message: content

  }, {
      type: type,
      timer: 3000,
      placement: {
          from: 'top',
          align: 'right'
      }
  });
}

function showErrorMessage(text) {
  if (determineBaseURL()) {
    var notice = new PNotify({
      text: text,
      type: 'error',
      buttons: {
        sticker: false
      }
    });
  } else {
    showNotification('danger', text);
  }
}

function showErrorMessageWithTitle(title, text) {
  if (determineBaseURL()) {
    var notice = new PNotify({
      title: title,
      text: text,
      type: 'error',
      buttons: {
        sticker: false
      }
    });
  } else {
    showNotification('danger', text);
  }
}

function showInfoMessage(text) {
  if (determineBaseURL()) {
    var notice = new PNotify({
      text: text,
      type: 'info',
      buttons: {
        sticker: false
      }
    });
    notice.get().click(function () {
      notice.remove();
    });
  } else {
    showNotification('info', text);
  };
}

function showInfoMessageWithDelay(text,timer) {
	  if (determineBaseURL()) {
	    var notice = new PNotify({
	      text: text,
	      type: 'info',
	      delay: timer,
	      buttons: {
	        sticker: false
	      }
	    });
	    
	    notice.get().click(function () {
	      notice.remove();
	    });
	  } else {
	    showNotification('info', text);
	  };
	}


function showSuccessMessage(text) {
  if (determineBaseURL()) {
    var notice = new PNotify({
      text: text,
      type: 'success',
      buttons: {
        sticker: false
      }
    });
    notice.get().click(function () {
      notice.remove();
    });
  } else {
    showNotification('success', text);
  }
}

function showNoticeMessage(text) {
  if (determineBaseURL()) {
    var notice = new PNotify({
      text: text,
      buttons: {
        sticker: false
      }
    });
    notice.get().click(function () {
      notice.remove();
    });
  } else {
    showNotification('warning', text);
  }
}

function consume_alert() {
  window.alert = function (message) {
    new PNotify({
      title: 'Alert',
      text: message
    });
  };
}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

function initIE() {
  if (detectIE()) {
      $(function() {
        $('.selectpicker').selectpicker();
      });
  }
}

function normalize(n) {
  return n = n.toLowerCase(),
      n = n.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a"),
      n = n.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e"),
      n = n.replace(/ì|í|ị|ỉ|ĩ/g, "i"),
      n = n.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o"),
      n = n.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u"),
      n = n.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y"), n = n.replace(/đ/g, "d");
}

function expandTextarea(id, defaultSize) {
  document.getElementById(id).addEventListener('keyup', function() {
      this.style.overflow = 'hidden';
      this.style.height = defaultSize;
      this.style.height = this.scrollHeight + 'px';
  }, false);
}

(function ($) {
  $.isBlank = function (obj) {
    return (!obj || $.trim(obj) === "");
  };
})(jQuery);

//------------------------ VALIDATION UTIL ----------------------
function isEmptyString(prop) {
  if (prop == null || prop == "") {
    return true;
  } else {
    return false;
  }
}

function isLargeString(prop, length) {
  if (prop.length > length) {
    return true;
  } else {
    return false;
  }
}

function isShortString(prop, length) {
  if (prop.length < length) {
    return true;
  } else {
    return false;
  }
}

function isInvalidId(prop) {
  if (prop < 1) {
    return true;
  } else {
    return false;
  }
}

function isInvalidEmail(email) {
  if (email.length == 0) {
    return false;
  }
  var re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (re.test(email) == false) {
    return true;
  } else {
    return false;
  }
}

function isNotTextAndNumber(text) {
  if (text.length == 0) {
    return false;
  }
  var re = /^[0-9a-zA-Z_]+$/;
  if (re.test(text) == false) {
    return true;
  } else {
    return false;
  }
}

function isNumber(o) {
  return !isNaN(o - 0) && o !== null && o !== "" && o !== false;
}

function isInteger(o) {
  if (isNumber(o) && (Math.floor(o) == o)) {
    return true;
  } else
    return false;
}

// Validate the range between two range
function checkDateInRange(date1, date2, range) {
  var one_day = 1000 * 60 * 60 * 24;
  var difference = Math.round(Math.abs(date1 - date2) / one_day);
  if (difference <= range) {
    return true;
  } else {
    return false;
  }
}

function replaceById(list, item) {
  for (var i in list) {
    if (list[i].id == item.id) {
      list[i] = item;
    }
  }
}

function deleteById(list, id) {
  for (var i in list) {
    if (list[i].id == id) {
      list.splice(i, 1);
    }
  }
}

/**
 * demeterminate object is undefined or not
 *
 * @param object
 * @returns True if object is undefined and vice versa
 */
function isUndefined(object) {
  return (typeof(myVariable) != 'undefined');
}

//----------------------------------------------------------------
//---------------------  STRING FUNCTIONS ------------------------
//----------------------------------------------------------------

/**
 * check whether a String constains another String or not. This function is casesencitive
 */
function isContains(containingStr, containedStr) {
  if (isEmptyString(containingStr)) {
    return false;
  }

  if (isEmptyString(containedStr)) {
    return true;
  }

  return containingStr.indexOf(containedStr) != -1;
}

/**
 * check whether a String constains another String or not. This function is incasesencitive
 */
function isContainsIgnoreCase(containingStr, containedStr) {
  if (isEmptyString(containingStr)) {
    return false;
  }

  if (isEmptyString(containedStr)) {
    return true;
  }

  return containingStr.toLowerCase().indexOf(containedStr.toLowerCase()) != -1;
}

/**
 * check whether parameter is a simple string
 */
function isString(obj) {
  return (typeof obj == 'string');
}

// Random Number
function random() {
  return Math.floor(Math.random() * 100000 + 1);
}

// Get current DateTime base on variable "timeOffset"
function getCurrentDateTime() {
  timeOffset = timeOffset || 7.0;
  var d = new Date();
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;
  var nd = utc + (3600000 * timeOffset);
  return nd;
}

/**
 * init event for element that contains children elements
 *
 * @param event event that we can to trigger
 * @param conditionType ['all', 'any']
 * @param triggerElements ['select', 'input',...]
 * @param conditionElement
 * @param element container element
 */
function initEventForComplexElement(event, conditionType, triggerElements, conditionElement, element) {
  if ($(triggerElements, element).length == 0) {
    return false;
  }

  if (conditionType == 'all') {
    // Only trigger event when all children element is trigger event example: onBlur, etc
    $(triggerElements, element).on(event, function (eventObj) {
      setTimeout(function() {
        var isAllBlured = true;

        if (document.querySelector(conditionElement) === document.activeElement) {
          isAllBlured = false;
        }

        if (isAllBlured) {
          element.trigger(event);
        }

      }, 10);
    });

    return true;
  } else if (conditionType == 'any') {
    // Trigger event when any children element is trigger example: click, focus, etc
    $(triggerElements, element).on(event, function (eventObj) {
      element.trigger(event);
    });

      return true;
  }

  return false;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Defined Exception to break $.each()
var BreakException = {};

// Check whether is a function
function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

/**
 * parse name to lower case and add '-'
 *
 * @param inputName
 */
function parseToIdName (inputName) {
  var outputName = '';

  for (var i = 0; i < inputName.length; i++) {
    var char = inputName.charAt(i);
    if (char === char.toUpperCase()) {
      outputName += '-';
      outputName += inputName.charAt(i).toLowerCase();
    } else {
      outputName += inputName.charAt(i);
    }
  }

  if (outputName.charAt(0) === '-') {
    outputName = outputName.substring(1);
  }

  outputName = outputName.replace(/-+/g, '-');
  return outputName;
}