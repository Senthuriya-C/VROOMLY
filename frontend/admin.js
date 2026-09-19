// ==========================================
// VROOMLY ADMIN DASHBOARD JAVASCRIPT
// ==========================================

const BOOKING_API_URL = "http://localhost:8080/booking";
const VEHICLE_API_URL = "http://localhost:8080/vehicle";
const USER_API_URL = "http://localhost:8080/users";
const SERVICE_API_URL = "http://localhost:8080/service";

let bookings = [];
let vehicles = [];
let users = [];
let services = [];


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("VROOMLY Admin Dashboard Loaded");

    loadBookings();
    loadVehicles();
    loadUsers();
    loadServices();

});


// ==========================================
// LOAD BOOKINGS
// ==========================================

async function loadBookings() {

    try {

        const response = await fetch(BOOKING_API_URL);

        if (!response.ok) {
            throw new Error("Failed to load bookings");
        }

        bookings = await response.json();

        updateBookingCount();
        updateRevenue();
        displayRecentBookings();

    } catch (error) {

        console.error("Booking Error:", error);

    }

}


// ==========================================
// LOAD VEHICLES
// ==========================================

async function loadVehicles() {

    try {

        const response = await fetch(VEHICLE_API_URL);

        if (!response.ok) {
            throw new Error("Failed to load vehicles");
        }

        vehicles = await response.json();

        updateVehicleCount();

    } catch (error) {

        console.error("Vehicle Error:", error);

    }

}


// ==========================================
// LOAD USERS
// ==========================================

async function loadUsers() {

    try {

        const response = await fetch(USER_API_URL);

        if (!response.ok) {
            throw new Error("Failed to load users");
        }

        users = await response.json();

        updateCustomerCount();

    } catch (error) {

        console.error("User Error:", error);

    }

}


// ==========================================
// LOAD SERVICES
// ==========================================

async function loadServices() {

    try {

        const response = await fetch(SERVICE_API_URL);

        if (!response.ok) {
            throw new Error("Failed to load services");
        }

        services = await response.json();

        displayServices();

    } catch (error) {

        console.error("Service Error:", error);

    }

}


// ==========================================
// UPDATE BOOKING COUNT
// ==========================================

function updateBookingCount() {

    const bookingNumber =
        document.querySelector(".stat-card.purple .stat-number");

    if (bookingNumber) {
        bookingNumber.textContent = bookings.length;
    }

}


// ==========================================
// UPDATE VEHICLE COUNT
// ==========================================

function updateVehicleCount() {

    const vehicleNumber =
        document.querySelector(".stat-card.pink .stat-number");

    if (vehicleNumber) {
        vehicleNumber.textContent = vehicles.length;
    }

}


// ==========================================
// UPDATE CUSTOMER COUNT
// ==========================================

function updateCustomerCount() {

    const customerNumber =
        document.querySelector(".stat-card.blue .stat-number");

    if (customerNumber) {
        customerNumber.textContent = users.length;
    }

}


// ==========================================
// UPDATE REVENUE
// ==========================================

function updateRevenue() {

    const revenueNumber =
        document.querySelector(".stat-card.green .stat-number");

    if (!revenueNumber) {
        return;
    }

    const totalRevenue = bookings.reduce(
        (total, booking) =>
            total + Number(booking.price || 0),
        0
    );

    revenueNumber.textContent =
        "₹" + totalRevenue.toLocaleString("en-IN");

}


// ==========================================
// DISPLAY RECENT BOOKINGS
// ==========================================

function displayRecentBookings() {

    const bookingList =
        document.querySelector(".booking-list");

    if (!bookingList) {
        return;
    }

    bookingList.innerHTML = "";

    const recentBookings =
        bookings.slice(-3).reverse();

    if (recentBookings.length === 0) {

        bookingList.innerHTML = `
            <div class="booking-row">
                <div class="booking-info">
                    <strong>No bookings found</strong>
                    <span>No booking records available</span>
                </div>
            </div>
        `;

        return;
    }

    recentBookings.forEach((booking, index) => {

        const initials =
            getInitials(booking.vehicle || "VR");

        const avatarClass =
            index === 0
                ? "purple-avatar"
                : index === 1
                    ? "blue-avatar"
                    : "pink-avatar";

        const status =
            booking.status || "Pending";

        const statusClass =
            status.toLowerCase().replace(/\s+/g, "-");

        const bookingRow =
            document.createElement("div");

        bookingRow.className = "booking-row";

        bookingRow.innerHTML = `
            <div class="customer-avatar ${avatarClass}">
                ${initials}
            </div>

            <div class="booking-info">
                <strong>
                    ${booking.vehicle || "Vehicle"}
                </strong>

                <span>
                    ${booking.service || "Service"} •
                    ${booking.vehicleNumber || "N/A"}
                </span>
            </div>

            <div class="booking-date">
                <strong>
                    ${booking.date || "N/A"}
                </strong>

                <span>
                    ${booking.time || ""}
                </span>
            </div>

            <span class="status ${statusClass}">
                ${status}
            </span>

            <button
                class="more-btn"
                onclick="showBookingDetails(${booking.id})">

                <i class="fa-solid fa-ellipsis"></i>

            </button>
        `;

        bookingList.appendChild(bookingRow);

    });

}


