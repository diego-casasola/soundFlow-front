import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToneService } from 'src/app/modules/services/tone.service';
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
    private toneService: ToneService
  ) { }

  ngOnInit(): void {
  }

  getDesafioRouterLink(desafio: any): string[] | null {
    if (desafio.habilitado && this.user.energia >= desafio.min_energia) {
      return ['/home/niveles/', this.nivel_id, 'desafios', desafio.id];
    } else {
      return null;
    }
  }
  
  getDesafioLinkClasses(desafio: any): string {
    if (!desafio.habilitado || (desafio.habilitado && this.user.energia < desafio.min_energia)) {
      return 'disabled disabled-link';
    } else if (desafio.habilitado && this.user.energia >= desafio.min_energia) {
      return 'enabled-link';
    } else {
      return '';
    }
  }
  

  openSwalPopup(nivel: DesafioUser) {
    if (this.authService.currentUser.energia < this.desafio.min_energia) {
      this.toneService.errorSoundTwo();
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
      this.toneService.errorSoundTwo();
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
