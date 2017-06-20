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