package com.example.project_two.controller;

import com.example.project_two.entity.Car;
import com.example.project_two.repository.CarRepository;
import com.example.project_two.service.CarService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CarController.class)
public class CarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private CarService carService;

    private Car car1;
    private Car car2;


    @BeforeEach
    void setUp() {
        car1 = new Car("Toyota", "4Runner", 2022, 55000.55, false);
        car2 = new Car("Honda", "Civic", 2020, 30000.55, false);
        car1.setId(1L);
        car2.setId(2L);
        Mockito.when(carService.deleteCar(1L)).thenReturn(1L);

    }

    @Test
    void shouldCreateCarEntity() throws Exception {
        when(carService.createNewCarEntityInDB(any(Car.class))).thenReturn(car1);
        mockMvc.perform(post("/api/car-inventory")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(car1)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1));

    }

    @Test
    void shouldGetAllCars() throws Exception {
        when(carService.getAllCars()).thenReturn(List.of(car1, car2));
        mockMvc.perform(get("/api/car-inventory"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void shouldGetCarById() throws Exception {
        when(carService.getCarById(1L)).thenReturn(Optional.of(car1));
        mockMvc.perform(get("/api/car-inventory/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.make").value("Toyota"));
    }

    @Test
    void shouldUpdateCarById() throws Exception {
        Car carUpdate = new Car("Ford", "Bronco", 2024, 43000.00, false);
        carUpdate.setId(1L);
        when(carService.updateCarById(eq(1L), any(Car.class))).thenReturn(carUpdate);
        mockMvc.perform(put("/api/car-inventory/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(carUpdate)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.make").value("Ford"));
    }

    @Test
    void shouldDeleteCarById() throws Exception {
        mockMvc.perform(delete("/api/car-inventory/1"))
                .andExpect(status().isNoContent());

        verify(carService).deleteCar(1L);
    }
}
