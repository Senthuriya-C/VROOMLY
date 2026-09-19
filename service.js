const searchInput = document.getElementById("serviceSearch");
const filterButtons = document.querySelectorAll(".filter");
const serviceCards = document.querySelectorAll(".service-card");
const noResults = document.getElementById("noResults");

let selectedCategory = "all";


// ===============================
// FILTER SERVICES
// ===============================

function filterServices() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    let visibleCount = 0;

    serviceCards.forEach(card => {

        const category =
            card.dataset.category;

        const name =
            card.dataset.name.toLowerCase();

        const title =
            card.querySelector("h3")
                .textContent
                .toLowerCase();

        const description =
            card.querySelector("p")
                .textContent
                .toLowerCase();


        const categoryMatch =
            selectedCategory === "all" ||
            category === selectedCategory;


        const searchMatch =
            name.includes(searchText) ||
            title.includes(searchText) ||
            description.includes(searchText);


        if (categoryMatch && searchMatch) {

            card.style.display = "block";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    // Update count

    //serviceCount.textContent =
        //visibleCount + " services available";


    // No result message

    if (visibleCount === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


// ===============================
// SEARCH
// ===============================

searchInput.addEventListener(
    "input",
    filterServices
);


// ===============================
// CATEGORY FILTER
// ===============================

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        selectedCategory =
            this.dataset.category;

        filterServices();

    });

});


// ===============================
// BOOK SERVICE
// ===============================

function bookService(service, price, duration) {

    // Save selected service

    localStorage.setItem(
        "selectedService",
        service
    );

    localStorage.setItem(
        "selectedPrice",
        price
    );

    localStorage.setItem(
        "selectedDuration",
        duration
    );


    // Go to booking page

    window.location.href =
        "booking.html";

}