/*рубрикатор*/

function colorize(o)/*подсветка узлов и переход к поиску*/
{
	if(o.className=="colorized")
		o.className="decolorize";
	else
		o.className="colorized";
	searchWithRubricator();
}

function openBranches()/*раскрытие помеченных узлов рубрикатора после поиска*/
{
	if(take('rubricator').n!=null)
	{
		var arr=_rubricator.split('[END]');
		for(var i=0; i<arr.length; i++)
		{
			var obj=take('rub_'+arr[i]).n;
			obj.className='colorized';
			var par=obj.parentNode.parentNode;
			displayNode(par);
		}
	}
}

function displayNode(o)
{
	o.style.display="";
	if(o.id!="rubricator")
	{
		if((o.previousSibling)&&(o.previousSibling.nodeType==1))
		{
			o.previousSibling.className='folder_';
			o.previousSibling.title='Свернуть';
		}
		displayNode(o.parentNode);
	}
	else
		return;
}

function searchWithRubricator()/*поиск с рубрикатором*/
{
	typework="search";
	lockedfilters="";
	var handler=modules["search"].directory+'/search.php';
	var str="";
	var showstr="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.7.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_start",0]);
	querylist.push(["start",0]);
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	var outfrm=outform;
	var ndb=numDB;
	if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
		ndb=_iddb;
	if(typeof dbs[ndb].outform!="undefined")
		outfrm=dbs[ndb].outform;
	querylist.push(["$outform",outfrm]);
	querylist.push(["outformList[0]/outform",outfrm]);
	querylist.push(["outformList[1]/outform","LINEORD"]);
	if(outfrm=="SHORTFM")
	{
		querylist.push(["outformList[2]/outform","SHORTFMS"]);
		querylist.push(["outformList[3]/outform","SHORTFMSTR"]);
	}
	swfterm=str;
	//str=brackets(str);
	var term="";
	//term=prepareTerm(str);
	var flaghist=false;
	if(take('rubricator').n!=null)
	{
		var arr=take('rubricator').getsign('a',{className:'colorized'});
		if(arr.length>0)
		{
			var rstr="";
			var rsstr="<i>Рубрикатор</i> ";
			var rtstr="";
			if(typeof dbs[ndb]["rubricator"] != "undefined")
				rtstr=dbs[ndb]["rubricator"]+" ";
			else
			{
				rtstr=take('rub_label').n.value+" ";
				ndb=numdbBIBL;
				flaghist=true;
			}
			for(var i=0; i<arr.length; i++)
			{
				rstr+=replaceSymb(arr[i].id.substring(arr[i].id.indexOf('_')+1));
				//rtstr+="'"+replaceSymb(arr[i].innerHTML)+"'";
				rtstr+=replaceSymb(arr[i].innerHTML);
				rsstr+=replaceSymb(arr[i].innerHTML);
				if(i<arr.length-1)
				{
					rstr+='[END]';
					rsstr+=' И ';
					//rtstr+=' OR ';
					rtstr+=' AND ';
				}
			}
			querylist.push(["$rubricator",rstr]);
			if(!flaghist)
			{
				querylist.push(["$rshowstr",prepareShowstring(rsstr)]);
			}
			//swfterm='[bracket]'+swfterm+'[/bracket]';
			//swfterm+=' AND [bracket]'+rtstr+'[/bracket]';
			//term='('+term+')';
			//term+=' AND ('+rtstr+')';
			swfterm+='[bracket]'+convertbrackets(replaceSlash(brackets(rtstr)))+'[/bracket]';
			term+=brackets(rtstr);
			if(flaghist)
			{
				str=swfterm;
				showstr=prepareShowstring(rsstr);
			}
		}
	}
	if(term!="")
	{
		querylist.push(["_showstr",showstr]);
		querylist.push(["_str",str]);
		querylist.push(["iddb",ndb]);
		querylist.push(["query/body",term]);
		querylist.push(["query/params[0]/name","presence"]);
		querylist.push(["query/params[0]/value","INCLUDE"]);
		if(!flaghist)
			querylist.push(["_history","yes"]);
		if(typeof _localiddb!="undefined")
			gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
		else
			gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
		callToRCP(gArr);
	}
}

function searchCLR2(o)/*поиск по рубрикатору из подробного вывода для проекта Нематериальное наследик*/
{
	typesearch="combined";
	livsrc=null;
	livlabel="";
	showtext=o.lastChild.innerHTML;
	showrubterm=o.id+'*';
	simpleSearch(take('rub_label').n.value);
}

/*конец рубрикатор*/