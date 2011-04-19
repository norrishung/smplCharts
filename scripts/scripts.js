var literalTabbing = false;

$(document).ready(function() {
	
	$("#data").submit(function(event){
		event.preventDefault();
		var inputString = $("#datainput").val();
		var input = parse(inputString);
		var example = new Smpl.BarChart("#chart1", input[0], input[1], "Chart Title", "An Example Chart");
	});

	
	$("#datainput").live('keydown', function(event) {

		if (event.keyCode == 13) {
			var inputString = $("#datainput").val();
			var input = parse(inputString);
			var example = new Smpl.BarChart("#chart1", input[0], input[1], "Chart Title", "An Example Chart");
		}
		
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
		
	});

});


function parse(inputString) {
	var input = inputString.split("\n");
	for (line in input) {
		input[line] = input[line].split("\t");
	}
	
	var parsedInput = [new Array(), new Array()];
	for (item in input) {parsedInput[0][item] = input[item][1];};
	for (item in input) {parsedInput[1][item] = input[item][0];};

	return parsedInput;
};