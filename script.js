document.getElementById("movieButton").addEventListener("click", event => {
    event.preventDefault();

    document.getElementById("HeroShrink").style.height = "300px";
    document.getElementById("movieHero").style.height = "40vh";
    document.getElementById("HeroTitle").style.paddingBottom = "0px";
    document.getElementById("HeroTitle").style.fontSize = "20px";
    document.getElementById("HeroTitle").style.letterSpacing = "10px";

    const url = "http://www.omdbapi.com/?apikey=e5b65372" +
        "&s=" + document.getElementById("movieField").value;

    console.log(url);

    let movieDiv = document.getElementById("movieDiv");

    while (movieDiv.firstChild) {
        movieDiv.removeChild(movieDiv.firstChild);
    }

    fetch(url)
        .then(response => {
            return response.json();
        }).then(json => {
            console.log(json);
            console.log(json.Search[0].Title);

            let container = document.createElement("div");
            container.classList.add("container");

            let row = document.createElement("div");
            row.classList.add("row", "row-cols-3", "g-4");

            for (let i = 0; i < ((json.Search.length > 3) ? 3 : json.Search.length); i++) {
                console.log(json.Search[i].Title);




                let img = '';
                let plotText = '';


                getMoviePosterURL(json.Search[i].imdbID)
                    .then(imgURL => {
                        img = imgURL;

                        getMoviePlot(json.Search[i].imdbID)
                            .then(text => {
                                plotText = text;
                                row.append(makeCard(json, i, img, plotText, json.Search[i].imdbID));

                            })
                            .catch(e => {
                                plotText = "API CALL LIMIT Exceeded";
                                row.append(makeCard(json, i, img, plotText, json.Search[i].imdbID));
                            });
                    })
                    .catch(e => {
                        getMoviePlot(json.Search[i].imdbID)
                            .then(text => {
                                plotText = text;
                                row.append(makeCard(json, i, img, plotText, json.Search[i].imdbID));

                            })
                            .catch(e => {
                                plotText = "API CALL LIMIT Exceeded";
                                row.append(makeCard(json, i, img, plotText, json.Search[i].imdbID));
                            });

                        console.log('There has been a problem with your fetch operation: ' + e.message);
                        img = "https://i.picsum.photos/id/353/200/300.jpg?hmac=dp_gN1fPfq1NcUZmNjRXfOwD3UH0D4B8A-jwvjByOyc";
                    });







                container.append(row);
                movieDiv.append(container);



            }
        })

})

let getMovieDataArray = async (json) => {
    let img = '';
    let plotText = '';


    getMoviePosterURL(json.Search[i].imdbID)
        .then(imgURL => {
            img = imgURL;
        })
        .catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
            img = "https://i.picsum.photos/id/353/200/300.jpg?hmac=dp_gN1fPfq1NcUZmNjRXfOwD3UH0D4B8A-jwvjByOyc";
        });

    getMoviePlot(json.Search[i].imdbID)
        .then(text => {
            plotText = text;

        })
        .catch(e => {
            plotText = "API CALL LIMIT Exceeded";
        });

    row.append(makeCard(json, i, img, plotText, json.Search[i].imdbID));

}

let getMoviePosterURL = async (movieId) => {
    let url = "https://imdb-api.com/en/API/Posters/k_f11gqrsc/" + movieId;

    let response = await fetch(url);

    let json = await response.json();

    return json.posters[0].link;

}

let getMovieText = async (movieId) => {
    let url = "https://imdb-api.com/en/API/Wikipedia/k_f11gqrsc/" + movieId;



    let response = await fetch(url);

    let json = await response.json();

    return truncateText(json.plotShort.plainText, 0, 2);

}

let getMoviePlot = async (movieId) => {
    let url = "http://www.omdbapi.com/?apikey=e5b65372&i=" + movieId;



    let response = await fetch(url);

    let json = await response.json();

    return json.Plot;

}

let truncateText = (text, offset, length) => {
    let truncated, extra;
    extra = text;
    truncated = "";
    index = 0;

    for (let i = 0; i < offset; i++) {

        extra = extra.substring(extra.indexOf(".") + 1, 1000);
    }

    for (let i = 0; i < length; i++) {
        truncated += extra.substring(0, extra.indexOf(".") + 1)
        extra = extra.substring(extra.indexOf(".") + 1, 1000);
    }

    return extra;

}



let makeCard = (json, index, imgURL, plot, id) => {
    let col = document.createElement("div");
    col.classList.add("col", "text-center", "d-flex", "justify-content-center");

    let card = document.createElement("div");
    card.classList.add("card", "movieCard", "w-75");

    let poster = document.createElement("img");
    poster.classList.add("card-img-top");
    // poster.style.width = "200px";
    poster.src = imgURL;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = json.Search[index].Title;

    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerText = plot;

    let cardButton = document.createElement("a");
    cardButton.classList.add("btn", "btn-dark");
    cardButton.href = "https://www.imdb.com/title/" + id;
    cardButton.innerText = "MORE INFO";


    cardBody.append(cardTitle, cardText, cardButton);
    card.append(poster, cardBody);
    col.append(card);

    return col;
}

{/* <div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class ="card-body">
    <h5 class ="card-title">Card title</h5>
    <p class ="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class ="btn btn-primary">Go somewhere</a>
    </div>
</div> */}