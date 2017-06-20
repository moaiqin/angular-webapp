'use strict';

angular.module('app').controller('searchCtrl', [
	'$scope',
	'mainServer',
	'dict',
	'$filter',
	function ($scope,mainServer,dict,$filter) {
    var selectId = '';
	$scope.sheet = {};
	$scope.filterObj = {};
	$scope.searchValue='';
	$scope.searchTabList = [
	    {
	    	id:'city',
	    	name:'城市'
	    },
	    {
	    	id:'salary',
	    	name:'工资'
	    },
	    {
	    	id:'scale',
	    	name:'公司规模'
	    }
	];
	mainServer.getPositionList().then(function(res){
		if(res.length){
		    $scope.positionList = res;
		    $scope.listSearchCopy = res;
		}
	})
	$scope.tClick = function(id,name){
		selectId = id;
		$scope.sheet.data = dict[id];
		$scope.sheet.visibly = true;
	};
	
	$scope.sClick = function(id,name){
		if(id){
			$scope.filterObj[selectId + "Id"]= id;
			angular.forEach($scope.searchTabList, function(item){
				if(selectId === item.id){
					item['name'] = name;
				}
			})
		}else{
			delete $scope.filterObj[selectId + 'Id'];
			angular.forEach($scope.searchTabList, function(item){
				if(selectId === item.id){
					switch(item.id){
						case "city":
						item.name = '城市';
						break;
						case "salary":
						item.name = '工资';
						break;
						case 'scale':
						item.name = '公司规模';
						break;
					}
				}
			})
		}
	}

	$scope.searchData = function(value){

		if(!$scope.searchValue)
			return;
		$scope.positionList = $filter('searchFilter')($scope.listSearchCopy,$scope.searchValue);
		
	}
	$scope.searchCancel = function(){
		alert(1);
	}
}])