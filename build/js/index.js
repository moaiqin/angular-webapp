'use strict';

angular.module('app',['ui.router','ngCookies','validation']);
'use strict';

angular.module('app').controller('companyCtrl', [
	'$scope',
	'companyServer',
	'$state',
	function ($scope,companyServer,$state) {
	var companyId = $state.params.id;
	companyServer.getCompanyMsg(companyId).then(function(res){
		$scope.comMsg = res;
	});
}])
'use strict';

angular.module('app').controller('loginCtrl', [
	'$scope',
	'userServer',
	'$state',
	'cacheServer',
	function ($scope,userServer,$state,cacheServer) {
	$scope.submit = function(){
		userServer.login($scope.user).then(function(res){
			if(res.id){
				$state.go('user');
			}
		});
	}
}])
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
'use strict';
angular.module('app').controller('positionCtrl', [
	'$scope',
	'$state',
	'positionServer',
	'companyServer',
	'userServer',
	function ($scope,$state,positionServer,companyServer,userServer) {
	var id = $state.params.id;
	if(userServer.checkLogined()){
		$scope.logined = true;
	}else{
		$scope.logined = false;
	}
	positionServer.getPositionMsg(id).then(function(res){
		$scope.positionData = res;
		companyServer.getCompanyMsg(res.companyId).then(function(com){
			$scope.companyMsg = com;
		})
	});
}])
'use strict';

angular.module('app').controller('postCtrl', [
	'$scope',
	'userServer',
	'$state',
	function ($scope,userServer,$status) {
	if(!userServer.checkLogined()){
		$state.go('login');
	}
	$scope.tabList = [
	    {
	    	id:'all',
	    	name:'全部'
	    },
	    {
	    	id:'past',
	    	name:'邀请面试'
	    },
	    {
	    	id:'fail',
	    	name:'不合格'
	    }
	]

	userServer.post().then(function(res){
		$scope.positionList = res;
		console.log(res);
	})
	$scope.filterObj = {};
	$scope.tClick = function(id){
		switch(id){
			case 'all':
			    delete $scope.filterObj.status;
			    break;
			case 'past':
			    $scope.filterObj.status = '1';
			    break;
			case 'fail':
			    $scope.filterObj.status = '-1';
			    break;
		}
	}
}])
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
'use strict';

angular.module('app').controller('searchCtrl', [
	'$scope',
	'mainServer',
	'dict',
	'$filter',
	function ($scope,mainServer,dict,$filter) {
    var selectId = '';
	$scope.sheet = {};
	$scope.filterObj = {};
	$scope.searchValue='';
	$scope.searchTabList = [
	    {
	    	id:'city',
	    	name:'城市'
	    },
	    {
	    	id:'salary',
	    	name:'工资'
	    },
	    {
	    	id:'scale',
	    	name:'公司规模'
	    }
	];
	mainServer.getPositionList().then(function(res){
		if(res.length){
		    $scope.positionList = res;
		    $scope.listSearchCopy = res;
		}
	})
	$scope.tClick = function(id,name){
		selectId = id;
		$scope.sheet.data = dict[id];
		$scope.sheet.visibly = true;
	};
	
	$scope.sClick = function(id,name){
		if(id){
			$scope.filterObj[selectId + "Id"]= id;
			angular.forEach($scope.searchTabList, function(item){
				if(selectId === item.id){
					item['name'] = name;
				}
			})
		}else{
			delete $scope.filterObj[selectId + 'Id'];
			angular.forEach($scope.searchTabList, function(item){
				if(selectId === item.id){
					switch(item.id){
						case "city":
						item.name = '城市';
						break;
						case "salary":
						item.name = '工资';
						break;
						case 'scale':
						item.name = '公司规模';
						break;
					}
				}
			})
		}
	}

	$scope.searchData = function(value){

		if(!$scope.searchValue)
			return;
		$scope.positionList = $filter('searchFilter')($scope.listSearchCopy,$scope.searchValue);
		
	}
	$scope.searchCancel = function(){
		alert(1);
	}
}])
'use strict';

