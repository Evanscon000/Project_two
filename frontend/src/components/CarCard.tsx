import {mockCars} from "../carService.ts";
import {Car} from "../types/Car.ts";

type Props = {
    car: Car;
}

//We just currently have mock data in the cards. Next group will need to connect to data.

const CarCard = ({car}:Props) => {
    return (
        <>
            <div className="border rounded-2xl shadow-lg p-6 m-4 max-w-sm bg-white">
                <h1 className="text-5xl font-bold mb-2">{mockCars[0].make}</h1>
                <h1>{mockCars[0].model}</h1>
                <h1>{mockCars[0].year}</h1>
            </div>
            <div className="border rounded-2xl shadow-lg p-6 m-4 max-w-sm bg-white">
                <h1 className="text-5xl font-bold mb-2">{mockCars[1].make}</h1>
                <h1>{mockCars[1].model}</h1>
                <h1>{mockCars[1].year}</h1>
            </div>
            <div className="border rounded-2xl shadow-lg p-6 m-4 max-w-sm bg-white">
                <h1 className="text-5xl font-bold mb-2">{mockCars[2].make}</h1>
                <h1>{mockCars[2].model}</h1>
                <h1>{mockCars[2].year}</h1>
            </div>
        </>

    );
};

export default CarCard;