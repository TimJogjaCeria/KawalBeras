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

.controller('LoginCtrl', function($scope, $timeout, Api, AccessToken,$state) {

  $scope.validateUser = function(){
    login = new Api({username:$scope.user.username,password:$scope.user.password,action:"token-auth"});
    login.$save(function(data){
      console.log(data.token)
      if(data.token){
        AccessToken.set(data.token);
        $state.go('app.home');
      }
    })
  }

})

// for produsen controller
.controller('produsenCtrl', function($scope, $ionicModal, $timeout, Api, $http) {
  $scope.markers = []
  Api.query({action: "komoditas",def: "barang"},function(data){
    getDetail(data)
    // if(data.next){
    //   reFind(data.next)
    // }
  })
  reFind = function(url){
    $http.get(url,function(data){
      getDetail(data.results)
      if(data.next){
        reFind(data.next)
      }
    })
  }
  getDetail = function(data){
    var golek = _.groupBy(data, 'user.id');
    var group = [];
    var cari = []
    for (var v in golek) {
      cari.push(v)
      // group.push(v[0].user.id)
    };
    _.each(cari,function(c){
      console.log(golek[c])
      group.push(golek[c][0].user.id)
    })
    // var group = _.pluck(_.groupBy(data, 'user.id'),'user.id');
    console.log(group);
    var uniq = _.pluck(_.uniq(data, 'user.id'),'user.id');
    console.log(uniq);
    var notIn = _.pull(group,uniq);
    console.log(notIn);
    common = _.filter(data, function(n) {
      return !isInArray(n.user.id,notIn);
    })
    byUser = _.filter(data, function(n) {
      return !isInArray(n.user.id,notIn);
    })
    _.each(common,function(dt){
      // dt = _.merge(dt, dt.user)
      // options: {
  //       labelContent: "Markers id 1",
  //       labelAnchor: "22 0",
  //       labelClass: "marker-labels"
  //     }
      if(dt.latitude == 0){
        dt.latitude = dt.user.latitude;
        dt.longitude = dt.user.longitude;
      }
      dt.options = {
        labelContent: "<p class='user'>"+dt.user.username+"</p><p class='kind'>"+dt.jenis+"</p><p class='price-box'><div class='stock'>"+dt.stok+"</div><div class='price'>"+dt.price+"</div></p>",
        // labelAnchor: "22 0",
        labelClass: "marker-labels"
      }
      console.log(dt);
      $scope.markers.push(dt)
    })
    _.each(notIn,function(dt1){
      findUser =  _.filter(data, function(n) {
        return n.user.id === dt1
      })
      var box = ""
      var i = _.findIndex(data, function(chr) {
        return chr.user.id == dt1;
      });
      datas = data[i].user;
      _.each(findUser,function(u,ind){
        box += (ind === 0 ? "<p class='user'>"+u.user.username+"</p>": '')+"<p class='kind'>"+u.jenis+"</p><p class='price-box'><div class='stock'>"+u.stok+"</div><div class='price'>"+u.price+"</div></p><div class='line'></div>";
      })
      datas.options = {
        labelContent: box,
        // labelAnchor: "22 0",
        labelClass: "marker-labels"
      }
      $scope.markers.push(datas)
    })
  }

  function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }
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
  
  // dummy random data for markers
  // for (var i = 0; i < 12; i++) {

  //   $scope.markers.push({
  //     id: i,
  //     latitude: Math.random() * 10,
  //     longitude: parseInt(Math.random() * 10),
  //     showWindow: false,
  //     options: {
  //       labelContent: "Markers id 1",
  //       labelAnchor: "22 0",
  //       labelClass: "marker-labels"
  //     }
  //   })
  // }
  // if more than 10 fill fit automically
  $timeout(function() {
    // $scope.isFit = $scope.markers.length > 10 ? true : false;
  }, 3000);
  
  
})







.controller('profileController', function($scope, $ionicModal, $timeout, Api) {
  Api.get({action: "profile"},function(data){
    //console.log(data);
    $scope.prof= data;
  })  
})


.controller('barangController', function($scope, $ionicModal, $timeout, Api) {
 $scope.createBarang = function(barang) {
        barang = _.merge(barang,{action: "komoditas",def: "barang"})
        var results = Api.save(barang,function(data){
    //console.log(data);
   // $scope.prof= data;
        })
    }  
})



.controller('edit_profileController', function($scope, $ionicModal, $timeout, Api) {
  Api.get({action: "profile"},function(data){
    //console.log(data);
    $scope.prof= data;
  })  

  $scope.updateProfile = function(prof) {  

    alert("fd");
      
        //console.log(data);

    
    //  alert(result);
  } 
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
})
.factory('Api', ['$resource', function($resource) {
    return $resource('http://jogjaceria.aijogja.com:80/api/:action/:def/',{
      action:'@action',
      def:'@def',
      ids:'@ids'
    });
}])
.service('AccessToken', ['storage', '$timeout',function(storage, $timeout) {
  return {
    get: function() {
      return storage.get('token');
    },
    set: function(token) {
      return storage.set('token',token);
    },
    "delete": function() {
      return storage.clearAll()
    }
  };
}]);