/*------------------------------------ поиск в АФ ---------------------------------------*/

function nextSearchAlfabetAuth()/*алфавитный список далее*/
{
	
	var howmuch=parseInt(_length,10);
	var start=1;
	if(typeof _start!="undefined")
		start=parseInt(_start,10)+howmuch;
	_query=_skipFirst=_lastterm;
	_firstterm=_firstterm+'[END]'+_query;
	searchAlfabetAuth(null,null,null,_label,_query,_firstterm,start);
}

function previousSearchAlfabetAuth(num)/*алфавитный список назад*/
{
	var howmuch=portion;
	if(typeof _length != "undefined")
		howmuch=parseInt(_length,10);
	var term="";
	var fterm="";
	var start=1;
	var label="";
	if(typeof _start!="undefined")
		start=parseInt(_start,10)-howmuch;
	if(typeof _firstterm!="undefined")
	{
		var arr=_firstterm.split('[END]');
		if(arr.length>1)
			arr.pop();
		var newstr=arr[arr.length-1];
		var fterm=arr.join('[END]');
		term=_query=_skipFirst=newstr;
	}
	if(typeof _term!="undefined")
		term=_term;
	searchAlfabetAuth(null,null,null,_label,term,fterm,start);
}

function searchAlfabetAuth(o,title,db,lab,term,fterm,start)/*алфавитный список*/
{
	typework="search";
	var indxterms="";
	var fraftobibl=fromaftobibl[0];
	var treeview="";
	if(typeof _treeview != "undefined")
		treeview=_treeview;
	if(typeof term=="undefined")
		term="";
	if((o!=null)&&(typeof o!="undefined"))
	{
		term=o.innerHTML;
		treeview="";
	}
	var length=portion;
	var viewoptions="useSearchableRef";
	var labname="";
	if((db==null)||(typeof db=="undefined"))
	{
		db=numDB;
	}
	if(typesearch == "professional")
	{
		typesearch = "authority";
	}
	if((typeof dbs[db] !="undefined")&&(typeof dbs[db].afrubricator !="undefined")&&(parseInt(dbs[db].afrubricator,10)>2))
	{
		if(typeof dbs[db].labels["SHM"]!="undefined")
		{
			lab="SHM";/*для иерархического вывода*/
			labname="Рубрики верхнего уровня";/*для иерархического вывода*/
		}
		if(typeof prefind=="undefined")
			fraftobibl='COD';
		length=50;
		viewoptions="meshNewTree";
	}
	else
	{
		if(typeof lab=="undefined")
			lab=take('itemaf').n.parentNode.previousSibling.lastChild.lastChild.className.substring(1);
		if((typeof dbs[db]["labels"]!="undefined")&&(typeof dbs[db]["labels"][lab]!="undefined"))
			labname=dbs[db]["labels"][lab][0];
		if((term=="")&&(take('itemaf').n.value!=""))
			term=take('itemaf').n.value;
	}
	if(lab=="")
	{
		var arr=dbs[db]["labels"];
		for(var key in arr)
		{
			lab=key;
		}
		labname=dbs[db]["labels"][lab][0];
	}
	var showstr=prepareStr('<span><i>'+labname+'</i> '+term+'</span>');
	showstr=prepareShowstring(showstr);
	term=convertbrackets(term);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["letter"].directory+'/letter.php']);
	querylist.push(["_service","STORAGE:opacafd:List"]);
	querylist.push(["_version","1.3.0"]);
	/*querylist.push(["_version","1.0.0"]);*/
	querylist.push(["mode","alpha"]);
	querylist.push(["label",lab]);
	querylist.push(["$returntolist",term]);
	querylist.push(["$query",term]);
	querylist.push(["query",prepareTerm(term)]);
	querylist.push(["$listtype","letter"]);
	querylist.push(["$label",lab]);
	if(typeof start=="undefined")
		start=1;
	querylist.push(["$start",start]);
	if((typeof fterm!="undefined")&&(start>1))
	{
		querylist.push(["$skipFirst","true"]);
		querylist.push(["skipFirst","true"]);
		querylist.push(["$firstterm",fterm]);
		indxterms=prepareIndxTerms();
	}
	else
		querylist.push(["$firstterm",term]);
	if(indxterms!="")
		querylist.push(["$indxterms",indxterms]);
	querylist.push(["session",numsean]);
	querylist.push(["$length",length]);
	querylist.push(["length",length]);
	querylist.push(["iddb",db]);
	querylist.push(["$iddbaf",db]);
	if(title==null)
	{
		if(typeof _iddbtitle!="undefined")
			title=_iddbtitle;
		else
			title=dbs[db].alias;
	}
	querylist.push(["$iddbtitle",title]);
	querylist.push(["$typesearch",typesearch]);
	querylist.push(["$showstr",showstr]);
	querylist.push(["$vocobj","itemaf"]);
	querylist.push(["$andor","AND"]);
	querylist.push(["$fromaftobibl",fraftobibl]);
	querylist.push(["nextLevel","true"]);
	querylist.push(["viewOptions[0]",viewoptions]);
	querylist.push(["$viewOptions",viewoptions]);
	if(treeview != "")
		querylist.push(["$treeview","yes"]);
	gArr.push(["querylist",prepareQueryString(querylist,db)]);
	callToRCP(gArr);
}

function nextFp(c)/*пермутационный список вперед*/
{
	var howmuch=_length;
	var startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
	if(parseInt(dbs[_iddbaf].afrubricator,10)>0)
		simpleSearchAF(null,null,_label,_query,_body,startfrom);
	else
		vocsearchInAF(_label,_query,startfrom);
}

