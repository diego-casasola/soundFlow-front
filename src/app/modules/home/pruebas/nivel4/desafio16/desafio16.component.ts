import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { PruebasService } from 'src/app/modules/services/pruebas.service';
import { ToneService } from 'src/app/modules/services/tone.service';
import { Respuesta, Prueba } from 'src/app/shared/interfaces/prueba.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-desafio16',
  templateUrl: './desafio16.component.html',
  styleUrls: ['./desafio16.component.scss']
})
export class Desafio16Component implements OnInit {

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
  ) { }

  ngOnInit(): void {
    this.getPruebas();
  }

  getPruebas() {
    this.pruebasService.getPruebas(parseInt(this.desafioId)).subscribe(
      (res) => {
        // console.log(res);
        res.forEach((prueba: Prueba) => {
          let notas: string[] = prueba.datos.split(',');
          this.respuestas().push(this.fb.group({
            id: [prueba.id],
            pregunta: [prueba.datos],
            respuesta: ['', Validators.required],
            aux: [notas]
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
      prueba.respuesta = prueba.respuesta.join(',');
    });

    console.log(formCopy.value);

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
    // debugger;
    
    const respuesta = respuestaCtrl.value;
    return this.respuesta.some(
      (item) =>  item.id === respuesta.id
    );
  }

  toggleOpcion(prueba: AbstractControl, opcion: any) {
    const respuestaSeleccionada = prueba.get('respuesta')?.value || [];
    const index = respuestaSeleccionada.indexOf(opcion);

    if (index !== -1) {
      respuestaSeleccionada.splice(index, 1); // Si ya está seleccionada, se desmarca.
    } else {
      respuestaSeleccionada.push(opcion); // Si no está seleccionada, se marca.
    }

    prueba.get('respuesta')?.setValue(respuestaSeleccionada);
    console.log(this.respuestas().value);
  }
}
