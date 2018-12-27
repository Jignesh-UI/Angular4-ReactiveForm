import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-observal-sample4',
  templateUrl: './observal-sample4.component.html',
  styleUrls: ['./observal-sample4.component.scss']
})
export class ObservalSample4Component implements OnInit, OnDestroy {

  source = Observable.fromEvent(document, 'mousemove')
    .map((e: MouseEvent) => {
      return {
        x: e.clientX,
        y: e.clientY
      };
    })
    .filter(value => value.x < 500)
    .delay(300);

  constructor(private sharedservice: SharedService) {
  }

  ngOnInit() {
    SharedService.emitChange('Observable Sample 4');

    this.source.subscribe(
      this.onNext,
      e => console.log(`error: ${e}`),
      () => {
        console.log('completed');
      }
    );
  }

  ngOnDestroy() {
  }

  onNext(value) {
    console.log(value.x);
    console.log(value.y);
  }
}
