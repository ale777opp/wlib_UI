<?php 
///htdocs/wlib/html/pages/index
echo "include";
include (THEPAGESPATH.'/includes/searchdiv.php');
echo "require";
require_once "get_page_info.php";

$con = new Db();
$con->books();
$books=$con->data;

$con->events();
$events=$con->data;

$con->news();
$news=$con->data;

?>
<style type="text/css">
	.grid_container {
			/*background-color: gray;*/
			height: 100%;
			width: 80%;
			margin: 10px auto;
			text-align: center;

			display: grid;
			grid-gap: 1vw;
			grid-template-areas:
        "gap	  playbill 	gap3"
        "events	  playbill 	books"
        "events   playbill 	books"
        "events   news 		books"
        "events	  news 		books"
        "calendar news 		books"
        "calendar news 		gap1"
        "calendar gap2 		gap1";
        	grid-template-columns: 5fr 8fr 6fr;
  			grid-template-rows: repeat(8, 90px);
		}
		#gap {
			grid-area: gap;
		}
		#gap1 {
			grid-area: gap1;
		}
		#gap2 {
			grid-area: gap2;
		}
		#gap3 {
			grid-area: gap3;
		}	
		#playbill {
  			grid-area: playbill;
  		}
		#books_container {
  			grid-area: books;
			font-size: medium;  
		}
		#events_container {
			grid-area: events;
			font-size: medium;
		}
		#news_container {
			grid-area: news;
			font-size: medium;
		}
		#almanac {
			grid-area: calendar;
			border: 4px double black; 
    		padding: 10px; 
		}
		[id$='_content'] {
			font-size: medium;
		}
		p > img{
			display:none;
		}
		p.image > img{
			display:block;
		}
</style>
<style>
        #calendar2 {
            width: 100%;
            font: monospace;
            line-height: 1.2em;
            font-size: 15px;
            text-align: center;
        }
        
        #calendar2 thead tr:last-child {
            font-size: small;
            color: rgb(85, 85, 85);
        }
        
        #calendar2 thead tr:nth-child(1) td:nth-child(2) {
            color: rgb(50, 50, 50);
        }
        
        #calendar2 thead tr:nth-child(1) td:nth-child(1):hover,
        #calendar2 thead tr:nth-child(1) td:nth-child(3):hover {
            cursor: pointer;
        }
        
        #calendar2 tbody td {
            color: rgb(44, 86, 122);
        }
        
        #calendar2 tbody td:nth-child(n+6),
        #calendar2 .holiday {
            color: rgb(231, 140, 92);
        }
        
        #calendar2 tbody td.today {
            background: rgb(220, 0, 0);
            color: #fff;
        }
    </style>
<style>
.slperekhodnik{
max-width: 38em;
margin: 0 auto;
width: 100%;
}

.gablok_sedakoda{
width: 100%;
margin: 0 auto;
overflow: hidden;
}

.slayder_karusel{
position: relative;
width: 500%;
font-size: 0;
animation: 8s gablok_sedakoda-ani infinite;
}

.slayder_karusel figure{
width: 20%;
height: auto;
display: inline-block;
position: inherit;
}

.slayder_karusel img{
max-width: 100%;
vertical-align: bottom;
}

.slayder_karusel img:hover{
filter: grayscale(90%);
}

.slayder_karusel figure figcaption{
position: absolute;
font-family: 'Roboto';
font-size: 1.4rem;
font-weight: 100;
text-transform: uppercase;
bottom: 0;
background: rgba(0,0,0,0.6);
color: #fff;
width: 100%;
padding: .5em;
}

@keyframes gablok_sedakoda-ani{
0%{
left: 0%;
}

20%{
left: 0%;
}

25%{
left: -100%;
}

45%{
left: -100%;
}

50%{
left: -200%;
}

70%{
left: -200%;
}

75%{
left: -300%;
}

95%{
left: -300%;
}

100%{
left: -400%;
}

}
</style>

