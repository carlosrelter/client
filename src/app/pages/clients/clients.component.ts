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
    this.getListClients();
  }

  getListClients(){
    this.service.getClients().subscribe({
      next:(clients: any)=>{
        this.dataSource = clients;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  openModalClient(mode: DialogMode,client: Client){
    const dialogRef = this.dialog.open(ModalFormClientComponent,{
      width:'575px',
      data:{mode,client}
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        if(mode === 'create'){
          this.service.postClient(result).subscribe(()=>
            this.getListClients()
          );
        }else if(mode ==='edit'){
          this.service.putClient(result.id!,result).subscribe(()=>
            this.getListClients()
          );
        }
        this.getListClients();
      }
    });
  }

  openModalDeleteClient(mode: DialogMode,client:Client){
    const dialogRef = this.dialog.open(ModalFormClientComponent,{
      width:'575px',
      data:{mode, client}
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.service.deleteClientById(client.id!).subscribe(()=>{
        this.getListClients();
      })
    });
  }


}
