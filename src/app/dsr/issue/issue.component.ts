import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseClassService } from '../../services/base-class.service';
import { ValidationMessagesService } from '../../services/validation-messages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IIssuesList } from '../../interfaces/IIssuesList';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  issueForm: FormGroup;
  formErrors: any;
  showForm = false;
  showFormButtonText = 'Add New Issues';
  APIurl = 'Issues';
  issueList: IIssuesList[];
  issueDataObject: IIssuesList;


  constructor(    private baseService: BaseClassService,
    private valMessage: ValidationMessagesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formErrors = valMessage.formErrors;
 }

  ngOnInit() {
    SharedService.emitChange('Issue Details!');
    this.formCreateReset();
    this.listExistinData();

    this.issueForm.valueChanges.subscribe(() => {
      this.logValidationErrors(this.issueForm);
      this.formErrors = this.valMessage.formErrors;
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.showFormButtonText = 'Add New Issue';
      if (id) {
        this.getIssueById(id);
        this.showFormButtonText = 'Edit Issue Details';
      }
      this.issueDataObject = {
        id: id === 0 ? null : id,
        issueNumber: null,
        issueDescription: ''
      };
    });
  }

  getIssueById(id: number): void {
    this.baseService.getDataById(this.APIurl, id).subscribe(
      (data: any) => {
        this.assignIssueValueforEdit(data);
      },
      (err: any) => console.log(err)
    );
  }

  assignIssueValueforEdit(data: IIssuesList) {
    this.issueForm.patchValue({
      id: data.id,
      issueNumber: data.issueNumber,
      issueDescription: data.issueDescription
    });
  }

  submitMethod(): void {
    if (this.issueForm.invalid) {
      this.issueForm = this.valMessage.logErrors(this.issueForm);
      this.formErrors = this.valMessage.formErrors;
    } else {
      this.mapFormValues();
      if (this.issueDataObject.id) {
        this.baseService
          .updateDataFunction(this.APIurl, this.issueDataObject)
          .subscribe(
            () => {
              this.router.navigate(['dsr/issue']);
              this.listExistinData();
              this.resetForm();
            },
            (err: any) => console.log(err)
          );
      } else {
        this.baseService.postData(this.APIurl, this.issueDataObject).subscribe(
          () => {
            console.log('data Saved');
            this.listExistinData();
            this.resetForm();
          },
          (err: any) => console.log(err)
        );
        this.router.navigate(['dsr/issue']);
      }
    }
  }

  mapFormValues() {
    this.issueDataObject.issueNumber = this.issueForm.value.issueNumber;
    this.issueDataObject.issueDescription = this.issueForm.value.issueDescription;
  }

  editButtonClick(itemId: number): void {
    this.showForm = true;
    this.router.navigate(['dsr/issue', { id: itemId, status: this.showForm }]);
  }

  deleteButtonClick(itemId: number): void {
    if (this.baseService.deleteConfirmBox()) {
      this.baseService.deleteDataFunction(this.APIurl, itemId).subscribe(
        () => {
          this.listExistinData();
          this.resetForm();
          this.router.navigate(['dsr/issue']);
        },
        (err: any) => console.log(err)
      );
    }
  }

  listExistinData(): void {
    this.baseService
      .getData(this.APIurl)
      .subscribe(
        (listIssuess: IIssuesList[]) => (this.issueList = listIssuess),
        (err: any) => console.log(err)
      );
  }

  formCreateReset(): void {
    this.issueForm = this.fb.group({
      issueNumber: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      issueDescription: ['', [Validators.maxLength(500)]]
    });
  }

  resetForm(): void {
    this.formErrors = '';
    this.router.navigate(['dsr/issue']);
    this.formCreateReset();
  }

  logValidationErrors(group: FormGroup = this.issueForm): void {
    this.issueForm = this.valMessage.logControlError(this.issueForm);
    this.formErrors = this.valMessage.formErrors;
  }

  showAddForm(): void {
    this.router.navigate(['dsr/issue']);
    if (this.showForm) {
      this.showForm = false;
    } else {
      this.showForm = true;
    }
    this.resetForm();
  }

}
