(function () {
  'use strict'
  angular.module('IntercomExercise')
    .config(function config ($stateProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          controller: 'HomeCtrl as vm',
          templateUrl: 'app/home/home.html',
          data: {pageTitle: 'Dashboard'}
        })
    })

    .controller('HomeCtrl', function ($scope, $localStorage, $state, DataService) {
      let vm = this

      console.log('home controller')

      vm.filter = 100
      vm.init = init

      init()

      function init () {
        DataService.getCustomers({distance: parseInt(vm.filter)})
          .then(resp => {
            console.log(resp, 'Response')
            vm.customers = resp.data
          })
      }
    })
}())
