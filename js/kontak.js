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
            id: 'umkm-lumpia-semarang-bu-ani',
            name: 'Lumpia Semarang Bu Ani',
            category: 'kuliner',
            location: [-7.804, 110.377],
            contact: '0813-2345-6789',
            description: 'Lumpia Semarang otentik dengan isi rebung dan udang segar.',
            email: 'lumpia.semarang@example.com'
        },
        {
            id: 'umkm-tahu-gimbal-pak-eddy',
            name: 'Tahu Gimbal Pak Eddy',
            category: 'kuliner',
            location: [-7.800, 110.372],
            contact: '0812-8765-4321',
            description: 'Tahu gimbal khas Semarang dengan bumbu kacang yang lezat.',
            email: 'tahu.gimbal@example.com'
        },
        {
            id: 'umkm-kerajinan',
            name: 'Kerajinan Resin',
            location: [-7.802, 110.375],
            contact: '0813-5566-7788',
            description: 'Berbagai kerajinan resin berkualitas tinggi.',
            email: 'kerajinanResin@example.com'
        },
        {
            id: 'umkm-aquascape-semarang',
            name: 'Aquascape Semarang',
            category: 'kerajinan',
            location: [-7.801, 110.373],
            contact: '0857-3344-5566',
            description: 'Pusat aquascape dengan desain kreatif dan tanaman air berkualitas.',
            email: 'aquascape.semarang@example.com'
        },
        {
            id: 'umkm-gerabah-semarang',
            name: 'Gerabah Semarang',
            category: 'kerajinan',
            location: [-7.802, 110.374],
            contact: '0813-7788-9900',
            description: 'Menyediakan berbagai produk gerabah tradisional dan modern.',
            email: 'gerabah.semarang@example.com'
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