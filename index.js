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


var locations = []; // var that will contain all the possible location (in our situation it will be all numbers from 0 to 99)
var minesLocation = []; // var that will contain the mine location that has been randomly placed.

function placeMine (numberOfMines) { 
    // Loop that generate all the different possible location that we will be able to choose from (we can change the number of locations by changing i)
    for (var i=0; i<100; i++){
        locations.push(i);
    } 
    //Loop that pick one random location from the available location array. start again until we have the right number of mines.
    for (var i=0; i<numberOfMines; i++){
        var n = Math.floor(Math.random()*locations.length); // n is the position in the array (not the location itself)
        minesLocation.push(locations.splice(n,1));//it remove the taken location from the location matrix so that we can't pick two time the same locaation
    } 

    return locations;// what's left from the different locations - mine free spots
    return minesLocation;//mine location that has been selected
}
placeMine(10);

console.log(locations); 
console.log(minesLocation); 

var numMines=minesLocation.length;
var singleMineLocation;
for (var i=0; i<numMines; i++){ // assigne the value 1 to the variable that has recieve a bomb (ex: if the var b02 has recieve a bomb b02=1)
    singleMineLocation =minesLocation.shift().toString();
    if (singleMineLocation<10) {
        eval("b0"+singleMineLocation+"="+"1");
    }else {
        eval("b"+singleMineLocation+"="+"1");
    }
}

var bomba;
var MineOrNot;
var c;
var l;

for (var i=0; i<100; i++){ // to display where are the mine on the button
    if (i<10){
        MineOrNot=eval("b0"+i); //analyse one by one (with the loop) every location (var b00, b01, b02...) to see if there is a mine or not (0 or 1).
        if (MineOrNot===1){ // if there is a mine
            bomba="X";      // place a X
        } else {
            bomba=".";      // if not place a . 
            // ici il faut compter le nombre de bombe qu'il y a autour !!! réussir à isoler "l" et "c" pour pouvoir faire l'analyse.
            // toutes les bombes sont déjà placé dans les b00, b01, b02... 
            // avoir une variable qui prend le nom de la variable en chaine de char ex : emplacement = "b02" pour issoler le 0 et le 2  

        }
    } else { 
        MineOrNot=eval("b"+i);
        if (MineOrNot===1){
            bomba="X";
        } else {
            bomba=".";
        }
    }
document.querySelectorAll("button")[i].textContent=bomba; // display the X or the . for every button
}





console.log(numMines);
console.log("b00="+b00);
console.log("b01="+b01);
console.log("b02="+b02);
console.log("b03="+b03);
console.log("b04="+b04);
console.log("b05="+b05);
console.log("b06="+b06);
console.log("b07="+b07);
console.log("b08="+b08);
console.log("b09="+b09);
console.log("b10="+b10);
console.log("b11="+b11);
console.log("b12="+b12);
console.log("b13="+b13);
console.log("b14="+b14);
console.log("b15="+b15);
console.log("b16="+b16);
console.log("b17="+b17);
console.log("b18="+b18);
console.log("b19="+b19);




