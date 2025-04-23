import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";

const NumberDisplay = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
  text-shadow: 1px 1px 3px rgba(0,0,0,0.1);

  @media (max-width: 600px) {
    font-size: 3rem;
  }
`;

const AnimateNumber = memo(({ target = 200, duration = 3000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const startTime = performance.now();//gets the exact timestamp when animation starts.
        //currentTime is time at this animation frame.It’s the number of milliseconds since the page was loaded 
        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const newValue = Math.floor(progress * target);
            setCount(newValue);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        //Kicks off the animation loop when the component mounts.
        requestAnimationFrame(updateCounter);

        return () => {
            setCount(0);
        };
    }, [target, duration]);

    return <NumberDisplay>{count}</NumberDisplay>;
});

export default AnimateNumber;
