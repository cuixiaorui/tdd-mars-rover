export default class RotationCommand{
    constructor(dir){
        this.dir = dir;
    }

    exec(car){
      if (this.dir === "right") {
        car.toRight();
      } else {
        car.toLeft();
      }
    }
}