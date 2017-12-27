import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsProvider } from './../../providers/settings/settings';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  selectedTheme: String;
  
   constructor(public navCtrl: NavController, private settings: SettingsProvider) {
     this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
   }
  
     toggleAppTheme() {
     if (this.selectedTheme === 'dark-theme') {
       this.settings.setActiveTheme('light-theme');
     } else {
       this.settings.setActiveTheme('dark-theme');
     }
   }

}
