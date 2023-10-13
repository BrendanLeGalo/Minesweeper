// Variable initialisation for every location or button (it is going to be equal to 1 if a mine is assigne the location)
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
//variable initialisation for the statu of every button (number of mines around or X if there is a mine)
// var s00; var s01; var s02; var s03; var s04; var s05; var s06; var s07; var s08; var s09; 
// var s10; var s11; var s12; var s13; var s14; var s15; var s16; var s17; var s18; var s19;
// var s20; var s21; var s22; var s23; var s24; var s25; var s26; var s27; var s28; var s29;
// var s30; var s31; var s32; var s33; var s34; var s35; var s36; var s37; var s38; var s39;
// var s40; var s41; var s42; var s43; var s44; var s45; var s46; var s47; var s48; var s49;
// var s50; var s51; var s52; var s53; var s54; var s55; var s56; var s57; var s58; var s59;
// var s60; var s61; var s62; var s63; var s64; var s65; var s66; var s67; var s68; var s69;
// var s70; var s71; var s72; var s73; var s74; var s75; var s76; var s77; var s78; var s79;
// var s80; var s81; var s82; var s83; var s84; var s85; var s86; var s87; var s88; var s89;
// var s90; var s91; var s92; var s93; var s94; var s95; var s96; var s97; var s98; var s99;

/****************** Determination of the mines spots *********************/

/* that section is aiming to determiate where the mines should be placed on a separated array, they are not assigned to their button yet
(ex: var b12 will still be =0)
The determination of the mines spot are done randomly thanks to the function "placeMine(numberOfMines)"-->(we can chose the number of mines we want)
It picks randomly a mine spot among all the available spot (like if we were picking a card from the deck) then it removed the taken spot from the
available spot for the next selection  */

var locations = []; // var that will contain all the possible mine location (in our situation it will be an array with every numbers from 0 to 99)
var minesLocation = []; // var that will contain the mine location that has been randomly picked.

function placeMine (numberOfMines) { 
    // Loop that generate all the different possible location that we will be able to choose from (we can change the number of locations by changing i)
    for (var i=0; i<100; i++){
        locations.push(i);
    } 
    //Loop that pick one random location from the available location array. start again until we have the right number of mines.
    for (var i=0; i<numberOfMines; i++){
        var n = Math.floor(Math.random()*locations.length); // n is the position in the array (not the location itself)
        minesLocation.push(locations.splice(n,1));//it remove the taken location from the "location" array so that we can't pick two time the same locaation
    } 

    return locations;// what's left from the different locations - mine free spots
    return minesLocation;//mine location that has been selected
}
placeMine(10);

console.log(locations); 
console.log(minesLocation); 

/************** Assignement of the mines to their button *****************/

var numMines=minesLocation.length;
var singleMineLocation;
for (var i=0; i<numMines; i++){ // the loop assigne the value 1 to the variable that has recieve a bomb (ex: if the var b02 has recieve a bomb b02=1)
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
document.querySelectorAll("button")[i].textContent=bomba; // change the value of the button on HTML (the value is made invisible with css and we change the class to make it visible after a click)
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
                coverA=(document.querySelector("."+idA).classList.contains("btn"));//show if idA is covered (if we can see its statut 0, 1, 2 ...)
                // it retrurs true if it is cover or false if it is uncover, because the class .btn is removed and replace by the number ex: btn2 for the ones that are already uncovered
                console.log(coverA);
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
                console.log(coverB);
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
                console.log(coverC);
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
                console.log(coverD);
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
                console.log(coverE);
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
                console.log(coverF);
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
                console.log(coverG);
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
                console.log(coverH);
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


    /***** the "real" click handler ******/

for (i=0; i<100; i++){
    document.querySelectorAll("button")[i].addEventListener("click",function(){
        if ((this.textContent)=="X") { //si clique =x alors
            for(i=0; i<100; i++) {
                if ((document.querySelectorAll("button")[i].textContent)=="X"){
                    document.querySelectorAll("button")[i].classList.remove("btn");
                    document.querySelectorAll("button")[i].classList.add("btnMine");
                }
            }
            this.classList.remove("btnMine");
            this.classList.add("btnMineHit");
        } 
        else if ((this.textContent)==0) {
            this.classList.remove("btn");
            this.classList.add("btn0");
            idPivot=this.classList[0]; // resort la class b12 par exemple

            nextIdPivot=expend(idPivot); //  apply the expend function to the main pivot
            // it will gave us as an outup the other pivot (nextIdPivot) (the surounded buttons that have the staut 0 and that are not uncover yet)
            
                for (var i=0; i<nextIdPivot.length; i++){ //loop that apply the expend function to all the new pivot that it founds
                    nextIdPivot=expend(nextIdPivot[i]);
                    console.log(nextIdPivot);
                }
        }
        else if ((this.textContent)==1) {
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
    })
}

















// console.log(numMines);
// console.log("s00="+s00);
// console.log("s01="+s01);
// console.log("s02="+s02);
// console.log("s03="+s03);
// console.log("s04="+s04);
// console.log("s05="+s05);
// console.log("s06="+s06);
// console.log("s07="+s07);
// console.log("s08="+s08);
// console.log("s09="+s09);
// console.log("s10="+s10);
// console.log("s11="+s11);
// console.log("s12="+s12);
// console.log("s13="+s13);
// console.log("s14="+s14);
// console.log("s15="+s15);
// console.log("s16="+s16);
// console.log("s17="+s17);
// console.log("s18="+s18);
// console.log("s19="+s19);




