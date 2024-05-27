import { Link } from "@remix-run/react";

export interface NavigationMenuItemsProps {
  href: string;
  label: string;
}

export const NavigationMenuItems: NavigationMenuItemsProps[] = [
  {
    href: "#ecosystem",
    label: "Ecosystem",
  },
  {
    href: "#road",
    label: "Road",
  },
  {
    href: "#community",
    label: "Community",
  },
  {
    href: "#stake",
    label: "Stake",
  },
];

const NavigationMenu = () => {
  return (
    <nav className="hidden lg:flex items-center space-x-6 text-muted-foreground line-clamp-2 font-semibold leading-snug no-underline outline-none">
      {NavigationMenuItems.map((item) => (
        <Link to={item.href} key={item.href}>
          <span className="hover:text-primary">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NavigationMenu;
