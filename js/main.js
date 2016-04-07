require.config({
    paths:{
        'angular':'lib/angular.min',
        'jquery':'lib/jquery.min',
        'highcharts':'lib/highcharts',
        'uib':'lib/ui-bootstrap-tpls-1.2.5',
        'app':'app',
        'data':'data'
    },
    shim:{
        "angular":{
            exports: "angular"
        },
        "uib":{
            deps:['angular'],
            exports: "uib"
        }
    }
});

require(['angular','app','uib'],function(angular,app,uib){
    angular.bootstrap(document,['myApp']);
});