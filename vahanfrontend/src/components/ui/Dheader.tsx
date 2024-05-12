import { deleteCookie } from "../../lib/cookie";

export default function Dheader({ openDrawer }: { openDrawer: () => void }) {
  const logout = () => {
    deleteCookie("jwt");
    window.location.href = "/";
  };
  return (
    <header className="bg-white w-full ">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between h-16 bg-white lg:rounded-md lg:shadow-lg lg:h-24 lg:px-8 lg:py-6">
          <div className="flex-shrink-0 ">
            <a href="/" title="" className="flex">
              <h1 className="w-auto h-8 lg:h-10 text-4xl font-bold">CMS</h1>
            </a>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex p-2 ml-5 text-black transition-all duration-200 rounded-md  focus:bg-gray-100 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="800"
                height="800"
                viewBox="0 0 100 100"
                className="w-5 h-5"
                onClick={openDrawer}
              >
                <path d="M84.437 39.721H60.273V15.563a1.814 1.814 0 0 0-1.812-1.813H41.536a1.813 1.813 0 0 0-1.812 1.813l-.001 24.16-24.159-.001c-.961 0-1.812.851-1.813 1.813V58.46a1.81 1.81 0 0 0 1.813 1.812h24.16v24.165a1.814 1.814 0 0 0 1.813 1.813H58.46a1.813 1.813 0 0 0 1.813-1.813V60.273l24.163-.001a1.81 1.81 0 0 0 1.813-1.813l.001-16.925a1.813 1.813 0 0 0-1.813-1.813" />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex p-2 ml-5 text-black transition-all duration-200 rounded-md  focus:bg-gray-100 hover:bg-gray-100"
            >
              <svg
                width="800"
                height="800"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                onClick={logout}
              >
                <path d="M8 0a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1" />
                <path d="M12.665 2.781a1 1 0 1 0-1.333 1.491 5 5 0 1 1-6.665.001 1 1 0 0 0-1.333-1.49 7 7 0 1 0 9.331-.002" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
