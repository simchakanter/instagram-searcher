var instaSearch = angular.module("instagramSearcherApp", ["ngAnimate"]);

instaSearch.controller("InstagramSearchCtrl", function($scope, $http) {
  $scope.showPics = false;
  $scope.search = function(keyword) {
    if ($scope.searchForm.$invalid) {
      return false;
    }
    // $scope.keyword = keyword;
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
      // I moved the result message into the view. Best practice.
      $scope.lastKeyword = $scope.keyword;
      $scope.keyword = "";
      $scope.showPics= true;
      $scope.searchSubmitted = false;
    })
    .error(function() {
      alert('Error!');
    });
  };
});
