import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";

function MenPerfume() {
    const dispatch = useDispatch();
    const menperfume = useSelector((state) => state.products.men);

    const items = menperfume.map((product, index) => (
        <div key={index} className="perfume-item">
            <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: "100%", height: "auto", borderRadius: "5px" }} 
            />
            <div>
                <h3>{product.brand}</h3>
                <p>{product.name}</p>
                <p>${product.price.toFixed(2)}</p>
                <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
            </div>
        </div>
    ));

    return (
        <>
            <h1>Men's Perfume Products</h1>
            <div className="perfume-grid">
                {items}
            </div>
        </>
    );
}

export default MenPerfume;
