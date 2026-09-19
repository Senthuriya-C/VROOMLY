package com.vroomly.vroomly.service;

import com.vroomly.vroomly.model.Service;
import com.vroomly.vroomly.repository.ServiceRepository;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    // Get all services
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    // Add a new service
    public Service addService(Service service) {
        return serviceRepository.save(service);
    }

    // Update an existing service
    public Service updateService(Long id, Service service) {

        Service existingService =
                serviceRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Service not found"));

        existingService.setName(service.getName());
        existingService.setDescription(service.getDescription());
        existingService.setCategory(service.getCategory());
        existingService.setPrice(service.getPrice());
        existingService.setDuration(service.getDuration());

        return serviceRepository.save(existingService);
    }

    // Delete a service
    public void deleteService(Long id) {

        if (!serviceRepository.existsById(id)) {
            throw new RuntimeException("Service not found");
        }

        serviceRepository.deleteById(id);
    }
}