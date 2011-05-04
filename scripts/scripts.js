var literalTabbing = false;
var optionsShown = false;
var currentChartType = "#horizbar";
var previewChart;

$(document).ready(function() {
	
	var databoxDefaultString = "1500's\t458\n1600's\t580\n1700's\t791\n1800's\t978\n1900's\t1650\n2000's\t5978";
	var titleboxDefaultString = "World Population (in millions)";
	
	$("#titlebox").val(titleboxDefaultString).css('color', '#AAAAAA');
	$("#databox").html(databoxDefaultString).css('color', '#AAAAAA');
	
	var inputString = $("#databox").attr("value");
	var input = parse(inputString);
	var previewChart = makeChart(input[1], input[0], $("#titlebox").attr("value"));
	
	//Picking the Chart Type
	$(".chartbutton").click(function(event) {
		event.preventDefault();
		$(".chartbutton").removeClass("button-selected");
		$(this).addClass("button-selected");
		currentChartType = $(this).attr("href");
			$("#thechart").fadeOut(100, function() {
			var inputString = $("#databox").attr("value");
			var input = parse(inputString);
			previewChart = makeChart(input[1], input[0], $("#titlebox").attr("value"));
			useOptions(previewChart);
			$("#thechart").fadeIn(100);
		});
	});
	
	//Advanced Options
	
	$("#advanced").click(function(event) {
		event.preventDefault();
		if(optionsShown == false) {
			$("#advanced").html("Hide advanced options");
			$("#options").slideDown(100);
			optionsShown = true;
		}
		else {
			$("#advanced").html("Show advanced options");
			$("#options").slideUp(100);
			optionsShown = false;
		}
	});
	
	$("#options").submit(function(event) {
		event.preventDefault();
		useOptions(previewChart);
		previewChart.draw();
	});
	
	$("#optionsdefault").click(function(event) {
		event.preventDefault();
		var inputString = $("#databox").attr("value");
		var input = parse(inputString);
		previewChart = makeChart(input[1], input[0], $("#titlebox").attr("value"));
		$("#chartwidth").val(previewChart.getWidth());
		$("#chartheight").val("");
		$("#textsize").val(previewChart.getFontSize());
		$("#fontface").val(previewChart.getFont());
	});	
	
	//Filling Out the Title
	$("#titlebox").focus(function() {
		if($("#titlebox").val() == "" || $("#titlebox").val() == titleboxDefaultString) {$("#titlebox").val("").css('color', '#333333')};
	});
	
	$("#titlebox").blur(function() {
		if($("#titlebox").val() == "" || $("#titlebox").val() == titleboxDefaultString) {
			$("#titlebox").val(titleboxDefaultString).css('color', '#AAAAAA');
		}
		previewChart.setTitle($("#titlebox").val());
		previewChart.draw();
	});
	
	$("#titlebox").live('keyup', function(event) {
		if (true) {
			previewChart.setTitle($("#titlebox").val());
			previewChart.draw();
		}
	});
	
	//Filling Out the Data
	$("#databox").focus(function() {
		if($("#databox").html() == "" || $("#databox").html() == databoxDefaultString) {$("#databox").html("").css('color', '#333333')};
	});
	
	$("#databox").blur(function() {
		if($("#databox").attr('value') == "") {
			$("#databox").html(databoxDefaultString).css('color', '#AAAAAA');
		}
		var inputString = $("#databox").val();
		var input = parse(inputString);
		previewChart = makeChart(input[1], input[0], $("#titlebox").attr("value"));
		useOptions(previewChart);
	});
	
	$("#databox").live('keyup', function(event) {
		var inputString = $("#databox").val();
		var input = parse(inputString);
		previewChart = makeChart(input[1], input[0], $("#titlebox").attr("value"));
		useOptions(previewChart);
	});
	
	$("#databox").live('keydown', function(event) {	
		if (event.keyCode == 9) {
	       var myValue = "\t";
	       var startPos = this.selectionStart;
	       var endPos = this.selectionEnd;
	       var scrollTop = this.scrollTop;
	       this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos,this.value.length);
	       this.focus();
	       this.selectionStart = startPos + myValue.length;
	       this.selectionEnd = startPos + myValue.length;
	       this.scrollTop = scrollTop;

	       event.preventDefault();
		}
		
		$("#data").submit(function(event){
			event.preventDefault();
			var inputString = $("#databox").val();
			var input = parse(inputString);
			previewChart = makeChart(input[1], input[0], $("#titlebox").attr("value"));
			useOptions(previewChart);
		});
		
	});

});


function parse(inputString) {
	var input = inputString.split("\n");
	for (var line=0; line < input.length; line++) {
		if(input[line].toString().length > 0) {
			input[line] = input[line].split("\t")
		}
		else {
			input.splice(line, 1);
			line = line-1;
		}	
	}
	
	var parsedInput = [new Array(), new Array()];
	for (item in input) {
		parsedInput[0][item] = input[item][0];
		if(!isNaN(input[item][1]) && input[item][1].length > 0) {
			parsedInput[1][item] = input[item][1];
		}
		else {
			parsedInput[1][item] = "0";
		}
	};

	return parsedInput;
};

function makeChart(data, labels, title, xAxis, yAxis) {
	if(!data) {data = [100, 150, 120]};
	if(!labels) {labels = ["Label 1", "Label 2", "Label 3"]};
	if(!xAxis) {xAxis = "X Axis"};
	if(!yAxis) {yAxis = "Y Axis"};
	
	if(currentChartType == "#horizbar") {
		return new Smpl.barChart("#thechart", data, labels, title);
	}
	
	if(currentChartType == "#solidline") {
		return new Smpl.lineChart("#thechart", data, labels, title, xAxis, yAxis);
	}
	
	if(currentChartType == "#pie") {
		return new Smpl.pieChart("#thechart", data, labels, title);
	}
	
	if(currentChartType == "#unit") {
		return new Smpl.unitChart("#thechart", data, labels, title);
	}
};

function useOptions(chart) {
	if($("#chartwidth").val() != "") {chart.setWidth($("#chartwidth").val());};
	if($("#chartheight").val() != "") {chart.setHeight($("#chartheight").val())};
	if($("#textsize").val() != "") {chart.setFontSize(parseFloat($("#textsize").val()))};
	chart.setFont($("#fontface").val());
	chart.draw();
}