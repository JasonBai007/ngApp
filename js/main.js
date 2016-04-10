require.config({
    paths:{
        'angular':'lib/angular/angular.min',
        'jquery':'lib/jquery/dist/jquery.min',
        'highcharts':'lib/highcharts/highcharts',
        'highchartsNg':'lib/highcharts-ng',
        'uib':'lib/angular-bootstrap/ui-bootstrap-tpls.min',
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
        },
        "highchartsNg":{
            deps:['angular','highcharts'],
            exports: "highchartsNg"
        }
    }
});

require(['angular','app','uib'],function(angular,app,uib){
    angular.bootstrap(document,['myApp']);
});