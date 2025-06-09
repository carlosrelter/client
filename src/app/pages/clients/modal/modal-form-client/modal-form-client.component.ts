import { MatIconModule } from '@angular/material/icon';
import { Client } from './../../../../shared/models/client';
import { Component, Inject } from '@angular/core';
import { DialogMode } from '../../../../shared/types/dialog-mode.type';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule}  from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClientsService } from '../../../../services/clients.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-modal-form-client',
  imports: [ MatFormFieldModule, MatInputModule, MatDialogModule, ReactiveFormsModule,
     MatButtonModule, MatIconModule, MatSelectModule ],
  templateUrl: './modal-form-client.component.html',
  styleUrl: './modal-form-client.component.scss'
})
export class ModalFormClientComponent {

  typeClient =[
    {
      id:1,
      description: 'STANDART'
    },
    {
      id:2,
      description: 'PREMIUM'
    }
  ];

  id!: number;
  form!: FormGroup;
  mode! : DialogMode;
  client!:Client;
  email:string |undefined;
  idDelete!: number;

  errorForm: string ='write a valid value';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalFormClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {client?:Client, mode:DialogMode},
    private service: ClientsService
  ){
    this.mode = data.mode;
  }

  ngOnInit(){
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      id:[null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      cellphone: [null, [Validators.required, Validators.minLength(8)]],
      email: [null, [Validators.required, Validators.email]],
      type: [null, Validators.required]
    });

    if(this.mode === 'edit'){
      this.fillForm();
    }
    if (this.mode === 'view') {
      this.fillForm();
      this.form.get('name')?.disable();
      this.form.get('cellphone')?.disable();
      this.form.get('email')?.disable();
      this.form.get('type')?.disable();
    }
  }

  fillForm(){
    this.form.patchValue({
      id:this.data.client?.id,
      name: this.data.client?.name,
      cellphone: this.data.client?.cellphone,
      email: this.data.client?.email,
      type: this.data.client?.type
    });
  }

  deleteClient(){
    this.service.deleteClientById(this.data.client?.id!).subscribe(()=>this.getListClients());
    this.onClose();
  }

  onClose(){
    this.dialogRef.close();
  }

  onSave():void{
    if(this.form.valid && this.mode !== 'view'){
      this.dialogRef.close(this.form.value)
    }
    if(this.mode ==='view'){
      this.onClose();
    }
  }

  getListClients(){
    this.service.getClients().subscribe();
  }
}
