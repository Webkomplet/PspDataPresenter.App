import { PipesModule } from './_core/pipes/pipes.module';
import { StopwatchService } from './_core/services/stopwatch/stopwatch.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageBrokerProcessorService } from './_core/services/message-broker-processor/message-broker-processor.service';
import { FooterModule } from './_layout/footer/footer.module';
import { HeaderModule } from './_layout/header/header.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,

    PipesModule,
    HeaderModule,
    FooterModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [
    StopwatchService,
    MessageBrokerProcessorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
