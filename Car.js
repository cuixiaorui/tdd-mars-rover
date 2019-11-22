// n s e w
const rotations = ['n', 's', 'e', 'w'];
export default class Car {
  constructor() {}

  init(data) {
    this.setPosition(data.position);
    this.setRotation(data.rotation);
  }
  toRight() {
    this.setRotation(this.getNextRotation());
  }

  getNextRotation() {
    const currentIndex = this.getCurrentIndexByRotation();
    const nextIndex =
      currentIndex + 1 >= rotations.length ? 0 : currentIndex + 1;
    return rotations[nextIndex];
  }

  toLeft() {
    this.setRotation(this.getPreRotation());
  }

  getPreRotation() {
    const currentIndex = this.getCurrentIndexByRotation();
    const preIndex =
      currentIndex - 1 < 0 ? rotations.length - 1 : currentIndex - 1;
    return rotations[preIndex];
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
