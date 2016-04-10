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

        //This is not a highcharts object. It just looks a little like one!
        var chartConfig = {
          options: {
            //This is the Main Highcharts chart config. Any Highchart options are valid here.
            //will be overriden by values specified below.
            chart: {
               type: 'bar'
            },
            tooltip: {
               style: {
                  padding: 10,
                  fontWeight: 'bold'
               }
            }
          },
          //The below properties are watched separately for changes.
          //Series object (optional) - a list of series using normal highcharts series options.
          series: [{
            data: [10, 15, 12, 8, 7]
          }],
          //Title configuration (optional)
          title: {
            text: 'Hello'
          },
          //Boolean to control showng loading status on chart (optional)
          //Could be a string if you want to show specific loading text.
          loading: false,
          //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
          //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
          xAxis: {
          currentMin: 0,
          currentMax: 20,
          title: {text: 'values'}
          },
          //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
          useHighStocks: false,
          //size (optional) if left out the chart will default to size of the div or something sensible.
          size: {
          width: 400,
          height: 300
          },
          //function (optional)
          func: function (chart) {
          //setup some logic for the chart
          }
        };
        
    }]);

});