export default class InitCommand{
    constructor(data){
        this.data = data;
        this.type = "init"
    }

    exec(car){
        car.init(this.data);
    }
}