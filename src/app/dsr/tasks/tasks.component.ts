import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITaskList } from '../../interfaces/ITaskList';
import { ValidationMessagesService } from '../../services/validation-messages.service';
import { BaseClassService } from '../../services/base-class.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  taskForm: FormGroup;
  formErrors: any;
  showForm = false;
  showFormButtonText = 'Add New Task';
  APIurl = 'Tasks';
  taskList: ITaskList[];
  pbiList: any;
  issuesList: any;
  userDataObject: ITaskList;

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
    SharedService.emitChange('Task Page!');
    this.formCreateReset();
    this.loadPBIName();
    this.loadIssueName();
    this.listExistingData();

    this.taskForm.valueChanges.subscribe(() => {
      this.logValidationErrors(this.taskForm);
      this.formErrors = this.valMessage.formErrors;
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.showFormButtonText = 'Add New Task';
      if (id) {
        this.getTeam(id);
        this.showFormButtonText = 'Edit Task Details';
      }
      this.userDataObject = {
        id: id === 0 ? null : id,
        taskNumber: 0,
        taskDescription: '',
        pbiId: '',
        issueId: ''
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

  editTeam(data: ITaskList) {
    this.taskForm.patchValue({
      id: data.id,
      taskNumber: data.taskNumber,
      pbiId: data.pbiId,
      issueId: data.issueId,
      taskDescription: data.taskDescription
    });
  }

  submitMethod(): void {
    if (this.taskForm.invalid) {
      this.taskForm = this.valMessage.logErrors(this.taskForm);
      this.formErrors = this.valMessage.formErrors;
    } else {
      this.mapFormValues();
      if (this.userDataObject.id) {
        this.baseService.updateDataFunction(this.APIurl, this.userDataObject)
          .subscribe(
            () => {
              this.router.navigate(['dsr/tasks']);
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
        this.router.navigate(['dsr/tasks']);
      }
    }
  }

  mapFormValues() {
    this.userDataObject.taskNumber = this.taskForm.value.taskNumber;
    this.userDataObject.pbiId = this.taskForm.value.pbiId;
    this.userDataObject.issueId = this.taskForm.value.issueId;
    this.userDataObject.taskDescription = this.taskForm.value.taskDescription;
  }

  editButtonClick(userId: number): void {
    this.showForm = true;
    this.router.navigate(['dsr/tasks', { id: userId, status: this.showForm }]);
  }

  deleteButtonClick(itemId: number): void {
    if (this.baseService.deleteConfirmBox()) {
      this.baseService.deleteDataFunction(this.APIurl, itemId).subscribe(
        () => {
          this.listExistingData();
          this.resetForm();
          this.router.navigate(['/dsr/tasks']);
        }
      );
    }
  }

  listExistingData(): void {
    this.baseService.getData(this.APIurl).subscribe(
      (data: ITaskList[]) => {
        this.taskList = data;
      },
      (err: any) => console.log(err)
    );
  }

  loadPBIName(): void {
    this.baseService.getData('PBI').subscribe(
      (data: any) => {
        this.pbiList = data;
      }
    );
  }

  loadIssueName(): void {
    this.baseService.getData('Issues').subscribe(
      (data: any) => {
        this.issuesList = data;
      }
    );
  }

  formCreateReset(): void {
    this.taskForm = this.fb.group({
      taskNumber: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      taskDescription: ['', [Validators.maxLength(500)]],
      pbiId: [0],
      issueId: [0]
    });
  }

  resetForm(): void {
    this.formErrors = '';
    this.router.navigate(['dsr/tasks']);
    this.formCreateReset();
  }

  logValidationErrors(group: FormGroup = this.taskForm): void {
    this.taskForm = this.valMessage.logControlError(this.taskForm);
    this.formErrors = this.valMessage.formErrors;
  }

  showAddForm(): void {
    this.router.navigate(['dsr/tasks']);
    if (this.showForm) {
      this.showForm = false;
    } else {
      this.showForm = true;
    }
    this.resetForm();
  }
}
