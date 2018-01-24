import { Component, OnInit,AfterViewInit,Input,OnChanges,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit,AfterViewInit, OnChanges{
  @Input()
  flowers:any[] =[];
  @Output() FlowersChunk:EventEmitter<any[]> = new EventEmitter();
  constructor() {}
  
  pageSize:number = 5;
  pageNumber:number = 1;   
  flowersInPage:any[] = [];

  getDataPage = ():any[] => {
      return this.flowers.slice(
        (this.pageNumber - 1) * this.pageSize,
        this.pageSize * this.pageNumber
      );
    };  

     nextPage = ():void => {
      let remainder:number = this.flowers.length % this.pageSize;
      let pages:number = Math.floor(this.flowers.length / this.pageSize);
      if (remainder > 0) {
        pages++;
      }
      if (this.pageNumber === pages) {return;}
      this.pageNumber += 1;
      this.flowersInPage = this.getDataPage();
      this.FlowersChunk.emit(this.flowersInPage); 
    };

    firstPage = ():void => {
      this.pageNumber = 1;
      this.flowersInPage = this.getDataPage();
      this.FlowersChunk.emit(this.flowersInPage); 
    };

    lastPage = ():void => {
      let remainder:number = this.flowers.length % this.pageSize;
      let pages:number = Math.floor(this.flowers.length / this.pageSize);
      if (remainder > 0) {
        pages++;
      }
      this.pageNumber = pages;
      this.flowersInPage = this.getDataPage();
      this.FlowersChunk.emit(this.flowersInPage); 
    };

    prevPage = ():void => {
      if (this.pageNumber == 1) return;
      this.pageNumber -= 1;
      this.flowersInPage = this.getDataPage();
      this.FlowersChunk.emit(this.flowersInPage);
     
    };

  ngOnInit() {}
  ngAfterViewInit():void {}

  ngOnChanges(changes:any) {
   this.flowersInPage = this.getDataPage();
   this.FlowersChunk.emit(this.flowersInPage); 
   
  }


}
