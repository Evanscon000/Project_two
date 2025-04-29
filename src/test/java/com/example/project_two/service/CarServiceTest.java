package com.example.project_two.service;

import com.example.project_two.entity.Car;
import com.example.project_two.repository.CarRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CarServiceTest {

    @Mock
    CarRepository carRepository;

    @InjectMocks
    CarService carService;

    private Car car1;
    private Car car2;
    private Car car3;


    @Test
    void savesCarItem() {
        Car car = new Car("Toyota", "4Runner", 2022, 55000.55, false );
        when(carRepository.save(car)).thenReturn(car);
        Car result = carService.createNewCarEntityInDB(car);
        assertThat(result).isSameAs(car);
    }

    @Test
    void getAllCarItems() {

        Car car1 = new Car("Toyota", "4Runner", 2022, 55000.55, false );
        Car car2 = new Car("Honda", "Civic", 2020, 21000.55, true );
        Car car3 = new Car("Kia", "Stinger", 2018, 32000.55, true );

        when(carRepository.findAll()).thenReturn(List.of(car1, car2, car3));
        List<Car> result = carService.getAllCars();
        assertThat(result).contains(car1, car2, car3);
        verify(carRepository).findAll();
    }

    @Test
    void getGetCarsById() {
        Car car3 = new Car("Toyota", "4Runner", 2022, 55000.55, false );
        car3.setId(1L);
        when(carRepository.findById(1L)).thenReturn(Optional.of(car3));
        Optional<Car> result = carService.getCarById(1L);
        assertThat(result).isPresent().contains(car3);
    }

    @Test
    void canUpdateCarUsingId() {
        Car car4 = new Car("Toyota", "4Runner", 2022, 55000.55, false);
        Car updateCar = new Car("Ford", "Bronco Sport", 2024, 43000.00, false);
        car4.setId(2L);
        updateCar.setId(2L);

        when(carRepository.findById(2L)).thenReturn(Optional.of(car4));
        when(carRepository.save(any(Car.class))).thenReturn(updateCar);
        Car result = carService.updateCarById(2L, updateCar);
        assertThat(result.getMake()).isEqualTo("Ford");
        assertThat(result.getModel()).isEqualTo("Bronco Sport");
        assertThat(result.getYear()).isEqualTo(2024);
        assertThat(result.isUsed()).isEqualTo(false);
    }

    @Test
    void canDeleteCarUsingId() {
        Car car5 = new Car("Toyota", "4Runner", 2022, 55000.55, false);
        car5.setId(1L);

        carService.deleteCar(1L);
        verify(carRepository).deleteById(1L);
    }
}
