'use strict';

angular.module('app').controller('companyCtrl', [
	'$scope',
	'companyServer',
	'$state',
	function ($scope,companyServer,$state) {
	var companyId = $state.params.id;
	companyServer.getCompanyMsg(companyId).then(function(res){
		$scope.comMsg = res;
	});
}])