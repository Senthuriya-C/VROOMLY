// ==========================================
// VROOMLY DASHBOARD JAVASCRIPT
// ==========================================


// ==========================================
// API URLS
// ==========================================

const VEHICLE_API_URL =
    "http://localhost:8080/vehicle";

const BOOKING_API_URL =
    "http://localhost:8080/booking";


// ==========================================
// GET USER INFORMATION
// ==========================================

const userName =
    document.getElementById("userName");

const savedName =
    localStorage.getItem("vroomlyUserName");

const savedEmail =
    localStorage.getItem("vroomlyUserEmail");


if (userName) {

    if (savedName) {

        userName.textContent =
            savedName;

    } else if (savedEmail) {

        userName.textContent =
            savedEmail.split("@")[0];

    }

}


// ==========================================
// LOAD DASHBOARD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadBookings();

        updateVehicleOverview();

    }
);


// ==========================================
// GET BOOKINGS FROM BACKEND
// ==========================================

async function loadBookings() {

    try {

        const response =
            await fetch(BOOKING_API_URL);


        if (!response.ok) {

            throw new Error(
                "Failed to load bookings"
            );

        }


        const bookings =
            await response.json();


        console.log(
            "Bookings loaded:",
            bookings
        );


        updateStatistics(bookings);

        displayUpcomingBooking(bookings);

        displayBookingManagement(bookings);

        displayBookingHistory(bookings);


    } catch (error) {

        console.error(
            "Booking loading error:",
            error
        );


        const bookingList =
            document.getElementById(
                "bookingList"
            );


        if (bookingList) {

            bookingList.innerHTML = `
                <p>
                    Unable to load bookings.
                    Make sure Spring Boot is running.
                </p>
            `;

        }

    }

}


// ==========================================
// UPDATE STATISTICS
// ==========================================

function updateStatistics(bookings) {

    const totalBookings =
        document.getElementById(
            "totalBookings"
        );

    const upcomingBookings =
        document.getElementById(
            "upcomingBookings"
        );

    const totalSpending =
        document.getElementById(
            "totalSpending"
        );


    if (
        !totalBookings ||
        !upcomingBookings ||
        !totalSpending
    ) {

        return;

    }


    // Total bookings

    totalBookings.textContent =
        bookings.length;


    // Upcoming bookings
    // Only "Upcoming" status is counted

    const upcoming =
        bookings.filter(function (booking) {

            return booking.status ===
                "Upcoming";

        });


    upcomingBookings.textContent =
        upcoming.length;


    // Total spending

    const spending =
        bookings.reduce(
            function (total, booking) {

                return total +
                    Number(
                        booking.price || 0
                    );

            },
            0
        );


    totalSpending.textContent =
        "₹" +
        spending.toLocaleString(
            "en-IN"
        );

}


// ==========================================
// DISPLAY UPCOMING BOOKING
// ==========================================

