import { Link } from "@remix-run/react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

const Logo = () => {
  return (
    <CardContainer>
      <CardBody>
        <div className="flex items-center justify-center">
          <CardItem translateZ="150">
            <Link to="/">
              <img src="/3x3.svg" alt="logo" className="size-8" />
            </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default Logo;
