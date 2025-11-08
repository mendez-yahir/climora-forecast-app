import { Component, Input} from '@angular/core';
import { IonItem } from '@ionic/angular/standalone';
@Component({
  selector: 'app-forecast-preview',
  templateUrl: './forecast-preview.component.html',
  styleUrls: ['./forecast-preview.component.scss'],
  imports: [IonItem]
})
export class ForecastPreviewComponent{
  constructor() { }
  @Input() data:ForecastPreview = {
    city:'Desconocido',
    province: 'Desconocido',
    country: 'Desconocido',
    temperature: 0
  };
  

  

}

interface ForecastPreview{
  city:string;
  province:string;
  country:string;
  temperature:number;
}
