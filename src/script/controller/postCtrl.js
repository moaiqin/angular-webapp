'use strict';

angular.module('app').controller('postCtrl', [
	'$scope',
	'userServer',
	'$state',
	function ($scope,userServer,$status) {
	if(!userServer.checkLogined()){
		$state.go('login');
	}
	$scope.tabList = [
	    {
	    	id:'all',
	    	name:'全部'
	    },
	    {
	    	id:'past',
	    	name:'邀请面试'
	    },
	    {
	    	id:'fail',
	    	name:'不合格'
	    }
	]

	userServer.post().then(function(res){
		$scope.positionList = res;
		console.log(res);
	})
	$scope.filterObj = {};
	$scope.tClick = function(id){
		switch(id){
			case 'all':
			    delete $scope.filterObj.status;
			    break;
			case 'past':
			    $scope.filterObj.status = '1';
			    break;
			case 'fail':
			    $scope.filterObj.status = '-1';
			    break;
		}
	}
}])