package com.vroomly.vroomly.repository;

import com.vroomly.vroomly.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