function previoussimpleSearchAF()/*пермутационный список назад*/
{
	var start=1;
	if(typeof _start!="undefined")
		start=parseInt(_start,10);
	if(start<1)
		start=1;
	simpleSearchAF(null,null,_label,_query,null,start);
}

function simpleSearchAF(title,db,lab,term,fterm,start)/*пермутационный список*/
{
	typework="search";
	typesearch = "authority";
	var flagfirst=false;
	if(typeof _body!="undefined")
	{
		if(fterm==0)
			fterm=_body;
	}
	if((db==null)||(typeof db=="undefined"))
	{
		db=numDB;
	}
	if(typeof term=="undefined")
	{
		term=take('itemaf').n.value;
		if(term=="")
		{
			if(parseInt(dbs[db].afrubricator,10)>1)
			{
				searchAlfabetAuth();
			}
			else
			{
				alert('Неверно задано поисковое предписание!');
			}
			return;
		}
	}
	if(title==null)
	{
		if(typeof _iddbtitle!="undefined")
			title=_iddbtitle;
		else
			title=dbs[db].alias;
	}
	if(typeof lab=="undefined")
	{
		lab=take('labs_div_'+db).tags('div')[0].className.substring(1);
	}
	var length=portion;
	var viewoptions="useSearchableRef";
	var indxterms="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["letter"].directory+'/letter.php']);
	querylist.push(["_service","STORAGE:opacafd:Find"]);
	querylist.push(["_version","1.3.0"]);
	/*querylist.push(["_version","1.0.0"]);*/
	querylist.push(["iddb",db]);
	querylist.push(["$iddbaf",db]);
	querylist.push(["$iddbtitle",title]);
	querylist.push(["session",numsean]);
	var fraftobibl=fromaftobibl[0];
	if(lab!="ID")
	{
		if(parseInt(dbs[db].afrubricator,10)>2)
		{
			if(typeof prefind=="undefined")
				fraftobibl='COD';
			viewoptions="meshNewTree";
			querylist.push(["nextLevel","true"]);
		}
		else
		{
			lab=take('itemaf').n.parentNode.previousSibling.lastChild.lastChild.className.substring(1);
		}
	}
	querylist.push(["length",length]);
	querylist.push(["$length",length]);
	querylist.push(["$viewOptions",viewoptions]);
	querylist.push(["viewOptions[0]",viewoptions]);
	if((typeof fterm=="undefined")||(fterm==null))
	{
		if(typeof fterm=="undefined")
			flagfirst=true;
		term=convertbrackets(term);
		term=prepareStr(term);
		term=replaceSlash(term);
		if(typeof prefind=="undefined")
		{
			fterm=lab+' '+term;
		}
		else
			fterm=term;
		if(lab=='ID')
			fterm=lab+' '+term;
	}
	else
	{
		indxterms=prepareIndxTerms();
		if(indxterms!="")
			querylist.push(["$indxterms",indxterms]);		
	}
	querylist.push(["$body",fterm]);
	querylist.push(["$label",lab]);
	querylist.push(["$fromaftobibl",fraftobibl]);
	if(typeof start=="undefined")
		start=1;
	if(start > 1)
		querylist.push(["start",start]);
	if((typeof _biblid!="undefined")&&(arguments.length>0))
		querylist.push(["$biblid",replaceSymb(_biblid)]);
	if((typeof _str!="undefined")&&(arguments.length>0))
		querylist.push(["$str",replaceSymb(_str)]);
	var showstr="";
	if((typeof _iddbbibl!="undefined")&&(arguments.length>0))
	{
		querylist.push(["$iddbbibl",_iddbbibl]);
		showstr='<span><i>Код</i> '+term+'</span>';
	}
	else
	{
		if(!flagfirst)
		{
			if(typeof _ftitle !="undefined")
				firstterm=_ftitle;
		}
		showstr='<span><i>'+dbs[db]["labels"][lab][0]+'</i> '+firstterm+'</span>';
	}
	querylist.push(["$ftitle",replaceSymb(firstterm)]);
	querylist.push(["$returntolist",fterm]);
	showstr=prepareShowstring(showstr);
	querylist.push(["$start",start]);
	querylist.push(["$vocobj","itemaf"]);
	querylist.push(["$query",term]);
	querylist.push(["$showstr",showstr]);
	var andor=0;
	if(take('andor').n!=null)
	{
		if(take('andor').n.className=="AND")
			andor=1;
		else
			andor=0;
	}
	querylist.push(["$andor",andor]);
	querylist.push(["$typesearch","authority"]);
	querylist.push(["$listtype","permutation"]);
	querylist.push(["query/body",prepareTerm(fterm)]);
	querylist.push(["query/label","s1"]);
	querylist.push(["query/mode","wordSet"]);
	firstterm="";
	gArr.push(["querylist",prepareQueryString(querylist,db)]);
	callToRCP(gArr);
}

