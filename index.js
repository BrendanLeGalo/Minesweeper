// Variable initialization for every location or button (it is going to be equal to 1 if a mine is assigned the location)
var b00=0; var b01=0; var b02=0; var b03=0; var b04=0; var b05=0; var b06=0; var b07=0; var b08=0; var b09=0;
var b10=0; var b11=0; var b12=0; var b13=0; var b14=0; var b15=0; var b16=0; var b17=0; var b18=0; var b19=0;
var b20=0; var b21=0; var b22=0; var b23=0; var b24=0; var b25=0; var b26=0; var b27=0; var b28=0; var b29=0;
var b30=0; var b31=0; var b32=0; var b33=0; var b34=0; var b35=0; var b36=0; var b37=0; var b38=0; var b39=0;
var b40=0; var b41=0; var b42=0; var b43=0; var b44=0; var b45=0; var b46=0; var b47=0; var b48=0; var b49=0;
var b50=0; var b51=0; var b52=0; var b53=0; var b54=0; var b55=0; var b56=0; var b57=0; var b58=0; var b59=0;
var b60=0; var b61=0; var b62=0; var b63=0; var b64=0; var b65=0; var b66=0; var b67=0; var b68=0; var b69=0;
var b70=0; var b71=0; var b72=0; var b73=0; var b74=0; var b75=0; var b76=0; var b77=0; var b78=0; var b79=0;
var b80=0; var b81=0; var b82=0; var b83=0; var b84=0; var b85=0; var b86=0; var b87=0; var b88=0; var b89=0;
var b90=0; var b91=0; var b92=0; var b93=0; var b94=0; var b95=0; var b96=0; var b97=0; var b98=0; var b99=0;

/****************** Determination of the mines' spots *********************/

/* that section is aiming to determinate where the mines should be placed on a separated array, they are not assigned to their button yet
(ex: var b12 will still be =0)
The determination of the mines spot are done randomly thanks to the function "placeMine(numberOfMines)"-->(we can chose the number of mines we want)
It picks randomly a mine spot among all the available spot (like if we were picking a card from the deck) then it removed the taken spot from the
available spot for the next selection  */

var locations = []; // var that will contain all the possible mine location (in our situation it will be an array with every number from 0 to 99)
var minesLocation = []; // var that will contain the mine location that has been randomly picked.

function placeMine (numberOfMines) { 
    // Loop that generate all the different possible location that we will be able to choose from (we can change the number of locations by changing i)
    for (var i=0; i<100; i++){
        locations.push(i);
    } 
    //Loop that pick one random location from the available location array. start again until we have the right number of mines.
    for (var i=0; i<numberOfMines; i++){
        var n = Math.floor(Math.random()*locations.length); // n is the position in the array (not the location itself)
        minesLocation.push(locations.splice(n,1));//it remove the taken location from the "location" array so that we can't pick two time the same location
    } 

    return locations;// what's left from the different locations - mine free spots
    return minesLocation;//mine location that has been selected
}

            /***The user can change the number of mines***************************************************************************/

                var howManyMines=12; //default value

                document.getElementById("validateNumMines").addEventListener("click",function(){ //add a EventListner to the "validate" button
                        /* protection with the if*/
                        if((document.getElementById("userNumMines").value) > 99 || (document.getElementById("userNumMines").value) <=0){ 
                        //to not set the number of mine to 100 or more otherwise the code will run indefinitely we also don't want a negative number or a 0
                        howManyMines=12; //back to the default number
                        }else{
                            howManyMines = document.getElementById("userNumMines").value; // get the number set by the user in the input section ex:25
                        }
                    localStorage.setItem("storeHowManyMines",howManyMines); // store that number "25" in the local storage
                    location.reload(); //reload the page with the new number  
                })
                if((localStorage.getItem("storeHowManyMines"))==null){
                    howManyMines=12;
                }else{
                    howManyMines=localStorage.getItem("storeHowManyMines");// get the previous stored number "25" 
                }
                //add an EventListner to the input(type: number) and listen to the Enter key press, so don't have to press the validate button, we can just press enter
                document.getElementById("userNumMines").addEventListener("keypress",function(event){ 
                    if (event.key === "Enter") {
                        event.preventDefault();
                        document.getElementById("validateNumMines").click();
                    }
                })

            /***The user can change the number of mines - end ***************************************************************************/

