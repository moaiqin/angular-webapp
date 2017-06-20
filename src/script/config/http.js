'use strict';

angular.module('app').config([
	'$provide',
	function ($provide) {
	$provide.decorator('$http',[
		'$delegate',
		'$q',
		function($delegate,$q){
			$delegate.post = function(url,data,config){
				return $delegate.get(url,data);
			}
		return  $delegate;
	}])
}])