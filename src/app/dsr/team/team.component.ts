import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { BaseClassService } from '../../services/base-class.service';
import { IUserTeam } from '../../interfaces/IUserTeam';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationMessagesService } from '../../services/validation-messages.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  teamForm: FormGroup;
  formErrors: any;
  showForm = false;
  showFormButtonText = 'Add New Team';
  APIurl = 'team';
  teamList: IUserTeam[];
  teamDataObject: IUserTeam;

  constructor(
    private baseService: BaseClassService,
    private valMessage: ValidationMessagesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formErrors = valMessage.formErrors;
  }

  ngOnInit() {
    SharedService.emitChange('Team Details!');
    this.formCreateReset();
    this.listExistinData();

    this.teamForm.valueChanges.subscribe(() => {
      this.logValidationErrors(this.teamForm);
      this.formErrors = this.valMessage.formErrors;
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.showFormButtonText = 'Add New Team';
      if (id) {
        this.getTeam(id);
        this.showFormButtonText = 'Edit Team Details';
      }
      this.teamDataObject = {
        id: id === 0 ? null : id,
        teamName: '',
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

  editTeam(data: IUserTeam) {
    this.teamForm.patchValue({
      id: data.id,
      teamName: data.teamName,
      comments: data.comments
    });
  }

  submitMethod(): void {
    if (this.teamForm.invalid) {
      this.teamForm = this.valMessage.logErrors(this.teamForm);
      this.formErrors = this.valMessage.formErrors;
    } else {
      this.mapFormValues();
      if (this.teamDataObject.id) {
        this.baseService
          .updateDataFunction(this.APIurl, this.teamDataObject)
          .subscribe(
            () => {
              this.router.navigate(['dsr/team']);
              this.listExistinData();
              this.resetForm();
            },
            (err: any) => console.log(err)
          );
      } else {
        this.baseService.postData(this.APIurl, this.teamDataObject).subscribe(
          () => {
            console.log('data Saved');
            this.listExistinData();
            this.resetForm();
          },
          (err: any) => console.log(err)
        );
        this.router.navigate(['dsr/team']);
      }
    }
  }

  mapFormValues() {
    this.teamDataObject.teamName = this.teamForm.value.teamName;
    this.teamDataObject.comments = this.teamForm.value.comments;
  }

  editButtonClick(itemId: number): void {
    this.showForm = true;
    this.router.navigate(['dsr/team', { id: itemId, status: this.showForm }]);
  }

  deleteButtonClick(itemId: number): void {
    if (this.baseService.deleteConfirmBox()) {
      this.baseService.deleteDataFunction(this.APIurl, itemId).subscribe(
        () => {
          this.listExistinData();
          this.resetForm();
          this.router.navigate(['/dsr/team']);
        },
        (err: any) => console.log(err)
      );
    }
  }

  listExistinData(): void {
    this.baseService
      .getData(this.APIurl)
      .subscribe(
        (listTeams: IUserTeam[]) => (this.teamList = listTeams),
        (err: any) => console.log(err)
      );
  }

  formCreateReset(): void {
    this.teamForm = this.fb.group({
      teamName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comments: ['', [Validators.maxLength(500)]]
    });
  }

  resetForm(): void {
    this.formErrors = '';
    this.router.navigate(['dsr/team']);
    this.formCreateReset();
  }

  logValidationErrors(group: FormGroup = this.teamForm): void {
    this.teamForm = this.valMessage.logControlError(this.teamForm);
    this.formErrors = this.valMessage.formErrors;
  }

  showAddForm(): void {
    this.router.navigate(['dsr/team']);
    if (this.showForm) {
      this.showForm = false;
    } else {
      this.showForm = true;
    }
    this.resetForm();
  }
}
