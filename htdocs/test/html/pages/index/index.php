<?php 
///htdocs/wlib/html/pages/index
include (THEPAGESPATH.'/includes/searchdiv.php');
require_once "db_auth.php";
require_once "get_books.php";
?>
<div id="infor">
	<div class="table index_page">
		
		<div class="row h100">
			<!--div class="td w33 p3 h100 vtop curs acenter" onmousedown="searchNews(null,300);"-->
			<div class="td w33 p3 h100 vtop acenter" style="background-color:green;"></div>
			<div class="td w33 p3 h100 vtop acenter" style="background-color:blue;"></div>
			<div class="td w33 p3 h100 vtop acenter">
				<div class="dib w100">
					<div onmousedown="searchNews(null,300);" class="header"><center>Новые поступления</center></div>
					<!--div class="spacer h100x"></div-->
					<div id="newbooks"><!-- не трогать -->
						<div id="sldr"></div>
					</div><!-- не трогать -->
					<a class="button15" id="more_books">Показать еще...</a>
					<div class="spacer h50x"></div>
					<div onmousedown="searchNews(null,300);" class="else1"><span>Список новых поступлений...</span></div>
					
				</div>
				
				<div id="lstbks"></div>
						
				<!--div id="btn_add" style="clear:both"><a class="button15" id="add_books">Добавить еще...</a></div-->
				<div id="btn_add" style="clear:both"><a class="button15" id="add_books"></a></div>
				
				
			</div>
			
			
			<!--div class="td h100 p3 vtop">
				<div class="header w100">Популярное</div>
				<div class="table w100">
					<div class="row h100">
						<div class="td w50 vtop curs acenter" onmousedown="goToLocation('bookrating');">
							<div class="dib">
								<div class="header1">Книги</div>
								<div id="bookrating"></div>
								<div class="else1"><span>Еще...</span></div>
							</div>
						</div>
						<div class="td vtop curs acenter" onmousedown="goToLocation('ebookrating');">
							<div class="dib">
								<div class="header1">Электронные книги</div>
								<div id="ebookrating"></div>
								<div class="else1"><span>Еще...</span></div>
							</div>
						</div>
					</div>
				</div>
			</div-->
		</div>
	</div>
</div>

<script type="text/javascript">

	var data = <?php echo $con->data; ?>;

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
	slider.end = 3;
	
	

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
