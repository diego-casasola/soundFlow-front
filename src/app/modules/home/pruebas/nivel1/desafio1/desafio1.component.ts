import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PruebasService } from 'src/app/modules/services/pruebas.service';
import { Prueba, PruebaRes, Respuesta } from 'src/app/shared/interfaces/prueba.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-desafio1',
  templateUrl: './desafio1.component.html',
  styleUrls: ['./desafio1.component.scss']
})
export class Desafio1Component implements OnInit {
  desafioId = this.route.url.split('/')[5];
  respuesta: Respuesta[] = [];

  formRespuesta = this.fb.group({
    desafio: [this.desafioId],
    prueba_res: this.fb.array([]),
  });

  submitted = false;

  respuestas(): FormArray {
    return this.formRespuesta.get('prueba_res') as FormArray;
  }

  constructor(
    private pruebasService: PruebasService,
    private route: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getPruebas();
    // console.log(this.respuestas().controls);

  }

  getPruebas() {
    this.pruebasService.getPruebas(parseInt(this.desafioId)).subscribe(
      (res) => {
        // console.log(res);
        res.forEach((prueba: Prueba) => {
          this.respuestas().push(this.fb.group({
            id: [prueba.id],
            pregunta: [prueba.datos],
            respuesta: [''],
          }));
        });
      },
      (err) => {
        console.log(err);
      }
    )
  }

  enviarRespuestas() {
    this.pruebasService.verificarRespuestas(this.formRespuesta.value).subscribe(
      (res) => {
        this.respuesta = res['resultado'];
        console.log(this.respuesta);
        this.submitted = true;

        const respuestasCorrectas = this.respuestas().controls.filter((respuestaCtrl) =>
          this.verificarRespuesta(respuestaCtrl)
        );
        if (respuestasCorrectas.length === this.respuestas().controls.length) {
          setTimeout(() => {
            Swal.fire({
              title: '¡Felicidades!',
              text: 'Todas las respuestas son correctas',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              window.location.href = '/home/niveles';
            });
          }, 2000);
        }
      }
    );
  }

  verificarRespuesta(respuestaCtrl: AbstractControl): boolean {
    if (!respuestaCtrl.get('respuesta')?.value) {
      return false;
    }
    const respuesta = respuestaCtrl.value;
    return this.respuesta.some(
      (item) => item.id === respuesta.id && item.respuesta === respuesta.respuesta
    );
  }

  allInputsFilled(): boolean {
    const respuestas = this.respuestas().controls;
    return respuestas.every((respuestaCtrl) => respuestaCtrl.get('respuesta')?.value);
  }
}
