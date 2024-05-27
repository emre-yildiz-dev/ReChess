import Logo from "../logo";
import NavigationMenu from "./navigation-menu-item";
import MobileMenu from "./mobile-menu";

export const NavBar = () => {
  return (
    <header className="flex items-center max-w-4xl mx-auto justify-between pt-8 pb-4 inset-x-0 top-0 relative">
      <Logo />
      <NavigationMenu />
      <MobileMenu />
    </header>
  );
};

export default NavBar;
