import { Component, OnInit, AfterViewInit} from '@angular/core';
import * as d3 from "d3";

const  SCALES = {
  LINEAR : "0", 
  TIME: "1" 
};

@Component({
  selector: 'app-d3-visual',
  templateUrl: './d3-visual.component.html',
  styleUrls: ['./d3-visual.component.css']
})
export class D3VisualComponent implements OnInit, AfterViewInit {

  constructor() {this.maxValue = this.getMaxValue()}
  name:string;
  height:number = 400;
  vis:any={}; 
  data:number[] = [];               
  maxValue:number;
  element:number;
  startDate:Date;
  endDate:Date;
  scaleChoice:string;
  width = window.innerWidth-60;
  axisChoices = {
  'LINEAR':  ()=> {
    let yScale = d3.scaleLinear()
        .domain([0, this.maxValue])
        .range([this.height,0]);
        let xScale = d3.scaleLinear()
        .domain([0,this.data.length])
        .range([0, this.width]);   
        let xAxis = d3.axisBottom(xScale).ticks(this.data.length);
        this.vis.append("g")        
        .attr("transform", "translate(0," + (this.height) + ")")
        .call(xAxis);
        let yAxis = d3.axisLeft(yScale);    
        this.vis.append("g").call(yAxis);
  },
  'TIME':  ()=> {
     let yScale = d3.scaleLinear()
        .domain([0, this.maxValue])
        .range([this.height,0]);
        this.endDate = new Date(this.startDate);
        this.endDate.setDate(this.endDate.getDate() + this.data.length);
        let xScale = d3.scaleTime()
        .domain([this.startDate,this.endDate])
        .range([0, this.width]);
        let xAxis = d3.axisBottom(xScale).ticks(this.data.length).tickFormat(d3.timeFormat("%d-%m-%Y"));
        this.vis.append("g")        
        .attr("transform", "translate(0," + (this.height) + ")")
        .call(xAxis).selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");
        let yAxis = d3.axisLeft(yScale);    
        this.vis.append("g").call(yAxis);
  }
};


  getMaxValue = ():number => {
    return Math.max.apply(Math,this.data.map((o)=>{return o;}));
  }

  addElement = ():void => {   
    this.data.push(this.element);  
    this.maxValue = this.getMaxValue();
    this.width = window.innerWidth-60;
    this.drawGraph(this.width);
    this.element=null;    
  }
 
 clearGraph = ():void => {
   this.data = [];
   this.maxValue = this.getMaxValue();
   this.width = window.innerWidth-60;
   this.drawGraph(this.width);
   this.startDate=null;
   this.endDate=null;
 }

 barColors = ():any => {
  	let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);      
    return (x && y && z === 255) ? this.barColors(): {r:x,g:y,b:z};
  }
  resizeHisto= (event):void => {    
    this.width = event.target.innerWidth-60;
    this.drawGraph(this.width);   
  }  

  drawGraph = (size):void => {
    let width = size;    
    d3.select(".bar").html("");   
    this.vis = d3.select(".bar")                     
      .append("svg:svg")
      .attr("width", width)
      .attr("height", this.height)                
      .style("padding", "30px 30px 70px 30px");
    let choice = this.scaleChoice === SCALES.LINEAR ? 'LINEAR':'TIME';
    this.axisChoices[choice]();
    let minigroup =  this.vis.append("g")
    .selectAll("g")
    .data(this.data).enter().append("g");
    minigroup.append("rect")
    .attr("width",width/this.data.length)
    .attr("height", (d) => { return (d *400/this.maxValue);})    
    .attr("transform", (d)=> { return "translate(0," + (this.height - (d*400/this.maxValue)) + ")";})
    .attr("x", (d,i) => { let xPos = i * (width/this.data.length); return xPos; });
    minigroup.append("text").text(d=>d)   
    .attr("transform", (d)=> { return "translate(0," + ((this.height - (d*400/this.maxValue))+(d*400/this.maxValue/2)) + ") rotate(0)";})
    .attr("font-size","small")   
    .attr("x", (d,i) => {let xPos = ((i*width/this.data.length)+(width/this.data.length/2)-8); return xPos;});
      //minigroup.selectAll("g:nth-child(2n) > rect").style("fill","steelblue");
      //minigroup.selectAll("g:nth-child(2n+1) > rect").style("fill","cornflowerblue");
      //minigroup.selectAll("g> text").style("fill","white");
   for(let counter = 0; counter < this.data.length;counter++)
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
    this.drawGraph(this.width);
 // d3.json('http://api.reddit.com/', (error, data:any) => {this.drawGraph(window.innerWidth-60);});
  }

}
