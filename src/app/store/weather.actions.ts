import { createAction, props } from '@ngrx/store';

export const loadWeather = createAction('[Weather Page] Load Weather',
  props<{ location: string }>()
);

export const loadWeatherSuccess = createAction('[Weather API] Load Weather Success',
  props<{ weatherData: any }>()
);

export const loadWeatherFailure = createAction('[Weather API] Load Weather Failure',
  props<{ error: any }>()
);

export const updateWeather = createAction('[Weather Page] Update Weather',
  props<{ weatherData: any }>()
);
