import { configureStore, createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        women: [
            { brand: "Chanel", name: "Coco Mademoiselle", price: 150, image: "/images/Chanel_Coco_Mademoiselle_EDP_Women.jpg" },
            { brand: "Dior", name: "J'adore", price: 135, image: "/images/DiorJ_adore.jpg" },
            { brand: "Yves Saint Laurent", name: "Black Opium", price: 130, image: "/images/Yves_Saint_Laurent_Black_Opium.jpg" },
            { brand: "Tom Ford", name: "Black Orchid", price: 180, image: "/images/Tom_Ford_Black_Orchid.jpg" },
            { brand: "Lancôme", name: "La Vie Est Belle", price: 125, image: "/images/Lancome_La_Vie_Est_Belle.jpg" },
            { brand: "Gucci", name: "Bloom", price: 120, image: "/images/Gucci_Bloom.jpg" },
            { brand: "Viktor & Rolf", name: "Flowerbomb", price: 165, image: "/images/Viktor_Rolf_Flowerbomb.jpg" },
            { brand: "Dolce & Gabbana", name: "Light Blue", price: 100, image: "/images/Dolce_Gabbana_Light_Blue.jpg" },
            { brand: "Jo Malone", name: "English Pear & Freesia", price: 144, image: "/images/Jo_Malone_English_Pear_Freesia.jpg" },
            { brand: "Hermès", name: "Twilly d'Hermès", price: 145, image: "/images/Hermes_Twilly_d_Hermes.jpg" }
        ],
        men: [
            { brand: "Creed", name: "Aventus", price: 445, image: "/images/Creed_Aventus.jpg" },
            { brand: "Dior", name: "Sauvage Eau de Parfum", price: 125, image: "/images/Dior_Sauvage_Eaude_Parfum.jpg" },
            { brand: "Tom Ford", name: "Oud Wood", price: 270, image: "/images/Tom_Ford_Oud_Wood.jpg" },
            { brand: "Chanel", name: "Bleu de Chanel", price: 150, image: "/images/Chanel_Bleude_Chanel.jpg" },
            { brand: "Giorgio Armani", name: "Acqua di Gio Profumo", price: 135, image: "/images/Giorgio_Armani_Acquadi_Gio_Profumo.jpg" },
            { brand: "Yves Saint Laurent", name: "La Nuit de l'Homme", price: 95, image: "/images/Yves_Saint_Laurent_La_Nuitdel_Homme.jpg" },
            { brand: "Hermès", name: "Terre d’Hermès", price: 135, image: "/images/Hermes_Terred_Hermes.jpg" },
            { brand: "Versace", name: "Eros", price: 105, image: "/images/Versace_Eros.jpg" },
            { brand: "Paco Rabanne", name: "1 Million", price: 95, image: "/images/Paco_Rabanne_1Million.jpg" },
            { brand: "Jean Paul Gaultier", name: "Le Male", price: 95, image: "/images/Jean_Paul_Gaultier_LeMale.jpg" }
        ]
    }
});


// Cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], discount: 0, couponDiscount: 0 },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            if (existingItem) {
                existingItem.quantity += 1; // Increment quantity if item exists
            } else {
                state.items.push({ ...action.payload, quantity: 1 }); // Add new item
            }
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(item => item.name === action.payload.name);
            if (index > -1) {
                state.items.splice(index, 1); // Remove item from cart
            }
        },
        incrementQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            if (existingItem) {
                existingItem.quantity += 1; // Increment the quantity of the item
            }
        },
        decrementQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1; // Decrement the quantity if greater than 1
            } else if (existingItem && existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.name !== action.payload.name);
            }
        },
        applyDiscount: (state, action) => {
            state.discount = action.payload; // Sets the discount percentage
        },
        applyCoupon: (state, action) => {
            switch (action.payload) {
                case 'sundaysale':
                    state.couponDiscount = 5;
                    break;
                case 'festivesale':
                    state.couponDiscount = 10;
                    break;
                case 'newyearsale':
                    state.couponDiscount = 15;
                    break;
                default:
                    state.couponDiscount = 0; // Reset if invalid
                    break;
            }
        },
        clearCart: (state) => {
            state.items = []; // Clear all items in the cart
            state.discount = 0; // Reset discount
            state.couponDiscount = 0; // Reset coupon discount
        },
    },
});

// Purchase History Slice
const purchaseHistorySlice = createSlice({
    name: 'purchaseHistory',
    initialState: [],
    reducers: {
        addPurchase: (state, action) => {
            state.push(action.payload);
        }
    }
});

const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer,
        purchaseHistory: purchaseHistorySlice.reducer
    }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, applyDiscount, applyCoupon, clearCart } = cartSlice.actions;
export const { addPurchase } = purchaseHistorySlice.actions;
export default store;
