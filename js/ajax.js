'use strict';

var Namespace = {};
Namespace.AJAX = function(config){
    if(!(this instanceof Namespace.AJAX)){
            return new Namespace.AJAX(config);
        }
        this._options = {
            type: config.type || 'GET',
            url: config.url || window.location.href,
            data: config.data || {},
            async: config.async || true,
            success: config.success || function(){},
            error: config.success || function(){},
        }
    this._createObject();
    this._openConnect();
    this._changeState();
    this._sendData();
}

Namespace.AJAX.prototype._createObject = function(){
    this._xhr = new XMLHttpRequest();
}

Namespace.AJAX.prototype._openConnect = function(){
                this._xhr.open(
                    this._options.type,
                    this._options.url,
                    this._options.async,
                    )
            }

Namespace.AJAX.prototype._changeState = function(){
    this._xhr.addEventListener("readystatechange", function(){
                    if(this._xhr.status === 200){
                        console.log(this._xhr.readyState, this._xhr.status);
                        if(this._xhr.readyState === 4 && this._xhr.status === 200){
                            this._options.success(this._xhr.response, this._xhr);
                            this._xhr = null;
                        }
                    }else{
                        this._options.error(this._xhr);
                    }
                }.bind(this), true);
}

Namespace.AJAX.prototype._sendData = function(){
    if(this._options.type === "POST" && this._options.data != null){
                    this._serializePosteData();
                    this._xhr.send(this._postData);
                }else{
                    this._xhr.send(null);
                }
}

Namespace.AJAX.prototype._serializePosteData = function(){   this._postData = new FormData();
    for(var key in this._options.data){
        this._postData.append(key, this._options.data[key]);
    }
}


const input = document.querySelector('#tytul');
const res = document.querySelector('#result');

input.addEventListener('keyup', runAJAX, true);

function runAJAX(){
    res.innerHTML = "";
//    console.log(Namespace.AJAX)
    Namespace.AJAX({
        type: "POST",
        url:  "server.php",
        data: {
            autorName: input.value,
//        lastName: "Postek",
//        age: 32,
        },
        success: function(response, xhr){
            if(response){
                const objJSON = JSON.parse(response);
                console.log(objJSON);
                let content = '';
                objJSON.forEach(function(element, index){
                    content += `Tytuł: ${element.tytul}, Autor: ${element.autor}  <br>`;
                });
                res.innerHTML = content;
            }
//            console.log("Zakończono status:" + xhr.status + " " + response);
        },
        error: function(xhr){
            
//            console.log("Błąd, status:" + xhr);
        }
    });
}

