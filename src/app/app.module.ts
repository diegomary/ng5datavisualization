import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FlowersComponent } from './components/flowers/flowers.component';
import { FlowerComponent } from './components/flower/flower.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { RouterModule,Routes } from '@angular/router';
import { RouteComponent } from './components/route/route.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: FlowersComponent },
  { path: 'home1', component: FlowersComponent },
  { path: 'home2', component: FlowersComponent }
];

@NgModule({
  declarations: [
  FlowersComponent,
  FlowerComponent,
  PaginatorComponent,
  RouteComponent
  ],
  imports: [BrowserModule,HttpModule,FormsModule,RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [RouteComponent]
})
export class AppModule { }
