<?php
if ($jsd = opendir(THEFULLJSPATH))
{
	while (false !== ($jsfile = readdir($jsd)))
	{
		if (($jsfile != '.' && $jsfile != '..')&&(is_file(THEFULLJSPATH.'/'.$jsfile)))
		{
			echo '<script src="'.THEJSPATH.'/'.$jsfile.'"></script>'."
";
		}
	}
	closedir($jsd);
}

if((isset($_POST['_auth']))||($flag45))
{
	echo '<script src="'.THEJSPATH.'/_additional/orderel.js"></script>'."
";
}
if ($cssd = opendir(THEFULLCSSPATH))
{
	while (false !== ($cssfile = readdir($cssd)))
	{
		if (($cssfile != '.' && $cssfile != '..')&&(is_file(THEFULLCSSPATH.'/'.$cssfile)))
		{
			echo '<link href="'.THECSSPATH.'/'.$cssfile.'" type="text/css" rel="stylesheet"/>'."
";
		}
	}
	closedir($cssd);
}
?>
<!--[if lt IE 9]>
<link href="/test/test/css/_additional/add.css" type="text/css" rel="stylesheet">
<![endif]-->
</head><body <?php
if($bodyclass!="") echo 'class="'.$bodyclass.'"';
 ?> onload="initd()">
<form id="main" onsubmit="return false">
<!-- шапка -->

<!-- из файла ../tpl/headertop.html -->
<div class="header_top">
	<div id="menu_button" onclick="showHideM('top_info')">
	<span></span>
	<span></span>
	<span></span>
	</div>
	<div id="index__" class="s" onclick="goToLocation('index')">РГБИ</div>
		<div class="lk">
			<div>
				<ul class="top_menu">
<!-- конец из файла ../tpl/headertop.html -->
	<?php
		$nspos=strpos($nsean, '*ютф*');
		$pagescont='';
		$logout='';
		if(($nspos === false)&&((isset($_POST['_auth']))||($flag45)))
		{
			if(defined('FLAG45'))
			{
				$stoplogout=constant('FLAG45');
				if((isset($_POST['_login'])) && ($_POST['_login'] == $stoplogout))
				{
					$GLOBALS['flag45']=1;
					$logout='';
				}
				elseif($flag45)
				{
					$logout='';
				}
				else
				{
					$logout='<li><span class="exits" onmousedown="closeSession()">Выход</span></li>';
				}
			}
			$pagescont.='<li><span id="privat" onmousedown="ordersSearch()">Кабинет</span></li>';
		}
		else
		{
			if(isset($smjson->pages->privat))
				$pagescont.='<li><span id="privat" onmousedown="goToLocation(this.id)">Вход</span></li>';
			if(isset($smjson->pages->regform))
				$pagescont.='<li class="reg"><span id="regform" onmousedown="goToLocation(this.id)">Регистрация</span></li>';
		}
		echo $pagescont.''.$logout;
	?>
<!-- из файла ../tpl/headermiddle.html -->
					<li>
						<span id="help" onclick="goToLocation('help')">Помощь</span>
					</li>
				</ul>
			</div>
		</div>
		<div id="header">
			<div class="top_logo"></div> 
			<div id="index">
				<div class="inner" onmousedown="goToLocation('index')">
					<div class="p"><p>Федеральное государственное бюджетное учреждение культуры</p></div>
					<div class="n"><p>Российская государственная библиотека искусств</p></div>
					<div class="z"><p>Поиск и заказ доступа к ресурсам библиотеки</p></div>
				</div>
			</div>	
		</div>
	</div>
<!-- конец из файла ../tpl/headermiddle.html -->

<!-- из файла ../tpl/headermiddle1.html -->
</ul></div></div></div>
<!-- конец из файла ../tpl/headermiddle1.html -->
<!-- конец шапка -->
<!-- далее не редактировать -->

<!-- из файла ../tpl/basestop.html -->
	<div class="spacer"></div>
	<div class="searchdiv" id="searchdiv">
		<div class="bases_div" id="bases_div">
			<div class="cross" id="menu_button_base" onmousedown="showHideM('bases_div_inner', 'menu_button_base')"><span></span><span></span><span></span></div>
			<div class="s_base" onmousedown="showHideM('bases_div_inner')">Выбрать БД</div>
			<div id="bases_div_inner" class="block">


