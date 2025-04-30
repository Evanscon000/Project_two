import {render, screen} from "@testing-library/react";
import {afterAll, expect} from "vitest";
import CarForm from "../CarForm.tsx";
import {userEvent} from "@testing-library/user-event";

const mockCar = {
    id: undefined,
    make: "",
    model: "",
    year: 0,
    price: 0,
    isUsed: false
}

const submitDataInfo = () => {
    console.log("submitData invoked")
}

describe('CarForm', () => {
    it('should display the form, with input fields, and an add button', () => {
        render(<CarForm car={
        mockCar} submitData={function(): void {
        } } />)

        expect(screen.getByRole('heading', { name: /add car/i})).toBeVisible();
        expect(screen.getByRole('textbox', { name: /make/i})).toBeVisible();
        expect(screen.getByRole('textbox', { name: /model/i})).toBeVisible();
        expect(screen.getByRole('spinbutton', { name: /year/i})).toBeVisible();
        expect(screen.getByRole('spinbutton', { name: /price/i})).toBeVisible();
        expect(screen.getByRole('checkbox', { name: /isUsed/i})).toBeVisible();
        expect(screen.getByRole('button', { name: /submit/i})).toBeVisible();

    });

    it('should populate data in form', async () => {

        render(<CarForm car={mockCar} submitData={submitDataInfo}/>);

        const make = screen.getAllByRole('textbox')[0];
        const price = screen.getAllByRole('spinbutton')[0];
        const isUsed = screen.getAllByRole('checkbox')[0];

        await userEvent.type(price, '20')
        await userEvent.click(isUsed)
        await userEvent.type(make, "Honda")

        expect(make).toHaveValue("Honda")
        expect(price).toHaveValue(20)
        expect(isUsed).toBeTruthy()

        screen.logTestingPlaygroundURL();
    });


    it('should return data to main', async () => {
        let mockCar2 = {
            make: "Honda",
            model: "",
            year: Number(0),
            price: "21",
            isUsed: 'on'
        }

        const handleCarData = vi.fn();

        render(<CarForm carReturn={handleCarData}/>)

        const make = screen.getAllByRole('textbox')[0];
        const price = screen.getAllByRole('spinbutton')[1];
        const isUsed = screen.getAllByRole('checkbox')[0];
        const addButton = screen.getByRole('button', { name: /submit/i });

        await userEvent.type(price, '21')
        await userEvent.click(isUsed)
        await userEvent.type(make, "Honda")
        await userEvent.click(addButton)


        expect(handleCarData).toHaveBeenCalledWith(mockCar2);

    });
});