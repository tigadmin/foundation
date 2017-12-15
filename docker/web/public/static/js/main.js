(function() {

  function loadHomepage() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/contents?type=Song');
    xhr.onreadystatechange = renderHomepage;
    xhr.send(null);
  }

  function renderHomepage(event) {
    const DONE = 4;
    const OK = 200;
    let xhr = event.currentTarget;
    let html = '';

    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        const songs = window.JSON.parse(xhr.responseText).data;
        console.log(songs);
        if(songs.length === 0){
          html = '<p><strong>There have not been any Songs added, <a href="/admin">go add some at /admin</a></strong></p>';
        } else {
          html = songs.map(function(song) {
            return `
    <!--<article>
               <v-card-media src="/static/img/local-business.jpg" height="200px">
                  </v-card-media>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">${song.title || 'Unknown'} by ${song.artist || 'Unknown'}</h3>
                      <div class="subheading grey--text text--darken-1">${song.opinion || 'none'}</div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="teal">RATING: ${song.rating}</v-btn>
                    <router-link to="/localwebsitedesign/"><v-btn flat color="teal">Explore</v-btn></router-link>
    </article>-->
        <section>
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <v-flex xs12 sm8 class="my-3">
          <div class="text-xs-center">
            <h2 class="display-2 text-xs-center">Performance Based Local Marketing</h2>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>

              <v-flex xs12 md4>
                <v-card>

                  <v-card-media src="/static/img/local-business.jpg" height="200px">
                  </v-card-media>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">Website Design</h3>
                      <div class="subheading grey--text text--darken-1">Google powered website specifically designed for local business that works across all devices and loads instantly.</div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="teal">PRICE: $999</v-btn>
                    <router-link to="/localwebsitedesign/"><v-btn flat color="teal">Explore</v-btn></router-link>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
                        `;
          }).join();
        }
      } else {
        html = '<p><strong>The /api endpoint did not respond correctly :-(</strong></p>';
      }

      document.querySelector('#main').innerHTML = html;
    }
  }

  document.addEventListener("DOMContentLoaded", loadHomepage);
})();
