document.addEventListener("DOMContentLoaded", function () {
    // Tahun otomatis pada footer
    document.querySelectorAll(".year").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // Navigasi mobile
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("open");
        });
    }

    // Dropdown siklus
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

    // Filter artefak
    const filterButtons = document.querySelectorAll(".filter-btn");
    const artifactCards = document.querySelectorAll(".artifact-card");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const category = button.dataset.filter;

            artifactCards.forEach(function (card) {
                const cardCategory = card.dataset.category;
                const show = category === "semua" || category === cardCategory;
                card.style.display = show ? "" : "none";
            });
        });
    });

    // Penyimpanan otomatis untuk kolom refleksi
    const pageName = location.pathname.split("/").pop() || "index.html";
    const storagePrefix = "ppg-portfolio-" + pageName + "-";

    document.querySelectorAll("textarea[data-save]").forEach(function (textarea, index) {
        const key = storagePrefix + (textarea.dataset.save || index);
        const savedValue = localStorage.getItem(key);

        if (savedValue !== null) {
            textarea.value = savedValue;
        }

        textarea.addEventListener("input", function () {
            localStorage.setItem(key, textarea.value);
        });
    });

    // Lightbox gambar
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

    // Tutup lightbox dengan tombol Escape
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && lightbox) {
            lightbox.classList.remove("show");
        }
    });
});

