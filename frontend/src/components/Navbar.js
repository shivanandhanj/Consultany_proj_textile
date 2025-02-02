import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4 text-white">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-xl font-bold">Textile Co.</Link>
                <div className="space-x-4">
                    <Link to="/about">About</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
