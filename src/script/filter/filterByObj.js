'use strict';

angular.module('app').filter('filterByObj',[function(){
	return function(list,obj){
		var result = [];
		angular.forEach(list,function(item,index){
			var isEq = true;
			for(var attr in obj){
				if(item[attr] !== obj[attr]){
					isEq = false;
				}
			}
			if(isEq){
				result.push(item);
			}
		})
		return result;
	}
}])