placeMine(howManyMines); //take the number of mines wanted by the user the default is 12

console.log(locations); 
console.log(minesLocation); 

/************** Assignment of the mines to their button *****************/

var numMines=minesLocation.length;
    document.querySelector(".counterMines").textContent=numMines;
var singleMineLocation;
for (var i=0; i<numMines; i++){ // the loop assign the value 1 to the variable that has receive a bomb (ex: if the var b02 has receive a bomb b02=1)
    singleMineLocation =minesLocation.shift().toString();
    if (singleMineLocation<10) {
        eval("b0"+singleMineLocation+"="+"1");
    }else {
        eval("b"+singleMineLocation+"="+"1");
    }
}

/************** Count the number of mine around each button ******************/

var bomba; // this variable is the key value assign to each button, it shows a X if there is a mine, if there are none it shows the number of mines that surrounds the button
var MineOrNot; // for the loop it will take every spot one by one and check if there is a mine or not
var idSpot; // the variable will take out the name of the spot one by one according the position of the loop ex: b24
var l; //  the line number of the idSpot ex: if idSpot=b24 --> l=2;
var c; //  the column number of the idSpot ex: if idSpot=b24 --> c=4;
var valueA; var valueB; var valueC; var valueD; var valueE; var valueF; var valueG; var valueH; // value of all variables that surrounds one spots
/*
idA    idB    idC           valueA    valueB     valueC
idD  idSpot   idE   = --->  valueD   valueSpot   valueE 
idF    idG    idH           valueF    valueG     valueH
*/
//functions that count the value around the idSpot
function countA (l,c){
    if ((l-1)<0 || (c-1)<0) {valueA = 0;} else {valueA = eval("b"+(l-1)+(c-1));}
    return valueA;
}
function countB (l,c){
    if ((l-1)<0) {valueB = 0;} else {valueB = eval("b"+(l-1)+(c));}
    return valueB;
}
function countC (l,c){
    if ((l-1)<0 || (c+1)>9) {valueC = 0;} else {valueC = eval("b"+(l-1)+(c+1));}
    return valueC;
}
function countD (l,c){
    if ((c-1)<0) {valueD = 0;} else {valueD = eval("b"+(l)+(c-1));}
    return valueD;
}
function countE (l,c){
    if ((c+1)>9) {valueE = 0;} else {valueE = eval("b"+(l)+(c+1));}
    return valueE;
}
function countF (l,c){
    if ((l+1)>9 || (c-1)<0) {valueF = 0;} else {valueF = eval("b"+(l+1)+(c-1));}
    return valueF;
}
function countG (l,c){
    if ((l+1)>9) {valueG = 0;} else {valueG = eval("b"+(l+1)+(c));}
    return valueG;
}
function countH (l,c){
    if ((l+1)>9 || (c+1)>9) {valueH = 0;} else {valueH = eval("b"+(l+1)+(c+1));}
    return valueH;
}