function seeTreeM(o,c,l,q,pq,ll,k)/*запрос на рубрики в виде дерева*/
{
	typework="";
	treeobj=c;
	var plus=take(treeobj).n.previousSibling.firstChild;
	if(plus.nodeName.toLowerCase()=='input')
		plus=plus.nextSibling;
	if(take(treeobj).n.style.display=='none')
	{
		if(take(treeobj).n.innerHTML=='')
		{
			take(treeobj).n.innerHTML='<div class="progress small"><div></div></div>';
			var length=1000;
			var viewoptions="useSearchableRef";
			if(parseInt(dbs[numDB].afrubricator,10)>2)
			{
				viewoptions="meshNewTree";
			}
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			querylist.push(["_service","STORAGE:opacafd:View"]);
			querylist.push(["_version","1.7.0"]);
			/*querylist.push(["_version","1.3.0"]);*/
			querylist.push(["session",numsean]);
			querylist.push(["label",l]);
			querylist.push(["length",length]);
			querylist.push(["iddb",numDB]);
			querylist.push(["mode","meshtree"]);
			querylist.push(["query",q]);
			querylist.push(["$lastquery",pq]);
			querylist.push(["$level",ll]);
			var fraftobibl=fromaftobibl[0];
			if(parseInt(dbs[numDB].afrubricator,10)>2)
			{
				if(typeof prefind=="undefined")
					fraftobibl='COD';
			}
			querylist.push(["$fromaftobibl",fraftobibl]);
			//if(typeof _treeview == "undefined")
			//{
				querylist.push(["nextLevel","true"]);
			//}
			querylist.push(["viewOptions[0]",viewoptions]);
			gArr.push(["querylist",prepareQueryString(querylist)]);
			if(typeof _treeview == "undefined")
				ajaxToRCP(gArr,openTree);
			else
			{
				if(typeof k != "undefined")
				{
					querylist.push(["viewOptions[1]","upNode"]);
					querylist.push(["nextLevel","true"]);
					ajaxToRCP(gArr,openTreeView,pathactrcp,null,openTreeView,100);
				}
				else
				{
					ajaxToRCP(gArr,openTreeView);
				}
			}
		}
		plus.className='afminusimg';
		take(treeobj).show();
	}
	else
	{
		take(treeobj).hide();
		plus.className='afplusimg';
	}
}

function nextSeeTreeM(o,c,l,q,m,ll)/*запрос на рубрики в виде дерева следующая порция*/
{
	typework="";
	treeobj=c;
	o.parentNode.removeChild(o);
	var length=50;
	var viewoptions="useSearchableRef";
	if(parseInt(dbs[numDB].afrubricator,10)>2)
	{
		viewoptions="meshNewTree";
	}
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
		gArr.push(["_html","stat"]);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.7.0"]);
	/*querylist.push(["_version","1.3.0"]);*/
	querylist.push(["session",numsean]);
	querylist.push(["label",l]);
	querylist.push(["length",length]);
	querylist.push(["iddb",numDB]);
	querylist.push(["mode","meshtree"]);
	if(typeof m!="undefined")
	{
		querylist.push(["start",q]);
		querylist.push(["query",m]);
		querylist.push(["$lastquery",m])
		querylist.push(["skipFirst","true"]);
	}
	else
	{
		querylist.push(["query",q]);
		querylist.push(["$lastquery",q])
	}
	querylist.push(["$level",ll]);
	querylist.push(["viewOptions[0]",viewoptions]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,openTree);
}

