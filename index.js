let URL = 'https://darylcosm0.github.io/project-code-challenge-3/db.json' 
  const listHolder = document.getElementById('films') 
  document.addEventListener('DOMContentLoaded', ()=>{ 
      document.getElementsByClassName('film item')[0].remove() 
      fetchOne(URL); 
      fetchMovies(URL) 
  }) 
 
 //fetch single film
 function fetchSingleFilm(id){
     let url = 'http://localhost:3000/films/'+id;
     fetch(url).then((response) => response.json()).then((film)=>renderSingleFilm(film));
 }
 //display single film details
 function renderSingleFilm(film){
     const divFilmContents = document.getElementById('film-content');
     divFilmContents.innerHTML = "";
     //title
     const h2 = document.createElement('h2')
     h2.innerHTML = film.title;
     divFilmContents.appendChild(h2);
     //Description
     const ParagraphForDescription = document.createElement('P');
     ParagraphForDescription.innerHTML = "<b>Description: </b>"+film.description;
     divFilmContents.appendChild(ParagraphForDescription);
     //runtime
     const h3 =document.createElement('h3')
     h3.innerHTML ="<b>Runtime: </b>" + film.runtime
     divFilmContents.appendChild(h3)
     //Showtime
     const p =document.createElement('p')
     p.innerHTML ="<b>Showtime: </b>" + film.showtime
     divFilmContents.appendChild(p)
     //available tickets
     const paragraphAvailableTickets = document.createElement('p');
     paragraphAvailableTickets.setAttribute('id','tickets');
     const availableTickets = film.capacity - film.tickets_sold;
     paragraphAvailableTickets.innerHTML = "<b>Available tickets: </b>"+availableTickets;
     divFilmContents.appendChild(paragraphAvailableTickets)
     //poster
     const img = document.createElement('img');
     //img.innerHTML = "<b>Description: </b>"+film.description;
     img.setAttribute("src",film.poster);
     img.setAttribute("height", "300");
     img.setAttribute("width", "300");
     divFilmContents.appendChild(img)
     //button
     const button = document.createElement('button');
    button.textContent = "Buy Ticket";
     divFilmContents.appendChild(button);
    button.addEventListener('click', function() {
         const ticketText = document.getElementById('tickets').innerHTML;
         //get tickets as a substring of ticketText
         const availableTickets = ticketText.substring(26);
         if(availableTickets <= 0) {
             alert("sold out");
         }
         else{
             const remainingTickets =availableTickets - 1;
         //alert(availableTickets);
         document.getElementById('tickets').innerHTML = "<b>Available tickets: </b>" + remainingTickets;
         alert("You successfully bought a ticket")
         }
     })
 }
      //fetchin the  film list
 function fetchFilmsList() {
     fetch('http://localhost:3000/films/').then((response) => response.json()).then((films)=>renderFilmsList(films));
 }
     //display of the film details  
     function renderFilmsList(films) {
         films.forEach(film => {
             const filmList =document.getElementById('sidebar')
             const a = document.createElement('a');
             a.innerHTML=film.title;
             if(film.id == 1){
                 a.className = "active";
             }
             a.onclick = function() {
                fetchSingleFilm(film.id);
             };
             filmList.appendChild(a);
         });
       }
     document.addEventListener('DOMContentLoaded', (event) => {
         fetchSingleFilm(1);
         fetchFilmsList();
       });
 
 
  /**fetch 1 movie */ 
  function fetchOne(URL){ 
      fetch(URL).then((response) => response.json()) 
      .then(data => { 
          setUpMovieDetails(data.films[0]); 
      }) 
  } 
   
   
  //Create fetch function to get the data from the db.json 
  function fetchMovies(URL){ 
      fetch(URL) 
      .then(resp => resp.json()) 
      .then(movies => { 
          movies.films.forEach(movie => { 
              displayMovie(movie) 
          }); 
      }) 
  } 
  //function to display the titles of the movies as a list 
  function displayMovie(movie){ 
      const list = document.createElement('li') 
      list.style.cursor="cell" 
      list.textContent= (movie.title) 
      listHolder.appendChild(list) 
      addClickEvent() 
  } 
  //Adding the click event listener 
  function addClickEvent(){ 
      let children=listHolder.children 
      for(let i=0; i<children.length; i++){ 
          let child=children[i] 
          // console.log(child) <= to check if have the right child 
          child.addEventListener('click',() => { 
              fetch(`${URL}`) 
              .then(res => res.json()) 
              .then(movie => { 
                  document.getElementById('buy-ticket').textContent = 'Buy Ticket' 
                  setUpMovieDetails(movie.films[i]) 
              }) 
          }) 
      } 
  } 
  //Posting movie details 
  // poster to be dispalyed on the div with poster id 
  function setUpMovieDetails(funMovie){ 
      const preview = document.getElementById('poster') 
      preview.src = funMovie.poster; 
  //title 
      const movieTitle = document.querySelector('#title'); 
      movieTitle.textContent = funMovie.title; 
      //runtime 
      const movieTime = document.querySelector('#runtime'); 
      movieTime.textContent = `${funMovie.runtime} minutes`; 
      //description 
      const movieDescription = document.querySelector('#film-info'); 
      movieDescription.textContent = funMovie.description; 
      //Showtime 
      const showTime = document.querySelector('#showtime') 
      showTime.textContent = funMovie.showtime; 
      // available tickets =capacity - tickets sold 
      const tickets  = document.querySelector('#ticket-number') 
      tickets.textContent = funMovie.capacity -funMovie.tickets_sold; 
  } 
  // //Sold out 
  const btn = document.getElementById('buy-ticket') 
          btn.addEventListener('click', function(event){ 
              let remainingTickets = document.querySelector('#ticket-number').textContent 
              event.preventDefault() 
              if(remainingTickets > 0){ 
                  document.querySelector('#ticket-number').textContent  = remainingTickets-1 
              } 
              else if(parseInt(remTickets, 10)===0){ 
                  btn.textContent = 'Sold Out' 
              } 
      });