for (var i=0; i<100; i++){ // to display where are the mine on the button
    if (i<10){
        MineOrNot=eval("b0"+i); //analyse one by one (with the loop) every location (var b00, b01, b02...) to see if there is a mine or not (0 or 1).
        if (MineOrNot===1){ // if there is a mine
            bomba="X";      // place a X
            // eval("s0" +i+"=\"X\"");
        } else { // if not show the number of mines around
            idSpot="b0"+i; // string showing for ex b02
            l=Number(idSpot.slice(1,2)); //num for ex: 0
            c=Number(idSpot.slice(2,3)); //num for ex: 2
            
            bomba=countA(l,c)+countB(l,c)+countC(l,c)+countD(l,c)+countE(l,c)+countF(l,c)+countG(l,c)+countH(l,c);
            eval("s0" +i+"="+bomba);
        }
    } else { //if i>=10
        MineOrNot=eval("b"+i);
        if (MineOrNot===1){
            bomba="X";
            // eval("s" +i+"=\"X\"");
        } else {
            idSpot="b"+i; // string showing for ex b32
            l=Number(idSpot.slice(1,2)); //num for ex: 3
            c=Number(idSpot.slice(2,3)); //num for ex: 2

            // bomba=countE(l,c);
            bomba=countA(l,c)+countB(l,c)+countC(l,c)+countD(l,c)+countE(l,c)+countF(l,c)+countG(l,c)+countH(l,c);
            // eval("s" +i+"="+bomba);
        }
    }
document.querySelectorAll(".btnMS")[i].textContent=bomba; // change the value of the button on HTML (the value is made invisible with css and we change the class to make it visible after a click)
}

