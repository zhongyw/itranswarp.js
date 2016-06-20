/**
 * Created by zw198307163.com on 2015/10/19.
 */
var myAppModule = angular.module('myAppModule',[]);

myAppModule.controller('myAppController', function($scope,calculateService,$http){
    $scope.quantity = 1;
    $scope.quantityResult = 0;
    $scope.commitType = "Bug";
    $scope.calculateQuantity = function(){
        $scope.quantityResult = calculateService.calculate($scope.quantity,10);
    };
    $scope.clearForm = function(){
        $scope.bug = "";
        $scope.title = "";
        $scope.rootCause = "";
        $scope.solution = "";
        $scope.svn = "";

    }
    $scope.crchange = function(opt){
        $(".code-review-show ").text(opt);
    }
    $scope.fetchJiraData = function(opt){
        $http({
            method: 'post',
            url: '/api/jira/fetchData'
        }).success(function(data, status, headers, config) {
            console.log("fetchData success");
        }).error(function(data, status, headers, config) {
            console.log("fetchData fail");
        });
    }

});
myAppModule.factory('calculateService', function(){
    return {
        calculate:function(xval, yval){
            return xval * yval;
        }
    }
})