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
}
