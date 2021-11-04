<html>
<?php
set_time_limit(100);

$serverHost = getenv ("HTTP_HOST");
$folderName="wlib";
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
$dirname=dirname(__FILE__);
$array = explode($osSlash,$dirname);
$len = count($array);
$folderName=$array[$len-5];

$ID="";
$AH="";
$LFR="";
$str="";
$showstr="";
$numDB="5";
$action="SEARCH";
$termarr=array();
$showarr=array();


if(isset($_GET['action']))
{
	if($_GET['action']!="")
		$action=$_GET['action'];
}
if(isset($_POST['action']))
{
	if($_POST['action']!="")
		$action=$_POST['action'];
}
if(isset($_GET['iddb']))
{
	if($_GET['iddb']!="")
		$numDB=$_GET['iddb'];
}
if(isset($_POST['iddb']))
{
	if($_POST['iddb']!="")
		$numDB=$_POST['iddb'];
}
if(isset($_GET['AH']))
{
	if($_GET['AH']!="")
		$AH=$_GET['AH'];
}
if(isset($_POST['AH']))
{
	if($_POST['AH']!="")
		$AH=$_POST['AH'];
}
if(isset($_GET['ID']))
{
	if($_GET['ID']!="")
		$ID=$_GET['ID'];
}
if(isset($_POST['ID']))
{
	if($_POST['ID']!="")
		$ID=$_POST['ID'];
}
if(isset($_POST['LFR']))
{
	if($_POST['LFR']!="")
		$LFR=addslashes($_POST['LFR']);
}
if(isset($_GET['LFR']))
{
	if($_GET['LFR']!="")
		$LFR=addslashes($_GET['LFR']);
}
if($AH!="")
{
	$AH=str_replace("'","\\\'",$AH);
	$AH=str_replace('"','\"',$AH);
	$AH=htmlentities($AH, ENT_NOQUOTES | ENT_IGNORE, "UTF-8");
	$termarr[] = "(AH ".$AH.")";
	$showarr[]=' <i>Везде по ключевым словам</i> '.$AH;
}
if($ID!="")
{
	$ID=str_replace("'","\\\'",$ID);
	$ID=str_replace('"','\"',$ID);
	$ID=htmlentities($ID, ENT_NOQUOTES | ENT_IGNORE, "UTF-8");
	$ID=addslashes($ID);
	$termarr[] = "(ID ".$ID.")";
	$showarr[]=' <i>Идентификатор</i> '.$ID;
}
if($LFR!="")
{
	$LFR=str_replace("'","\\\'",$LFR);
	$LFR=str_replace('"','\"',$LFR);
	$LFR=htmlentities($LFR, ENT_NOQUOTES | ENT_IGNORE, "UTF-8");
	$termarr[] = "(LFR '".$LFR."')";
	$showarr[]=' <i>Форма ресурса</i> '.$LFR;
}
if(is_array($termarr))
{
	$cn=count($termarr);
	if($cn > 0)
	{
		if($cn > 1)
		{
			$str=implode(' AND ',$termarr);
		}
		else
		{
			$str=$termarr[0];
		}
	}
}
if(is_array($showarr))
{
	$cn1=count($showarr);
	if($cn1 > 0)
	{
		if($cn1 > 1)
		{
			$showstr=implode(' И ',$showarr);
		}
		else
		{
			$showstr=$showarr[0];
		}
	}
}

$fgs=file_get_contents('http://'.$serverHost.'/request?_action=penter&_html=enter&_errorhtml=error4');


