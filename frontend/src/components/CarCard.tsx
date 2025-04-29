import {mockCars} from "../carService.ts";
import {Car} from "../types/Car.ts";

type Props = {
    car: Car;
}

const CarCard = ({car}:Props) => {
    return (
        <div>
            <h1>{mockCars[0].make}</h1>
            <h1>{mockCars[0].model}</h1>
            <h1>{mockCars[0].year}</h1>
        </div>
    );
};

export default CarCard;