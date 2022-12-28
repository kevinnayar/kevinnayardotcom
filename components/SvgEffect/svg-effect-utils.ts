type Point = [number, number];

type Triangle = [Point, Point, Point];

type Color = {
  r: number,
  g: number,
  b: number,
};

type TriangleConfig = {
  points: string;
  color: string;
};

export type TriangleOpts = {
  canvasHeight: number,
  numIterations: number;
  numTriangles: number;
  minSize: number;
  maxSize: number;
};

function getRandomIntBetween(lower: number, upper: number) {
  return Math.round(Math.random() * (upper - lower) + lower);
}

function getRandomColor(): Color {
  return {
    r: getRandomIntBetween(55, 175),
    g: getRandomIntBetween(55, 175),
    b: getRandomIntBetween(55, 175),
  };
}

function convertTriangleToPointsPath(triangle: Triangle) {
  const points = [];
  for (const [x, y] of triangle) {
    points.push(`${x}, ${y}`);
  }
  return points.join(' ');
}

function createNextTriangle(start: Point, opts: TriangleOpts): TriangleConfig {
  const { canvasHeight, minSize, maxSize } = opts;
  const [x1, y1] = start;

  let isUp = Math.random() < 0.5;
  if (y1 > canvasHeight) isUp = true;
  if (y1 < 0) isUp = false;

  /* 
  ---------------------------------
  |  for x2 and x3 (based on x1)  |
  ---------------------------------
           |                     |
  <--x1---min-------------------max-->
           |<-------range------->|

  */
  const x2 = x1 + getRandomIntBetween(minSize, maxSize);
  const x3 = x1 + getRandomIntBetween(minSize, maxSize);

  /*
  ---------------------------------
  |  for y2 and y3 (based on y1)  |
  ---------------------------------

       | * y1 (isUp === true)    max-| ▲
   min-| ▲   direction-▼             | |
       | |                           | | <-range
       | | <-range                   | |
       | |                       min-| ▼   direction-▲
   max-| ▼                           | * y1 (isUp === false)
       |_____________________        |_____________________

  */
  const y2 = isUp
    ? y1 - getRandomIntBetween(minSize, maxSize)
    : y1 + getRandomIntBetween(minSize, maxSize);
  const y3 = isUp
    ? y1 - getRandomIntBetween(minSize, maxSize)
    : y1 + getRandomIntBetween(minSize, maxSize);

  const points = convertTriangleToPointsPath([
    [x1, y1],
    [x2, y2],
    [x3, y3]
  ]);
  
  const { r, g, b } = getRandomColor();
  const a = Math.random() * 0.3;
  const color = `rgba(${r}, ${g}, ${b}, ${a})`;

  return {
    points,
    color,
  };
}

function createTrianglesList(start: Point, opts: TriangleOpts): TriangleConfig[] {
  const triangles: Array<TriangleConfig> = [];
  let nextStart = start;

  for (let i = 0; i < opts.numTriangles; i += 1) {
    const triangle = createNextTriangle(
      nextStart,
      opts,
    );
    const nextStartList = triangle.points
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

export function createTrianglesListCollection(opts: TriangleOpts): Array<TriangleConfig[]> {
  const trianglesListColl: Array<TriangleConfig[]> = [];

  for (let i = 0; i < opts.numIterations; i += 1) {
    const x1 = 0;
    const y1 = opts.canvasHeight * (i / opts.numIterations);
    const trianglesList = createTrianglesList([x1, y1], opts);
    trianglesListColl.push(trianglesList);
  }
  
  return trianglesListColl;
}


