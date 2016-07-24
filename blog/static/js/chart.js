var url = "static/data.csv";
d3.csv(url, function(error, data){
  data.forEach(function(d,i){
    // console.log(data);
    //데이터불러오기
    d.male =+d.male;
    d.female=+d.female;
  });
  //가로,세로,여백 설정
  var margin = {top:20, right:40, bottom:30,left:40},
      width =1000 - margin.left + margin.right,
      height = 600 - margin.top - margin.bottom;

  //x,y척도 설정
  var xScale = d3.scale.linear()
                .domain([0,d3.max(data, function(d){return d.male;})])
                .range([0,width]);
  var yScale = d3.scale.linear()
                .domain([0,d3.max(data,function(d){return d.female;})])
                .range([height,0]);

  //x축설정
var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");
//y축설정
var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

//SVG 틀 그리기~
var svg = d3.select(".chart")
          .append("svg")
          .attr("width",width+margin.left+margin.right)
          .attr("height",height+margin.top+margin.bottom)
          .append("g")
          .attr("transform","translate("+margin.left+","+margin.top+")");

//x축그리기
svg.append("g")
    .attr("class","axis")
    .attr("transform", "translate(0,"+height+")")
    .call(xAxis)
    .append("text")
    .text("남자인구")
    .attr("transform","translate("+(width-margin.right)+",-10)");

//y축그리기
svg.append("g")
    .attr("class","axis")
    .call(yAxis)
    .append("text")
    .text("여자인구");

//산포도 점찍기
svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx",function(d){
      return xScale(d.male);
    })
    .attr("cy",function(d){
      return yScale(d.female);
    })
    .attr("r",5)
    .attr("fill","#19BDC4");

//점에 데이터명 설정
svg.selectAll(".labeltext")
    .data(data)
    .enter()
    .append("text")
    .text(function(d){
      return d.area;
    })
    .attr("x",function(d){
      return xScale(d.male);
    })
    .attr("y",function(d){
      return yScale(d.female)-10;
    })
    .attr("font-family","sans-serif")
    .attr("font-size","10px")
    .attr("fill","#888888")
    .attr("text-anchor","middle");
});
