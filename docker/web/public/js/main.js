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
                            <article>
                              <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
<div class="layout row wrap align-center" layout="row">
<div class="card__text">
<div class="layout">
<div class="flex xs6 md12">
<div class="card" data-ripple="false" style="height: auto;">

<div class="card__media" style="height: 200px;">
<div class="card__media__background" style="background: url(&quot;/static/img/local-business-5.jpg&quot;) center center / cover no-repeat;"></div>
</div>

<div class="card__title card__title--primary"><h3 class="headline mb-0">${song.title || 'Unknown'} by ${song.artist || 'Unknown'}</div>
<div class="card__title card__title--primary">${song.opinion || 'none'}</div>

<div class="card__actions">

<button type="button" class="btn btn--flat orange--text" data-ripple="true">
<div class="btn__content">Rating: ${song.rating}</div></button>

<button type="button" class="btn btn--flat orange--text" data-ripple="true">
<div class="btn__content">Explore</div></button>

</div>

</div></div></div></div>
</div>
</v-layout>
</v-container>
                            </article>
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