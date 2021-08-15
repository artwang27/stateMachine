let canvas;
let game;
let sw = true;
                    

// $(document).ready(function () {
// });

function init(){
    
    $("button").click(function () {
        sw ? $("canvas").hide() : $("canvas").show();
        //sw ? noLoop() : loop();
        sw = !sw;
    });

}

//setup 比 $(document).ready 更早被執行

function setup() {
    canvas2 = createCanvas(400, 400);
    $("canvas").hide();
    printCls();

    game = new Game();
    init();
    eventTest();

}


function draw() {

    game.FSM.update();

    background("#007");

}

function eventTest(){
    $("body").on("mail", {addr:"麗山街", tel:27972029}, function(event,a ,b, c, d){
        let s1 = `${a} 在 ${d} 寫信給 ${c}，說：${b} `;
        let s2= `住址： ${event.data.addr}， 電話： ${event.data.tel}`;
        print2("事件名稱： "+event.type);
        print2(s1);
        print2(s2);
        }
    );

    $("#printArea").trigger("mail", ["Arthur", "love", "anzn", new Date()]);

}

