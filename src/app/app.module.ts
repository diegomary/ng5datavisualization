import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FlowersComponent } from './components/flowerscomponent/flowers.component';

@NgModule({
  declarations: [ FlowersComponent ],
  imports: [BrowserModule,HttpModule],
  providers: [],
  bootstrap: [FlowersComponent]
})
export class AppModule { }
