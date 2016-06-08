$(document).ready(function(){
var moves = 0,timeLoop,timeDiff,setDate;	
var tilesArray = ['1','2','3','4','5','6','7','8','1','2','3','4','5','6','7','8'];
var tilesValue = [];
var tilesId = [];
var tilesFlipped = 0;

setDate = new Date();
setDate = Date.parse(setDate) + 120000;
setDate = new Date(setDate);

timeLoop = setInterval(function(){
	  var t1 = new Date();
      time(setDate,t1);
      if(timeDiff<=0)
      {clearInterval(timeLoop);
       alert("Times Up!");
       location.reload();
       }},1000);

function time(a,t)
{
    var nTime = t;         //Current Time
    var ms1 = Date.parse(a);     //Date a in milliseconds       
    var ms2 = Date.parse(nTime);   
    timeDiff = ms1-ms2;             //Difference
    $("#d").html("Time:"+timeDiff/1000+"s");    
    
}

newBoard();
function newBoard()
{   
	tilesFlipped = 0;
	var output = '';
    shuffle(tilesArray);
    for(var i = 1; i <= tilesArray.length; i++)
	{  
	  $("#b"+i).on('click', function(){FlipTile(this);});
	  
	}
	
}

function FlipTile(tile)
{     moves++;
	  $("#e1").html("Moves:"+moves);
	  var q = tile.id.slice(1); 
	  q = parseInt(q)-1;
	  var tileNo = tilesArray[q];
	  	if(tile.innerHTML == "" && tilesValue.length < 2)
	{   
		tile.style.background = '#FFF';
		tile.innerHTML = tileNo;
		if(tilesValue.length == 0)
		{
			tilesValue.push(tileNo);
			tilesId.push(tile.id);
		} else if(tilesValue.length == 1)
		{
			tilesValue.push(tileNo);
			tilesId.push(tile.id);
			if(tilesValue[0] == tilesValue[1])
			{
				tilesFlipped += 2;
				// Clear both arrays
				tilesValue = [];
            	tilesId = [];
				// Check to see if the whole board is cleared
				if(tilesFlipped == 16)
				{   moves = 0;
					alert("Board cleared... generating new board");
					location.reload();
				}
			} else 
			{
				function flip2Back()
				{
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(tilesId[0]);
				    var tile_2 = document.getElementById(tilesId[1]);
				    tile_1.style.background = 'linear-gradient(to left, #fd746c , #ff9068)';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'linear-gradient(to left, #fd746c , #ff9068)';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    tilesValue = [];
            	    tilesId = [];
				}
				setTimeout(flip2Back, 500);
			}
		}
	}
}

function shuffle(a) 
{
    var j, x, i;
    for (i = a.length; i; i -= 1) 
    {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
});
