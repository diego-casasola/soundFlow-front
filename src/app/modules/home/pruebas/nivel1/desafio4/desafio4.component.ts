import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { PremiosService } from 'src/app/modules/services/premios.service';
import { PruebasService } from 'src/app/modules/services/pruebas.service';
import { ToneService } from 'src/app/modules/services/tone.service';
import { Prueba, Respuesta } from 'src/app/shared/interfaces/prueba.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-desafio4',
  templateUrl: './desafio4.component.html',
  styleUrls: ['./desafio4.component.scss']
})
export class Desafio4Component implements OnInit {
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
    private toneService: ToneService,
    private premiosService: PremiosService,
  ) { }

  ngOnInit(): void {
    this.getPruebas();
  }

  getPruebas() {
    this.pruebasService.getPruebas(parseInt(this.desafioId)).subscribe(
      (res) => {
        // console.log(res);
        res.forEach((prueba: Prueba) => {
          this.respuestas().push(this.fb.group({
            id: [prueba.id],
            pregunta: [prueba.datos],
            respuesta: ['', Validators.required],
            aux: [JSON.parse(prueba.datos)]
          }));
        });
      },
      (err) => {
        console.log(err);
      }
    )
  }

  enviarRespuestas() {
    this.submitted = true;
    const formCopy = _.cloneDeep(this.formRespuesta);

    this.pruebasService.verificarRespuestas(formCopy.value).subscribe(
      (res) => {
        this.respuesta = res['resultado'];

        const respuestasCorrectas = this.respuestas().controls.filter((respuestaCtrl) =>
          this.verificarRespuesta(respuestaCtrl)
        );

        if (respuestasCorrectas.length === this.respuestas().controls.length && res.trofeoDesafio != null) {
          let trofeo: any;
          this.premiosService.getTrofeoInfo(res.trofeoDesafio.trofeo).subscribe(
            (res) => {
              trofeo = res;
            },
            (err) => {
              console.log(err);
            }
          );
          setTimeout(() => {
            Swal.fire({
              title: '¡Felicidades!',

              html: 'Todas las respuestas son correctas <br> <strong>Has ganado un trofeo</strong> <br> <img src="' + trofeo.imagen + '" alt="trofeo" width="80px" height="80px">',
              icon: 'success',
              showConfirmButton: false,
              timer: 4000
            }).then(() => {
              window.location.href = '/home/niveles';
            });
          }, 2000);
        }

        if (respuestasCorrectas.length === this.respuestas().controls.length && res.trofeoDesafio === null) {
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
      },
      (err) => {
        console.log(err);
      });
  }

  verificarRespuesta(respuestaCtrl: AbstractControl): boolean {
    if (!respuestaCtrl.get('respuesta')?.value) {
      return false;
    }
    const respuesta = respuestaCtrl.value;
    return this.respuesta.some(
      (item) => item.id === respuesta.id
    );
  }

  seleccionarOpcion(prueba: AbstractControl, opcionIndex: any) {
    prueba.get('respuesta')?.setValue(opcionIndex);
  }


  reproducirNota(nota: string) {
    this.toneService.reproducirNota(nota);
  }
}
