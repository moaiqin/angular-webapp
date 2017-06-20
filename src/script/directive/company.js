'use strict';

angular.module('app').directive('company', [function () {
	return {
		restrict: 'A',
		replace:true,
		templateUrl:'view/template/company.html',
		scope:{
			com:'='
		}
	};
}])