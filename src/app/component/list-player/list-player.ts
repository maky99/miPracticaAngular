import { Component } from '@angular/core';

@Component({
  selector: 'app-list-player',
  standalone: true,
  templateUrl: './list-player.html',
  styleUrls: ['./list-player.css']
})
export class ListPlayerComponent {
  //variables para el paginado 
  currentPage: number = 1; // página actual
  pageSize: number = 10;   // cuántos registros mostrar por página
  totalPages: number = 1;  // total de páginas



  //paginado 
  updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize; // calculamos el índice de inicio (skip)
    const end = start + this.pageSize; // índice final
    // this.paginateds = this.personas.slice(start, end); // slice actúa como skip + take
    // this.totalPages = Math.ceil(this.personas.length / this.pageSize); // calculamos total de páginas
  }
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
