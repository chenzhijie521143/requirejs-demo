define(['jquery'],function($){
	return {
		loadMap:function(){
			require(['text!/map.html','./map'],function(tem,map){
				$('#map').html(tem);
			});
		},
		loadEchart:function(){
			require(['text!/echart.html'],function(tem){
				$('#echart').html(tem);
			});
		},
		loadTable:function(){
			require(['text!/table.html'],function(tem){
				$('#table').html(tem);
			});
		}
	}
});
