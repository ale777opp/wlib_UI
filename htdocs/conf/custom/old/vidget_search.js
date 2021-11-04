/*-------------------------    -- поисковый виджет --------  -------------------*/

function getWidgetSvfu()
{
	var val=take('sitename').n.value;
	var tmp=/^(https?\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)$/;
	if(tmp.test(val))
	{
		var lim=val.indexOf('//');
		if(lim==-1)
			lim=0;
		else
			lim+=2;
		var divcode=take('getsitename');
		var divimg1=take('takewidgets1');
		var divimg2=take('takewidgets2');
		divcode.n.innerHTML="";
		divimg1.n.innerHTML="";
		divimg2.n.innerHTML="";
		var csstext='<style type="text/css">.widget_svfu{display:inline-block;width:100%;min-width:320px;max-width:1024px;text-align:center;vertical-align:middle;background:#f0f3f6;border: 1px solid #fff;box-shadow: 0 0 0 1px #e0e3e6;border-radius:9px;font: normal 120%/100% Arial, sans-serif;color:#666;}.widget_svfu > span{display:inline-block;width:48%;min-width:320px;height:35px;vertical-align:middle;}.widget_svfu span span{line-height: 200%;margin: 20px 0 0 0;}.widget_svfu:before{ content: ""; display: inline-block; min-height: inherit; height: 100%; vertical-align: middle;}.widget_svfu_search_outer{background: #93bede;position: relative;border:none;box-shadow: inset 0px 2px 3px 0px rgba(0, 0, 0, .3), 0px 1px 0px 0px rgba(255, 255, 255, .8);border-radius:5px;margin: 20px 0 20px 0;}.widget_svfu_search_outer input{height:95%;border:none;background:transparent;display: inline-block;vertical-align: middle;}.widget_svfu_search_outer input[type="text"]{width:86%;font: italic normal 90%/100% Arial, sans-serif;padding: 0 0 0 2%;}.widget_svfu_search_outer input[type="submit"]{width:12%;color: #2373B5;font:normal 200%/120% Arial,sans-serif;background: url(//'+servername+'/'+foldername+'/'+foldername+'/img/search_svfu.gif)center center no-repeat;cursor:pointer;}</style>';
		var text1='<span><span>Электронная библиотека СВФУ</span></span><span class="widget_svfu_search_outer"><input placeholder="Искать по автору ..." type="text" id="RP" name="RP" value=""/><input type="submit" name="widget_svfu_search_button" value=" "/></span><input type="hidden" name="from" value="'+val+'"/>';
		var text2='<span><span>Электронная библиотека СВФУ</span></span><span class="widget_svfu_search_outer"><input placeholder="Искать по ключевым словам ..." type="text" id="AH" name="AH" value=""/><input type="submit" name="widget_svfu_search_button" value=""/></span><input type="hidden" name="from" value="'+val+'"/>';
		divcode.n.innerHTML='<p class="blue b">Поиск по автору:</p><textarea>'+csstext+'<form class="widget_svfu" method="POST" accept-charset="UTF-8" action="//'+servername+'/'+foldername+'/find.php" target="_blank">'+text1+'</form></textarea><br/><br/><p class="blue b">Поиск по ключевым словам:</p><textarea>'+csstext+'<form class="widget_svfu" method="POST" accept-charset="UTF-8" action="//'+servername+'/'+foldername+'/find.php" target="_blank">'+text2+'</form></textarea>';
		divimg1.n.innerHTML=text1;
		divimg2.n.innerHTML=text2;
		divimg1.show();
		divimg2.show();
	}
	else
		alert("Адрес сайта введен некорректно!");
}

/*--------------------------- конец поисковый виджет ---------------------------*/