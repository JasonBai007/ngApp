define(['angular','data'],function(angular,data) {

	var Serv = angular.module('myServ',[]);

    Mock.mockjax(Serv);  //捕获服务模块上的http请求  
    
	Serv.factory('storage',function(){
        return {
            setStorage: function(obj) {
                var storage = window.localStorage;
                storage.setItem(obj.date,JSON.stringify(obj));                
            },
            getStorage: function() {
                var storage = window.localStorage;
                var arr = [];
                for( var i=0,l=storage.length;i<l;i++) {
                    arr.push(JSON.parse(storage.getItem(storage.key(i))));
                }
                return arr;
            }
        }        
    });
    Serv.factory('checkInput',function() {
    	return {
    		check: function(num1,num2) {
                var reg = /^\d{1,3}$/;
    			if(reg.test(num1) && reg.test(num2)) {
                    return true;
                } else {
                    return false;
                }
    		}
    	}
    });
    Serv.factory('handleData',["$http",function($http) {
        return {
            loadData: function($scope) {
                $http({
                    url:'loadData',
                    method:'get'
                }).success(function(data) {
                    $scope.recordArr = data.obj;
                }).error(function(data, status) {
                    console.log(status)
                });
            }
        }
    }]);
})