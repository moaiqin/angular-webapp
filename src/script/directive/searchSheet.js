'use strict';

angular.module('app').directive('searchSheet',function() {
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/searchSheet.html',
		scope:{
			data:'=',
			visibly:'=',
			changeValue:'&'
		}
	}
})