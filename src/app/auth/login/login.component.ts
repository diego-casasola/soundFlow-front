import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import * as Tone from 'tone'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.sonar();
    console.log(this.authService.isLogged());
  }

  sonar(){
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now()
    synth.triggerAttackRelease("C4", "8n", now)
  }

  login() {
    const { username, password } = this.loginForm.value;
    Swal.fire({
      title: 'Autenticando',
      text: 'Espere por favor...',
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        this.authService.login(username, password).subscribe(
          (resp: any) => {
            Swal.close();
            this.router.navigate(['/home/niveles']);
          },
          (_) => {
            Swal.close();
            Swal.fire('Credenciales incorrectas')
          }
        );
      }
    })
  }

}
function _(error: any): void {
  throw new Error('Function not implemented.');
}

