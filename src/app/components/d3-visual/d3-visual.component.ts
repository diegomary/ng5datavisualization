import { Component, OnInit, AfterViewInit} from '@angular/core';
import * as d3 from "d3";


@Component({
  selector: 'app-d3-visual',
  templateUrl: './d3-visual.component.html',
  styleUrls: ['./d3-visual.component.css']
})
export class D3VisualComponent implements OnInit, AfterViewInit {

  constructor() {

  }
 vis:any={};
 barColors = ():string => {
  	let x = Math.floor(Math.random() * 256);
       let y = Math.floor(Math.random() * 256);
       let z = Math.floor(Math.random() * 256);      
       return (x && y && z) === 255 ? this.barColors():  "rgb(" + x + "," + y + "," + z + ")"
  }
  resizeHisto= (event):void => {
    console.log(event);
    let windowSize = event.target.innerWidth-60;
    this.drawGraph(windowSize);
   
  }


  drawGraph = (size):void => {

    let width = size,
      height = 400;
     d3.select(".bar").html("");
            
        // create an svg container
        this.vis = d3.select(".bar").
            append("svg:svg")
                .attr("width", width)
                .attr("height", height)                
                .style("padding", "30px");              
       
        let yScale = d3.scaleLinear()
          .domain([0, 100])
          .range([height,0]);        
       
        let mindate = new Date(2012,0,1),
            maxdate = new Date(2012,0,31);
            
        let xScale = d3.scaleTime()
          .domain([mindate, maxdate])
          .range([0, width]);
        let yAxis = d3.axisLeft(yScale);
        let xAxis = d3.axisBottom(xScale);
           
            
        // draw y axis with labels and move in from the size by the amount of padding
        this.vis.append("g")
            //.attr("transform", "translate("+padding+",0)")
            .call(yAxis);

        // draw x axis with labels and move to the bottom of the chart area
        this.vis.append("g")        
            .attr("transform", "translate(0," + (height) + ")")
            .call(xAxis);
  }

  ngOnInit() {}
  ngAfterViewInit():void {

    window.addEventListener('resize', this.resizeHisto);  
    this.drawGraph(window.innerWidth);

// let svgContainer = d3.select(".bar")
// .append("svg")
// .style("width", 1000)


// let scale = d3.scaleLinear().domain([0,1]).range([0,1000]);
// let axis = d3.axisBottom(scale);

// let xAxisGroup = svgContainer
// .append("g")
// .call(axis);




	// let dt = [600,40,500,120,190,340,900,350,230,700,34];
 // 	let dv = d3.select(".bar").style("vertical-align","bottom")  
 //     .selectAll("div")
 //     .data(dt)
 //     dv.enter().append("div")         
 //     .style("display","inline-block")    
 //     .style("background-color", (d) => {
 //       return this.barColors()
 //      }).style("vertical-align","bottom")
 //       .style("position","relative")
 //     .style("color","black")
 //     .style("font-family","verdana")     
 //     .style("width",(d) => {
 //     	let barWidth = 100/dt.length;
 //     	return barWidth + "%";
 //     })
 //     .style("border-top-left-radius", "20px")
 //      .style("border-top-right-radius", "20px")
 //     .style("font-size","small")
 //     .style("text-align","center")        
 //     .style("height", (d)=> {
 //           var barHeight = d ;
 //           return barHeight + "px";
 //         })
 //     .append("p").text((d)=> { return d; })
 //     .style("position","absolute")
 //     .style("width","100%")
 //     .style("bottom","0")
 //     .style("left","0")
 //     .style("right","0")
 //     .style("margin","0 0 -20px 0 ");
 //     dv.exit().remove();




  }

}
