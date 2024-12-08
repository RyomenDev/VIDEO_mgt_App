import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-gray-200 text-black flex flex-col items-center justify-center px-6 py-12">
      {/* Header Section */}
      <h1 className="text-5xl font-extrabold text-center text-slate-700 mb-4">
        Welcome to Video Management App
      </h1>

      {/* Project Description */}
      <p className="text-xl text-gray-700 mb-8 text-center max-w-3xl">
        This application allows you to record, upload, view, and manage videos
        seamlessly. It's built with React and Node.js and styled with Tailwind
        CSS. Whether you're recording a new video or viewing your past
        recordings, we aim to provide an intuitive and efficient experience.
      </p>

      {/* Features Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">
          Key Features
        </h2>
        <ul className="list-disc pl-8 text-lg text-gray-700 space-y-3">
          <li>Record videos directly from your browser</li>
          <li>Stream and watch recorded videos</li>
          <li>Easy-to-use interface for managing videos</li>
          <li>Responsive design for all devices</li>
          <li>Login to see more features</li>
        </ul>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="flex gap-6 mb-12">
        {/* Record New Video Button */}
        <Link
          to="/record"
          className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white hover:from-indigo-500 hover:to-indigo-700 py-3 px-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
        >
          Record a New Video
        </Link>

        {/* View Recorded Videos Button */}
        <Link
          to="/dashboard"
          className="bg-gradient-to-r from-indigo-400 to-indigo-600 border-2 border-indigo-600 text-white hover:bg-indigo-700 py-3 px-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
        >
          View Recorded Videos
        </Link>
      </div>

      {/* Additional Section - About */}
      <div className="mt-12 text-center max-w-2xl mx-auto">
        <h3 className="text-3xl font-semibold text-indigo-600 mb-4">
          About This App
        </h3>
        <p className="text-lg text-gray-700">
          This Video Management App was created to help you record and manage
          your videos effortlessly. Whether you're creating content or just
          managing your personal recordings, our goal is to streamline the
          process.
        </p>
      </div>
    </div>
  );
};

export default Home;
