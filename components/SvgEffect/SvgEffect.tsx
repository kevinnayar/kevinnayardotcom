import { useState, useEffect } from 'react';
import { TriangleConfig, TriangleOpts, createTrianglesListCollection } from './svg-effect-utils';

type PolygonProps = {
  points: string,
  stroke: string,
};

const Polygon = ({ points, stroke }: PolygonProps) => (
  <polygon
    points={points}
    stroke={stroke}
    fill="transparent"
  />
);

const SvgEffect = (props: TriangleOpts) => {
  const [list, setList] = useState<Array<TriangleConfig[]>>(createTrianglesListCollection(props));
  const step = 300;
  const interval = step * list.length * list.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setList(createTrianglesListCollection(props));
      console.log('inrerval fired!');
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  });


  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="svg"
      height={props.canvasHeight}
    >
      {list.map((triangles, index) => (
        <g
          key={index}
          style={{
            animationDuration: `${step * list.length}ms`,
            animationDelay: `${step * index}ms`,
            animationTimingFunction: 'ease',
            animationIterationCount: 'infinite',
          }}
          >
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