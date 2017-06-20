'use strict';

angular.module('app').directive('appCompanyClass', [
	'$state',
	function ($state) {
	return {
		restrict: 'A',
		replace:true,
		scope:{
			com: '='
		},
		templateUrl:'view/template/companyClass.html',
		link:function($scope){
			$scope.doPositionList = function(index){
				$scope.positionList = $scope.com.positionClass[index].positionList;
				$scope.isActive = index;
			}
			$scope.$watch('com',function(newData,oldData){
				if(newData)
					$scope.doPositionList(0);
			},true)
		}
	}
}])