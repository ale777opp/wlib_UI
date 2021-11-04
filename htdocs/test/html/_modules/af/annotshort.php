<?php
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div class="spacer"></div><div id="infor"><div class="col_title"><span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / <span class="caption">Результаты поиска</span></div>';
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	$iddbtitle='Аннотация: ';
	if(isset($response0->_iddbtitle))
		$iddbtitle='<u>Авторитетный файл:</u><i class="c9"> '.$response0->_iddbtitle.'</i>';
	if(isset($response0->result_0->id))
	{
		$start=0;
		$size=0;
		$length=2;
		$showstr="";
		$textoutput="";
		if(isset($response0->_start))
			$start=intval($response0->_start);
		if(isset($response0->size))
			$size=intval($response0->size);
		if(isset($response0->_length))
			$length=$response0->_length;
		if(isset($response0->_showstr))
			$showstr=$response0->_showstr;
		$fromaftobibl=$response0->_fromaftobibl;

		$globaloutput.='<div id="searchhead"><div><span class="dib mt5x"><span class="db lh160 f140">'.$iddbtitle.'</span><b><u>Вы искали:</u></b> <span class="showstr" id="shstr">'.$showstr.'</span><br/><b>Найдено записей: </b><b class="highlight">'.$size.'</b></span><br/></div><div class="spacer"></div><div id="menu1" style="display: none"><div id="andor" class="OR"></div></div></div><div></div><div class="col_content">';
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			$globaloutput.='<p class="pages">'.resPaginator($start,$length,$size,NULL,'4').'</p>';
		}
		$globaloutput.='<div id="searchrezults">';
		$count=0;
		
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_');
			if($res !== false)
			{
				$count++;
				$theid=htmlspecialchars($value->id);
				$theid=addslashes($theid);
				$output1='';
				$globaloutput.='<div class="table w100"><div class="row"><div class="td"></div><div class="td"><input type="hidden" class="stat_'.$count.'" name="stat" value="'.$theid.'"/>';
				$imgsrc=THEIMGPATH.'/nofoto2.gif';
				foreach ($value as $arg => $val)
				{
					$res1 = strpos($arg, 'userforms');
					if($res1!==false)
					{
						foreach ($val as $arg => $va)
						{
							if(isset($val->AFANNOTTEXT_0->entries_0->url))
							{
								$imgsrc=$val->AFANNOTTEXT_0->entries_0->url;
							}
							foreach ($va as $name => $v)
							{
								if($name=="title")
								{
									if($v!="IMG")
									{
										if(($v=="organization")||($v=="FIO"))
										{
											$globaloutput.='<div class="shotform"><img src="'.$imgsrc.'"/></div><p><span class="red f140">'.$va->entries_0->text.'</span></p>';
											//echo $v.' || '.$start.' || '.$response0->_renew.' || '.$theid.' || '.$va->entries_0->biblQuery.'<br/>';
											if(($v=="FIO")&&(isset($response0->_renew))&&($start == 0))
											{
												$textoutput.='<div data-title="подробнее..." class="newrecs" onmousedown="vocsearchInAF(\'ID\',\''.$theid.'\')"><img src="'.$imgsrc.'"/><div class="newssign">'.$va->entries_0->biblQuery.'</div></div>';
											}
										}
										else
											$globaloutput.='<p><b>'.$v.'</b></p>';
									}
								}
								$res2 = strpos($name, 'entries_');
								if($res2!==false)
								{
									if(strpos($v->text, '[IMG]')===false)
										if($v->text !="")
											$globaloutput.='<p class="afsmall">- '.$v->text.'</p>';
								}
								$res3 = strpos($name, 'references_');
								if($res3!==false)
								{
									$globaloutput.='<p class="afsmall">';
									if(isset($v->id))
									{
										$globaloutput.='<span class="afbig"><span title="Аннотация" onmousedown="vocsearchInAF(\'ID\',\''.addslashes($v->id).'\')">'.$v->title.'</span></span>';
									}
									else
										$globaloutput.='<span>'.$v->title.'</span>';
									$globaloutput.='</p>';
								}
								$res4 = strpos($name, 'lists_');
								if($res4!==false)
								{
									foreach ($v as $point => $elem)
									{
										$res5 = strpos($point, 'text_');
										$res6 = strpos($point, 'semicolon_');
										$res7 = strpos($point, 'marked_');
										$res8 = strpos($point, 'numbered_');
										if($res5!==false)
										{
											$tsize = count($elem);
											$globaloutput.='<p>';
											for($k=0; $k < $tsize; $k++)
												$globaloutput.='<i>'.$elem[$k].'</i> ';
											$globaloutput.='</p>';
										}
										if($res6!==false)
										{
											$ssize = count($elem);
											$globaloutput.='<p>';
											for($k=0; $k < $ssize; $k++)
												$globaloutput.='<span>'.$elem[$k].'</span> ';
											$globaloutput.='</p>';
										}
										if($res7!==false)
										{
											$msize = count($elem);
											$globaloutput.='<ol style="margin: 10px 0 10px 55px">';
											for($k=0; $k < $msize; $k++)
												$globaloutput.='<li style="margin: 5px">'.$elem[$k].'</li> ';
											$globaloutput.='</ol>';
										}
										if($res8!==false)
										{
											$nsize = count($elem);
											$globaloutput.='<ol style="margin: 10px 0 10px 55px">';
											for($k=0; $k < $nsize; $k++)
												$globaloutput.='<li style="margin: 5px">'.$elem[$k].'</li> ';
											$globaloutput.='</ol>';
										}
									}
								}
							}
						}
					}
				}
				$globaloutput.='</div><div style="display:none" class="td w20 acenter"><b>Всего публикаций:</b><br/><span class="u" id="stat_'.$count.'" title="ПОСМОТРЕТЬ" onmousedown="searchTerm(\''.$theid.'\')">0</span></div></div></div>';
			}
		}
		$globaloutput.='</div>';
		$N1=ceil($size/$length);
		if($N1!= 1)
		{
			$globaloutput.='<p class="pages">'.resPaginator($start,$length,$size,NULL,'4').'</p>';
		}
		$globaloutput.='<div class="spacer"></div><script> registrOnloadFunctions(function(){getAFStat();}); </script></div></div>';
		if((isset($response0->_renew))&&($start == 0))
		{
			if($textoutput!="")
			{
				$textoutput.='<div class="newselse" onmousedown="vocsearchInAF(\'REL\',\'НОСИТЕЛЬ\',null,\'yes\')"><span>&#160;</span><span>еще ...</span></div>';
				$htpath=THEPAGESPATH.'/index/_news/persons.html';
				writeFile($htpath,$textoutput);
			}
		}
	}
	else
	{
		$globaloutput.='<div class="acenter f80 lh80"><br/><br/><div class="b">По Вашему запросу ничего не найдено.</div></div></div>';
	}
}
else
{
	$globaloutput.='</div><div class="acenter f80 lh80"><br/><br/><div class="b">По Вашему запросу ничего не найдено.</div></div></div>';
}
include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>