<div id="infor">
	<div class="grid_container">
		<div id='gap'></div>
		<div id='gap1'></div>
		<div id='gap2'></div>
		<div id='gap3'></div>
		<div id='playbill'>
			<div class="slperekhodnik">
				<aside class="gablok_sedakoda">
					<div class="slayder_karusel">
	<figure><img src="http://liart.ru/media/files/img/2020/12052020/1205.jpg" alt=""><figcaption>1.</figcaption></figure>
	<figure><img src="http://liart.ru/media/files/img/2020/21062020/LOVE_WAR.jpg" alt=""><figcaption>2.</figcaption></figure>
	<figure><img src="http://liart.ru/media/files/img/2020/10062020/vhutemas.jpg" alt=""><figcaption>3.</figcaption></figure>
	<figure><img src="http://liart.ru/media/files/img/2020/16042020/gallery_slide.jpg" alt=""><figcaption>4.</figcaption></figure>
	<figure><img src="http://liart.ru/media/files/img/2020/22122020/2212.jpg" alt=""><figcaption>5.</figcaption></figure>
					</div>
				</aside>
			</div>
		<!--	
		<img src="http://liart.ru/media/files/img/2020/13042020/v_online.gif" alt="" title="" style="display: none;">
		<a href="http://liart.ru/ru/pages/RGBI_events_online/" class="nivo-imageLink" style="display: block;">
		<img src="http://liart.ru/media/files/img/2020/13042020/v_online.gif" alt="" title="" style="display: none;"></a>
		-->
		</div>
		<div id="books_container">
			<div onmousedown="searchNews(null,300);" class="header"><center>Из новых поступлений</center> </div>
			</div>
		<div  id="events_container">
			<div class="header"><center>Сегодня в РГБИ</center></div>
			<div class = "spacer h15x"></div>
		</div>
		<div id="news_container">
			<div class="header"><center>Новости</center></div>
			<div class = "spacer h15x"></div>
		</div>
		<div id='almanac'><span style="text-decoration:underline;">Календарь событий на месяц</span>
		<table id="calendar2">
            <thead>
                <tr>
                <td>
                    <td colspan="5">
                       <td>
                            <tr>
                            <td>Пн
                            <td>Вт
                            <td>Ср
                            <td>Чт
                            <td>Пт
                            <td>Сб
                            <td>Вс
            <tbody>
        </table>
		</div>
	</div>
</div>

<script type="text/javascript"> // скрипт календаря
        function Calendar2(id, year, month) {
            var Dlast = new Date(year, month + 1, 0).getDate(),
                D = new Date(year, month, Dlast),
                DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
                DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
                calendar = '<tr>',
                month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
            if (DNfirst != 0) {
                for (var i = 1; i < DNfirst; i++) calendar += '<td>';
            } else {
                for (var i = 0; i < 6; i++) calendar += '<td>';
            }
            for (var i = 1; i <= Dlast; i++) {
                if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
                    calendar += '<td class="today">' + i;
                } else {
                    calendar += '<td>' + i;
                }
                if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
                    calendar += '<tr>';
                }
            }
            for (var i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
            document.querySelector('#' + id + ' tbody').innerHTML = calendar;
            document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML = month[D.getMonth()] + ' ' + D.getFullYear();
            document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth();
            document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();
            if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) { // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
                document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
            }
        }
        Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
        // переключатель минус месяц
        document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
                Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) - 1);
            }
            // переключатель плюс месяц
        document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
            Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) + 1);
        }
    </script>

<script type="text/javascript"> //скрипт новостей событий и книг
const log = console.log;
const createEl = (id, text, tag, _class) => {
  const el = document.createElement(tag)
  el.id = id
  el.className = _class
  el.textContent = text
  return el
}
let element = {}; 
element.get_link = function(text){
		var htmlObject = document.createElement('div');
		htmlObject.innerHTML = text;
		//проверка есть ли ссылка в публикации о новинке
		if (htmlObject.innerHTML.indexOf("</a>") != -1) {
			var link = htmlObject.getElementsByTagName('a');
			return link[0].href;
		}else{
			return '#';
		}
	}

let j = 2; //книги
let k = 3; //новости
let i = 3; //события

let htmlSpan = `<span class = "curs" onclick="alert('CLICK!');">Еще...</span>`;

// books \/
let books = <?php echo json_encode($books); ?>;

let books_container = document.getElementById('books_container');
let htmlBooksObject = document.createElement('div');
htmlBooksObject.className = "widget";
htmlBooksObject.id = "books_content";
books_container.append(htmlBooksObject);

let books_content = document.getElementById('books_content');

let img_books = document.createElement('img');
img_books.src = "http://liart.ru/media/uploads/newinlib/itemavatars/big/" + books[j]['avatar_img_name'];
img_books.style = "padding:10px;";
img_books.className = "image";
books_content.append(img_books);

let p_books = document.createElement('p');
p_books.innerHTML = books[j]['content'];
p_books.style = "line-height:1.5em;padding: 10px;";
p_books.className = "image";
books_content.append(p_books);
/*
let a_books = document.createElement('a');
a_books.href = element.get_link(books[j]['content']);
a_books.className = "button15";
a_books.id = "more_books"; 
a_books.target = "_blank";
a_books.innerHTML = "Ccылка на книгу";
books_content.append(a_books);
*/
let else_books = document.createElement('div');
else_books.className = "else1";
else_books.innerHTML = htmlSpan;
books_content.append(else_books);
/*
var title = document.createElement('p');
title.innerHTML = data[i]['title'];
title.style = "line-height:1.5em;";
*/
//events \/
let events = <?php echo json_encode($events); ?>;
//let eventsTape = {};
let events_container = document.getElementById('events_container');
//eventsTape.start = 1;
//eventsTape.end = 4;

