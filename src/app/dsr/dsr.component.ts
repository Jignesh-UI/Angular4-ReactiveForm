import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-dsr',
  templateUrl: './dsr.component.html',
  styleUrls: ['./dsr.component.scss']
})
export class DsrComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    SharedService.emitChange('Daily Status Landing Page!');
  }

}
