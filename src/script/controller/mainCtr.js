angular.module('app').controller('mainCtrl', [
	'$scope',
	'$http',
	'mainServer',
	'$state',
	'userServer',
	function ($scope,$http,mainServer,$state,userServer) {
		$scope.logined = false;
		if(userServer.checkLogined()){
			$scope.logined = true;
		}else{
			$scope.logined = false;
		}
        $scope.handelClick = function(){
        	if($scope.logined){
        		userServer.logout();
        		$state.go('login');
        	}else{
        		$state.go('login');
        	}
        }
		mainServer.getPositionList().then(function(res){
			if(res.length)
				$scope.positionList = res;
		})
	
}])