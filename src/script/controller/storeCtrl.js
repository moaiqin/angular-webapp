'use strict';

angular.module('app').controller('storeCtrl', [
	'$scope',
	'userServer', 
	'$state',
	function ($scope,userServer,$state) {
	if(!userServer.checkLogined()){
		$state.go('login');
	}
	userServer.getStore().then(function(res){
		$scope.positionList = res;
	})
}])