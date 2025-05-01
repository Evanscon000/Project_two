import {Car} from "../types/Car.ts";
import {useState} from "react";


// type props = {
//     carData: (data: Car) => { ;
//     },
// }

const CarForm = ({carReturn}: any) => {

    const [data, setData] = useState<Car>({
        make: "",
        model: "",
        year: Number(0),
        price: Number(0),
        used: false
    })

    const handleChange = (event: any) => {
        const {name, value} = event.target;

        setData((prev) => ({
            ...prev, [name]: value,
        }));
    }


    const handleSubmit = () => {
        carReturn(data);
    }

    const handleSubmitRefresh = (event: any) => {
        event.preventDefault();
    }

    function handleCheckbox(event: any) {
        const {name, checked} = event.target;

        setData((prev) => ({
            ...prev, [name]: checked
        }));
    }

    return (
        <div>
            <h1>Add Car</h1>
            <form onSubmit={handleSubmitRefresh}>
                <label> Make:
                    <input
                    type="text"
                    placeholder="Add Make"
                    value={data.make}
                    name="make"
                    onChange={handleChange}
                    />
                </label>
                <label> Model:
                    <input
                        type="text"
                        placeholder="Add Model"
                        value={data.model}
                        name="model"
                        onChange={handleChange}
                    />
                </label>
                <label> Year:
                    <input
                        type="number"
                        placeholder="Add Year"
                        value={data.year}
                        name="year"
                        onChange={handleChange}
                    />
                </label>
                <label> Price:
                    <input
                        type="number"
                        placeholder="Add Price"
                        value={data.price}
                        name="price"
                        onChange={handleChange}
                    />
                </label>
                <label> isUsed:
                    <input
                        type="checkbox"
                        checked={data.used}
                        name="used"
                        onChange={handleCheckbox}
                    />
                </label>
                <button
                onClick={handleSubmit}
                >Submit</button>
            </form>
        </div>
    );
};

export default CarForm;