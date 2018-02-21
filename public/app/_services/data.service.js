
(function () {
  angular.module('IntercomExercise').factory('DataService', dataService)

  function dataService ($http, $localStorage, $q, ngToast) {
    const apiUrl = '/api/v1/'

    return {
      getCustomers
    }

    /** **________********_______********________****/

    function getCustomers (data) {
      return $http.post(apiUrl + 'getCustomers', data)
        .then(resp => {
          console.log(resp, 'ALL SCHEDULES')
          return resp.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}())
