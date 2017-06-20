'use strict';

angular.module('app').service('companyServer', [
	'$http',
	function ($http) {
	var me = this;
	me.getCompanyMsg = function(id) {
		return $http.get('/data/company.json?id=' + id).then(function(res){
			return res.data;
		},function(err){
			console.log('server err:' + err);
		})
	}
}])