function displayUpcomingBooking(bookings) {

    const upcomingContent =
        document.getElementById(
            "upcomingContent"
        );


    if (!upcomingContent) {

        return;

    }


    // Only "Upcoming" bookings are shown

    const upcoming =
        bookings.filter(function (booking) {

            return booking.status ===
                "Upcoming";

        });


    if (upcoming.length === 0) {

        upcomingContent.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">

                    <i class="fa-solid fa-calendar-xmark"></i>

                </div>

                <h3>
                    No Upcoming Booking
                </h3>

                <p>
                    You don't have any upcoming
                    service bookings.
                </p>

                <a
                    href="booking.html"
                    class="primary-btn">

                    <i class="fa-solid fa-calendar-plus"></i>

                    Book a Service

                </a>

            </div>

        `;

        return;

    }


    // Show first upcoming booking

    const booking =
        upcoming[0];


    let formattedDate =
        booking.date || "Not selected";


    if (booking.date) {

        const date =
            new Date(
                booking.date +
                "T00:00:00"
            );


        formattedDate =
            date.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

    }


    upcomingContent.innerHTML = `

        <div class="booking-display">

            <div class="booking-top">

                <div class="booking-service-icon">

                    <i class="fa-solid fa-wrench"></i>

                </div>

                <div>

                    <span>
                        BOOKING ID
                    </span>

                    <strong>
                        ${booking.bookingId || "VROOMLY"}
                    </strong>

                </div>

            </div>


            <div class="booking-details">


                <div class="booking-detail">

                    <span>
                        SERVICE
                    </span>

                    <strong>
                        ${booking.service || "Not selected"}
                    </strong>

                </div>


                <div class="booking-detail">

                    <span>
                        VEHICLE
                    </span>

                    <strong>
                        ${booking.vehicle || "Not selected"}
                    </strong>

                </div>


                <div class="booking-detail">

                    <span>
                        VEHICLE NUMBER
                    </span>

                    <strong>
                        ${booking.vehicleNumber || "Not entered"}
                    </strong>

                </div>


                <div class="booking-detail">

                    <span>
                        DATE
                    </span>

                    <strong>
                        ${formattedDate}
                    </strong>

                </div>


                <div class="booking-detail">

                    <span>
                        TIME
                    </span>

                    <strong>
                        ${booking.time || "Not selected"}
                    </strong>

                </div>


                <div class="booking-detail">

                    <span>
                        SERVICE CENTER
                    </span>

                    <strong>
                        ${booking.center || "Not selected"}
                    </strong>

                </div>


                <div class="booking-detail">

                    <span>
                        ESTIMATED PRICE
                    </span>

                    <strong>
                        ₹${Number(
                            booking.price || 0
                        ).toLocaleString("en-IN")}
                    </strong>

                </div>


                <div class="booking-detail">

                    <span>
                        STATUS
                    </span>

                    <strong>
                        ${booking.status || "Upcoming"}
                    </strong>

                </div>


            </div>

        </div>

    `;

}


// ==========================================
// BOOKING MANAGEMENT
// ==========================================

function displayBookingManagement(bookings) {

    const bookingList =
        document.getElementById(
            "bookingList"
        );


    if (!bookingList) {

        return;

    }


    if (bookings.length === 0) {

        bookingList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">

                    <i class="fa-solid fa-calendar-xmark"></i>

                </div>

                <h3>
                    No Bookings Found
                </h3>

                <p>
                    Your bookings will appear here.
                </p>

                <a
                    href="booking.html"
                    class="primary-btn">

                    <i class="fa-solid fa-calendar-plus"></i>

                    Book a Service

                </a>

            </div>

        `;

        return;

    }


    bookingList.innerHTML =
        bookings.map(function (booking) {


            let formattedDate =
                booking.date || "Not selected";


            if (booking.date) {

                const date =
                    new Date(
                        booking.date +
                        "T00:00:00"
                    );


                formattedDate =
                    date.toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }
                    );

            }


            return `

                <div
                    class="booking-item"
                    style="
                        padding: 20px;
                        margin-bottom: 15px;
                        border: 1px solid #ddd;
                        border-radius: 12px;
                    ">


                    <div>

                        <strong>
                            ${booking.service || "Service"}
                        </strong>

                        <p>
                            Booking ID:
                            ${booking.bookingId || "-"}
                        </p>

                        <p>
                            Vehicle:
                            ${booking.vehicle || "-"}
                        </p>

                        <p>
                            Number:
                            ${booking.vehicleNumber || "-"}
                        </p>

                        <p>
                            Date:
                            ${formattedDate}
                        </p>

                        <p>
                            Time:
                            ${booking.time || "-"}
                        </p>

                        <p>
                            Center:
                            ${booking.center || "-"}
                        </p>

                        <p>
                            Price:
                            ₹${Number(
                                booking.price || 0
                            ).toLocaleString("en-IN")}
                        </p>

                        <p>
                            Status:
                            ${booking.status || "Upcoming"}
                        </p>

                    </div>


                    <div
                        style="
                            margin-top: 15px;
                            display: flex;
                            gap: 10px;
                            align-items: center;
                            flex-wrap: wrap;
                        ">


                        <!-- STATUS -->

                        <select
                            id="status-${booking.id}"
                            style="
                                padding: 8px;
                                border-radius: 6px;
                            ">

                            <option
                                value="Upcoming"
                                ${booking.status === "Upcoming"
                                    ? "selected"
                                    : ""}>

                                Upcoming

                            </option>


                            <option
                                value="Completed"
                                ${booking.status === "Completed"
                                    ? "selected"
                                    : ""}>

                                Completed

                            </option>


                            <option
                                value="Cancelled"
                                ${booking.status === "Cancelled"
                                    ? "selected"
                                    : ""}>

                                Cancelled

                            </option>

                        </select>


                        <!-- UPDATE -->

                        <button
                            onclick="updateBookingStatus(
                                ${booking.id}
                            )">

                            <i class="fa-solid fa-pen"></i>

                            Update Status

                        </button>


                        <!-- DELETE -->

                        <button
                            onclick="deleteBooking(
                                ${booking.id}
                            )">

                            <i class="fa-solid fa-trash"></i>

                            Delete

                        </button>


                    </div>

                </div>

            `;

        }).join("");

}


