import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import pic_clear from "../../images/iit-ropar-logo-clear.png";
import pic from "../../images/iit-ropar-logo.jpg";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Contact us", to: "/contact-us" },
  { name: "Guidelines", to: "/guidelines" },
];

function Navbar() {
  return (
    <div>
      <Popover>
        <div className="relative pt-3 pb-3 px-5 sm:px-6 lg:px-8 bg-[#000000]">
          <nav
            className="relative flex items-center sm:h-10 justify-start "
            aria-label="Global"
          >
            <div className="flex items-center flex-grow-0 flex-shrink-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="font-medium text-white hover:text-indigo-500"
                >
                  {item.name}
                </Link>
              ))}
              
            </div>

            <div className="h-12 w-12 ml-auto flex-shrink-0">
              <a href="https://www.iitrpr.ac.in/student-affairs/hostel.php">
                <img src={pic_clear} alt="IIT Ropar"></img>
              </a>
            </div>


          </nav>

        </div>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <img className="h-8 w-auto" src={pic} alt="" />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-indigo-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close main menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="block px-3 py-2 rounded-md text-center text-base font-medium text-gray-700 hover:text-indigo-500 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}

export default Navbar;
