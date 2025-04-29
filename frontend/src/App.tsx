import './App.css'
import CarCard from "./components/CarCard.tsx";
import {mockCars} from "./carService.ts";


function App() {


  return (
    <>
      <div>
        <CarCard

            car={mockCars[0]}/>
      </div>
    </>
  )
}

export default App
