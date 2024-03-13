import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="src/images/RocketElevatorsLogo.png" // Update with your logo path
        alt="Error Logo"
        className="h-20 mb-8"
      />
      <h2 className="text-3xl font-bold mb-4">Error / Unauthorized</h2>
      <Link
        to="/login"
        className="text-blue-500 hover:underline focus:outline-none focus:ring focus:ring-blue-300 px-2 py-1"
      >
        Go back to login
      </Link>
    </div>
  );
}
