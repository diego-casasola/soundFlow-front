import { Injectable } from '@angular/core';
import * as Tone from 'tone'

@Injectable({
  providedIn: 'root'
})
export class ToneService {

  constructor() { }

  loginSound() {
    const synth = new Tone.Synth().toDestination();
    const scale = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

    const duration = "8n";
    let time = Tone.now();

    scale.forEach((note, index) => {
      synth.triggerAttackRelease(note, duration, time);
      time += Tone.Time(duration).toSeconds();
    });
  }

  errorSound() {
    const noiseSynth = new Tone.NoiseSynth().toDestination();
    const fmSynth = new Tone.FMSynth().toDestination();

    // Configurar el sintetizador de ruido
    noiseSynth.volume.value = -15; // Ajustar el volumen del ruido
    noiseSynth.envelope.attack = 0.01; // Ataque corto para un sonido agudo
    noiseSynth.envelope.decay = 0.1; // Decay para controlar la duración del sonido

    // Configurar el sintetizador de modulación de frecuencia
    fmSynth.volume.value = -5; // Ajustar el volumen del sonido de error
    fmSynth.harmonicity.value = 5; // Ajustar la relación armónica para una distorsión pronunciada
    fmSynth.modulationIndex.value = 10; // Ajustar el índice de modulación para una mayor distorsión

    // Activar el sonido de error
    noiseSynth.triggerAttackRelease("8n");
    fmSynth.triggerAttackRelease("C3", "8n");
  }

  errorSoundTwo() {
    const synth = new Tone.Synth().toDestination();

    synth.oscillator.type = "triangle"; // Tipo de forma de onda del oscilador
    synth.volume.value = -10; // Ajustar el volumen del sonido de error
    synth.envelope.attack = 0.001; // Ataque más corto para un sonido agudo
    synth.envelope.decay = 0.05; // Decay más corto para una duración breve del sonido

    // Activar el sonido de error
    synth.triggerAttackRelease("C3", "16n");
  }

  clickSound() {
    const synth = new Tone.PluckSynth().toDestination();

    const note = "C4"; // Nota del sonido de clic
    const duration = "16n"; // Duración del sonido de clic

    // Configurar el sintetizador de sonido percusivo
    synth.attackNoise = 1; // Nivel de ruido de ataque
    synth.dampening = 4000; // Controla la duración y el carácter del sonido

    // Reproducir el sonido de clic
    synth.triggerAttackRelease(note, duration);
  }

  reproducirNota(nota: string) {
    const synth = new Tone.Synth().toDestination();
    const notas: { [key: string]: string } = {
      'son_do': 'C4',
      'son_re': 'D4',
      'son_mi': 'E4',
      'son_fa': 'F4',
      'son_sol': 'G4',
      'son_la': 'A4',
      'son_si': 'B4',
      'son_do_sost': 'C#5',
      'son_re_sost': 'D#5',
      'son_fa_sost': 'F#4',
      'son_sol_sost': 'G#4',
      'son_la_sost': 'A#4',
    };
    synth.triggerAttackRelease(notas[nota], "8n");
  }

  reproducirNota2(nota: string) {
    const synth = new Tone.Synth().toDestination();
    const notas: { [key: string]: string } = {
      'Do': 'C4',
      'Re': 'D4',
      'Mi': 'E4',
      'Fa': 'F4',
      'Sol': 'G4',
      'La': 'A4',
      'Si': 'B4',
      'Do#': 'C#5',
      'Re#': 'D#5',
      'Fa#': 'F#4',
      'Sol#': 'G#4',
      'La#': 'A#4',
      'Reb': 'Db4',
      'Mib': 'Eb4',
      'Solb': 'Gb4',
      'Lab': 'Ab4',
      'Sib': 'Bb4',
    }
    synth.triggerAttackRelease(notas[nota], "8n");
  }

  reproducirEscala(escala: string) {
    const synth = new Tone.Synth().toDestination();
    const escalas: { [key: string]: string[] } = {
      'son_do': ["C4", "D4", "E4", "F4", "G4", "A4", "B4"],
      'son_re': ["D4", "E4", "F#4", "G4", "A4", "B4", "C#5"],
      'son_mi': ["E4", "F#4", "G#4", "A4", "B4", "C#5", "D#5"],
      'son_fa': ["F4", "G4", "A4", "A#4", "C5", "D5", "E5"],
      'son_sol': ["G4", "A4", "B4", "C5", "D5", "E5", "F#5"],
      'son_la': ["A4", "B4", "C#5", "D5", "E5", "F#5", "G#5"],
      'son_si': ["B4", "C#5", "D#5", "E5", "F#5", "G#5", "A#5"],
      'son_do_me': ["C4", "D4", "Eb4", "F4", "G4", "Ab4", "Bb4", "C5"],
      'son_re_me': ["D4", "E4", "F4", "G4", "A4", "Bb4", "C5", "D5"],
      'son_mi_me': ["E4", "F#4", "G4", "A4", "B4", "C5", "D5", "E5"],
      'son_fa_me': ["F4", "G4", "Ab4", "Bb4", "C5", "Db5", "Eb5", "F5"],
      'son_sol_me': ["G4", "A4", "Bb4", "C5", "D5", "Eb5", "F5", "G5"],
      'son_la_me': ["A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5"],
      'son_si_me': ["B4", "C#5", "D5", "E5", "F#5", "G5", "A5", "B5"],
      'sound_sol_sost': ["G#4", "A#4", "B4", "C#5", "D#5", "E5", "F#5", "G#5"],
      'sound_la_sost': ["A#4", "C5", "C#5", "D#5", "F5", "F#5", "G#5", "A#5"],
      'sound_do_sost': ["C#4", "D#4", "E4", "F#4", "G#4", "A#4", "B4", "C#5"],
      'sound_re_sost': ["D#4", "F4", "F#4", "G#4", "A#4", "B4", "C#5", "D#5"],
      'sound_fa_sost': ["F#4", "G#4", "A4", "B4", "C#5", "D#5", "E5", "F#5"],
    };
    const duration = "8n";
    let time = Tone.now();

    escalas[escala].forEach((nota, index) => {
      synth.triggerAttackRelease(nota, duration, time);
      time += Tone.Time(duration).toSeconds();
    });
  }

  playTone(tone: string) {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(tone, "8n");
  }
}
