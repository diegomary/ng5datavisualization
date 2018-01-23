import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FlowersComponent } from './components/flowers/flowers.component';
import { FlowerComponent } from './components/flower/flower.component';

@NgModule({
  declarations: [FlowersComponent, FlowerComponent],
  imports: [BrowserModule,HttpModule,FormsModule],
  providers: [],
  bootstrap: [FlowersComponent]
})
export class AppModule { }
