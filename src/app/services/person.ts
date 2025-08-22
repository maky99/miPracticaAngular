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
          { id_person: 2, name: 'Ángel', last_name: 'Di María', years: 36 },
          { id_person: 3, name: 'Emiliano', last_name: 'Martínez', years: 33 },
          { id_person: 4, name: 'Rodrigo', last_name: 'De Paul', years: 32 },
          { id_person: 5, name: 'Julián', last_name: 'Álvarez', years: 27 },
          { id_person: 6, name: 'Enzo', last_name: 'Fernández', years: 28 },
          { id_person: 7, name: 'Leandro', last_name: 'Paredes', years: 34 },
          { id_person: 8, name: 'Nicolás', last_name: 'Otamendi', years: 38 },
          { id_person: 9, name: 'Lautaro', last_name: 'Martínez', years: 30 },
          { id_person: 10, name: 'Giovani', last_name: 'Lo Celso', years: 33 },
          { id_person: 11, name: 'Alexis', last_name: 'Mac Allister', years: 29 },
          { id_person: 12, name: 'Marcos', last_name: 'Acuña', years: 35 },
          { id_person: 13, name: 'Nahuel', last_name: 'Molina', years: 31 },
          { id_person: 14, name: 'Cristian', last_name: 'Romero', years: 30 },
          { id_person: 15, name: 'Gonzalo', last_name: 'Montiel', years: 32 },
          { id_person: 16, name: 'Paulo', last_name: 'Dybala', years: 34 },
          { id_person: 17, name: 'Exequiel', last_name: 'Palacios', years: 31 },
          { id_person: 18, name: 'Lisandro', last_name: 'Martínez', years: 30 },
          { id_person: 19, name: 'Nicolás', last_name: 'Tagliafico', years: 34 },
          { id_person: 20, name: 'Gerónimo', last_name: 'Rulli', years: 36 },
          { id_person: 21, name: 'Franco', last_name: 'Armani', years: 42 },
          { id_person: 22, name: 'Guido', last_name: 'Rodríguez', years: 35 },
          { id_person: 23, name: 'Ángel', last_name: 'Correa', years: 32 },
          { id_person: 24, name: 'Thiago', last_name: 'Almada', years: 27 },
          { id_person: 25, name: 'Facundo', last_name: 'Medina', years: 29 },
          { id_person: 26, name: 'Lucas', last_name: 'Ocampos', years: 33 },
          { id_person: 27, name: 'Emiliano', last_name: 'Buendía', years: 30 },
          { id_person: 28, name: 'Juan', last_name: 'Foyth', years: 31 },
          { id_person: 29, name: 'Alejandro', last_name: 'Gómez', years: 39 },
          { id_person: 30, name: 'Mauro', last_name: 'Icardi', years: 32 }
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
