import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, incrementQuantity, decrementQuantity, applyDiscount, applyCoupon, clearCart, addPurchase } from './store';
import { useState } from 'react';

function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const totalDiscount = useSelector((state) => state.cart.discount);
    const couponDiscount = useSelector((state) => state.cart.couponDiscount);
    const [selectedCoupon, setSelectedCoupon] = useState("");

    const calculateTotalPrice = () => {
        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const discountAmount = subtotal * (totalDiscount / 100);
        const couponAmount = subtotal * (couponDiscount / 100);
        return subtotal - discountAmount - couponAmount;
    };

    const handleIncrement = (item) => {
        dispatch(incrementQuantity(item));
    };

    const handleDecrement = (item) => {
        dispatch(decrementQuantity(item));
    };

    const handleRemove = (item) => {
        dispatch(removeFromCart(item));
    };

    const handlePurchase = () => {
        const totalAmount = calculateTotalPrice();
        const purchaseDetails = {
            items: cartItems,
            total: totalAmount,
            date: new Date().toLocaleString()
        };
        dispatch(addPurchase(purchaseDetails));
        dispatch(clearCart());
        alert('Purchase Successful!');
    };

    const applyDiscountPercentage = (percentage) => {
        dispatch(applyDiscount(percentage));
    };

    const handleApplyCoupon = () => {
        dispatch(applyCoupon(selectedCoupon));
        setSelectedCoupon("");
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.name} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                        {/* Product Image */}
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ width: '100px', height: 'auto', borderRadius: '8px', marginRight: '20px' }} 
                        />
                        {/* Product Details */}
                        <div style={{ flex: 1 }}>
                            <strong>{item.brand}: {item.name}</strong><br />
                            <span>${item.price.toFixed(2)} (x{item.quantity})</span>
                        </div>
                        <div>
                            <button onClick={() => handleIncrement(item)}>+</button>
                            <button onClick={() => handleDecrement(item)}>-</button>
                            <button onClick={() => handleRemove(item)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <h2>Total Discount: {totalDiscount}%</h2>
            <h2>Coupon Discount: {couponDiscount}%</h2>
            <h2>Total Price: ${calculateTotalPrice().toFixed(2)}</h2>

            {/* Discount Buttons */}
            <div>
                <h3>Apply Discount</h3>
                <button onClick={() => applyDiscountPercentage(10)}>10% Discount</button>
                <button onClick={() => applyDiscountPercentage(15)}>15% Discount</button>
                <button onClick={() => applyDiscountPercentage(20)}>20% Discount</button>
                <button onClick={() => applyDiscountPercentage(30)}>30% Discount</button>
            </div>

            {/* Coupon Dropdown */}
            <div>
                <h3>Apply Coupon</h3>
                <select value={selectedCoupon} onChange={(e) => setSelectedCoupon(e.target.value)}>
                    <option value="">Select a coupon</option>
                    <option value="sundaysale">Sundaysale (5% off)</option>
                    <option value="festivesale">Festivesale (10% off)</option>
                    <option value="newyearsale">Newyearsale (15% off)</option>
                </select>
                <button onClick={handleApplyCoupon}>Apply Coupon</button>
            </div>

            <button onClick={handlePurchase}>Purchase</button>
        </div>
    );
}

export default Cart;
