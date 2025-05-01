import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {mockCars} from "../../CarService.ts";
import CarCard from "../CarCard.tsx";

describe('CarCard', () => {
    it('should render car make, model, year, price, isUsed', () => {
        render(<CarCard car={mockCars[0]}/>)

        expect(screen.getByRole('heading', { name: mockCars[0].make})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: mockCars[0].model})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: mockCars[0].year + ''})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: mockCars[0].price + ''})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: mockCars[0].isUsed ? 'Used' : 'New'})).toBeInTheDocument();
    });
});