// ==========================================
// GENERATOR HALAMAN PRAKTIK MENGAJAR
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    const cycleNumber = Number(document.body.dataset.cycle);
    const root = document.getElementById("cycle-root");

    if (!root || !cycleNumber) return;

    const cycleDescriptions = {
        1: "Dokumentasi perencanaan, pelaksanaan, asesmen, dan refleksi praktik mengajar siklus pertama.",
        2: "Dokumentasi pengembangan praktik pembelajaran, penerapan strategi, dan refleksi siklus kedua.",
        3: "Dokumentasi pelaksanaan pembelajaran, pengembangan kompetensi, serta evaluasi siklus ketiga.",
        4: "Dokumentasi praktik pembelajaran dan refleksi akhir sebagai bagian dari perjalanan PPG."
    };

    const sections = [
        {
            id: "rancangan",
            title: "Rancangan dan Perencanaan Pembelajaran",
            description: "Dokumen perencanaan yang menjadi pedoman pelaksanaan pembelajaran.",
            documents: [
                ["Modul Ajar / RPP", "Dokumen perencanaan pembelajaran yang disusun berdasarkan tujuan pembelajaran."],
                ["LKPD", "Lembar kerja yang digunakan untuk memandu aktivitas peserta didik."]
            ],
            prompts: [
                "Bagaimana proses penyusunan perencanaan pembelajaran pada siklus ini?",
                "Apa pertimbangan dalam menentukan model, metode, dan strategi pembelajaran?"
            ]
        },
        {
            id: "materi",
            title: "Materi Pembelajaran",
            description: "Bahan ajar dan materi yang digunakan untuk mendukung proses belajar.",
            documents: [
                ["Bahan Ajar", "Dokumen materi yang disampaikan kepada peserta didik."],
                ["Analisis Materi", "Catatan analisis kesesuaian materi dengan tujuan pembelajaran."]
            ],
            prompts: [
                "Bagaimana materi disesuaikan dengan karakteristik dan kebutuhan peserta didik?",
                "Bagian materi apa yang memerlukan penjelasan atau penguatan lebih lanjut?"
            ]
        },
        {
            id: "media",
            title: "Media Pembelajaran",
            description: "Dokumentasi media dan sumber belajar yang digunakan.",
            documents: [
                ["Media Utama", "Tautan atau dokumentasi media pembelajaran utama."],
                ["Media Pendukung", "Tautan atau dokumentasi media pendukung pembelajaran."]
            ],
            prompts: [
                "Apa alasan pemilihan media pembelajaran tersebut?",
                "Bagaimana media direncanakan untuk membantu peserta didik memahami materi?"
            ]
        },
        {
            id: "video",
            title: "Pelaksanaan Praktik Mengajar",
            description: "Dokumentasi proses pelaksanaan pembelajaran di kelas.",
            documents: [
                ["Video Praktik Mengajar", "Masukkan tautan video pelaksanaan praktik mengajar."],
                ["Dokumentasi Kegiatan", "Masukkan tautan foto atau dokumentasi kegiatan pembelajaran."]
            ],
            prompts: [
                "Bagaimana proses pembelajaran berlangsung berdasarkan pengamatan dan dokumentasi?",
                "Apa tantangan yang muncul selama pelaksanaan pembelajaran dan bagaimana penanganannya?"
            ]
        },
        {
            id: "asesmen",
            title: "Asesmen dan Evaluasi Pembelajaran",
            description: "Instrumen dan dokumentasi penilaian untuk mengetahui perkembangan belajar peserta didik.",
            documents: [
                ["Instrumen Penilaian", "Dokumen soal, lembar observasi, atau instrumen asesmen."],
                ["Hasil dan Analisis", "Dokumentasi hasil penilaian dan analisis ketercapaian pembelajaran."]
            ],
            prompts: [
                "Bagaimana asesmen digunakan untuk mengetahui ketercapaian tujuan pembelajaran?",
                "Apa tindak lanjut yang dapat dilakukan berdasarkan hasil asesmen?"
            ]
        },
        {
            id: "nonmengajar",
            title: "Kegiatan Nonmengajar",
            description: "Dokumentasi keterlibatan dalam kegiatan sekolah di luar kegiatan mengajar.",
            documents: [
                ["Dokumentasi Kegiatan", "Masukkan tautan foto atau dokumentasi kegiatan nonmengajar."],
                ["Deskripsi Kegiatan", "Tuliskan bentuk keterlibatan dan kontribusi dalam kegiatan sekolah."]
            ],
            prompts: [
                "Apa pengalaman dan pembelajaran yang diperoleh melalui kegiatan nonmengajar?",
                "Bagaimana kegiatan tersebut mendukung pengembangan kompetensi sebagai calon guru?"
            ]
        },
        {
            id: "refleksi-siklus",
            title: "Refleksi Akhir Siklus",
            description: "Evaluasi pengalaman dan rencana tindak lanjut untuk pembelajaran berikutnya.",
            documents: [],
            prompts: [
                "Apa hal yang sudah berjalan baik dan perlu dipertahankan?",
                "Apa aspek yang masih perlu diperbaiki pada praktik mengajar berikutnya?"
            ]
        }
    ];

    function documentHTML(document, index, sectionIndex) {
        return `
            <article class="document-item">
                <h4>${document[0]}</h4>
                <p>${document[1]}</p>
                <a href="#"
                   onclick="return false;"
                   title="Ganti dengan tautan dokumen">
                   + Tambahkan tautan
                </a>
            </article>
        `;
    }

    function sectionHTML(section, index) {
        const documents = section.documents.length
            ? `<div class="document-grid">
                ${section.documents.map((doc, i) => documentHTML(doc, i, index)).join("")}
               </div>`
            : "";

        const prompts = section.prompts.map((prompt, i) => `
            <div class="reflection-box">
                <label for="cycle-${cycleNumber}-section-${index}-reflection-${i}">
                    ${prompt}
                </label>
                <textarea
                    id="cycle-${cycleNumber}-section-${index}-reflection-${i}"
                    data-save="s${cycleNumber}-bagian${index}-refleksi${i}"
                    placeholder="Tuliskan catatan analisis atau refleksi di sini..."></textarea>
                <span class="save-note">Catatan tersimpan otomatis di browser ini.</span>
            </div>
        `).join("");

        return `
            <section class="card portfolio-section" id="${section.id}">
                <div class="section-title-row">
                    <div class="section-index">${String(index + 1).padStart(2, "0")}</div>
                    <div>
                        <h2>${section.title}</h2>
                        <p>${section.description}</p>
                    </div>
                </div>

                ${documents}
                ${prompts}
            </section>
        `;
    }

    const previousLink = cycleNumber === 1
        ? "analisis.html"
        : `siklus-${cycleNumber - 1}.html`;

    const nextLink = cycleNumber === 4
        ? "analisis.html"
        : `siklus-${cycleNumber + 1}.html`;

    const previousText = cycleNumber === 1
        ? "Analisis dan Refleksi"
        : `Siklus ${cycleNumber - 1}`;

    const nextText = cycleNumber === 4
        ? "Analisis dan Refleksi"
        : `Siklus ${cycleNumber + 1}`;

    root.innerHTML = `
        <section class="page-hero">
            <div class="container">
                <div class="breadcrumb">
                    <a href="index.html">Beranda</a> /
                    <span>Praktik Mengajar</span> /
                    <span>Siklus ${cycleNumber}</span>
                </div>
                <span class="eyebrow">JURNAL PRAKTIK PEMBELAJARAN</span>

                <div class="cycle-banner">
                    <span class="eyebrow">PPG CALON GURU INFORMATIKA</span>
                    <h1>Siklus ${cycleNumber}</h1>
                    <p>${cycleDescriptions[cycleNumber]}</p>
                    <div class="cycle-meta">
                        <span>Praktik Mengajar</span>
                        <span>Dokumentasi Akademik</span>
                        <span>Refleksi Pembelajaran</span>
                    </div>
                </div>
            </div>
        </section>

        <div class="container cycle-layout">
            <aside class="card cycle-sidebar">
                <h3>Daftar Isi</h3>
                <nav>
                    ${sections.map((section, index) => `
                        <a href="#${section.id}">
                            ${String(index + 1).padStart(2, "0")} · ${section.title}
                        </a>
                    `).join("")}
                </nav>
            </aside>

            <div class="cycle-main">
                ${sections.map(sectionHTML).join("")}

                <div class="cycle-pagination">
                    <a href="${previousLink}" class="btn btn-outline">
                        ← ${previousText}
                    </a>
                    <a href="${nextLink}" class="btn">
                        ${nextText} →
                    </a>
                </div>
            </div>
        </div>
    `;

    // Aktifkan penyimpanan otomatis untuk textarea yang baru dibuat
    const storagePrefix = "ppg-portfolio-" +
        (location.pathname.split("/").pop() || "index.html") + "-";

    root.querySelectorAll("textarea[data-save]").forEach(function (textarea) {
        const key = storagePrefix + textarea.dataset.save;
        const savedValue = localStorage.getItem(key);

        if (savedValue !== null) {
            textarea.value = savedValue;
        }

        textarea.addEventListener("input", function () {
            localStorage.setItem(key, textarea.value);
        });
    });
});