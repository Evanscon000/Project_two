package com.example.project_two.controller;


import com.example.project_two.entity.Car;
import com.example.project_two.service.CarService;
import org.springframework.boot.origin.Origin;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/car-inventory")
@CrossOrigin(origins = "http://localhost:5173")
public class CarController {

    private final CarService carService;

    public CarController(CarService service) {
        this.carService = service;
    }

    @PostMapping
    public ResponseEntity<Car> createNewCarInDB(@RequestBody Car car)
    {
        return new ResponseEntity<>(carService.createNewCarEntityInDB(car), HttpStatus.CREATED);

    }

    @GetMapping
    public ResponseEntity<List<Car>> getAllCars(){
        return ResponseEntity.ok (carService.getAllCars());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id){
        return carService.getCarById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCarById(@PathVariable Long id, @RequestBody Car carUpdate){
        return ResponseEntity.ok(carService.updateCarById(id,carUpdate));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarById(@PathVariable Long id){
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }

}
