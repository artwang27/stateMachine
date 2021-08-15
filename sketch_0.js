let canvas;
let sw = true;
                    
let accuForceEvent="accumulatingForce"; //蓄力中事件
let releaseForceEvent="releaseForce";   //釋放力量

$(document).ready(function () {
    $("button").click(function () {
        sw ? $("canvas").hide() : $("canvas").show();
        sw ? noLoop() : loop();
        sw = !sw;
    });

    $("body").keydown(function (e) {
        if (e.which == 40) {
            $("#forceState").trigger(accuForceEvent);
        }

    });


    $("body").keyup(function (e) {
        if (e.which == 40) {
            $("#forceState").trigger(releaseForceEvent);
        }
    });

    $("body").mousemove(function (e) {
        //滑鼠左鍵被按住，而且在移動，代表拖曳狀態
        if(e.which==1){
            $("#forceState").trigger(accuForceEvent);
        }
    });

    $("body").mouseup(function (e) {
        //鬆開滑鼠左鍵
        if (e.which == 1) {
            $("#forceState").trigger(releaseForceEvent);
        }
    });





    let force=0;
    $("body").bind(accuForceEvent, function (e) {
        $("body").css("select", "none");
        $("#forceState").text("蓄力中..."+force);
        force++;
    })

    $("body").bind(releaseForceEvent, function (e) {
        $("#forceState").text("釋放... " + force+ " 牛頓!");
        force=0;
    })



});


function setup() {
    canvas2 = createCanvas(400, 400);
}

let t = 0;
function draw() {
    background(220);
    t++;
    print3(t);

}


function print3(data) {
    $("#counter").text(data);
    //console.log(data);
}