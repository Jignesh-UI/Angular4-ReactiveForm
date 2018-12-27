import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BadInput } from '../shared/commonErrors/bad-input';
import { NotFoundError } from '../shared/commonErrors/not-found-error';
import { AppError } from '../shared/commonErrors/app-error';
import { HttpClient, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class BaseClassService {

  Baseurl = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  getData(APIurl: any): any {
    return this.httpClient.get(this.Baseurl + APIurl)
      .pipe(catchError(this.handleError));
  }

  getDataById(APIurl: any, id: number): any {
    return this.httpClient.get(`${this.Baseurl}${APIurl}/${id}`)
      .pipe(catchError(this.handleError));
  }


  postData(APIurl: any, postData: any) {
    const headers = new Headers();
    return this.httpClient.post(this.Baseurl + APIurl, postData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }

  updateDataFunction(APIurl: any, postData: any) {
    return this.httpClient.put(this.Baseurl + APIurl + '/' + postData.id, postData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }

  deleteDataFunction(APIurl: any, postData: any) {
    return this.httpClient.delete(this.Baseurl + APIurl + '/' + postData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }

  deleteConfirmBox(): boolean {
    return confirm('Are you sure you want to remove this Item!!!');
  }

  private handleError(error: Response) {
    if (error.status === 100) {
      return Observable.throw(new BadInput(error.json()));
    }else  if (error.status === 404) {
      return Observable.throw(new NotFoundError(error.json()));
    }
    return Observable.throw(new AppError(error.json()));
  }



}
