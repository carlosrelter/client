import { Client } from './../../../../shared/models/client';
import { Component, Inject } from '@angular/core';
import { DialogMode } from '../../../../shared/models/dialog-mode';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule}  from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-form-client',
  imports: [ MatFormFieldModule, MatInputModule, MatDialogModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './modal-form-client.component.html',
  styleUrl: './modal-form-client.component.scss'
})
export class ModalFormClientComponent {

  form!: FormGroup;
  mode! : DialogMode;
  client!:Client;
  email:string |undefined;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalFormClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {client?:Client, mode:DialogMode}
  ){
    this.mode = data.mode;
    this.email =data.client?.email;
  }

  ngOnInit(){
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [{ value:this.data.client?.name || '', disabled: this.mode === 'view'}],
      cellphone: [ {value:this.data.client?.cellphone || '', disabled: this.mode === 'view'}],
      email: [{value:this.data.client?.email || '',disabled: this.mode === 'view'}],
      tipo: [{value:this.data.client?.tipo || '',disabled: this.mode === 'view'}]
    });
  }



  onClose(){
    this.dialogRef.close();
  }
  onSave(){}
}
