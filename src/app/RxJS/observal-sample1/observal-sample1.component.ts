import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-observal-sample1',
  templateUrl: './observal-sample1.component.html',
  styleUrls: ['./observal-sample1.component.scss']
})
export class ObservalSample1Component implements OnInit {
  numbers = [2, 5, 6, 10];
  source = Observable.from(this.numbers);
  constructor(private sharedservice: SharedService) { }

  ngOnInit() {
    SharedService.emitChange('Observable Sample 1');
    this.source.subscribe(new MyObserver);
    this.source.subscribe(
      value => {
        console.log('Shortcut method to display observalble string/numbers');
        console.log(value);
      },
      e => { console.log('error'); },
      () => { console.log('complete'); }
    );
  }

}


class MyObserver {
  next(value) {
    console.log(`value: ${value}`);
  }
  error(e) {
    console.log(`error: ${e}`);
  }
  complete() {
    console.log('Completed');
  }
}
