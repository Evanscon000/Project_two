import axios, { AxiosResponse } from 'axios';
import { Car } from './types/Car.ts';

export async function createCar(car:Car): Promise<Car> {
    return await axios.post('http://localhost:8080/api/car-inventory', {...car}).then((res: AxiosResponse<Car>) => res.data);
}


export async function fetchCars(): Promise<Car[]> {
    return await axios.get('http://localhost:8080/api/car-inventory').then((res: AxiosResponse<Car[]>) => res.data);
}
