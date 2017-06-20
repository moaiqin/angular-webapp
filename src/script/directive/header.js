'use strict';
angular.module('app').directive('appHeader', [function () {
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/header.html'
	};
}])