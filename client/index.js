var cScore = 0;
var collisionCount = 0;
var highScore = d3.selectAll('.hscore').text();
var currentScore = d3.selectAll('.curr');
var svgContainer = d3.select(".boarz").append("svg").
attr("width", 600).attr("height", 450);

var randNumOfEnemies = function(){
  return Math.floor(Math.random() * (25 - 15) + 15);
}

var randWidth = function(){
  return Math.floor(Math.random() * ((svgContainer.attr("width") - 10) - 15) + 15);
}

var randHeight = function(){
  return Math.floor(Math.random() * ((svgContainer.attr("height") - 10) - 15) + 15);
}

var spawnHero = function(){
  var hero = svgContainer.selectAll('rect')
            .data([{x: (svgContainer.attr("width") / 2), y: (svgContainer.attr("height") / 2) }])
            .attr('x', () => (svgContainer.attr("width")/2))
            .attr('y', () => (svgContainer.attr("height")/2))
            .enter()
            .append('rect')
            .attr('x', (d) => d.x)
            .attr('y', (d) => d.y)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", "ghostwhite")
            .call(d3.behavior.drag().on('drag', () => hero.attr('x', d3.event.x).attr('y', d3.event.y) ));
}

var spawnElements = function () {
  var enemyCircles = [];

  for (var i = 0; i < randNumOfEnemies(); i++) {
    enemyCircles.push('');
  }

  var circles = svgContainer.selectAll("circle").data(enemyCircles).enter().append("circle");
  var circleAttributes = circles.attr('r', 10)
    .attr('cx', () => randWidth())
    .attr('cy', () => randHeight())
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('fill', 'red');

}

var moveElementsToRandomLocation = function () {
    var circles = svgContainer.selectAll("circle")
      .transition()
      .attr('cx', () => randWidth())
      .attr('cy', () => randHeight())
      .duration(1300);

}

var scoreIncrementer = function () {
  cScore++;
  d3.selectAll('.curr').text(cScore);
}


var detectCollision = function () {
  var circles = d3.selectAll('circle');
  var hero = d3.selectAll('rect');

  for (var i = 0; i < circles[0].length; i++) {
    var enemyX = circles[0][i].cx.animVal.value;
    var enemyY = circles[0][i].cy.animVal.value;
    var heroX = hero[0][0].x.animVal.value;
    var heroY =  hero[0][0].y.animVal.value;

    if((enemyX - heroX >= -12 && enemyX - heroX <= 12)  && (enemyY - heroY >= -12 && enemyY - heroY <= 12)) {
      collisionCount++;
      if (cScore > highScore){
        d3.selectAll('.hscore').text(cScore);
        highScore = cScore;
      }
      d3.selectAll('.curr').text('0');
      cScore = 0;
      d3.selectAll('.collis').text(collisionCount);
    }
  }
}


spawnHero();
spawnElements();
setInterval(moveElementsToRandomLocation, 1700);
setInterval(scoreIncrementer, 80);
setInterval(detectCollision, 100);
