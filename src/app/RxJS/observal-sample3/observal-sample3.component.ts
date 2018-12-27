import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-observal-sample3',
  templateUrl: './observal-sample3.component.html',
  styleUrls: ['./observal-sample3.component.scss']
})
export class ObservalSample3Component implements OnInit {

  numbers = [2, 3, 4];
  source = Observable.create(observer => {
    let index = 0;
    const produceValue = () => {
      observer.next(this.numbers[index++]);
      if (index < this.numbers.length) {
        setTimeout(produceValue, 2000);
      } else {
        observer.complete();
      }
    };
    produceValue();
  });

  constructor(private sharedservice: SharedService) { }

  ngOnInit() {
    SharedService.emitChange('Observable Sample 3');
    this.source.subscribe(
      value => console.log(`value: ${value}`),
      e => console.log(`error: ${e}`),
      () => console.log(`Completed`)
    );
  }
}
