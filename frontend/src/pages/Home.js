import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-3xl font-bold mb-5">Welcome to Textile Co.</h1>
            <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="border p-4">
                        <h2 className="text-xl font-bold">{product.name}</h2>
                        <p>{product.description}</p>
                        <p className="font-semibold">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
