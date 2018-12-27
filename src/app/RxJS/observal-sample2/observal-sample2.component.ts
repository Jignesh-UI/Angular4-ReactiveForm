import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-observal-sample2',
  templateUrl: './observal-sample2.component.html',
  styleUrls: ['./observal-sample2.component.scss']
})
export class ObservalSample2Component implements OnInit {

  numbers = [2, 3, 4];
  source = Observable.create(observer => {
    for (const n of this.numbers) {
      if (n === 3) {
        observer.error('Something went wrong!!!');
      }
      observer.next(n);
    }
    observer.complete();
  });

  constructor(private sharedservice: SharedService) { }

  ngOnInit() {
    SharedService.emitChange('Observable Sample 2');
    this.source.subscribe(
      value => console.log(`value: ${value}`),
      e => console.log(`error: ${e}`),
      () => console.log(`Completed`)
    );
  }

}
