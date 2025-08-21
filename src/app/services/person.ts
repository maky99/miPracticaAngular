import { Injectable } from '@angular/core';
import { Person as PersonModel } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  //defino clave para guardar
  private storageKey = 'personas';
  //datos en el localstorage
  constructor() {
    if (typeof window !== 'undefined') {   // <-- verifica que existe window
      if (!localStorage.getItem(this.storageKey)) {
        const inicial: PersonModel[] = [
          { id_person: 1, name: 'Lionel', last_name: 'Messi', years: 37 },
          { id_person: 2, name: 'Ángel', last_name: 'Di María', years: 36 }
        ];
        localStorage.setItem(this.storageKey, JSON.stringify(inicial));
      }
    }
  }


  //optenemos lista de jugadores de LocalStorage
  getPerson(): PersonModel[] {
    if (typeof window === 'undefined') return []; // evitar errores
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Agregar un jugador nuevo
  addPerson(person: PersonModel) {
    const jugadores = this.getPerson();
    person.id_person = this.triggerId(jugadores);
    jugadores.push(person);
    localStorage.setItem(this.storageKey, JSON.stringify(jugadores));
  }

  // Generar un ID nuevo automáticamente
  private triggerId(person: PersonModel[]): number {
    return person.length > 0
      ? Math.max(...person.map(j => j.id_person)) + 1
      : 1;
  }


}
