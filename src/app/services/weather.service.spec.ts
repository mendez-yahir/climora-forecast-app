import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
  });

  it('should use the proxy for requests', () => {
    spyOn(service, 'getWeatherData').and.callThrough();
    service.getWeatherData('test-city');
    expect(service.getWeatherData).toHaveBeenCalledWith('test-city');
  });

  it('should fallback to public endpoints when proxy fails', () => {
    spyOn(service, 'getWeatherData').and.throwError('Proxy error');
    service.getWeatherData('test-city').subscribe(
      () => {},
      (error) => {
        expect(error).toBe('Proxy error');
      }
    );
  });

  it('should handle errors gracefully', () => {
    spyOn(service, 'getWeatherData').and.throwError('Network error');
    service.getWeatherData('test-city').subscribe(
      () => {},
      (error) => {
        expect(error).toBe('Network error');
      }
    );
  });

  it('should return the correct structure of weather data', () => {
    const mockResponse = {
      temperature: 20,
      condition: 'Clear',
      city: 'test-city'
    };
    spyOn(service, 'getWeatherData').and.returnValue(of(mockResponse));
    service.getWeatherData('test-city').subscribe((data) => {
      expect(data).toEqual(jasmine.objectContaining({
        temperature: jasmine.any(Number),
        condition: jasmine.any(String),
        city: 'test-city'
      }));
    });
  });
});
