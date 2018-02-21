(function () {
  angular.module('IntercomExercise', [
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'ngMessages',
    'ngToast'
  ])
    .config(function appConfig ($logProvider, $compileProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/')
      $locationProvider.html5Mode(true)
    })
    .controller('AppCtrl', function AppCtrl ($scope, $localStorage, $location, $sessionStorage) {
      $sessionStorage.$reset() // clear storage

      $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(toState.data.pageTitle)) {
          $scope.pageTitle = toState.data.pageTitle + ' | Intercom'
        }
      })
    })
})()
