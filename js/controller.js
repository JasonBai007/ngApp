define(['angular','jquery','service','highcharts','highchartsNg'],function(angular,jquery,service,highcharts,highchartsNg){

    var app = angular.module('myApp',['myServ','ui.bootstrap','highcharts-ng']);  

    app.controller('myCtrl',['$scope','checkInput','uibDateParser','handleData','dateFormat',function($scope,checkInput,uibDateParser,handleData,dateFormat){

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
                var newDate = dateFormat.newDateStr($scope.now.toLocaleDateString());
                var obj = {
                    date: newDate,
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

        //好吧，居然成了，当时没有绑定到$scope上，真是坑死了
        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'column'
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }
            },
            title: {
                text: 'the Trending of PushUps Everyday'
            },
            series: [{
                name: 'PushUps',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            },{
                name: 'Squats',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
            }],
            yAxis: {
                currentMin: 0,
                currentMax: 100,
                title: {
                    text: 'quantity'
                }
            },
            size: {
                height: 400
            },
            //function (optional)
            func: function(chart) {
                //setup some logic for the chart
            }
        };
        
    }]);

});