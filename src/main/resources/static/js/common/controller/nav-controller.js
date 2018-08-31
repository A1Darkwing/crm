module.controller('NavController', ['$scope', '$location', '$q', '$rootScope', '$timeout', '$translate', '$window',
  'ajax', 'navService', '$stomp', 'md5',
  function ($scope, $location, $q, $rootScope, $timeout, $translate, $window, ajax, navService, $stomp, md5) {
    consume_alert();
    $scope.item = null;
    $scope.lang = lang;
    $scope.notificationStatus = '';
    $scope.notifications = [];
    $scope.notificationUnseenNumber = 0;
    $scope.isLoadedAllNotifications = false;

    if (recaptchaEnable) {
      $.getScript("https://www.google.com/recaptcha/api.js");
    }

    /**
     * get Unseen Notification number
     */
    navService.loadUnseenNotifications($scope.notifications.length).then(
        function successCallback(response) {
          if (response != null) {
            $scope.notifications = response;
            $scope.calculateUnseenNumber();
          }
        }, function errorCallback(err) {
          $scope.notificationStatus = 'ERROR';
        });

    $scope.calculateUnseenNumber = function () {
      $scope.notificationUnseenNumber = 0;
      if ($scope.notifications.length > 0) {
        $scope.notifications.forEach(function (notification) {
          if (notification.unseen == true) {
            $scope.notificationUnseenNumber += 1;
          }
        });
      }
    }

    $('#notification-dropdown').on('shown.bs.dropdown', function () {
      if ($scope.notificationUnseenNumber > 0) {
        navService.updateNotificationsToSeen();
        $scope.notificationUnseenNumber = 0;
      } else if ($scope.notifications.length == 0) {
        $scope.loadNotifications(0);
      }
    });

    /**
     * load Notification
     */
    $scope.loadNotifications = function () {
      $scope.notificationStatus = 'LOAD';
      navService.loadNotifications($scope.notifications.length).then(
          function successCallback(response) {
            if (response != null) {
              if (response.length == 0) {
                $scope.isLoadedAllNotifications = true;
              } else {
                $scope.notifications = response;
              }
            }

            $scope.notificationStatus = '';
          }, function errorCallback(err) {
            $scope.notificationStatus = '';
          });
    }

    /**
     * parse Notification Link
     */
    $scope.parseNotificationLink = function (notification) {
      var notificationLink = '';
      switch (notification.type) {
        case 'NEW_USER_WELCOME':
          notificationLink = '/user#/profile';
          break;
        case 'NEW_EVENT':
          notificationLink = '/event/' + notification.eventId;
          break;
        case 'NEW_POST':
          notificationLink = '/post/' + notification.postId;
          break;
        case 'USER_COMMENT_POST':
          notificationLink = '/post/' + notification.postId;
          break;
        case 'SUBSCRIBED':
          notificationLink = '/user/' + notification.subscribeUserId;
          break;
        case 'UPCOMING_EVENT':
          notificationLink = '/event/' + notification.eventId;
          break;
        case 'NEW_ORG_NOTICE':
          notificationLink = '/' + notification.organizationId + '#/';
          break;
        case 'ORG_NOTICE_EXPIRE':
          notificationLink = '/' + notification.organizationId + '#/noticeeditor';
          break;
      }

      return notificationLink;
    }

    $scope.notificationClicked = function ($event) {
      $event.stopPropagation()
    }

    $scope.changeLanguage = function (lang) {
      var u = new Url;
      u.query.lang = lang;
      $window.location.href = u.decode(u.toString());
    };

    $scope.logout = function () {
      $('#logout').submit();
    }

    $stomp.setDebug(function (args) {
      //console.log(args)
    })
    var isError = false;
    var connected = false;
    $scope.catchWebSocket = function () {
      $stomp.connect('/ws-secured/init-api', {'X-CSRF-TOKEN': csrf_token}, function (data) {
        $timeout(function () {
          if (isError || data.command) {
            isError = true;
            //console.log("Error. Close connection...");
          } else {
            //console.log("Attempt to reconnect...");
            $scope.catchWebSocket();
          }
        }, WS_RECONNECT_TIMEOUT);
      })

          .then(function (frame) {
            connected = true;
            var subscription = $stomp.subscribe('/ws-secured/user/topic/notification', function (payload, headers, res) {
              if (payload) {
                if (payload.notification) {
                  $scope.handleWebSocketNotification(payload.notification);
                }
              }
            })
          })
    };
    $rootScope.$watch(function () {
      return $rootScope.loggedUser;
    }, function (newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue != null) {
          if (!connected) {
            //$scope.catchWebSocket();
          }
        } else {
          if (connected) {
            $stomp.disconnect();
          }
        }
      }
    }, true);

    /**
     * handle WebSocket Notification
     */
    $scope.handleWebSocketNotification = function (notification) {
      if ($scope.isNotificationActive()) {
        notification.unseen = false;
      } else {
        $scope.notificationUnseenNumber += 1;
      }

      $scope.notifications.unshift(notification);
      navService.updateNotificationsToSeen();
      $scope.$apply($scope.notifications);
    }

    $scope.isNotificationActive = function () {
      return $('#notification-dropdown .notification').hasClass('show');
    }

    var lastSearchText = "";
    $scope.autoCompleteOptions = {
      minimumChars: 0,
      activateOnFocus: true,
      containerCssClass: 'searchResult card',
      selectedTextAttr: 'name',
      itemTemplate: "<div><img src=\"/images/organization/avatar/sthumb/{{item.organizationId}}\" alt=\"...\" class=\"avatar\"> {{item.name}}</div>",
      data: function (searchText) {
        var promise = $timeout(function () {
          if (searchText.length < 3) {
            if (!$('#noResult').length) {
              $(".auto-complete-results").append("<div id=\"noResult\"> " + $translate.instant("search.noResult") + "</div>");
            }
            return [{id: 'na'}];
          }
          else {
            if (searchText === $('#searchBox').val()) {
              searchText = searchText.toLowerCase();
              return navService.searchFunction(searchText).then(
                  function successCallback(response) {
                    if (response != null && response.length > 0) {
                      $("#noResult").remove();
                      return response;
                    } else {
                      if (!$('#noResult').length) {
                        $(".auto-complete-results").append("<div id=\"noResult\"> " + $translate.instant("search.noResult") + "</div>");
                      }
                      return [{id: '0'}];
                    }
                  }, function errorCallback(err) {
                  });
            }
          }
          //cancel the timeout
          $timeout.cancel(promise);

        }, (500));
        return promise;
      },
      itemSelected: function (result) {
        $window.location.href = '/' + result.item.id;
      }
    };

    $scope.login = function () {
      if (!recaptchaEnable) {
        $scope.loginFormSubmit();
      } else {
        if (grecaptcha && grecaptcha.getResponse() && grecaptcha.getResponse().length > 0) {
          grecaptcha.reset();
          grecaptcha.execute();
        } else {
          grecaptcha.execute();
        }
      }
    }

    $scope.loginFormSubmit = function () {
      $('#passwordModal').val(md5.createHash($('#passwordModal').val()));
      $('#loginModalForm').submit();
    }

    $scope.onLoginSubmit = function (token) {
      var tabLoginEnabled = $("#login").hasClass("active");
      $('.recaptchaResponse').val(token);
      $scope.loginFormSubmit();
    }

    $window.onSubmit = $scope.onLoginSubmit;

  }]); // End of controller