/********************** handle the clicks *******************/

    /******  click handler tools with functions and variables (for the click on the 0) ******/

    var idA; var idB; var idC; var idD; var idE; var idF; var idG; var idH;
    var idPivot;
    var nextIdPivot=[];
    /* functions that give the id of the button around (ex:idA=b01) if it exist otherwise they give n/a */
    function identityA (l,c) {if ((l-1)<0 || (c-1)<0) {idA ="n/a";} else {idA = "b"+(l-1)+(c-1);} return idA;}
    function identityB (l,c) {if ((l-1)<0) {idB ="n/a";} else {idB = "b"+(l-1)+(c);} return idB;}
    function identityC (l,c) {if ((l-1)<0 || (c+1)>9) {idC ="n/a";} else {idC = "b"+(l-1)+(c+1);} return idC;}
    function identityD (l,c) {if ((c-1)<0) {idD ="n/a";} else {idD = "b"+(l)+(c-1);} return idD;}
    function identityE (l,c) {if ((c+1)>9) {idE ="n/a";} else {idE = "b"+(l)+(c+1);} return idE;}
    function identityF (l,c) {if ((l+1)>9 || (c-1)<0) {idF ="n/a";} else {idF = "b"+(l+1)+(c-1);} return idF;}
    function identityG (l,c) {if ((l+1)>9) {idG ="n/a";} else {idG = "b"+(l+1)+(c);} return idG;}
    function identityH (l,c) {if ((l+1)>9 || (c+1)>9) {idH ="n/a";} else {idH = "b"+(l+1)+(c+1);} return idH;}

    var coverA; var coverB; var coverC; var coverD; var coverE; var coverF; var coverG; var coverH;
   
    /* Function that clear the surounding of the 0 for the click handler*/
    function expend (idPivot) { //ex: b12  or [b22, b23]
        l=Number(idPivot.slice(1,2));// if idPivot: b12 l=1
        c=Number(idPivot.slice(2,3));// if idPivot: b12 l=2
        idA=identityA(l,c); idB=identityB(l,c); idC=identityC(l,c); idD=identityD(l,c); idE=identityE(l,c); dF=identityF(l,c); idG=identityG(l,c); idH=identityH(l,c); 

            if (idA !== "n/a"){ //if idA is not out of the field
                coverA=(document.querySelector("."+idA).classList.contains("btn"));//show if idA is covered (if we can see its status 0, 1, 2 ...)
                // it retrurs true if it is cover, or false if it is uncover, because the class .btn is removed and replace by the number ex: btn2 for the ones that are already uncovered
                // console.log(coverA);
                if (coverA==true){ //if it is cover
                    document.querySelector("."+idA).classList.remove("btn");
                    document.querySelector("."+idA).classList.add("btn"+(document.querySelector("."+idA).textContent)); //uncover it and reveal the statu 0,1,2 ...
                        if ((document.querySelector("."+idA).textContent)==="0"){
                            nextIdPivot.push(idA);
                        }
                }
            }else{console.log("idA non define")} 

            if (idB !== "n/a"){ 
                coverB=(document.querySelector("."+idB).classList.contains("btn"));
                // console.log(coverB);
                if (coverB==true){
                    document.querySelector("."+idB).classList.remove("btn");
                    document.querySelector("."+idB).classList.add("btn"+(document.querySelector("."+idB).textContent));
                    if ((document.querySelector("."+idB).textContent)==="0"){
                        nextIdPivot.push(idB);
                    }
                }
            }else{console.log("idA non define")} 

            if (idC !== "n/a"){ 
                coverC=(document.querySelector("."+idC).classList.contains("btn"));
                // console.log(coverC);
                if (coverC==true){
                    document.querySelector("."+idC).classList.remove("btn");
                    document.querySelector("."+idC).classList.add("btn"+(document.querySelector("."+idC).textContent));
                    if ((document.querySelector("."+idC).textContent)==="0"){
                        nextIdPivot.push(idC);
                    }
                }
            }else{console.log("idA non define")} 

            if (idD !== "n/a"){ 
                coverD=(document.querySelector("."+idD).classList.contains("btn"));
                // console.log(coverD);
                if (coverD==true){
                    document.querySelector("."+idD).classList.remove("btn");
                    document.querySelector("."+idD).classList.add("btn"+(document.querySelector("."+idD).textContent));
                    if ((document.querySelector("."+idD).textContent)==="0"){
                        nextIdPivot.push(idD);
                    }
                }
            }else{console.log("idA non define")} 

            if (idE !== "n/a"){ 
                coverE=(document.querySelector("."+idE).classList.contains("btn"));
                // console.log(coverE);
                if (coverE==true){
                    document.querySelector("."+idE).classList.remove("btn");
                    document.querySelector("."+idE).classList.add("btn"+(document.querySelector("."+idE).textContent));
                    if ((document.querySelector("."+idE).textContent)==="0"){
                        nextIdPivot.push(idE);
                    }
                }
            }else{console.log("idA non define")} 

            if (idF !== "n/a"){ 
                coverF=(document.querySelector("."+idF).classList.contains("btn"));
                // console.log(coverF);
                if (coverF==true){
                    document.querySelector("."+idF).classList.remove("btn");
                    document.querySelector("."+idF).classList.add("btn"+(document.querySelector("."+idF).textContent));
                    if ((document.querySelector("."+idF).textContent)==="0"){
                        nextIdPivot.push(idF);
                    }
                }
            }else{console.log("idA non define")} 

            if (idG !== "n/a"){ 
                coverG=(document.querySelector("."+idG).classList.contains("btn"));
                // console.log(coverG);
                if (coverG==true){
                    document.querySelector("."+idG).classList.remove("btn");
                    document.querySelector("."+idG).classList.add("btn"+(document.querySelector("."+idG).textContent));
                    if ((document.querySelector("."+idG).textContent)==="0"){
                        nextIdPivot.push(idG);
                    }
                }
            }else{console.log("idA non define")} 

            if (idH !== "n/a"){ 
                coverH=(document.querySelector("."+idH).classList.contains("btn"));
                // console.log(coverH);
                if (coverH==true){
                    document.querySelector("."+idH).classList.remove("btn");
                    document.querySelector("."+idH).classList.add("btn"+(document.querySelector("."+idH).textContent));
                    if ((document.querySelector("."+idH).textContent)==="0"){
                        nextIdPivot.push(idH);
                    }
                }
            }else{console.log("idA non define")} 
     
        return nextIdPivot;  
    }


    /******** the "real" click handler *********/

    var NbrAvailableButton;
    var youWon=0;
    var youLost=0;
    var numberOfClicks=0; //variable that takes the number of users click to know if we click on a mine on the first click

    var theBadLuckClick="";
    var hadBeenRrefreshed=0; 
   

