import { createReducer, on } from '@ngrx/store';
import { loadWeatherSuccess, loadWeatherFailure } from '../actions/weather.actions';

export interface WeatherState {
  data: any;
  error: string | null;
}

export const initialState: WeatherState = {
  data: null,
  error: null,
};

export const weatherReducer = createReducer(
  initialState,
  on(loadWeatherSuccess, (state, { data }) => ({ ...state, data })),
  on(loadWeatherFailure, (state, { error }) => ({ ...state, error }))
);