'use strict';

angular.module('app').filter('searchFilter',[function(){
	return function(listData,keyWord){
		var result = [];
		var rex= new RegExp(keyWord,'g');
		angular.forEach(listData, function(item){
			var select = false;
			for(var e in item){
				switch(e){
					case 'cityName':
					   if(rex.test(item[e]))
					   	   select = true;
					   	break;
					case 'companyName':
					   if(rex.test(item[e]))
					   	   select = true;
					   	break;
					case 'job':
					   if(rex.test(item[e]))
					   	   select = true;
					   	break;
				}
			}
			if(select)
				result.push(item);
		})
		return result;
	}
}])