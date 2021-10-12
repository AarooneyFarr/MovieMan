document.getElementById("movieButton").addEventListener("click", event => {
    event.preventDefault();

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


            for (let i = 0; i < json.Search.length; i++) {
                console.log(json.Search[i].Title);

                const div = document.createElement("div");
                const header = document.createElement("h1");
                header.innerText = json.Search[i].Title;

                div.appendChild(header);
                movieDiv.appendChild(div);
            }
        })

})