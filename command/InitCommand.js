export default class InitCommand{
    constructor(data){
        this.data = data;
    }

    exec(car){
        car.init(this.data);
    }
}