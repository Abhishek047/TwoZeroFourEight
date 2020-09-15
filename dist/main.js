const size =4; //size of the playble array
let loggedIn = 0; //to check if someone has pressed in the game box
let start = 0;  //start helps in reseting the game
let count=0; //counts the no. of elements in the matrix
let arr;     //Our Default Matrix Which holds all the Value
let total=0; //Total Score of The player
let controlDescOpen = false;

const domRows = document.querySelectorAll(".row");
const score = document.getElementById('score');
const box = document.querySelector('.box');
const message = document.querySelector('.instr');
const control = document.querySelector(".i");


const mobUp = document.querySelector(".up");
const mobLeft = document.querySelector(".left");
const mobRight = document.querySelector(".right");
const mobDown = document.querySelector(".down");

mobUp.addEventListener('click' , listen);
mobLeft.addEventListener('click' , listen);
mobDown.addEventListener('click' , listen);
mobRight.addEventListener('click' , listen);

function listen(e)
{
    if(loggedIn === 1)             //game is played and the user has pressed in the box
    {
      if(e.target.classList.contains('down'))
      {
          shiftDown();
          check();
          genrate();
          update();
      } 
      else if(e.target.classList.contains('up'))
      {
          shiftUp();
          check();
          genrate();
          update();
      } 
      else if(e.target.classList.contains('right'))
      {
          shiftRight();
          check();
          genrate();
          update();
      } 
      else if(e.target.classList.contains('left'))
      {
          shiftLeft();
          check();
          genrate();
          update();
      } 
    }
}


box.addEventListener('click' , mouseClick);
window.addEventListener('keydown' , keyPress );
control.addEventListener('click' , controlDesc);



//Function to Stop Scroll

function stopScroll()
{
    let top = window.pageYOffset || document.documentElement.scrollTop;
    let left = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function (){
        window.scrollTo(top,0);
    }
    // console.log(top,left);
}


//Genrate random element function

let genrate = function()
{
    if(count <16)     
    {
        count=0;
        var i = Math.floor(Math.random() * 4);
        var j = Math.floor(Math.random() * 4);
        
        
        var range = Math.floor(Math.random() * 9);
        range += total > 2000 ? 0 : 1 ;
        if(arr[i][j] === 0)
        {
            if(range < 8){
                arr[i][j] = 2;}
            else if(range >= 8 && range <= 9)
                arr[i][j] = 4;
            else if (range > 9)
                arr[i][j] = 8;

        }
        else
        {
            genrate();
        }
    }
    else{
        alert("GameOver Your Score-->"+ total);
        window.onscroll = function () {};
        loggedIn = 0;        //it will make not to listen to any key listening
        start=0;
        reset();
        message.style.visibility="visible";
        // start=0;
        // startPlay();
    }
}


// Initialize array of 4x4  
let reset = function()
{
    total=0;
    count=0;
    arr = new Array(size);
    for(let i=0;i<size;i++)
    {
     arr[i] = new Array(size);
     for(let j =0;j<size;j++)
     {
         arr[i][j]=0;
     }
    }    
}

//check wheather the matrix if filled or not

let check = function(){
    for(let i=0;i<size;i++)
    {
        for(let j =0;j<size;j++)
        {
            if(arr[i][j]!==0)
            count++;
        }
    }
    
} 


//Update the elemnts of DOM 

let update = function()
{
    for(var i=0;i<size;i++)
    {
        for(var j=0;j<size;j++)
        {
            domRows[i].children[j].innerHTML=arr[i][j];
            domRows[i].children[j].style.backgroundColor="rgba("+(arr[i][j]+230)+","+(170-arr[i][j])+",40,"+(arr[i][j]*0.2)+")";
        }
    }
    score.innerHTML=total;
}

//Start Game
let startPlay = function(){
    if(start===0)
    {
        start = 1;
        reset();
        genrate();
        genrate();
        update();
        loggedIn=1;
    }
}

//Capturing Events

//function mobileKey press




function keyPress(e){

    //if condition to prevent defult action of ARROW KEY 
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1 ){
        e.preventDefault();
        stopScroll();
    }
    if(loggedIn === 1)             //game is played and the user has pressed in the box
    {
    //   console.log(e.code);
      if(e.code === 'ArrowDown')
      {
          shiftDown();
          check();
          genrate();
          update();
      } 
      else if(e.code === 'ArrowUp')
      {
          shiftUp();
          check();
          genrate();
          update();
      } 
      else if(e.code === 'ArrowRight')
      {
          shiftRight();
          check();
          genrate();
          update();
      } 
      else if(e.code === 'ArrowLeft')
      {
          shiftLeft();
          check();
          genrate();
          update();
      } 
    }
}

function mouseClick(e){
    stopScroll();
    message.style.visibility="hidden";
    startPlay();
}


function controlDesc()
{
    const description = document.querySelector(".control-instr");
    if(controlDescOpen === false)
    {
        window.onscroll = function() {};
        controlDescOpen = true ;
        console.log(1);
        description.style.display ="inline-block";
        control.parentElement.parentElement.style.clipPath = "circle( 130% at 7% 15%)";
        control.innerHTML = "Back"
    }
    else{
        controlDescOpen = false ;
        console.log(0);
        control.parentElement.parentElement.style.clipPath = "circle( 9% at 8.5% 45%)";
     // control.parentElement.parentElement.style.clipPath = "circle( 9% at 8.5% 45%);";
        description.style.display ="none";
        control.innerHTML = "i";
    }
}


