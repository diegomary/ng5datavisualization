import { Component } from '@angular/core';
import { FlowerService } from './services/flowerservice';
@Component({
  selector: 'app-root',
  providers: [ FlowerService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string;
  constructor(private flowerservice: FlowerService) { this.title = 'First Angular 5 example with joy'; }
  flowers:any[] = [];
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
    };

    firstPage = ():void => {
      this.pageNumber = 1;
      this.flowersInPage = this.getDataPage();
    };

    lastPage = ():void => {
      let remainder:number = this.flowers.length % this.pageSize;
      let pages:number = Math.floor(this.flowers.length / this.pageSize);
      if (remainder > 0) {
        pages++;
      }
      this.pageNumber = pages;
      this.flowersInPage = this.getDataPage();
    };

    prevPage = ():void => {
      if (this.pageNumber == 1) return;
      this.pageNumber -= 1;
      this.flowersInPage = this.getDataPage();
    };


  ngOnInit():void{}    
  ngAfterViewInit():void {this.flowerservice.getFlowers().subscribe(data => { 
  data.forEach( item => {   
  item.ImagePath = item.ImagePath.replace(
            "http://dmm888.com/Images/Flowers/",
            "https://nodehelperstatic-statichelper.7e14.starter-us-west-2.openshiftapps.com/Flowers/"
          );
  });
  this.flowers = data;
  this.flowersInPage = this.getDataPage();
  });}
}
