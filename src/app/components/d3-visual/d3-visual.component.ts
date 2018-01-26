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

 barColors = ():string => {
  	let x = Math.floor(Math.random() * 256);
       let y = Math.floor(Math.random() * 256);
       let z = Math.floor(Math.random() * 256);
       //let bgColor = "rgb(" + x + "," + y + "," + z + ")";
       return (x && y && z) === 255 ? this.barColors():  "rgb(" + x + "," + y + "," + z + ")"
  }

  ngOnInit() {}
  ngAfterViewInit():void {
	let dt = [600,40,500,120,190,340,900,350,230,700,34];
 	let dv = d3.select(".bar").style("vertical-align","bottom")  
     .selectAll("div")
     .data(dt)
     dv.enter().append("div")         
     .style("display","inline-block")    
     .style("background-color", (d) => {
       return this.barColors()
      }).style("vertical-align","bottom")
       .style("position","relative")
     .style("color","black")
     .style("font-family","verdana")     
     .style("width",(d) => {
     	let barWidth = 100/dt.length;
     	return barWidth + "%";
     })
     .style("border-top-left-radius", "20px")
      .style("border-top-right-radius", "20px")
     .style("font-size","small")
     .style("text-align","center")        
     .style("height", (d)=> {
           var barHeight = d ;
           return barHeight + "px";
         })
     .append("p").text((d)=> { return d; })
     .style("position","absolute")
     .style("width","100%")
     .style("bottom","0")
     .style("left","0")
     .style("right","0")
     .style("margin","0 0 -20px 0 ");
     dv.exit().remove();




  }

}
