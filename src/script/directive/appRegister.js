'use strice';

angular.module('app').directive('appRegister',[function(){
	return {
		restrict:'A',
		templateUrl:'view/template/register.html',
		replace:true
	}
}])