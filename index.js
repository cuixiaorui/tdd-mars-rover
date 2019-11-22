import Car from './Car';

let car;
export function exec() {
  initCar();
  commandList.forEach(command => command.exec(car));
  return car.getData();
}

function initCar() {
  car = new Car();
}

let commandList = [];
export function addCommand(command) {
  commandList.push(command);
}

export function size() {
  return commandList.length;
}

export function clear() {
  commandList = [];
}
