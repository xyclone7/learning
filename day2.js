// Simulasi fungsi mengambil data dari database
const ambilDataUser = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({id: 1, nama: "Raki", status: "Active" });
        }, 2000); //Tunggu 2 detik
    });
};

const ambilDataPesanan = () => {
    return new Promise ((resolve) => {
        setTimeout (() => {
            resolve({Produk: "Laptop Gaming", Harga: "15000000"});
        }, 3000);//Tunggu 3 detik
    });
};
//Fungsi Utama (Backend Logic)
const main = async () => {
    try {
        const user = await ambilDataUser();
        //...kode lainnya...
    } catch (error) {
        console.log("Waduh, ada masalah di server:", error);
    }
    console.log("--- Memulai Proses ---");

    //Kita pakai 'await' agar kode menunggu sampai data benar-benar ada
    const user = await ambilDataUser();
    console.log("User ditemukan:", user.nama);

    const pesanan = await ambilDataPesanan();
    console.log("Detail Pesanan:", pesanan.Produk, "-", pesanan.Harga);

    console.log("---Semua Data berhasil dimuat---");
};

main();
