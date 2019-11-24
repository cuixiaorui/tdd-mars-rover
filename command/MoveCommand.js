export default class MoveCommand {
  constructor(dir) {
    this.dir = dir;
  }

  exec(car) {
    const newPosition = this.getNewPosition(car);
    this.updateCarPosition(car,newPosition)
  }

  updateCarPosition(car,position){
    const { fn } = this.getOperation(car);
    fn.call(car, position);
  }

  getNewPosition(car) {
    const position = car.getPosition();
    const operation = this.getOperation(car);
    const { prop } = operation; 
    const dir = operation[this.dir].val;
    return position[prop] + dir;
  }

  getOperation(car) {
    const rotation = car.getRotation();
    const map = this.createOperationInfo(car);
    return map[rotation];
  }

  createOperationInfo(car) {
    return {
      n: this.createMoveInfo(car.setY, 'y', -1, 1),
      s: this.createMoveInfo(car.setY, 'y', 1, -1),
      w: this.createMoveInfo(car.setX, 'x', -1, 1),
      e: this.createMoveInfo(car.setX, 'x', 1, -1)
    };
  }

  createMoveInfo(fn, prop, forwardVal, backVal) {
    return {
      fn,
      prop,
      forward: {
        val: forwardVal
      },
      back: {
        val: backVal
      }
    };
  }
}
