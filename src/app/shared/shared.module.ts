import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessagesService } from '../services/validation-messages.service';
import { BaseClassService } from '../services/base-class.service';
import { AppErrorHandler } from './commonErrors/app-error-handler';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { SharedService } from './shared.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [],
  exports: [CommonModule, ReactiveFormsModule],
  providers: [
    ValidationMessagesService,
    BaseClassService,
    SharedService,
    EmployeeService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ]
})
export class SharedModule {}
