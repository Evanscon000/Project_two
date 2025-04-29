import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {mockCars} from "../../carService.ts";
import CarCard from "../CarCard.tsx";

describe('CarCard', () => {
    it('should render car make, model, year, price, isUsed', () => {
        render(<CarCard car={mockCars[0]}/>)

        expect(screen.getByRole('heading', { name: /toyota/i})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /camry/i})).toBeInTheDocument();
    });
});