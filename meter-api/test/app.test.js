/* eslint-disable */
import axios from 'axios';
import dotenv from 'dotenv';
import { jest } from '@jest/globals';
import request from 'supertest';

import app from '../src/app';
import meterIntervalData from './mockResponses/intervalDataResponse';
import carbonIntensity from './mockResponses/carbonIntensityResponse';
import generationMix from './mockResponses/generationMixResponse';

dotenv.config({ path: `.${process.env.NODE_ENV || 'development'}.env` });

describe('GET /status', () => {
  it('should return 200', async () => {
    const res = await request(app).get('/status');
    expect(res.statusCode).toBe(200);
    expect(res.body.alive).toBe(true);
  });
});

describe('GET /invalid_route', () => {
  it('should return 404 with invalid route', async () => {
    const res = await request(app).get('/invalid_route');
    expect(res.statusCode).toBe(404);
  });
});

describe('GET /api/meters', () => {
  it('should return 400 with no api key', async () => {
    const res = await request(app).get('/api/meters/123456');
    expect(res.statusCode).toBe(400);
  });

  it('should return 401 with invalid api key', async () => {
    const res = await request(app).get('/api/meters/123456?api-key=invalid_api_key');
    expect(res.statusCode).toBe(401);
  });

  it('should return 400 when missing paramter', async () => {
    const meterId = '123456';
    const res = await request(app).get(`/api/meters/${meterId}?api-key=${process.env.API_KEY}`);
    expect(res.statusCode).toBe(400);
  });
});

describe('', () => {
  beforeEach(() => {
    axios.get = jest.fn()
      .mockResolvedValueOnce(meterIntervalData)
      .mockResolvedValueOnce(carbonIntensity)
      .mockResolvedValueOnce(generationMix);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return energy consumption', async () => {
    const meterId = '123456';
    const startDate = '2023-1-1';
    const endDate = '2023-1-1';
    const url = `/api/meters/${meterId}?start-date=${startDate}&end-date=${endDate}&api-key=${process.env.API_KEY}`;
    const res = await request(app).get(url);
    expect(res.statusCode).toBe(200);
    expect(res.body.electricity).toBe('2757.40');
    expect(res.body.electricity_units).toBe('kWh');
  });

  it('should return CO2', async () => {
    const meterId = '123456';
    const startDate = '2023-1-1';
    const endDate = '2023-1-1';
    const url = `/api/meters/${meterId}?start-date=${startDate}&end-date=${endDate}&api-key=${process.env.API_KEY}`;
    const res = await request(app).get(url);
    expect(res.statusCode).toBe(200);
    expect(res.body.co2).toBe('292.72');
    expect(res.body.co2_units).toBe('KgCO2');
  });

  it('should return generation mix', async () => {
    const meterId = '123456';
    const startDate = '2023-1-1';
    const endDate = '2023-1-1';
    const url = `/api/meters/${meterId}?start-date=${startDate}&end-date=${endDate}&api-key=${process.env.API_KEY}`;
    const res = await request(app).get(url);
    expect(res.statusCode).toBe(200);
    expect(res.body.co2_generationmix).toEqual(
      expect.arrayContaining(
        [
          {'co2': '11.13', 'fuel': 'biomass'},
          {'co2': '7.70', 'fuel': 'coal'},
          {'co2': '40.76', 'fuel': 'imports'},
          {'co2': '55.53', 'fuel': 'gas'},
          {'co2': '60.99', 'fuel': 'nuclear'},
          {'co2': '0.00', 'fuel': 'other'},
          {'co2': '9.81', 'fuel': 'hydro'},
          {'co2': '2.02', 'fuel': 'solar'},
          {'co2': '104.88', 'fuel': 'wind'},
        ],
      )
    );
  });
});
