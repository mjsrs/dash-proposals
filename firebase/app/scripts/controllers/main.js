'use strict';

/**
 * @ngdoc function
 * @name firebaseApp.controller:MainCtrl
 * @description
 * # data
 * Controller of the firebaseApp
 */

angular.module('firebaseApp')
  .controller('data', function ($scope, Ref, $firebaseArray, $firebaseObject, $timeout) {

    function alert(msg) {
      $scope.err = msg;
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    }
    $scope.proposals = $firebaseArray(Ref.child('proposals'));
    $scope.masternodes = $firebaseObject(Ref.child('masternodes'));

    // display any errors
    $scope.proposals.$loaded().catch(alert);
    //$scope.masternodes.$loaded().catch(alert);

    /*$scope.open = function (hash) {
      $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'voteModal.html',
        hash: hash
      });
    };*/


  });
