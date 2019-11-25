export default class MarsMap {
  constructor() {
    this.width = null;
    this.height = null;
    this.barrierList = [];
  }
  init(width, height) {
    this.width = width;
    this.height = height;
  }

  putBarrier(position) {
    if (Array.isArray(position)) {
      this.barrierList.push(...position);
    } else {
      this.barrierList.push(position);
    }
  }

  isBarrier(position) {
    return this.barrierList.some(({ x, y }) => {
      return x === position.x && y === position.y;
    });
  }

  getRange() {
    return {
      width: this.width,
      height: this.height
    };
  }
}

export function createMarsMap() {
  return new MarsMap();
}
