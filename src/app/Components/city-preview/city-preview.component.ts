import { Component, EventEmitter, Input, Output,} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonIcon,
  IonItem

} from '@ionic/angular/standalone';

@Component({
  selector: 'app-city-preview',
  templateUrl: 'city-preview.component.html',
  styleUrls: ['city-preview.component.scss'],
  standalone:true,
  imports: [CommonModule, IonButton, IonIcon, IonItem],
})
export class CityPreviewComponent{
  @Input() city: string = 'Desconocido';
  @Input() country: string = 'Desconocido';
  @Input() province: string = 'Desconocido';

  @Output() eventAddCity = new EventEmitter<string>();
  onClickAddCity(){
    const data:CityDetailsPreview = {
      city: this.city,
      country: this.country,
      province: this.province
    }
    this.eventAddCity.emit(data.city);
  }

}

interface CityDetailsPreview{
  city: string;
  province: string;
  country: string;
}