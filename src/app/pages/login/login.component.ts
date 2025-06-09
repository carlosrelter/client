import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [ MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [ LoginService]
})
export class LoginComponent {

  formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private service: LoginService
  ){ }

  ngOnInit(){
    this.buildLoginForm();
  }

  buildLoginForm(){
    this.formLogin = this.fb.group({
      email:[null],
      password:[null]
    });
  }

  login(){
    console.log(this.formLogin.value);
    this.service.login(this.formLogin.value.email,this.formLogin.value.password).subscribe({
      next:()=> console.log("sucesso"),
      error:()=> console.log("erro")
    })

  }
}
