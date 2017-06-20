'use strict';

angular.module('app').factory('positionServer', [
	'$http',
	function ($http) {
	var obj = {};
	obj.getPositionMsg = function(id) {
		return $http.get('/data/position.json').then(function(res){
			return res.data;
		},function(err){
			console.log('server err:' + err);
		})
	}
	return obj;
}])