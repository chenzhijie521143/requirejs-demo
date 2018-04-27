require.config({
	baseUrl:'/js',
	paths:{
		'jquery':'./lib/jquery.min',
		'text':'./lib/text',
		'leaflet':'./lib/leaflet/leaflet-src',
		'leafletch':'./lib/leaflet/leaflet.ChineseTmsProviders',
		'handsontable':'./lib/handsontable/jquery.handsontable',
		'echarts':'./lib/echarts.min',
		'css':'./lib/css'
	},
//	packages:[
//	    {
//          name: 'echarts',
//          location: './lib/echarts/src',
//          main: 'echarts'
//      },
//      {
//          name: 'zrender',
//          location: './lib/zrender/src', // zrender与echarts在同一级目录
//          main: 'zrender'
//      }
//	],
	config:{
		text:{
			onXhr:function(xhr,url){
				xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
			}
		}
	},
	shim:{
		'leaflet':{
			deps:['css!./lib/leaflet/leaflet']
		},
		'leafletch':{
			deps:['leaflet'],
			exports:'Leafletch'
		},
		'handsontable':{
			deps:['css!./lib/handsontable/jquery.handsontable'],
			exports:'Handsontable'
		},
	},
	map:{
		'*':{
			'css':'./lib/css'
		}
	}

});