import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Desafio, DesafioUser } from 'src/app/shared/interfaces/desafio.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-desafio',
  templateUrl: './card-desafio.component.html',
  styleUrls: ['./card-desafio.component.scss']
})
export class CardDesafioComponent implements OnInit {
  @Input('desafio') desafio!: DesafioUser;
  @Input('index') index!: number;

  user = this.authService.currentUser;
  nivel_id = this.activatedRoute.snapshot.params.id;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  openSwalPopup(nivel: DesafioUser) {
    if (this.authService.currentUser.energia < this.desafio.min_energia) {
      Swal.fire({
        title: 'Energía insuficiente',
        text: 'Juega los desafios en el Dashboard para obtener más energía',
        icon: 'warning',
        confirmButtonText: 'OK',
        timer: 3000,
        timerProgressBar: true,
        showCancelButton: false,
        showCloseButton: false,
        showConfirmButton: false
      });
    }

    if (!nivel.habilitado) {
      Swal.fire({
        title: 'Nivel no habilitado',
        text: 'Sigue jugando para habilitar este nivel',
        icon: 'warning',
        confirmButtonText: 'OK',
        timer: 3000,
        timerProgressBar: true,
        showCancelButton: false,
        showCloseButton: false,
        showConfirmButton: false
      });
    }
  }
}
