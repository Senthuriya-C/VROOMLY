const searchInput =
    document.getElementById("serviceSearch");

const filterButtons =
    document.querySelectorAll(".filter");

const serviceCards =
    document.querySelectorAll(".service-card");

const noResults =
    document.getElementById("noResults");


let currentCategory = "all";


// ==========================================
// FILTER SERVICES
// ==========================================

function filterServices() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    let visibleCount = 0;


    serviceCards.forEach(function(card) {

        const category =
            card.getAttribute("data-category");

        const name =
            card.getAttribute("data-name")
                .toLowerCase();


        const categoryMatch =
            currentCategory === "all" ||
            category === currentCategory;


        const searchMatch =
            name.includes(searchText);


        if (categoryMatch && searchMatch) {

            card.style.display = "flex";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    if (visibleCount === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}



// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    filterServices
);



// ==========================================
// CATEGORY BUTTONS
// ==========================================

filterButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            filterButtons.forEach(function(btn) {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            currentCategory =
                button.getAttribute("data-category");


            filterServices();

        }
    );

});