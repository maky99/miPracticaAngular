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
  searchText: string = '';



  //variables para el paginado 
  currentPage: number = 1; // página actual
  pageSize: number = 5;   // cuántos registros mostrar por página
  totalPages: number = 1;  // total de páginas
  paginatedPersonas: Person[] = []; // lista que se mostrará en la tabla

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
    this.updatePagination(); // mostramos la primera página

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
    this.updatePagination(); // actualizamos la paginación
    this.closeModal();
  }

  deletePers(i: number) {
    if (confirm('¿Estas seguro de eliminar?')) {
      const realIndex = (this.currentPage - 1) * this.pageSize + i;
      this.personas.splice(realIndex, 1);
      localStorage.setItem('personas', JSON.stringify(this.personas));
      this.sortByLastName();
      this.updatePagination();
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



  //paginado 
  updatePagination() {
    // Filtra la lista según searchText
    const filtered = this.personas.filter(p =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      p.last_name.toLowerCase().includes(this.searchText.toLowerCase())
    );

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    // Usamos filtered, no this.personas
    this.paginatedPersonas = filtered.slice(start, end);
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
  }




  // updatePagination() {
  //   // Filtra la lista según searchText
  //   const filtered = this.personas.filter(p =>
  //     p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //     p.last_name.toLowerCase().includes(this.searchText.toLowerCase())
  //   );

  //   const start = (this.currentPage - 1) * this.pageSize; // calculamos el índice de inicio (skip)
  //   const end = start + this.pageSize; // índice final
  //   this.paginatedPersonas = this.personas.slice(start, end); // slice actúa como skip + take
  //   this.totalPages = Math.ceil(this.personas.length / this.pageSize); // calculamos total de páginas
  // }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }




}