<!-- конец из файла ../tpl/basestop.html -->
		<?php 
		if(isset($qjson))
		{
			$qtype=gettype($qjson);
			if($qtype=='object')
			{
				$biblcounter=0;
				$basescounter=0;
				$basescont='';
				$basesdiv='';
				$numdbbibl='';
				$display=$fjson->display;
				$dbnumber='';
				$dbtitle='';
				$dbalways='';
				$show='';
				$allbases='';
				foreach ($fjson as $fkey => $fvalue)
				{
					if($fkey=='dbs_all')
					{
						$allbases.='<span class="simple"><input type="radio" name="base" value="all" id="iall"/><label for="iall" onmousedown="chooseBase(this)">'.$fjson->$fkey->alias.'</label></span>';
					}
					foreach ($qjson as $qkey => $qvalue)
					{
						if($fkey==$qkey)
						{
							if(!isset($qjson->$qkey->masked))
							{
								$qclass='simple';
								if($fjson->$fkey->type=='AF')
								{
									if($fjson->$fkey->dbindex=='fundholders')
										$qclass='fundholders';
									else
										$qclass='authority';
								}
								else
								{
									$numdbbibl='var biblnumber="'.$fjson->$fkey->number.'"; ';
									$qclass='simple';
									$biblcounter++;
								}
								$basescounter++;
								if(isset($fjson->$fkey->display))
									$show=' style="display:none"';
								else
									$show='';
								if($basescounter==1)
								{
									$dbnumber=$fjson->$fkey->number;
									$dbtitle=$fjson->$fkey->alias;
									if(isset($fjson->$fkey->always))
										$dbalways=$fjson->$fkey->always;
								}
								if((($display=='select')&&($qclass != 'fundholders'))||(($display=='select')&&($qclass == 'fundholders')&&($fjson->$fkey->switch_in_base == 'in_base')))
								{
									if($basescounter==1)
									{
										if($allbases!='')
										{
											$dbnumber='all';
											$ftitl='dbs_all';
											$dbtitle=$fjson->$ftitl->alias;
										}
										$basescont.='<div class="basescontainer"><div class="opt2"><div class="select2"><img onmousedown="showOptions(this,\'bases_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="" title="" class="labs" hspace="0" border="0" vspace="0"/><span class="i'.$dbnumber.'" id="currdb" onmousedown="showOptions(this.previousSibling,\'bases_div\')">'.$dbtitle.'</span></div></div></div>';
										if($allbases!='')
											$allbases='';
										$basesdiv.='<div id="'.$fjson->$fkey->dbindex.'" onclick="PutLabValue(this)" class="i'.$dbnumber.'">'.$dbtitle.'</div>';
									}
									else
									{
										$basesdiv.='<div id="'.$fjson->$fkey->dbindex.'" onclick="PutLabValue(this)" class="i'.$fjson->$fkey->number.'">'.$fjson->$fkey->alias.'</div>';
									}
								}
								if($display=='radio')
								{
									if(($qclass != 'fundholders') || (($qclass == 'fundholders') && ($fjson->$fkey->switch_in_base == 'in_base')))
									{
										$basescont.='<span class="'.$qclass.'"'.$show.'><input type="radio" name="base" value="'.$fjson->$fkey->number.'" id="i'.$fjson->$fkey->dbindex.'"/><label for="i'.$fjson->$fkey->dbindex.'" onmousedown="chooseBase(this)">'.$fjson->$fkey->alias.'</label></span>';
									}
								}
							}
						}
					}
				}
				if($basescounter==1)
				{
					if($dbalways=='')
					{
						if($display!='none')
							$basescont='<div class="single_base">'.$dbtitle.'</div>';

						else
							$basescont='<input name="base" id="currdb" value="'.$dbnumber.'" type="hidden"/>';
						$basesdiv='';
					}
				}
				else
				{
					if($display=='select')
					{
						$basesdiv='<div style="display: none;" class="options2" id="bases_container">'.$basesdiv.'</div>';
					}
				}
				if($biblcounter > 1)
				{
					$numdbbibl='';
				}
				echo $allbases.''.$basescont.'<script> var biblcounter='.$biblcounter.'; '.$numdbbibl.'</script>'.$basesdiv;
			}
		}
		?>
<!-- из файла ../tpl/basesbottom.html -->
					</div>
	</div>


