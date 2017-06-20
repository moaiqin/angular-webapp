'use strict';

angular.module('app').controller('loginCtrl', [
	'$scope',
	'userServer',
	'$state',
	'cacheServer',
	function ($scope,userServer,$state,cacheServer) {
	$scope.submit = function(){
		userServer.login($scope.user).then(function(res){
			if(res.id){
				$state.go('user');
			}
		});
	}
}])