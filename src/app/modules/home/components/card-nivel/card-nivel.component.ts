import { Component, Input, OnInit } from '@angular/core';
import { Nivel, NivelUser } from 'src/app/shared/interfaces/nivel.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-nivel',
  templateUrl: './card-nivel.component.html',
  styleUrls: ['./card-nivel.component.scss']
})
export class CardNivelComponent implements OnInit {
  @Input('level') nivel!: NivelUser;

  constructor() { }

  ngOnInit(): void {
  }

  openSwalPopup(nivel: NivelUser) {
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
