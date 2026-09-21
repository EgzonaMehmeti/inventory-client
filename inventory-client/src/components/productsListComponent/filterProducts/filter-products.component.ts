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
    selector: 'filter-products',
    templateUrl: 'filter-products.component.html',
    standalone: true,
    styleUrls: ['./filter-products.component.scss'],
    imports: [MatDialogModule, MatFormField, MatLabel, MatInputModule, FormsModule, MatSelectModule, MatButtonModule,
              ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule]
})
export class FilterProductsComponent implements OnInit{
    public form!: FormGroup;
    constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<FilterProductsComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any){
               }
    
    ngOnInit(): void {
        this.initForm();
    }
    initForm(){
        this.form = this.fb.group({
            name: [this.data.name || ''],
            category: [this.data.category || '']
        });
    }
    save() {
    const result = this.form.value;
    this.dialogRef.close(result);
  }
    
}