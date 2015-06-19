var user_name = '';
var APP_ID = '1602764393271696';
var friendCache = {};

function  onAuthResponseChange(response){
    console.log('onAuthResponseChange',response);
}

function onStatusChange(response){
    if(response.status!='connected'){
        login(logincallback);
    }
    else{
        console.log("client already given access before");
        FB.api('/me?fields=first_name', function(data) {
             user_name = data.first_name;
        });
    }
}

function login(callback){
    FB.login(callback,{scope:'email,user_friends'});
}

function logincallback(response){
    if(response.status!=='connected'){
        console.log("client did not give access ");
    }
    else{
        console.log("client given access 1st time");
        FB.api('/me?fields=first_name', function(data) {
             user_name = data.first_name;
        });

    }
}

function reRequest(scope, callback) {
  FB.login(callback, { scope: scope, auth_type:'rerequest'});
}

var imgsrc = '';
function fbshare(prize){
    drawText('capturing your achievement wait a sec .....',3.2,5.3,'1em cursive','#F06292');
    var dataurl = convertCanvasToImage(_('picasso'));
    setTimeout(function(){
        $.ajax({
        type:"post",
        url:'dataimage.php',
        data:{imagedata:dataurl,name:Math.floor(Math.random()*10000000),prize:prize},
        success:function(data){
          drawText('capturing your achievement wait a sec .....',3.2,5.3,'1em cursive','white');
          imgsrc = data;
          
                if(prize.length>3) sendBrag('won a '+prize+' in this brainstorming game',imgsrc,function(response){});
                else  sendBrag('this game helps improve your attention skills',imgsrc,function(response){})
            
        },
        error: function(){
        }    
      });
        
    },700);                                   
}

function bragWall(response){
    if(response.status=='connected'){
            if(prize.length>3) sendBrag('won a '+prize+' in this brainstorming game',imgsrc,function(response){});
            else  sendBrag('this game helps improve your attention skills',imgsrc,function(response){});
    }
}

function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image.src;
}

function sendBrag(caption,picture, callback) {
      console.log(picture);
      setTimeout(function(){
          
          FB.ui({ method: 'feed',
             caption: caption,
             picture: picture,
             name: 'Checkout my achievement in Lost In Migration!',
             link: 'https://apps.facebook.com/lost_in_migration'     
         }, callback);
      },1000);
}

function getPermissions(callback) {
  FB.api('/me/permissions', function(response){
    if( !response.error ) {
      friendCache.permissions = response.data;
      callback();
    } else {
      console.error('/me/permissions', response);
    }
  });
}

function deletePic(){
    var filename = imgsrc.replace('http://ieeenitb.org/facebook/','');
    console.log(filename);
    $.ajax({
        type:"post",
        url:"delete.php",
        data:{filename:imgsrc},
        success: function(data){
            console.log(data);
        },
        error: function(){
        }
    });
}

function hasPermission(permission) {
  for( var i in friendCache.permissions ) {
    if( 
      friendCache.permissions[i].permission == permission 
      && friendCache.permissions[i].status == 'granted' ) 
      return true;
  }
  return false;
}