
import InitCommand from './InitCommand';
import RotationCommand from "./RotationCommand"
import MoveCommand from "./MoveCommand"

export function createInitCommand(data){
    return new InitCommand(data)
}
export function createRotationCommand(dir){
    return new RotationCommand(dir)
}

export function createMoveCommand(type){
    return new MoveCommand(type)
}