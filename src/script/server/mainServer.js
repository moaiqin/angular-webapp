'use strict';


angular.module('app').service('mainServer', [
	'$http',
	function ($http) {
	var me = this;
	me.getPositionList = function() {
		return $http.get('/data/positionList.json').then(function(res){
			if(res.statusText === 'OK'){
				return res.data;
			}
		},function(err){
			console.log('server err:' + err);
		})
	}
}])