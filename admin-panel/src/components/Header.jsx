import AnimatedMenuBtn from "./AnimatedMenuBtn";

export default function Header({ isMenuOpen, setIsManuOpen, userName }) {
  return (
    <div className="header bg-mainBlue rounded-lg w-full h-[5%] min-h-[50px] box-border flex flex-row-reverse items-center justify-between">
      <div className="user-information mx-3 flex flex-row-reverse items-center space-x-2">
        <img
          className="h-11 w-11 rounded-full"
          src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.webp"
          alt="profile"
        />
        <h3 className="text-gray-100 ">{userName}</h3>
      </div>
      <AnimatedMenuBtn isOpen={isMenuOpen} setIsOpen={setIsManuOpen} />
    </div>
  );
}
