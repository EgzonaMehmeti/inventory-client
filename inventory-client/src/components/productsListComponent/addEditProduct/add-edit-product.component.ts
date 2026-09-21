import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'add-edit-product',
    templateUrl: 'add-edit-product.component.html',
    standalone: true,
    styleUrls: ['./add-edit-product.component.scss'],
    imports: [MatDialogModule, MatFormField, MatLabel, MatInputModule, FormsModule, MatSelectModule, MatButtonModule,
              ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule]
})
export class AddEditProductComponent implements OnInit{
    public form!: FormGroup;
    constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddEditProductComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any){
               }
    
    ngOnInit(): void {
        this.initForm();
        if(this.data.type == 'edit'){
            this.form.patchValue({
                ...this.data.product
            });
        }
    }
    initForm(){
        this.form = this.fb.group({
            name: [null, Validators.required],
            price: [null, Validators.required],
            category: [null, Validators.required],
            description: [null, Validators.required],
            quantityInStock: [null, Validators.required]
        });
    }
    save() {
    const result = {
        data: this.form.value,
        type: this.data.type
    }
    this.dialogRef.close(result);
  }
    
}