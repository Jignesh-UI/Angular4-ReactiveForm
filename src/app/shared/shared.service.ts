import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {

  private static emitPageTitleChange = new Subject<any>();
  changeEmitted$ = SharedService.emitPageTitleChange.asObservable();

  static emitChange(changes: any) {
    this.emitPageTitleChange.next(changes);
  }

  constructor() { }

}
