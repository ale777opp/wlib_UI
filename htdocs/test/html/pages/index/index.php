<?php 
///htdocs/wlib/html/pages/index
include (THEPAGESPATH.'/includes/searchdiv.php');
require_once "get_page_info.php";

$con = new Db();
//var_dump($con);
$con->books();
$books=$con->data;

$con->events();
$events=$con->data;

$con->news();
$news=$con->data;

?>
	<style type="text/css">
		* {
  			margin: 0;
  			padding: 0;
  			box-sizing: border-box;
		}
		.grid_container {
			/*background-color: gray;*/
			height: 86vh;
			width: 80%;
			margin: 10px auto;
			text-align: center;

			display: grid;
			grid-gap: 0.5vw;
			grid-template-areas:
        "gap  	  playbill 	gap3"
        "events	  playbill 	books"
        "events   playbill 	books"
        "events   news 		books"
        "events   news 		books"
        "calendar news 		books"
        "calendar news 		gap1"
        "calendar gap2 		gap1";
        	grid-template-columns: 5fr 8fr 6fr;
  			grid-template-rows: repeat(8, 90px);
		}
		#gap {
			grid-area: gap;
			background-color: yellow;
			opacity: 0.5;
		}
		#gap1 {
			grid-area: gap1;
			background-color: yellow;
			opacity: 0.5;
		}
		#gap2 {
			grid-area: gap2;
			background-color: yellow;
			opacity: 0.5;
		}
		#gap3 {
			grid-area: gap3;
			background-color: yellow;
			opacity: 0.5;
		}	
		#playbill {
  			grid-area: playbill;
  			background-color: lightgreen;
			  opacity: 0.5;  
		}
		#books {
  			grid-area: books;
  			background-color: violet;
			  opacity: 0.5;
		}
		#events_container {
			grid-area: events;
		}
		#news_container {
			grid-area: news;
		}
		#almanac {
			grid-area: calendar;
			border: 4px double black; 
    		padding: 10px; 
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

<div id="infor">
	<div class="grid_container">
		<div id='gap'>gap</div>
		<div id='gap1'>gap1</div>
		<div id='gap2'>gap2</div>
		<div id='gap3'>gap3</div>
		<div id='playbill'>playbill</div>
		<div id='books'>books</div>
		<div class="header" id="events_container">
			<center>Сегодня в РГБИ</center> 
			<hr>
		</div>
		<div class="header" id="news_container">
			<center>Новости</center> 
			<hr>
			<img src="http://192.168.1.18/media/uploads/newsavatars/2021/11/1dccb85c23264bdcaafa6d00dea62bd2.jpg" alt="аватар img">
			<!-- http://192.168.1.18/media/uploads/newsavatars/2021/11/1dccb85c23264bdcaafa6d00dea62bd2.jpg -->
			<!-- http://192.168.1.18/media/files/img/2021/09112021/1.jpg -->	
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
/*
 const createEl = (id, text, tag, _class) => {
  const el = document.createElement(tag)
  el.id = id
  el.className = _class
  el.textContent = text
  return el
}
*/
//let books = <?php echo json_encode($books); ?>;
let events = <?php echo json_encode($events); ?>;
let news = <?php echo json_encode($news); ?>;

let news_container = document.getElementById('news_container');
let events_container = document.getElementById('events_container');

let htmlNewsObject = document.createElement('div');
//let htmlBooksObject = document.createElement('div');
let htmlEventsObject = document.createElement('div');

let j =3;

htmlNewsObject.innerHTML = news[j]['content'];
//htmlBooksObject.innerHTML = books[j]['content'];
htmlEventsObject.innerHTML = events[j]['content'];

htmlNewsObject.className = "widget";
//htmlBooksObject.className = "widget";
htmlEventsObject.className = "widget";

htmlNewsObject.id = "news_content";
//htmlBooksObject.id = "books";
htmlEventsObject.id = "events_content";

news_container.appendChild(htmlNewsObject);
//content.appendChild(htmlBooksObject);
events_container.append(htmlEventsObject);

let news_content = document.getElementById('news_content');
let events_content = document.getElementById('events_content');

//createEl = (id, text = "<span>Еще...</span>", tag = 'div', _class = 'else1'); 

let htmlContinueObject1 = document.createElement('div');
htmlContinueObject1.className = "else1";
htmlContinueObject1.innerHTML = "<span>Еще...</span>";

let htmlContinueObject2 = document.createElement('div');
htmlContinueObject2.className = "else1";
htmlContinueObject2.innerHTML = "<span>Еще...</span>";

news_content.append(htmlContinueObject1);
events_content.append(htmlContinueObject2);