// ==========================================
// UPDATE BOOKING STATUS
// ==========================================

async function updateBookingStatus(id) {

    try {

        // Get all bookings first

        const response =
            await fetch(
                BOOKING_API_URL
            );


        if (!response.ok) {

            throw new Error(
                "Unable to get booking"
            );

        }


        const bookings =
            await response.json();


        const booking =
            bookings.find(function (item) {

                return item.id === id;

            });


        if (!booking) {

            alert(
                "Booking not found."
            );

            return;

        }


        const statusSelect =
            document.getElementById(
                `status-${id}`
            );


        if (!statusSelect) {

            alert(
                "Status selector not found."
            );

            return;

        }


        const newStatus =
            statusSelect.value;


        // Update only status

        booking.status =
            newStatus;


        const updateResponse =
            await fetch(
                `${BOOKING_API_URL}/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            booking
                        )
                }
            );


        if (!updateResponse.ok) {

            throw new Error(
                "Booking update failed"
            );

        }


        alert(
            "Booking status updated successfully!"
        );


        loadBookings();


    } catch (error) {

        console.error(
            "Booking update error:",
            error
        );


        alert(
            "Unable to update booking."
        );

    }

}


// ==========================================
// DELETE BOOKING
// ==========================================

async function deleteBooking(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this booking?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response =
            await fetch(
                `${BOOKING_API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Booking delete failed"
            );

        }


        alert(
            "Booking deleted successfully!"
        );


        loadBookings();


    } catch (error) {

        console.error(
            "Booking delete error:",
            error
        );


        alert(
            "Unable to delete booking."
        );

    }

}


// ==========================================
// BOOKING HISTORY
// ==========================================

