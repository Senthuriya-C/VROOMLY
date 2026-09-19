package com.vroomly.vroomly.controller;

import com.vroomly.vroomly.model.Service;
import com.vroomly.vroomly.service.ServiceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    // GET all services
    @GetMapping("/service")
    public List<Service> getServices() {
        return serviceService.getAllServices();
    }

    // ADD service
    @PostMapping("/service")
    public Service addService(@RequestBody Service service) {
        return serviceService.addService(service);
    }

    // UPDATE service
    @PutMapping("/service/{id}")
    public Service updateService(
            @PathVariable Long id,
            @RequestBody Service service) {

        return serviceService.updateService(id, service);
    }

    // DELETE service
    @DeleteMapping("/service/{id}")
    public String deleteService(@PathVariable Long id) {

        serviceService.deleteService(id);

        return "Service deleted successfully";
    }
}