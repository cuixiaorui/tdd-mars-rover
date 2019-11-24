import { clear, addCommand, exec, size } from '../index';
import {
  createInitCommand,
  createRotationCommand,
  createMoveCommand
} from '../command/index';

import { rotationConst } from '../const';

function addInitCommand(extendData) {
  const initData = {
    position: {
      x: 0,
      y: 0
    },
    rotation: rotationConst.North
  };
  const newData = Object.assign({}, initData, extendData)
  addCommand(createInitCommand(newData));
}

it('发送初始化信息后，获取到的小车信息和初始化信息一致', () => {
  addInitCommand();
  const result = exec();
  const initData = {
    position: {
      x: 0,
      y: 0
    },
    rotation: rotationConst.North
  };
  expect(result).toEqual(initData);
});

describe('转向', () => {
  function expectDir(dir) {
    return (expectValue, extendData = {}) => {
      addInitCommand(extendData);
      addCommand(createRotationCommand(dir));
      const result = exec();
      expect(result.rotation).toEqual(expectValue);
    };
  }
  describe('右转', () => {
    const expectToRight = expectDir('right');

    it('发送像右转向的命令后，由 n 变为 s', () => {
      expectToRight(rotationConst.South);
    });

    it('当前朝向为 w ，发送像右转向的命令后，由 w 变为 n', () => {
      expectToRight(rotationConst.North, { rotation: rotationConst.West });
    });
  });

  describe('左转', () => {
    const expectToLeft = expectDir('left');
    it('发送向左转向的命令后，由 s 变为 n', () => {
      expectToLeft(rotationConst.North, { rotation: rotationConst.South });
    });

    it('当前朝向为 n ，发送像右转向的命令后，由 n 变为 w', () => {
      expectToLeft(rotationConst.West);
    });
  });
});

describe('移动', () => {
  describe('前进', () => {
    const handleForward = (rotation, expectPosition) => {
      addInitCommand({ rotation });
      addCommand(createMoveCommand('forward'));
      const result = exec();
      expect(result.position).toEqual(expectPosition);
    };

    it('小车朝北(n)，位置为 (0,0) -> (0,-1) ', () => {
      handleForward(rotationConst.North, { x: 0, y: -1 });
    });

    it('小车朝南(s)，位置为 (0,0) -> (0,1) ', () => {
      handleForward(rotationConst.South, { x: 0, y: 1 });
    });

    it('小车朝西(w)，位置为 (0,0) -> (-1,0) ', () => {
      handleForward(rotationConst.West, { x: -1, y: 0 });
    });

    it('小车朝东(e)，位置为 (0,0) -> (1,0) ', () => {
      handleForward(rotationConst.East, { x: 1, y: 0 });
    });
  });
});

it('添加指令信息后，当前指令信息长度加一', () => {
  addCommand('1');
  expect(size()).toBe(1);
});

it('清空所有的指令信息后，指令size 等于 0 ', () => {
  addCommand('1');
  clear();
  expect(size()).toBe(0);
});

afterEach(() => {
  clear();
});