function displayBookingHistory(bookings) {

    const historyContent =
        document.querySelector(
            ".history-content"
        );


    if (!historyContent) {

        return;

    }


    const completedBookings =
        bookings.filter(function (booking) {

            return booking.status ===
                "Completed";

        });


    if (completedBookings.length === 0) {

        historyContent.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">

                    <i class="fa-solid fa-receipt"></i>

                </div>

                <h3>
                    No Service History
                </h3>

                <p>
                    Your completed service bookings
                    will appear here.
                </p>

            </div>

        `;

        return;

    }


    historyContent.innerHTML =
        completedBookings.map(
            function (booking) {

                return `

                    <div
                        class="booking-history-item"
                        style="
                            padding: 15px;
                            margin-bottom: 10px;
                            border: 1px solid #ddd;
                            border-radius: 10px;
                        ">

                        <strong>
                            ${booking.service}
                        </strong>

                        <p>
                            Booking ID:
                            ${booking.bookingId}
                        </p>

                        <p>
                            Vehicle:
                            ${booking.vehicle}
                        </p>

                        <p>
                            Date:
                            ${booking.date}
                        </p>

                        <p>
                            Status:
                            Completed
                        </p>

                    </div>

                `;

            }
        ).join("");

}


// ==========================================
// UPDATE VEHICLE OVERVIEW
// ==========================================

async function updateVehicleOverview() {

    try {

        const response =
            await fetch(
                VEHICLE_API_URL
            );


        if (!response.ok) {

            return;

        }


        const vehicles =
            await response.json();


        const vehicleType =
            document.getElementById(
                "vehicleType"
            );


        if (!vehicleType) {

            return;

        }


        if (vehicles.length > 0) {

            const firstVehicle =
                vehicles[0];


            vehicleType.textContent =
                firstVehicle.brand +
                " " +
                firstVehicle.model;

        } else {

            vehicleType.textContent =
                "Car";

        }


    } catch (error) {

        console.error(
            "Vehicle overview error:",
            error
        );

    }

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem(
        "vroomlyUserEmail"
    );


    localStorage.removeItem(
        "vroomlyUserName"
    );


    window.location.href =
        "login.html";

}


// ==========================================
// VEHICLE MANAGEMENT
// ==========================================


// ==========================================
// OPEN VEHICLE MANAGER
// ==========================================

function openVehicleManager() {

    const manager =
        document.getElementById(
            "vehicleManager"
        );


    if (!manager) {

        return;

    }


    manager.style.display =
        "block";


    loadVehicles();


    manager.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// GET VEHICLES
// ==========================================

async function loadVehicles() {

    const vehicleList =
        document.getElementById(
            "vehicleList"
        );


    if (!vehicleList) {

        return;

    }


    vehicleList.innerHTML =
        "<p>Loading vehicles...</p>";


    try {

        const response =
            await fetch(
                VEHICLE_API_URL
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load vehicles"
            );

        }


        const vehicles =
            await response.json();


        displayVehicles(
            vehicles
        );


        updateVehicleOverview();


    } catch (error) {

        console.error(
            error
        );


        vehicleList.innerHTML = `

            <p>
                Unable to load vehicles.
                Make sure Spring Boot is running.
            </p>

        `;

    }

}


// ==========================================
// DISPLAY VEHICLES
// ==========================================

function displayVehicles(
    vehicles
) {

    const vehicleList =
        document.getElementById(
            "vehicleList"
        );


    if (!vehicleList) {

        return;

    }


    if (vehicles.length === 0) {

        vehicleList.innerHTML =
            "<p>No vehicles found.</p>";

        return;

    }


    vehicleList.innerHTML =
        vehicles.map(
            function (vehicle) {

                return `

                    <div class="vehicle-item">

                        <div>

                            <strong>
                                ${vehicle.brand}
                                ${vehicle.model}
                            </strong>

                            <span>
                                ₹${Number(
                                    vehicle.pricePerDay
                                ).toLocaleString("en-IN")}
                                / day
                            </span>

                        </div>


                        <div>

                            <button
                                onclick="editVehicle(
                                    ${vehicle.id},
                                    '${vehicle.brand}',
                                    '${vehicle.model}',
                                    ${vehicle.pricePerDay}
                                )">

                                Edit

                            </button>


                            <button
                                onclick="deleteVehicle(
                                    ${vehicle.id}
                                )">

                                Delete

                            </button>

                        </div>

                    </div>

                `;

            }
        ).join("");

}


// ==========================================
// ADD / UPDATE VEHICLE
// ==========================================

async function saveVehicle() {

    const id =
        document.getElementById(
            "vehicleId"
        ).value;


    const brand =
        document.getElementById(
            "vehicleBrand"
        ).value.trim();


    const model =
        document.getElementById(
            "vehicleModel"
        ).value.trim();


    const pricePerDay =
        Number(
            document.getElementById(
                "vehiclePrice"
            ).value
        );


    if (
        !brand ||
        !model ||
        !pricePerDay
    ) {

        alert(
            "Please fill all vehicle details."
        );

        return;

    }


    const vehicle = {

        brand: brand,

        model: model,

        pricePerDay:
            pricePerDay

    };


    try {

        let response;


        // UPDATE

        if (id) {

            response =
                await fetch(
                    `${VEHICLE_API_URL}/${id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                vehicle
                            )
                    }
                );

        }


        // ADD

        else {

            response =
                await fetch(
                    VEHICLE_API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                vehicle
                            )
                    }
                );

        }


        if (!response.ok) {

            throw new Error(
                "Vehicle save failed"
            );

        }


        alert(
            id
                ? "Vehicle updated successfully!"
                : "Vehicle added successfully!"
        );


        clearVehicleForm();


        loadVehicles();


    } catch (error) {

        console.error(
            error
        );


        alert(
            "Unable to save vehicle."
        );

    }

}


// ==========================================
// EDIT VEHICLE
// ==========================================

function editVehicle(
    id,
    brand,
    model,
    price
) {

    document.getElementById(
        "vehicleId"
    ).value =
        id;


    document.getElementById(
        "vehicleBrand"
    ).value =
        brand;


    document.getElementById(
        "vehicleModel"
    ).value =
        model;


    document.getElementById(
        "vehiclePrice"
    ).value =
        price;

}


// ==========================================
// DELETE VEHICLE
// ==========================================

async function deleteVehicle(
    id
) {

    if (
        !confirm(
            "Are you sure you want to delete this vehicle?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `${VEHICLE_API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Delete failed"
            );

        }


        alert(
            "Vehicle deleted successfully!"
        );


        loadVehicles();


    } catch (error) {

        console.error(
            error
        );


        alert(
            "Unable to delete vehicle."
        );

    }

}


// ==========================================
// CLEAR VEHICLE FORM
// ==========================================

function clearVehicleForm() {

    document.getElementById(
        "vehicleId"
    ).value = "";


    document.getElementById(
        "vehicleBrand"
    ).value = "";


    document.getElementById(
        "vehicleModel"
    ).value = "";


    document.getElementById(
        "vehiclePrice"
    ).value = "";

}