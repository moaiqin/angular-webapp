'use strict';

angular.module('app').directive('searchTab',function(){
	return {
		restrict:'A',
		replace:true,
		scope:{
			searchTabList : '=',
			tClick:'&'
		},
		templateUrl:'view/template/searchTab.html',
		link:function($scope){
			$scope.tabClick = function(item) {
				$scope.selectedId = item.id;
				$scope.tClick(item);
			}
		}
	}
})