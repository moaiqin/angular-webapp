'use strict';
angular.module('app').directive('appPositionDesc', [function () {
	return {
		restrict: 'A',
		templateUrl:'view/template/appPositionDesc.html',
		replace:true,
		scope:{
			data: '=',
			com:'='
		}
	};
}])