function openTree(x)/*отображение рубрик в виде дерева*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		delLayerWin();
		WriteError(error);
	}
	else
	{
		var cont=take(treeobj);
		cont.n.innerHTML='';
		if(((typeof _listtype!="undefined")&&(_listtype!="letter"))&&(typeof _mlabel!="undefined")&&(_mlabel=="COD")||(typeof _fromnexttree!="undefined"))
		{
			var par=cont.n.parentNode.parentNode;
			var k=parseInt(par.id.substring(2),10)+1;
			if(!isNaN(k))
			{
				var arr=take('srezults').getsign('div',{align:'left'});
				var len=arr.length
				for(var i=k; i<len; i++)
				{
					par.parentNode.removeChild(arr[i]);
				}
			}
		}
		var query=response[0]._next_0._query;
		var label=response[0]._next_0._label;
		var start=replaceSymb(response[0]._next_0._start);
		var endvoc=false;
		var llevel=parseInt(_level,10);
		if(typeof response[0]._end!="undefined")
			endvoc=true;
		for(arg in response[0])
		{
			if(arg.indexOf('result_')!=-1)
			{
				var value=response[0][arg];
				var level=value._level;
				var ind=value._id;
				var vquery=ind;
				var clevel=parseInt(level,10);
				var nlevel=parseInt(llevel,10)+1;
				var count=0;
				var pubmed="";
				var ebsco="";
				if(typeof value._AFSHORTFORM_0._originalTermin!="undefined")
				{
					pubmed=value._AFSHORTFORM_0._originalTermin+"[MeSH Terms]";
					if(typeof _auth!="undefined")
					{
						ebsco="(MH "+value._AFSHORTFORM_0._originalTermin+")";
					}
				}
				var arr=[];
				var title=value._AFSHORTFORM_0._title_0[0];
				var hasNextLevel = "0";
				for (prop in value._AFSHORTFORM_0)
				{
					if(prop.indexOf('meshCodes_')!=-1)
					{
						var v=value._AFSHORTFORM_0[prop];
						if(typeof v._hasNextLevel!="undefined")
							hasNextLevel = "1";
						else
							hasNextLevel = "0";
						if(_fromaftobibl=="COD")
							vquery=v._query+'*';
						if((_lastquery!=v._query)&&(query!=v._query))
						{
							if(typeof v._main=="undefined")
							{
								arr.push([v._label,v._query,title,hasNextLevel,vquery]);
								start=v._query;
								count++;
							}
						}
					}
				}
				if(count>0)
				{
					var div=cont.create('div',{style:{margin:'0px 0px 0px 45px',padding:'0px'}});
					var p=div.create('div',{className:'aftitle',id:ind,style:{margin:'0px',padding:'0px'}});
					p.create('input',{type:'checkbox',className:arr[0][2],name:_fromaftobibl,value:arr[0][4],onclick:'function(){putTerms(this);}'});
					if(arr[0][3]=="1")
					{
						p.create('span',{className:'afplusimg',title:'Дерево',onmousedown:'function(){seeTreeM(this,"add'+arr[0][1]+'_'+count+'","'+arr[0][0]+'","'+arr[0][1]+'","'+_lastquery+'","'+level+'");}',textNode:title});
					}
					else
					{
						p.create('span',{className:'afbulletimg',textNode:title});
					}
					p.create('span',{className:'afsearchimg',title:'Искать в каталоге',onmousedown:'function(){searchTerm(this.parentNode);}'});
					p.create('span',{className:'afannotimg',title:'Аннотация',onmousedown:'function(){getAnnotation(this.parentNode);}'});
					if(pubmed!="")
						p.create('a',{target:'_blank',href:'//www.ncbi.nlm.nih.gov/pubmed/?term='+encodeURIComponent(pubmed),textNode:'Искать в PubMed'});
					if(ebsco!="")
						p.create('a',{target:'_blank',href:'//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='+encodeURIComponent(ebsco),textNode:'Искать в EBSCO', style:{marginLeft:'20px'}});
					div.create('div',{id:'add'+arr[0][1]+'_'+count,style:{display:'none'}});
				}
			}
		}
		if(!endvoc)
		{
			var s=cont.create('span',{title:'Далее',className:'nexttr',onmousedown:'function(){nextSeeTreeM(this,"'+treeobj+'","'+label+'","'+start+'","'+query+'","'+llevel+'");}'});
			s.create('span',{textNode:'Далее',className:'nexttree'});
		}
	}
}

function getAnnotation(o,l,db,num)/*аннотация*/
{
	var lab="";
	var ind="";
	var query="";
	if((typeof l!="undefined")&&(l!=null))
		lab=l;
	else
		lab=_label;
	if(typeof o!="string")
	{
		ind=o.id;
		if(typeof(_query)!="undefined")
			query=replaceSlash(_query);
	}
	else
	{
		ind=o;
		query=replaceSlash(o);
	}
	if(typeof _handler != "undefined")
		vocsearchInAF('ID',ind);
	else
	{
		if((typeof db!="undefined")&&(db!=null))
			iddbbibl=db;
		else
		{
			if(typeof _iddbbibl!="undefined")
				iddbbibl=_iddbbibl;
		}
		typework="search";
		vocobj="itemaf";
		typesearch="authority";
		var handler=modules["annotation"].directory+'/annotation.php';
		//if(typeof handler!="undefined")		
		var viewoptions="useSearchableRef";
		if((typeof dbs[numDB]!="undefined")&&(parseInt(dbs[numDB].afrubricator,10)>2))
		{
			viewoptions="meshNewTree";
		}
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","php"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",handler]);
		querylist.push(["_service","STORAGE:opacafd:View"]);
		querylist.push(["_version","1.7.0"]);
		/*querylist.push(["_version","1.3.0"]);*/
		querylist.push(["session",numsean]);
		if(typeof _iddbaf!="undefined")
			numDB=_iddbaf;
		querylist.push(["$iddbaf",numDB]);
		if(typeof _iddbtitle!="undefined")
			querylist.push(["$iddbtitle",_iddbtitle]);
		var len=portion;
		var start=1;
		if(typeof _length!="undefined")
			len=parseInt(_length,10);
		if(typeof _start!="undefined")
			start=parseInt(_start,10)+len;
		if(((typeof _listtype!="undefined")&&(_listtype=="permutation"))||((typeof num !="undefined")&&(num!=null)))
			querylist.push(["$start",_start]);
		else
			querylist.push(["$start",start]);
		querylist.push(["$length",len]);
		querylist.push(["$label",lab]);
		querylist.push(["$fromaftobibl",fromaftobibl[0]]);
		querylist.push(["$query",query]);
		querylist.push(["$vocobj",vocobj]);
		querylist.push(["$andor","AND"]);
		if(typeof _listtype=="undefined")
			_listtype="permutation";
		querylist.push(["$listtype",_listtype]);
		querylist.push(["iddb",numDB]);
		querylist.push(["id",ind]);
		querylist.push(["mode","annotation"]);
		if(typeof _mode!="undefined")
			querylist.push(["$mode",_mode]);
		if(typeof _biblid!="undefined")
			querylist.push(["$biblid",replaceSymb(_biblid)]);
		var showstr=prepareStr(_showstr);
		if(iddbbibl!="")
		{
			querylist.push(["$iddbbibl",iddbbibl]);
			showstr=prepareStr('<span><i>Код</i> '+query+'</span>');
		}
		if((typeof _returntolist!="undefined")&&(_returntolist!=""))
		{
			querylist.push(["$returntolist",replaceSlash(_returntolist)]);	
		}
		showstr=prepareShowstring(showstr);
		if(typeof _str!="undefined")
		{
			var str=prepareStr(_str);
			str=replaceSymb(str);
			querylist.push(["$str",str]);
		}
		querylist.push(["$showstr",showstr]);
		querylist.push(["$typesearch",typesearch]);
		if(typeof _firstterm!="undefined")
		{
			if(typeof num=="undefined")
				querylist.push(["$firstterm",prepareStr(_firstterm)+"[END]"]);
			else
				querylist.push(["$firstterm",prepareStr(_firstterm)]);
		}
		if(typeof _ftitle!="undefined")
			querylist.push(["$ftitle",replaceSymb(_ftitle)]);
		if(typeof _skipFirst!="undefined")
			querylist.push(["$skipFirst","true"]);
		querylist.push(["$viewOptions",viewoptions]);
		querylist.push(["viewOptions[0]",viewoptions]);
		if(iddbbibl!="")
			gArr.push(["querylist",prepareQueryString(querylist,dbs[iddbbibl].afsearch)]);
		else
			gArr.push(["querylist",prepareQueryString(querylist)]);
		callToRCP(gArr);
	}
}

