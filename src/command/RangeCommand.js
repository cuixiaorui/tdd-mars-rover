export default class RangeCommand {
  constructor(data) {
    this.data = data;
  }

  exec(car, map) {
    const { width, height, barrierList } = this.data;
    map.init(width, height);
    map.putBarrier(barrierList);
  }
}
