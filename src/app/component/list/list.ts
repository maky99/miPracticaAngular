import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../services/person';
import { Person } from '../../models/person';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class ListComponent {
  personas: Person[] = [];
  showModal = false;
  newPersona: Person = {
    id_person: 0,
    name: '',
    last_name: '',
    years: 0
  };

  constructor(private personService: PersonService) {
    this.personas = this.personService.getPerson();
  }

  agregarPersona() {
    this.personService.addPerson(this.newPersona);
    this.personas = this.personService.getPerson(); // recarga la tabla para que se muestre el registro 
    this.newPersona = {
      id_person: 0,
      name: '',
      last_name: '',
      years: 0
    };
    this.showModal = false;
  }

}
