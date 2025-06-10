import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ClientsService } from './../../services/clients.service';
import { Component, ViewChild } from '@angular/core';
import { Client } from '../../shared/models/client';
import { DialogMode } from '../../shared/types/dialog-mode.type';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalFormClientComponent } from './modal/modal-form-client/modal-form-client.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-clients',
  imports: [MatTableModule, MatInputModule, MatCardModule, MatIcon ,MatDialogModule, MatButtonModule,
    MatSortModule, MatPaginatorModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {

  client!: Client;
  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'cellphone', 'email', 'type', 'action'];
  listClient: Client[] =[];
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ClientsService,
    public dialog:MatDialog
  ){
  }

  ngOnInit():void{
    this.getListClients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListClients(){
    this.service.getClients().subscribe({
      next:(result: Client[])=>{
        this.dataSource.data = result;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
        }else if(mode ==='delete') {
          this.service.getClients();
        }
      }
    });
  }

  openModalDeleteClient(mode: DialogMode,client:Client){
    const dialogRef = this.dialog.open(ModalFormClientComponent,{
      width:'575px',
      data:{mode, client}
    });
    dialogRef.afterClosed().subscribe(()=>{
        this.getListClients();
      })
  };



}
