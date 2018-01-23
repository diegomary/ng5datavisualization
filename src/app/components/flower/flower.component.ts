import { Component, OnInit,AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-flower',
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.css']
})
export class FlowerComponent implements OnInit,AfterViewInit {
  @Input() flower: any;
  constructor() {}
  ngOnInit() {}
  ngAfterViewInit():void {}
}