angular.module('app').controller('storeCtrl', [
	'$scope',
	'userServer', 
	'$state',
	function ($scope,userServer,$state) {
	if(!userServer.checkLogined()){
		$state.go('login');
	}
	userServer.getStore().then(function(res){
		$scope.positionList = res;
	})
}])
'use strict';

angular.module('app').controller('userCtrl', [
	'$scope', 
	'cacheServer',
	'userServer',
	'$state',
	function ($scope,cacheServer,userServer,$state) {
	if(!userServer.checkLogined()){
		$state.go('login');
	}
	$scope.image = cacheServer.get('imageUrl');
	$scope.username = cacheServer.get('username');
	$scope.userId = cacheServer.get('id'); 

	$scope.logout = function(){
		userServer.logout();
		$state.go('login');
	}
}])
'use strict';

angular.module('app').directive('appLogin',function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/appLogin.html'
	}
})
'use strict';
angular.module('app').directive('appPositionDesc', [function () {
	return {
		restrict: 'A',
		templateUrl:'view/template/appPositionDesc.html',
		replace:true,
		scope:{
			data: '=',
			com:'='
		}
	};
}])
'use strice';

angular.module('app').directive('appRegister',[function(){
	return {
		restrict:'A',
		templateUrl:'view/template/register.html',
		replace:true
	}
}])
'use strict';

angular.module('app').directive('company', [function () {
	return {
		restrict: 'A',
		replace:true,
		templateUrl:'view/template/company.html',
		scope:{
			com:'='
		}
	};
}])
'use strict';

angular.module('app').directive('appCompanyClass', [
	'$state',
	function ($state) {
	return {
		restrict: 'A',
		replace:true,
		scope:{
			com: '='
		},
		templateUrl:'view/template/companyClass.html',
		link:function($scope){
			$scope.doPositionList = function(index){
				$scope.positionList = $scope.com.positionClass[index].positionList;
				$scope.isActive = index;
			}
			$scope.$watch('com',function(newData,oldData){
				if(newData)
					$scope.doPositionList(0);
			},true)
		}
	}
}])
angular.module('app').directive('appFooter', [function () {
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/footer.html'
	}
}])
'use strict';
angular.module('app').directive('appHeader', [function () {
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/header.html'
	};
}])
'use strict';
angular.module('app').directive('appPositionHeader', [
	'$state',
	function ($state) {
	return {
		restrict: 'A',
		templateUrl:'view/template/positionHeader.html',
		replace:true,
		scope:{
			text:'@',
			'router':'@'
		},
		link:function(scope,elem,attr){
			scope.back = function() {
				if(scope.router){
					$state.go(scope.router);
				}else{
					window.history.back();
				}
			}
		}
	};
}])
angular.module('app').directive('appPositionList', [function () {
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionList.html',
		scope:{
			data: '=',
			filterObj:'=',
			store:'='
		}
	};
}])
'use strict';

angular.module('app').directive('searchSheet',function() {
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/searchSheet.html',
		scope:{
			data:'=',
			visibly:'=',
			changeValue:'&'
		}
	}
})
'use strict';

angular.module('app').directive('searchTab',function(){
	return {
		restrict:'A',
		replace:true,
		scope:{
			searchTabList : '=',
			tClick:'&'
		},
		templateUrl:'view/template/searchTab.html',
		link:function($scope){
			$scope.tabClick = function(item) {
				$scope.selectedId = item.id;
				$scope.tClick(item);
			}
		}
	}
})
'use strict';

