SMPLCHART
Smart Pretty Charts for Dumb Ugly People


The Gist:
SMPL Charts are charts made with HTML/CSS/Javascript that are quick to
generate and beautiful to look at (easy to understand). These charts are 
viewable across all browsers and web devices without the need for plugins.

We even include an online tool where you can paste your excel data to
generate embeddable code for your website. Your welcome.


Example Chart Generating Function:

smpl.barChart(
  "data" => [0, 1, 2, 3, 4, 5],
  "label" => "Example Chart",
  "caption" => "An Example Smpl Bar Chart",
  "width" => 680,
  "height" => 300,
  "ylabel" => "Y Axis",
  "xlabel" => "X Axis"
);

Color and Font to be determined in CSS or initialization function.

Online tool for converting excel data to a chart which can be embedded in a website.