for (var i=0; i<100; i++){ 
    document.querySelectorAll(".btnMS")[i].addEventListener("click",function(){
        NbrAvailableButton=0;
        numberOfClicks++;
    /* the "if" below with the small section at the bottom of the EventListner is aiming to prevent a first user click on a mine.
    If the user click on a first click on a mine we are calling that click "theBadLuckClick" we then take the Id of that bad luck click ex:b112
    and we store it on the local storage so when the page will be refreshed, we will still know that it was that button that was theBadLuckClick
    we are also going to mention to the local storage that the page has been refreshed, so once the page will be refreshed, we will also remember that we refreshed it.
    (see the rest of the explanation below the EventListner)    
    */
        if ((numberOfClicks==1)&&(this.textContent)=="X") {
            theBadLuckClick=this.classList[1];// ex: b12
            localStorage.setItem("storeBadLuckClick", theBadLuckClick); //store b12 in the local storage
            hadBeenRrefreshed=1;
            localStorage.setItem("storeHadBeedRefreshed", hadBeenRrefreshed); //mentioned that the page has been refreshed to the local storage
            location.reload(); //reload or refresh the page
        }
        else{ // if we didn't have a bad luck click or if we solve it, we are treating the click normally. 
            if ((this.textContent)=="X") { //if click on a mine (click =x)
                for(i=0; i<100; i++) {     // for all the button that contain a mines reveal all the mines 
                    if ((document.querySelectorAll(".btnMS")[i].textContent)=="X"){
                        document.querySelectorAll(".btnMS")[i].classList.remove("btn");
                        document.querySelectorAll(".btnMS")[i].classList.add("btnMine");
                    }
                    document.querySelectorAll(".btnMS")[i].disabled=true; // once a mine has been place we disable all the click on the button
                }
                this.classList.remove("btnMine");
                this.classList.add("btnMineHit");
                youLost=1;
                document.getElementById("smiley").src="images/Bomb-angry.png";
                document.querySelector(".smileyBtn").classList.remove("smileyBtnSmile");
                document.querySelector(".smileyBtn").classList.add("smileyBtnMine");
                // setTimeout(function(){
                //     alert("BOOOOMMM !!! tu as perdu !");
                // }, 800);
            } 
            else if ((this.textContent)==0) { //if click on 0
                this.classList.remove("btn");
                this.classList.add("btn0");
                idPivot=this.classList[0]; // take out for example the class b12

                nextIdPivot=expend(idPivot); //  apply the expend function to the main pivot
                // it will gave us as an output the other pivot (nextIdPivot) (the surounded buttons that have the staus 0 and that are not uncover yet)
                
                    for (var i=0; i<nextIdPivot.length; i++){ //loop that apply the expend function to all the new pivot that it founds
                        nextIdPivot=expend(nextIdPivot[i]);
                        // console.log(nextIdPivot);
                    }
            }
            else if ((this.textContent)==1) {  //if click on 1...
                this.classList.remove("btn");
                this.classList.add("btn1");
            }
            else if ((this.textContent)==2) {
                this.classList.remove("btn");
                this.classList.add("btn2");
            }
            else if ((this.textContent)==3) {
                this.classList.remove("btn");
                this.classList.add("btn3");
            }
            else if ((this.textContent)==4) {
                this.classList.remove("btn");
                this.classList.add("btn4");
            }
            else if ((this.textContent)==5) {
                this.classList.remove("btn");
                this.classList.add("btn5");
            }
            else if ((this.textContent)==6) {
                this.classList.remove("btn");
                this.classList.add("btn6");
            }
            else if ((this.textContent)==7) {
                this.classList.remove("btn");
                this.classList.add("btn7");
            }
            else if ((this.textContent)==8) {
                this.classList.remove("btn");
                this.classList.add("btn8");
            } 
        }
        /* check if we wone ! */
            for(var i=0; i<100; i++) {
                if ((document.querySelectorAll(".btnMS")[i].classList.contains("btn"))==true){
                    NbrAvailableButton++;
                    console.log(NbrAvailableButton);
                }
            }
            if (NbrAvailableButton===numMines){ //if we won:
                youWon=1;
                for(var i=0; i<100; i++) {    
                    if ((document.querySelectorAll(".btnMS")[i].textContent)=="X"){ // if the button contain a mine 
                        document.querySelectorAll(".btnMS")[i].classList.add("btnFlag");
                    }
                    document.querySelectorAll(".btnMS")[i].disabled=true; // We won, so we disable all the button so we can't keep playing
                }
                document.getElementById("smiley").src="images/smiley-sunglasses.png";
                // setTimeout(function(){
                //     alert("Yeahhh ! bravo tu as gangé !");
                // }, 400);
            }

        /******Stopwatch *******/
        var centiSecond=0;
        var centiSec=0;
        var min=0;
        var sec=0;
        var timeSpend=0;
        if (numberOfClicks==1){
            var stopwatch=setInterval(function(){
                centiSecond++;
                min=Math.floor(centiSecond/600);
                sec=Math.floor((centiSecond/10)-(60*min));
                centiSec=Math.floor(centiSecond-(600*min)-(10*sec));
                    if (min<10){min="0"+min;}else{min;}
                    if (sec<10){sec="0"+sec;}else{sec;}
                timeSpend=min+":"+sec+"."+centiSec;
                    if (centiSecond>=36000){timeSpend="😴"}
                document.querySelector(".chrono").textContent=timeSpend;

                if (youWon===1){clearInterval(stopwatch);} 
                if (youLost===1){clearInterval(stopwatch);}
            }, 100);
        }


    })
}
/* 
take out the value of the variable below out from the local storage
If the page has been previously refreshed, we set back the refresh status to 0 and it will automatically click on the same button than previously 
(the b12 to keep the same example) with the EventListner above and the whole process will restart (it will check if it is again a bad luck click)
*/
var hadBeenRrefreshed=localStorage.getItem("storeHadBeedRefreshed");
var theBadLuckClick=localStorage.getItem("storeBadLuckClick");
console.log(hadBeenRrefreshed);
console.log(theBadLuckClick);
    if (hadBeenRrefreshed==1){
        console.log(theBadLuckClick);
        hadBeenRrefreshed=0;
        localStorage.setItem("storeHadBeedRefreshed", hadBeenRrefreshed);
        document.querySelector("."+theBadLuckClick).click();
    }


