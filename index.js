import Car from './Car';

export function exec() {
  let car = new Car();
  commandList.forEach(command => command.exec(car));
  return car.getData();
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
