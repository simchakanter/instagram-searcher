var instaSearch = angular.module("instagramSearcherApp", []);

instaSearch.controller("InstagramSearchCtrl", function($scope, $http) {
  $scope.showPics = false;
  $scope.search = function(keyword) {
    if (!keyword) {
      $scope.formError = true;
      return false;
    }
    $scope.searchInProgress = true;
    $scope.keyword = keyword;
    $scope.formError = false;
    var url = "https://api.instagram.com/v1/tags/" + keyword + "/media/recent";
    var request = {
      callback:"JSON_CALLBACK",
      client_id: "4940fe38623144c6b8cc6ee7c6a8c7a2"
    };
    $http({
      method: "JSONP",
      url: url,
      params: request
    })
    .success(function(result) {
      console.log(result);
      $scope.results = result.data;
      $scope.resultMessage = "We found " + $scope.results.length + " results for " + $scope.keyword;
      $scope.keyword = "";
      $scope.searchInProgress = false;
      $scope.showPics= true;
    })
    .error(function() {
      alert('Error!');
    });
  };
});
