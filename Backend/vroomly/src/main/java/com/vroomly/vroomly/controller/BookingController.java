package com.vroomly.vroomly.controller;

import com.vroomly.vroomly.model.Booking;
import com.vroomly.vroomly.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // GET all bookings
    @GetMapping("/booking")
    public List<Booking> getBookings() {
        return bookingService.getAllBookings();
    }

    // ADD booking
    @PostMapping("/booking")
    public Booking addBooking(@RequestBody Booking booking) {
        return bookingService.addBooking(booking);
    }

    // UPDATE booking
    @PutMapping("/booking/{id}")
    public Booking updateBooking(
            @PathVariable Long id,
            @RequestBody Booking booking) {

        return bookingService.updateBooking(id, booking);
    }

    // DELETE booking
    @DeleteMapping("/booking/{id}")
    public String deleteBooking(@PathVariable Long id) {

        bookingService.deleteBooking(id);

        return "Booking deleted successfully";
    }
}