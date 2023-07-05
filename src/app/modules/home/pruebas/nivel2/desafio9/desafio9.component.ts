import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PruebasService } from 'src/app/modules/services/pruebas.service';
import { ToneService } from 'src/app/modules/services/tone.service';
import { Respuesta, Prueba } from 'src/app/shared/interfaces/prueba.interface';

@Component({
  selector: 'app-desafio9',
  templateUrl: './desafio9.component.html',
  styleUrls: ['./desafio9.component.scss']
})
export class Desafio9Component implements OnInit {

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

  enviarRespuestas() {

  }

  verificarRespuesta(respuestaCtrl: AbstractControl): boolean {
    // debugger;
    
    const respuesta = respuestaCtrl.value;
    return this.respuesta.some(
      (item) =>  item.id === respuesta.id
    );
  }

}
