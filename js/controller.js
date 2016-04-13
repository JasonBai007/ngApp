define(['angular','jquery','service','highcharts','highchartsNg'],function(angular,jquery,service,highcharts,highchartsNg){

    var app = angular.module('myApp',['myServ','ui.bootstrap','highcharts-ng']);  

    app.controller('myCtrl',['$scope','checkInput','uibDateParser','handleData','dateFormat','renderBar',function($scope,checkInput,uibDateParser,handleData,dateFormat,renderBar){

        // 初始化
        $scope.format = 'yyyy-MM-dd';  //借助uib格式化服务
        $scope.now = new Date();
        $scope.pushUp = '';
        $scope.squat = '';

        // 初始化表格数据数组
        $scope.recordArr = [];
        // 渲染表格
        handleData.loadData($scope);        

        // 输入框默认没有错误
        $scope.isError = false; 

        // 提交事件
        $scope.submit = function() {
            if(checkInput.check($scope.pushUp,$scope.squat)) {
                $scope.isError = false;
                var newDate = dateFormat.newDateStr($scope.now.toLocaleDateString());
                var obj = {
                    date: newDate,
                    pushup: +$scope.pushUp,  //变成数值
                    squat: +$scope.squat    //变成数值
                }
                // 渲染表格
                $scope.recordArr.push(obj);
                // 渲染图表
                $scope.chartConfig = renderBar($scope.recordArr);
                // 重置输入框
                $scope.pushUp = '';
                $scope.squat = '';
            } else {
                $scope.isError = true;
                return false;
            }
        }

        
    }]);

});