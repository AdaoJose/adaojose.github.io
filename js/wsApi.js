            var conOpen = [],conClose = [], conError = [],conMessage = [], con,conStatus = false;
            function execArrayFunction(e,msg = null){ //@param Array e[0]=>CallBackFunction();@param Message msg;
                for(i = 0; e[i]; i++){
                    new e[i](msg);
                }
            }
        var ws = {
            "con":function(f){//@param Host f
                 con = new WebSocket(f);
                 con.onopen=function(){
                     conStatus = true;
                    execArrayFunction(conOpen);
                }
                con.onerror= function(err){
                    conStatus = fale;
                    execArrayFunction(conError);
                }
                con.onclose = function(){
                    conStatus = false;
                    execArrayFunction(conClose);
                }
                con.onmessage = function(msg){
                    execArrayFunction(conMessage,msg);
                };
                
            },
            "open":function(a){//@param CallBackFunction a;
                conOpen.push(a);
            },
            "close":function(b){//@param CallBackFunction b;
                conClose.push(b);
            },
            "error":function(c){//@param CallBackFunction c;
                conError.push(c);
            },
            "message":function(d){//@param CallBackFunction d;
                conMessage.push(d);
            },
            "send":function(g){
                console.log(conStatus);
                if(conStatus==true){
                    con.send(g);
                }else{
                    let a =
                    setInterval(function(){
                        if(conStatus==true){
                            con.send(g);
                            clearInterval(a);
                        }
                        
                    },200);
                }
            }
        }
        