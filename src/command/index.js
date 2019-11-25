
import InitCommand from './InitCommand';
import RotationCommand from "./RotationCommand"
import MoveCommand from "./MoveCommand"
import RangeCommand from './RangeCommand';

export function createInitCommand(data){
    return new InitCommand(data)
}
export function createRotationCommand(dir){
    return new RotationCommand(dir)
}

export function createMoveCommand(type){
    return new MoveCommand(type)
}

export function createRangeCommand(range){
    return new RangeCommand(range)
}