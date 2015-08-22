// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','uiGmapgoogle-maps','ngResource','angularLocalStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})



.config(function($stateProvider, $urlRouterProvider, $resourceProvider, $httpProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
  $httpProvider.interceptors.push('tokenInterceptor');
  $stateProvider
  .state('login', {
    url: '/',
    
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
   .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/produsen.html',
         controller: 'produsenCtrl'
      }
    }
  })


  // .state('produsen.add', {
  //   url: '/add',
  //   views: {
  //       'modal@': {
  //           templateUrl:
  //             function (stateParams) {
  //               $('#myModal').modal('toggle');
  //               return 'templates/addprodusen.html';
  //             }
  //       }
  //   }
  // })

  .state('distributor', {
    url: '/distributor',
    //abstract: true,
    templateUrl: 'templates/distributor.html',
   // controller: 'DistributorCtrl'
  })

  // .state('distributor.add', {
  //   url: '/add',
  //   views: {
  //       'modal@': {
  //           templateUrl:
  //             function (stateParams) {
  //               $('#myModal').modal('toggle');
  //               return 'templates/addprodusen.html';
  //             }
  //       }
  //   }
  // })



  .state('dashboard', {
    url: '/dashboard',
   // abstract: true,
    templateUrl: 'templates/dashboard.html',
    //controller: 'produsenCtrl'
  })

  .state('produsen.add', {
    url: '/add',
   // abstract: true,
    templateUrl: 'templates/list_barang.html',
    //controller: 'produsenCtrl'
  })

  .state('input_barang', {
    url: '/input_barang',
   // abstract: true,
    templateUrl: 'templates/input_barang.html',
    //controller: 'produsenCtrl'
  })

  .state('profile', {
    url: '/profile',
   // abstract: true,
    templateUrl: 'templates/profile.html',
    //controller: 'produsenCtrl'
  })
   .state('edit_profile', {
    url: '/edit_profile',
   // abstract: true,
    templateUrl: 'templates/edit_profile.html',
    //controller: 'produsenCtrl'
  })


  // .state('home', {
  //   url: '/app',
  //   abstract: true,
  //   templateUrl: 'templates/menu.html',
  //   controller: 'AppCtrl'
  // })

  // .state('app.home', {
  //   url: '/home',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/home.html',
  //        controller: 'homeCtrl'
  //     }
  //   }
  // })

  // .state('app.search', {
  //   url: '/search',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/search.html'
  //     }
  //   }
  // })

  // .state('app.tambah_barang', {
  //     url: '/tambah_barang',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/tambah_barang.html'
  //       }
  //     }
  //   })
  //   .state('app.playlists', {
  //     url: '/playlists',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/playlists.html',
  //         controller: 'PlaylistsCtrl'
  //       }
  //     }
  //   })

  // .state('app.single', {
  //   url: '/playlists/:playlistId',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/playlist.html',
  //       controller: 'PlaylistCtrl'
  //     }
  //   }
  // })
  ;
  // if none of the above states are matched, use this as the fallback
 $urlRouterProvider.otherwise('/');
}).factory('tokenInterceptor', function(AccessToken) {
  return {
    request: function(config) {
      var token = AccessToken.get();
      if (token) {
        config.headers['Authorization'] = "Token " + token;
      }
      return config;
    }
  };
});
