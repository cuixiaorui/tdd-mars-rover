import MarsMap from '../src/MarsMap';
describe('map', () => {
  function createMarsMap() {
    const marsMap = new MarsMap();
    marsMap.init(400, 400);
    return marsMap;
  }
  it('设置地图的范围, 400 * 400', () => {
    const marsMap = createMarsMap();
    expect(marsMap.getRange()).toEqual({ width: 400, height: 400 });
  });

  describe('检测障碍物', () => {
    it('(100,100) => false ,坐标为 100，100 不是障碍物', () => {
      const marsMap = createMarsMap();
      expect(marsMap.isBarrier()).toBe(false);
    });

    it('(100,100) => true ,坐标为 100，100 是障碍物', () => {
      const marsMap = createMarsMap();
      const position = {x:100,y:100}
      marsMap.putBarrier(position);
      expect(marsMap.isBarrier({x:100,y:100})).toBe(true);
    });
  });
});