/***** Handle the flag (with the left click) ******/

var numberOfFlagAvailable=numMines;
document.querySelector(".counter").textContent=numberOfFlagAvailable;
var numberOfFlag;

for (i=0; i<100; i++){
        document.querySelectorAll(".btnMS")[i].addEventListener("contextmenu", function(event){ // left click 
            event.preventDefault(event); // remove the context menu display
            if ((this.classList.contains("btn"))==true && youWon!==1 && youLost!==1){ //if the button is still cover and have not being clicked yet (if it still contains the class "btn")
                this.classList.toggle("btnFlag"); //toogle the class btnFlag
                if ((this.classList.contains("btnFlag"))==true){ //if the click event contain the class btnFlag it means that there is a flag
                    this.disabled=true; // so we disable the click so we can't click on the button when there is a flag
                }
                else {
                    this.disabled=false; //if there is no flag we can click on the button
                }
            }
            //count the number of Flag on the field;
            numberOfFlag=0;
            for (var j=0; j<100; j++){
                if ((document.querySelectorAll(".btnMS")[j].classList.contains("btnFlag"))==true){
                    numberOfFlag++;
                    console.log(numberOfFlag);
                }
                numberOfFlagAvailable=numMines-numberOfFlag;
                console.log(numberOfFlagAvailable);
                document.querySelector(".counter").textContent=numberOfFlagAvailable;
            }
        
        });
}   

/****** handle the click on the smiley *******/

    document.querySelector(".smileyBtn").addEventListener("click",function(){
        location.reload();
    })


