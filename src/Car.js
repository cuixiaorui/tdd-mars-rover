import { rotationConst } from './const';
const rotations = [
  rotationConst.North,
  rotationConst.South,
  rotationConst.East,
  rotationConst.West
];
const direction = {
  Left: -1,
  Right: 1
};
export default class Car {
  constructor() {}

  init(data) {
    this.setPosition(data.position);
    this.setRotation(data.rotation);
  }

  toDirection(dir) {
    const currentIndex = this.getCurrentIndexByRotation();
    let newIndex = (currentIndex + 4 + dir) % rotations.length;
    let newRotation = rotations[newIndex];
    this.setRotation(newRotation);
  }

  toRight() {
    this.toDirection(direction.Right);
  }

  toLeft() {
    this.toDirection(direction.Left);
  }

  getCurrentIndexByRotation() {
    return rotations.indexOf(this.rotation);
  }

  setRotation(rotation) {
    this.rotation = rotation;
  }

  getData() {
    return {
      position: this.getPosition(),
      rotation: this.getRotation()
    };
  }
  getRotation() {
    return this.rotation;
  }

  setPosition(position) {
    this.position = position;
  }

  getPosition() {
    return this.position;
  }

  setX(val) {
    this.position.x = val;
  }

  setY(val) {
    this.position.y = val;
  }
}

export function createCar(){
  return new Car();
}
