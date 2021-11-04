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
						<li><span class="aktive" onmousedown="searchNewsSite(20,'all');">Новости</span></li>
						<li><span onmousedown="searchNewRecs(5,'all');">Новые поступления</span></li>
						<li><span onmousedown="searchPubThemeList('21','LTML');">Публикации</span></li>
						<li><span onmousedown="searchPhotoThemeList('22','LTML');">Фотогалерея</span></li>
					</ul>
				</div>
				<div class="td vtop content pr20x pb20x pl20x brl1c h100">
					<h1>Новости</h1>
					<div class="newscontrols">
						<span onmousedown="searchNewsSite(20,'all')">Все новости</span>
						<span onmousedown="searchNewsSite(20,'archiv')">Архив новостей</span>
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
	$start=intval($result->_start);
	$size=intval($response0->size);
	$length=10;
	$outform="SHORTNEWS";
	if(isset($result->response_0->_length))
		$length=$result->response_0->_length;
	if(isset($result->response_0->_outform))
		$outform=$result->response_0->_outform;
	if(intval($size)==0)
	{
		$globaloutput.= '<div class="pt50x f80 h400x">По вашему запросу ничего не найдено.</div>';
	}
	else
	{
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			$globaloutput.= '<p class="pages">';
			$globaloutput.= resPaginator($start,$length,$size,NULL,'5');
			$globaloutput.= '</p>';
		}
		$count=0;
		$textoutput="";
		$output='';				
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_');
			if($res !== false)
			{
				$count++;
				$theid=htmlspecialchars($value->id);
				$theid=addslashes($theid);
				if(isset($value->SHORTNEWS_0))
				{
					$arr=$value->SHORTNEWS_0;
					$len = count ($arr);
					$llen=$len-1;
					$lllen=$len-2;
					for($i=0; $i<$len; $i++)
					{
						if($arr[$i]!="")
						{
							if($i==0)
							{
								$output.='<div class="nessite"><div class="fstn"><span title="Подробнее" onmousedown="addSeeNewsSite(\''.$theid.'\','.$iddb.')">'.$arr[$i].'</span></div><div class="searchrez">';
							}
							else
							{
								$output.='<div>'.$arr[$i];
								if($i==$lllen)
								{
									$output.='<span onmousedown="addSeeNewsSite(\''.$theid.'\','.$iddb.')" class="nels" title="Подробнее">Еще</span>';
								}
								$output.='</div>';
								if($i==$llen)
									$output.='</div>';
							}
						}
					}
					$output.='</div>';
				}
			}
		}
		if((isset($result->response_0->_renew))&&($start == 0))
		{
			if($output!="")
			{
				$htpath=THEPAGESPATH.'/newssite/_newssite/newssite.html';
				writeFile($htpath,$output);
			}
		}
		$globaloutput.=$output;
		
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			$globaloutput.= '<p class="pages">';
			$globaloutput.= resPaginator($start,$length,$size,NULL,'5');
			$globaloutput.= '</p>';
		}
	}
}
else
{
	$globaloutput.= '<div class="pt50x f80 h400x">По вашему запросу ничего не найдено.</div>';
}
$globaloutput.= <<<HTML
					</div>
				</div>
				<div class="td vtop w20 content pl20x pr20x pb20x">
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