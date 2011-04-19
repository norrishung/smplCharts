var Smpl = new SmplCharts();
function SmplCharts() {

	this.BarChart = function(element, data, labels, title, caption){
	
		//Default initial settings
		var canvasWidth = 600;
		var barHeight = 20;
		var barToPaddingRatio = .7;
		var outerPadding = barHeight;
		var fontSize = 13;
		var font = "Arial";
		var foregroundColor = "#666666";
		var backgroundColor = "#E7E7E7";
		var textColor = foregroundColor;
		var numScaleDivs = 4;
	
		this.draw = function() {
			//Setting up the Background
			var textHorMargin = fontSize*9;
			var textVerMargin = fontSize*4;
			var graphWidth = canvasWidth - textHorMargin;
			var graphHeight = barHeight*data.length/barToPaddingRatio + outerPadding;
			var graphXStart = textHorMargin*.5;
			var graphYStart = textVerMargin*.5;
			var canvasHeight = graphHeight + textVerMargin;

			//Setting up the Canvas
			var canvas = $(element)[0];
			canvas.height = canvasHeight;
			canvas.width = canvasWidth;
			var context = canvas.getContext("2d");
		
			//Setting up the Data
			padding = graphHeight/data.length*(1-barToPaddingRatio);
			maxNumber = Math.max.apply(Math, data);

			//Setting up the Scale
			scaleSpacing = graphWidth/numScaleDivs;
		
			//Making sure x axis labels are rounded numbers
			if (1<maxNumber && maxNumber<999) {
				scale = Math.ceil(maxNumber/numScaleDivs);		
			}
			else if(maxNumber > 1000) {
				scalePower = Math.round(maxNumber).toString().length - 1;
				scaleRounder = Math.pow(10, scalePower);
				scale = Math.ceil((maxNumber/numScaleDivs)/scaleRounder)*scaleRounder;
				
			}
			else {
				scale = maxNumber/numScaleDivs;
			}
			scaleMax = scale*numScaleDivs;
			norm = graphWidth/scaleMax;
		
			//Drawing the Background
			//context.strokeRect(0, 0, canvasWidth, canvasHeight); //Canvas Borders
			context.fillStyle = backgroundColor;
			context.fillRect(graphXStart, graphYStart, canvasWidth, graphHeight);
			context.fillStyle = textColor;
			context.font = "bold " + (fontSize) + " " + font;
			context.textBaseline = "middle";
			context.fillText(title.toUpperCase() + " - " + caption, graphXStart, 10)

			//Drawing the Data
			context.font = fontSize + " " + font;
			for (var i in data) {
				context.fillStyle = foregroundColor;
				context.fillRect(graphXStart, graphYStart + outerPadding/2 + i*barHeight + i*padding, data[i]*norm, barHeight);
				context.textAlign = "right";
				context.fillStyle = textColor;
				context.fillText(labels[i], graphXStart - 10, graphYStart + outerPadding/2 + barHeight/2 + i*barHeight + i*padding);
			}

			//Drawing the Scale
			for (var i = 0; i<=numScaleDivs; i++) {
				context.moveTo(graphXStart + i*scaleSpacing, graphYStart);
				context.lineTo(graphXStart + i*scaleSpacing, graphYStart + graphHeight + 5);
				context.textAlign = "center";
				context.fillText(scale*i, graphXStart + i*scaleSpacing, graphHeight + fontSize*3.2);
			}
		
			context.strokeStyle = backgroundColor;
			context.stroke();
		
			for (var i in data) {
				context.textAlign = "left";
				context.fillText(data[i], graphXStart + data[i]*norm + 10, graphYStart + outerPadding/2 + barHeight/2 + i*barHeight + i*padding);
			}			
		}
	
		this.setFont = function(fontface) {
			font = fontface;
			this.draw();
		}
	
		this.getFont = function() {
			return font;
		}
	
		this.setFontSize = function(fontsize) {
			fontSize = fontsize;
			this.draw();
		}
	
		this.getFont = function() {
			return font;
		}
	
		this.setColor = function(color) {
			foregroundColor = color;
			this.draw();
		}
	
		this.getColor = function() {
			return foregroundColor;
		}
	
		this.setTextColor = function(color) {
			textColor = color;
			this.draw();
		}
	
		this.getTextColor = function() {
			return textColor;
		}
	
		this.setBackgroundColor = function(color) {
			backgroundColor = color;
			this.draw();
		}
	
		this.getBackgroundColor = function() {
			return backgroundColor;
		}
	
		this.setScaleDivs = function(num) {
			numScaleDivs = num + 1;
			this.draw();
		}

		this.getScaleDivs = function() {
			return numScaleDivs
		}
	
		this.draw();
	
	}
	
}