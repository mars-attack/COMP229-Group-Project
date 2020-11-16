import {
  FlashMessagesModule,
  FlashMessagesService
} from 'angular2-flash-messages';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SurveyLibraryModule } from './survey-library/survey-library.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SurveyLibraryModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
