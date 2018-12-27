import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseClassService } from '../../services/base-class.service';
import { ValidationMessagesService } from '../../services/validation-messages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IPBIList } from '../../interfaces/IPBIList';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-pbi',
  templateUrl: './pbi.component.html',
  styleUrls: ['./pbi.component.scss']
})
export class PbiComponent implements OnInit {

  pbiForm: FormGroup;
  formErrors: any;
  showForm = false;
  showFormButtonText = 'Add New PBI';
  APIurl = 'pbi';
  pbiList: IPBIList[];
  pbiDataObject: IPBIList;

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
    SharedService.emitChange('PBI Details!');
    this.formCreateReset();
    this.listExistinData();

    this.pbiForm.valueChanges.subscribe(() => {
      this.logValidationErrors(this.pbiForm);
      this.formErrors = this.valMessage.formErrors;
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.showFormButtonText = 'Add New PBI';
      if (id) {
        this.getPBIById(id);
        this.showFormButtonText = 'Edit PBI Details';
      }
      this.pbiDataObject = {
        id: id === 0 ? null : id,
        pbiNumber: null,
        pbiDescription: ''
      };
    });
  }

  getPBIById(id: number): void {
    this.baseService.getDataById(this.APIurl, id).subscribe(
      (data: any) => {
        this.assignPBIValueforEdit(data);
      },
      (err: any) => console.log(err)
    );
  }

  assignPBIValueforEdit(data: IPBIList) {
    this.pbiForm.patchValue({
      id: data.id,
      pbiNumber: data.pbiNumber,
      pbiDescription: data.pbiDescription
    });
  }

  submitMethod(): void {
    if (this.pbiForm.invalid) {
      this.pbiForm = this.valMessage.logErrors(this.pbiForm);
      this.formErrors = this.valMessage.formErrors;
    } else {
      this.mapFormValues();
      if (this.pbiDataObject.id) {
        this.baseService
          .updateDataFunction(this.APIurl, this.pbiDataObject)
          .subscribe(
            () => {
              this.router.navigate(['dsr/pbi']);
              this.listExistinData();
              this.resetForm();
            },
            (err: any) => console.log(err)
          );
      } else {
        this.baseService.postData(this.APIurl, this.pbiDataObject).subscribe(
          () => {
            console.log('data Saved');
            this.listExistinData();
            this.resetForm();
          },
          (err: any) => console.log(err)
        );
        this.router.navigate(['dsr/pbi']);
      }
    }
  }

  mapFormValues() {
    this.pbiDataObject.pbiNumber = this.pbiForm.value.pbiNumber;
    this.pbiDataObject.pbiDescription = this.pbiForm.value.pbiDescription;
  }

  editButtonClick(itemId: number): void {
    this.showForm = true;
    this.router.navigate(['dsr/pbi', { id: itemId, status: this.showForm }]);
  }

  deleteButtonClick(itemId: number): void {
    if (this.baseService.deleteConfirmBox()) {
      this.baseService.deleteDataFunction(this.APIurl, itemId).subscribe(
        () => {
          this.listExistinData();
          this.resetForm();
          this.router.navigate(['dsr/pbi']);
        },
        (err: any) => console.log(err)
      );
    }
  }

  listExistinData(): void {
    this.baseService
      .getData(this.APIurl)
      .subscribe(
        (listpbis: IPBIList[]) => (this.pbiList = listpbis),
        (err: any) => console.log(err)
      );
  }

  formCreateReset(): void {
    this.pbiForm = this.fb.group({
      pbiNumber: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      pbiDescription: ['', [Validators.maxLength(500)]]
    });
  }

  resetForm(): void {
    this.formErrors = '';
    this.router.navigate(['dsr/pbi']);
    this.formCreateReset();
  }

  logValidationErrors(group: FormGroup = this.pbiForm): void {
    this.pbiForm = this.valMessage.logControlError(this.pbiForm);
    this.formErrors = this.valMessage.formErrors;
  }

  showAddForm(): void {
    this.router.navigate(['dsr/pbi']);
    if (this.showForm) {
      this.showForm = false;
    } else {
      this.showForm = true;
    }
    this.resetForm();
  }

}
