/**
 * jQuery :  日期插件
 * @author   kxt
 * @example  $("#test").date();
 */
$.fn.date = function(year, month, day){
	var _self = this;
	
	var begin_year = 1950;
	var today_date = new Date();
	var this_year = today_date.getFullYear();
	var month_array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	var month_max_day_array = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	 _self.html("<select id='year' name='year' style='width: 100px'></select> 年 " +
	    		"<select id='month' name='month' style='width: 100px'></select> 月 " +
	    		"<select id='day' name='day' style='width: 100px'></select> 日");
	
	//分别获取3个下拉框
	var year_select = _self.find("select").eq(0);
	var month_select = _self.find("select").eq(1);
	var day_select = _self.find("select").eq(2);
	
	//定义3个默认值
	_self.data("year",["请选择", "0"]);
	_self.data("month",["请选择", "0"]);
	_self.data("day",["请选择", "0"]);
	
	//默认下拉
	if(_self.data("year")){
		year_select.append("<option value='" + _self.data("year")[1] + "'>" + _self.data("year")[0] + "</option>");
	}
	if(_self.data("month")){
		month_select.append("<option value='" + _self.data("month")[1] + "'>" + _self.data("month")[0] + "</option>");
	}
	if(_self.data("day")){
		day_select.append("<option value='" + _self.data("day")[1] + "'>" + _self.data("day")[0] + "</option>");
	}
	
	//默认年份
	for(var i = this_year; i >= begin_year; i--){
		year_select.append("<option value='" + i + "'>" + i + "</option>");
	}
	//默认月份
	for(var i = 0; i < month_array.length; i++){
		month_select.append("<option value='" + month_array[i] + "'>" + month_array[i] + "</option>");
	}
	//默认日数
	for(var i = 0; i < 31; i++){
		day_select.append("<option value='" + (i+1) + "'>" + (i+1) + "</option>");
	}
	
	var is_leap = false;
	
	//接受参数
	if(typeof year != 'undefined'){
		if(year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)){
			is_leap = true;
		} else {
			is_leap = false;
		}
		$("#month option[index='0']").remove();
		$("#day option[index='0']").remove(); 
		//month_select[0].remove();
		//day_select[0].remove();
		year_select.val(year);
		year_select.change();
    }
	
	year_select.change(function(){
		month_select[0].options.length=0;
		day_select[0].options.length=0;
		var index = this.selectedIndex;
		if(index == 0){	//当选择的为 “请选择” 时
			if(_self.data("month")){
				month_select.append("<option value='" + _self.data("month")[1] + "'>" + _self.data("month")[0] + "</option>");
			}
			if(_self.data("day")){
				day_select.append("<option value='" + _self.data("day")[1] + "'>" + _self.data("day")[0] + "</option>");
			}
		} else{
			var select_year_value = $('#year').val();
			if(select_year_value % 400 == 0 || (select_year_value % 4 == 0 && select_year_value % 100 != 0)){
				is_leap = true;
			} else {
				is_leap = false;
			}
			for(var i = 0; i < month_array.length; i++){
				month_select.append("<option value='" + month_array[i] + "'>" + month_array[i] + "</option>");
			}
			for(var i = 0; i < 31; i++){
				day_select.append("<option value='" + (i+1) + "'>" + (i+1) + "</option>");
			}
			if(typeof month != 'undefined'){
				month_select.val(month);
				month_select.change();
		    } else {
		    	month_select.val(1);
		    	month_select.change();
		    }
			if(typeof day != 'undefined'){
				day_select.val(day);
		    } else {
		    	day_select.val(1);
		    }
		}
	}).change();
	
	month_select.change(function(){
		var select_month_value = $('#month').val();
		day_select[0].options.length=0;
		if(select_month_value == 0){	//当选择的为 “请选择” 时
			day_select.append("<option value='" + _self.data("day")[1] + "'>" + _self.data("day")[0] + "</option>");
		} else {
			if(is_leap){
				month_max_day_array[1] = 29;
			} else {
				month_max_day_array[1] = 28;
			}
			for(var i = 0; i < month_max_day_array[select_month_value-1]; i++){
				day_select.append("<option value='" + (i+1) + "'>" + (i+1) + "</option>");
			}
			if(typeof day != 'undefined'){
				day_select.val(day);
			}
		}
	}).change();
	
	return _self;
};