<?php  
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div class="spacer"></div><div id="infor">';
$src="nophoto.jpg";
$size="0";
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	if(isset($response0->size))
		$size=$response0->size;
	if(isset($response0->_iddb))
		$iddb=$response0->_iddb;
	if(isset($response0->_localiddb))
	{
		$iddb=$response0->_localiddb;
		$particle="lib_";
	}
	if(isset($response0->_skin))
	{
		if($response0->_skin!="")
			$skin=$response0->_skin;
	}
	if(isset($response0->_id))
		$lind=$response0->_id;
	if(isset($response0->_ltitle))
		$ltitle=$response0->_ltitle;
	if(isset($response0->_laddress))
		$laddress=$response0->_laddress;
	if(isset($response0->_sigla))
		$sigla=$response0->_sigla;
	if(isset($response0->_site))
		$site=$response0->_site;
	if(isset($response0->_elcat))
		$elcat=$response0->_elcat;
	include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
	$globaloutput.='<div class="col_title"><div class="fright"><input type="button" class="button2" value="Вернуться к поиску" onmousedown="nextSearch();"/></div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div></div><div class="col_content">';
	echo $globaloutput;
	if(intval($size)==0)
	{
		include (THEINCLUDESPATH.'/errorpage.php');
		echo '</div></div>';
	}
	else
	{
		$theid=htmlspecialchars($response0->result_0->id);
		$theid=addslashes($theid);
		$coltype=$response0->_coltype;
		echo '<div class="spacer"></div><div id="searchhead" class="acenter"><b>Форматы:</b><b class="red f120 pl10x pr10x" id="formattitle">Описание коллекции</b><input id="bfirst" type="button" class="button2" value="Полное описание" onclick="showFormatC(\'FULLFRMARC\');"/><input id="bsecond" type="button" class="button2" value="RUSMARC" onclick="showFormatC(\'RUSMARC\');"/><div class="spacer"></div></div>';
		$output='';
		$rstr='';
		$fstr='';
		$soutput='';
		$routput='';
		$foutput='';
		$fondtitle='';
		$opistitle='';
		$delotitle='';
		$documenttitle='';
		$fonddiv='';
		$opisdiv='';
		$delodiv='';
		$documentdiv='';
		$seelinks='';
		$lstr='';
		$link='';
		$linkstr='';
		if(isset($response0->result_0->COLLECTION_1))
		{
			$sarr=$response0->result_0->COLLECTION_1;
			$slen=count ($sarr);
			$resl=strpos($sarr[0], '[name]Коллекция');
			$res2=strpos($sarr[0], '[name]Подколлекция');
			//$res3=strpos($sarr[0], '[name]Дело');
			//$res4=strpos($sarr[0], '[name]Документ');
			for($i=1; $i<$slen; $i++)
			{
				$resseef=strpos($sarr[$i], '[SEEF]');
				$resu=strpos($sarr[$i], '[URL]');
				$rest=strpos($sarr[$i], '>');
				$str1=substr($sarr[$i],0,$rest);
				$pos1=strpos($str1, '<')+1; 
				$str=substr($str1,$pos1);
				if($sarr[$i]!="")
				{
					if($resl !== false)
					{
						if($i==1)
						{
							if(isset($response0->result_0->UNIMARC_3))
							{
								$left = '<p>';
								$right = '</p>';
								$rstr .= $left.join("$right$left", $response0->result_0->UNIMARC_3).$right;
							}
							if(isset($response0->result_0->FULLFRMARC_2))
							{
								$farr=$response0->result_0->FULLFRMARC_2;
								$flen=count ($farr);
								for($j=0; $j<$flen; $j++)
								{
									if($j==0)
									{
										$fstr.='<div class="tr w100"><div class="td p5x w20 bgc"></div><div class="td p5x w80">';
									}
									else
									{
										$fseef=strpos($farr[$j], '[SEEF]');
										$resf=strpos($farr[$j], '<');
										if($fseef === false)
										{
											if($resf !== false)
											{
												$str=str_replace('> ','</div><div class="td w80 aleft p5x"><p>',$farr[$j]);
												$fstr.='</p></div></div><div class="tr w100"><div class="td w20 bgc acenter p5x b">'.substr($str,$resf+1);
											}
											else
											{
												$fstr.=$farr[$j];
											}
										}
									}
								}
							}
							$fondtitle.='<p class="fstr">'.$sarr[$i].'</p>';
						}
						elseif($resu !== false)
						{
							$link.=substr($sarr[$i],$rest+1);
						}
						elseif($resseef !== false)
						{
							$seelinks.=substr($sarr[$i],$rest+1);
						}
						else
						{
							$fonddiv.='<p>'.parseBB($sarr[$i]).'</p>';
						}
					}
					if($res2 !== false)
					{
						$ipos=strpos($sarr[$i], '[ind]');
						$iipos=strpos($sarr[$i], '[/ind]');
						$linkarg=substr(substr($sarr[$i],0,$iipos),$ipos+5);
						$linkarg=addslashes($linkarg);
						if($i==1)
						{
							$opistitle.='<p class="fstr">'.$sarr[$i].'</p>';
							if(isset($response0->result_0->UNIMARC_3))
							{
								$left = '<p>';
								$right = '</p>';
								$rstr .= $left.join("$right$left", $response0->result_0->UNIMARC_3).$right;
							}
							if(isset($response0->result_0->FULLFRMARC_2))
							{
								$farr=$response0->result_0->FULLFRMARC_2;
								$flen=count ($farr);
								for($j=0; $j<$flen; $j++)
								{
									if($j==0)
									{
										$fstr.='<div class="tr w100"><div class="td w20 bgc p5x"></div><div class="td w80 p5x">';
									}
									else
									{
										$fseef=strpos($farr[$j], '[SEEF]');
										$resf=strpos($farr[$j], '<');
										if($fseef === false)
										{
											if($resf !== false)
											{
												$str=str_replace('> ','</div><div class="td w80 aleft p5x"><p>',$farr[$j]);
												$fstr.='</p></div></div><div class="tr w100"><div class="td w20 bgc acenter p5x b">'.substr($str,$resf+1);
											}
											else
											{
												$fstr.=$farr[$j];
											}
										}
									}
								}
							}
						}
						elseif($resu !== false)
						{
							$link.=substr($sarr[$i],$rest+1);
						}
						elseif($resseef !== false)
						{
							$seelinks.=substr($sarr[$i],$rest+1);
						}
						else
						{
							if($ipos !== false)
							{
								$fondtitle.='<p class="b u red" onclick="addSeeCollection(\''.$linkarg.'\')">'.substr($sarr[$i],0,$ipos).'</p>';
							}
							else
								$opisdiv.='<p>'.parseBB($sarr[$i]).'</p>';
						}
					}
				}
			}
			$output.='<div id="archive_output">';
			$routput.='<div id="rusmarc_output" style="display:none">';
			$foutput.='<div id="full_output" style="display:none">';
			if($resl !==false)
			{
				$output.='<div class="table w100" id="fond'.$theid.'">';
				$routput.='<div class="table w100" id="RUSM'.$theid.'">';
				$foutput.='<div class="table w100" id="full'.$theid.'">';
				$foutput.=$fstr.'</div></div>';
				$output.='<div class="tr w100"><div class="td w20 bge acenter p5x b">Название</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$routput.='<div class="tr w100"><div class="td w20 bge acenter p5x b">Название</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$output.='<div class="tr"><div class="td w20 bgc acenter p5x b">Описание</div><div class="td w80 aleft p5x"><div id="fonddiv">'.$fonddiv.'</div></div></div>';
				$routput.='<div class="tr"><div class="td w20 bgc acenter p5x b">RUSMARC</div><div class="td w80 aleft p5x"><div id="rusmdiv">'.$rstr.'</div></div></div>';
				$output.='</div>';
				$routput.='</div>';
				$foutput.='</div>';
				if($link!="")
				{
					$linkstr.='
					<div class="table w100">
						<div class="tr w100">
							<div class="td w20 bge acenter p5x b">См.</div>
							<div class="td w80 aleft p5x">
								<p><a class="red b" target="_blank" href="'.$link.'">'.$link.'</a></p>
							</div>
						</div>
					</div>';
				}
				if($seelinks!="")
				{
					$lstr.='
					<div class="table w100" id="incdiv" style="display:none">
						<div class="tr w100">
							<div class="td w20 bge acenter p5x b">Включает:</div>
							<div class="td w80 aleft p5x">
								<div id="alinkss"><div class="progress small"><div></div></div></div>
							</div>
						</div>
					</div>';
				}
			}
			if($res2 !==false)
			{
				$output.='<div class="table w100" id="opis'.$theid.'">';
				$routput.='<div class="table w100" id="RUSM'.$theid.'">';
				$foutput.='<div class="table w100" id="full'.$theid.'">';
				$output.='<div class="tr"><div class="td w20 bge acenter p5x b">Входит в:</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$routput.='<div class="tr"><div class="td w20 bge acenter p5x b">Входит в:</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$foutput.='<div class="tr"><div class="td w20 bge acenter p5x b">Входит в:</div><div class="td w80 aleft p5x b">'.$fondtitle.'</div></div>';
				$output.='<div class="tr"><div class="td w20 bge acenter p5x b">Название</div><div class="td w80 aleft p5x b">'.$opistitle.'</div></div>';
				$foutput.=$fstr.'</div></div>';
				$output.='<div class="tr"><div class="td w20 bgc acenter p5x b">Описание</div><div class="td w80 aleft p5x"><div id="opisdiv">'.$opisdiv.'</div></div></div>';
				$routput.='<div class="tr"><div class="td w20 bgc acenter p5x b">RUSMARC</div><div class="td w80 aleft p5x"><div id="rusmdiv">'.$rstr.'</div></div></div>';
				$routput.='</div>';
				$foutput.='</div>';
				$output.='</div>';
				if($link!="")
				{
					$linkstr.='
					<div class="table w100">
						<div class="tr w100">
							<div class="td w20 bge acenter p5x b">См.</div>
							<div class="td w80 aleft p5x">
								<p><a class="red b" target="_blank" href="'.$link.'">'.$link.'</a></p>
							</div>
						</div>
					</div>';
				}
				if($seelinks!="")
				{
					$lstr.='<div class="table w100" id="incdiv" style="display:none"><div class="tr w100"><div class="td w20 bge acenter p5x b">Включает:</div><div class="td w80 aleft p5x"><div id="alinkss"><div id="alinkss"><div class="progress small"><div></div></div></div></div></div></div></div>';
				}
			}
			$output.='</div>';
			$routput.='</div>';
			$foutput.='</div>';
			if($seelinks!="")
			{
				$soutput.='<script> registrOnloadFunctions(function(){showItemС("'.$coltype.'","'.htmlspecialchars($seelinks, ENT_QUOTES).'");}); </script>';
			}
		}
		echo '<div id="common_output">'.$foutput.''.$routput.''.$output.''.$linkstr.''.$lstr.''.$soutput.'</div>';
		echo '<div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="1" width="100"/></div>';
	}
}
else
{
	include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
	echo $globaloutput;
	include (THEINCLUDESPATH.'/errorpage.php');
}
echo '</div></div>';
include (THEPAGESPATH.'/includes/'.$particle.'footer.php');
?>
