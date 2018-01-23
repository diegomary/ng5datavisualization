import { Component,OnInit,AfterViewInit } from '@angular/core';
import { FlowerService } from '../../services/flowerservice';
import { Observable,Observer,Subject } from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  providers: [ FlowerService ],
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.css'],
})
export class FlowersComponent implements OnInit,AfterViewInit {
  parentComponentVariable = "This is the value injected from parent to child";
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



  ngAfterViewInit():void {

  //  this.flowerservice.getFlowers().subscribe(data => { 
  // data.forEach( item => {   
  // item.ImagePath = item.ImagePath.replace(
  //           "http://dmm888.com/Images/Flowers/",
  //           "https://nodehelperstatic-statichelper.7e14.starter-us-west-2.openshiftapps.com/Flowers/"
  //         );
  // });
  // this.flowers = data;
  // this.flowersInPage = this.getDataPage();
  // });


    // const button = document.querySelector('.test');
    // const output = document.querySelector('output'); 
    // Observable.fromEvent(button, 'click')
    // .bufferCount(3) // after 3 press ideal to check if not a
    // .subscribe({
    //   next: event => { output.textContent = Math.random().toString(36).slice(2) },
    //   error: err => console.log(`Oops... ${err}`),
    //   complete: () => console.log(`Complete!`),
    // });




// const second$ = Observable.interval(1000).take(flowers.length);
// const response$ = Observable
// .fromPromise(
//  fetch('https://apimicrobach.azurewebsites.net/flower/?flowerName='+ encodeURIComponent(flower.Name)).then(response => response.json())
// )

// second$
// .flatMap(x => response$)
// .subscribe(data => console.log('data is', data)) 


//*********************************************************************************
// const flowers:any = Observable.fromPromise(fetch('https://apimicrobach.azurewebsites.net/flowers').then(response => response.json()))
// .subscribe(
//    (flowers:any[]) => {
//    const items = Observable.interval(1000).take(flowers.length)
//    .subscribe((x) => {console.log('___________',x);
//       fetch('https://apimicrobach.azurewebsites.net/flower/?flowerName='+ encodeURIComponent(flowers[x].Name))
//      .then(response => {return response.json()}).then(json => {console.log(json);});})      
//     },
//      (err) => {console.log('Error: ' + err);},
//      () => { console.log('Completed'); });
//*********************************************************************************


this.flowerservice.getFlowersWithReactiveExtensions().subscribe(
      res => {              
              res.response.forEach( item => {   
              item.ImagePath = item.ImagePath.replace(
              "http://dmm888.com/Images/Flowers/",
              "https://nodehelperstatic-statichelper.7e14.starter-us-west-2.openshiftapps.com/Flowers/");
              });
              this.flowers = res.response;
              this.flowersInPage = this.getDataPage();
             },
      err => {console.error(err);});
}
}
