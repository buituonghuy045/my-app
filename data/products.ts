import { Product } from "@/types/products";

export const products: Product[] = [
    {
        id: "SP001",
        name: "Cơm tấm sườn bì chả",
        price: 55000,
        categoryID: "CAT_MAIN", // Món chính
    },
    {
        id: "SP002",
        name: "Phở bò tái nạm",
        price: 65000,
        categoryID: "CAT_MAIN",
    },
    {
        id: "SP003",
        name: "Bún bò Huế đặc biệt",
        price: 70000,
        categoryID: "CAT_MAIN",
    },
    {
        id: "SP004",
        name: "Trà đào cam sả",
        price: 35000,
        categoryID: "CAT_DRINK", // Đồ uống
    },
    {
        id: "SP005",
        name: "Cà phê sữa đá",
        price: 25000,
        categoryID: "CAT_DRINK",
    },
    {
        id: "SP006",
        name: "Nước ép dưa hấu",
        price: 30000,
        categoryID: "CAT_DRINK",
    },
    {
        id: "SP007",
        name: "Bánh Flan Caramel",
        price: 15000,
        categoryID: "CAT_DESSERT", // Tráng miệng
    },
    {
        id: "SP008",
        name: "Chè khúc bạch",
        price: 25000,
        categoryID: "CAT_DESSERT",
    },
    {
        id: "SP009",
        name: "Gà rán phần (3 miếng)",
        price: 95000,
        categoryID: "CAT_MAIN",
    },
    {
        id: "SP010",
        name: "Sinh tố bơ",
        price: 40000,
        categoryID: "CAT_DRINK",
    },
]