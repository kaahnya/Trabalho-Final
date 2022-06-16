let noticiaURL = "https://www.luizpicolo.com.br/api.json"; 
let XHR = new XMLHttpRequest();

XHR.open("GET", noticiaURL);
XHR.responseType = "json";
XHR.send();

XHR.onload = function(){
let noticias = XHR.response;

  class CustomError extends Error {
  constructor(message) {
    super(message);
    this.message = "erro"

  }
}
  
  class Noticia {
  constructor(title, description, url, publishedAt, author){
    this.title = title;
    this.publishedAt = publishedAt;
    this.description = description;
    this.author = author;
    this.url = url;
  }

  mostrarNews(){
    if(this.description != ""){
    return `<h1><a href="${this.url}">${this.title}</a>
       </h1>
      <div class="desc"><h3>${this.description}</h3></div>
      <div class="date"><h3>${this.publishedAt}</h3></div>
      <div class="author"><h3>${this.author}</h3></div>`;
    }else{
      throw new CustomError('É necessária uma descrição.')}
    }
  }

  const elemento = document.getElementById('noticia');
  noticias.articles.forEach(noticia =>{
    let noticiaNews = new Noticia (noticia.title, noticia.description, noticia.url, noticia.publishedAt, noticia.author);
  elemento.insertAdjacentHTML('beforeend', noticiaNews.mostrarNews() );
  })

  class NoticiaDest extends Noticia {
    constructor(title, description, url, urlToImage, publishedAt, author){
      super(title, description, url, publishedAt, author)
      this.urlToImage = urlToImage;
    }
    mostrarDest(){
      return `<h1>${this.title}</h1>
    <div class="context">
    <div class="desc2"><h3>${this.description}</h3></div>
    <div class="date2"><h3>${this.publishedAt}</h3></div>
    </div>
        <a href="${this.url}">
    <img src="${this.urlToImage}"alt=""/></a>
    <div class="author2"><h3>${this.author}</h3></div>`;
    }
  }
  
   let noticiaDest = new NoticiaDest(
     noticias.articles[0].title,
     noticias.articles[0].description,
     noticias.articles[0].url,
     noticias.articles[0].urlToImage,
     noticias.articles[0].publishedAt,
     noticias.articles[0].author)
      elemento.insertAdjacentHTML('afterbegin', noticiaDest.mostrarDest());
}