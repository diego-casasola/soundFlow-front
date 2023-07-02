import { Component, Input, OnInit } from '@angular/core';
import { ToneService } from 'src/app/modules/services/tone.service';
import { Nivel, NivelUser } from 'src/app/shared/interfaces/nivel.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-nivel',
  templateUrl: './card-nivel.component.html',
  styleUrls: ['./card-nivel.component.scss']
})
export class CardNivelComponent implements OnInit {
  @Input('level') nivel!: NivelUser;

  constructor(
    private toneService: ToneService
  ) { }

  ngOnInit(): void {
  }

  getNivelRouterLink(nivel: any): string[] | null {
    if (nivel.habilitado) {
      return ['/home/niveles/', nivel.id, 'desafios'];
    } else {
      return null;
    }
  }
  
  getNivelLinkClasses(nivel: any): string {
    if (!nivel.habilitado) {
      return 'disabled';
    } else {
      return '';
    }
  }

  openSwalPopup(nivel: NivelUser) {
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
