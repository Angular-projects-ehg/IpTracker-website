import { Routes } from '@angular/router';
import { AboutComponent } from './about/components/about/about.component';
import { MainpageComponent } from './iptracker/pages/mainpage/mainpage.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainpageComponent },
  { path: 'about', component: AboutComponent },
];
