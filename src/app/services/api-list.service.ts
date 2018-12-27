import { Injectable } from '@angular/core';
import { BaseClassService } from './base-class.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiListService  {
// extends BaseClassService
  constructor(httpClient: HttpClient) {
    // super('http://localhost:3000/', httpClient);
   }

}
