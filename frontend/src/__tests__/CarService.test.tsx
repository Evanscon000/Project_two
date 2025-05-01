import { afterAll, afterEach, beforeAll, describe, expect } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import * as CarService from '../CarService.ts';
import { Car } from '../types/Car.ts';

describe('car service test', () => {

  const server = setupServer();
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it('should fetch list of cars', async () => {

    const carsList:Car[] = [
      {
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        price: 21999,
        used: true
      },
      {
        make: 'Honda',
        model: 'Civic',
        year: 2023,
        price: 25999,
        used: false
      },
      {
        make: 'Ford',
        model: 'Mustang',
        year: 2018,
        price: 27999,
        used: true
      }
    ];

    server.use(http.get('http://localhost:8080/api/car-inventory', () => HttpResponse.json(carsList, { status: 201 })));

    const results = await CarService.fetchCars();
    expect(results).not.toBeNull();
    expect(results).toStrictEqual(carsList);
  });

  it('should create a new car', async () => {
    const newCar = {make: 'VW', model: 'GTI', price: 50000, year: 2025, isUsed: false};
    server.use(http.post('http://localhost:8080/api/car-inventory', () => HttpResponse.json(newCar, { status: 201})));

    const result = await CarService.createCar(newCar);

    expect(result).not.toBeNull();
    expect(result).toStrictEqual(newCar);
  });
});