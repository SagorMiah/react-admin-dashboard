import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import avatar from "../data/avatar.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import Cart from "../components/Cart";
import Chat from "../components/Chat";
import UserProfile from "../components/UserProfile";
import Notification from "../components/Notification";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="text-xl relative p-3 rounded-full hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    currentColor,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 767) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        icon={<AiOutlineMenu />}
        color={currentColor}
      />

      <div className="flex">
        <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          icon={<FiShoppingCart />}
          color={currentColor}
        />
        <NavButton
          title="Cart"
          dotColor="#03C9D7"
          customFunc={() => handleClick("chat")}
          icon={<BsChatLeft />}
          color={currentColor}
        />
        <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          icon={<RiNotification3Line />}
          color={currentColor}
        />

        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 p-1 cursor-pointer hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img className="rounded-full w-8 h-8" src={avatar} alt="avatar" />
            <span className="text-gray-400 text-14">Hi,</span>{" "}
            <span className="text-gray-400 text-14 font-bold ml-1">Sagor</span>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.userProfile && <UserProfile />}
        {isClicked.notification && <Notification />}
      </div>
    </div>
  );
};

export default Navbar;
