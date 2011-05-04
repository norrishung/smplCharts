var Smpl = new SmplCharts();
function SmplCharts() {

	this.barChart = function(element, data, labels, title){
	
		//Default initial settings
		var canvasWidth = 550;
		var barToPaddingRatio = .7;
		var padding = 10;
		var fontSize = 12;
		var font = "Arial";
		var foregroundColor = "#BC5A2F";
		var backgroundColor = "#E7E7E7";
		var textColor = "#666666";
		var numScaleDivs = 4;
		var canvasHeight = data.length*30+fontSize+padding*5;
	
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
			minNumber = Math.min(0, Math.min.apply(Math, data));
			
			//Setting up the Background
			var graphXStart = maxLabelLength + padding*2;
			var graphXEnd = canvasWidth;
			var graphWidth = graphXEnd - graphXStart;
			var graphYStart = fontSize + padding*4;
			var graphYEnd = canvasHeight-padding;
			var graphHeight = graphYEnd - graphYStart;
		
			//Setting up the Data
			barHeight = graphHeight/(data.length)*barToPaddingRatio;
			barPadding = graphHeight/(data.length)*(1-barToPaddingRatio);
			if(minNumber < 0) {
				norm = (graphWidth - (maxNumberLength*2 + padding*4))/(maxNumber-minNumber)
			}
			else {
				norm = (graphWidth - (maxNumberLength + padding*2))/(maxNumber)
			}
		
			//Drawing the Background
			context.fillStyle = backgroundColor;
			context.fillRect(graphXStart, graphYStart-padding, canvasWidth, graphHeight+padding*2-barPadding);
			context.fillStyle = textColor;
			context.font = "bold " + (fontSize) + " " + font;
			context.fillText(title.toUpperCase(), graphXStart, padding+fontSize);

			//Drawing the Data
			context.font = (fontSize) + " " + font;
			context.textBaseline = "middle";
			context.textAlign = "right";
			for (var i in data) {
				context.fillStyle = foregroundColor;
				if(minNumber < 0) {
					context.fillRect(graphXStart+padding*1.5+maxNumberLength-minNumber*norm, graphYStart + i*barHeight + i*barPadding, (data[i])*norm, barHeight);
				}
				else {
					context.fillRect(graphXStart, graphYStart + i*barHeight + i*barPadding, data[i]*norm, barHeight);
				}
				context.fillStyle = textColor;
				context.fillText(labels[i], graphXStart - padding, graphYStart + barHeight/2 + i*barHeight + i*barPadding);
			}
			
			context.font = fontSize + " " + font;
		
			for (var i in data) {
				if(data[i] < 0 && minNumber < 0) {
					context.textAlign = "right";
					context.fillText(data[i], graphXStart + padding + maxNumberLength + data[i]*norm - minNumber*norm, graphYStart + barHeight/2 + i*barHeight + i*barPadding, 40);
				}
				else if(data[i] >= 0 && minNumber < 0){
					context.textAlign = "left";
					context.fillText(data[i], graphXStart + data[i]*norm + maxNumberLength + padding*2 - minNumber*norm, graphYStart + barHeight/2 + i*barHeight + i*barPadding, 40);
				}
				else {
					context.textAlign = "left";
					context.fillText(data[i], graphXStart + data[i]*norm + padding/2, graphYStart + barHeight/2 + i*barHeight + i*barPadding, 40);
				}
			}			
		}
		
		this.setTitle = function(text) {
			title = text;
		}
		
		this.getTitle = function() {
			return title;
		}
		
		this.setWidth = function(width) {
			canvasWidth = width;
		}
		
		this.getWidth = function() {
			return canvasWidth;
		}
		
		this.setHeight = function(height) {
			canvasHeight = height;
		}
		
		this.getHeight = function() {
			return canvasHeight;
		}
	
		this.setFont = function(fontface) {
			font = fontface;
		}
	
		this.getFont = function() {
			return font;
		}
	
		this.setFontSize = function(fontsize) {
			fontSize = fontsize;
		}
	
		this.getFontSize = function() {
			return fontSize;
		}
	
		this.setColor = function(color) {
			foregroundColor = color;
		}
	
		this.getColor = function() {
			return foregroundColor;
		}
	
		this.setTextColor = function(color) {
			textColor = color;
		}
	
		this.getTextColor = function() {
			return textColor;
		}
	
		this.setBackgroundColor = function(color) {
			backgroundColor = color;
			
		}
	
		this.getBackgroundColor = function() {
			return backgroundColor;
		}
	
		this.draw();
	
	}
	
	this.lineChart = function(element, data, labels, title, xAxis, yAxis) {
		
		var canvasWidth = 550;
		var canvasHeight = 200;
		var padding = 10;
		var fontSize = 12;
		var font = "Arial";
		var foregroundColor = "#BC5A2F";
		var backgroundColor = "#E7E7E7";
		var textColor = "#666666";
		
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
			minNumber = Math.min(0, Math.min.apply(Math, data));
			
			//setting up the background
			graphXStart = fontSize + maxNumberLength + padding*3;
			graphXEnd = canvasWidth - padding - maxLabelLength/2;
			graphWidth = graphXEnd - graphXStart;
			graphYStart = fontSize + padding*3;
			graphYEnd = canvasHeight - (fontSize*2 + padding*3);
			graphHeight = graphYEnd - graphYStart;
			
			//setting up the data
			dataspacing = graphWidth/(data.length-1);
			norm = graphHeight/(maxNumber-minNumber);
			
			//background
			context.fillStyle = backgroundColor;
			context.fillRect(graphXStart, graphYStart, graphWidth, graphHeight);
			context.fillStyle = textColor;
			context.font = "bold " + (fontSize) + " " + font;
			context.fillText(title.toUpperCase(), graphXStart, padding+fontSize);
			
			
			//foreground
			context.font = (fontSize) + " " + font;
			context.textAlign = "center";
			context.textBaseline = "middle";
			context.beginPath();
			context.moveTo(graphXStart, graphYEnd+minNumber*norm);
			for (i in data) {
				context.lineTo(graphXStart + dataspacing*i, graphYEnd - (data[i]-minNumber)*norm);
				context.fillText(labels[i], graphXStart + dataspacing*i, graphYEnd + padding*2);
			}
			context.lineTo(graphXEnd, graphYEnd+minNumber*norm);
			context.fillStyle = foregroundColor;
			context.fill();
			context.closePath();
			
			context.beginPath();
			for (i in data) {
				context.moveTo(graphXStart + dataspacing*i + 0.5, graphYEnd);
				context.lineTo(graphXStart + dataspacing*i, graphYEnd + padding/2);
			}
			context.closePath();
			context.strokeStyle = textColor;
			context.lineWidth = 1;
			context.stroke();

			context.textAlign = "right";
			context.textBaseline = "middle";
			context.fillStyle = textColor;
			context.fillText(minNumber, graphXStart - padding, graphYEnd);
			if(minNumber < 0) {
				context.fillText("0", graphXStart - padding, graphYEnd+minNumber*norm);
			}
			context.fillText(maxNumber, graphXStart - padding, graphYStart);
			
			context.textAlign = "center";
			context.fillText(xAxis, graphXStart + graphWidth/2, canvasHeight - fontSize);
			
			context.rotate(-90*Math.PI/180);
			context.fillText(yAxis, -(graphYStart + graphHeight/2), fontSize);
		}
		
		this.setTitle = function(text) {
			title = text;
			
		}
		
		this.getTitle = function() {
			return title;
		}
		
		this.setWidth = function(width) {
			canvasWidth = width;
			
		}
		
		this.getWidth = function() {
			return canvasWidth;
		}
		
		this.setHeight = function(height) {
			canvasHeight = height;
			
		}
		
		this.getHeight = function() {
			return canvasHeight;
		}
	
		this.setFont = function(fontface) {
			font = fontface;
			
		}
	
		this.getFont = function() {
			return font;
		}
	
		this.setFontSize = function(fontsize) {
			fontSize = fontsize;
			
		}
	
		this.getFontSize = function() {
			return fontSize;
		}
	
		this.setColor = function(color) {
			foregroundColor = color;
			
		}
	
		this.getColor = function() {
			return foregroundColor;
		}
	
		this.setTextColor = function(color) {
			textColor = color;
			
		}
	
		this.getTextColor = function() {
			return textColor;
		}
	
		this.setBackgroundColor = function(color) {
			backgroundColor = color;
			
		}
	
		this.getBackgroundColor = function() {
			return backgroundColor;
		}
		
		this.draw();
		
	}

	this.pieChart = function(element, data, labels, title) {
		
		//initial conditions
		var canvasWidth = 550;
		var canvasHeight = 300;
		var padding = 10;
		var fontSize = 12;
		var font = "Arial";
		var foregroundColor = "#BC5A2F";
		var backgroundColor = "#E7E7E7";
		var textColor = "#666666";	
		
		this.draw = function() {
			
			//setting up the canvas
			var canvas = $(element)[0];
			canvas.height = canvasHeight;
			canvas.width = canvasWidth;
			var context = canvas.getContext("2d");
			
			//draw the background
			context.font = "bold " + (fontSize) + " " + font;
			context.textAlign = "center";
			context.fillStyle = textColor;
			context.fillText(title.toUpperCase(), canvasWidth/2, fontSize+padding);
			
			//set up the data
			context.font = (fontSize) + " " + font;
			context.lineWidth = .5;
			
			centerX = canvasWidth/2;
			centerY = canvasHeight/2+fontSize;
			
			maxLabelLength = 0;
			for (item in labels) {
				textWidth = context.measureText(labels[item] + " (100.00%)").width;
				if(textWidth > maxLabelLength) {maxLabelLength = textWidth};
			}
			maxHorRadius = (canvasWidth - 2*maxLabelLength - 4*padding)/(2*1.5);
			maxVerRadius = (canvasHeight - padding*2)/(2*1.5);
			radius = Math.min(maxHorRadius, maxVerRadius);

			total = 0;
			for(i in data) {total = total+parseFloat(data[i])};
			norm = 360/total;
			
			currentDegrees = 0;
			colorWeight = .8/(data.length-1);
			
			//draw the data
			for(i in data) {
				//draw the pie slice
				nextDegrees = data[i]*norm + currentDegrees;
				context.beginPath();
					context.moveTo(centerX, centerY);
					context.arc(centerX, centerY, radius, toRadians(currentDegrees), toRadians(nextDegrees), false);
					context.globalAlpha = .2 + i*colorWeight;
					context.fillStyle = foregroundColor;
					context.fill();
					context.globalAlpha = 1;		
				context.closePath();
				
				//draw label lines and text
				stemDegrees = currentDegrees + data[i]*norm/2;
				stemStartX = centerX+radius*Math.cos(toRadians(stemDegrees));
				stemStartY = centerY+radius*Math.sin(toRadians(stemDegrees));
				stemEndX = centerX+1.2*radius*Math.cos(toRadians(stemDegrees));
				stemEndY = centerY+1.2*radius*Math.sin(toRadians(stemDegrees));
				if(stemEndX < canvasWidth/2) {
					branchEndX = centerX-radius*1.5;
					context.textAlign = "right";
					textPadding = -padding;
				}
				else {
					branchEndX = centerX+radius*1.5;
					context.textAlign = "left";
					textPadding = padding;
				};
				context.fillStyle = textColor;
				context.strokeStyle = textColor;
				context.beginPath();
					context.moveTo(stemStartX, stemStartY);
					context.lineTo(stemEndX, stemEndY);
					context.lineTo(branchEndX, stemEndY);
					context.stroke();
				context.closePath();
				
				context.textBaseline = "middle";
				percentage = Math.round((data[i]/total)*10000)/100;
				context.fillText(labels[i] + " (" + percentage + "%)", branchEndX + textPadding, stemEndY);
				
				currentDegrees = nextDegrees;
			}
		
		}
		
		function toRadians(number) {
			return number*(Math.PI/180);	
		}
		
		this.setTitle = function(text) {
			title = text;
			
		}
		
		this.getTitle = function() {
			return title;
		}
		
		this.setWidth = function(width) {
			canvasWidth = width;
			
		}
		
		this.getWidth = function() {
			return canvasWidth;
		}
		
		this.setHeight = function(height) {
			canvasHeight = height;
			
		}
		
		this.getHeight = function() {
			return canvasHeight;
		}
	
		this.setFont = function(fontface) {
			font = fontface;
			
		}
	
		this.getFont = function() {
			return font;
		}
	
		this.setFontSize = function(fontsize) {
			fontSize = fontsize;
			
		}
	
		this.getFontSize = function() {
			return fontSize;
		}
	
		this.setColor = function(color) {
			foregroundColor = color;
			
		}
	
		this.getColor = function() {
			return foregroundColor;
		}
	
		this.setTextColor = function(color) {
			textColor = color;
			
		}
	
		this.getTextColor = function() {
			return textColor;
		}
	
		this.setBackgroundColor = function(color) {
			backgroundColor = color;
			
		}
	
		this.getBackgroundColor = function() {
			return backgroundColor;
		}

		
		this.draw();
	}

	this.unitChart = function(element, data, labels, title) {
		
		var canvasWidth = 550;
		var padding = 10;
		var fontSize = 12;
		var font = "Arial";
		var foregroundColor = "#BC5A2F";
		var backgroundColor = "#E7E7E7";
		var textColor = "#666666";
		var squareSize = 1;
		var squarePadding = 1;
		var canvasRowMax = 3;
		var unitRowMax = Math.round(((canvasWidth-(canvasRowMax*padding*3))/canvasRowMax)/(squareSize+squarePadding));
		console.log(unitRowMax);
		var canvasHeight = 6000;
		
		this.draw = function() {
			
			//setting up the canvas
			var canvas = $(element)[0];
			canvas.height = canvasHeight;
			canvas.width = canvasWidth;
			var context = canvas.getContext("2d");
			
			context.fillStyle = textColor;
			context.font = "bold " + (fontSize) + " " + font;
			context.fillText(title.toUpperCase(), 0, padding+fontSize);
			
			currentYStart = fontSize + padding*5;
			currentXStart = 0;
			yMax = currentYStart;
			
			for(i in data) {
				totalNumber = data[i];
				currentNumber = 0;
				context.fillStyle = textColor;
				context.font = (fontSize) + " " + font;
				context.fillText(labels[i], currentXStart, currentYStart);
				currentY = currentYStart+fontSize;
				currentX = currentXStart;
				context.fillStyle = foregroundColor;
				while(currentNumber < totalNumber) {
					context.fillRect(currentX, currentY, squareSize, squareSize);
					if(currentX + 4 < currentXStart + (squareSize+squarePadding)*unitRowMax) {
						currentX = currentX + squareSize+squarePadding;
					}
					else {
						currentY = currentY + squareSize + squarePadding;
						currentX = currentXStart;
					}
					currentNumber++;
				}
				if(currentY > yMax) {yMax = currentY};
				if(i%canvasRowMax == canvasRowMax-1) {
					currentYStart = yMax + padding*4;
					currentXStart = 0;
				}
				else {
					currentXStart = currentXStart + unitRowMax*(squareSize+squarePadding) + padding*3;
				}
			}
		}

		this.setTitle = function(text) {
			title = text;
			
		}
		
		this.getTitle = function() {
			return title;
		}
		
		this.setWidth = function(width) {
			canvasWidth = width;
			
		}
		
		this.getWidth = function() {
			return canvasWidth;
		}
		
		this.setHeight = function(height) {
			canvasHeight = height;
			
		}
		
		this.getHeight = function() {
			return canvasHeight;
		}
	
		this.setFont = function(fontface) {
			font = fontface;
			
		}
	
		this.getFont = function() {
			return font;
		}
	
		this.setFontSize = function(fontsize) {
			fontSize = fontsize;
			
		}
	
		this.getFontSize = function() {
			return fontSize;
		}
	
		this.setColor = function(color) {
			foregroundColor = color;
			
		}
	
		this.getColor = function() {
			return foregroundColor;
		}
	
		this.setTextColor = function(color) {
			textColor = color;
			
		}
	
		this.getTextColor = function() {
			return textColor;
		}
	
		this.setBackgroundColor = function(color) {
			backgroundColor = color;
			
		}
	
		this.getBackgroundColor = function() {
			return backgroundColor;
		}
		
		this.draw();
	}
}