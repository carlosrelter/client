import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatGridListModule, LayoutModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  cols:number = 3;
  hom:number = 2;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 768px)'])
      .subscribe(result => {
        this.cols = result.matches ? 1 : 3;
        this.hom = result.matches ? 1 : 2;
      });
  }

}
