// ==========================================
// VROOMLY BOOKING JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // GET ELEMENTS
    // ======================================

    const vehicleOptions =
        document.querySelectorAll(".vehicle-option");

    const vehicleNumber =
        document.getElementById("vehicleNumber");

    const service =
        document.getElementById("service");

    const date =
        document.getElementById("date");

    const time =
        document.getElementById("time");

    const center =
        document.getElementById("center");

    const notes =
        document.getElementById("notes");


    // ======================================
    // SET TODAY AS MINIMUM DATE
    // ======================================

    const today =
        new Date().toISOString().split("T")[0];

    date.min = today;


    // ======================================
    // VEHICLE SELECTION
    // ======================================

    vehicleOptions.forEach(function (option) {

        option.addEventListener("click", function () {

            // Remove selected from all
            vehicleOptions.forEach(function (item) {

                item.classList.remove("selected");

            });


            // Select clicked vehicle
            option.classList.add("selected");


            // Update vehicle summary
            updateVehicleSummary();

        });

    });


    // ======================================
    // SERVICE FROM URL
    // ======================================

    const urlParams =
        new URLSearchParams(window.location.search);

    const selectedService =
        urlParams.get("service");


    if (selectedService) {

        const options =
            service.options;


        for (let i = 0; i < options.length; i++) {

            if (
                options[i].value.toLowerCase() ===
                selectedService.toLowerCase()
            ) {

                service.selectedIndex = i;

                break;

            }

        }

    }


    // ======================================
    // UPDATE SUMMARY EVENTS
    // ======================================

    vehicleNumber.addEventListener(
        "input",
        updateVehicleSummary
    );


    service.addEventListener(
        "change",
        updateSummary
    );


    date.addEventListener(
        "change",
        updateSummary
    );


    time.addEventListener(
        "change",
        updateSummary
    );


    center.addEventListener(
        "change",
        updateSummary
    );


    // ======================================
    // INITIAL SUMMARY
    // ======================================

    updateSummary();

    updateVehicleSummary();

});


// ==========================================
// VEHICLE SUMMARY
// ==========================================

function updateVehicleSummary() {

    const selectedVehicle =
        document.querySelector(
            ".vehicle-option.selected"
        );


    const summaryVehicle =
        document.getElementById(
            "summaryVehicle"
        );


    const summaryPlate =
        document.getElementById(
            "summaryPlate"
        );


    const summaryIcon =
        document.getElementById(
            "summaryVehicleIcon"
        );


    if (!selectedVehicle) {
        return;
    }


    // Get selected vehicle
    const vehicle =
        selectedVehicle.dataset.vehicle;


    // Show vehicle
    summaryVehicle.textContent =
        vehicle;


    // ======================================
    // CHANGE VEHICLE ICON
    // ======================================

    if (vehicle === "My Bike") {

        summaryIcon.innerHTML =
            '<i class="fa-solid fa-motorcycle"></i>';

    } else {

        summaryIcon.innerHTML =
            '<i class="fa-solid fa-car-side"></i>';

    }


    // ======================================
    // GET NUMBER PLATE
    // ======================================

    const plateInput =
        document.getElementById(
            "vehicleNumber"
        );


    const plate =
        plateInput.value.trim();


    if (plate) {

        summaryPlate.textContent =
            plate.toUpperCase();

    } else {

        summaryPlate.textContent =
            "Number plate not entered";

    }

}


// ==========================================
// UPDATE COMPLETE SUMMARY
// ==========================================

function updateSummary() {

    // Update vehicle information
    updateVehicleSummary();


    // ======================================
    // GET ELEMENTS
    // ======================================

    const service =
        document.getElementById(
            "service"
        );


    const date =
        document.getElementById(
            "date"
        );


    const time =
        document.getElementById(
            "time"
        );


    const center =
        document.getElementById(
            "center"
        );


    const summaryService =
        document.getElementById(
            "summaryService"
        );


    const summaryDate =
        document.getElementById(
            "summaryDate"
        );


    const summaryTime =
        document.getElementById(
            "summaryTime"
        );


    const summaryCenter =
        document.getElementById(
            "summaryCenter"
        );


    const summaryPrice =
        document.getElementById(
            "summaryPrice"
        );


    // ======================================
    // SERVICE
    // ======================================

    if (service.value) {

        summaryService.textContent =
            service.value;

    } else {

        summaryService.textContent =
            "Not selected";

    }


    // ======================================
    // DATE
    // ======================================

    if (date.value) {

        const selectedDate =
            new Date(
                date.value + "T00:00:00"
            );


        summaryDate.textContent =
            selectedDate.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

    } else {

        summaryDate.textContent =
            "Not selected";

    }


    // ======================================
    // TIME
    // ======================================

    if (time.value) {

        summaryTime.textContent =
            time.value;

    } else {

        summaryTime.textContent =
            "Not selected";

    }


    // ======================================
    // CENTER
    // ======================================

    if (center.value) {

        summaryCenter.textContent =
            center.value;

    } else {

        summaryCenter.textContent =
            "Not selected";

    }


    // ======================================
    // PRICE
    // ======================================

    const selectedOption =
        service.options[
            service.selectedIndex
        ];


    if (
        selectedOption &&
        selectedOption.dataset.price
    ) {

        const price =
            Number(
                selectedOption.dataset.price
            );


        summaryPrice.textContent =
            "₹" +
            price.toLocaleString("en-IN");

    } else {

        summaryPrice.textContent =
            "₹0";

    }

}


