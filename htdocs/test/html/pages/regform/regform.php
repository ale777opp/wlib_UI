<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
?>
<div class="spacer"></div>
<div id="infor">
	<div class="col_title">
		<span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Регистрация</span>
	</div>
	<div class="col_content">
		<div class="acenter p20x">
			<div class="border1 w50">
				<br/>
				<p><span class="red">* </span><span class="b">ФИО:</span></p>
				<p><input id="AO" type="text" value=""/></p>
				<p><span class="i">фамилия, имя, отчество</span></p>
				<p><span class="red">* </span><span class="b">Дата рождения: </span><span class="bdata"><input placeholder="ДД" id="d1" value="" maxlength="2" class="date" type="text"/><span> / </span><input placeholder="ММ" id="m1" value="" maxlength="2" class="date" type="text"/><span> / </span><input placeholder="ГГГГ" id="y1" value="" maxlength="4" class="date" type="text"/><span class="calc" id="1" title="Выбрать из календаря" onmousedown="CreateCal1(event)"></span></span></p>
				<br/>
				<p><span class="red">* </span><span class="b">Пол: </span></p>
				<p><select id="FA" class="w100 mb10x"><option value=""></option><option value="ЖЕН">ЖЕН</option><option value="МУЖ">МУЖ</option></select></p>
				<br/>
				<p><span class="red">* </span><span class="b">Образование: </span></p>
				<p><select id="EA" class="w100 mb10x"><option></option><option value="неполное среднее">неполное среднее</option><option value="среднее">среднее</option><option value="среднее специальное">среднее специальное</option><option value="неполное высшее">неполное высшее</option><option value="высшее">высшее</option></select></p>
				<br/>
				<p><span class="b pl10x">Сфера деятельности: </span></p>
				<p><select id="EB" class="w100 mb10x"><option></option><option value="Научные работники">Научные работники</option><option value="ИТР">ИТР</option><option value="Специалисты">Специалисты</option><option value="Преподаватели">Преподаватели</option><option value="Учащиеся">Учащиеся</option></select></p>
				<br/>
				<p><span class="red">* </span><span class="b">E-mail:</span></p>
				<p><input id="AY" type="text" value=""/></p>
				<p><span class="i">(будет использоваться в качестве логина)</span></p>
				<p><span class="red">* </span><span class="b">Пароль:</span></p>
				<p><input id="readercode" type="password" value=""/></p>
				<p><span class="i">последовательность символов, длиной не менее шести знаков</span></p>
				<p><span class="red">* </span><span class="b">Подтверждение пароля:</span></p>
				<p><input id="readercode2" type="password" value=""/></p>
				<br/>
				<p><span class="red">* </span><input id="agree" name="agree" type="checkbox" value="ok" checked/><label class="b ml10x" for="agree">Я соглашаюсь с </label><a target="_blank" href="http://official.liart.ru/docs/phptZHAZh.pdf">Правилами пользования библиотекой</a></p>
				<br/>
				<br/>
				<p><span class="red">* </span><input id="agreep" name="agreep" type="checkbox" value="ok" checked/><label class="b ml10x" for="agreep">Я соглашаюсь с </label><a target="_blank" href="http://liart.ru/media/files/doc/16072018/personalInfo.pdf">Правилами обработки персональных данных</a></p>
				<br/>
				<div><input type="button" class="button l-gr pr5x pl5x" onmousedown="doLibRegistration(this)" value="Зарегистрироваться"/></div>
				<br/>
				<input type="hidden" id="FL" value="Абонемент"/>
				<input type="hidden" id="AB" value="089"/>
				<input type="hidden" id="EN" value="Internet"/>
				<div><span class="red">* </span><span>Обязательно к заполнению</span></div>
				<br/>
				<input type="hidden" id="reganswere" value=". Вы успешно зарегистрировались в системе. Для того, чтобы войти, перейдите на страницу Авторизации."/>
			</div>
		</div>
	</div>
</div>
<div class="spacer"></div>
<script src="http://api.liart.ru/js/opac_reg_form.js"></script>
<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>