function seeAlso(o,c,cp,cv)/*ссылка см.также*/
{
	typework="search";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["tree"].directory+'/tree.php']);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.7.0"]);
	/*querylist.push(["_version","1.3.0"]);*/
	querylist.push(["session",numsean]);
	querylist.push(["$iddbaf",_iddbaf]);
	if(typeof _iddbtitle!="undefined")
		querylist.push(["$iddbtitle",_iddbtitle]);
	querylist.push(["$label",_label]);
	querylist.push(["$fromaftobibl",fromaftobibl[0]]);
	querylist.push(["$andor",0]);
	querylist.push(["$vocobj",vocobj]);
	querylist.push(["$start",1]);
	querylist.push(["$length",_length]);
	querylist.push(["iddb",numDB]);
	querylist.push(["id",o.id]);
	querylist.push(["mode","see"]);
	querylist.push(["$query",replaceSymb(_query)]);
	if(c!=null)
		querylist.push(["codes[0]",c]);
	else
	{
		if(typeof cp != "undefined")
			querylist.push(["codes[0]/codePos",cp]);
		if(typeof cv != "undefined")
			querylist.push(["codes[0]/codeVal",cv]);
	}
	querylist.push(["$typesearch",typesearch]);
	querylist.push(["$listtype",_listtype]);
	if(typeof _mode!="undefined")
		querylist.push(["$mode",_mode]);
	if(typeof _biblid!="undefined")
		querylist.push(["$biblid",replaceSymb(_biblid)]);
	var showstr=prepareStr(_showstr);
	if(typeof _iddbbibl!="undefined")
	{
		querylist.push(["$iddbbibl",_iddbbibl]);
		showstr=prepareStr('<span><i>Код</i> '+_query+'</span>');
	}
	//else
	//{
		if((typeof _returntolist!="undefined")&&(_returntolist!=""))
		{
			querylist.push(["$returntolist",replaceSymb(_returntolist)]);	
		}
		//showstr=prepareStr(_showstr);
	//}
	showstr=prepareShowstring(showstr);
	querylist.push(["$showstr",showstr]);
	if(typeof _str!="undefined")
	{
		var str=prepareStr(_str);
		str=replaceSymb(str);
		querylist.push(["$str",str]);
	}
	var viewoptions="useSearchableRef";
	if(parseInt(dbs[numDB].afrubricator,10)>2)
		viewoptions="meshNewTree";
	querylist.push(["$viewOptions",viewoptions]);
	querylist.push(["viewOptions[0]",viewoptions]);
	if(typeof _iddbbibl!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,dbs[_iddbbibl].afsearch)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function seeAlsoOtherLanguage(o,c)/*ссылка см.также на другом языке*/
{
	typework="search";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["tree"].directory+'/tree.php']);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.7.0"]);
	/*querylist.push(["_version","1.3.0"]);*/
	querylist.push(["session",numsean]);
	querylist.push(["$iddbaf",numDB]);
	if(typeof _iddbtitle!="undefined")
		querylist.push(["$iddbtitle",_iddbtitle]);
	querylist.push(["$label",_label]);
	querylist.push(["$fromaftobibl",fromaftobibl[0]]);
	querylist.push(["$vocobj",vocobj]);
	querylist.push(["$start",1]);
	querylist.push(["$length",_length]);
	querylist.push(["$query",replaceSymb(_query)]);
	querylist.push(["$andor",0]);
	querylist.push(["iddb",numDB]);
	querylist.push(["id",o.id]);
	querylist.push(["mode","seeOtherLanguage"]);
	if(typeof c != "undefined")
		querylist.push(["codes[0]",""]);
	querylist.push(["$typesearch",typesearch]);
	querylist.push(["$listtype",_listtype]);
	if(typeof _mode!="undefined")
		querylist.push(["$mode",_mode]);
	if(typeof _biblid!="undefined")
		querylist.push(["$biblid",replaceSymb(_biblid)]);
	var showstr=prepareStr(_showstr);
	if(typeof _iddbbibl!="undefined")
	{
		querylist.push(["$iddbbibl",_iddbbibl]);
		showstr=prepareStr('<span><i>Код</i> '+_query+'</span>');
	}
	//else
	//{
		if((typeof _returntolist!="undefined")&&(_returntolist!=""))
		{
			querylist.push(["$returntolist",replaceSymb(_returntolist)]);	
		}
		//showstr=prepareStr(_showstr);
	//}
	showstr=prepareShowstring(showstr);
	querylist.push(["$showstr",showstr]);
	if(typeof _str!="undefined")
	{
		var str=prepareStr(_str);
		str=replaceSymb(str);
		querylist.push(["$str",str]);
	}
	var viewoptions="useSearchableRef";
	if(parseInt(dbs[_iddbaf].afrubricator,10)>2)
		viewoptions="meshNewTree";
	querylist.push(["$viewOptions",viewoptions]);
	querylist.push(["viewOptions[0]",viewoptions]);
	if(typeof _iddbbibl!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,dbs[_iddbbibl].afsearch)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function seeMeshTree(o,l,q,skip,start,mterm)/*дерево MeSH*/
{
	typework="search";
	var length=50;
	var viewoptions="meshNewTree";
	var handler=modules["letter"].directory+'/letter.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.7.0"]);
	/*querylist.push(["_version","1.3.0"]);*/
	querylist.push(["session",numsean]);
	if(typeof start=="undefined")
		start=1;
	querylist.push(["$start",start]);
	querylist.push(["$iddbaf",numDB]);
	if(typeof _iddbtitle!="undefined")
		querylist.push(["$iddbtitle",_iddbtitle]);
	querylist.push(["$label",_label]);
	if(vocobj!="")
		querylist.push(["$vocobj",vocobj]);
	querylist.push(["$mlabel",l]);
	querylist.push(["label",l]);
	//querylist.push(["$fromaftobibl","COD"]);
	querylist.push(["$fromaftobibl",fromaftobibl[0]]);
	querylist.push(["length",length]);
	querylist.push(["$length",length]);
	querylist.push(["iddb",numDB]);
	querylist.push(["mode","meshtree"]);
	if(((typeof skip!="undefined")&&(skip!=null))&&(start>1))
	{
		querylist.push(["$skipFirst","true"]);
		querylist.push(["skipFirst","true"]);
	}
	if((typeof skip!="undefined")&&(skip!=null))
		querylist.push(["$mterm",skip]);
	else
		querylist.push(["$mterm",q]);
	if(typeof mterm!="undefined")
		querylist.push(["start",mterm]);
	querylist.push(["query",q]);
	querylist.push(["$code",q]);
	querylist.push(["$query",replaceSymb(_query)]);
	querylist.push(["$andor",0]);
	querylist.push(["$typesearch",typesearch]);
	if(typeof _listtype != "undefined")
		querylist.push(["$listtype",_listtype]);
	if(typeof _firstterm!="undefined")
		querylist.push(["$firstterm",_firstterm]);
	if(typeof _mode!="undefined")
		querylist.push(["$mode",_mode]);
	if(typeof _biblid!="undefined")
		querylist.push(["$biblid",replaceSymb(_biblid)]);
	var showstr=prepareStr(_showstr);
	if(typeof _iddbbibl!="undefined")
	{
		querylist.push(["$iddbbibl",_iddbbibl]);
		showstr=prepareStr('<span><i>Код</i> '+_query+'</span>');
	}
	//else
	//{
		if((typeof _returntolist!="undefined")&&(_returntolist!=""))
		{
			querylist.push(["$returntolist",replaceSymb(_returntolist)]);	
		}
		//showstr=prepareStr(_showstr);
	//}
	showstr=prepareShowstring(showstr);
	querylist.push(["$showstr",showstr]);
	if(typeof _str!="undefined")
	{
		var str=prepareStr(_str);
		str=replaceSymb(str);
		querylist.push(["$str",str]);
	}
	querylist.push(["$fromnexttree","1"]);
	querylist.push(["$viewOptions",viewoptions]);
	querylist.push(["viewOptions[0]",viewoptions]);
	if(typeof _iddbbibl!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,dbs[_iddbbibl].afsearch)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function previousTree()/*дерево MeSH назад*/
{
	var start=1;
	if(typeof _start!="undefined")
		start=parseInt(_start,10)-30;
	if(start<1)
		start=1;
	var arr=_mterm.split('[END]');
	arr.pop();
	var newstr=arr[arr.length-1];
	_mterm=arr.join('[END]');
	seeMeshTree(null,_mlabel,_code,_mterm,start,newstr);
}

function nextTree(l)/*дерево MeSH вперед*/
{
	var start=1;
	if(typeof _start!="undefined")
		start=parseInt(_start,10)+30;
	_mterm=_mterm+'[END]'+l;
	seeMeshTree(null,_mlabel,_code,_mterm,start,l);
}

function searchAF(o)/*поиск в АФ из библиографии*/
{
	typework="";
	var term="";
	var label="";
	var label1="";
	var searchtype="list";
	if(typesearch=="authority")
	{
		term=take('itemaf').n.value;
		label = label1 = take('itemaf').n.parentNode.previousSibling.lastChild.lastChild.className.substring(1);
		if(typeof prefind != "undefined")
		{
			if(label1 == "AH")
				label1 = "SH";
		}
	}
	else
	{
		term=take('itemprof').n.value;
		label = label1 = take('itemprof').n.parentNode.previousSibling.lastChild.lastChild.className.substring(1);
	}
	if(typeof o == "undefined")
	{
		searchtype="find";
		if(term=="")
		{
			alert("Неверно задано поисковое предписание!");
			return;
		}
	}
	term=replaceSymb(term);
	term=brackets(term);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.7.0"]);
	/*querylist.push(["_version","1.1.0"]);*/
	querylist.push(["session",numsean]);
	querylist.push(["searchType",searchtype]);
	querylist.push(["mode","searchfrombibl"]);
	querylist.push(["term",term]);
	querylist.push(["label",label1]);
	querylist.push(["$term",term]);
	querylist.push(["$label",label]);	
	querylist.push(["iddb",numdbBIBL]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	var arg={};
	arg.target=self;
	arg.cls='loader';
	showLayerWin('loaderwin',arg);
	ajaxToRCP(gArr,openAuthWin);
}

function openAuthWin(x)/*окно поиска в АФ из библиографии*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		delLayerWin();
		WriteError(error);
	}
	else
	{
		delLayerWin();
		var count=0;
		var cont=take('main');
		var continner=cont.create('div',{id:'continner',style:{display:'none'}});
		var adb="";
		var alab="";
		var aterm="";
		var sterm="";
		var body="";
		var title="";
		var flag=false;
		for(arg in response[0])
		{
			var value=response[0][arg];
			if(arg.indexOf('_afList_')!=-1)
			{
				if(typeof value._empty=="undefined")
				{
					var cls='searchrez1';
					if((count % 2)==0)
						cls='searchrez';
					adb=value._iddb;
					if((typeof numdbAF!="undefined")&&(adb!=numdbAF))
					{
						alab=value._label;
						aterm=value._query;
						title=value._title;
						var div=continner.create('div',{className:cls});
						div.create('input',{type: 'hidden', id:'af_'+adb, name: alab, value: aterm});
						div.create('u',{title: 'перейти', textNode: title,className:'big',onmousedown:'function(){searchAlfabetAuth(null,\"'+title+'\",\"'+adb+'\",\"'+alab+'\",\"'+aterm+'\");}'});
						count++;
						flag=false;
					}
				}
			}
			if(arg.indexOf('_prefind_')!=-1)
			{
				if(value._size!="0")
				{
					var cls='searchrez1';
					if((count % 2)==0)
						cls='searchrez';
					adb=value._iddb;
					if((typeof numdbAF!="undefined")&&(adb!=numdbAF))
					{
						title=value._title;
						aterm=value._query_0._body;
						alab=_label;
						firstterm=_term;
						var div=continner.create('div',{className:cls});
						div.create('input',{type: 'hidden', id:'af_'+adb, name: alab, value: aterm});
						div.create('u',{title: 'перейти', textNode: title,className:'big',onmousedown:'function(){simpleSearchAF(\"'+title+'\",\"'+adb+'\",\"'+alab+'\",\"'+aterm+'\");}'});
						count++;
						flag=true;
					}
				}
			}
		}
		if(count==1)
		{
			if(typesearch == "professional")
			{
				_label=alab;
				_iddb=adb;
				_term=aterm;
			}
			if(flag)
				simpleSearchAF(title,adb,alab,aterm);
			else
				searchAlfabetAuth(null,title,adb,alab,aterm);				
		}
		else
		{
			var arg={};
			arg.cls='dialog2';
			arg.message='ЕАФ';
			arg.target=self;
			arg.width='500';
			arg.height='400';
			showLayerWin('authwin',arg);
			var doc=take('authwinform');
			doc.n.innerHTML="";
			if(count==0)
			{
				doc.create('p',{textNode:'По вашему запросу ничего не найдено.', style:{font: 'normal 10pt Verdana', textAlign: 'center'}});
			}
			else
			{
				doc.n.appendChild(take('continner').n);
			}
			take('continner').show();
		}
	}
}

function nextFindInAf()/*поиск в АФ определитель алф. и перм. списков вперед*/
{
	var start=1;
	if(typeof _start!="undefined")
		start=parseInt(_start,10)+portion;
	_query=_skipFirst=_lastterm;
	_firstterm=_firstterm+'[END]'+_query;
	findInAf(_iddbtitle,_iddbaf,_label,_query,_firstterm,start);
}

function previousFindInAf()/*поиск в АФ определитель алф. и перм. списков назад*/
{
	var start=1;
	if(typeof _start!="undefined")
		start=parseInt(_start,10)-portion;
	if(start<1)
		start=1;
	var arr=_firstterm.split('[END]');
	arr.pop();
	var newstr=arr[arr.length-1];
	var fterm=arr.join('[END]');
	_query=_skipFirst=newstr;
	findInAf(_iddbtitle,_iddbaf,_label,_query,fterm,start);
}

function findInAf(o)/*поиск в АФ определитель алф. и перм. списков*/
{
	if(parseInt(dbs[numDB].afrubricator,10)>0)
	{
		if(typeof o=="number")
		{
			if((typeof _listtype!="undefined")&&(_listtype=="permutation"))
				previoussimpleSearchAF();
			else
				previousSearchAlfabetAuth(1);
		}
		else
		{
			if(typeof prefind != "undefined")
				searchAF(o);
			else
			{
				if(typeof o =="object")
					searchAlfabetAuth();
				else
					simpleSearchAF();
			}
		}
	}
	else
	{
		vocsearchInAF();
	}
}

function getAfList(o)/*предварительный поиск по всем АФ из библиографии*/
{
	typework="";
	var val=o.nextSibling.value;
	var num=val.substring(val.indexOf('[NUM]')+5,val.indexOf('[/NUM]'));
	var i1=val.substring(val.indexOf('[I1]')+4,val.indexOf('[/I1]'));
	var i2=val.substring(val.indexOf('[I2]')+4,val.indexOf('[/I2]'));
	var value=val.substring(val.indexOf('[VALUE]')+7,val.indexOf('[/VALUE]'));
	if(value.indexOf('$2')!=-1)
		value=value.substring(0,value.indexOf('$2'));
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.0.0"]);
	/*querylist.push(["_version","1.7.0"]);*/
	querylist.push(["session",numsean]);
	querylist.push(["mode","fieldToQuery"]);
	querylist.push(["field/i1",i1]);
	querylist.push(["field/i2",i2]);
	querylist.push(["field/num",num]);
	querylist.push(["$iddbbibl",numDB]);
	var tmp=/\\{1,}/g;
	if(tmp.test(value))
		value=value.replace(tmp,'\\');
	querylist.push(["field/value",value]);
	gArr.push(["querylist",prepareQueryString(querylist,numdbAF)]);
	var arg={};
	arg.target=self;
	arg.cls='loader';
	showLayerWin('loaderwin',arg);
	ajaxToRCP(gArr,openAfListWin);
}

function openAfListWin(x)/*окно предварительного поиска по всем АФ из библиографии*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		delLayerWin();
		WriteError(error);
	}
	else
	{
		var count=0;
		var cont=take('main');
		var continner=null;
		if(take('continner').n!=null)
		{
			continner=take('continner');
			continner.n.innerHTML="";
		}
		else
			continner=cont.create('div',{id:'continner',style:{display:'none'}});
		var adb="";
		var atitle="";
		var abody="";
		var alab="";
		var aterm="";
		for(arg in response[0])
		{
			var value=response[0][arg];
			if(arg.indexOf('_prefind_')!=-1)
			{
				if(value._size!="0")
				{
					var cls='searchrez1';
					if((count % 2)==0)
						cls='searchrez';
					adb=value._iddb;
					atitle=value._title;
					abody=value._query_0._body;
					alab=value._query_0._parsed_0._label;
					aterm=value._query_0._parsed_0._content;
					var tmp=/\\{1,}/g;
					if(tmp.test(aterm))
						aterm=aterm.replace(tmp,'\\');
					var div=continner.create('div',{className:cls});
					div.create('input',{type: 'hidden', id:'af_'+adb, name:alab, value:aterm});
					//div.create('u',{textNode:atitle,className:'big',onclick:'function(){findAnnotation(\"'+atitle+'\",\"'+adb+'\",\"'+alab+'\",\"'+replaceSymb(aterm)+'\",\"'+_iddbbibl+'\");}'});
					div.create('u',{title: 'перейти', textNode: atitle,className:'big',onmousedown:'function(){simpleSearchAF(\"'+atitle+'\",\"'+adb+'\",\"'+alab+'\",\"'+replaceSymb(aterm)+'\");}'});
					count++;
				}
			}
		}
		if(count==1)
		{
			simpleSearchAF(atitle,adb,alab,replaceSymb(aterm));
		}
		else
		{
			delLayerWin();
			var arg={};
			arg.cls='dialog2';
			arg.message='ЕАФ';
			arg.target=self;
			arg.width='500';
			arg.height='400';
			showLayerWin('authwin',arg);
			var doc=take('authwinform');
			doc.n.innerHTML="";
			if(count==0)
			{
				doc.create('p',{textNode:'По вашему запросу ничего не найдено.', style:{font: 'normal 10pt Verdana', textAlign: 'center'}});
			}
			else
			{
				doc.n.appendChild(take('continner').n);
			}
			take('continner').show();
		}
	}
}

function vocsearchInAF(l,t,c,r)/*вывод словаря*/
{
	typework="search";
	typesearch = "authority";
	var apos="'";
	var renew="";
	if(typeof l == "undefined")
		l = take('itemaf').n.parentNode.previousSibling.lastChild.lastChild.className.substring(1);
	if(typeof t == "undefined")
	{
		t=take('itemaf').n.value;
		apos="";
	}
	if(typeof r != "undefined")
	{
		renew="yes";
	}
	var term=prepareStr(t);
	term=replaceSymb(term);
	var query=term;
	term="("+l+" "+apos+""+term+""+apos+")";
	if(dbs[numDB].type!="AF")
		numDB=numdbf;
	var showstr=prepareStr('<i>'+dbs[numDB]["labels"][l][0]+'</i> '+t);
	showstr=prepareShowstring(showstr);
	if(l == 'ID')
	{
		if(typeof _showstr != "undefined")
			showstr=_showstr;
	}
	var start=0;
	if((typeof c != "undefined")&&(c!=null))
		start=c;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["annotshort"].directory+'/annotshort.php']);
	querylist.push(["_service","STORAGE:opacafd:Find"]);
	querylist.push(["_version","1.3.0"]);
	/*querylist.push(["_version","1.0.0"]);*/
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numDB]);
	querylist.push(["start",start]);
	querylist.push(["length",portion]);
	var title=dbs[numDB].alias
	if(typeof _iddbtitle!="undefined")
		title=_iddbtitle;
	querylist.push(["$iddbtitle",title]);
	querylist.push(["$fromaftobibl",fromaftobibl[0]]);
	querylist.push(["$length",portion]);
	querylist.push(["$start",start]);
	querylist.push(["$showstr",showstr]);
	querylist.push(["$label",l]);
	querylist.push(["$body",term]);
	querylist.push(["$query",query]);
	querylist.push(["$handler","annotshort"]);
	querylist.push(["$typesearch","authority"]);
	if(renew != "")
		querylist.push(["$renew","yes"]);
	querylist.push(["query/body",term]);
	querylist.push(["query/label","s1"]);
	querylist.push(["query/outforms[0]","BLOCK856"]);
	querylist.push(["query/outforms[1]","AFTITLE"]);
	querylist.push(["query/outforms[2]","SYNONYMS"]);
	querylist.push(["query/outforms[3]","BLOCK300"]);
	querylist.push(["query/outforms[4]","BLOCK305"]);
	querylist.push(["query/outforms[5]","BLOCK310"]);
	querylist.push(["query/outforms[6]","BLOCK320"]);
	querylist.push(["query/outforms[7]","BLOCK330"]);
	querylist.push(["query/outforms[8]","BLOCK340"]);
	querylist.push(["query/outforms[9]","BLOCK5"]);
	querylist.push(["query/outforms[10]","BLOCK640"]);
	querylist.push(["query/outforms[11]","BLOCK7"]);
	querylist.push(["query/outforms[12]","BLOCK810"]);
	querylist.push(["query/outforms[13]","BLOCK830"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

/*-------------------------дополнительные функции-----------------*/

function findAnnotation(atitle,adb,alab,aterm,ndb)/*unused*/
{
	numDB=adb;
	getAnnotation(aterm,alab,ndb);
}

/*---------------дополнительные функции-----------------------------------*/

/*------------------------------------ конец поиск в АФ ---------------------------------------*/