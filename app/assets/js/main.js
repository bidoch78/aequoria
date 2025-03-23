import { game } from "../../assets/js/game.js"

class main {

    #container = null;
    #game = null;

    constructor(container) {
        this.#container = container;
        this.#game = new game(this);
        this.#game.build();
    }

    loadingInProgress(status) {

        if (status) {
            
            if ($(".loading_data").length) return;

            let loadingDiv = document.createElement("div");
            loadingDiv.classList.add("loading_data");
            loadingDiv.innerHTML = `<div class="spinner-border text-danger" role="status"><span class="visually-hidden">Loading...</span></div>`;
            
            document.body.append(loadingDiv);

        }
        else {

            if (!$(".loading_data").length) return;
            $(".loading_data").remove();

        }

    }

    get container() {
      return this.#container;
    }

    defineTitle(txt) {
      $("head title").text(txt);
    }

    /******************************** STATIC */

    static formatDateToString(dt) {

        if (dt && dt.date) {
          return dt.date.split(" ")[0];
        }
  
        return dt;
  
    }

    static createCookie(name, value, days) {
        if (days) {
          var date = new Date();
          date.setTime(date.getTime()+(days*24*60*60*1000));
          var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
      }
    
      static readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
      }
    
      static eraseCookie(name) {
        app_core.createCookie(name,"",-1);
      }    

}

$(document).ready(function() {
    new main($("#app"));

    $('#illustration').hover( function(){
      $(this).addClass('expand');
    }, function(){
      $(this).removeClass('expand');
    } );

});