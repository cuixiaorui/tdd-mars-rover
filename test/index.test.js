import { clear, addCommand, exec, size, __RewireAPI__ as Main } from '../src/index';
import {
  createInitCommand,
  createRotationCommand,
  createMoveCommand,
  createRangeCommand
} from '../src/command/index';

import { rotationConst } from '../src/const';

function createInitData(){
  return {
    position: {
      x: 0,
      y: 0
    },
    rotation: rotationConst.North
  }
}

function addInitCommand(extendData) {
  const newData = Object.assign({}, createInitData(), extendData);
  addCommand(createInitCommand(newData));
}

it('发送初始化信息后，获取到的小车信息和初始化信息一致', () => {
  addInitCommand();
  const result = exec();
  expect(result).toEqual(createInitData());
});

describe('转向', () => {
  function handleDir(dir) {
    return (expectValue, extendData = {}) => {
      addInitCommand(extendData);
      addCommand(createRotationCommand(dir));
      const result = exec();
      expect(result.rotation).toEqual(expectValue);
    };
  }
  describe('右转', () => {
    const expectToRight = handleDir('right');

    it('发送像右转向的命令后，由 n 变为 s', () => {
      expectToRight(rotationConst.South);
    });

    it('当前朝向为 w ，发送像右转向的命令后，由 w 变为 n', () => {
      expectToRight(rotationConst.North, { rotation: rotationConst.West });
    });
  });

  describe('左转', () => {
    const expectToLeft = handleDir('left');
    it('发送向左转向的命令后，由 s 变为 n', () => {
      expectToLeft(rotationConst.North, { rotation: rotationConst.South });
    });

    it('当前朝向为 n ，发送像右转向的命令后，由 n 变为 w', () => {
      expectToLeft(rotationConst.West);
    });
  });
});

describe('移动', () => {
  const handleMove = key => {
    return (rotation, expectPosition, num = 1) => {
      addInitCommand({ rotation });

      for (let index = 0; index < num; index++) {
        addCommand(createMoveCommand(key));
      }
      const result = exec();
      expect(result.position).toEqual(expectPosition);
    };
  };

  const handleForward = handleMove('forward');
  const handleBack = handleMove('back');
  describe('前进', () => {
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

  describe('后退', () => {
    it('小车朝北(n)，位置为 (0,0) -> (0,1) ', () => {
      handleBack(rotationConst.North, { x: 0, y: 1 });
    });

    it('小车朝南(s)，位置为 (0,0) -> (0,-1) ', () => {
      handleBack(rotationConst.South, { x: 0, y: -1 });
    });

    it('小车朝西(w)，位置为 (0,0) -> (1,0) ', () => {
      handleBack(rotationConst.West, { x: 1, y: 0 });
    });

    it('小车朝东(e)，位置为 (0,0) -> (-1,0) ', () => {
      handleBack(rotationConst.East, { x: -1, y: 0 });
    });

    it('小车朝东(e)，后退 2 次 ，位置为 (0,0) -> (-2,0) ', () => {
      handleBack(rotationConst.East, { x: -2, y: 0 }, 2);
    });
  });

  describe('障碍物', () => {
    it('小车朝北(n)，位置为 (0,0) ，前进遇到障碍物(0,1)，停留在原地(0,0)', () => {
      addCommand(
        createRangeCommand({
          width: 400,
          height: 400,
          barrierList: [{ x: 0, y: -1 }]
        })
      );
      handleForward(rotationConst.North, { x: 0, y: 0 });
    });

    it('火星车遇到了障碍物导致后续指令受阻，应该停留在原地，放弃执行后续指令，并立即向地球回报, 添加了 5 个命令，应该只执行 3 次', () => {
      let count = 0;
      const mockHandleExec = () => {
        const fn = Main.__get__('handleExec');
        Main.__Rewire__('handleExec', function(...args) {
          count++;
          return fn(...args);
        });
      };
      mockHandleExec();

      addCommand(
        createRangeCommand({
          width: 400,
          height: 400,
          barrierList: [{ x: 0, y: -1 }]
        })
      );
      addInitCommand({rotation:rotationConst.North});
      addCommand(createMoveCommand("forward"));
      addCommand(createMoveCommand("forward"));
      addCommand(createMoveCommand("forward"));
      const result = exec();
      expect(result.position).toEqual({x:0,y:0});
      expect(count).toBe(3);
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
