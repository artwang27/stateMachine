
//遊戲狀態
class GameState{
    
    //注意：constructor 沒有綁定特定的 owner
    //owner 是在 update, enter, exit 時才動態傳入的，這樣子，才可以讓不同的人共用 gameState
    constructor(){
        this.className = this.constructor.name;

        //經由繼承，this.constructor.name 是指後代的衍生類別
        //所以 this.className是正確的
        //console.log("create a new state: " + this.className  );
    }

    update(owner){
        //this.whenUpdate();
        //owner.mayBeDoSomeThing();

        //console.log(this.className+ " -> update state...");
    }

    enter(owner){
        // this.whenEneter();
        // owner.fun1();

        //console.log(this.className +" -> enter state");
    }


    exit(owner) {
        // this.whenExit();
        // owner.fun2();

        //console.log(this.className + " -> exit state");
    }




}//GameState