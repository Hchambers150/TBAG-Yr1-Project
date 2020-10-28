﻿// website - based javascript done here:

//var notepad = document;
//notepad.addEventListener("contextmenu",function(event){
//    event.preventDefault();
//    var ctxMenu = document.getElementById("ctxMenu");
//    ctxMenu.style.display = "block";
//    ctxMenu.style.left = (event.pageX - 10)+"px";
//    ctxMenu.style.top = (event.pageY - 10)+"px";
//},false);
//notepad.addEventListener("click",function(event){
//    var ctxMenu = document.getElementById("ctxMenu");
//    ctxMenu.style.display = "";
//    ctxMenu.style.left = "";
//    ctxMenu.style.top = "";
//},false);

//startup.style.webkitAnimationPlayState = "paused";

var minus = document.getElementById("minus");
var errors = document.getElementById("errors");
var skillpoints = document.getElementById("remainingStat");
var statPoints = 27;

//var objDiv = document.getElementById("textArea");
//objDiv.scrollTop = objDiv.scrollHeight + '1000px';

function startAnim() {
    startup.style.webkitAnimationPlayState = "running";
    document.getElementById("playBtn").style.display = "none";
}

function checkDrop(ev, el) {
    console.log(ev, el);



    var type = el.dataTransfer.getData("text");
    console.log("test",type);

    ev.preventDefault();
    //console.log(ev.childNodes)

    //console.log(ev, el);
    ////console.log("ev:", ev, "el:", el, "childnode:", el.childNodes);
    //var childNodes = el.childNodes;
    //console.log(childNodes, childNodes.length);

    //ev.preventDefault(); 
    //if (el.childNodes.length == 2) {
    //    console.log("type: ",el.childNodes[1].attributes[1])
    //    if (el.childNodes[1].attributes[1] == "weapon") {
    //        allowDrop(ev);
    //    }
    //}
    
    
    
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    var toSend = [ev.target.id, ev.target.attributes[1].nodeValue];

    ev.dataTransfer.setData("text", toSend);
}

function drop(ev) {
    console.log("TRAGEDY",ev);
    ev.preventDefault();
    
    var data = ev.dataTransfer.getData("text");
    data = data.split(",");
    console.log(data);
    ev.target.appendChild(document.getElementById(data[0]));

    console.log(ev);

    //updateInventory();
}

function increaseStat(x) {
    var statInt = parseInt(document.getElementById(x).innerText);
    var stat = document.getElementById(x);

    if (statInt == 20) {
        errors.innerText = "Your stat scores may not go above 20!";
    } else {
        errors.innerText = "";
    }

    if (statPoints == 0) {
        errors.innerText = "You're out of stat points!"
    }

    if (statInt < 20 && statPoints > 0) {
        stat.innerText = statInt + 1;
        statPoints--;
        console.log(statPoints);
    }

    if (stat.innerText.length == 2) {
        stat.style.left = "-0.5em";
    } else {
        stat.style.left = "-0.2em";
    }

    skillpoints.innerText = statPoints;
    if (skillpoints.innerText.length == 2) {
        skillpoints.style.left = "-1.3em";
    } else {
        skillpoints.style.left = "-1em";
    }

}

function decreaseStat(x) {
    var stat = document.getElementById(x);
    var statInt = parseInt(document.getElementById(x).innerText);
    var skillpoints = document.getElementById("remainingStat");

    if (statInt == 8) {
        errors.innerText = "Your stat scores may not go lower than 8!";
    } else {
        errors.innerText = "";
    }

    if (statInt > 8) {
        stat.innerText = statInt - 1;
        statPoints++;
    }

    if (stat.innerText.length == 2) {
        stat.style.left = "-0.5em";
    } else {
        stat.style.left = "-0.2em";
    }

    skillpoints.innerText = statPoints;
    if (skillpoints.innerText.length == 2) {
        skillpoints.style.left = "-1.3em";
    } else {
        skillpoints.style.left = "-1em";
    }

}

var name;
var con;
var dex;
var str;
var int;
var wis;
var cha;
var player;

function checkButton() {
 // check to make sure everything is O.K
 // then, start game;
    // player = new Player(getStats());
    // initItems();
    // initMonsters(); } How to handle monsters that can be a monster or an npc?
    // initNPCs();     } OR npcs are types of monsters? - good idea

}


function getStats() { // revisit; should
    name = document.getElementById("charName").value;
    if (statPoints == 0 && name != "") {
        name = document.getElementById("charName").value;
        con = parseInt(document.getElementById("conStat").innerText);
        dex = parseInt(document.getElementById("dexStat").innerText);
        str = parseInt(document.getElementById("strStat").innerText);
        int = parseInt(document.getElementById("intStat").innerText);
        wis = parseInt(document.getElementById("wisStat").innerText);
        cha = parseInt(document.getElementById("chaStat").innerText);

        document.getElementById("startup").style.animation = '1s ease-out 0s 1 slideOutToTop';
        document.getElementById("startup").style.display = 'none';
        document.getElementById("main").style.display = 'block';

        return (name, con, dex, str, int, wis, cha);

    } else if (statPoints == 27) {
        document.getElementById("startup").style.display = 'none';
        document.getElementById("main").style.display = 'block';

        player = new Player(name, con, dex, str, int, wis, cha);
        unInitItems[0] = new Item("Shitty Dagger", "weapon", "shittyDaggerBig.png", "shittyDaggerInv.png", 1, 0, "This dagger feels too heavy.");
        console.log(unInitItems)

        addToInv(unInitItems[0]);
    } else if (name == "" || name.length > 20) {
        errors.innerText = "Invalid name! Max length: 20";

    } else if (statPoints == 0) {
        errors.innerText = "You've not spent all of your stat points!";
    }
}

function setStats(con, dex, str, int, wis, cha) {
    var liveCon = document.getElementById("conLive");
    var liveDex = document.getElementById("dexLive");
    var liveStr = document.getElementById("strLive");
    var liveInt = document.getElementById("intLive");
    var liveWis = document.getElementById("wisLive");
    var liveCha = document.getElementById("chaLive");

    var checkPos = [liveCon, liveDex, liveStr, liveInt, liveWis, liveCha];

    liveCon.innerText = con;
    liveDex.innerText = dex;
    liveStr.innerText = str;
    liveInt.innerText = int;
    liveWis.innerText = wis;
    liveCha.innerText = cha;

    document.getElementById("gearTitle").innerText = name;

    for (var i = 0; i < checkPos.length; i++) {
        if (checkPos[i].innerText.length == 1) {
            checkPos[i].style.left = "1.15em";
        }

    }
}