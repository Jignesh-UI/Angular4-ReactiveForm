import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormArray } from '@angular/forms';

@Injectable()
export class ValidationMessagesService {
  validationMessages = {
    userName: {
      required: 'First name is required.',
      minlength: 'Minimum 2 characters are required.',
      maxlength: 'Maximum 25 characters are allowed.'
    },
    password: {
      required: 'Last name is required.',
      minlength: 'Minimum 2 characters are required.',
      maxlength: 'Maximum 12 characters are allowed.'
    },
    confirmPassword: {
      required: 'Confirm Password is Required.',
      minlength: 'Minimum 2 characters are required.',
    },
    loginDetails: {
      'confirmPassword': 'Confirm Password and Password is not matched.'
    },
    firstName: {
      required: 'First name is required.',
      minlength: 'Minimum 2 characters are required.'
    },
    lastName: {
      required: 'Last name is required.',
      minlength: 'Minimum 2 characters are required.'
    },
    skillName: {
      required: 'Skill is required.'
    },
    experienceInYears: {
      required: 'Skill is required.'
    },
    proficiency: {
      required: 'Skill is required.'
    },
    mobileNo: {
      required: 'Mobile Number is required.'
    },
    email: {
      required: 'Email is required.',
      emailDomain: 'Email domain should be Gmail.com'
    },
    website: {
      webDomain: 'Domain should end with .com, .co.in, .eu'
    },
    address: {
      required: 'Address is required.'
    },
    streetAddress: {
      required: 'Street Address is required.'
    },
    city: {
      required: 'City is required.'
    },
    state: {
      required: 'State is required.'
    },
    pinCode: {
      required: 'Pin Code is required.'
    },
    teamName: {
      required: 'Team name is required.',
      minlength: 'Minimum 2 characters are required.',
      maxlength: 'Maximum 12 characters are allowed.'
    },
    comments: {
      required: 'Comments are required.',
      minlength: 'Minimum 2 characters are required.',
      maxlength: 'Maximum 500 characters are allowed.'
    },
  };

  formErrors = {
    userName: '',
    password: '',
    loginDetails: '',
    firstName: '',
    lastName: '',
    skillName: '',
    experienceInYears: '',
    proficiency: '',
    mobileNo: '',
    email: '',
    website: '',
    address: '',
    streetAddress: '',
    city: '',
    state: '',
    pinCode: '',
    teamName: '',
    comments: ''
  };

  constructor() {}

  clearFormErrors(form, validateMessageService): void {
    Object.keys(form.controls).forEach((key: string) => {
      const abstractControl = form.get(key);
      if (abstractControl instanceof FormGroup) {
        this.clearFormErrors(abstractControl, validateMessageService);
      } else {
        validateMessageService.formErrors[key] = '';
        abstractControl.reset();
      }
    });
  }

  logErrors(group: FormGroup): any {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        }

      if (abstractControl instanceof FormGroup) {
        this.logErrors(abstractControl);
      }

      if (abstractControl instanceof FormArray) {
        for (const ctrl of abstractControl.controls) {
          if (ctrl instanceof FormGroup) {
            this.logErrors(ctrl);
          }
        }
      }
    });

    return group;
  }

  logControlError(group: FormGroup): any {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';

      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')
      ) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + '';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logControlError(abstractControl);
      }

      if (abstractControl instanceof FormArray) {
        for (const ctrl of abstractControl.controls) {
          if (ctrl instanceof FormGroup) {
            this.logControlError(ctrl);
          }
        }
      }

    });
    return group;
  }
}
