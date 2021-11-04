<?php
	function OsIs($OS)
	{
		$tmp = php_uname();
		$tmp = strpos($tmp, $OS);
		if($tmp || $tmp === 0)
			return true;
		return false;
	}
	$osSlash='';
	if(OsIs('Linux'))
		$osSlash='/';
	else
		$osSlash='\\';
	$serverName = getenv ("SERVER_NAME");
	$serverAddr = getenv ("SERVER_ADDR");
	$serverPort = getenv ("SERVER_PORT");
	$hostName = getenv("HTTP_HOST");
	$dirname=dirname(__FILE__);
	$array = explode($osSlash,$dirname);
	$len = count($array);
	$folderName=$array[$len-2];
	$historyfolder='';
	//for($i=0; $i<$len-1; $i++)
	for($i=0; $i<$len-2; $i++)
	{
		$historyfolder.=$array[$i].'/';
	}
	function resPaginator($start,$length,$size,$s=NULL,$name)
	{
		$str='';
		$action='';
		$N1=ceil($size/$length);
		$N2=ceil($N1/10);
		$N3=ceil(($start+1)/$length);
		$N4=ceil($N3/10);
		$i1=($N4-1)*10+1;
		$N5=$N4*10;
		$i2;
		if($N1>$N5)
			$i2=$N4*10;
		else
			$i2=$N1;
		switch ($name)
		{
			case '0': $action.='See(null,null,null,';
			break;
			case '1': $action.='nextFh(';
			break;
			case '2': $action.='showOrderList(';
			break;
			case '3': $action.='showAllLists(';
			break;
			case '4': $action.='nextFp(';
			break;
			case '5': $action.='searchNewsSite(null,null,';
			break;
			case '6': $action.='searchPhoto(null,null,null,null,';
			break;
			case '7': $action.='searchNewRecs(null,null,';
			break;
			default: $action.='nextSearch(';
			break;
		}
		if($N4 > 1)
		{
			$str.='<a class="new1" href="javascript: '.$action.''.($N4-2).'*10 + 1';
			if(!is_null($s))
				$str.=','.$s;
			$str.=')"> </a>';
		}
		for(;$i1<=$i2; $i1++)
		{
			if($i1==$N3)
			{
				$str.='<span class="now">'.$i1.'</span>';
			}
			else
			{
				$str.='<a class="new" href="javascript:  '.$action.''.$i1;
				if(!is_null($s))
					$str.=','.$s;
				$str.=')">'.$i1.'</a>';
			}
		}
		if($N2 > $N4)
		{
			$str.='<a class="new2" href="javascript:  '.$action.''.$N4.'*10 + 1';
			if(!is_null($s))
				$str.=','.$s;
			$str.=')"> </a>';
		}
		return $str;
	}
	function prepareISBN($str)
	{
		//$from = array("978", "979", " ", "-");
		//$from = array(" ", "-");
		//return str_replace($from, "", $str);
		return $str;
	}
	function bookinfo($str)
	{
		$newstr = str_replace("\u0026", "&", $str);
		return json_decode($newstr);
	}
	function beginsWith($tmp, $strval)
	{
		return (substr($strval, 0, strlen($tmp))==$tmp);
	}
	function prepareJson($str)
	{
		$from = array("[%]", "[amp]", "\'", "\t");
		$to = array("%", "&", "\\\'", "&#09;");
		$newstr = str_replace($from, $to, $str);
		//echo "\n"."\n".$str."\n"."\n".$newstr."\n"."\n";
		return json_decode($newstr);
	}
	function deleteSymb($str)
	{
		$from = array("\"", "\'", "\\");
		$to = array("", "", "");
		$newstr = str_replace($from, $to, $str);
		return $newstr;
	}
	function parseBB($str)
	{
		$from = array("[quote]", "[/quote]","[b]", "[/b]", "[u]", "[/u]", "[br]", "[br/]", "[hr]", "[hr/]", "[div]", "[/div]", "[p]", "[/p]", "[ul]", "[/ul]", "[ol]", "[/ol]", "[li]", "[/li]", "[size=18]", "[size=20]", "[/size]", "[i]", "[/i]", "[indent]", "[/indent]", "[divshotformicons]", "[/divshotformicons]", "[IMG]","[/IMG]");
		$to = array("<blockquote>", "</blockquote>","<b>", "</b>", "<u>", "</u>", "<br/>", "<br/>", "<hr/>", "<hr/>", "<div>", "</div>", "<p>", "</p>", "<ul class=\"bbc\">", "</ul>", "<ol>", "</ol>", "<li>", "</li>", "<span class=\"size18\">", "<span class=\"size20\">", "</span>", "<i>", "</i>", "<span class=\"indent\">", "</span>", "<span style=\"display:none\">", "</span>", "<img src=\"", "\" class=\"imgadd\"/>");
		$newstr = str_replace($from, $to, $str);
		return $newstr;
	}
	function printResponseVars($str,$rn)
	{
		$newstr = "\n".'<script>'."\n";
		foreach ($str as $a => $v)
		{
			$r = strpos($a, 'result_'); 
			if($r === false)
			{
				if(is_string($v))
				{
					if(beginsWith('_',$a))
					{
						$newstr .= 'var '.$a.'="'.addslashes($v).'";'."\n";
						$f = strpos($a, '_flag45');
						if($f !== false)
							$GLOBALS['flag45']=1;
					}
				}
				$i = strpos($a, 'iddb_'); 
				if($i !== false)
				{
					if(isset($v->title))
						$rn.=$v->title;
				}
			}
		}
		$newstr .= '</script>'."\n";
		return array($newstr,$rn);
	}
	function showTree($tnode,$level,$fname)
	{
		if(($level!=1)&&($tnode->nodeName!='rubricator')&&($tnode->hasChildNodes()))
			echo '<div style="display:none">';
		for($i=0; $i<$tnode->childNodes->length; $i++)
		{ 
			$new_node = $tnode->childNodes->item($i);
			$cls='list';
			$tit='';
			if($new_node->hasChildNodes())
			{
				$cls='folder';
				$tit=' title="Развернуть" onmousedown="disPlay(this)"';
			}
			if($new_node->getAttribute('title'))
			{
				echo '<div class="'.$cls.'" style="margin-left:'.$level.'px"><span'.$tit.'><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" width="19" height="9"/></span><a id="rub_'.$new_node->getAttribute('count').'" class="decolorize" href="javascript:void(0)" onmousedown="colorize(this)">'.$new_node->getAttribute('title').'</a></div>';
			}
			showTree($new_node, $level+3, $fname);
		}
		if(($level!=1)&&($tnode->nodeName!='rubricator')&&($tnode->hasChildNodes()))
			echo '</div>';
	}
	function copyFile($to,$from)
	{
		if(file_exists($to))
		{
			if(!@copy($to, $from))
				die('</head><body><form id="frm"><img width="700" height="500" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/></form><script> var obj={_message_0: ["Не удалось скопировать файл '.$from.'!"],_action_1: [" "]};  WriteError(obj,"back")</script></body></html>');
		}
	}
	function createDirectory($directorypath)
	{
		if(!is_dir($directorypath)) 
		{
			if(!@mkdir($directorypath))
			{
				die(' </head><body><form id="frm"><img width="700" height="500" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/></form><script> var obj={_message_0: ["Не удалось создать  директорию '.$directorypath.'!"],_action_1: [" "]};  WriteError(obj,"back")</script></body></html>');
			}
		}
	}
	function writeFile($filepath,$str)
	{
		if(!@$file = fopen($filepath,'w+'))
		{
			die('var obj={_message_0: ["Ошибка открытия файла '.$filepath.'"],_action_1: [" "]};');
		}
		else
		{
			fputs($file, $str) || die('var obj={_message_0: ["Не удалось записать данные в файл '.$filepath.'"],_action_1: [" "]};');
			fclose ($file);
		}
	}
	function my_mb_ucfirst($str)
	{
		$fc = mb_strtoupper(mb_substr($str, 0, 1, 'UTF-8'), 'UTF-8');
		return $fc.mb_substr($str, 1, mb_strlen($str, 'UTF-8'), 'UTF-8');
	}
?>