import { Link } from "@remix-run/react";
import { MenuIcon } from "lucide-react";
import Logo from "../logo";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  NavigationMenuItems,
  NavigationMenuItemsProps,
} from "./navigation-menu-item";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="block transition hover:opacity-75 md:hidden">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className="w-full p-2">
        <div className="absolute left-4 top-4">
          <Logo />
        </div>
        <div className="mt-16 p-2">
          {NavigationMenuItems.map((item: NavigationMenuItemsProps) => (
            <SheetClose asChild key={item.label}>
              <>
                <Link
                  to={item.href}
                  className="-mx-3 block rounded-md px-3 py-3 text-base font-semibold leading-7 transition hover:bg-accent"
                >
                  {item.label}
                </Link>
              </>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
