import Balancer from "react-wrap-balancer";
import { ClientOnly } from "remix-utils/client-only";

export default  function BalancedText() {
  return <ClientOnly fallback={<div></div>}>
    {() => <Balancer>Hello Queens!</Balancer>}
  </ClientOnly>;
}

