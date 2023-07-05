import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PremiosService } from 'src/app/modules/services/premios.service';
import { PruebasService } from 'src/app/modules/services/pruebas.service';
import { ToneService } from 'src/app/modules/services/tone.service';
import { Respuesta, Prueba } from 'src/app/shared/interfaces/prueba.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-desafio17',
  templateUrl: './desafio17.component.html',
  styleUrls: ['./desafio17.component.scss']
})
export class Desafio17Component implements OnInit {
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
    private premiosService: PremiosService,
  ) { }

  ngOnInit(): void {
    this.getPruebas();
  }

  getPruebas() {
    this.pruebasService.getPruebas(parseInt(this.desafioId)).subscribe(
      (res) => {
        res.forEach((prueba: Prueba) => {
          let orden = JSON.parse(prueba.datos);
          console.log(orden);
          let opciones: string[] = prueba.resultado.split(',');
          opciones = opciones.sort(() => Math.random() - 0.5);
          this.respuestas().push(this.fb.group({
            id: [prueba.id],
            pregunta: [prueba.datos],
            respuesta: ['', Validators.required],
            nota: [orden.escala],
            incompleto: [orden.orden],
            opciones: [opciones],
          }));
        });
        console.log(this.respuestas().value);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  enviarRespuesta() {
    this.submitted = true;
    this.formRespuesta.value.prueba_res.forEach((prueba: any) => {
      prueba.respuesta = prueba.incompleto.join(',');
    });

    this.pruebasService.verificarRespuestas(this.formRespuesta.value).subscribe(
      (res) => {
        this.respuesta = res['resultado'];
        const respuestasCorrectas = this.respuestas().controls.filter(
          (item) => this.verificarRespuesta(item)
        );

        console.log(respuestasCorrectas);
        let trofeo: any;
        this.premiosService.getTrofeoInfo(res.trofeoDesafio.trofeo).subscribe(
          (res) => {
            trofeo = res;
          },
          (err) => {
            console.log(err);
          } 
        );


        if (respuestasCorrectas.length === this.respuestas().controls.length && res.trofeoDesafio != null){
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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    console.log(this.respuestas().value);
  }
}
