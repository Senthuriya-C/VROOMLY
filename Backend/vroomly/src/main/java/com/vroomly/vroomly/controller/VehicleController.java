package com.vroomly.vroomly.controller;

import com.vroomly.vroomly.model.Vehicle;
import com.vroomly.vroomly.service.VehicleService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }


    // ================================
    // GET ALL VEHICLES
    // ================================

    @GetMapping("/vehicle/{id}")
    public List<Vehicle> getVehicles() {

        return vehicleService.getAllVehicles();
    }


    // ================================
    // ADD VEHICLE
    // ================================

    @PostMapping("/vehicle")
    public Vehicle addVehicle(
            @RequestBody Vehicle vehicle) {

        return vehicleService.addVehicle(vehicle);
    }


    // ================================
    // UPDATE VEHICLE
    // ================================

    @PutMapping("/vehicle/{id}")
    public Vehicle updateVehicle(
            @PathVariable Long id,
            @RequestBody Vehicle vehicle) {

        return vehicleService.updateVehicle(id, vehicle);
    }


    // ================================
    // DELETE VEHICLE
    // ================================

    @DeleteMapping("/vehicle/{id}")
    public String deleteVehicle(
            @PathVariable Long id) {

        vehicleService.deleteVehicle(id);

        return "Vehicle deleted successfully";
    }

}