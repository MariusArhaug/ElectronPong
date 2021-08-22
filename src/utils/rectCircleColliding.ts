
import { Circle } from '../types/Circle'

export function RectCircleColliding(circle: Circle ,rect: Rect){
  const distX = Math.abs((circle.x + circle.velocity.x) - rect.x - rect.width/2 - rect.dy);
  const distY = Math.abs((circle.y + circle.velocity.y) - rect.y - rect.height/2 - rect.dy);

  if (distX > (rect.width/2 + circle.radius)) { return false; }
  if (distY > (rect.height/2 + circle.radius)) { return false; }

  if (distX <= (rect.width/2)) { return true; } 
  if (distY <= (rect.height/2)) { return true; }

  const dx=distX-rect.width/2;
  const dy=distY-rect.height/2;
  return (dx*dx+dy*dy<=(circle.radius*circle.radius));
}