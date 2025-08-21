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
  isEditing = false;
  editIndex: number = -1; // indeice que se edita
  newPersona: Person = {
    id_person: 0,
    name: '',
    last_name: '',
    years: 0
  };


  constructor(private personService: PersonService) {
    this.personas = this.personService.getPerson();
    this.sortByLastName(); //hacemos el orden 
  }


  //abriemos el modal
  openModalNew() {
    this.showModal = true;
    this.isEditing = false;
    this.newPersona = { id_person: 0, name: '', last_name: '', years: 0 };
  }

  // abrimos el modal para editar
  openModalEdit(p: Person, index: number) {
    this.showModal = true;
    this.isEditing = true;
    this.editIndex = index;
    this.newPersona = { ...p }; // clona los datos para el modal
  }


  // cerrar el modal 
  closeModal() {
    this.showModal = false;
    this.isEditing = false;
    this.editIndex = -1;
    this.newPersona = {
      id_person: 0,
      name: '',
      last_name: '',
      years: 0
    };
  }

  addPersona() {
    if (!this.newPersona.name || !this.newPersona.last_name || !this.newPersona.years) {
      alert('Todos los campos son obligatorios');
      return;
    }

    //acomodamos los textos 
    this.newPersona.name = this.order(this.newPersona.name);
    this.newPersona.last_name = this.order(this.newPersona.last_name);


    if (this.isEditing) {
      // actualizamos los datos 

      this.personas[this.editIndex] = { ...this.newPersona };
      localStorage.setItem('personas', JSON.stringify(this.personas));
    } else {
      this.personService.addPerson(this.newPersona);
      this.personas = this.personService.getPerson(); // recarga la tabla para que se muestre el registro

    }
    this.sortByLastName();// ordenamos
    this.closeModal();
  }

  deletePers(index: number) {
    //pedimos confirmacion
    if (confirm('¿Estas seguro de eliminar?')) {
      this.personas.splice(index, 1);// elimina del array 
      localStorage.setItem('personas', JSON.stringify(this.personas)); // actualiza el localstorage
      this.sortByLastName();//ordenamos

    }
  }

  //metodo para ordenar 
  sortByLastName() {
    this.personas.sort((a, b) => a.last_name.localeCompare(b.last_name));
  }

  //crea el texto  con mayuscyula y des pues minuscula 
  order(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

}