<!-- конец из файла ../tpl/basesbottom.html -->
	<div class="searchdiv_outer">
		<div class="searchdiv_inner">
			<div class="top"><span id="simple" onmousedown="switchSearch(this)" class="sel_">Простой поиск</span><span id="expand" onmousedown="switchSearch(this)" class="sel">Расширенный поиск</span><span class="history_link" onclick="showHistory()">История поисков</span></div>
			<div class="middle" id="middle">
			<div id="simple_search"><input type="button" class="simplebutton" onmousedown="simpleSearch()" value="Искать"/><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,'labs_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,'labs_div')"></span></div></div><div class="inp"><input id="itemsimple" type="text" class="iLAB" value="" maxlength="1000" /></div></div></div><div class="spacer"></div><div id="expand_search" style="display: none"><b class="voc" onmousedown="showVoc(this)"></b><div class="logcontainer"><div class="select1"><img onclick="showOptions(this,'logic_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="log"/><span onmousedown="showOptions(this.previousSibling,'logic_div')" class="iAND">И</span></div></div><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,'labs_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,'labs_div')"></span></div></div><div class="inp"><input id="item0" type="text" class="iLAB" value="" maxlength="1000" /></div></div><div class="spacer" style="height: 7px"></div><b class="voc" onmousedown="showVoc(this)"></b><div class="logcontainer"><div class="select1"><img onclick="showOptions(this,'logic_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="log"/><span onmousedown="showOptions(this.previousSibling,'logic_div')" class="iAND">И</span></div></div><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,'labs_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,'labs_div')"></span></div></div><div class="inp"><input id="item1" type="text" class="iLAB" value="" maxlength="1000" /></div></div><div class="spacer" style="height: 7px"></div><b class="voc" onmousedown="showVoc(this)"></b><div class="labcontainer"><div class="opt"><div class="select"><img onmousedown="showOptions(this,'labs_div')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span onmousedown="showOptions(this.previousSibling,'labs_div')"></span></div></div><div class="inp"><input id="item2" type="text" class="iLAB" value="" maxlength="1000" /></div></div><div class="spacer" style="height: 7px"></div><div class="spacer"></div></div><div class="spacer"></div><div id="sbuttons" style="display:none"><input type="button" class="expandbutton" onmousedown="simpleSearch()" value="Искать"/><input type="button" class="button2" onmousedown="clearSearch(this)" value="Очистить"/></div>
			<div id="limits_search" class="limits" onclick="showLimits(this)" style="display:none">Ограничения</div><div class="baselimits" id="limits_425" style="display: none"><div class="limits_left"><span class="title">Год</span><span class="from">&#160;c&#160;</span><span class="input"><input id="period_425_0_1" name="period_425_0_1" size="4" maxlength="4" type="text" value="" class="PY"/></span><span class="to">&#160;по&#160;</span><span class="input"><input id="period_425_0_2" name="period_425_0_2" size="4" maxlength="4" type="text" value="" class="PY"/></span></div><div class="limits_left"><span class="title">Аудитория</span><div id="l_425_1" class="select"><img onclick="showOptions(this)" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="labs"/><span class="all" onmousedown="showOptions(this.previousSibling)">все</span></div></div></div><div class="spacer"></div>
			</div>
<!-- конец далее не редактировать -->
<!-- из файла ../tpl/headerbottom.html -->
							<div class="bottom"></div>
				
	<div class="container_12">
        <div class="grid_12">
            
<style type="text/css">
    ul#nav>li.active{
        background-color: #e0dcd0;
    }
    ul#nav * a.active{
        color: #6B001C !important;
    }
</style>
		<ul id="nav" class="dropdown dropdown-horizontal">
            <li class="dir "><a href="/ru/pages/index/">О БИБЛИОТЕКЕ</a>
            <ul>
				<li><a href="/ru/pages/index/adress">Адрес и время работы</a></li>
        
				<li><a href="/ru/pages/index/zapis">Запись читателей</a></li>
        
				<li><a href="/ru/pages/index/info">Общая информация</a></li>
        
				<li><a href="/ru/pages/index/history">Из истории РГБИ</a></li>
        
				<li><a href="/ru/pages/index/otdels">Структура библиотеки</a></li>
        
				<li><a href="/ru/pages/index/req">Реквизиты библиотеки</a></li>
        
				<li><a href="http://liart.ru/ru/pages/index/normdocs/">Нормативные документы</a></li>
        
				<li><a href="http://liart.ru/ru/pages/index/korrupt/">Противодействие коррупции</a></li>
        
				<li><a href="/ru/pages/3d/">3D панорамы библиотеки</a></li>
			</ul>
			</li>
        
            <li class="dir"><a href="/ru/pages/service/">Читателям</a></li>
        
            <li class="dir "><a href="/ru/pages/fonds/">Коллегам</a></li>
			       
            <li class="dir "><a href="/ru/pages/catalogs/">Спроси библиографа</a></li>
        </ul>

        </div>
    </div>			
				
<!-- конец из файла ../tpl/headerbottom.html -->
		</div>
	</div>
	<div class="spacer"></div>
</div>

