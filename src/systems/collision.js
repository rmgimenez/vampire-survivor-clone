export function distanceSquared(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export function circlesOverlap(a, b, extraRadius = 0) {
  const radius = a.radius + b.radius + extraRadius;
  return distanceSquared(a, b) <= radius * radius;
}

export function aabbOverlap(boundsA, boundsB) {
  return (
    boundsA.left <= boundsB.right &&
    boundsA.right >= boundsB.left &&
    boundsA.top <= boundsB.bottom &&
    boundsA.bottom >= boundsB.top
  );
}

export function isPointInCone(origin, directionAngle, point, distance, halfAngle) {
  const dx = point.x - origin.x;
  const dy = point.y - origin.y;
  const pointDistance = Math.hypot(dx, dy);

  if (pointDistance > distance) {
    return false;
  }

  const angle = Math.atan2(dy, dx);
  const delta = Math.atan2(Math.sin(angle - directionAngle), Math.cos(angle - directionAngle));
  return Math.abs(delta) <= halfAngle;
}
