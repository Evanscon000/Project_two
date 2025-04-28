package com.example.project_two.repository;

import com.example.project_two.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Long> {
    Long id(Long id);
}
