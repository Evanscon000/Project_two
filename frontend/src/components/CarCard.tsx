import { Car } from '../types/Car.ts';

type Props = {
    car: Car;
}

//We just currently have mock data in the cards. Next group will need to connect to data.

const CarCard = ({car}:Props) => {
    return (
        <>
            <div className="border rounded-2xl shadow-lg p-6 m-4 max-w-sm bg-white">
                <h1 className="text-5xl font-bold mb-2">{car.make}</h1>
                <h2>{car.model}</h2>
                <h2>{car.year}</h2>
              <h2>{car.price}</h2>
              <h2>{car.used ? 'Used' : 'New'}</h2>
            </div>
        </>

    );
};

export default CarCard;