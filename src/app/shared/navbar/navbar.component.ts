import { Component } from '@angular/core';

import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar, MatToolbarRow],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