// ==========================================
// DISPLAY SERVICES
// ==========================================

function displayServices() {

    const servicesPanel =
        document.querySelector(".services-panel");

    if (!servicesPanel) {
        return;
    }

    const serviceStats =
        servicesPanel.querySelectorAll(".service-stat");

    if (serviceStats.length === 0) {
        return;
    }

    serviceStats.forEach((card, index) => {

        if (index >= services.length) {

            card.style.display = "none";

            return;
        }

        const service =
            services[index];

        card.style.display = "flex";

        const name =
            card.querySelector(".service-name strong");

        const price =
            card.querySelector(".service-stat > strong");

        const category =
            card.querySelector(".service-name span");

        if (name) {
            name.textContent =
                service.name || "Service";
        }

        if (price) {

            price.textContent =
                "₹" +
                Number(service.price || 0)
                    .toLocaleString("en-IN");

        }

        if (category) {

            category.textContent =
                service.category || "Service";

        }

        // Create action buttons
        let actionBox =
            card.querySelector(".service-actions");

        if (!actionBox) {

            actionBox =
                document.createElement("div");

            actionBox.className =
                "service-actions";

            actionBox.style.display = "flex";
            actionBox.style.gap = "6px";
            actionBox.style.marginLeft = "10px";

            card.appendChild(actionBox);

        }

        actionBox.innerHTML = `

            <button
                type="button"
                title="Edit Service"
                onclick="editService(${service.id})"
                style="
                    border:none;
                    background:#eee9ff;
                    color:#6c4cff;
                    width:34px;
                    height:34px;
                    border-radius:8px;
                    cursor:pointer;
                ">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button
                type="button"
                title="Delete Service"
                onclick="deleteService(${service.id})"
                style="
                    border:none;
                    background:#ffe9ef;
                    color:#e84d75;
                    width:34px;
                    height:34px;
                    border-radius:8px;
                    cursor:pointer;
                ">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

    });

}


// ==========================================
// GET INITIALS
// ==========================================

function getInitials(text) {

    if (!text) {
        return "VR";
    }

    const words =
        text.trim().split(" ");

    if (words.length >= 2) {

        return (
            words[0][0] +
            words[1][0]
        ).toUpperCase();

    }

    return text
        .substring(0, 2)
        .toUpperCase();

}


// ==========================================
// SHOW BOOKING DETAILS
// ==========================================

function showBookingDetails(id) {

    const booking =
        bookings.find(
            item => item.id === id
        );

    if (!booking) {
        return;
    }

    alert(
        "Booking Details\n\n" +

        "Vehicle: " +
        (booking.vehicle || "N/A") +

        "\nVehicle Number: " +
        (booking.vehicleNumber || "N/A") +

        "\nService: " +
        (booking.service || "N/A") +

        "\nDate: " +
        (booking.date || "N/A") +

        "\nTime: " +
        (booking.time || "N/A") +

        "\nCenter: " +
        (booking.center || "N/A") +

        "\nPrice: ₹" +
        (booking.price || 0) +

        "\nStatus: " +
        (booking.status || "Pending")
    );

}


// ==========================================
// FILTER BOOKINGS
// ==========================================

function filterBookings() {

    if (bookings.length === 0) {

        alert("No bookings available.");

        return;
    }

    const statuses = [
        "All",
        "Pending",
        "Confirmed",
        "Completed"
    ];

    const selected =
        prompt(
            "Enter booking status:\n\n" +
            "All\n" +
            "Pending\n" +
            "Confirmed\n" +
            "Completed"
        );

    if (!selected) {
        return;
    }

    const value =
        selected.trim().toLowerCase();

    if (
        !statuses.some(
            status =>
                status.toLowerCase() === value
        )
    ) {

        alert("Invalid status.");

        return;
    }

    if (value === "all") {

        displayRecentBookings();

        return;
    }

    const filtered =
        bookings.filter(
            booking =>
                (booking.status || "Pending")
                    .toLowerCase() === value
        );

    if (filtered.length === 0) {

        alert(
            "No " +
            selected +
            " bookings found."
        );

        return;
    }

    alert(
        filtered.length +
        " " +
        selected +
        " booking(s) found."
    );

}


// ==========================================
// VIEW ALL BOOKINGS
// ==========================================

function viewAllBookings() {

    if (bookings.length === 0) {

        alert("No bookings available.");

        return;
    }

    alert(
        "Total Bookings: " +
        bookings.length
    );

}


// ==========================================
// ADD SERVICE
// ==========================================

async function addService() {

    const name =
        prompt("Enter service name:");

    if (!name || name.trim() === "") {
        return;
    }

    const description =
        prompt("Enter service description:");

    if (!description || description.trim() === "") {
        return;
    }

    const category =
        prompt(
            "Enter service category:\n\n" +
            "Maintenance\n" +
            "Repair\n" +
            "Cleaning\n" +
            "Inspection"
        );

    if (!category || category.trim() === "") {
        return;
    }

    const price =
        prompt("Enter service price:");

    if (!price || isNaN(price)) {

        alert("Please enter a valid price.");

        return;
    }

    const duration =
        prompt("Enter duration in minutes:");

    if (!duration || isNaN(duration)) {

        alert("Please enter a valid duration.");

        return;
    }

    const serviceData = {

        name: name.trim(),

        description: description.trim(),

        category: category.trim(),

        price: Number(price),

        duration: Number(duration)

    };

    try {

        const response =
            await fetch(
                SERVICE_API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(serviceData)
                }
            );

        if (!response.ok) {

            throw new Error(
                "Failed to add service"
            );

        }

        const savedService =
            await response.json();

        services.push(savedService);

        displayServices();

        alert(
            "Service added successfully!\n\n" +
            "Service: " +
            savedService.name +
            "\nPrice: ₹" +
            savedService.price
        );

    } catch (error) {

        console.error(
            "Service Error:",
            error
        );

        alert(
            "Unable to add service.\n\n" +
            "Please make sure Spring Boot is running."
        );

    }

}


// ==========================================
// EDIT SERVICE
// ==========================================

async function editService(id) {

    const service =
        services.find(
            item => item.id === id
        );

    if (!service) {

        alert("Service not found.");

        return;
    }

    const name =
        prompt(
            "Enter service name:",
            service.name || ""
        );

    if (!name || name.trim() === "") {
        return;
    }

    const description =
        prompt(
            "Enter service description:",
            service.description || ""
        );

    if (!description || description.trim() === "") {
        return;
    }

    const category =
        prompt(
            "Enter service category:",
            service.category || ""
        );

    if (!category || category.trim() === "") {
        return;
    }

    const price =
        prompt(
            "Enter service price:",
            service.price || ""
        );

    if (!price || isNaN(price)) {

        alert("Please enter a valid price.");

        return;
    }

    const duration =
        prompt(
            "Enter duration in minutes:",
            service.duration || ""
        );

    if (!duration || isNaN(duration)) {

        alert("Please enter a valid duration.");

        return;
    }

    const updatedService = {

        name: name.trim(),

        description: description.trim(),

        category: category.trim(),

        price: Number(price),

        duration: Number(duration)

    };

    try {

        const response =
            await fetch(
                SERVICE_API_URL + "/" + id,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(updatedService)
                }
            );

        if (!response.ok) {

            throw new Error(
                "Failed to update service"
            );

        }

        const savedService =
            await response.json();

        const index =
            services.findIndex(
                item => item.id === id
            );

        if (index !== -1) {

            services[index] =
                savedService;

        }

        displayServices();

        alert(
            "Service updated successfully!"
        );

    } catch (error) {

        console.error(
            "Edit Service Error:",
            error
        );

        alert(
            "Unable to update service.\n\n" +
            "Please make sure Spring Boot is running."
        );

    }

}


// ==========================================
// DELETE SERVICE
// ==========================================

async function deleteService(id) {

    const service =
        services.find(
            item => item.id === id
        );

    if (!service) {

        alert("Service not found.");

        return;
    }

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this service?\n\n" +
            "Service: " +
            service.name
        );

    if (!confirmDelete) {
        return;
    }

    try {

        const response =
            await fetch(
                SERVICE_API_URL + "/" + id,
                {
                    method: "DELETE"
                }
            );

        if (!response.ok) {

            throw new Error(
                "Failed to delete service"
            );

        }

        services =
            services.filter(
                item => item.id !== id
            );

        displayServices();

        alert(
            "Service deleted successfully!"
        );

    } catch (error) {

        console.error(
            "Delete Service Error:",
            error
        );

        alert(
            "Unable to delete service.\n\n" +
            "Please make sure Spring Boot is running."
        );

    }

}


// ==========================================
// MANAGE CUSTOMERS
// ==========================================

function manageCustomers() {

    alert(
        "Total Registered Customers: " +
        users.length
    );

}


// ==========================================
// MANAGE VEHICLES
// ==========================================

function manageVehicles() {

    alert(
        "Total Registered Vehicles: " +
        vehicles.length
    );

}


// ==========================================
// GENERATE REPORT
// ==========================================

function generateReport() {

    const totalRevenue =
        bookings.reduce(
            (total, booking) =>
                total +
                Number(booking.price || 0),
            0
        );

    alert(
        "Bookings: " +
        bookings.length +

        "\nCustomers: " +
        users.length +

        "\nVehicles: " +
        vehicles.length +

        "\nServices: " +
        services.length +

        "\nRevenue: ₹" +
        totalRevenue.toLocaleString("en-IN")
    );

}


// ==========================================
// LOGOUT
// ==========================================

function logoutAdmin(event) {

    event.preventDefault();

    window.location.href =
        "login.html";

}