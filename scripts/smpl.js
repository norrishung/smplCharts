var Smpl = new SmplCharts();
function SmplCharts() {

	this.barChart = function(element, data, labels, title, caption){
	
		//Default initial settings
		var canvasWidth = 600;
		var canvasHeight = data.length*30;
		var barToPaddingRatio = .7;
		var padding = 10;
		var fontSize = 12;
		var font = "Arial";
		var foregroundColor = "#666666";
		var backgroundColor = "#E7E7E7";
		var textColor = foregroundColor;
		var numScaleDivs = 4;
	
		this.draw = function() {
			//Setting up the Canvas
			var canvas = $(element)[0];
			canvas.height = canvasHeight;
			canvas.width = canvasWidth;
			var context = canvas.getContext("2d");			

			//Figuring out spacing
			context.font = (fontSize) + " " + font;
			maxLabelLength = 0;
			for (item in labels) {
				textWidth = context.measureText(labels[item]).width;
				if(textWidth > maxLabelLength) {maxLabelLength = textWidth};
			}
			
			maxNumberLength = 0;
			for (item in data) {
				textWidth = context.measureText(data[item]).width;
				if(textWidth > maxNumberLength) {maxNumberLength = textWidth};
			}
			
			maxNumber = Math.max.apply(Math, data);
			
			//Setting up the Background
			var graphXStart = maxLabelLength + padding*2;
			var graphXEnd = canvasWidth - (maxNumberLength + padding*2);
			var graphWidth = graphXEnd - graphXStart;
			var graphYStart = fontSize + padding*2;
			var graphYEnd = canvasHeight - (fontSize + padding*2);
			var graphHeight = graphYEnd - graphYStart;
		
			//Setting up the Data
			barHeight = graphHeight/(data.length)*barToPaddingRatio;
			barPadding = graphHeight/(data.length-1)*(1-barToPaddingRatio);
			norm = graphWidth/maxNumber;
		
			//Drawing the Background
			context.fillStyle = backgroundColor;
			context.fillRect(graphXStart, graphYStart-padding, canvasWidth, graphHeight+padding*2);
			context.fillStyle = textColor;
			context.font = "bold " + (fontSize) + " " + font;
			context.textBaseline = "middle";
			context.fillText(title.toUpperCase() + " - " + caption, graphXStart, padding);

			//Drawing the Data
			context.font = (fontSize) + " " + font;
			context.textAlign = "right";
			for (var i in data) {
				context.fillStyle = foregroundColor;
				context.fillRect(graphXStart, graphYStart + i*barHeight + i*barPadding, data[i]*norm, barHeight);
				context.fillStyle = textColor;
				context.fillText(labels[i], graphXStart - padding, graphYStart + barHeight/2 + i*barHeight + i*barPadding);
			}
			
			context.font = fontSize + " " + font;
		
			for (var i in data) {
				context.textAlign = "left";
				context.fillText(data[i], graphXStart + data[i]*norm + padding/2, graphYStart + barHeight/2 + i*barHeight + i*barPadding, 40);
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
	
	
	this.lineChart = function(element, data, labels, title, caption, xAxis, yAxis) {
		
		var canvasWidth = 600;
		var canvasHeight = 200;
		var padding = 10;
		var fontSize = 12;
		var font = "Arial";
		var foregroundColor = "#666666";
		var backgroundColor = "#E7E7E7";
		var textColor = foregroundColor;
		
		this.draw = function() {
			
			//setting up the canvas
			var canvas = $(element)[0];
			canvas.height = canvasHeight;
			canvas.width = canvasWidth;
			var context = canvas.getContext("2d");
			
			//Figuring out spacing
			context.font = (fontSize) + " " + font;
			maxLabelLength = 0;
			for (item in labels) {
				textWidth = context.measureText(labels[item]).width;
				if(textWidth > maxLabelLength) {maxLabelLength = textWidth};
			}
			
			maxNumberLength = 0;
			for (item in data) {
				textWidth = context.measureText(data[item]).width;
				if(textWidth > maxNumberLength) {maxNumberLength = textWidth};
			}
			
			maxNumber = Math.max.apply(Math, data);
			
			//setting up the background
			graphXStart = fontSize + maxNumberLength + padding*3;
			graphXEnd = canvasWidth - padding;
			graphWidth = graphXEnd - graphXStart;
			graphYStart = fontSize + padding*4;
			graphYEnd = canvasHeight - (fontSize*2 + padding*3);
			graphHeight = graphYEnd - graphYStart;
			
			//setting up the data
			dataspacing = graphWidth/(data.length-1);
			norm = graphHeight/maxNumber;
			
			//background
			context.fillStyle = backgroundColor;
			context.fillRect(graphXStart, graphYStart-padding*2, graphWidth, graphHeight+padding*2);
			context.fillStyle = textColor;
			context.font = "bold " + (fontSize) + " " + font;
			context.textBaseline = "middle";
			context.fillText(title.toUpperCase() + " - " + caption, graphXStart, padding);
			
			
			//foreground
			context.font = (fontSize) + " " + font;
			context.textAlign = "center";
			context.beginPath();
			context.moveTo(graphXStart, graphYEnd);
			for (i in data) {
				context.lineTo(graphXStart + dataspacing*i, graphYEnd - data[i]*norm)
				context.fillText(labels[i], graphXStart + dataspacing*i, graphYEnd + padding*2);
			}
			context.lineTo(graphXEnd, graphYEnd);
			context.closePath();
			context.fill();
			
			context.textAlign = "right";
			context.textBaseline = "middle";
			context.fillText("0", graphXStart - padding, graphYEnd);
			context.fillText(maxNumber, graphXStart - padding, graphYStart);
			
			context.textAlign = "center";
			context.fillText(xAxis, graphXStart + graphWidth/2, canvasHeight - fontSize);
			
			context.rotate(-90*Math.PI/180);
			context.fillText(yAxis, -(graphYStart + graphHeight/2), fontSize);
		}
		
		this.draw();
		
	}

	this.pieChart = function(element, data, labels, title, caption) {
		
		//initial conditions
		var canvasWidth = 600;
		var canvasHeight = 400;
		var fontSize = 12;
		var font = "Arial";
		var foregroundColor = "#666666";
		var backgroundColor = "#E7E7E7";
		var textColor = foregroundColor;	
		
		this.draw = function() {
			
			//setting up the canvas
			var canvas = $(element)[0];
			canvas.height = canvasHeight;
			canvas.width = canvasWidth;
			var context = canvas.getContext("2d");	
			
			//data
			var total = 0;
			for(i in data) {total = total+parseFloat(data[i])};
			norm = 360/total;
			colorNorm = 170/(data.length-1);
			
			centerX = canvasWidth/2;
			centerY = canvasHeight/2;
			currentDegrees = 0;
			
			for(i in data) {
				colorNumber = Math.round(200-i*colorNorm);
				nextDegrees = data[i]*norm + currentDegrees;
				context.beginPath();
				context.moveTo(centerX, centerY);
				context.arc(centerX, centerY, 100, toRadians(currentDegrees), toRadians(nextDegrees), false);
				context.closePath();
				context.fillStyle = 'rgb(' + colorNumber + ', ' + colorNumber + ', ' + colorNumber + ')';
				context.fill();
				currentDegrees = nextDegrees;
			}
		
		}
		
		function toRadians(number) {
			return number*(Math.PI/180);	
		}
		
		this.draw();
	}

}