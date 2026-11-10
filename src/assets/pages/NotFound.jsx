function NotFound() {
  return (
    <div className="flex flex-col flex-grow  justify-center items-center h-screen ">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found!</h2>
      <p className="text-gray-500 mt-2">
        Sorry, the page you are looking for doesn't exist.
      </p>

      <a href="/" className="bg-blue-500 text-gray-400 px-4 py-2 rounded mt-4">
        Go Home
      </a>
    </div>
  );
}

export default NotFound;
