define(function(){
	return {
		getJsonp:function(){
			require(['http://localhost:8000/js/jsonp/user.js'],function(user){
				console.log(user);
			});
		}
	}
})
