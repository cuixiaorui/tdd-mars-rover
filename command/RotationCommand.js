export default class RotationCommand{
    constructor(dir){
        this.dir = dir;
        this.type = "rotation";
    }

    exec(car){
      if (this.dir === "right") {
        car.toRight();
      } else {
        car.toLeft();
      }
    }
}