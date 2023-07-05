import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { PremiosService } from 'src/app/modules/services/premios.service';
import { PruebasService } from 'src/app/modules/services/pruebas.service';
import { ToneService } from 'src/app/modules/services/tone.service';
import { Respuesta, Prueba } from 'src/app/shared/interfaces/prueba.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-desafio6',
  templateUrl: './desafio6.component.html',
  styleUrls: ['./desafio6.component.scss']
})
export class Desafio6Component implements OnInit {
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

    formCopy.value.prueba_res.forEach((prueba: any) => {
      const array = prueba.respuesta;
      prueba.respuesta = array.join(',');
    });

    this.pruebasService.verificarRespuestas(formCopy.value).subscribe(
      (res) => {
        this.respuesta = res['resultado']
        this.respuesta.forEach((item) => {
          item.respuesta = item.respuesta.split(',');
        });

        const respuestasCorrectas = this.respuestas().controls.filter((respuestaCtrl) =>
          this.verificarRespuesta(respuestaCtrl)
        );
        
        
        if (respuestasCorrectas.length === this.respuestas().controls.length && res.trofeoDesafio != null){
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
          } , 2000);
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
      }
    )
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

  reproducirEscala(nota: string) {
    console.log(nota);
    this.toneService.reproducirEscala(nota);
  }

  reproducirNota(nota: string) {
    console.log(nota);
    this.toneService.reproducirNota2(nota);
  }

  mapNotas(nota: string) {
    const notas: { [key: string]: string } = {
      'son_do': 'DO',
      'son_re': 'RE',
      'son_mi': 'MI',
      'son_fa': 'FA',
      'son_sol': 'SOL',
      'son_la': 'LA',
      'son_si': 'SI',
      'son_do_sost': 'DO#',
      'son_re_sost': 'RE#',
      'son_fa_sost': 'FA#',
      'son_sol_sost': 'SOL#',
      'son_la_sost': 'LA#',
      'son_do_me': 'DOm',
      'son_re_me': 'REm',
      'son_mi_me': 'MIm',
      'son_fa_me': 'FAm',
      'son_sol_me': 'SOLm',
      'son_la_me': 'LAm',
      'son_si_me': 'SIm',
    };
    return notas[nota];
  }

  drop(event: CdkDragDrop<string[]>, respuesta: any, pos: number) {
    moveItemInArray(respuesta, event.previousIndex, event.currentIndex);
    this.respuestas().controls[pos].get('respuesta')?.setValue(respuesta);
    console.log(this.respuestas().controls[pos].get('respuesta')?.value);
  }

  

}
