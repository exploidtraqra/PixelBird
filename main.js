// USAGE

/*
var usage
fungsi load{
setup
atur ukuran
fungsi inti{
fungsi player
fungsi latar
fungsi animasi
}
var interval
}
*/
var reload = document.getElementById("reload");
var start = document.getElementById("start");
var credits = document.getElementById("credits");
var keluar = document.getElementById("xbtn");
var cret = document.getElementById("cret");

keluar.addEventListener("click", function (){
cret.style.display="none";
});


var tn = new Image();
var pemain = new Image();
var pemainup = new Image();
var bg = new Image();
var tg = new Image();
var logo = new Image();

logo.src = "logo.png";
tn.src = "tn.png";
tg.src = "tiang.png";
bg.src ="bg.png";
pemain.src = "player.png";
pemainup.src = "playerup.png";

function loading ()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	canvas.width=canvas.scrollWidth;
	canvas.height=canvas.scrollHeight;
	
	var cw = canvas.width;
	var ch = canvas.height;

    start.addEventListener("click", function (){
    start.style.display="none";
    credits.style.display="none";
    
    inti();
    });

    menu();


    function menu(){
       ctx.clearRect(0,0,cw,ch);
       ctx.drawImage(bg,0,0,cw,ch);
       ctx.font='40px "mario"';
       ctx.fillStyle="white";
       ctx.drawImage(logo,100,100,200,200);
    }


	
	function inti()
	{
		var change = false;
		function Player ()
		{
			this.x=100,this.y=300,this.w=50,this.h=50,this.i=0;
			this.render=function ()
			{
				if(change){
					ctx.drawImage(pemainup,this.x,this.y+=5); //ubah gravitasi
					this.i++;
					if(this.i==4){
                        //var xs = new Audio("punch.mp3");
                        //xs.play();
						change=false;
						this.i=0;
						}
				}else{
                    ctx.drawImage(pemain,this.x,this.y+=5);//ubah gravitasi
                    
				}
			}
		}
		//selesai();
		var player = new Player ();
        var skor =0, tambah=true;
        function tambahSkor(){
               var point = new Audio("point.mp3");
               point.play();
               skor++;
        }
        
        function kena(){
            for(var i=0;i<tiang.length;i++){
                 var t= tiang[i]
             if((player.x+player.w>t.x && player.y<t.y+t.h && player.x<t.x+t.w)||(player.x+player.w>t.x && player.y+player.h>t.y+t.h+250 && player.x<t.x+t.w)){
                        selesai ();
                  }else if(t.x+t.w<player.x){
                     if(tambah){
                        tambahSkor ();
                        tambah=false;
                     }   
                  }
            }
            if(player.y<=0){selesai ();}
            if(player.y+player.h>ch){selesai ();}
        }
        function selesai (){
           clearInterval(interval);
           ctx.clearRect(0,0,cw,ch);
           latar.render();
           rendertiang();
           ctx.drawImage(tn,0,ch-50,cw,200);
           ctx.drawImage(pemainup,player.x,player.y);
           reload.style.display="block";
           var erlang = new Audio();
           erlang.src="death.mp3";
           erlang.play();
           ctx.font="60px savage";
           ctx.fillStyle="red";
           ctx.fillText("YOU DIE :( ",60,200);
           ctx.fill();
           ctx.fillStyle="white";
           ctx.font="60px savage";
           ctx.fillText("score: "+skor,70,300);
           ctx.fill();
        }
		
		function Latar()
		{
			this.x=0,this.y=0,this.w=cw,this.h=ch;
			this.render=function ()
			{
			ctx.drawImage(bg,this.x,this.y,this.w,this.h);
			}
		}
		
		var latar = new Latar();
		
		var tiang = [];
		cetak();
		function cetak ()
        {
        	var x=400,y=0,w=30,h=507;
            var acak = Math.floor(Math.random()*150);
            tiang.push({"x":x,"y":y-acak,"w":w,"h":h});
		}
		
        var hitung=0;

        function rendertiang(){
        for(var i=0; i<tiang.length;i++){
             var t = tiang[i];
             ctx.drawImage(tg,t.x--,t.y);
             ctx.drawImage(tg,t.x--,t.y+t.h+250);

             if(t.x+t.w<0){
                 tiang.splice(i,1);
                 tambah=true;
             }
        } 
        hitung++;
        if(hitung == 100){
            cetak ();
            hitung=0;
          }
        }
		
		function animasi()
		{
			ctx.save();
			ctx.clearRect(0,0,cw,ch);
			latar.render();
            rendertiang();
            ctx.drawImage(tn,0,ch-50,cw,200);
            player.render();
            ctx.font="bold 80px Normal";
            ctx.fillStyle="white";
            ctx.fillText(skor,160,100);
            ctx.fill();
            kena();
			ctx.restore();
		}
		var interval = setInterval(animasi,30);
		
		ctx.canvas.addEventListener("click", function ()
		{
			player.y-=60;
			change = true;
		});
	}
}

window.addEventListener("load", function ()
{
	loading ();
});