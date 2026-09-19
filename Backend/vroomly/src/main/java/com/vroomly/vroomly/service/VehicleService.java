package com.vroomly.vroomly.service;

import com.vroomly.vroomly.model.Vehicle;
import com.vroomly.vroomly.repository.VehicleRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(
            VehicleRepository vehicleRepository) {

        this.vehicleRepository = vehicleRepository;
    }


    // GET
    public List<Vehicle> getAllVehicles() {

        return vehicleRepository.findAll();
    }


    // POST
    public Vehicle addVehicle(Vehicle vehicle) {

        return vehicleRepository.save(vehicle);
    }


    // PUT
    public Vehicle updateVehicle(
            Long id,
            Vehicle vehicle) {

        Vehicle existingVehicle =
                vehicleRepository.findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Vehicle not found"
                    )
                );

        existingVehicle.setBrand(
                vehicle.getBrand()
        );

        existingVehicle.setModel(
                vehicle.getModel()
        );

        existingVehicle.setPricePerDay(
                vehicle.getPricePerDay()
        );

        return vehicleRepository.save(
                existingVehicle
        );
    }


    // DELETE
    public void deleteVehicle(Long id) {

        vehicleRepository.deleteById(id);
    }

}