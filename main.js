const size =4; //size of the playble array
let loggedIn = 0; //to check if someone has pressed in the game box
let start = 0;  //start helps in reseting the game
let count=0; //counts the no. of elements in the matrix
let arr; 
let total=0; 
const domRows = document.querySelectorAll(".row");
const score = document.getElementById('score');
const box = document.querySelector('.box');
const message = document.querySelector('.instr');
const control = document.querySelector(".i");
box.addEventListener('click' , mouseClick);
document.addEventListener('keydown' , keyPress );
control.addEventListener('click' , controlDesc);
let controlDescOpen = false;


//Genrate random element function

let genrate = function()
{
    if(count <16)     
    {
        count=0;
        var i = Math.floor(Math.random() * 4);
        var j = Math.floor(Math.random() * 4);
        
        if(arr[i][j] === 0)
        {
            arr[i][j] = 2;
        }
        else
        {
            genrate();
        }
    }
    else{
        alert("GameOver Your Score-->"+ total);
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

function keyPress(e){
    if(loggedIn === 1)
    {
      console.log(e.code);
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
          shiftLeft();
          check();
          genrate();
          update();
      } 
      else if(e.code === 'ArrowLeft')
      {
          shiftRight();
          check();
          genrate();
          update();
      } 
    }
}

function mouseClick(e){
    message.style.visibility="hidden";
    startPlay();
}


function controlDesc()
{
    if(controlDescOpen === false)
    {
        controlDescOpen = true ;
        console.log(1);
        control.parentElement.style.clipPath = "circle( 130% at 7% 15%)";
        control.innerHTML = "Back"
    }
    else{
        controlDescOpen = false ;
        console.log(0);
        control.parentElement.style.clipPath = "circle( 7% at 6.5% 14%)";
        control.innerHTML = "i"
    }
}


//Game Functions


let shiftUp = function(){

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


//SHIFT RIGHT


let shiftRight = function(){
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

let shiftDown = function(){
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





//SHIFT LEFT

let shiftLeft = function(){
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



