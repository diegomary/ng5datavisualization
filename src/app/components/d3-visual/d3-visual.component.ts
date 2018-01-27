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
  data:number[] = [7.4,3.51,6.50,12.4,1.45,23.1,2.45,2.34,1.23,1.23,11,1,2,3,4,5,6];               
  maxValue = Math.max.apply(Math,this.data.map((o)=>{return o;}));
 

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
      .range([height,0])

    let xScale = d3.scaleLinear()
    .domain([0,data.length])
    .range([0, width]);
    let yAxis = d3.axisLeft(yScale);
    let xAxis = d3.axisBottom(xScale).ticks(this.data.length);
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
    .attr("height", (d) => { return (d *400/this.maxValue);})    
    .attr("transform", (d)=> { return "translate(0," + (height - (d*400/this.maxValue)) + ")";})
    .attr("x", (d,i) => { let xPos = i * (width/data.length); return xPos; });
    minigroup.append("text").text(d=>d)
   
    .attr("transform", (d)=> { return "translate(0," + ((height - (d*400/this.maxValue))+(d*400/this.maxValue/2)) + ") rotate(0)";})
    .attr("font-size","small")   
    .attr("x", (d,i) => {let xPos = ((i*width/data.length)+(width/data.length/2)); return xPos;});
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

// setInterval(()=>{
//   this.data = Array.from({length: Math.floor(Math.random() * 40)}, () => Math.floor(Math.random() * 40));  
//   this.maxValue = Math.max.apply(Math,this.data.map((o)=>{return o;}));
//   this.drawGraph(window.innerWidth-60,this.data)
// },800)


  }

}
