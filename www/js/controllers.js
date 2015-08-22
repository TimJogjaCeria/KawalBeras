angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};


  $ionicModal.fromTemplateUrl('templates/produsen_modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

    $ionicModal.fromTemplateUrl('templates/distributor_modal.html', {
    scope: $scope
  }).then(function(modal_distributor) {
    $scope.modal_distributor = modal_distributor;
  });

  // Triggered in the login modal to close it
  $scope.close_produsen_modal = function() {
    $scope.modal.hide();
  };

   $scope.close_distributor_modal = function() {
    $scope.modal_distributor.hide();
  };

  // Open the login modal
  $scope.produsen_modal = function() {
    $scope.modal.show();
  };

    $scope.distributor_modal = function() {
    $scope.modal_distributor.show();
  };


})

// for produsen controller
.controller('produsenCtrl', function($scope, $ionicModal, $timeout) {
  $ionicModal.fromTemplateUrl('templates/produsen_modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.close_produsen_modal = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.produsen_modal = function() {
    $scope.modal.show();
  };
  
  $scope.map = { center: { latitude: -0.7893, longitude: 114 }, zoom: 4 };
  var onSuccess = function(position) {
    $scope.map.center = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };
    $scope.map.zoom = 10;
    $scope.$apply();
  }
  function onError(error) {
      console.log('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
  }
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
  $scope.markers = [];
  // dummy random data for markers
  for (var i = 0; i < 12; i++) {

    $scope.markers.push({
      id: i,
      latitude: Math.random() * 10,
      longitude: parseInt(Math.random() * 10),
      showWindow: false,
      options: {
        labelContent: "Markers id 1",
        labelAnchor: "22 0",
        labelClass: "marker-labels"
      }
    })
  }
  // if more than 10 fill fit automically
  $timeout(function() {
    // $scope.isFit = $scope.markers.length > 10 ? true : false;
  }, 3000);
  
  
})

.controller('produsenAddCtrl', function($scope, $ionicModal) {
    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });  
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
