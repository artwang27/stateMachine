
//遊戲狀態管理員

class StateMachine{

    //誰(需要)擁有這個管理者呢？一般而言，是指 game 物件
    constructor(owner){
        this.owner=owner;
        this.currentState=null;
        this.previousState=null;
        this.globalState = null;  //全局的 state，它一直存在，每個 frame 更新一次
    }

    
    update(){
        //要先更新全局的 state
        if(this.globalState){
            this.globalState.update(this.owner);
        }

        if(this.currentState){
            this.currentState.update(this.owner);
        }
    }


    //傳回是否成功切換到新的狀態
    change(newState){
        if(newState==undefined){
            alert("newState 尚未被定義");
            return false;
        }

        this.previousState= this.currentState;  //目前的 state 已經變舊了
        this.currentState.exit(this.owner);
        this.currentState= newState;
        this.currentState.enter(this.owner);
    }


    //暫時中斷目前的狀態，插播新的狀態(之後記得還要使用 interruptEnd，但並非寫在 globalState 裡，詳見其函式的說明)
    //使用時機： 寫在 globalState 的 update 內
    //例如： globalState.update(owner){ 若憋不住尿了 owner.FSM.interruptBegin(this.toWc_State); }
    interruptBegin(newState) {
        if (newState == undefined) {
            alert("interrupt 的 newState 尚未被定義");
            return false;
        }

        //若目前已經在此狀態，就不必再插播
        if ( this.isCurrentState(newState) )   return false;    

        this.previousState = this.currentState;  //把目前的 state 先存起來
        //XXX this.currentState.exit(this.owner);   不必退出目前狀態，待會兒還要再回來
        this.currentState = newState;
        this.currentState.enter(this.owner);
    }


    //插播的事已經做完，恢復回之前被中斷的狀態
    //使用時機： 寫在 插播的 state 的 update 內
    //例如： ToWC.update(owner){ 尿完了; owner.FSM.interruptEnd(); }
    interruptEnd() {
        this.currentState.exit(this.owner);
        this.currentState = this.previousState;
        //XXX this.currentState.enter(this.owner); 不必 enter()，否則該狀態又會重新開始
        //而且，他本來就處於 update()
        this.currentState.update(this.owner);   //直接跳回當初的 update
    }


    //目前是否處於這個 state 裡？
    //傳入要比對的 state 是誰，它應該要是狀態類別的物件
    isCurrentState( state ) {
        return this.currentState.className == getClassName(state);
    }


    //基本設定

    setCurrentState(st){
        this.currentState = st;
    }

    setPreviousState( st){
        this.previousState = st;
    }

    setGlobalState(st){
        this.globalState=st;
    }

    //從 init 開始設定第一個 state
    //說明：一定要這樣不可，否則會直接跳到 update()， 而 enter() 不會被呼叫到
    //也不能使用 chage(firstState)，因為它一開始就呼叫 exit()，但 exit 卻是 null
    init(firstState){
        this.currentState = firstState;
        this.currentState.enter(this.owner);
    }




}//StateMachine
