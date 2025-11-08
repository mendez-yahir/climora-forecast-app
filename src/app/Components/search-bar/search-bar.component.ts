import { Component, Input, SimpleChanges } from '@angular/core';
import {IonSearchbar} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [IonSearchbar, FormsModule]
})
export class SearchBarComponent{

  constructor() { }
  //Recibe un parametro booleano que indica cuando debe de resetear el input
  @Input() resetInputTrigger: boolean = false; 

  //Se inicializa la variable que quedará bindada al input
  searchText = '';

  //Detecta cualquier cambio y llama a su función correspondiente
  ngOnChanges(changes: SimpleChanges){
    //Si la variable resetInputTrigger cambia y es true, entonces resetea
    if(changes['resetInputTrigger']?.currentValue == true){
      this.resetInput();
    }
  }

  //Función de reseteo de input
  resetInput(){
    this.searchText = '';
  }
}
