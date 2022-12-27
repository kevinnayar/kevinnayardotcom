import { useState, useEffect } from 'react';
import { PolygonProps, SvgEffectProps, generateTrianglesList } from './svg-effect-utils';

const Polygon = ({ points, stroke }: PolygonProps) => (
  <polygon
    points={points}
    stroke={stroke}
    fill="transparent"
  />
);

const SvgEffect = (props: SvgEffectProps) => {
  const [trianglesList, setTrianglesList] = useState(generateTrianglesList(props));

  useEffect(() => {
    const interval = setInterval(() => {
      setTrianglesList(generateTrianglesList(props));
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="svg"
      height={props.canvasHeight}
    >
      {trianglesList.map((triangles, index) => (
        <g className="g" key={index}>
          {triangles.map(({ points, color }, i) => (
            <Polygon
              key={`${color}.${points}.${i}`}
              points={points}
              stroke={color}
            />
          ))}
        </g>
      ))}
    </svg>
  );
};

export default SvgEffect;