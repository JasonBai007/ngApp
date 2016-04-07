define(['angular','jquery','service'],function(angular,jquery,service){

    var app = angular.module('myApp',['myServ','ui.bootstrap']);  

    app.controller('myCtrl',['$scope','storage','checkInput','uibDateParser','handleData',function($scope,storage,checkInput,uibDateParser,handleData){

        // 初始化
        $scope.format = 'yyyy-MM-dd';  //借助uib格式化服务
        $scope.now = new Date();
        $scope.pushUp = '';
        $scope.squat = '';

        // 初始化表格数据数组，并通过服务挂载数据
        $scope.recordArr = [];
        handleData.loadData($scope);

        // 输入框默认没有错误
        $scope.isError = false; 

        // 提交事件
        $scope.submit = function() {
            if(checkInput.check($scope.pushUp,$scope.squat)) {
                $scope.isError = false;
                var obj = {
                    date: $scope.now.toLocaleDateString(),
                    pushup: $scope.pushUp,
                    squat: $scope.squat
                }
                $scope.recordArr.push(obj);
                $scope.pushUp = '';
                $scope.squat = '';
            } else {
                $scope.isError = true;
                return false;
            }
        }
        
    }]);

});