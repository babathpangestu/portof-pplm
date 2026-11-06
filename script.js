
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // TAHUN OTOMATIS PADA FOOTER
    // =====================================
    document.querySelectorAll(".year").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    // =====================================
    // NAVIGASI MOBILE
    // =====================================
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("open");
        });
    }


    // =====================================
    // DROPDOWN SIKLUS
    // =====================================
    const dropdownButton = document.querySelector(".nav-drop-button");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    if (dropdownButton && dropdownMenu) {
        dropdownButton.addEventListener("click", function (event) {
            event.stopPropagation();
            dropdownMenu.classList.toggle("show");
        });

        document.addEventListener("click", function (event) {
            if (!event.target.closest(".nav-dropdown")) {
                dropdownMenu.classList.remove("show");
            }
        });
    }


    // =====================================
    // FILTER ARTEFAK
    // =====================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const artifactCards = document.querySelectorAll(".artifact-card");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const category = button.dataset.filter;

            artifactCards.forEach(function (card) {
                const cardCategory = card.dataset.category;
                const show = category === "semua" || category === cardCategory;

                card.style.display = show ? "" : "none";
            });
        });
    });


    // =====================================
    // REFLEKSI
    // =====================================
    // Jawaban refleksi ditulis langsung melalui HTML.
    // Tidak menggunakan textarea, localStorage,
    // maupun input dari browser.


    // =====================================
    // LIGHTBOX GAMBAR
    // =====================================
    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox img");
    const closeButton = document.querySelector(".lightbox-close");

    document.querySelectorAll("[data-lightbox]").forEach(function (image) {
        image.addEventListener("click", function () {

            if (!lightbox || !lightboxImage) return;

            lightboxImage.src = image.src;
            lightbox.classList.add("show");
        });
    });

    if (closeButton && lightbox) {

        closeButton.addEventListener("click", function () {
            lightbox.classList.remove("show");
        });

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                lightbox.classList.remove("show");
            }
        });
    }


    // =====================================
    // TUTUP LIGHTBOX DENGAN TOMBOL ESCAPE
    // =====================================
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" && lightbox) {
            lightbox.classList.remove("show");
        }

    });

});
