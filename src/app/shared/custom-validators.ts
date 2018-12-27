import { AbstractControl } from '@angular/forms';

export class CustomValidators {

  static validateEmail(control: AbstractControl): { [key: string]: any } | null {
    const email: string = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1);
    if (email === '' || domain.toLowerCase() === 'gmail.com') {
      return null;
    } else {
      return { emailDomain: true };
    }
  }

  static validateDomain(control: AbstractControl): { [key: string]: any } | null {
    const domainControl: string = control.value;
    const domain = domainControl.substring(domainControl.lastIndexOf('.') + 1);
    if (domainControl === '' || domain.toLowerCase() === 'com' || domain.toLowerCase() === 'in' || domain.toLowerCase() === 'eu') {
      return null;
    } else {
      return { webDomain: true };
    }
  }

  static validateEmailFixedDomain(domainName: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value;
      const domain = email.substring(email.lastIndexOf('@') + 1);
      if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
        return null;
      } else {
        return { emailDomain: true };
      }
    };
  }

  static matchPassword(group: AbstractControl): { [key: string]: any } | null {
    const passControl = group.get('password');
    const confirmPassControl = group.get('confirmPassword');
    if (!passControl || !confirmPassControl) {
      return null;
    }
    if (passControl.value === confirmPassControl.value
      || (confirmPassControl.pristine && confirmPassControl.value === '')) {
      return null;
    } else {
      return { 'confirmPassword': true };
    }
  }

}
