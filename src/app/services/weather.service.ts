import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather'; // Example API endpoint
  private apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}`;

    return this.http.get(url).pipe(
      retry(3), // Retry the request up to 3 times
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}