import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  data: Forecast[] = [
    {
      city:'Andoain',
      province:'País Vasco',
      country:'España',
      temperature:14
    },
    {
      city:'Astiarraga',
      province:'País Vasco',
      country:'España',
      temperature: 20
    },
    {
      city:'Amurrio',
      province:'Alava',
      country:'España',
      temperature:16
    },
  ]

  //Método que simula un fetch que busca la ciudad
  fetchCities(query:string){
    const cities = this.data.filter((c)=>c.city.toLowerCase().includes(query.toLowerCase()))
    return cities;
  }

  //Método que guarda una ciudad en el localStorage
  saveCity(data:Forecast):string{
    try{
      const savedCities = JSON.parse(localStorage.getItem('cities') || '[]');
      //Verifica si la ciudad que se ha querido guardar ya está guardada
      const isSaved = savedCities.some((c:Forecast) => c.city.toLowerCase() === data.city.toLowerCase())
      if(!isSaved){
        savedCities.push(data);
        localStorage.setItem('cities',JSON.stringify(savedCities));
        return "Guardada con éxito."
      }
      return "La ciudad ya está guardada."
    }catch(error:unknown){
      if(error instanceof Error){
        console.error("Error al guardar ciudad: ",error.message)
      }else{
        console.error("Error desconocido: ",error)
      }
      return "ha ocurrido un error al guardar."
    }
  }
  
  //Recupera la ciudades guardadas del Local Storage
  getSavedCities(){
    return JSON.parse(localStorage.getItem('cities') || '[]');
  }
}
interface Forecast{
  city:string;
  province:string;
  country:string;
  temperature:number
}
