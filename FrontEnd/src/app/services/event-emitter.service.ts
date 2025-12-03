import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EventEmitterService {
  private static emitters: {
    [nomeEvento: string]: EventEmitter<any>;
  } = {};

  static get(nomeEvento: string): EventEmitter<any> {
    if (!this.emitters[nomeEvento])
      this.emitters[nomeEvento] = new EventEmitter<any>();
    else {
      if (this.emitters[nomeEvento].observers.length >= 1) {
        let observers = this.emitters[nomeEvento].observers[this.emitters[nomeEvento].observers.length - 1];
        this.emitters[nomeEvento].observers = [];
        this.emitters[nomeEvento].observers.push(observers);
      }
    }
    return this.emitters[nomeEvento];
  }
}
