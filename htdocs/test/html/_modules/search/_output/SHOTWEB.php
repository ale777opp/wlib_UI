<?php  
foreach ($response0 as $key => $value)
{
	$res = strpos($key, 'result_');
	$rdb=$iddb;
	$realdb=$iddb;
	$realname='';
	$loadurl='';
	$flagseef='';
	if($res !== false)
	{
		if(isset($value->sourceIddb))
		{
			$rdb=$value->sourceIddb;
		}
		if(isset($value->iddb))
		{
			$realdb=$value->iddb;
			$ritem='dbs_'.$realdb;
			$rditem='dbs_'.$rdb;
			if(isset($fjson->$ritem->loadurl))
				$loadurl=$fjson->$ritem->loadurl;
			if(isset($dbarr[$rdb])&&($ldb!=$rdb))
				$realname=$dbarr[$rdb];
			if((isset($fjson->$rditem))&&($ldb!=$rdb))
				$realname=$fjson->$rditem->alias;
			if(isset($fjson->$ritem->seef))
				$flagseef=$fjson->$ritem->seef;
		}
		$count++;
		$theid=htmlspecialchars($value->id);
		$theid=addslashes($theid);
		$mark='';
		$output='';
		if((isset($_POST['_auth']))||($flag45))
			$mark='<div class="td w3"><input type="checkbox" name="marker" value="'.$theid.'" style="margin: 0" class="'.$realdb.'"/></div>';
		echo '<div class="searchrez" id="'.$theid.'">';
		$imgsrc='';
		$imgstr='';
		$slides='';
		$sb='';
		$searchtitle='';
		$see='';
		$see7='';
		$see6='';
		$seef='';
		$tabs='';
		$tabdivs='';
		$search='';
		$socialtext='';
		$social='';
		$resflstr='';
		$biblink='';
		$flagurl=false;
		if(isset($value->SHOTWEB_0))
		{
			$arr=$value->SHOTWEB_0;
			$len = count ($arr);
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
					$output.='<div class="output">';
					$res7=strpos($arr[$i], '[IMG]'); 
					$res6=strpos($arr[$i], '[ISBN]');
					$cres=strpos($arr[$i], '[CONTENT]');
					$res5=strpos($arr[$i], '[SEE'); 
					$res1=strpos($arr[$i], '[SEE1]'); 
					$res2=strpos($arr[$i], '[SEE2]');
					$resf=strpos($arr[$i], '[SEEF]'); 
					$res4=strpos($arr[$i], '[SEE4]'); 
					$res77=strpos($arr[$i], '[SEE7]'); 
					$res66=strpos($arr[$i], '[SEE6]'); 
					$res88=strpos($arr[$i], '[SEARCHTITLE]'); 
					$rlike=strpos($arr[$i], '[LIKE]'); 
					$rlike1=strpos($arr[$i], '[/LIKE]'); 
					$resfl=strpos($arr[$i], '[FLIPPINGBOOK]');
					$res3=strpos($arr[$i], '[URL]');
					$pos=strpos($arr[$i], '>');
					$str1=substr($arr[$i],0,$pos);
					$pos1=strpos($str1, '<')+1; 
					$str=substr($str1,$pos1);
					if($res7 !== false)
					{
						$imgsrc.=substr($arr[$i], $res7+5);
					}
					elseif($rlike !== false)
					{
						$sstr=substr($arr[$i],0,$rlike1);
						$sstr=substr($sstr,$rlike+6);
						$dpos=strpos($sstr, '['); 
						$dpos1=strpos($sstr, ']'); 
						if($dpos!==false)
						{
							$rlabel=substr($sstr,$dpos);
							$rlabel=substr($rlabel,$dpos1);
							$ssstr=substr($sstr,$dpos1);
							$output.='<u title="посмотреть похожие записи" class="'.$rlabel.'" onmousedown="showLable(this)">'.$ssstr.'</u>';
						}
					}
					elseif($res4 !== false)
					{
						$output.='<span class="cb"><span class="add1" onmousedown="ajaxSee(\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">'.$str.'</span><div id="SEE4'.$count.'" style="display:none"></div></span>';
					}
					elseif($res5 !== false)
					{
						if($res1 !== false)
						{
							$see.='<span class="SEE1" onmousedown="See(this,\''.$theid.'\',\'SEE1\',null,\''.$realdb.'\')">'.$str.'</span>';
						}
						if(($res2 !== false)&&($flagseef!='hierarchical'))
						{
							$see.='<span class="SEE2" onmousedown="See(this,\''.$theid.'\',\'SEE2\',null,\''.$realdb.'\')">'.$str.'</span>';
						}
						if($resf !== false)
						{
							if(($str=="Тома/выпуски")&&($flagseef=='hierarchical'))
							{
								$seef.='<span class="SEEF" onmousedown="See(this,\''.$theid.'\',\'SEE2\',null,\''.$realdb.'\')">'.$str.'</span><div id="see'.$theid.'" class="seediv" style="display:none"></div>';
							}
							else
							{
								$termin=substr($arr[$i], $pos+1);
								$from=$from = array("'", "\"", "\\");
								$to = array("[apos]", "[quot]", "[backslash]");
								$newtermin = str_replace($from, $to, $termin);
								$pos1m = strpos($str, 'Первый МГМУ'); 
								$possc = strpos($str, 'Статьи/части'); 
								$postv = strpos($str, 'Тома/выпуски'); 
								if(($pos1m === false)&&($possc === false)&&($postv === false))
								{
									$see.='<span class="SEEF" onmousedown="SeeF(\''.htmlspecialchars($newtermin, ENT_QUOTES).'\')">'.$str.'</span>';
								}
							}
						}
						if($res77 !== false)
						{
							$see7.='<span class="SEE7">'.$str.'</span>';
						}
						if($res66 !== false)
						{
							$see6.='<span class="SEE6">'.$str.'</span>';
						}
					}
					elseif($res6 !== false)
					{
						$sb=prepareISBN(substr($arr[$i], $pos+1));
						$output.='<input name="sb" type="hidden" class="isbn" value="'.$sb.'"/>';
					}
					elseif($res88 !== false)
					{
						$searchtitle.='<input name="search_title" type="hidden" class="search_title" value="'.substr($arr[$i], $pos+1).'"/>';
					}
					elseif($cres !== false)
					{
						$slides.='<input type="hidden" name="tab" value="'.substr($arr[$i],$cres+9).'"/>';
					}
					elseif($resfl !== false)
					{
						$resflstr.='<b class="mobi" title="Доступен просмотр через мобильное приложение"><img alt="" src="/wlib/wlib/img/mobi.png" hspace="0" vspace="0" border="0" align="middle"/></b>';
					}
					elseif($res3 !== false)
					{
						if($loadurl=='link')
							$output.='<span class="URL"><a target="_blank" href="'.substr($arr[$i], $pos+1).'">'.$str.'</a></span>';
						else
							$output.='<span onmousedown="loadFreeUrl(\''.$theid.'\',\''.substr($arr[$i], $pos+1).'\',\''.$realdb.'\')" class="URL u w180x" title="открыть">'.$str.'</span>';
						$flagurl=true;
					}
					else
					{
						$term=$arr[$i];
						$socialtext.=strip_tags($term);
						if($i==0)
						{
							if($realname!="")
								$output.='<div class="aright c9">'.$realname.'</div>';
							$term=substr($term, 5);
							$term='<div class="fstr">'.($count+$start).'. '.$term;
						}
						$biblink=$finalterm=parseBB($term);
						if($lightstring!="")
							$finalterm=backlight($lightstring,$finalterm);
						$output.=$finalterm;
					}
					$output.='</div>';
				}
			}
		}
		if($slides!="")
		{
			$slides='<span class="titleslides" onclick="showSlidesCont(this)">'.$slides.'</span>';
		}
		if(isset($value->highlighting_0))
		{
			$harr=$value->highlighting_0->snippets_0;
			$hlen = count ($harr);
			if($harr > 0)
			{
				$output.='<div class="lighttitle"><input name="wi'.($count+$start).'" class="hlight" id="wi'.($count+$start).'" type="checkbox"/><label for="wi'.($count+$start).'">Найдено в тексте документа</label><div class="backlight">';
				for($i=0; $i<$hlen; $i++)
				{
					$output.='<div>'.$harr[$i].'</div>';
				}
				$output.='</div></div>';
			}
		}
		if(isset($value->LINEORD_1))
		{
			$larr=$value->LINEORD_1;
			$count1=0;
			if((isset($_POST['_auth']))||($flag45))
			{
				foreach($larr as $llen) 
				{ 
					if($llen != "")
					{
						if(isset($linkarr["070"]))
						{
							if(!$flagurl)
							{
								if($llen=="065")
								{
									$output.='<p><span class="_065 el">Просмотр документа доступен только зарегистрированным читателям библиотеки</span></p>';
								}
								if((($llen=="058")||($llen=="069"))&&($count1 == 0))
								{
									$output.='<p><span class="_065 el">Просмотр документа доступен после авторизации</span></p>';
									$count1++;
								}
							}
						}
						else
						{
							if(isset($linkarr[$llen]))
							{
								if((($llen=="058")||($llen=="069"))&&($count1 == 0)&&(!$flagurl))
								{
									$output.='<div class="_'.$llen.'"><span class="url" onmousedown="showOrderWin(this,\''.$rdb.'\',\''.$theid.'\')">'.$linkarr[$llen].'</span></div>';
									$count1++;
								}
								else
								{
									if(($llen!="058")&&($llen!="069"))
										$output.='<div class="_'.$llen.'"><span class="url" onmousedown="showOrderWin(this,\''.$rdb.'\',\''.$theid.'\')">'.$linkarr[$llen].'</span></div>';
								}
							}
						}
					}
				}
			}
			else
			{
				if(isset($linkarr["058"]))
					if(!$flagurl)
						$output.='<p><span class="_058 el">Просмотр документа доступен после авторизации</span></p>';
			}
		}
		$tabs.='<span title="more" class="add1" onmousedown="seeAdd(this,\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">Подробнее</span>';
		$tabdivs.='<div class="adddiv"  id="add'.$count.'" style="display: none"></div>';
		if(isset($fjson->$ritem->bibcard))
		{
			$tabs.='<span title="card" class="add1" onmousedown="seeBibcard(this,\''.addslashes($value->id).'\',\''.$count.'\',\''.$realdb.'\')">Карточка</span>';
			$tabdivs.='<div class="adddiv"  id="bib'.$count.'" style="display: none"></div>';
		}
		if(isset($fjson->$ritem->rusmarc))
		{
			$tabs.='<span title="rusmarc" class="add1" onmousedown="seeRusmarc(this,\''.addslashes($value->id).'\',\''.$count.'\',\''.$realdb.'\')">RUSMARC</span>';
			$tabdivs.='<div class="adddiv"  id="rusm'.$count.'" style="display: none"></div>';
		}
		if($see!="")
		{
			$tabs.='<span title="links" class="add2 border" onmousedown="showHide2(this,\'link'.$count.'\')">Связанные записи</span>';
			$tabdivs.='<div class="adddiv" id="link'.$count.'">'.$see.'</div>';
		}
		if($seef!="")
		{
			$tabs.='<span title="part" class="add1" onmousedown="See(this,\''.$theid.'\',\'SEEF\',null,\''.$realdb.'\')">Тома/выпуски</span>';
			$tabdivs.='<div class="adddiv" id="see'.$theid.'" style="display:none"></div>';
		}
		if(isset($fjson->$ritem->place))
		{
			if(($see7!="")||($see6!=""))
			{
				$tabs.='<span title="place" class="add1" onmousedown="seePlace(this,\''.$theid.'\',\''.$count.'\',\''.$rdb.'\')">Местонахождение</span>';
				$tabdivs.='<div class="adddiv" id="place'.$count.'" style="display:none"></div>';
			}
		}
		
