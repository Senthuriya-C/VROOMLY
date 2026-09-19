package com.vroomly.vroomly.repository;

import com.vroomly.vroomly.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}