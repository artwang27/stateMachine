
class Game{


    constructor(){
        this.FSM= new StateMachine(this);
        this.init();
        this.pee=0;
    }


    init(){
        let newState = new LoadingState();
        let peeState = new PeeState();
        this.FSM.setGlobalState(peeState);
        this.FSM.init(newState);

    }
}