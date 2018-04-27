define(['jquery','echarts','leaflet'],function($,echarts){
	var Map=function(){
		this.data=[];
		this.maxZoom=18;
		this.minZoom=2;
		this.zoom=11;
		this._init();
		this.pDom='map';
		this.sDom='map-box';
		this.center=[30.529736,114.121857];
	};
	Map.prototype={
		constructor:Map,
		// 初始化 
		_init:function(){
			var _this=this;
	    	$.ajax({
				url:"http://localhost:8000/api/index",
				type:'get',
				dataType:'json',
				success:function(res){
				   // 保存数据
				   var data=res.data;
				   
				   console.log(data);
				   _this.createMap(data);
				}
				
			});
		},
		// 创建地图
		createMap:function(data){
			var _this=this;
			console.log(data);
			// 创建节点
            var dom=document.createElement('div');
            dom.id=this.sDom;
            var oDom=document.getElementById(this.pDom);
            oDom.appendChild(dom);
            
            var m = L.map('map-box').setView(this.center,this.zoom);
			L.tileLayer('https://api.mapbox.com/styles/v1/827966760/cjg3a9zv00gb82rqebjheblx8/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiODI3OTY2NzYwIiwiYSI6ImNqZzM5dnV3dzAyejgyd3FpdDE3djVkc2UifQ.8rEU0DldkHFZyzOgZiNIoA', {
			  maxZoom: 18,
			  attribution: '湖北省大学分布图',
			  id: 'mapbox.attractions'
			}).addTo(m);
            
//          // 创建节点
//          var dom=document.createElement('div');
//          dom.id=this.sDom;
//          var oDom=document.getElementById(this.pDom);
//          oDom.appendChild(dom);
//          
//          // 地图
//          var normalm = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
//			    maxZoom: this.maxZoom,
//			    minZoom: this.minZoom,
//			    attribution: '高中同学位置分布图'
//			});
//			
//			// 影像
//			var imgm = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
//			    maxZoom: this.maxZoom,
//			    minZoom: this.minZoom
//			});
//			var imga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
//			    maxZoom: this.maxZoom,
//			    minZoom: this.minZoom,
//			    
//			});
//			// 两种类型
//			var normal = L.layerGroup([normalm]),
//			    image = L.layerGroup([imgm, imga]);
//			
//			var baseLayers = {
//			    "地图": normal,
//			    "影像": image,
//			}
//			
//			// 初始化
//			var m = L.map(this.sDom, {
//			    center: [30.593055533953834,114.30524999999997],
//			    zoom: this.zoom,
//			    layers: [normal],
//			    zoomControl: false			    
//			});
//			// 添加多种类型
//			L.control.layers(baseLayers, null).addTo(m);
//			L.control.zoom({
//			    zoomInTitle: '放大',
//			    zoomOutTitle: '缩小'
//			}).addTo(m);
			
			//扩展控件
			L.Control.Watermark = L.Control.extend({
			    onAdd: function(map) {
			        var img = L.DomUtil.create('img');
			
			        img.src = '../img/icon.gif';
			        img.style.width = '100px';
			
			        return img;
			    }
			});
			
			L.control.watermark = function(opts) {
			    return new L.Control.Watermark(opts);
			}
			
			// 添加图片
			L.control.watermark({ position: 'bottomright' }).addTo(m);
			
            // 添加比例尺
			L.control.scale({position:'bottomright'}).addTo(m);  
			
			// 添加标记
            for(let i=0;i<data.length;i++){
            	createMark(data[i]);
            }
            // 移动端定位
            m.on('locationfound', function(e) {
				var radius = e.accuracy / 2;
				L.marker(e.latlng).addTo(m).bindPopup("你就在这个圈内");
				L.circle(e.latlng, radius).addTo(m);
			});

			m.on('locationerror', function(e) {
			   console.log('定位出错=====>', e);
			});
				
			// 创建标记
			 function createMark(data){
			 	// 标记 icon
			 	var greenIcon = L.icon({
				    iconUrl: '../img/icon.gif',
				
				    iconSize:     [30, 30], // size of the icon
//				    shadowSize:   [50, 64], // size of the shadow
				    iconAnchor:   [15, 35], // point of the icon which will correspond to marker's location
//				    shadowAnchor: [4, 62],  // the same for the shadow
//				    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
				});
			 	// 增加标记
	            var marker = L.marker(data.coordinates,{
	            	icon:greenIcon,
	            	draggable:true
	            }).addTo(m);
	            
	            // 标记框
	            var box=document.createElement('div');
	            box.className='mark-box';
	            // 标记文本
	            var txt=document.createElement('div');
	            txt.className='mark-txt';
	            var content = data.name+'：<br>';
				    content += '地址：'+data.address+'<br>';
				    content += '坐标：'+data.coordinates;
	            txt.innerHTML=content;
	            // 标记图标
	            var econtent=document.createElement('div');
	            econtent.className="mark-content";
	            box.appendChild(txt);
	            box.appendChild(econtent);
	            marker.bindPopup(box);
	            // 绑定事件 创建图标
                marker.on('popupopen', function(e) {
                	
                	// 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(econtent);
                    option = {
					    title: {
					        text: '综合能力',
					        textStyle:{
					        	color:'#c4625f'
					        }
					    },
					    tooltip: {
					        trigger: 'axis'
					    },
					    legend: {
					        x: 'center',
					        data:['能力评估']
					    },
					    radar: [
					        {
					            indicator: [
					                {text: '师资力量', max: 100},
					                {text: '校园环境', max: 100},
					                {text: '综合评价', max: 100},
					                {text: '校园面积', max: 100}
					            ],
					            center: ['50%','60%'],
					            radius: 60
					        },    
					    ],
					    series: [
					        {
					            type: 'radar',
					             tooltip: {
					                trigger: 'item'
					            },
					            itemStyle: {normal: {areaStyle: {type: 'default'}}},
					            data: [
					                {
					                    value: data.evaluate,
					                    name: data.name
					                }
					            ]
					        },
					    ]
					};
                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                });
//	            // 事件
//				var mypop = L.popup();
//				marker.on('click', function(e) {
//				  var content = data.name+'：<br>';
//				  content += '地址：'+data.address+'<br>';
//				  content += '坐标：'+data.coordinates;
//				  mypop.setLatLng(e.latlng)
//				       .setContent(content)
//				       .openOn(m);
//				});
				// 增加圆
				var circle = L.circle(data.coordinates, {
				  color: 'green',
				  fillColor: '#00141bb0',
				  fillOpacity: 0.3,
				  radius: 500
				}).addTo(m);
			}
	    }
	}
	return Map;
});
