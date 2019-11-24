export default class MoveCommand {
  constructor(dir) {
    this.dir = dir;
    this.car = null;
  }

  exec(car) {
    this.car = car;

    const newPosition = this.getNewPosition();
    this.updateCarPosition(newPosition)
  }

  updateCarPosition(position){
    const { fn } = this.getOperation();
    fn.call(this.car, position);
  }

  getNewPosition() {
    const position = this.car.getPosition();
    const operation = this.getOperation();
    const { prop } = operation; 
    const dir = operation[this.dir].val;
    return position[prop] + dir;
  }

  getOperation() {
    const rotation = this.car.getRotation();
    const map = this.createOperationInfo();
    return map[rotation];
  }

  createOperationInfo() {
    return {
      n: this.createMoveInfo(this.car.setY, 'y', -1, 1),
      s: this.createMoveInfo(this.car.setY, 'y', 1, -1),
      w: this.createMoveInfo(this.car.setX, 'x', -1, 1),
      e: this.createMoveInfo(this.car.setX, 'x', 1, -1)
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
