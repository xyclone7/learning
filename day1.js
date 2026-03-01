const users = [
    { nama: "Fatur", role: "admin" },
    { nama: "Budi", role: "user" },
    { nama: "Sari", role: "admin" },
    { nama: "Andi", role: "user" }
];

// Tantangan: Filter berdasarkan "role" bukan berdasarkan "nama"
const daftarAdmin = users.filter((user) => {
    return user.role === "admin";
});
const cariAndi = users.find((user) => user.nama === "Andi");
console.log(daftarAdmin);