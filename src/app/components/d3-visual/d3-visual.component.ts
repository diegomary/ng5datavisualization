import { Component, OnInit, AfterViewInit} from '@angular/core';
import * as d3 from "d3";


@Component({
  selector: 'app-d3-visual',
  templateUrl: './d3-visual.component.html',
  styleUrls: ['./d3-visual.component.css']
})
export class D3VisualComponent implements OnInit, AfterViewInit {
//
  constructor() {}
  name:string;
  vis:any={}; 
  data:any[] = [{index:0, value: 27.4},
                {index:1, value: 45},
                {index:2, value: 25.50},
                {index:3, value: 59.0},
                {index:4, value: 66.00},
                {index:5, value: 52.0},
                {index:6, value: 14.20},
                {index:7, value: 31.21},
                {index:8, value: 34.40},
                {index:9, value: 49.4},
                {index:10, value: 16.28},
                {index:11, value: 28.34},
                {index:12, value: 51.0},
                {index:13, value: 18.6},
                {index:14, value: 29.6},
                {index:15, value: 71.1},
                {index:16, value: 36.90},
                ];
 maxValue = Math.max.apply(Math,this.data.map((o)=>{return o.value;}));
 

 barColors = ():any => {
  	let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);      
    return (x && y && z === 255) ? this.barColors(): {r:x,g:y,b:z};
  }
  resizeHisto= (event):void => {    
    let windowSize = event.target.innerWidth-60;
    this.drawGraph(windowSize,this.data);   
  }

  drawGraph = (size,data):void => {
    let width = size;
    let height = 400;
    d3.select(".bar").html("");
    // Data for Graphic    
    // Axis Creation
    this.vis = d3.select(".bar")                     
      .append("svg:svg")
      .attr("width", width)
      .attr("height", height)                
      .style("padding", "30px");
    let yScale = d3.scaleLinear()
      .domain([0, this.maxValue])
      .range([height,0]);    
    let xScale = d3.scaleLinear()
    .domain([0,data.length])
    .range([0, width]);
    let yAxis = d3.axisLeft(yScale);
    let xAxis = d3.axisBottom(xScale);
    this.vis.append("g")          
        .call(yAxis);
   
    this.vis.append("g")        
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis);


    // Bars creation
    let minigroup =  this.vis.append("g")
    .selectAll("g")
    .data(data).enter().append("g");
    minigroup.append("rect")
    .attr("width",width/data.length)
    .attr("height", (d)=> {return (d.value *400/this.maxValue);})    
    .attr("transform", (d)=> { return "translate(0," + (height - (d.value*400/this.maxValue)) + ")";})
    .attr("x", (d) => {let xPos = d.index * (width/data.length); return xPos; });
    minigroup.append("text").text((d)=> { return d.value; })
    
    .attr("transform", (d)=> { return "translate(0," + ((height - (d.value*400/this.maxValue))+(d.value*400/this.maxValue/2)) + ") rotate(0)";})
    .attr("font-size","small")   
    .attr("x", (d) => {let xPos = ((d.index*width/data.length)+(width/data.length/2)); return xPos;});
      //minigroup.selectAll("g:nth-child(2n) > rect").style("fill","steelblue");
      //minigroup.selectAll("g:nth-child(2n+1) > rect").style("fill","cornflowerblue");
      //minigroup.selectAll("g> text").style("fill","white");
   for(let counter = 0; counter < data.length;counter++)
   {      
      let color = this.barColors();
      minigroup.selectAll("g:nth-child("+(counter+1)+") > rect").style("fill","rgb(" + color.r + "," + color.g + "," + color.b + ")");
      color.r = color.r ^ 0xff;
      color.g = color.g ^ 0xff;
      color.b = color.b ^ 0xff;
      minigroup.selectAll("g:nth-child("+(counter+1)+") > text").style("fill","rgb(" + color.r + "," + color.g + "," + color.b + ")");
    }
  }

  ngOnInit() {window.addEventListener('resize', this.resizeHisto);}
  ngOnDestroy():void{
    window.removeEventListener('resize', this.resizeHisto);
     d3.select(".bar").html("");
     this.vis={};     
   }
  ngAfterViewInit():void { 
  d3.json('http://api.reddit.com/', (error, data:any) => {this.drawGraph(window.innerWidth-60,this.data);});
  }

}
