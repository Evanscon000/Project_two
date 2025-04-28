package com.example.project_two.service;

import com.example.project_two.entity.Car;
import com.example.project_two.repository.CarRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CarServiceTest {

    @Mock
    CarRepository repo;

    @InjectMocks
    CarService service;

    @Test
    void savesCarItem() {
        Car car = new Car("Toyota", "4Runner", 2022, 55000.55, false );
        when(repo.save(car)).thenReturn(car);
        Car result = service.createNewCarEntityInDB(car);
        assertThat(result).isSameAs(car);
    }
}
