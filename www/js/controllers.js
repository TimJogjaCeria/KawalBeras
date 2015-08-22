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
.controller('produsenCtrl', function($scope) {
  // don't be scared by the image value, its just datauri
  
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  $scope.markers = [
        {
          id: 1,
          latitude: 100,
          longitude: -23,
          showWindow: false,
          options: {
            labelContent: 'Markers id 1',
            labelAnchor: "22 0",
            labelClass: "marker-labels"
          }
        }];
  $scope.isFit = $scope.markers > 10 ? true : false;

})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
