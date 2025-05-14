import { ClientsService } from './../../services/clients.service';
import { Component } from '@angular/core';
import { Client } from '../../shared/models/client';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-clients',
  imports: [MatTableModule, MatInputModule, MatCardModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {

  dataSource: Client[] = [];
  displayedColumns: string[] = ['id', 'name', 'cellphone', 'email', 'tipo'];

  constructor(private service: ClientsService){
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

}
