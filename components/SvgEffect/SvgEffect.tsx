import { useState, useEffect } from 'react';

type Triangle = [[number, number], [number, number], [number, number]];

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

type TriangleConfig = {
  points: string;
  colorAlpha: string;
};

type Color = {
  r: number,
  g: number,
  b: number,
};

function generateNextTriangle(
  start: [number, number],
  minSize: number,
  maxSize: number,
  height: number,
  color: Color,
): TriangleConfig {
  const [x1, y1] = start;
  const { r, g, b } = color;

  // const gap = maxSize - minSize;
  let isUp = Math.random() < 0.5;
  if (y1 > height) isUp = true;
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
  const lowAlpha = Math.random() > 0.5;
  const colorAlpha = lowAlpha
    ? `rgba(${r}, ${g}, ${b}, 0.1)`
    : `rgba(${r}, ${g}, ${b}, 0.3)`;

  return {
    points,
    colorAlpha,
  };
}

export function generateNNextTriangles(
  n: number,
  start: [number, number],
  minSize: number,
  maxSize: number,
  height: number,
  color: Color,
): Array<TriangleConfig> {
  const triangles: Array<TriangleConfig> = [];
  let recurseStart = start;

  for (let i = 0; i < n; i += 1) {
    const triangle = generateNextTriangle(
      recurseStart,
      minSize,
      maxSize,
      height,
      color,
    );
    const { points } = triangle;
    const recurseStartList = points
      .split(' ')
      .map((p) => parseInt(p.replace(',', '').trim(), 10));
    recurseStart =
      recurseStartList[2] > recurseStartList[4]
        ? [recurseStartList[2], recurseStartList[3]]
        : [recurseStartList[4], recurseStartList[5]];

    triangles.push(triangle);
  }

  return triangles;
}

type PolygonProps = {
  points: string;
  fill?: string;
  stroke?: string;
};

const Polygon = ({ points, fill, stroke }: PolygonProps) => {
  return (
    <polygon
      points={points}
      fill={fill || 'transparent'}
      stroke={stroke || 'transparent'}
    />
  );
};

const SvgEffect = () => {
  const width = 2240;
  const height = 600;
  const color: Color = { r: 116, g: 116, b: 116 };

  const trianglesOpts = {
    numIterations: 10,
    numTriangles: 120,
    minSize: height / 5,
    maxSize: height / 5 / 5
  };

  const triangleYStarts = Array.from(Array(trianglesOpts.numIterations)).map(
    (_, i) => height * (i / trianglesOpts.numIterations)
  );

  const initTrianglesList = triangleYStarts.map((yStart) => {
    return generateNNextTriangles(
      trianglesOpts.numTriangles,
      [0, yStart],
      trianglesOpts.minSize,
      trianglesOpts.maxSize,
      height,
      color,
    );
  });

  const [trianglesList, setTrianglesList] = useState(initTrianglesList);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTrianglesList = triangleYStarts.map((yStart) => {
        return generateNNextTriangles(
          trianglesOpts.numTriangles,
          [0, yStart],
          trianglesOpts.minSize,
          trianglesOpts.maxSize,
          height,
          color,
        );
      });
      setTrianglesList(newTrianglesList);
    }, 7500);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="svg"
      width={width}
      height={height}
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