angular.module('app').value('dict', {}).run([
	'dict',
	'$http',
	function (dict,$http) {
	$http.get('/data/city.json').then(function(res){
		dict.city = res.data;
	},function(err){
		console.log('city server err: '+ err);
	})
	$http.get('/data/salary.json').then(function(res){
		dict.salary = res.data;
	},function(err){
		console.log('saraly server err:' +err);
	})
	$http.get('/data/scale.json').then(function(res){
		dict.scale = res.data;
	},function(err){
		console.log('saraly server err:' +err);
	})
}])
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
'use strict';
angular.module('app').config(['$stateProvider',
	'$urlRouterProvider',
	'$locationProvider',
	function($stateProvider,$urlRouterProvider,$locationProvider){
		$locationProvider.hashPrefix('');
		$stateProvider.state('main',{
			url:'/main',
			templateUrl:'view/main.html',
			controller:'mainCtrl',
		}).state('position',{
			url:'/position/:id',
			templateUrl:'view/position.html',
			controller:'positionCtrl'
		}).state('company',{
			url:'/positionclass/:id',
			templateUrl:'view/positionClass.html',
			controller:'companyCtrl'
		}).state('search',{
			url:'/search',
			templateUrl:'view/search.html',
			controller:'searchCtrl'
		}).state('login',{
			url:'/login',
			templateUrl:'view/login.html',
			'controller':'loginCtrl'
		}).state('register',{
			url:'/register',
			templateUrl:'view/register.html',
			controller:'registerCtrl'
		}).state('user',{
			url:'/user',
			templateUrl:'view/user.html',
			controller:'userCtrl'
		}).state('store',{
			url:'/store',
			templateUrl:'view/store.html',
			controller:'storeCtrl'
		}).state('post',{
			url:'/post',
			templateUrl:'view/post.html',
			controller:'postCtrl'
		});
		$urlRouterProvider.otherwise('main');
}])

'use strict';

angular.module('app').config([
	'$validationProvider',
	function($validationProvider){
    var expression = {
    	phone: /^1[\d]{10}/,
    	password: function(value){
    		return value > 5;
    	}
    };
    var defaultMeg = {
    	phone: {
    		success: '',
    		error: '必须是11位号码'
    	},
    	password: {
    		error: '大于6位的密码'
    	}
    }

    $validationProvider.setExpression(expression).setDefaultMsg(defaultMeg);
}])
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
'use strict';

angular.module('app').factory('userServer',[
	'$http',
	'cacheServer',
	'$state',
	function($http,cacheServer,$state){
	var user = {};
	user.getCode = function() {
		return $http.get('data/code.json').then(function(res){
			return res.data;
		},function(err){
			console.log('code server error');
		})
	}
	user.data = {};
	user.login = function(userData){
		//直接post到json文件取数据不行，php行，要把post改为get
		return $http.post('data/login.json',userData).then(function(res){
			
			if(res.data.id){
				user.data = res.data;
				cacheServer.put('username',res.data.name);
				cacheServer.put('imageUrl',res.data.image);
				cacheServer.put('userId',res.data.id);
			}
			return res.data;
		},function(err){
			console.log(err)
		})
	}

	user.logout = function() {
		cacheServer.remove('username');
		cacheServer.remove('imageUrl');
		cacheServer.remove('id');
	}

	user.checkLogined = function(){
		var userId = cacheServer.get('userId');
		var username = cacheServer.get('username');
		if(userId && username){
			return true;
		}else{
			return false;
		}
	}

	user.register = function(userData){
		return $http.post('data/regist.json',userData)
		.then(function(res){
			if(res.data.id){
				return res.data.id;
			}else{
				return false;
			}
		},function(){})
	}

	user.post = function(){
		var userId = cacheServer.get('userId');
		var data = {id:userId}
		if(!userId)
			$state.go('login');
		return $http.get('data/myPost.json',data)
		.then(function(res){
			return res.data;
		},function(err){
			console.log(err);
		})
	}

	user.getStore = function(){
		var userId = cacheServer.get('userId');
		var data = {id:userId}
		if(!userId)
			$state.go('login');
		return $http.get('data/myFavorite.json',data)
		.then(function(res){
			return res.data;
		},function(err){
			console.log(err);
		})
	}

	return user;
}])