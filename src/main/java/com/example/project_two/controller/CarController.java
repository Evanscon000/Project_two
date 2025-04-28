package com.example.project_two.controller;


import com.example.project_two.entity.Car;
import com.example.project_two.service.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@RequestMapping("/api/car-inventory")
public class CarController {

    private final CarService service;

    public CarController(CarService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Car> createNewCarInDB(@RequestBody Car car)
    {
        return new ResponseEntity<>(service.createNewCarEntityInDB(car), HttpStatus.CREATED);

    }

}
