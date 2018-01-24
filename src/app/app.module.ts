import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FlowersComponent } from './components/flowers/flowers.component';
import { FlowerComponent } from './components/flower/flower.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [FlowersComponent, FlowerComponent, PaginatorComponent],
  imports: [BrowserModule,HttpModule,FormsModule],
  providers: [],
  bootstrap: [FlowersComponent]
})
export class AppModule { }
