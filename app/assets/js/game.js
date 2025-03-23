class game {

    #main = null;
    #data = null;

    constructor(main) {
        this.#main = main;
    }

    build() {

      let html = "";

      html += `<i class="bi bi-patch-question-fill btn-show-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasinfo" aria-controls="offcanvasinfo"></i>

        <img src="images/vecteezy_wooden-table-and-blur-of-beauty-sunset-sky-and-mountains.jpg" class="img-full" alt="map">

        <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasinfo" aria-labelledby="offcanvasinfoLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasinfoLabel">Chasse aux 3 oeufs</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body small">
            <div class="intro-text"></div>
            <div class="accordion" id="titleaccordion"></div>
          </div>
      </div>`;

      const $html = $(html);
      this.#main.container.html($html)
      
      this.loadConfig(() => {

        this.#main.defineTitle(this.#data.title);
        $("#offcanvasinfoLabel").html(this.#data.title);
        $html.find(".offcanvas-body .intro-text").html(this.#data.intro);

        this.#main.loadingInProgress(false);
        this.display(this.gameOfTheDay);
        
        this.#main.container.find(".btn-show-info").click();
        
      });

    }

    display(game) {
      
      //Build intro
      
      for(var i = 0; i < this.#data.day.length; i++) {

        var dataDay = this.#data.day[i];
        var addShowClass = '';

        if (dataDay.id == game) addShowClass = " show";
        
          let html = `<div class="accordion-item">
            <h2 class="accordion-header" id="headingDay${dataDay.id}">
              <button class="accordion-button${ (addShowClass ? "" : " collapsed") }" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDay${dataDay.id}" aria-expanded="${ (addShowClass ? "true" : "false") }" aria-controls="collapseDay${dataDay.id}">
                ${dataDay.name}
              </button>
            </h2>
            <div id="collapseDay${dataDay.id}" class="accordion-collapse collapse${addShowClass}" aria-labelledby="headingDay${dataDay.id}" data-bs-parent="#titleaccordion">
              <div class="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>`;

          const $html = $(html);

          this.#main.container.find(".offcanvas-body #titleaccordion").append($html);

      }

    }

    get gameOfTheDay() {
      return 1;
    }

    async loadConfig(callback) {

      const requestURL = "assets/config/game.json";
      const request = new Request(requestURL);
      
      const response = await fetch(request, { cache: "no-store" });
      const prom = response.json();

      prom.then($.proxy(function(json, p) {
        this.ref.#data = json;
        this.callback()
      }, { ref: this, response: response, callback: callback }))
      .catch($.proxy(function(error) {
        //alert
      }, { ref: this, response: response }));

    }

}

export { game };