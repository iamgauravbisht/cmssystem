export default function Home() {
  return (
    <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        Work fast from anywhere
      </h5>
      <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        Stay up to date and move work forward with your own CMS Manager. Try the
        app today.
      </p>
      <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
        <a href="/register">
          <button className="px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg sm:text-lg sm:px-8 sm:py-4 dark:bg-blue-500">
            Sign Up
          </button>
        </a>
        <a href="/login">
          <button className="px-6 py-3 text-base font-medium text-blue-600 bg-white rounded-lg sm:text-lg sm:px-8 sm:py-4 dark:bg-gray-700 dark:text-white">
            Sign in
          </button>
        </a>
      </div>
    </div>
  );
}
