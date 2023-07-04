import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { PruebasService } from 'src/app/modules/services/pruebas.service';
import { ToneService } from 'src/app/modules/services/tone.service';
import { Prueba, Respuesta } from 'src/app/shared/interfaces/prueba.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-desafio7',
  templateUrl: './desafio7.component.html',
  styleUrls: ['./desafio7.component.scss']
})
export class Desafio7Component implements OnInit {
  desafioId = this.route.url.split('/')[5];
  respuesta: Respuesta[] = [];

  formRespuesta = this.fb.group({
    desafio: [this.desafioId],
    prueba_res: this.fb.array([]),
  });

  submitted = false;

  listaNotas: any[] = [];
  intervals: any[] = [];

  respuestas(): FormArray {
    return this.formRespuesta.get('prueba_res') as FormArray;
  }

  constructor(
    private pruebasService: PruebasService,
    private route: Router,
    private fb: FormBuilder,
    private toneService: ToneService,
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
            array: this.fb.array([])
          }));
        });
      },
      (err) => {
        console.log(err);
      }
    )
  }

  enviarRespuesta() {
    this.submitted = true;
    const formCopy = _.cloneDeep(this.formRespuesta);

    formCopy.value.prueba_res.forEach((prueba: any) => {
      prueba.respuesta = this.toneSemitoneConvert(prueba.array);
      prueba.respuesta = prueba.respuesta.join(',');
    });

    this.pruebasService.verificarRespuestas(formCopy.value).subscribe(
      (res) => {
        this.respuesta = res['resultado'];

        const respuestasCorrectas = this.respuestas().controls.filter(
          (item) => this.verificarRespuesta(item)
        );

        console.log(respuestasCorrectas);

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
    console.log(respuesta);
    return this.respuesta.some(
      (item) =>  item.id === respuesta.id && item.respuesta === respuesta.respuesta
    );
  }

  insertarNota(index: number, nota: string) {
    this.toneService.playTone(nota);
    this.respuestas().controls.forEach((respuestaCtrl, i) => {
      if (i === index) {
        const arrayCtrl = respuestaCtrl.get('array') as FormArray;
        if (arrayCtrl && arrayCtrl instanceof FormArray) {
          arrayCtrl.push(this.fb.control(nota));
        }
      }
    });
  }

  limpiarNotas(index: number) {
    this.respuestas().controls.forEach((respuestaCtrl, i) => {
      if (i === index) {
        const arrayCtrl = respuestaCtrl.get('array') as FormArray;
        if (arrayCtrl && arrayCtrl instanceof FormArray) {
          arrayCtrl.clear();
        }
      }
    });
  }

  toneSemitoneConvert(listaNotas: any[]) {
    const listaIntervalos: any[] = [];
    for (let i = 0; i < listaNotas.length - 1; i++) {
      const intervalo = this.getInterval(listaNotas[i], listaNotas[i + 1]);
      listaIntervalos.push(intervalo);
    }
    return listaIntervalos;
  }

  getInterval(note1: string, note2: string) {
    const intervals = [
      "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4",
      "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5",
      "G#5", "A5", "A#5", "B5", "C6", "C#6", "D6", "D#6", "E6"
    ]

    const note1Index = intervals.indexOf(note1);
    const note2Index = intervals.indexOf(note2);

    if (note1Index === -1 || note2Index === -1) {
      // Si alguna de las notas no está en la lista de intervalos, se retorna null o se maneja el error según tus necesidades
      return null;
    }
    const distance = Math.abs(note2Index - note1Index);
    const semitones = distance > 6 ? 12 - distance : distance;
    const tones = Math.floor(semitones / 2);
    const interval = 'T'.repeat(tones) + 'S'.repeat(semitones - (tones * 2));

    return interval;
  }
}
