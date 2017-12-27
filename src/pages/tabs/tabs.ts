import { Component } from '@angular/core';

import { BusesPage } from '../buses/buses';
import { TrainsPage } from '../trains/trains';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BusesPage;
  tab2Root = TrainsPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
