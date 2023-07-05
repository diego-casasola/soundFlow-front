import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PruebasService } from 'src/app/modules/services/pruebas.service';
import { Prueba, Respuesta } from 'src/app/shared/interfaces/prueba.interface';
import { CdkDrag, CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToneService } from 'src/app/modules/services/tone.service';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { PremiosService } from 'src/app/modules/services/premios.service';

@Component({
  selector: 'app-desafio2',
  templateUrl: './desafio2.component.html',
  styleUrls: ['./desafio2.component.scss']
})
export class Desafio2Component implements OnInit {
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
    private route: Router,
    private pruebasService: PruebasService,
    private fb: FormBuilder,
    private toneService: ToneService,
    private premiosService: PremiosService,
  ) { }

  ngOnInit(): void {
    this.getPruebas();
  }

  drop(event: CdkDragDrop<string[]>, respuesta: any, pos: number) {
    moveItemInArray(respuesta, event.previousIndex, event.currentIndex);
    this.respuestas().controls[pos].get('respuesta')?.setValue(respuesta);
  }

  get respuestasOrdenadas(): AbstractControl[] {
    return this.respuestas().controls.sort((a, b) => {
      const indexA = this.respuestas().controls.indexOf(a);
      const indexB = this.respuestas().controls.indexOf(b);
      return indexA - indexB;
    });
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
    };
    return notas[nota];
  }

  getPruebas() {
    this.pruebasService.getPruebas(parseInt(this.desafioId)).subscribe(
      (res) => {
        res.forEach((prueba: Prueba) => {
          this.respuestas().push(this.fb.group({
            id: [prueba.id],
            pregunta: [prueba.datos],
            respuesta: ['', Validators.required],
            aux: [JSON.parse(prueba.datos)],
          }));
        });
        console.log(this.respuestas().controls);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  reproducirEscala(escala: string) {
    this.toneService.reproducirEscala(escala);
  }

  reproducirNota(nota: string) {
    this.toneService.reproducirNota(nota);
  }

  enviarRespuestas() {
    this.submitted = true;
    const formCopy = _.cloneDeep(this.formRespuesta);

    formCopy.value.prueba_res.forEach((prueba: any) => {
      const array = prueba.respuesta;
      prueba.respuesta = array.join(', ');
    });

    this.pruebasService.verificarRespuestas(formCopy.value).subscribe(
      (res) => {
        this.respuesta = res['resultado']
        this.respuesta.forEach((item) => {
          item.respuesta = item.respuesta.split(', ');
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
}

