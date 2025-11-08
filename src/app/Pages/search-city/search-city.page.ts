import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar,IonItem,IonText,IonList,ToastController } from '@ionic/angular/standalone';
import { SearchBarComponent } from 'src/app/Components/search-bar/search-bar.component';
import { CityPreviewComponent } from 'src/app/Components/city-preview/city-preview.component';
import { ForecastPreviewComponent } from 'src/app/Components/forecast-preview/forecast-preview.component';
import { ForecastService } from 'src/app/services/forecast-service/forecast.service';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.page.html',
  styleUrls: ['./search-city.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule, IonToolbar, IonText,IonList, SearchBarComponent, CityPreviewComponent, ForecastPreviewComponent]
})
export class SearchCityPage{
  constructor(
    private toastController: ToastController,
    private forecastService: ForecastService
  ) { }

  

  //Ciudades Guardadas
  savedCities:any[] = [];

  //Actualmente Valida si se dee de mostrar o no la lista de ciudades populares, por mientra sirve para mostrar ciudades en elegidas
  cityPopulateActive: boolean = true;
  //--
  
  //Inicializa la variable que almacenará el resultado de la búsqueda
  citySearch: Forecast[] = [];

  //Resetear el input search luego de una acción
  resetInputSearch:boolean = false;

  //Función que muestra un Toast y recibe parametros para personalizarlo
  async showToast(messg = 'Cargando...',pos:'top' | 'middle' | 'bottom', dur:number = 1500){
    const toast = await this.toastController.create({
      message: messg,
      duration: dur,
      position: pos
    })
    await toast.present();
  }
  
  //Recibe el evento y extrae el valor del input en cada actualización
  handleInput(event: Event){
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    if(query != ''){
      //Si hay texto entonces oculta el panel de ciudades populares
      this.cityPopulateActive = false;
      //Si hay texto llama al método del servicio y muestra la ciudad
      this.citySearch = this.forecastService.fetchCities(query)
    }else{
      //Si no hay texto limpia el array de ciudades filtradas
      this.citySearch = [];
      //Si no hay texto activa el panel de ciudades populares
      this.cityPopulateActive = true;
    }
  }

  //Función que recibe un evento con la ciudad que quiere agregar
  async addCityPreview(city:string){
    const cityInfo = this.citySearch.find((c)=>c.city.toLowerCase() === city.toLowerCase());
    let message:string = '';
    if(cityInfo){
      message = this.forecastService.saveCity(cityInfo);
    }else{
      await this.showToast('Error, no hay coincidencias de la ciudad.','bottom');
    }
    //Reseteamos los valores d ebúsqueda
    this.cityPopulateActive = true;
    //Activamos las ciudades
    this.citySearch = []
    //Resetea el input
    this.resetInputSearch = true;

    this.savedCities = this.forecastService.getSavedCities();
    //Devuelve a false para próximos reseteos
    setTimeout(()=>{this.resetInputSearch = false},1000)

    //Mensaje de Confirmación
    await this.showToast(message, 'bottom')
  }


  ngOnInit(){
    this.savedCities = this.forecastService.getSavedCities();
  }
}

interface CityDetailsPreview{
  city: string;
  province: string;
  country: string;
  temperature?:number
}
interface Forecast{
  city:string;
  province:string;
  country:string;
  temperature:number
}