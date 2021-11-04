<?php 
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput= <<<HTML
<div class="spacer"></div>
<div id="infor">
	<div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">События</span></div>
	<div class="col_content">
		<div class="table w100 mt20x h100">
			<div class="row h100">
				<div class="td w21 vtop pr20x pb20x">
					<ul class="left_menu">
						<li><span onmousedown="searchNewsSite(20,'all');">Новости</span></li>
						<li><span onmousedown="searchNewRecs(5,'all');">Новые поступления</span></li>
						<li><span onmousedown="searchPubThemeList('21','LTML');">Публикации</span></li>
						<li><span class="aktive" onmousedown="searchPhotoThemeList('22','LTML');">Фотогалерея</span></li>
					</ul>
				</div>
				<div class="td vtop content pr20x pb20x pl20x brl1c h100">
					<h1>Фотогалерея</h1>
					<div class="newscontrols">
						<!--<span onmousedown="searchPublications(21,'all')">Все публикации</span>
						<span onmousedown="searchPublications(21,'archiv')">Архив публикаций</span>-->
					</div>
					<div id="newscontainer">


HTML;


if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	if(isset($response0->_iddb))
		$iddb=$response0->_iddb;
	$sign="";
	$label="";
	$length=15;
	if(isset($result->response_0->_sign))
		$sign=$result->response_0->_sign;
	if(isset($result->response_0->_length))
		$length=$result->response_0->_length;
	if(isset($response0->_label))
		$label=$response0->_label;
	if(isset($response0->indx_0))
	{
		$count=0;
		$globaloutput.='<ul class="pub">';
		$prev="";
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'indx_');
			if($res !== false)
			{
				$count++;
				$vocfunc='searchPhotoTheme(this,'.$iddb.')';
				$term=$value->item;
				$res3=strpos($value->item, '[SUB]');
				if($res3 !== false)
				{
					$vocfunc='searchPhotoThemeList('.$iddb.',\'LSTML\')';
					$term=substr($value->item,0,$res3);
					if($prev==$term)
						$term="";
					$prev=$term;
				}
				if($term!="")
				{
					$term = mb_strtolower($term, 'UTF-8');
					$term = my_mb_ucfirst($term);
					$globaloutput.='<li class="u" onmousedown="'.$vocfunc.'">'.htmlspecialchars($term).'</li>';
				}
			}
		}
		$globaloutput.='</ul>';
	}
	else
	{
		$globaloutput.= '<div class="pt50x f80 h400x">По вашему запросу ничего не найдено.</div>';
	}
}
else
{
	$globaloutput.= '<div class="pt50x f80 h400x">По вашему запросу ничего не найдено.</div>';
}
$globaloutput.= <<<HTML
					</div>
				</div>
				<div class="td vtop w20 content pt50x pl20x pr20x pb20x">
				<div class="b c6 f80 pl5x"></div>
				</div>
			</div>
		</div>
		<div class="w100 brt1c mt20x">
			<div class="w60 oh ml21 content">
				<h1 class="m20x">Библиотека благодарит</h1>
				<div id="bottom_slider_cont">


HTML;

include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/newssite/_events/events.html');
echo '</div></div></div></div></div><div class="spacer"></div>';
include (THEPAGESPATH.'/includes/footer.php');
?>