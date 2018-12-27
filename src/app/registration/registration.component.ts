import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';

import { ValidationMessagesService } from '../services/validation-messages.service';
import { CustomValidators } from '../shared/custom-validators';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  formErrors;
  example = { email: '', userName: '' };


  constructor(
    private valMessage: ValidationMessagesService,
    private fb: FormBuilder
  ) {
    this.formErrors = valMessage.formErrors;
  }

  ngOnInit() {
    SharedService.emitChange('Fill your personal details.');
    this.createResetForm();
    this.registrationForm.valueChanges.subscribe(data => {
      this.logValidationErrors(this.registrationForm);
      this.formErrors = this.valMessage.formErrors;
    });
  }

  logValidationErrors(group: FormGroup = this.registrationForm): void {
    this.registrationForm = this.valMessage.logControlError(
      this.registrationForm
    );
    this.formErrors = this.valMessage.formErrors;
  }

  resetForm(): void {
    this.formErrors = '';
    this.createResetForm();
  }

  submitMethod(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm = this.valMessage.logErrors(this.registrationForm);
      this.formErrors = this.valMessage.formErrors;
    } else {
      console.log(this.registrationForm.controls);
    }
  }

  createResetForm(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      skills: this.fb.array([
        this.skillsControls()
      ]),
      contactDetails: this.fb.array([
        this.contactDetailsControls()
      ]),
      addressDetails: this.fb.array([
        this.addressDetailsControls()
      ]),
      userName: ['', [Validators.required, Validators.minLength(2)]],
      loginDetails: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(2)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(2)]]
        },
        { validator: CustomValidators.matchPassword }
      )
    });
  }

  addNewSkillsControls(): void {
    (<FormArray>this.registrationForm.get('skills')).push(this.skillsControls());
  }

  skillsControls(): FormGroup {
    return this.fb.group({
      skillName: ['', [Validators.required]],
      experienceInYears: [],
      proficiency: ['', [Validators.required]]
    });
  }

  contactDetailsControls(): FormGroup {
    return this.fb.group({
      mobileNo: ['', [Validators.required]],
      phoneNo: [],
      email: ['', [Validators.required, CustomValidators.validateEmail]],
      website: ['', [CustomValidators.validateDomain]]
    });
  }

  addressDetailsControls(): FormGroup {
    return this.fb.group({
      address: ['', [ Validators.required ]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
      country: []
    });
  }

  defaultUserName(event): void {
    this.registrationForm.get('userName').setValue(event.target.value);
  }
}
