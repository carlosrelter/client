import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule,
    MatListModule, RouterLink, RouterLinkActive, MatMenuModule, CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public isSmallScreen =false;

  constructor(private breakpointObserver: BreakpointObserver){}

  ngAfterContentInit():void {
    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe(
      (res) => this.isSmallScreen =res.matches

    );
  }

  get sidenavMode(){
    return this.isSmallScreen ? 'over':'side';
  }

}
