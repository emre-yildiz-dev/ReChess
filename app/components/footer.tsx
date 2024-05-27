import Logo from "./logo";
import NavigationMenu from "./navigation/navigation-menu-item";
import { Container } from "./ui/container";
import { Icons } from "./icons";
import { Separator } from "./ui/separator";
import { Link } from "@remix-run/react";

const FooterSocialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/",
    icon: Icons.facebook,
  },
  {
    name: "Twitter",
    url: "https://www.twitter.com/",
    icon: Icons.twitter,
  },
  {
    name: "Discord",
    url: "https://www.discord.com/",
    icon: Icons.discord,
  },
  {
    name: "Telegram",
    url: "https://www.telegram.com/",
    icon: Icons.telegram,
  },
];

const FooterSocial = () => {
  return (
    <div className="flex items-center space-x-4">
      {FooterSocialLinks.map((link) => (
        <Link to={link.url} key={link.name} target="_blank">
          <link.icon className="hover:text-primary size-5" />
        </Link>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <Container className="my-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          <Logo />
        </div>
        <div className="flex-1 flex justify-center">
          <NavigationMenu />
        </div>
        <div className="flex-1 flex justify-end">
          <FooterSocial />
        </div>
      </div>
      <Separator
        decorative
        className="my-4 h-[1.5px] bg-gradient-to-r from-[#8D8EFC] via-[#8DC6FC] to-[#8D8EFC]"
      />
      <p className="text-xs text-center text-muted-foreground">
        Copyright © {new Date().getFullYear()} Purr | All Rights Reserved
      </p>
    </Container>
  );
};

export default Footer;
