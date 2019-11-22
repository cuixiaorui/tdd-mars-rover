export default class MoveCommand {
  constructor(dir) {
    this.dir = dir;
    this.type = 'move';
  }

  exec(car) {
    if (this.dir === 'forward') {
      const rotation = car.getRotation();
      const position = car.getPosition();


      switch (rotation) {
        case 'n':
          car.setY(position.y - 1);
          break;
        case 's':
          car.setY(position.y + 1);
          break;
        case "w":
          car.setX(position.x - 1);
          break;
        case "e":
          car.setX(position.x + 1);
          break;
      }
    }
  }
}
