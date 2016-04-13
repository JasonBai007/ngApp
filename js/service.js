define(['angular','data'],function(angular,data) {

	var Serv = angular.module('myServ',[]);

    Mock.mockjax(Serv);  //捕获服务模块上的http请求  
    
    // 使用localstorage存储前端数据，以后可能会用到
	// Serv.factory('storage',function(){
 //        return {
 //            setStorage: function(obj) {
 //                var storage = window.localStorage;
 //                storage.setItem(obj.date,JSON.stringify(obj));                
 //            },
 //            getStorage: function() {
 //                var storage = window.localStorage;
 //                var arr = [];
 //                for( var i=0,l=storage.length;i<l;i++) {
 //                    arr.push(JSON.parse(storage.getItem(storage.key(i))));
 //                }
 //                return arr;
 //            }
 //        }        
 //    });
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
    Serv.factory('handleData',["$http",'renderBar',function($http,renderBar) {
        return {
            loadData: function($scope) {
                $http({
                    url:'loadData',
                    method:'get'
                }).success(function(data) {
                    // 渲染表格
                    $scope.recordArr = angular.copy(data.obj);
                    // 渲染图表
                    $scope.chartConfig = renderBar($scope.recordArr);
                }).error(function(data, status) {
                    console.log(status)
                });
            }
        }
    }]);
    Serv.factory('dateFormat',function() {
        return {
            newDateStr: function(date) {
                var dateArr = date.split('/');
                if( dateArr[1].length == 1) {
                    dateArr[1] = '0' + dateArr[1];
                }
                return dateArr.join('-');                
            }
        }
    });
    Serv.factory('renderBar',function() {     
        return function(arr){

            // 加工X轴数据
            function getCategories (arr) {
                var xArr = [];
                for(var i=0,l=arr.length;i<l;i++) {
                    xArr.push(arr[i].date);
                }
                return xArr;
            }

            // 加工图表数据
            function getSeries (arr) {
                var sArr = [
                    {name:'PushUps',data:[],dataLabels:{enabled: true,inside:true,color:'#fff'}},
                    {name:'Squats',data:[],dataLabels:{enabled: true,inside:true,color:'#fff'}}
                ];
                var dataP = [], dataS = [];
                for(var i=0,l=arr.length;i<l;i++) {
                    dataP.push(arr[i].pushup);
                    dataS.push(arr[i].squat);
                }
                sArr[0].data = dataP;
                sArr[1].data = dataS;
                return sArr;
            }

            // 获得渲染所需数据
            var xItem = getCategories(arr);
            var seriesItem = getSeries(arr);

            // 创建配置对象
            var cfg = {
                options: {
                    chart: {
                        type: 'column'
                    },
                    tooltip: {
                        style: {
                            padding: 10,
                            fontWeight: 'bold'
                        }
                    },
                    colors: ['#83B2EA', '#ED9D68'],
                    credits: {
                        enabled: false
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 1 
                    },
                },
                title: {
                    text: 'the Trending of Exercise Everyday'
                },
                series: seriesItem,
                xAxis: {
                    categories:xItem,
                    labels: {
                        align:'left',
                        rotation: 45
                    }                   
                },
                yAxis: {
                    currentMin: 0,
                    currentMax: 100,
                    title: {
                        text: 'quantity'
                    }
                },
                size: {
                    width:900,
                    height: 400
                }                
            }
            return cfg;
        }
    });
})