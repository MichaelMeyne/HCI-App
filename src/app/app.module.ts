import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

import { TabsPage } from '../pages/tabs/tabs';
import { BusesPage } from '../pages/buses/buses';
import { TrainsPage } from '../pages/trains/trains';
import { SettingsPage } from '../pages/settings/settings';
import { BusDetailPage } from '../pages/bus-detail/bus-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TrainServiceProvider } from '../providers/train-service/train-service';
import { BusServiceProvider } from '../providers/bus-service/bus-service';
import { SettingsProvider } from '../providers/settings/settings';

@NgModule({
  //Every Page in the application must be declared in the app.module.ts file
  declarations: [
    MyApp,
    BusesPage,
    TrainsPage,
    SettingsPage,
    TabsPage,
    BusDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BusesPage,
    TrainsPage,
    SettingsPage,
    TabsPage,
    BusDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TrainServiceProvider,
    BusServiceProvider,
    SettingsProvider,
  ]
})
export class AppModule {}
