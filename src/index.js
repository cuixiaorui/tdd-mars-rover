import {createCar} from './Car'
import {createMarsMap} from './MarsMap';

export function exec() {
  let car = createCar(); 
  let map = createMarsMap(); 
  execCommand(car,map);
  return car.getData();
}

function execCommand(car,map){
  for (let index = 0; index < commandList.length; index++) {
    const command = commandList[index]
    const result = handleExec(car,map,command);
    if(result) return;
  }
}

function handleExec(car,map,command) {
  return command.exec(car, map);
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
