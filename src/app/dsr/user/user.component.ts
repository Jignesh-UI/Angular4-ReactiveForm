import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationMessagesService } from '../../services/validation-messages.service';
import { BaseClassService } from '../../services/base-class.service';
import { IUserList } from '../../interfaces/IUserList';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  formErrors: any;
  showForm = false;
  showFormButtonText = 'Add New User';
  APIurl = 'user';
  userList: IUserList[];
  teamName: any;
  userDataObject: IUserList;

  constructor(
    private fb: FormBuilder,
    private valMessage: ValidationMessagesService,
    private baseService: BaseClassService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formErrors = valMessage.formErrors;
  }

  ngOnInit() {
    SharedService.emitChange('Users Page!');
    this.formCreateReset();
    this.loadTeamName();
    this.listExistingData();

    this.userForm.valueChanges.subscribe(() => {
      this.logValidationErrors(this.userForm);
      this.formErrors = this.valMessage.formErrors;
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.showFormButtonText = 'Add New User';
      if (id) {
        this.getTeam(id);
        this.showFormButtonText = 'Edit User Details';
      }
      this.userDataObject = {
        id: id === 0 ? null : id,
        userName: '',
        teamId: '',
        comments: ''
      };
    });

  }

  getTeam(id: number): void {
    this.baseService.getDataById(this.APIurl, id).subscribe(
      (data: any) => {
        this.editTeam(data);
      },
      (err: any) => console.log(err)
    );
  }

  editTeam(data: IUserList) {
    this.userForm.patchValue({
      id: data.id,
      userName: data.userName,
      teamId: data.teamId,
      comments: data.comments
    });
  }

  submitMethod(): void {
    if (this.userForm.invalid) {
      this.userForm = this.valMessage.logErrors(this.userForm);
      this.formErrors = this.valMessage.formErrors;
    } else {
      this.mapFormValues();
      if (this.userDataObject.id) {
        this.baseService.updateDataFunction(this.APIurl, this.userDataObject)
          .subscribe(
            () => {
              this.router.navigate(['dsr/user']);
              this.listExistingData();
              this.resetForm();
            },
            (err: any) => console.log(err)
          );
      } else {
        this.baseService.postData(this.APIurl, this.userDataObject).subscribe(
          () => {
            console.log('data Saved');
            this.resetForm();
            this.listExistingData();
          },
          (err: any) => console.log(err)
        );
        this.router.navigate(['dsr/user']);
      }
    }
  }

  mapFormValues() {
    this.userDataObject.userName = this.userForm.value.userName;
    this.userDataObject.teamId = this.userForm.value.teamId;
    this.userDataObject.comments = this.userForm.value.comments;
  }

  editButtonClick(userId: number): void {
    this.showForm = true;
    this.router.navigate(['dsr/user', { id: userId, status: this.showForm }]);
  }

  deleteButtonClick(itemId: number): void {
    if (this.baseService.deleteConfirmBox()) {
      this.baseService.deleteDataFunction(this.APIurl, itemId).subscribe(
        () => {
          this.listExistingData();
          this.resetForm();
          this.router.navigate(['/dsr/user']);
        },
        (err: any) => console.log(err)
      );
    }
  }

  listExistingData(): void {
    this.baseService.getData(this.APIurl).subscribe(
      (data: IUserList[]) => {
        this.userList = data;
      },
      (err: any) => console.log(err)
    );
  }

  loadTeamName(): void {
    this.baseService.getData('team').subscribe(
      (data: any) => {
        this.teamName = data;
      },
      (err: any) => console.log(err)
    );
  }

  formCreateReset(): void {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      teamId: [0, [Validators.required]],
      comments: ['', [Validators.maxLength(500)]]
    });
  }

  resetForm(): void {
    this.formErrors = '';
    this.router.navigate(['dsr/user']);
    this.formCreateReset();
  }

  logValidationErrors(group: FormGroup = this.userForm): void {
    this.userForm = this.valMessage.logControlError(this.userForm);
    this.formErrors = this.valMessage.formErrors;
  }

  showAddForm(): void {
    this.router.navigate(['dsr/user']);
    if (this.showForm) {
      this.showForm = false;
    } else {
      this.showForm = true;
    }
    this.resetForm();
  }

}
