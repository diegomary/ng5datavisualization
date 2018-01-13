import { Injectable }  from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable,AjaxResponse} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FlowerService {
  public headers:Headers;

  constructor (private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  getFlowers():any {
    return this.http.get(`https://apimicrobach.azurewebsites.net/flowers`)
    .map((res:Response) => res.json());
  }


  getFlowersWithReactiveExtensions():Observable<AjaxResponse> {
	return Observable    
    .ajax({url:'https://apimicrobach.azurewebsites.net/flowers',responseType: 'json',headers:{},method:'GET',body:{}})
  }
  
}