// ==========================================
// CONFIRM BOOKING
// ==========================================

async function confirmBooking() {

    // ======================================
    // GET VALUES
    // ======================================

    const selectedVehicle =
        document.querySelector(
            ".vehicle-option.selected"
        );


    const vehicleNumber =
        document.getElementById(
            "vehicleNumber"
        ).value.trim();


    const service =
        document.getElementById(
            "service"
        ).value;


    const date =
        document.getElementById(
            "date"
        ).value;


    const time =
        document.getElementById(
            "time"
        ).value;


    const center =
        document.getElementById(
            "center"
        ).value;


    const notes =
        document.getElementById(
            "notes"
        ).value.trim();


    // ======================================
    // VALIDATION
    // ======================================

    if (!selectedVehicle) {

        alert(
            "Please select your vehicle."
        );

        return;

    }


    if (!vehicleNumber) {

        alert(
            "Please enter your vehicle number plate."
        );


        document
            .getElementById("vehicleNumber")
            .focus();


        return;

    }


    if (!service) {

        alert(
            "Please select a service."
        );

        return;

    }


    if (!date) {

        alert(
            "Please select a service date."
        );

        return;

    }


    if (!time) {

        alert(
            "Please select a preferred time."
        );

        return;

    }


    if (!center) {

        alert(
            "Please select a service center."
        );

        return;

    }


    // ======================================
    // NUMBER PLATE VALIDATION
    // ======================================

    const platePattern =
        /^[A-Za-z0-9 -]{4,15}$/;


    if (
        !platePattern.test(vehicleNumber)
    ) {

        alert(
            "Please enter a valid vehicle number."
        );


        document
            .getElementById("vehicleNumber")
            .focus();


        return;

    }


    // ======================================
    // GET VEHICLE
    // ======================================

    const vehicle =
        selectedVehicle.dataset.vehicle;


    // ======================================
    // GET PRICE
    // ======================================

    const serviceSelect =
        document.getElementById(
            "service"
        );


    const selectedOption =
        serviceSelect.options[
            serviceSelect.selectedIndex
        ];


    const price =
        Number(
            selectedOption.dataset.price || 0
        );


    // ======================================
    // GENERATE BOOKING ID
    // ======================================

    const bookingId =
        "VRM" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    // ======================================
    // CREATE BOOKING OBJECT
    // ======================================

    const bookingData = {

        bookingId: bookingId,

        vehicle: vehicle,

        vehicleNumber:
            vehicleNumber.toUpperCase(),

        service: service,

        date: date,

        time: time,

        center: center,

        price: price,

        notes: notes,

        status: "Upcoming"

    };


    // ======================================
    // SEND BOOKING TO SPRING BOOT
    // ======================================

    try {

        const response =
            await fetch(
                "http://localhost:8080/booking",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            bookingData
                        )
                }
            );


        // ==================================
        // CHECK RESPONSE
        // ==================================

        if (!response.ok) {

            throw new Error(
                "Booking could not be saved"
            );

        }


        // ==================================
        // GET SAVED BOOKING
        // ==================================

        const savedBooking =
            await response.json();


        console.log(
            "Booking saved successfully:",
            savedBooking
        );


        // ==================================
        // SAVE IN LOCAL STORAGE ALSO
        // ==================================

        localStorage.setItem(
            "vroomlyBooking",
            JSON.stringify(
                savedBooking
            )
        );


        // ==================================
        // SHOW SUCCESS DETAILS
        // ==================================

        document.getElementById(
            "bookingId"
        ).textContent =
            savedBooking.bookingId;


        document.getElementById(
            "successVehicle"
        ).textContent =
            savedBooking.vehicle;


        document.getElementById(
            "successPlate"
        ).textContent =
            savedBooking.vehicleNumber;


        document.getElementById(
            "successService"
        ).textContent =
            savedBooking.service;


        // ==================================
        // SHOW SUCCESS MODAL
        // ==================================

        document.getElementById(
            "successModal"
        ).classList.add("show");

    }


    // ======================================
    // ERROR HANDLING
    // ======================================

    catch (error) {

        console.error(
            "Booking Error:",
            error
        );


        alert(
            "Unable to save booking. Please make sure Spring Boot is running."
        );

    }

}


// ==========================================
// CLOSE MODAL
// ==========================================

function closeModal() {

    document.getElementById(
        "successModal"
    ).classList.remove("show");

}


// ==========================================
// GO TO DASHBOARD
// ==========================================

function goToDashboard() {

    window.location.href =
        "dashboard.html";

}


// ==========================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "successModal"
            );


        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);