$data=<<<HERE
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Script-Type" content="text/javascript"/>
<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
<meta http-equiv="x-rim-auto-match" content="none" />
<meta name="format-detection" content="telephone=no" />
$fgs
<script src="/$folderName/$folderName/js/default/custom.js"></script>
<script src="/$folderName/$folderName/js/default/root.js"></script>
<link href="/$folderName/$folderName/css/default/controls.css" type="text/css" rel="stylesheet"/>
<link href="/$folderName/$folderName/css/default/layerwindow.css" type="text/css" />
<script>
function findInLocal()
{
	var str="$str";
	var showstr="$showstr";
	numDB="$numDB";
	var test="$str";
	var action="$action";
	if(test=="")
	{
		alert("Пустой запрос!");
		top.location="/$folderName/";
	}
	else
	{
		typework="search";
		typesearch="simple";
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","php"]);
		gArr.push(["_errorhtml","error1"]);
		if(numDB=="all")
		{
			typework="searchallbases";
			gArr.push(["_handler",modules["allbases"].directory+'/allbases.php']);
			querylist.push(["\$showstr",showstr]);
			querylist.push(["\$str",convertbrackets(str)]);
			var term=prepareTerm(str);
			for(var key in dbs)
			{
				if(dbs[key]["type"]!="AF")
				{
					if(key!="all")
					{
						if(typeof iddb[key])
						{
							querylist.push(["_service","STORAGE:opacfindd:FindSize"]);
							querylist.push(["_version","1.1.0"]);
							querylist.push(["session",numsean]);
							querylist.push(["iddb",key]);
							querylist.push(["query",term]);
							gArr.push(["querylist",prepareQueryString(querylist,key)]);
							querylist.length=0;
						}
					}
				}
			}
		}
		else
		{
			typework="search";
			var outfrm=outform;
			var ndb=numDB;
			if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
				ndb=_iddb;
			if(typeof dbs[ndb].outform!="undefined")
				outfrm=dbs[ndb].outform;
			if(action == "SEARCH")
			{
				gArr.push(["_handler",modules["search"].directory+"/search.php"]);
			}
			else
			{
				if(action == "NEWS")
				{
					gArr.push(["_handler",modules["search"].directory+"/_additional/newssiteadd.php"]);
				}
				if(action == "PUBLICATIONS")
				{
					gArr.push(["_handler",modules["search"].directory+"/_additional/publicationsadd.php"]);
				}
				if(action == "PHOTOS")
				{
					gArr.push(["_handler",modules["search"].directory+"/_additional/photos.php"]);
				}
			}
			querylist.push(["_service","STORAGE:opacfindd:FindView"]);
			querylist.push(["_version","2.5.0"]);
			querylist.push(["session",numsean]);
			querylist.push(["_start",0]);
			querylist.push(["start",0]);
			querylist.push(["\$length",portion]);
			querylist.push(["length",portion]);
			querylist.push(["\$showstr",showstr]);
			querylist.push(["\$str",convertbrackets(str)]);
			querylist.push(["\$outform",outfrm]);
			if(action == "SEARCH")
			{
				querylist.push(["\$outform",outfrm]);
				querylist.push(["outformList[0]/outform",outfrm]);
				querylist.push(["outformList[1]/outform","LINEORD"]);
			}
			else
			{
				if(action == "NEWS")
				{
					querylist.push(["\$outform","FULLNEWS"]);
					querylist.push(["outformList[0]/outform","FULLNEWS"]);
				}
				if(action == "PUBLICATIONS")
				{
					querylist.push(["\$outform","FULLPUB"]);
					querylist.push(["outformList[0]/outform","FULLPUB"]);
				}
				if(action == "PHOTOS")
				{
					querylist.push(["\$outform","FULLPHOTO"]);
					querylist.push(["outformList[0]/outform","FULLPHOTO"]);
				}
			}
			querylist.push(["iddb",numDB]);
			querylist.push(["_iddb",numDB]);
			querylist.push(["query/body",str]);
			gArr.push(["querylist",prepareQueryString(querylist,numDB)]);
		}
		callToRCP(gArr);
	}
}
</script>
</head>
<body onload="findInLocal();"><div id="loader"><div class="progress"><div></div></div></div></body>



HERE;



echo $data;
?>
</html>