
import InitCommand from './InitCommand';
import RotationCommand from "./RotationCommand"

export function createInitCommand(data){
    return new InitCommand(data)
}
export function createRotationCommand(type){
    return new RotationCommand(type)
}