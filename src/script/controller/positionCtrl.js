'use strict';
angular.module('app').controller('positionCtrl', [
	'$scope',
	'$state',
	'positionServer',
	'companyServer',
	'userServer',
	function ($scope,$state,positionServer,companyServer,userServer) {
	var id = $state.params.id;
	if(userServer.checkLogined()){
		$scope.logined = true;
	}else{
		$scope.logined = false;
	}
	positionServer.getPositionMsg(id).then(function(res){
		$scope.positionData = res;
		companyServer.getCompanyMsg(res.companyId).then(function(com){
			$scope.companyMsg = com;
		})
	});
}])