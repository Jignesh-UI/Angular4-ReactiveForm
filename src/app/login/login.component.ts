import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationMessagesService } from '../services/validation-messages.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  formErrors;

  constructor(private messageService: ValidationMessagesService) {
    this.formErrors = messageService.formErrors;
  }

  ngOnInit() {
    SharedService.emitChange('Authentication!');
    this.formCreateReset();

    this.loginForm.valueChanges.subscribe((data) => {
      this.messageService.logControlError(this.loginForm);
      this.formErrors = this.messageService.formErrors;

    });
  }

  logValidationErrors(group: FormGroup = this.loginForm): void {
    this.loginForm =  this.messageService.logErrors(this.loginForm);
    this.formErrors = this.messageService.formErrors;
  }

  onLoadDataClick(): void {
    this.formErrors = '';
    this.formCreateReset();
  }

  submitMethod(): void {
    if (this.loginForm.invalid) {
      this.loginForm = this.messageService.logErrors(this.loginForm);
      this.formErrors = this.messageService.formErrors;
      console.log(this.formErrors);
    }
  }

  formCreateReset(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]),
      password: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(12)  ])
    });
  }

}
