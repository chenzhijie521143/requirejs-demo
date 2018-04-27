define(['jquery','echarts'],function($,echarts){
	var Echart=function(){
	    this._init();
	};
	Echart.prototype={
		constructor:Echart,
		_init:function(){
			var _this=this;
	    	$.ajax({
				url:"http://localhost:8000/api/uCount",
				type:'get',
				dataType:'json',
				success:function(res){
				   // 保存数据
				   var data=res.data;
				   _this.createChart(data);
				}
			});
		},
		createChart:function(ucot){

			// 基于准备好的dom，初始化echarts实例
			var obj=document.createElement('div');
			obj.className="chart-box";
			var chart=document.getElementById('echart');
			chart.appendChild(obj);
			
	        var myChart = echarts.init(obj);

	        var data={
	        	data1:[{
						    name: '中央部属高校',
						    icon: 'roundRect',
						    // 设置文本为红色
						    textStyle: {
						        color: '#fff',
						        backgroundColor:'#145fa0',
						        padding:5,
						        pageIconColor:'yellow'
						    }
						},
						{
						    name: '省属及共建高校',
						    icon: 'roundRect',
						    // 设置文本为红色
						    textStyle: {
						        color: '#fff',
						        backgroundColor:'#145fa0',
						        padding:5
						    }
						},
						{
						    name: '市属高校',
						    icon: 'roundRect',
						    // 设置文本为红色
						    textStyle: {
						        color: '#fff',
						        backgroundColor:'#145fa0',
						        padding:5
						    }
						},
						{
						    name: '独立院校',
						    icon: 'roundRect',
						    // 设置文本为红色
						    textStyle: {
						        color: '#fff',
						        backgroundColor:'#145fa0',
						        padding:5
						    }
						},
			        ],
	        	data2:[],
	        }
	        for(let i=0;i<ucot.length;i++){
	        	var item={};
	        	item.name=ucot[i]["name"];
	        	item.value=ucot[i]["count"];
	        	data.data2.push(item);
	        }
			var option = {
			    title : {
			        text: '湖北省高校统计',
			        subtext: '所属',
			        x:'center',
			        textStyle:{
			        	color:'#fff'
			        }
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        type: 'scroll',
			        orient: 'horizontal',
			        show:true,
			        right: 10,
			        left:10,
			        bottom: 10,
			        data:data.data1,
			        textStyle:{
			        	color:'red'
			        },
			    },
			    series : [
			        {
			            name: '所属',
			            type: 'pie',
			            radius : '55%',
			            center: ['50%', '55%'],
			            data: data.data2,
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            },
			            label:{
			            	color:'#a4cdff'
			            },
			            labelLine:{
			            	lineStyle:{
			            		color:'#fff'
			            	}
			            }, 
			        }
			    ]
			};
	        // 使用刚指定的配置项和数据显示图表。
	        myChart.setOption(option); 
		}
	}
	return Echart;
});
