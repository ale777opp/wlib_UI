<?php
require_once(THEINCLUDESPATH.'/functions.php'); 
$globaloutput='<div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div><div id="infor"><div class="col_title">';
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	$iddbtitle='Список: ';
	if(isset($response0->_iddbtitle))
		$iddbtitle='АФ '.$response0->_iddbtitle;
	$listtype="";
	$listname="";
	if(isset($response0->_listtype))
	{
		$listtype=$response0->_listtype;
		if($listtype=="permutation")
			$listname=' Пермутационный список: ';
		else
			$listname=' Алфавитный список: ';
	}
	$globaloutput.='<span class="caption"><u>'.$iddbtitle.'</u>.'.$listname.'</span><span id="termin">'.$response0->_showstr.'</span></div>';
	if(isset($response0->result_0->id))
	{
		$start=intval($response0->_start);
		$size=0;
		if(isset($response0->size))
			$size=intval($response0->size);
		$length=15;
		if(isset($response0->_length))
			$length=intval($response0->_length);
		$response0=$result->response_0;
		$andor=$response0->_andor;
		$label=$response0->_label;
		$fromaftobibl=$response0->_fromaftobibl;
		$query=$response0->_query;
		$iddb=$response0->_iddbaf;
		$viewOptions=$response0->_viewOptions;
		$biblid="";
		if(isset($response0->_biblid))
			$biblid=addslashes($response0->_biblid);
		$returntolist="";
		if(isset($response0->_returntolist))
			$returntolist=addslashes($response0->_returntolist);
		$endvoc=false;
		if(isset($response0->end))
			$endvoc=true;
		$globaloutput.='<div id="searchhead"><div class="fright">';
		if ($listtype=="permutation")
		{
			$N1=ceil($size/$length);
			if($N1!= 1)
			{
				$globaloutput.='<p class="pages">'.resPaginator($start,$length,$size,NULL,'4').'</p>';
			}
		}
		else
		{
			if(isset($response0->_skipFirst))
			{
				if(isset($response0->_fromnexttree))
					$globaloutput.='<input id="rback" type="button" class="button2" value="&#8249; Назад" onmousedown="previousTree();"/>';
				else
				{
					if($query!="")
						$globaloutput.='<input id="rback" type="button" class="button2" value="&#8249; Назад" onmousedown="previousSearchAlfabetAuth();"/>';
				}
			}
			if(!$endvoc)
			{
				if(isset($response0->_fromnexttree))
					$globaloutput.='<input id="rfor" type="button" class="button2" value="Далее &#8250;" onmousedown="nextTree(\''.$response0->next_0->start.'\');"/>';
				else
					$globaloutput.='<input id="rfor" type="button" class="button2" value="Далее &#8250;" onmousedown="nextSearchAlfabetAuth();"/>';
			}
		}
		if($biblid!="")
			$globaloutput.='<input type="button" class="button2" value="Вернуться к записи" onmousedown="addSee();"/>';
		$globaloutput.='</div><div class="fleft">';
		if((isset($response0->_fromnexttree))&&($returntolist!=""))
			$globaloutput.='<input type="button" class="button2" value="Вернуться к списку" onmousedown="findInAf(1);"/>';
		$globaloutput.='<input type="button" class="button2" value="Искать в каталоге" onmousedown="searchFromAfToBibl();" style="visibility:hidden" id="fromaftobibl"/><div id="menu1" style="display: none"><div class="andor"><div class="select4"><img onmousedown="showOptions(this,\'andor_div\')" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" border="0" hspace="0" vspace="0" alt="" title="" class="log"/>';
		if(intval($andor)==0)
			$globaloutput.='<span onmousedown="showOptions(this.previousSibling,\'andor_div\')" class="OR" id="andor">ИЛИ</span>';
		else
			$globaloutput.='<span onmousedown="showOptions(this.previousSibling,\'andor_div\')" class="AND" id="andor">И</span>';
		$globaloutput.='</div></div>';
		if(isset($response0->_indxterms))
		{
			$arr=explode('[END]', $response0->_indxterms);
			$size = count($arr);
			for($j=0; $j < $size; $j++)
				$globaloutput.='<code style="display:none" id="'.substr($arr[$j],0,strpos($arr[$j],'|')).'">'.substr($arr[$j],strpos($arr[$j],'|')+1).'</code>';
		}
		$globaloutput.='</div></div>';
		$globaloutput.='<div class="spacer"></div></div><div class="col_content"><div id="srezults">';
		$count=-1;
		$lastterm="";
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_');
			if($res !== false)
			{
				$count++;
				$flag="";
				$globaloutput.='<div class="searchrez" align="left" id="d_'.$count.'">';
				if(isset($arr))
				{
					for($i=0; $i < $size; $i++)
					{
						if(substr($arr[$i],0,strpos($arr[$i],'|'))=='_'.($start+$count))
						{
							$flag='checked="checked"';
							break;
						}
					}
				}
				$title="";
				$annot="";
				$synonyms="";
				$subject="";
				$language="";
				$otherlanguage="";
				$links="";
				$meshcodes="";
				$meshcount=0;
				$searchterm=$value->id;
				$pubmed="";
				$ebsco="";
				$level=0;
				if(isset($value->level))
					$level=intval($value->level);
				$hasNextLevel=false;
				$mainlevel=false;
				$searchbox="";
				if($viewOptions=="meshNewTree")
				{
					if($fromaftobibl=="COD")
					{
						if(isset($value->AFSHORTFORM_0->meshCodes_0))
							$searchterm=$value->AFSHORTFORM_0->meshCodes_0->query.'*';
					}
				}
				$searchbox='<input '.$flag.' id="'.($start+$count).'" type="checkbox" class="addbox" name="'.$fromaftobibl.'" value="'.$searchterm.'" onclick="putTerms(this)"/>';
				$globaloutput.='<div style="margin: 5px 0px 0px 25px" id="'.$value->id.'">';
				if(isset($value->isSyn))
				{
					foreach ($value->AFSHORTFORM_0 as $arg => $val)
					{
						$res1 = strpos($arg, 'title_');
						if($res1 !== false)
						{
							$tsize = count($val);
							for($i=0; $i < $tsize; $i++)
							{
								$title.='<code>'.$val[$i].'</code> </span>';
								$lastterm=htmlspecialchars($val[$i]);
							}
						}
						if($arg == "subject")
						{
							$subject.='<span> ('.$val.') </span>';
						}
						if($arg=="language")
						{
							$language.='<span> Язык: '.$val.' </span>';
						}
						if($arg=="originalTermin")
						{
							$pmterm=$val.'[MeSH Terms]';
							$pubmed.='<a target="_blank" href="//www.ncbi.nlm.nih.gov/pubmed/?term='.urlencode($pmterm).'">Искать в PubMed</a>';
							if(isset($_POST['_auth']))
							{
								$ebscoterm='(MH '.$val.')';
								$ebsco.='&#160;&#160;&#160;&#160;<a target="_blank" href="//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='.urlencode($ebscoterm).'">Искать в EBSCO</a>';
							}
						}
						$res2 = strpos($arg, 'synonyms_');
						if($res2 !== false)
						{
							$ssize = count($val);
							for($i=0; $i < $ssize; $i++)
								$synonyms.='<div style="margin-left:55px;text-decoration:none !important;cursor:default" class="afbig">'.$val[$i].'<span  onmousedown="searchTerm(this.parentNode.parentNode.firstChild)" title="Искать в каталоге" class="afsearchimg"></span><span class="afannotimg"  title="Аннотация" onmousedown="getAnnotation(this.parentNode.parentNode)"></span></div>';
						}
					}
				}
				else
				{
					foreach ($value->AFSHORTFORM_0 as $arg => $val)
					{
						$res1 = strpos($arg, 'title_');
						if($res1 !== false)
						{
							$tsize = count($val);
							for($i=0; $i < $tsize; $i++)
							{
								$text="";
								if(isset($value->key))
									$text=$value->key;
								else
								{
									if(isset($value->title))
									$text=$value->title;
								}
								$title.=$val[$i].'</span><span title="Искать в каталоге" onmousedown="searchTerm(this.parentNode)" class="afsearchimg"></span>';
								$lastterm=htmlspecialchars($text);
								$annot.='<span class="afannotimg" title="Аннотация" onmousedown="getAnnotation(this.parentNode.parentNode)"></span>';
							}
						}
						if($arg == "subject")
						{
							$subject.='<span> ('.$val.') </span>';
						}
						if($arg=="language")
						{
							$language.='<span> Язык: '.$val.' </span>';
						}
						if($arg=="originalTermin")
						{
							$pmterm=$val.'[MeSH Terms]';
							$pubmed.='<a target="_blank" href="//www.ncbi.nlm.nih.gov/pubmed/?term='.urlencode($pmterm).'">Искать в PubMed</a>';							
							if(isset($_POST['_auth']))
							{
								$ebscoterm='(MH '.$val.')';
								$ebsco.='&#160;&#160;&#160;&#160;<a target="_blank" href="//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='.urlencode($ebscoterm).'">Искать в EBSCO</a>';
							}
						}
						$res2 = strpos($arg, 'synonyms_');
						if($res2 !== false)
						{
							$ssize = count($val);
							for($i=0; $i < $ssize; $i++)
								$synonyms.='<p class="afsmall" style="margin-left:25px">- '.$val[$i].'</p>';
						}
					}
				}
				foreach ($value->AFSHORTFORM_0 as $arg => $val)
				{
					if($arg=="seeOtherLanguage")
					{
						$otherlanguage.='<p onmousedown="seeAlsoOtherLanguage(this.parentNode)" class="afbig"> См. также на другом языке </p>';
					}
					$res3 = strpos($arg, 'links_');
					if($res3 !== false)
					{
						$links.='<span onmousedown="seeAlso(this.parentNode.parentNode,\''.$val->code.'\')"  class="afbig"> '.$val->abridgement.' ('.$val->count.')</span> ';
					}
					$res4 = strpos($arg, 'meshCodes');
					if($res4 !== false)
					{
						if(isset($val->hasNextLevel))
							$hasNextLevel=true;
						if(!isset($val->main))
						{
							$meshcodes.='<div class="afbig"><span title="Дерево" onmousedown="seeMeshTree(this,\''.$val->label.'\',\''.$val->query.'\',null,'.$start.')">'.$val->title.'</span><span class="afsearchimg" title="Искать в каталоге" onmousedown="searchTerm(\''.$val->query.'*\')"></span></div>';
							$mainlevel=false;
						}
						else
							$mainlevel=true;
						$meshcount++;
					}
				}
				if($title!="")
				{
					$globaloutput.='<p class="aftitle" style="margin-left: '.($level*30).'px;">'.$searchbox;
					if($meshcount>0)
					{
						if($meshcount==1)
						{
							if((!$mainlevel)&&($hasNextLevel))
							{
								$globaloutput.='<span class="afplusimg" title="Дерево" onmousedown="seeTreeM(this,\'add'.$count.''.$val->query.'\',\''.$val->label.'\',\''.$val->query.'\',\''.$val->query.'\',0)">';
							}
							elseif(($mainlevel)&&($hasNextLevel))
							{
								$globaloutput.='<span class="afplusimg" title="Дерево" onmousedown="seeTreeM(this,\'add'.$count.''.$val->query.'\',\''.$val->label.'\',\''.$val->query.'\',\''.$val->query.'\',0)">';
							}
							else
								$globaloutput.='<span class="afbulletimg">';
						}
						else
						{
							$globaloutput.='<span class="afbulletimg">';
						}
					}
					else 
						$globaloutput.='<span class="b">';
					$globaloutput.=$title;
					if($subject!="")
						$globaloutput.=$subject;
					if($language!="")
						$globaloutput.=$language;
					if($annot!="")
						$globaloutput.=$annot;
					if($pubmed!="")
						$globaloutput.=$pubmed;
					if($ebsco!="")
						$globaloutput.=$ebsco;
					$globaloutput.='</p>';
					if($meshcount>0)
					{
						if($meshcount==1)
						{
							$globaloutput.='<div style="display:none;margin-left: '.($level*30+8).'px;" id="add'.$count.''.$val->query.'"></div>';
						}
						else
						{
							$globaloutput.='<div style="margin-left: '.($level*30+55).'px;padding: 0px" class="afbig" title="см. другие значения термина" onmousedown="showHideM(this.nextSibling,this)">см. другие значения термина</div><div style="margin-left: '.($level*30+75).'px;" class="meshcodesdisplay" id="add'.$count.''.$val->query.'">'.$meshcodes.'</div><br/>';
						}
					}
				}
				if($synonyms!="")
				{
					$globaloutput.=$synonyms;
				}
				if($links!="")
				{
					$globaloutput.='<p>'.$links.'</p>';
				}
				if($otherlanguage!="")
				{
					$globaloutput.=$otherlanguage;
				}
				$globaloutput.='</div></div>';
			}
		}
		$globaloutput.='</div></div>';
		$globaloutput.='<script>var _lastterm="'.$lastterm.'";</script><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" width="100" height="5"/></div></div>';
	}
	else
	{
		$globaloutput.='<div class="acenter f80 lh80"><br/><br/><div class="b">По Вашему запросу ничего не найдено.</div></div></div>';
	}
}
else
{
	$globaloutput.='<span class="caption">Список: </span></div><div class="acenter f80 lh80"><br/><br/><div class="b">По Вашему запросу ничего не найдено.</div></div></div>';
}
include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>
