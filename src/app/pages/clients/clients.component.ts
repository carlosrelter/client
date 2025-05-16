import { ClientsService } from './../../services/clients.service';
import { Component } from '@angular/core';
import { Client } from '../../shared/models/client';
import { DialogMode } from '../../shared/models/dialog-mode';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalFormClientComponent } from './modal/modal-form-client/modal-form-client.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-clients',
  imports: [MatTableModule, MatInputModule, MatCardModule, MatIcon ,MatDialogModule, MatButtonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {

  client!: Client;
  dataSource: Client[] = [];
  displayedColumns: string[] = ['id', 'name', 'cellphone', 'email', 'tipo', 'action'];

  constructor(
    private service: ClientsService,
    public dialog:MatDialog
  ){
  }

  ngOnInit():void{
    this.service.getClients().subscribe({
      next:(clients: any)=>{
        this.dataSource = clients;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  openModalEditclient(mode: DialogMode,client: Client){
    console.log("mode=",mode);
    if(mode ==='view'){
      console.log("teste ok");
    }
    this.dialog.open(ModalFormClientComponent,{
      width:'575px',
      data:{mode,client}
    })
  }

  openModalDeleteClient(){}
}
