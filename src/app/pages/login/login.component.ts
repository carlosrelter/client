import { routes } from './../../app.routes';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [ MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [ LoginService]
})
export class LoginComponent {

  formLogin!: FormGroup;
  errorForm: string= 'write a valid value';

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private service: LoginService,
    private snackBar: MatSnackBar
  ){ }

  ngOnInit(){
    this.buildLoginForm();
  }

  buildLoginForm(){
    this.formLogin = this.fb.group({
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required]]
    });
  }
  login() {
  this.service.login(this.formLogin.value.email, this.formLogin.value.password).subscribe({
    next: () => {
      this.snackBar.open('Success!', 'X', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['teste']
      });

      this.route.navigate(['/clients']);
    },
    error: () => {
      this.snackBar.open('Access Denied!', 'X', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  });
}

}
