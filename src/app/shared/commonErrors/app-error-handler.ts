import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  handleError(error) {
    console.log(error.name + ': ' + error.message);
    alert(error.name + ': ' + error.message); // in future we can display toast notification
    console.log(error); // we can log this error on server
  }
}

