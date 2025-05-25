document.addEventListener('DOMContentLoaded', () => {
    console.log('Kontak page JavaScript loaded.');


    const map = L.map('map').setView([-7.800, 110.370], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const umkmList = document.querySelector('.umkm-list');
    const umkmSelect = document.querySelector('#umkm');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    // Data UMKM (Tambahkan lebih banyak untuk uji scroll)
    const umkmData = [
        {
            id: 'umkm-batik',
            name: 'Batik Tulis Wijaya',
            location: [-7.798, 110.370],
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
        {
            id: 'umkm-tambahan1',
            name: 'Kerajinan Kayu Jati',
            location: [-7.803, 110.376],
            contact: '0813-1234-5678',
            description: 'Kerajinan kayu jati berkualitas tinggi.',
            email: 'kayu.jati@example.com'
        },
        {
            id: 'umkm-tambahan2',
            name: 'Kopi Kampung',
            location: [-7.804, 110.377],
            contact: '0813-9876-5432',
            description: 'Kopi khas kampung dengan cita rasa otentik.',
            email: 'kopi.kampung@example.com'
        },
        {
            id: 'umkm-tambahan3',
            name: 'Tenun Tradisional',
            location: [-7.805, 110.378],
            contact: '0813-5555-6666',
            description: 'Tenun tradisional dengan motif unik.',
            email: 'tenun.tradisional@example.com'
        }
    ];

    function displayUmkm() {
        console.log('Displaying UMKM data...');
        umkmData.forEach(umkm => {
            const umkmItem = document.createElement('div');
            umkmItem.classList.add('umkm-item');
            umkmItem.innerHTML = `
                <h3>${umkm.name}</h3>
                <p>${umkm.description}</p>
                <p>Kontak: ${umkm.contact}</p>
            `;
            umkmList.appendChild(umkmItem);

            L.marker(umkm.location).addTo(map)
                .bindPopup(`<b>${umkm.name}</b><br>${umkm.description}<br>Kontak: ${umkm.contact}`);

            const option = document.createElement('option');
            option.value = umkm.id;
            option.textContent = umkm.name;
            umkmSelect.appendChild(option);
        });
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const umkmId = document.getElementById('umkm').value;
        const message = document.getElementById('message').value;

        const selectedUmkm = umkmData.find(umkm => umkm.id === umkmId);
        const umkmEmail = selectedUmkm ? selectedUmkm.email : 'info@kampungwisata.com';

        const mailtoLink = `mailto:${umkmEmail}?subject=Pesan dari Pengunjung Kampung Wisata&body=Nama: ${name}%0DEmail: ${email}%0DPesan: ${message}`;
        window.location.href = mailtoLink;

        formMessage.textContent = 'Pesan Anda sedang dikirim...';
        formMessage.classList.remove('error');
        formMessage.classList.add('success');

        contactForm.reset();
        setTimeout(() => {
            formMessage.textContent = '';
        }, 3000);
    });

    displayUmkm();
});