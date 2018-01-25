import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-route',
  template: `
   <nav class="hidden">
      <a routerLink="/component-one">Component One</a>
      <a routerLink="/component-two">Component Two</a>
    </nav>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
