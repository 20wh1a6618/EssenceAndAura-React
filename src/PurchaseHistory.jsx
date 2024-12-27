import { useSelector } from 'react-redux';

function PurchaseHistory() {
    const purchases = useSelector((state) => state.purchaseHistory);

    return (
        <div>
            <h1>Purchase History</h1>
            {purchases.length === 0 ? (
                <p>No purchases made yet.</p>
            ) : (
                <ul>
                    {purchases.map((purchase, index) => (
                        <li key={index}>
                            <h3>Purchase Date: {purchase.date}</h3>
                            <ul>
                                {purchase.items.map((item) => (
                                    <li key={item.name}>
                                        {item.brand}: {item.name} - ${item.price.toFixed(2)} (x{item.quantity})
                                    </li>
                                ))}
                            </ul>
                            <h4>Total Amount: ${purchase.total.toFixed(2)}</h4>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PurchaseHistory;