//-------------------------------------

	var data = <?php echo json_encode($books); ?>;

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
	
	//счетчики для слайдера
	slider.start = 0;
	slider.end = 2;

	var prnt = document.getElementById('sldr');

	slider.cycle = function(){
		
		for(var i=slider.start;i<slider.end;i++){

		var sldr_item = document.createElement('div');
		sldr_item.className = "sldr-item";
		sldr_item.style = "width:300px;";
		
		var img = document.createElement('img');
		img.src = "http://liart.ru/media/uploads/newinlib/itemavatars/big/" + data[i]['avatar_img_name'];
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
		}
		
		image_link.target = "_blank";
		
		
		var title = document.createElement('p');
		title.innerHTML = data[i]['title'];
		title.style = "line-height:1.5em;";
		
		
		prnt.appendChild(sldr_item); //элемент слайдера
		sldr_item.appendChild(image_link); //ссылка, в которой находится картинка
		image_link.appendChild(img); //картинка
		//sldr_item.appendChild(link); // отдельная ссылка на публикацию
		sldr_item.appendChild(title); // заголовок
	}

	}

	slider.cycle();

	// пролистывание слайдера
	slider.add_books = function(){
		
		prnt.innerHTML = '';
		
		if(slider.end == data.length){
			slider.start=0;
			slider.end=3;
		}else{
			slider.start+=3;
			slider.end+=3;
		}
		
		slider.cycle();
	} 
	
	
	//счетчики для листа
	slider.startlist = 3;
	slider.endlist = 9;
	
	//контейнер для листа
	var lstbks = document.getElementById('lstbks');
	
	//цикл для добавления книг в лист
	slider.cyclelist = function(){
		
		for(var j=slider.startlist;j<slider.endlist;j++){
			
			var lst_item = document.createElement('div');
			lst_item.className = "list-item";
			lst_item.style = "width:300px;";
			
			var img = document.createElement('img');
			img.src = "http://liart.ru/media/uploads/newinlib/itemavatars/big/" + data[j]['avatar_img_name'];
			img.style = "padding:10px;";
			
			var link = document.createElement('a');
		
			link.href = slider.get_link(data[j]['content']);
			
			//console.log(link.href);
			//link.target = "_blank";
			//link.innerHTML = "Ccылка на книгу";
			
			
			var image_link = document.createElement('a');
			image_link.href = link.href;
			
			//если ссылки в публикации о новинке нет, то атрибут ссылки удаляется
			if(link.href.slice(-1) == '#'){
				image_link.removeAttribute('href');
			}
			
			image_link.target = "_blank";
			
			
			var title = document.createElement('p');
			var title_text = data[j]['title'];
			
			if(title_text.length>135){
				title_text = title_text.substring(0,136) + " ...";
			}
			
			
			//title.innerHTML = data[j]['title'];
			
			title.innerHTML = title_text;
			
			title.style = "line-height:1.5em;";
			
			
			lstbks.appendChild(lst_item); //элемент слайдера
			lst_item.appendChild(image_link); //ссылка, в которой находится картинка
			image_link.appendChild(img); //картинка
			//sldr_item.appendChild(link); // отдельная ссылка на публикацию
			lst_item.appendChild(title); // заголовок
			

		}

	}
	
	
	//добавление книг в лист
	slider.add_books_list = function(){
		
		if(slider.endlist > 173){
			document.getElementById('btn_add').style="display:none";
		}
		
		slider.startlist+=6;
		slider.endlist+=6;
		slider.cyclelist();
				
	} 
	
	
	document.getElementById('add_books').addEventListener('click',slider.add_books_list); 
	document.getElementById('more_books').addEventListener('click',slider.add_books);

</script>
<script type="text/javascript">
	//блок бездействия
	var t;
	document.onload = resetTimer;
	document.onmousemove = resetTimer;
	document.onmousedown = resetTimer; 
	document.ontouchstart = resetTimer;
	document.onclick = resetTimer;     
	document.onscroll = resetTimer;    
	document.onkeypress = resetTimer;


	function clicker() {
		document.getElementById('more_books').click();
	}

	function resetTimer() {
		clearTimeout(t);
		t = setTimeout(clicker, 15000)
		  // 1000 milisec = 1 sec
	}

</script>
<?php

if($_POST){
	if($_POST['from'] == 'liart.ru'){
	
		echo "<script type='text/javascript' defer>
		document.getElementsByClassName('header')[0].innerHTML = 'Поиск...';
		
		//добавление запроса в строку поиска
		document.getElementById('itemsimple').value = '".$_POST['opac']."'; 
		
		//очистка от слайдера и новых поступлений
		document.getElementById('sldr').innerHTML= '<img src=http://liart.ru/media/files/img/2019/26032019/35.gif>';
		var btn_sldr = document.getElementById('more_books');
		btn_sldr.parentNode.removeChild(btn_sldr);
		
		//установка типа поиска
		var type = document.getElementsByClassName('select')[0].lastChild;
		type.className = 'iFT';
		type.innerHTML = 'Все поля';
		
		//клик по кнопке	
		var button = document.getElementById('simple_search').firstChild;
		var event = new Event('mousedown');
		button.dispatchEvent(event);		
		
		
		</script>";
	}
}

?>


<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>
