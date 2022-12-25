import { useState, useEffect } from 'react';

type Triangle = [
  [number, number],
  [number, number],
  [number, number],
];

type Color = {
  r: number,
  g: number,
  b: number,
};

type TriangleConfig = {
  points: string;
  colorAlpha: string;
};

type TrianglesOpts = {
  containerHeight: number,
  numIterations: number;
  numTriangles: number;
  minSize: number;
  maxSize: number;
  color: Color,
};

function getRandomNumberInRange(lower: number, upper: number): number {
  return Math.round(Math.random() * (upper - lower) + lower);
}

function convertTriangleToPoints(triangle: Triangle): string {
  const points = [];
  for (const [x, y] of triangle) {
    points.push(`${x}, ${y}`);
  }
  return points.join(' ');
}

function generateNextTriangle(
  start: [number, number],
  opts: TrianglesOpts,
): TriangleConfig {
  const { color, containerHeight, minSize, maxSize } = opts;
  const [x1, y1] = start;
  const { r, g, b } = color;

  let isUp = Math.random() < 0.5;
  if (y1 > containerHeight) isUp = true;
  if (y1 < 0) isUp = false;

  const x2 = x1 + getRandomNumberInRange(minSize, maxSize);
  const x3 = x1 + getRandomNumberInRange(minSize, maxSize);

  const y2 = isUp
    ? y1 - getRandomNumberInRange(minSize, maxSize)
    : y1 + getRandomNumberInRange(minSize, maxSize);
  const y3 = isUp
    ? y1 - getRandomNumberInRange(minSize, maxSize)
    : y1 + getRandomNumberInRange(minSize, maxSize);

  const triangle: Triangle = [
    [x1, y1],
    [x2, y2],
    [x3, y3]
  ];
  const points = convertTriangleToPoints(triangle);
  const a = Math.random() * 0.3;
  const colorAlpha = `rgba(${r}, ${g}, ${b}, ${a})`;

  return {
    points,
    colorAlpha,
  };
}

function generateNNextTriangles(
  start: [number, number],
  opts: TrianglesOpts,
): Array<TriangleConfig> {
  const triangles: Array<TriangleConfig> = [];
  let nextStart = start;

  for (let i = 0; i < opts.numTriangles; i += 1) {
    const triangle = generateNextTriangle(
      nextStart,
      opts,
    );
    const { points } = triangle;
    const nextStartList = points
      .split(' ')
      .map((p) => parseInt(p.replace(',', '').trim(), 10));
    
    /*
      [00, 01, 02, 03, 04, 05]
      [x1, y1, x2, y3, x3, y3]
               ??      ??
      find out which right point is larger - x2 or x3?
      use that [x, y] tuple as next starting point
    */
    nextStart = nextStartList[2] > nextStartList[4]
      ? [nextStartList[2], nextStartList[3]]
      : [nextStartList[4], nextStartList[5]];

    triangles.push(triangle);
  }

  return triangles;
}

function generateTrianglesList(opts: TrianglesOpts): TriangleConfig[][] {
  const triangleYStarts = Array.from(Array(opts.numIterations)).map((_, i) => {
    return opts.containerHeight * (i / opts.numIterations);
  });

  const trianglesList = triangleYStarts.map((yStart) => generateNNextTriangles(
    [0, yStart],
    opts,
  ));
  
  return trianglesList;
}

type PolygonProps = {
  points: string;
  stroke: string;
};

const Polygon = ({ points, stroke }: PolygonProps) => (
  <polygon
    points={points}
    stroke={stroke}
    fill="transparent"
  />
);

const SvgEffect = () => {
  const opts: TrianglesOpts = {
    containerHeight: 600,
    numIterations: 20,
    numTriangles: 60,
    minSize: 30,
    maxSize: 180,
    color: {
      r: 116,
      g: 116,
      b: 116,
    },
  };

  const [trianglesList, setTrianglesList] = useState(generateTrianglesList(opts));

  useEffect(() => {
    const interval = setInterval(() => {
      setTrianglesList(generateTrianglesList(opts));
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="svg"
      height={opts.containerHeight}
    >
      {trianglesList.map((triangles, index) => (
        <g className="g" key={index}>
          {triangles.map(({ points, colorAlpha }, i) => (
            <Polygon
              key={`${colorAlpha}.${points}.${i}`}
              points={points}
              stroke={colorAlpha}
            />
          ))}
        </g>
      ))}
    </svg>
  );
};

export default SvgEffect;