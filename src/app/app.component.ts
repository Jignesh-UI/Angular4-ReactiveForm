import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SharedService } from './shared/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'parent page';

  constructor(private router: Router, private sharedservice: SharedService) {
  }

  ngOnInit() {
    this.sharedservice.changeEmitted$.subscribe(text => {
      this.title = text;
    });
  }

}
