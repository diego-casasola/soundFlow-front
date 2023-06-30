import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  hide: boolean = true;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    if (this.registerForm.valid) {
      Swal.fire({
        title: 'Registrando',
        text: 'Espere por favor...',
        allowOutsideClick: false,
        didOpen: async () => {
          Swal.showLoading();
          this.authService.registerUser(this.registerForm.value).subscribe(
            (resp: any) => {
              Swal.close();
              Swal.fire('Usuario registrado');
              this.route.navigate(['/']);
            },
            (_) => {
              Swal.close();
              Swal.fire('Error al registrar usuario');
            }
          );
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
