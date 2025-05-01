import './App.css';
import CarCard from './components/CarCard.tsx';
import CarForm from './components/CarForm.tsx';
import { Car } from './types/Car.ts';
import { useEffect, useState } from 'react';
import * as CarService from './CarService.ts';


function App() {

  const [cars, setCars] = useState<Car[]>([]);

  const handleCarData = async (data: Car) => {
    const newCar = await CarService.createCar(data);
    setCars([...cars, newCar]);
  };

  useEffect(() => {
    CarService.fetchCars().then(setCars);
  }, []);

  return (
    <>
      <CarForm carReturn={handleCarData} />
      <div>
        {cars.map((elem, index) =>
          (<CarCard
            key={index}
            car={elem} />)
        )}
      </div>
    </>
  );
}

export default App;
