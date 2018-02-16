import { Component,OnInit,AfterViewInit } from '@angular/core';
import { FlowerService } from '../../services/flowerservice';
import { Observable,Observer,Subject } from 'rxjs/Rx';

@Component({
  //selector: 'app-root', (no selector because it is routed)
  providers: [ FlowerService ],
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.css'],
})

export class FlowersComponent implements OnInit,AfterViewInit {  
  title:string;
  constructor(private flowerservice: FlowerService) { this.title = 'First Angular 5 example with joy'; }
  flowers:any[] = [];
  flowersInPage:any[];
  loading:boolean;

  ListenToPaginator = (portion:any[]) => { this.flowersInPage = portion;}

  ngOnInit():void{ this.loading=true;}
  ngAfterViewInit():void {       
    this.flowerservice.getFlowersWithReactiveExtensions().subscribe(
          res => {              
                  res.response.forEach( item => {   
                  item.ImagePath = item.ImagePath.replace(
                  "http://dmm888.com/Images/Flowers/",
                  "https://nodehelperstatic-statichelper.7e14.starter-us-west-2.openshiftapps.com/Flowers/");
                  });
                    
                    this.flowers = res.response;
                    this.loading = false;
                 },
          err => {console.error(err);});
}
}