//Game Functions


function shiftUp(){

    //Define a new array in which the changes are made
    
    
    let ar = new Array(size);                                   
    let newIn;
    let add;

    //for keyPressUp we traverse each coloumn seprately
    for(var col=0;col<size;col++)
    {
    //Initil state of   
    ar.fill(0);
    newIn = -1; 
    add=0;
            for(var row=0;row<size;row++)
            {
                if(arr[row][col]!==0)
                {
                    if(newIn === -1  ) 
                    {
                        newIn++;
                        ar[newIn] = arr[row][col];
                    }
                    else if ( ar[newIn] === arr[row][col] )
                    {
                        if(add === 0)
                        {
                            ar[newIn]+=arr[row][col];
                            total+=ar[newIn];
                            add=1;
                        }
                        else
                        {
                            newIn++;
                            ar[newIn]=arr[row][col];
                            add=0;
                        }
                    }
                    else if (ar[newIn] !== arr[row][col])
                        {
                            add=0;
                            newIn++;
                            ar[newIn]=arr[row][col];
                        }
                }
            }
        for(var row=0;row<size;row++)
            {
                arr[row][col] = ar[row];
            }
    }
}


//SHIFT LEFt


function shiftLeft(){

    //Define a new array in which the changes are made
    let ar = new Array(size);                                   
    let newIn;
    let add;

    //for keyPressUp we traverse each coloumn seprately
    for(var row=0;row<size;row++)
    {
    //Initil state of   
    ar.fill(0);
    newIn = -1; 
    add=0;
            for(var col=0;col<size;col++)
            {
                if(arr[row][col]!==0)
                {
                    if(newIn === -1  ) 
                    {
                        newIn++;
                        ar[newIn] = arr[row][col];
                    }
                    else if ( ar[newIn] === arr[row][col] )
                    {
                        if(add === 0)
                        {
                            ar[newIn]+=arr[row][col];
                            add=1;
                            total+=ar[newIn];
                        }
                        else
                        {
                            newIn++;
                            ar[newIn]=arr[row][col];
                            add=0;
                        }
                    }
                    else if (ar[newIn] !== arr[row][col])
                        {
                            add=0;
                            newIn++;
                            ar[newIn]=arr[row][col];
                        }
                }
            }
        for(var col=0;col<size;col++)
            {
                arr[row][col] = ar[col];
            }
    }
}


//SHIFT DOWN

function shiftDown(){
    //Define a new array in which the changes are made    
    let ar = new Array(size);                                   
    let newIn;
    let add;

    //for keyPressUp we traverse each coloumn seprately
    for(var col=0;col<size;col++)
    {
    //Initil state of   
    ar.fill(0);
    newIn = -1; 
    add=0;
            for(var row=size-1;row>=0;row--)
            {
                if(arr[row][col]!==0)           //if value not equal zero
                {
                    if(newIn === -1  )          // if new is not empty
                    {
                        newIn=size-1;
                        ar[newIn] = arr[row][col];
                    }
                    else if ( ar[newIn] === arr[row][col] )
                    {
                        if(add === 0)
                        {
                            ar[newIn]+=arr[row][col];
                            add=1;
                            total+=ar[newIn];
                        }
                        else
                        {
                            newIn--;
                            ar[newIn]=arr[row][col];
                            add=0;
                        }
                    }
                    else if (ar[newIn] !== arr[row][col])
                        {
                            add=0;
                            newIn--;
                            ar[newIn]=arr[row][col];
                        }
                }
            }
        for(var row=0;row<size;row++)
            {
                arr[row][col] = ar[row];
            }
    }
}





//SHIFT RIGHT

function shiftRight (){
    //Define a new array in which the changes are made    
    let ar = new Array(size);                                   
    let newIn;
    let add;

    //for keyPressUp we traverse each coloumn seprately
    for(var row=0;row<size;row++)
    {
    //Initil state of   
    ar.fill(0);
    newIn = -1; 
    add=0;
            for(var col=size-1;col>=0;col--)
            {
                if(arr[row][col]!==0)           //if value not equal zero
                {
                    if(newIn === -1  )          // if new is not empty
                    {
                        newIn=size-1;
                        ar[newIn] = arr[row][col];
                    }
                    else if ( ar[newIn] === arr[row][col] )
                    {
                        if(add === 0)
                        {
                            ar[newIn]+=arr[row][col];
                            add=1;
                            total+=ar[newIn];
                        }
                        else
                        {
                            newIn--;
                            ar[newIn]=arr[row][col];
                            add=0;
                        }
                    }
                    else if (ar[newIn] !== arr[row][col])
                        {
                            add=0;
                            newIn--;
                            ar[newIn]=arr[row][col];
                        }
                }
            }
        for(var col=0;col<size;col++)
            {
                arr[row][col] = ar[col];
            }
    }
}



