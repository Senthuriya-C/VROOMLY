package com.vroomly.vroomly.repository;

import com.vroomly.vroomly.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}