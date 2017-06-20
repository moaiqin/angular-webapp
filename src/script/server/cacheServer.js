'use strict';

angular.module('app').service('cacheServer',[
	'$cookies',
	function($cookies){
		this.put = function(key,value){
			$cookies.put(key,value);
		}
		this.remove = function(key){
			$cookies.remove(key);
		}
		this.get = function(key){
			return $cookies.get(key);
		}
}])