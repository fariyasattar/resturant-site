import Food1 from '../assets/biryani.jpg'
import Food2 from '../assets/chapli_kabab.jpg'
import Food3 from '../assets/chicken_karahi.png' // ✅ space hata di
import Food10 from './biryani.jpg'
import Food11 from './chapli_kabab.jpg'
import Food12 from './chicken_karahi.png'
import Food4 from './kabab.jpg'
import Food5 from './kheer.jpg'
import Food6 from './Muttonpulao.jpg'
import Food7 from './Nihari.jpg'
import Food8 from './rogni_naan.jpeg'
import Food9 from './gajarhalwa.jpg'
import stripe_logo from './stripe.jpeg'


export const CategoryItem = [
  { category_title: "All" },
  { category_title: "Rice" },
  { category_title: "Karahi" },
  { category_title: "Drinks" },
  { category_title: "Kabab" },
  { category_title: "Dessert" },
  { category_title: "Nihari" },
  { category_title: "Bread" }, // ✅ roti/naan ke liye add kiya
];

export const assets = {
  stripe_logo,
}

// ✅ 'products' naam rakha, 'product' nahi
export const products = [
  {
    _id: "a",
    name: "Biryani",
    description: "Aromatic basmati rice with chicken, served with raita", // ✅ spelling + real text
    price: 950,
    image: Food1,
    category: "Rice",
    date: 1716634345448,
  },
  {
    _id: "ab",
    name: "Seekh Kabab",
    description: "Juicy grilled minced meat kabab with mint chutney",
    price: 750,
    image: Food4,
    category: "Kabab",
    date: 1716634345448,
  },
  {
    _id: "ac",
    name: "Mutton Pulao",
    description: "Fragrant rice cooked with tender mutton pieces",
    price: 1950,
    image: Food6,
    category: "Rice",
    date: 1716634345448,
  },
  {
    _id: "ad",
    name: "Nihari",
    description: "Slow-cooked beef stew, a Lahori breakfast specialty",
    price: 950,
    image: Food7,
    category: "Nihari",
    date: 1716634345448,
  },
  {
    _id: "ae",
    name: "Mint Margarita",
    description: "Refreshing mint and lemon mocktail", // ✅ sahi description
    price: 450,
    image: stripe_logo, // ✅ Food8 naan tha, temp logo laga di. Drink ki image add karna
    category: "Drinks",
    date: 1716634345448,
  },
  {
    _id: "af",
    name: "Chapli Kabab",
    description: "Peshawari style flat spicy kabab",
    price: 950,
    image: Food2,
    category: "Kabab",
    date: 1716634345448,
  },
  {
    _id: "ag",
    name: "Chicken Karahi",
    description: "Traditional chicken karahi cooked in wok", // ✅ Food3 use kiya
    price: 1650,
    image: Food3,
    category: "Karahi",
    date: 1716634345448,
  },
  {
    _id: "ah",
    name: "Kheer",
    description: "Creamy rice pudding with nuts", // ✅ Food5 use kiya
    price: 550,
    image: Food5,
    category: "Dessert",
    date: 1716634345448,
  },
  {
    _id: "ai",
    name: "Gajar Halwa",
    description: "Carrot dessert with khoya and dry fruits", // ✅ Food9 use kiya
    price: 950,
    image: Food9,
    category: "Dessert",
    date: 1716634345448,
  },
  {
    _id: "aj",
    name: "Rogni Naan",
    description: "Soft tandoori naan topped with sesame", // ✅ Food8 use kiya
    price: 150,
    image: Food8,
    category: "Bread", // ✅ category fix ki
    date: 1716634345448,
  },
]