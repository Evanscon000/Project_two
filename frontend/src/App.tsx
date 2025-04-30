import './App.css'
import CarCard from "./components/CarCard.tsx";
import {mockCars} from "./carService.ts";
import CarForm from "./components/CarForm.tsx";
import {Car} from "./types/Car.ts";


function App() {

    const handleCarData = (data: Car) => {
        console.log(data)
    }

  return (
    <>
        <CarForm carReturn={handleCarData}/>
      <div>
        <CarCard
            car={mockCars[0]}/>
      </div>
    </>
  )
}

export default App
