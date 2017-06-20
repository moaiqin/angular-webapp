'use strict';

angular.module('app').controller('registerCtrl', [
	'$scope',
	'$http',
	'$interval',
	'userServer',
	'$state',
	function ($scope,$http,$interval,userServer,$state) {
	var pending = false;
	$scope.getCode = function(){
		if(pending)
			return;
		pending = true;
		userServer.getCode().then(function(res){
			if(res.state){
				var count = 60;
				$scope.time = count + 's重新获取';
				var intervalId = $interval(function(){
					count--;
					if(count < 1){
						$interval.cancel(intervalId);
						$scope.time = '';
						pending = false;
						return;
					}
					$scope.time = count + 's重新获取';
				},1000)
			}
		})
	}

	$scope.submit = function(){
        userServer.register($scope.user)
        .then(function(res){
        	if(res)
        		$state.go('login');
        })
	}
}])