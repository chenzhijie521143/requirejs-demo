define(['jquery','handsontable'],function($){
	var Table=function(){
		this._init();
	};
	Table.prototype={
		constructor:Table,
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
				   
				   _this.createTable(data);
				}
			});
		},
		// 生成表格
		createTable:function(data){
			console.log(data);
			
			// 构造数据
			var oData=[];
			for(let i=0;i<data.length;i++){
				var item=Array(3);
				item[0]=data[i]['name'];
				item[1]=data[i]['address'];
				item[2]=data[i]['belongsTo'];
				oData.push(item);
			}
			console.log(oData);
//			var data = [//四行五列
//		           ["武汉大学", "湖北省武汉市武昌区珞珈山路16号", 985],
//		           ["华中科技大学","湖北省武汉市洪山区珞喻路1037号", 985],
//		           ["华中师范大学", "湖北省武汉市洪山区珞喻路152号", 211]
//		    ];
		    $obj=$('<div class="table-box" id="table-box"></div>');
		    $('#table').append($obj);
//          var hot=new Handsontable($obj[0],{
//          	rowHeaders: true,
//              contextMenu: true,
//		        data: oData,//初始化时候的数据
//		        colHeaders:["学校", "位置", "所属", "坐标"],//显示表头
//		        colWidths:[85,250,50],
//		        dropdownMenu: true
//          });
            $obj.handsontable({
              	rowHeaders: true,
                contextMenu: true,
		        data: oData,//初始化时候的数据
		        colHeaders:["学校", "位置", "所属", "坐标"],//显示表头
		        colWidths:[85,250,50],
		        dropdownMenu: true
            });
            
		}
	};
	return Table;
});
