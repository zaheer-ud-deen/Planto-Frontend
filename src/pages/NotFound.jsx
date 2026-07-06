import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#172218] to-[#0f1810] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-white/60 text-lg">sorry this page is not existing</p>
        <Link to="/" className="mt-6 inline-block px-6 py-2 bg-green-500 rounded-xl text-white">
          Go Home
        </Link>
      </div>
    </div>
  );
};
export default NotFound