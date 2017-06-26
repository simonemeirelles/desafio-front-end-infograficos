
//Function para slides

function foo() {
  $.getJSON("http://localhost:8000/Arquivos/JSON/slide.json", function(json) {
      console.log(json["0"].imagens); //Acessa as imagens.
      total = json["0"].imagens.length;
      var buffer="";
      var square="";
      for (i = 0; i < total; i++) {
        console.log(json["0"].imagens[i]);
        square += "<span class='square'></span>";
        buffer +="<img class='banner__slide none' src='src/images/Slide/" + json["0"].imagens[i] + "' alt=''>";
      }
    $('#banner').html(buffer + "<div class='banner__square'>" + square + "</span>");
  });
}

//Montar as informações do filtro

function data() {
  $.getJSON("http://localhost:8000/Arquivos/JSON/noticias.json", function(json) {
    total = json["0"].Editorias.length;
    var buffer="";
     for (i = 0; i < total; i++) {
       totalx = json["0"].Editorias[i].Notícias.length;
       for (x = 0; x < totalx; x++) {
         data = json["0"].Editorias[i].Notícias[x]["Data de publicação"].replace(/-/g, "/");
         buffer += "<option value:'" + data + "'>" + data + "</option>";
        //  console.log(buffer);
       }
     }
     $('.filtro-data').html(buffer);
  });
}

//Function para gerar os cards

function news() {
  $.getJSON("http://localhost:8000/Arquivos/JSON/noticias.json", function(json) {
    total = json["0"].Editorias.length;
    var buffer="";
     for (i = 0; i < total; i++) {
       totalx = json["0"].Editorias[i].Notícias.length;
       totalz = json["0"].Editorias[i].Editoria.length;
       for (x = 0; x < totalx; x++) {
         data = json["0"].Editorias[i].Notícias[x]["Data de publicação"].replace(/-/g, "/");
         foto = json["0"].Editorias[i].Notícias[x]["Foto"];
         titulo = json["0"].Editorias[i].Notícias[x]["Título"];
         texto = json["0"].Editorias[i].Notícias[x]["Texto"];
         editoria = json["0"].Editorias[i].Editoria;

         buffer +="<div class='news__block'><div class='innerblock'><div class='news__header'><span class='news__header-data'>" + data + "</span><span class='news__header-editoria'>" + editoria + "</sapn></div><img class='news__header-foto' src='src/images/Notícias/" + foto + "'></img><div class='news__body'><h2 class='news__body-titulo'>" + titulo + "</h2><p class='news__body-texto'>" + texto + "</p><p class='mais'>Saiba mais</p></div></div></div>";
       }
     }
     $('#news').html(buffer);
  });
}

//Function para montar os gráficos

function grafic() {
  $.getJSON("http://localhost:8000/Arquivos/JSON/noticias.json", function(json) {
    grafico = "";
    total = json["0"].Editorias.length;
    var j = 0;
    for (i = 0; i < total; i++) {
      j = j + 1;
    }
    for (x = 0; x < total; x++) {
        valores = json["0"].Editorias[x].Acessos;
        editoria = json["0"].Editorias[x].Editoria;
        grafico += "<div class='grafics__bar' style='height:" + valores + "%'><span class='grafics__editoria'>" + editoria + "</span><span class='grafics__val'>" + valores + "</span></div>";
      }
    $('#grafics').html(grafico);
    // console.log(total = json["0"].Editorias);
  });
}

//Function para verificar qual o maior valor

function maior() {
  var t = $('.grafics__val');
  for (i = 1; i < t.length; i++){
  	maior = parseInt($('.grafics__val')[i].textContent);
  	if (maior > x) {
  		x = maior;
      console.log(maior);
      b = $('.grafics__bar')[i]
      $(b).css("background", "red");
       } else {
      	// console.log(maior);
  	}
  }
};

//Filtrar

$(document).ready(function(){
 $('#filtro').change(function(){
  var filter = $(this).val();
  $('option').each(function(){
   if ($(this).val() == filter) {
     var test = "span:contains('" + filter + "')"
     if ( filter )
      $( ".news__block").css("display", "none");
      $( test ).parent().parent().parent().css("display", "block");
   }
  $('#filtro').val(filter);
  })
 })
})

//Ordenar

$(document).ready(function(){
 $('#ordenar').change(function(){
  var filter = $(this).val();
  $('#ordenar option').each(function(){
   if ($(this).val() == filter) {
     var test = "span:contains('" + filter + "')"
     if ( filter )
      $( ".news__block").css("display", "none");
      $( test ).parent().parent().parent().css("display", "block");
   }
  $('#ordenar').val(filter);
  })
 })
})

//Function map

function initMap() {
  var uluru = {lat: 51.5211622, lng: -0.1568325};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16  ,
    center: uluru,
    disableDefaultUI: true
  });

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var image = '../src/images/iconMap.png';
  var marker = new google.maps.Marker({
    position: {lat: 51.5211622, lng: -0.1568325},
    map: map,
    icon: image
  });

  // var marker = new google.maps.Marker({
  //   position: uluru,
  //   map: map,
  //   title: 'Uluru (Ayers Rock)'
  // });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

// Botão para o próximo slide

function next() {
    val = $("#banner img:first-child").attr('src').substring(0,17); // pego o caminho até antes do número
    num = $("#banner img:first-child").attr('src').substring(17,18);
    numInt = parseInt(num);
    total = numInt + 1;
    string = "src/images/Slide/" + total + ".jpg";
    $("#banner img:first-child").attr('src', string);
    // $("#banner img:first-child").css("display", "block");
    console.log("OK");
    if (total > 5 ) {
        $("#banner img:first-child").attr('src', 'src/images/Slide/1.jpg');
        console.log("Passou de 6");
    }
}

// Botão para 0 slide anterior

function prev() {
    val = $("#banner img:first-child").attr('src').substring(0,17); // pego o caminho até antes do número
    num = $("#banner img:first-child").attr('src').substring(17,18);
    numInt = parseInt(num);
    total = numInt - 1;
    string = "src/images/Slide/" + total + ".jpg";
    $("#banner img:first-child").attr('src', string);
    $("#banner img:first-child").css("display", "block");
    console.log("OK");
    if (total < 1 ) {
        $("#banner img:first-child").attr('src', 'src/images/Slide/5.jpg');
        console.log("Menor que 1");
    }
}

//Chamada para as functions

foo();
news();
grafic();
data()


// run function default

$( document ).ready(function() {
    $("#banner img:first-child").addClass("block");

      initMap();
      maior();
});
