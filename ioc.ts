interface Monitor {}

class Monitor27nch implements Monitor {

}

interface Host {}

class LegendHost implements Host {}


class  Computer {
    monitor:Monitor
    host:Host
    constructor(monitor,host){
        this.monitor=monitor
        this.host=host
    }

    startUp(){
        console.log("开机了")
    }
}
let monitor=new Monitor27nch();
let host=new LegendHost();
let computer =new Computer(monitor,host)
//  IOC inverse control  把对象交给容器 然后交给容器控制 而不再自己控制
computer.startUp()