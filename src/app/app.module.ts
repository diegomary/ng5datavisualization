import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FlowersComponent } from './components/flowers/flowers.component';
import { FlowerComponent } from './components/flower/flower.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { RouterModule,Routes } from '@angular/router';
import { RouteComponent } from './components/route/route.component';
import { D3VisualComponent } from './components/d3-visual/d3-visual.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: FlowersComponent },
  { path: 'd3visual', component: D3VisualComponent },
  { path: 'piechart', component: PieChartComponent },
  
];

@NgModule({
  declarations: [
  FlowersComponent,
  FlowerComponent,
  PaginatorComponent,
  RouteComponent,
  D3VisualComponent,
  PieChartComponent
  ],
  imports: [BrowserModule,HttpModule,FormsModule,RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [RouteComponent]
})
export class AppModule { }
