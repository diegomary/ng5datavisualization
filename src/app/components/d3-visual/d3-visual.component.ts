import { Component, OnInit, AfterViewInit} from '@angular/core';
import * as d3 from "d3";


@Component({
  selector: 'app-d3-visual',
  templateUrl: './d3-visual.component.html',
  styleUrls: ['./d3-visual.component.css']
})
export class D3VisualComponent implements OnInit, AfterViewInit {

  constructor() {}
  name:string;
  vis:any={};
  data:any;

 barColors = ():string => {
  	let x = Math.floor(Math.random() * 256);
       let y = Math.floor(Math.random() * 256);
       let z = Math.floor(Math.random() * 256);      
       return (x && y && z) === 255 ? this.barColors():  "rgb(" + x + "," + y + "," + z + ")"
  }
  resizeHisto= (event):void => {    
    let windowSize = event.target.innerWidth-60;
    this.drawGraph(windowSize,this.data);
   
  }


  drawGraph = (size,data):void => {


    let width = size, height = 400;
    d3.select(".bar").html("");
    // Data for Graphic
    let dt:any[] = [
    {index:0, value: 400},
    {index:1, value: 340},
    {index:2, value: 250},
    {index:3, value: 80},
    {index:4, value: 100},
    {index:5, value: 50},
    {index:6, value: 120}];
    // Axis Creation
    this.vis = d3.select(".bar")                     
      .append("svg:svg")
      .attr("width", width)
      .attr("height", height)                
      .style("padding", "30px");
    let yScale = d3.scaleLinear()
      .domain([0, 900])
      .range([height,0]);
    let xScale = d3.scaleLinear()
    .domain([1,11])
    .range([0, width]);
    let yAxis = d3.axisLeft(yScale);
    let xAxis = d3.axisBottom(xScale);
    this.vis.append("g")          
        .call(yAxis);
    this.vis.append("g")        
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis);
    // Bars creation
    this.vis.append("g")
    .selectAll("rect")
    .data(dt).enter().append("rect")
    .attr("width",100)
    .attr("height", (d)=> {return d.value;})
    .style("fill", (d) => {return this.barColors()})       
    .attr("transform", (d)=> { return "translate(0," + (height - d.value) + ")";})
    .attr("x", (d) => {let xPos = d.index * 100; return xPos; })
  }

  ngOnInit() { window.addEventListener('resize', this.resizeHisto);}
  ngOnDestroy():void{
    window.removeEventListener('resize', this.resizeHisto);
     d3.select(".bar").html("");
     this.vis={};     
   }
  ngAfterViewInit():void {
  let children:any = {};
 d3.json('http://api.reddit.com/', (error, data:any) => {
   children =[600,40,500,120,190,340,900,350,230,700,34]; //data.data.children;
   this.data = children;
   this.drawGraph(window.innerWidth-60,children);
 });     
    

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
