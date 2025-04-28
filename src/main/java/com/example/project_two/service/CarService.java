package com.example.project_two.service;

import com.example.project_two.entity.Car;
import com.example.project_two.repository.CarRepository;
import org.springframework.stereotype.Service;

@Service
public class CarService {

    private final CarRepository repo;

    public CarService(CarRepository repo) {this.repo = repo;}

    public Car createNewCarEntityInDB(Car car) {
        return repo.save(car);
    }
}
