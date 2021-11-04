<?php
///htdocs/wlib/html/_modules/search/_output
require_once(THEINCLUDESPATH.'/handlers.php'); 
foreach ($response0 as $key => $value)
{
	$res = strpos($key, 'result_'); 
	if($res !== false)
	{
		$count++;
		$rdb=$iddb;
		$realdb=$iddb;
		$realname='';
		$loadurl='';
		$flagseef='';
		
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
		$theid=htmlspecialchars($value->id);
		$theid=addslashes($theid);
		$mark='';
		$output='';
		if((isset($_POST['_auth']))||($flag45))
			$mark='<div class="td w3"><input type="checkbox" name="marker" value="'.$theid.'" style="margin: 0" class="'.$realdb.'"/></div>';
		$output.='<div class="searchrez" id="'.$theid.'">';
		if(isset($value->SHOTFORM_0->content_0))
		{
			$imgsrc='';
			$imgstr='';
			$slides='';
			$tabs='';
			$tabdivs='';
			$sb='';
			$see='';
			$seef='';
			$see7='';
			$socialtext='';
			$social='';$annbz='';$sifrbz='';$avtzbz='';
			$arr=$value->SHOTFORM_0->content_0;
			$len = count ($arr);
			for($i=0; $i<$len; $i++)
			{
				$pos=strpos($arr[$i], '>'); 
				$output.='<div class="output">';
				$res6=strpos($arr[$i], '[ISBN]');
				$cres=strpos($arr[$i], '[CONTENT]');
				$ann =strpos($arr[$i], 'Аннотация:');
				$sifr=strpos($arr[$i], 'Шифр:');
                                $avtz=strpos($arr[$i], 'Авт.Знак: ');

                                if($ann !== false)
				{
					$annbz=substr($arr[$i], 22, strlen($arr[$i])-9);
                                        unset($arr[$i]);
                                        $arr_bb = array("[b]", "[i]", "[/b]", "[/i]");
                                        $ann_bz_bb=str_replace($arr_bb, '', $annbz);
					$output.='<div class="output"><b>'.'Аннотация: '.'</b>'.'<i>'.$ann_bz_bb.'</i></div>';
				}
/*
                                if($avtz !== false)
				{
                                        $avtzdv=strpos($arr[$i], ':');
					$avtzbz=substr($arr[$i], 16, strlen($arr[$i])-$avtdv);
                                        unset($arr[$i]);
					$output.='<div class="output"><b>'.'Авт  знак: '.'</b>'.'<i>'.$avtzbz.'</i></div>';
				}

                                if($sifr !== false)
				{
					$sifrbz=substr($arr[$i], 10, strlen($arr[$i])-4);
                                        unset($arr[$i]);
					$output.='<div class="output"><b>'.'Шифр: '.'</b>'.'<i>'.$sifrbz.'</i></div>';
				}
*/

				if($cres !== false)
				{
					$slides.='<input type="hidden" name="tab" value="'.substr($arr[$i],$cres+9).'"/>';
				}
				elseif($res6 !== false)
				{
					$sb=prepareISBN(substr($arr[$i], $pos+1));
					$output.='<input name="sb" type="hidden" class="isbn" value="'.$sb.'"/>';
				}
				else
				{
					$term=$arr[$i];
					if($i==0)
					{
						if($realname!="")
							$output.='<div class="aright c9">'.$realname.'</div>';
						$socialtext.=strip_tags($term);
						$term='<div class="fstr">'.($count+$start).'. '.$term.'</div>';
						$output.=parseBB($term);
					}
					else
						$output.='<div>'.parseBB($term).'</div>';
				}
				$output.='</div>';
			}
			if($slides!="")
			{
				$slides='<span class="titleslides" onclick="showSlidesCont(this)">'.$slides.'</span>';
			}
			foreach ($value->SHOTFORM_0 as $arg => $val)
			{
				$res2 = strpos($arg, 'action_');
				if($res2 !== false)
				{
					$rtitle="";
					if(isset ($val->title))
						$rtitle=$val->title;
					else
						$rtitle="Показать";
					if($val->id=='SEE1')
						$see.='<span class="'.$val->id.'" onmousedown="See(this,\''.$theid.'\',\'SEE1\',null,\''.$realdb.'\')">'.$rtitle.'</span>';
					if(($val->id=='SEE2')&&($flagseef!='hierarchical'))
						$see.='<span class="'.$val->id.'" onmousedown="See(this,\''.$theid.'\',\'SEE2\',null,\''.$realdb.'\')">'.$rtitle.'</span>';
					if($val->id=='SEE8')
						$see.='<span class="'.$val->id.'" onmousedown="See8(\''.htmlspecialchars($val->arg, ENT_QUOTES).'\',\''.$realdb.'\')">'.$val->title.'</span>';
					if($val->id=='SEE4')
						$output.='<div class="output"><div class="cb"><span class="add1" onmousedown="ajaxSee(\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">'.$rtitle.'</span><div id="'.$val->id.''.$count.'" style="display: none"></div></div></div>';
					if($val->id=='URL')
					{
						if((isset($_POST['_auth']))||($flag45))
						{
							if($loadurl=='link')
								$output.='<span class="URL"><a target="_blank" href="'.$val->arg.'">'.$rtitle.'</a></span>';
							else
								$output.='<span onmousedown="loadFreeUrl(\''.$theid.'\',\''.$val->arg.'\',\''.$realdb.'\')" class="URL u w180x" title="открыть">'.$rtitle.'</span>';
						}
						else
						{
							$output.='<p><span class="el">Просмотр документа доступен после авторизации</span></p>';
						}
					}
					if($val->id=='SEEF')
					{
						$seefpos=strpos($val->title, 'Тома/выпуски'); 
						if(($seefpos !== false)&&($flagseef=='hierarchical'))
						{
							$seef.='<span class="SEEF" onmousedown="See(this,\''.$theid.'\',\'SEEF\',null,\''.$realdb.'\')">'.$val->title.'</span><div id="see'.$theid.'" class="seediv" style="display:none"></div>';
						}
						else
						{
							$termin=$val->arg;
							$from=$from = array("\'", "\"", "\\\\");
							$to = array("[apos]", "[quot]", "[backslash]");
							$newtermin = str_replace($from, $to, $termin);
							$pos1m = strpos($val->title, 'Первый МГМУ'); 
							$possc = strpos($val->title, 'Статьи/части'); 
							
							if(($pos1m === false)&&($possc === false))
							{
								$see.='<span class="SEEF" onmousedown="SeeF(\''.htmlspecialchars($newtermin, ENT_QUOTES).'\')">'.$rtitle.'</span>';
							}
						}
					}
					if($val->id=='SEE7')
					{
						$see7.='<span class="SEE7">'.$val->title.'</span>';
					}
					if($val->id=='IMG')
					{
						$imgsrc=$val->arg;
					}
				}
			}
			if(isset($value->LINEORD_0))
			{
				$larr=$value->LINEORD_0;
				if((isset($_POST['_auth']))||($flag45))
				{
					foreach($larr as $llen) 
					{ 
						if($llen != "") 
						{
							if(($llen=="043")&&(isset($linkarr["043"])))
								$output.='<div class="043"><span class="url" onmousedown="showOrderWin(this,\''.$rdb.'\',\''.$theid.'\')">'.$linkarr[$llen].'</span></div>';
							if(($llen=="058")&&(isset($linkarr["058"])))
								$output.='<div class="058"><span class="url" onmousedown="showOrderWin(this,\''.$rdb.'\',\''.$theid.'\')">'.$linkarr[$llen].'</span></div>';
							if(($llen=="059")&&(isset($linkarr["059"])))
								$output.='<div class="059"><span class="url" onmousedown="showOrderWin(this,\''.$rdb.'\',\''.$theid.'\')">'.$linkarr[$llen].'</span></div>';
						}
					}
				}
				else
				{
					$llen = count ($larr);
					for($i=0; $i<$llen; $i++)
					{
						if($larr[$i]=="058")
							$output.='<p><span class="el">Просмотр документа доступен после авторизации</span></p>';
						if($larr[$i]=="043")
							$output.='<p><span class="el">Онлайн-заказ в зал доступен после авторизации</span></p>';
						//if($larr[$i]=="044")
						//	$output.='<p><span class="el">Просмотр документа доступен после авторизации</span></p>';
					}
				}
			}
			
			$tabs.='<span title="more" class="add1" onmousedown="seeAdd(this,\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">Подробнее</span>';
			$tabdivs.='<div class="adddiv"  id="add'.$count.'" style="display: none"></div>';
			if(isset($fjson->$ritem->bibcard))
			{
				$tabs.='<span title="card" class="add1" onmousedown="seeBibcard(this,\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">Карточка</span>';
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
				if($see7!="")
				{
					$tabs.='<span title="place" class="add1" onmousedown="seePlace(this,\''.$theid.'\',\''.$count.'\',\''.$rdb.'\')">Местонахождение</span>';
					$tabdivs.='<div class="adddiv" id="place'.$count.'" style="display:none"></div>';
				}
			}
/*-----------кнопка для перехода в сервис--------*/
		//$output.='<div><span class="url uslugi" onmousedown="sendToScan(\''.$theid.'\');">Заказать копию</span></div>';
/*-------конец кнопка для перехода в сервис------*/

			//кнопка на сканирование добавляется или не добавляется в зависимости от фонда
			if(get_base($_POST,$theid) == 'true'){
				$output.='<div class="tabs">'.$tabs.'<span class="url uslugi" onmousedown="sendToScan(\''.$theid.'\');">Копировать фрагмент</span></div><div class="tabdivs">'.$tabdivs.'</div>';
			}else{	
				$output.='<div class="tabs">'.$tabs.'</div><div class="tabdivs">'.$tabdivs.'</div>';
			}
			
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
				$social='<span class="social w88x"><input type="hidden" name="purl" value="http://'.THEHOSTNAME.'/find?iddb='.$realdb.'&ID='.$theid.'"/><span title="facebook" class="facebook" onclick="Share.Url(this.className,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="vkontakte" title="вконтакте" onclick="Share.Url(this.className,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span title="одноклассники" class="odnoklassniki" onclick="Share.Url(this.className,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="twitter" title="twitter" onclick="Share.Url(this.className,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><input type="hidden" name="pdesc" value="'.deleteSymb($socialtext).'"/></span>';
			}
			echo '<div class="table w100"><div class="row">'.$mark.'<div class="td w88x vtop">'.$imgstr.''.$slides.''.$social.'</div><div class="td vtop pr5x">'.$output.'</div></div></div>';
		}
		echo '</div>';
	}
}

?>