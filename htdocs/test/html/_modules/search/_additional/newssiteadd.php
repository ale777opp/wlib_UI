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
				<div class="td vtop content pr20x pb20x pl20x brl1c brr1c h100">
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
	$outform="FULLNEWS";
	$sign="all";
	$signtext="Все новости";
	if(isset($result->response_0->_sign))
		$sign=$result->response_0->_sign;
	if($sign != "all")
		$signtext="Архив новостей";
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
		$output='';
		$imgsrc='';
		$socialtext='';
		$social='';
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_');
			if($res !== false)
			{
				$count++;
				$theid=htmlspecialchars($value->id);
				$theid=addslashes($theid);
				if(isset($value->FULLNEWS_0))
				{
					$arr=$value->FULLNEWS_0;
					$len = count ($arr);
					$llen=$len-1;
					$lllen=$len-2;
					$output.='<div class="nessite">';
					for($i=0; $i<$len; $i++)
					{
						if($arr[$i]!="")
						{
							if($i==0)
							{
								$term=parseBB($arr[$i]);
								$socialtext.=strip_tags($term);
								$output.='<div class="content"><h1>'.$term.'</h1></div>';
							}
							else
							{
								$res3=strpos($arr[$i], '[URL]');
								$res7=strpos($arr[$i], '[IMG]'); 
								$res8=strpos($arr[$i], '[/IMG]');
								if($res7 !== false)
								{
									$sstr=substr($arr[$i],0,$res8);
									$imgsrc.=substr($sstr, $res7+5);
								}								
								if($res3 !== false)
								{
									$output.='<div><a target="_blank" href="'.substr($arr[$i], $res3+5).'">Полный текст</a></div>';
								}
								else
									$output.='<div>'.parseBB($arr[$i]).'</div>';
							}
						}
					}
					$output.='</div>';
				}
			}
		}
		$social='<span class="social w88x"><input style="height:1px;opacity:0" type="text" id="purl" name="purl" value="http://'.THEHOSTNAME.'/find?action=NEWS&iddb='.$iddb.'&ID='.$theid.'"/><span title="facebook" class="facebook" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="vkontakte" title="вконтакте" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span title="одноклассники" class="odnoklassniki" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="twitter" title="twitter" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><input type="hidden" name="pdesc" value="'.deleteSymb($socialtext).'"/></span>';
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
				<div class="td vtop w20 content pt50x pl20x pr20x pb20x">
				<div class="b c6 f80 pl5x">$signtext</div>
				$social
				<p class="pl5x pt20x a u" title="Скопировать ссылку на материал" onclick="copyToClip()">Скопировать ссылку</p>
				<script>
				function copyToClip()
				{
					take('purl').n.select();
					try
					{
						if(document.execCommand("copy"))
						{
							alert('Ссылка на материал скопирована в буфер обмена');
						}
					}
					catch(e)
					{
						alert('Не удалось скопировать адрес ссылки в буфер обмена');
					}
				}
				</script>
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