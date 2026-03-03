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
    console.log("1. Menghubungkan ke Database...");

    //Kita pakai 'await' agar kode menunggu sampai data benar-benar ada
    const user = await ambilDataPesanan();

    console.log("2. Data berhasil diambil:");
    console.log(user);

    console.log("3. Selesai, server siap menerima request lain.");
};

main();