//for(var i=eventsTape.start;i<eventsTape.end;i++){
let htmlEventsObject = document.createElement('div');
htmlEventsObject.className = "widget";
eventsTime = `<p style="text-align:left;">Начало: ${events[i]['start_date']}</p><p style="text-align:left";>Окончание: ${events[i]['end_date']}</p>`;
eventsTitle = `<center>${events[i]['title']}</center><br>`;
htmlEventsObject.innerHTML = eventsTitle + eventsTime;
htmlEventsObject.id = "events_content";
events_container.appendChild(htmlEventsObject);

let events_content = document.getElementById('events_content');

let p_events = document.createElement('p');
//p_events.className = "else1";
p_events.innerHTML = `${events[i]['content']}<hr>`;
events_content.append(p_events);

let else_events = document.createElement('div');
else_events.className = "else1";
else_events.innerHTML = htmlSpan;
events_content.append(else_events);
//}

//news \/
let news = <?php echo json_encode($news); ?>;
let news_container = document.getElementById('news_container');
let htmlNewsObject = document.createElement('div');
htmlNewsObject.innerHTML = `<p><cenetr>${news[k]['title']}</center></p>`;
/*
let newsImg =[];
newsImg = news[j]['content'].match(/price\[(\d+)\]\[(\d+)\]/ig);
<p><img  (?<=<p><img)(.+?)(?=(>\<\?p>))
*/
htmlNewsObject.className = "widget";
htmlNewsObject.id = "news_content";
news_container.appendChild(htmlNewsObject);

let news_content = document.getElementById('news_content');

let img_news = document.createElement('img');
img_news.src = "http://192.168.1.18/media/uploads/newsavatars/" + news[k]['avatar_img_name'];
img_news.style = "padding:10px;height: 200px; width: 240px;";
news_content.append(img_news);
	 
let text_news = document.createElement('div');
text_news.className = "text_news";
text_news.innerHTML = news[k]['content'];
news_content.append(text_news);

let else_news = document.createElement('div');
else_news.className = "else1";
else_news.innerHTML = htmlSpan;
news_content.append(else_news);

/*
http://192.168.1.18/media/uploads/newsavatars/2021/11/1dccb85c23264bdcaafa6d00dea62bd2.jpg 
http://192.168.1.18/media/files/img/2021/09112021/1.jpg     (?<=src=\\")(.+?)(?=\\"\salt)    
*/		
//-------------------------------------
/*
var data = books;
var slider = {};

	slider.get_link = function(text){
		var htmlObject = document.createElement('div');
		htmlObject.innerHTML = text;
		//проверка есть ли ссылка в публикации о новинке
		if (htmlObject.innerHTML.indexOf("</a>") != -1) {
			var link = htmlObject.getElementsByTagName('a');
			return link[0].href;
		}else{
			return '#';
		}
	}
	let k = 2;
	var prnt = document.getElementById('sldr');

	slider.cycle = function(){
		//for(var i=slider.start;i<slider.end;i++){ //#1
		
		var sldr_item = document.createElement('div');
		sldr_item.className = "sldr-item";
		sldr_item.style = "width:300px;";
		
		var img = document.createElement('img');
		img.src = "http://liart.ru/media/uploads/newinlib/itemavatars/big/" + data[k]['avatar_img_name'];
		img.style = "padding:10px;";
	
		var link = document.createElement('a');
		
		link.href = slider.get_link(data[i]['content']);
		
		//console.log(link.href);
		link.target = "_blank";
		link.innerHTML = "Ccылка на книгу";
		
		var image_link = document.createElement('a');
		image_link.href = link.href;
		
		//если ссылки в публикации о новинке нет, то атрибут ссылки удаляется
		if(link.href.slice(-1) == '#'){
			image_link.removeAttribute('href');
		//} //#1
		
		image_link.target = "_blank";
		
		
		var title = document.createElement('p');
		title.innerHTML = data[i]['title'];
		title.style = "line-height:1.5em;";
		
		
		prnt.appendChild(sldr_item); //элемент слайдера
		sldr_item.appendChild(image_link); //ссылка, в которой находится картинка
		image_link.appendChild(img); //картинка
		sldr_item.appendChild(link); // отдельная ссылка на публикацию
		sldr_item.appendChild(title); // заголовок
	}

	}

	slider.cycle();
*/
</script>

<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>
