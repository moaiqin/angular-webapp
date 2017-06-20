'use strict';
angular.module('app').directive('appPositionHeader', [
	'$state',
	function ($state) {
	return {
		restrict: 'A',
		templateUrl:'view/template/positionHeader.html',
		replace:true,
		scope:{
			text:'@',
			'router':'@'
		},
		link:function(scope,elem,attr){
			scope.back = function() {
				if(scope.router){
					$state.go(scope.router);
				}else{
					window.history.back();
				}
			}
		}
	};
}])