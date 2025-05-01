import { describe, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import App from '../App.tsx';
import { Car } from '../types/Car.ts';
import * as CarService from '../CarService.ts';
import { userEvent } from '@testing-library/user-event';

describe('App test', () => {

  const testCar:Car = {make: 'Tesla', model: 'Model 3', price: 18000, year: 2024, used: true, id: 1};

  it('should render car form', () => {
    render(<App></App>);
    const addCarHeader = screen.getByRole('heading', {name: 'Add Car'});

    expect(addCarHeader).toBeVisible();
  });

  it('should render car card', async () => {
    vi.spyOn(CarService, 'fetchCars').mockResolvedValue([testCar]);

    render(<App></App>);
    const carMake = await screen.findByRole('heading', {name: testCar.make});

    expect(carMake).toBeVisible();
  });

  it('should add new car', async () => {
    vi.spyOn(CarService, 'fetchCars').mockResolvedValue([]);
    vi.spyOn(CarService, 'createCar').mockResolvedValue(testCar);

    render(<App />);
    const make = screen.getAllByRole('textbox')[0];
    const model = screen.getAllByRole('textbox')[1];
    const year = screen.getAllByRole('spinbutton')[0];
    const price = screen.getAllByRole('spinbutton')[1];
    const isUsed = screen.getAllByRole('checkbox')[0];

    await userEvent.type(price, testCar.price + '')
    await userEvent.type(year, testCar.year + '')
    if (testCar.used) await userEvent.click(isUsed)
    await userEvent.type(make, testCar.make)
    await userEvent.type(model, testCar.model)
    await userEvent.click(screen.getByRole('button', {name: 'Submit'}));

    expect(await screen.findByRole('heading', {name: testCar.make})).toBeVisible();
  });
})