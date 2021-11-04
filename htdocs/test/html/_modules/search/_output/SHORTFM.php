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
		$see='';
		$see7='';
		$see6='';
		$seef='';
		$libs=array();
		$libraries='';
		$tabs='';
		$tabdivs='';
		$search='';
		$socialtext='';
		$social='';
		if(isset($value->SHORTFM_0))
		{
			$arr=$value->SHORTFM_0;
			$len = count ($arr);
			$output.='<div class="output">';
			for($i=0; $i<$len; $i++)
			{
				if($arr[$i]!="")
				{
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
					$res3=strpos($arr[$i], '[URL]');
					$pos=strpos($arr[$i], '>');
					$str1=substr($arr[$i],0,$pos);
					$pos1=strpos($str1, '<')+1; 
					$str=substr($str1,$pos1);
					if($res7 !== false)
					{
						$imgsrc.=substr($arr[$i], $res7+5);
					}
					elseif($res4 !== false)
					{
						$output.='<span class="cb"><span class="add1" onmousedown="ajaxSee(\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">'.$str.'</span><div id="SEE4'.$count.'" style="display:none"></div></span>';
					}
					elseif($res3 !== false)
					{
						if((isset($_POST['_auth']))||($flag45))
						{
							if($loadurl=='link')
								$output.='<span class="URL"><a target="_blank" href="'.substr($arr[$i], $pos+1).'">'.$str.'</a></span>';
							else
								$output.='<span onmousedown="loadFreeUrl(\''.$theid.'\',\''.substr($arr[$i], $pos+1).'\',\''.$realdb.'\')" class="URL u w180x" title="открыть">'.$str.'</span>';
						}
						else
							$output.='<p><span class="el">Просмотр документа доступен после авторизации</span></p>';
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
					elseif($cres !== false)
					{
						$slides.='<input type="hidden" name="tab" value="'.substr($arr[$i],$cres+9).'"/>';
					}
					else
					{
						$term=$arr[$i];
						$socialtext.=strip_tags($term);
						if($i==0)
						{
							if($realname!="")
								$output.='<div class="aright c9">'.$realname.'</div>';
							$term='<div class="fstr">'.($count+$start).'. '.parseBB($term).'</div>';
						}
						$output.='<div>'.parseBB($term).'</div>';
					}
				}
			}
			$output.='</div>';
		}		
		if(isset($value->SHORTFMSTR_3))
		{
			$starr=$value->SHORTFMSTR_3;
			$stlen=count ($starr);
			for($i=0; $i<$stlen; $i++)
			{
				if($starr[$i]!="")
				{
					$tress=strpos($starr[$i], '[SEARCH]');
					if($tress !== false)
					{
						$search=substr($starr[$i],$tress+8);
					}
				}
			}
		}
		$libstext='';
		if(isset($value->SHORTFMS_2))
		{
			$sstr=$value->SHORTFMS_2[0];
			$spos=strpos($sstr, '[UR]');
			
			if($spos !== false)
				$libs=explode('[/UR]', $sstr);
			$llen=count ($libs);
			$libstext='';
			if($llen>0)
			{
				for($i=0; $i<$llen; $i++)
				{
					if($libs[$i]!="")
					{
						$urtext='';
						$loctext='';
						$larr=explode('[END]', $libs[$i]);
						$lllen=count ($larr);
						for($j=0; $j<$lllen; $j++)
						{
							if($larr[$j]!="")
							{
								$ipos = strpos($larr[$j], '[ITEM]');
								$ipos1 = strpos($larr[$j], '[/ITEM]');
								$bpos = strpos($larr[$j], '[BIBLID]');
								$bpos1 = strpos($larr[$j], '[/BIBLID]');
								$spos = strpos($larr[$j], '[SIGLA]');
								$spos1 = strpos($larr[$j], '[/SIGLA]');
								$tpos = strpos($larr[$j], '[TITL]');
								$tpos1 = strpos($larr[$j], '[/TITL]');
								$aupos = strpos($larr[$j], '[AUTHID]');
								$aupos1 = strpos($larr[$j], '[/AUTHID]');
								$apos = strpos($larr[$j], '[ADRESS]');
								$apos1 = strpos($larr[$j], '[/ADRESS]');			
								$astr="";
								$austr="";
								$bstr="";
								$istr="";
								$ssstr="";
								$tstr="";
								if($ipos !== false)
								{
									$istr=substr($larr[$j],0,$ipos1);
									$istr=substr($istr,$ipos+6);
								}
								if($bpos !== false)
								{
									$bstr=substr($larr[$j],0,$bpos1);
									$bstr=substr($bstr,$bpos+8);
								}
								if($spos !== false)
								{
									$ssstr=substr($larr[$j],0,$spos1);
									$ssstr=substr($ssstr,$spos+7);
								}
								if($tpos !== false)
								{
									$tstr=substr($larr[$j],0,$tpos1);
									$tstr=substr($tstr,$tpos+6);
								}
								if($apos !== false)
								{
									$astr=substr($larr[$j],0,$apos1);
									$astr=substr($astr,$apos+8);
								}
								if($aupos !== false)
								{
									$austr=substr($larr[$j],0,$aupos1);
									$austr=substr($austr,$aupos+8);
								}
								if(strpos($larr[$j], '[UR]') !== false)
								{
									$urauth=$austr;
									$urtext.='<div onclick="showHide1(this.parentNode.parentNode)" class="td"><p class="fstr lh120">'.$tstr.'</p><p class="address"></p></div><div class="td w30 p5x" id="'.$austr.'"><input type="hidden" class="item" value="'.$istr.'"/><input type="hidden" id="biblid'.$i.'" value="'.$bstr.'"/><input type="hidden" class="authid" value="'.$austr.'"/><input type="hidden" class="sigla" value="'.$sstr.'"/><span class="aflinkinfo" onclick="showLibInfo(this.parentNode.id)">О библиотеке</span><span class="aflinkinfo" onclick="lookAtMap(this)">Посмотреть на карте</span><span class="aflinkinfo" onclick="checkAvail(this,\''.$istr.'\',\'\',\''.$i.'\')">Уточнить наличие</span></div>';
								}
								else
								{
									$loctext.='<div class="row"><div class="td loc"><p><b>'.$tstr.'</b></p><p class="address">'.$astr.'</p></div><div class="td w30 p5x" id="'.$austr.'"><input type="hidden" class="item" value="'.$istr.'"/><input type="hidden" class="biblid" value="'.$bstr.'"/><input type="hidden" class="authid" value="'.$austr.'"/><input type="hidden" class="sigla" value="'.$sstr.'"/><span class="aflinkinfo" onclick="showLibInfo(this.parentNode.id)">О библиотеке</span><span class="aflinkinfo" onclick="lookAtMap(this)">Посмотреть на карте</span><span class="aflinkinfo" onclick="checkAvail(this.parentNode.parentNode.parentNode.previousSibling.firstChild.lastChild.lastChild,\''.$istr.'\',\'\',\''.$i.'\')">Уточнить наличие</span></div></div>';
								}
							}
						}
						if($loctext!='')
						{
							if($urtext!='')
							{
								$urtext='<div class="row ur">'.$urtext.'</div>';
							}
							$loctext='<div class="level" style="display:none">'.$loctext.'</div>';
						}
						else
						{
							$urtext='<div class="row">'.$urtext.'</div>';
							$loctext='<div></div>';
						}
						$libstext.='<div class="level">'.$urtext.'</div>'.$loctext;
					}
				}
			}
			
		}
		if($libstext!="")
		{
			$libraries.=$libstext;
		}
		if(isset($value->LINEORD_1))
		{
			$larr=$value->LINEORD_1;
			if((isset($_POST['_auth']))||($flag45))
			{
				foreach($larr as $llen) 
				{ 
					if($llen != "") 
					{
						if(($llen=="043")&&(isset($linkarr["043"])))
							$output.='<div class="043"><span class="url" onmousedown="showOrderWin(this,\''.$rdb.'\',\''.$theid.'\')">Заказ документа</span></div>';
						if(($llen=="058")&&(isset($linkarr["058"])))
							$output.='<div class="058"><span class="url" onmousedown="showOrderWin(this,\''.$rdb.'\',\''.$theid.'\')">Показать онлайн</span></div>';
						if(($llen=="059")&&(isset($linkarr["059"])))
							$output.='<div class="059"><span class="url" onmousedown="showOrderWin(this,\''.$rdb.'\',\''.$theid.'\')">Заказать онлайн доступ</span></div>';
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
					//if($larr[$i]=="044")
					//	$output.='<p><span class="el">Просмотр документа доступен после авторизации</span></p>';
				}
			}
		}
		$tabs.='<span title="more" class="add1" onmousedown="seeAdd(this,\''.$theid.'\',\''.$count.'\',\''.$realdb.'\')">Подробнее</span>';
		$tabdivs.='<div class="adddiv"  id="add'.$count.'" style="display: none"></div>';
		if($libraries!="")
		{
			$tabs.='<span title="libraries" class="add2 border" onmousedown="showHide2(this,\'lib'.$count.'\')">Библиотеки</span>';
			$tabdivs.='<div class="adddiv" id="lib'.$count.'"><input id="lib'.$count.'search" class="searchquery" type="hidden" value="'.htmlentities($search, ENT_COMPAT | ENT_IGNORE, "UTF-8").'"/>'.$libraries.'</div>';
		}
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
			$tabs.='<span title="links" class="add1" onmousedown="showHide2(this,\'link'.$count.'\')">Связанные записи</span>';
			$tabdivs.='<div class="adddiv" id="link'.$count.'" style="display:none">'.$see.'</div>';
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
			$social='<span class="social w88x"><input type="hidden" name="purl" value="http://'.THEHOSTNAME.'/find?iddb='.$realdb.'&ID='.$theid.'"/><span title="facebook" class="facebook" onclick="Share.Url(this.className,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="vkontakte" title="вконтакте" onclick="Share.Url(this.className,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span title="одноклассники" class="odnoklassniki" onclick="Share.Url(this.className,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><span class="twitter" title="twitter" onclick="Share.Url(this.className,this.parentNode.firstChild.value,\''.$imgsrc.'\',this.parentNode.lastChild.value)"></span><input type="hidden" name="pdesc" value="'.deleteSymb($socialtext).'"/></span>';
		}
		echo '<div class="table w100"><div class="row">'.$mark.'<div class="td w88x vtop">'.$imgstr.''.$slides.''.$social;
		/*echo '<span class="vote"><span class="stars"></span><span class="stars"></span><span class="stars"></span><span class="stars"></span><span class="stars"></span></span>';*/
		echo '</div><div class="td vtop w100 p5x">'.$output.'</div></div></div></div>';
	}
}
?>	