package com.example.project_two.service;

import com.example.project_two.entity.Car;
import com.example.project_two.repository.CarRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository repo) {this.carRepository = repo;}

    public Car createNewCarEntityInDB(Car car) {
        return carRepository.save(car);
    }

    public List<Car> getAllCars() {return carRepository.findAll();
    }

    public Optional<Car> getCarById(Long id) {return carRepository.findById(id);
    }

    public Car updateCarById(Long id,Car updateCar) {
        Car car = carRepository.findById(id).orElseThrow();
        car.setMake(updateCar.getMake() != null ? updateCar.getMake() : car.getMake());
        car.setModel(updateCar.getModel() != null ? updateCar.getModel() : car.getModel());
        car.setYear(updateCar.getYear() != null ? updateCar.getYear() : car.getYear());
        car.setPrice(updateCar.getPrice() != null ? updateCar.getPrice() : car.getPrice());
        car.setUsed(updateCar.isUsed() != null ? updateCar.isUsed() : car.isUsed());
        return carRepository.save(car);
    }

    public Long deleteCar(Long id) {
        carRepository.deleteById(id);
        return id;
    }

}
