// js/kontak.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Kontak page JavaScript loaded.');

    // Inisialisasi Peta Leaflet
    const map = L.map('map').setView([-7.795, 110.369], 13); // Koordinat default (misal, Yogyakarta) dan zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const umkmList = document.querySelector('.umkm-list');
    const umkmSelect = document.querySelector('#umkm');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    // Data UMKM (ganti dengan data sebenarnya)
    const umkmData = [
        {
            id: 'umkm-batik',
            name: 'Batik Tulis Wijaya',
            location: [-7.798, 110.370], // Koordinat
            contact: '0812-3456-7890',
            description: 'Pengrajin batik tulis tradisional dengan motif khas.',
            email: 'batik.wijaya@example.com'
        },
        {
            id: 'umkm-kuliner',
            name: 'Gudeg Yu Djum',
            location: [-7.800, 110.372],
            contact: '0857-1122-3344',
            description: 'Gudeg lezat dengan resep keluarga turun temurun.',
            email: 'gudeg.yudjum@example.com'
        },
        {
            id: 'umkm-kerajinan',
            name: 'Kerajinan Perak Kotagede',
            location: [-7.802, 110.375],
            contact: '0813-5566-7788',
            description: 'Berbagai kerajinan perak berkualitas tinggi.',
             email: 'perak.kotagede@example.com'
        },
        // Tambahkan lebih banyak UMKM di sini...
    ];

    // Fungsi untuk menampilkan daftar UMKM dan menambahkan marker ke peta
    function displayUmkm() {
        umkmData.forEach(umkm => {
            const umkmItem = document.createElement('div');
            umkmItem.classList.add('umkm-item');
            umkmItem.innerHTML = `
                <h3>${umkm.name}</h3>
                <p>${umkm.description}</p>
                <p>Kontak: ${umkm.contact}</p>
            `;
            umkmList.appendChild(umkmItem);

            // Tambahkan marker ke peta
            L.marker(umkm.location).addTo(map)
                .bindPopup(`<b>${umkm.name}</b><br>${umkm.description}<br>Kontak: ${umkm.contact}`);

            // Tambahkan opsi ke select box di form
            const option = document.createElement('option');
            option.value = umkm.id;
            option.textContent = umkm.name;
            umkmSelect.appendChild(option);
        });
    }

    // Fungsi untuk menangani pengiriman formulir
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form submit default

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const umkmId = document.getElementById('umkm').value;
        const message = document.getElementById('message').value;

        // Cari email UMKM berdasarkan ID
        const selectedUmkm = umkmData.find(umkm => umkm.id === umkmId);
        const umkmEmail = selectedUmkm ? selectedUmkm.email : 'info@kampungwisata.com'; // Default email jika tidak ditemukan

        // Buat link mailto
        const mailtoLink = `mailto:${umkmEmail}?subject=Pesan dari Pengunjung Kampung Wisata&body=Nama: ${name}%0DEmail: ${email}%0DPesan: ${message}`;

        // Redirect ke link mailto
        window.location.href = mailtoLink;

        // Tampilkan pesan (opsional)
        formMessage.textContent = 'Pesan Anda sedang dikirim...';
        formMessage.classList.remove('error');
        formMessage.classList.add('success');

        // Reset form (opsional)
        contactForm.reset();
        setTimeout(() => {
            formMessage.textContent = '';
        }, 3000); // Hapus pesan setelah 3 detik
    });

    // Inisialisasi: Tampilkan daftar UMKM dan peta saat halaman dimuat
    displayUmkm();
});