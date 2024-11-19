import { Link } from "react-router-dom";
import "../../App.css";
const Index = () => {
  return (
    <div className=" grident-color flex items-center justify-center min-h-screen ">
      <div className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
        <div className="text-9xl font-bold text-mainBlue mb-4">404</div>
        <h1 className="text-4xl font-bold text-mainBlue mb-6">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-Content mb-8">
          The page you're looking for seems to have gone on a little adventure.
          Don't worry, we'll help you find your way back home.
        </p>
        <Link
          to="/"
          className="inline-block bg-mainBlue text-White font-semibold px-6 py-3 rounded-md hover:bg-hoverBlue transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Index;
