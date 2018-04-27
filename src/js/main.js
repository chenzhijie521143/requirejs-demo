require(['jquery',
        './map',
        './table',
        './chart',
        './Jsonp',
        'css!/style/map.css',
        'css!/style/index.css' 
],function($,Map,Table,Echart,Jsonp){
//	api.loadMap();
//	api.loadEchart();
//	api.loadTable();
    var Map=new Map()
    var table=new Table();
    var Chart=new Echart();
    Jsonp.getJsonp();
});
