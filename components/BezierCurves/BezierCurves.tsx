import { useWindowSize } from '../../hooks/useWindowSize';
import { Dimensions, Point } from '../../types/types';

function getRandomIntInRange(from: number, to: number): number {
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

function createQuadraticCurvePath(points: Point[]): string {
  if (points.length < 3 || points.length % 2 !== 1) {
    throw new Error(
      [
        'Points array must have at least 3 items and',
        'the total number of items must be an odd number.',
      ].join(' '),
    );
  }

  let i = 0;
  let path = ''; // M x y Q cx1 cy1, ex1 ey1, Q cx2 cy2, ex2 ey2, ...

  while (i < points.length - 1) {
    const point = points[i];
    if (i === 0) {
      // Move to -> 'M mx my'
      const [mx, my] = point;
      path += `M ${mx} ${my}`;
      i += 1;
    } else {
      // Quadratic curve (control point + end point) -> 'Q cx cy, ex ey'
      const [cx, cy] = point;
      const [ex, ey] = points[i + 1];
      path += ` Q ${cx} ${cy}, ${ex} ${ey}`;
      i += 2;
    }
  }

  return path;
}

const BezierCurve = ({
  dimensions: { width, height },
  duration,
}: {
  dimensions: Dimensions;
  duration: number;
}) => {
  const [x1, x2, x3] = [0, getRandomIntInRange(width * 0.33, width * 0.67), width];
  const getRandomY = () => getRandomIntInRange(-height * 0.33, height * 1.33);
  const points: Point[] = [
    [x1, getRandomY()],
    [x2, getRandomY()],
    [x3, getRandomY()],
  ];
  const path = createQuadraticCurvePath(points);

  return (
    <path
      className="bezier-curve"
      d={path}
      stroke="#454545"
      strokeWidth={0.5}
      fill="none"
      opacity={0.25}
    >
      <animate
        attributeType="XML"
        attributeName="stroke-opacity"
        dur={`${duration}s`}
        from="0"
        to="1"
        fill="freeze"
      />
    </path>
  );
};

const BezierCurves = () => {
  const windowSize = useWindowSize();
  if (!windowSize) return null;

  const { width, height } = windowSize;
  const curves = Array.from({ length: 1000 });
  const durationMultiplier = 0.03;

  return (
    <svg
      className="bezier-curves"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      {curves.map((_, index) => (
        <BezierCurve
          dimensions={windowSize}
          key={index}
          duration={index * durationMultiplier}
        />
      ))}
    </svg>
  );
};

export default BezierCurves;
