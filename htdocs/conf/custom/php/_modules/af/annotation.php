<?php
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div id="infor"><div class="col_title">';
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	$iddbtitle='Аннотация: ';
	if(isset($response0->_iddbtitle))
		$iddbtitle='<u>АФ '.$response0->_iddbtitle.'</u> '.$iddbtitle;
	$globaloutput.='<span class="caption">'.$iddbtitle.'</span><span id="termin">'.$response0->_showstr.'</span></div>';
	if(isset($response0->result_0->AFHEADFORM_0->id))
	{
		$start=intval($response0->_start);
		$andor=$response0->_andor;
		$label=$response0->_label;
		$query=$response0->_query;
		$iddb=$response0->_iddbaf;
		$fromaftobibl=$response0->_fromaftobibl;
		$viewOptions=$response0->_viewOptions;
		$returntolist="";
		if(isset($response0->_returntolist))
			$returntolist=addslashes($response0->_returntolist);
		$biblid="";
		if(isset($response0->_biblid))
			$biblid=addslashes($response0->_biblid);
		$globaloutput.='<div id="searchhead">';
		if($biblid!="")
			$globaloutput.='<div class="fright"><input type="button" class="button2" value="Вернуться к записи" onmousedown="addSee();"/></div>';
		$globaloutput.='<div class="fleft">';
		if($returntolist!="")
			$globaloutput.='<input type="button" class="button2" value="Вернуться к списку" onmousedown="findInAf(1);"/>';
		$globaloutput.='<input type="button" class="button2" value="Искать в каталоге" onmousedown="searchFromAfToBibl();" style="visibility:hidden" id="fromaftobibl"/><div id="menu1" style="display: none"><div class="andor"><div class="select4"><img onmousedown="showOptions(this,\'andor_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="log"/>';
		if(intval($andor)==0)
			$globaloutput.='<span onmousedown="showOptions(this.previousSibling,\'andor_div\')" class="OR" id="andor">ИЛИ</span>';
		else
			$globaloutput.='<span onmousedown="showOptions(this.previousSibling,\'andor_div\')" class="AND" id="andor">И</span>';
		$globaloutput.='</div></div></div></div><div class="spacer"></div></div><div class="col_content"><div id="srezults">';
		$globaloutput.='<div class="inside" id="'.$response0->result_0->AFHEADFORM_0->id.'">';
		$count=0;
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_');
			if($res !== false)
			{
				$check="";
				if(isset($value->AFHEADFORM_0))
				{
					$globaloutput.='<p class="aftitle"><input type="checkbox" class="addbox" id="'.$fromaftobibl.'" name="'.$fromaftobibl.'" value="'.$value->AFHEADFORM_0->id.'" onclick="putTerms(this)"/><b>'.$value->AFHEADFORM_0->title.'</b>';
					if(isset($value->AFHEADFORM_0->originalTermin))
					{
						$pmterm=$value->AFHEADFORM_0->originalTermin.'[MeSH Terms]';
						$globaloutput.='<a style="margin-left:80px" target="_blank" href="//www.ncbi.nlm.nih.gov/pubmed/?term='.urlencode($pmterm).'">Искать в PubMed</a>';
						if(isset($_POST['_auth']))
						{
							$ebscoterm='(MH '.$value->AFHEADFORM_0->originalTermin.')';
							$globaloutput.='&#160;&#160;&#160;&#160;<a target="_blank" href="//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='.urlencode($ebscoterm).'">Искать в EBSCO</a>';
						}
					}
					$globaloutput.='</p>';
				}
				foreach ($value as $arg => $val)
				{
					$res1 = strpos($arg, 'AFANNOT');
					if($res1!==false)
					{
						$use="";
						$mode="";
						$action="";
						foreach ($val as $name => $v)
						{
							$count++;
							if($name=="use")
								$use=$v;
							if($name=="mode")
								$mode=$v;
							if($name=="action")
								$action=$v;
							if($name=="title")
								$globaloutput.='<p><b>'.$v.'</b></p>';
							$res2 = strpos($name, 'entries_');
							if($res2!==false)
							{
								$globaloutput.='<p class="afsmall">';
								if(($use=="search")||($use=="insert"))
								{
									if(isset($v->id))
										$globaloutput.='<input type="checkbox" class="addbox" id="'.$fromaftobibl.'" name="'.$fromaftobibl.'" value="'.$v->id.'" onclick="putTerms(this)"/>';
									else
										$globaloutput.='- ';
								}
								else
								{
									$globaloutput.='- ';
								}
								$globaloutput.=$v->text.'</p>';
							}
							$res3 = strpos($name, 'references_');
							if($res3!==false)
							{
								$globaloutput.='<p class="afsmall">';
								if(($use=="search")||($use=="insert"))
								{
									if(isset($v->id))
										$globaloutput.='<input type="checkbox" class="addbox" id="'.$fromaftobibl.'" name="'.$fromaftobibl.'" value="'.$v->id.'" onclick="putTerms(this)"/>';
									else
										$globaloutput.='- ';
								}
								else
								{
									$globaloutput.='- ';
								}
								if(isset($v->blocked))
								{
									$globaloutput.=$v->title;
									if(($use=="search")||($use=="insert"))
									{
										$globaloutput.='<span class="afsearchimg" onmousedown="searchTerm(this.parentNode)" title="Искать в каталоге"></span>';
									}
								}
								elseif(isset($v->id)&&($mode=="direct"))
								{
									$globaloutput.='<span class="afbig" id="'.$v->id.'"><input id="'.$count.'" type="hidden" name="'.$fromaftobibl.'"  value="'.$v->id.'"/><span title="Аннотация" onmousedown="getAnnotation(this.parentNode,null,null,1)">'.$v->title.'</span><span class="afsearchimg" onmousedown="searchTerm(this.parentNode.parentNode.parentNode.firstChild)" title="Искать в каталоге"></span></span>';
								}
								elseif(isset($v->query)&&($mode=="indirect")&&($action=="mesh3"))
								{
									$trtitle="";
									if($v->title == $v->query)
										$trtitle="см. значение термина";
									else
										$trtitle=$v->title;
									$globaloutput.='<span class="afbig"><span title="Дерево" onmousedown="seeMeshTree(this,\''.$v->label.'\',\''.$v->query.'\',null,'.$start.')"> '.$trtitle.'</span></span>';
								}
								else
								{
									$globaloutput.='<span style="text-decoration:line-through">'.$v->title.'</span>';
								}
								if(isset($v->originalTermin))
								{
									$pmterm=$v->originalTermin.'[MeSH Terms]';
									$globaloutput.='<a style="margin-left:80px" target="_blank" href="//www.ncbi.nlm.nih.gov/pubmed/?term='.urlencode($pmterm).'">Искать в PubMed</a>';
									if(isset($_POST['_auth']))
									{
										$ebscoterm='(MH '.$v->originalTermin.')';
										$globaloutput.='&#160;&#160;&#160;&#160;<a target="_blank" href="//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='.urlencode($ebscoterm).'">Искать в EBSCO</a>';
									}
								}
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
		}
		$globaloutput.='</div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" width="100" height="5"/></div></div></div></div>';
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
