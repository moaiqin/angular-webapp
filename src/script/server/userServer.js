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