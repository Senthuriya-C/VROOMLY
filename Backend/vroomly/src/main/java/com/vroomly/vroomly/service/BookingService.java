package com.vroomly.vroomly.service;

import com.vroomly.vroomly.model.Booking;
import com.vroomly.vroomly.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking addBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Long id, Booking booking) {

        Booking existingBooking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        existingBooking.setBookingId(booking.getBookingId());
        existingBooking.setVehicle(booking.getVehicle());
        existingBooking.setVehicleNumber(booking.getVehicleNumber());
        existingBooking.setService(booking.getService());
        existingBooking.setDate(booking.getDate());
        existingBooking.setTime(booking.getTime());
        existingBooking.setCenter(booking.getCenter());
        existingBooking.setPrice(booking.getPrice());
        existingBooking.setNotes(booking.getNotes());
        existingBooking.setStatus(booking.getStatus());

        return bookingRepository.save(existingBooking);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}