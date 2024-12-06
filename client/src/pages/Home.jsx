import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-200 to-indigo-300 text-black flex flex-col items-center justify-center p-8">
      {/* Header Section */}
      <h1 className="text-5xl font-extrabold mb-4 text-center">
        Welcome to Video Management App
      </h1>

      {/* Project Description */}
      <p className="text-xl mb-6 text-center max-w-xl">
        This application allows you to record, upload, view, and manage videos
        seamlessly. It's built with React and Node.js and styled with Tailwind
        CSS. Whether you're recording a new video or viewing your past
        recordings, we aim to provide an intuitive and efficient experience.
      </p>

      {/* Features Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc pl-6 text-lg">
          <li>Record videos directly from your browser</li>
          <li>Stream and watch recorded videos</li>
          <li>Easy-to-use interface for managing videos</li>
          <li>Responsive design for all devices</li>
        </ul>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="flex gap-4">
        {/* Record New Video Button */}
        <Link
          to="/record"
          className="bg-gradient-to-r  from-indigo-300 to-slate-200 text-blue-600 hover:bg-gray-200 py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
        >
          Record a New Video
        </Link>

        {/* View Recorded Videos Button */}
        <Link
          to="/dashboard"
          className="bg-gradient-to-r  from-indigo-300 to-slate-200 border-2 border-white text-blue-600 hover:bg-gray-200 py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
        >
          View Recorded Videos
        </Link>
      </div>

      {/* Additional Section - About */}
      <div className="mt-12 text-center max-w-2xl">
        <h3 className="text-2xl font-semibold mb-4">About This App</h3>
        <p className="text-lg">
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
