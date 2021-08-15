
//自定義事件
let myEvent = {
    accuForce: "accumulatingForceEvent", //蓄力中事件
    releaseForce: "releaseForceEvent",   //釋放力量
}


class PeeState extends GameState{
    constructor(){
        super();
        this.toWc_State = new ToWC();
    }

    enter(){
        print3("*** 尿尿 enter");
    }

    update(owner){
        owner.pee++;
        //print2("尿意： "+owner.pee);

        //想要尿尿
        if(owner.pee>100){
            owner.FSM.interruptBegin(this.toWc_State);
        }
    }
}


class ToWC extends GameState{

    enter(){
        print3("到廁所了");
    }

    update(owner){
        if(owner.pee>0){
            owner.pee -= 10;
            print3("噓~~ " + owner.pee);
        }
        else{
            owner.FSM.interruptEnd();
        }
    }

    exit(owner){
        owner.pee = 0;
        print3("上完廁所要洗手");
    }
}


//******************************************** */

class LoadingState extends GameState {
    
    constructor(){
        super();
        this.percent=0;
    }

    enter(owner){
        print3("開始讀檔");

    }

    update(owner){
        let delta=random(1);
        this.percent+=delta;
        print3("read..."+ this.percent+"%");

        if(this.percent >= 100){
            let newState=new WaitForceState();
            owner.FSM.change(newState );
        }
    }

    exit(owner){
        print3("讀檔完畢---");
        this.percent=0;
    }
}





class WaitForceState extends GameState {

    constructor(){
        super();
        this.force=0;
    }


    enter(owner){
        const KeyArrowDown = 40;    //向下鍵
        let self=this;  //注意，事件處理器的 this 是觸發的那個 target，不是這個物件

        $("body").bind(myEvent.accuForce, function (e) {
            print3("蓄力中..." + self.force);
            self.force++;
        })

        $("body").bind(myEvent.releaseForce, function (e) {

            //changeState
            let newState= new SpringState();
            owner.maxForce = self.force;
            owner.FSM.change(newState);
        })

        $("body").keydown(function (e) {
            if (e.which == KeyArrowDown) {    //按了向下鍵
                $("#forceState").trigger(myEvent.accuForce);
            }

        });


        $("body").keyup(function (e) {
            if (e.which == KeyArrowDown) {
                $("#forceState").trigger(myEvent.releaseForce);
            }
        });


    $("body").mousemove(function (e) {
        //滑鼠左鍵被按住，而且在移動，代表拖曳狀態
        if(e.which==1){
            $("#forceState").trigger(myEvent.accuForce);
        }
    });

    $("body").mouseup(function (e) {
        //鬆開滑鼠左鍵
        if (e.which == 1) {
            $("#forceState").trigger(myEvent.releaseForce);
        }
    });

        print3("force enter：請出力，開始");
    }

    update(owner){
        
    }

    exit(owner){
        print3("釋放... " + this.force + " 牛頓!");
        print3("exit force");
        this.force = 0;
        //$("body").unbind();
        $("body").unbind(myEvent.accuForce);
        $("body").unbind(myEvent.releaseForce);
        
    }

}




class SpringState extends GameState{

    enter(owner){
        print3("啟動彈簧");
    }

    update(owner){
        print3( "彈簧釋放. "+owner.maxForce);
        if(owner.maxForce<=0){
            let newState= new FinishState();
            owner.FSM.change(newState);
        }
        owner.maxForce--;
    }

    exit(owner){
        print3("exit 彈簧");
    }

}

class FinishState extends GameState{
    enter(){
        print3("完成任務");
    }

    update(){
        //do nothing
    }
}

