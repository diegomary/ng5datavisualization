import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  	constructor(private route:ActivatedRoute) {}
  	name:string;
	
  	ngOnInit() {
  	this.route.queryParams.subscribe(params => {this.name= params.name});	
	}
 }


