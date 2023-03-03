import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout;


  onQueryChanged(query: string = '') {
    // Limpiar el debounceTimer si ya existe
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      console.log(query)
    }, 350);
  }

}