/*-----------кнопка для перехода в сервис--------*/
//		$output.='<div><span class="url uslugi" onmousedown="sendToScan(\''.$theid.'\');">Заказать копию</span></div>';
/*-------конец кнопка для перехода в сервис------*/
		
		$output.='<div class="tabs">'.$tabs.'</div><div class="tabdivs">'.$tabdivs.'</div>';
		
		if($imgsrc!="")
			$imgstr='<figure tabindex="1"><img border="0" hspace="0" vspace="0" alt="" title="" src="'.$imgsrc.'"/></figure>';
		else
		{
			$imgstr='<span><cite';
			if($sb!='')
				$imgstr.=' id="ISBN'.$sb.'"';
			$imgstr.='><span class="book" tabindex="1"><ul class="paperback_front"><li></li></ul><ul class="ruled_paper"><li></li><li></li><li></li><li></li><li></li></ul><ul class="paperback_back"><li></li></ul></span></cite></span>';
		}
		if((isset($fjson->$ritem->additional->social)&&($fjson->$ritem->additional->social)=="display"))
		{
			$social='<span class="social w88x"><input type="hidden" name="purl" value="http://'.THEHOSTNAME.'/find?iddb='.$realdb.'&ID='.$theid.'"/><span title="facebook" class="facebook" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="vkontakte" title="вконтакте" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span title="одноклассники" class="odnoklassniki" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="twitter" title="twitter" onclick="Share.Url(this,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><input type="hidden" name="pdesc" value="'.deleteSymb($socialtext).'"/></span>'.$searchtitle;
		}
		echo '<div class="table w100"><div class="row">'.$mark.'<div class="td w88x vtop">'.$imgstr.''.$slides.''.$resflstr.''.$social.'</div><div class="td vtop pl10x pt10x pb10x w100"><div class="pay_service" style="display:none">'.$biblink.'</div>'.$output.'</div></div></div>';
		echo '</div>';
	}
}
?>	