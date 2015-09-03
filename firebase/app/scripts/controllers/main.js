'use strict';

/**
 * @ngdoc function
 * @name firebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseApp
 */
var app = angular.module('firebaseApp')
  .controller('MainCtrl', function ($scope, Ref, $firebaseArray) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.proposals = $firebaseArray(Ref.child('proposals'));

  });

angular.module('firebaseApp')
  .controller('data', function ($scope, Ref, $firebaseArray, $timeout) {

    function alert(msg) {
      $scope.err = msg;
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    }
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.proposals = $firebaseArray(Ref.child('proposals'));

    // display any errors
    $scope.proposals.$loaded().catch(alert);

    // provide a method for adding a message
    // $scope.addMessage = function(newMessage) {
    //   if( newMessage ) {
    //     // push a message to the end of the array
    //     $scope.messages.$add({text: newMessage})
    //       // display any errors
    //       .catch(alert);
    //   }
    // };


  });
