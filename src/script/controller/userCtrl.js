'use strict';

angular.module('app').controller('userCtrl', [
	'$scope', 
	'cacheServer',
	'userServer',
	'$state',
	function ($scope,cacheServer,userServer,$state) {
	if(!userServer.checkLogined()){
		$state.go('login');
	}
	$scope.image = cacheServer.get('imageUrl');
	$scope.username = cacheServer.get('username');
	$scope.userId = cacheServer.get('id'); 

	$scope.logout = function(){
		userServer.logout();
		$state.go('login');
	}
}])