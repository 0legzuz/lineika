import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Colors from "../../AppStyles";

const StripesContainer = styled.div`
  position: absolute;
  border-left: solid 3px ${Colors.black};
  padding-left: 5px;
  right: 0;
  top: 66px;
  bottom: 0;
  width: 29px;
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(4px, 1fr));
  gap: 10px;
  overflow: hidden;
  justify-items: end;
  background-color: ${Colors.y};
`;

const Stripe = styled.div`
  width: 10px;
  height: 2px;
  background-color: ${Colors.black};
  border-radius: 1px 0 0 1px;
`;

const StripeBig = styled.div`
  width: 20px;
  height: 3px;
  background-color: ${Colors.black};
  border-radius: 2px 0 0 2px;
`;

const Stripes: React.FC = () => {
  const [stripeCount, setStripeCount] = useState<number>(0);

  useEffect(() => {
    const updateStripes = () => {
      const containerHeight = document.documentElement.scrollHeight;
      const stripeHeight = 4 + 10;
      const count = Math.floor(containerHeight / stripeHeight);
      setStripeCount(count);
    };

    updateStripes();
    window.addEventListener("resize", updateStripes);
    return () => window.removeEventListener("resize", updateStripes);
  }, []);

  return (
    <StripesContainer>
      {Array.from({ length: stripeCount }, (_, index) =>
        index % 5 === 0 ? <StripeBig key={index} /> : <Stripe key={index} />
      )}
    </StripesContainer>
  );
};

export default Stripes;
