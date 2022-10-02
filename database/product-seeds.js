
const { today } = require('../data')




const products = [
    {
        product_name: "games",
        product_desc: "Itaque Earum Rerum Hic Tenetur Alias Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim",
        product_code: "12346",
        brand: "brand124",
        category: 2,
        price: 80,
        old_price: 89,
        quantity: 8,
        image: ["10.jpg", "6.jpg"],
        is_featured: 1,
        is_latest: 1,
        created_at: today()
    },
    {
        product_name: "Pad",
        product_desc: "Itaque Earum Rerum Hic Tenetur Alias Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim",
        product_code: "12946",
        brand: "brand144",
        category: 1,
        price: 100,
        old_price: 120,
        quantity: 6,
        image: ["13.jpg", "15.jpg"],
        is_featured: 1,
        is_latest: 1,
        created_at: today()
    },
    {
        product_name: "Jacket",
        product_desc: "Itaque Earum Rerum Hic Tenetur Alias Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim",
        product_code: "12996",
        brand: "brand154",
        category: 3,
        price: 100,
        old_price: 120,
        quantity: 10,
        image: ["18.jpg", "19.jpg"],
        is_featured: 1,
        is_latest: 1,
        created_at: today()
    },
    {
        product_name: "Iphone",
        product_desc: "Itaque Earum Rerum Hic Tenetur Alias Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim",
        product_code: "12943",
        brand: "brand148",
        category: 1,
        price: 90,
        old_price: 110,
        quantity: 10,
        image: ["1.jpg", "4.jpg"],
        is_featured: 1,
        is_latest: 0,
        created_at: today()
    },
    {
        product_name: "Camera",
        product_desc: "Itaque Earum Rerum Hic Tenetur Alias Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim",
        product_code: "12943",
        brand: "brand148",
        category: 2,
        price: 120,
        old_price: 230,
        quantity: 14,
        image: ["2.jpg", "5.jpg"],
        is_featured: 1,
        is_latest: 0,
        created_at: today()
    },
    {
        product_name: "Game Pad",
        product_desc: "Itaque Earum Rerum Hic Tenetur Alias Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim",
        product_code: "12943",
        brand: "brand148",
        category: 3,
        price: 105,
        old_price: 170,
        quantity: 10,
        image: ["15.jpg", "17.jpg"],
        is_featured: 1,
        is_latest: 1,
        created_at: today()
    },
    {
        product_name: "Head set",
        product_desc: "Itaque Earum Rerum Hic Tenetur Alias Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim",
        product_code: "12923",
        brand: "brand149",
        category: 1,
        price: 90,
        old_price: 110,
        quantity: 10,
        image: ["14.jpg", "16.jpg"],
        is_featured: 1,
        is_latest: 1,
        created_at: today()
    },
    {
        product_name: "Winter jacket",
        product_desc: "Itaque Earum Rerum Hic Tenetur Alias Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim",
        product_code: "14943",
        brand: "brand348",
        category: 2,
        price: 155,
        old_price: 180,
        quantity: 5,
        image: ["18.jpg", "19.jpg"],
        is_featured: 1,
        is_latest: 1,
        created_at: today()
    },
    {
        product_name: "Watch",
        product_desc: "Itaque Earum Rerum Hic Tenetur Alias Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Ut enim ad minim",
        product_code: "17943",
        brand: "brand378",
        category: 3,
        price: 109,
        old_price: 120,
        quantity: 19,
        image: ["9.jpg", "11.jpg"],
        is_featured: 1,
        is_latest: 1,
        created_at: today()
    },
]





module.exports  = {
    products
}