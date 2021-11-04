/*------------------------------------------ поиск в библиографии ---------------------------------------------*/

/*живой поиск*/

function livesearch(o)
{
	typework="";
	var item=null;
	var lab="";
	if(typeof o !="undefined")
	{
		livsrc=item=o;
		livlabel=lab=o.className;
		typesearch="combined";
	}
	else
	{
		item=take('itemsimple').n;
		lab=item.parentNode.previousSibling.firstChild.lastChild.className.substring(1);
	}
	var div=take('livesearch');
	var val=item.value;
	var tmp=/^[\<|\>|\"|\*|\'|\%|\:|\.|\,|\-|\_|\;|\(|\)|\&|\/]+/;
	if(tmp.test(val))
		val=Trim2(val);
	if((val=="")||(val.length < 1))
	{
		div.hide();
		return;
	}
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
	querylist.push(["_version","1.2.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["label",lab]);
	querylist.push(["length",portion]);
	querylist.push(["iddb",numDB]);
	querylist.push(["query",val]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,showLivWin);
}

function showLivWin(x)
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		/*WriteError(error)*/;
	}
	else
	{
		if(response[0]._indx_0!=null)
		{
			var div=take('livesearch');
			div.n.innerHTML="";
			var item=null;
			if(livsrc!=null)
				item=livsrc;
			else
				item=take('itemsimple').n;
			var j=0;
			for (var key in response[0])
			{
				var value = response[0][key];
				if(key.indexOf('indx_')!=-1)
				{
					if((j % 2)==0)
						cls='g';
					else
						cls='w';
					div.create('p',{className:cls,textNode:value._item,onmousedown:'function(){displayVoc(this)}'});
				}
				j++;
			}
			var h=take(item).geth();
			var w=take(item).getw();
			/*var poz=getAbsolutePosition(item);
			var X=poz.x;
			var y=poz.y+h;*/
			var X=elem_rect.x(item);
			var y=elem_rect.y(item)+h;
			div.show();
			div.setx(X);
			div.sety(y);
			div.setw(w);
		}
	}
}

function displayVoc(o)
{
	var text=o.innerHTML;
	var div=take('livesearch');
	var item=null;
	if(livsrc!=null)
		item=take(livsrc);
	else
		item=take('itemsimple');
	text=text.replace(/\(/gi,'[bracket]');
	text=text.replace(/\)/gi,'[/bracket]');
	//text=text.replace(/\'/gi,'[apos]');
	//text=text.replace(/\"/gi,'[quot]');
	text="'"+text+"'";
	item.conceal();
	item.n.value=text;
	div.hide();
	simpleSearch();
}

/*конец живой поиск*/

/*фильтры*/

function clearFilters(o)/*очистка выбранных фильтров*/
{
	var filters=take('filters_'+numDB).getsign('span',{className:'checked'});
	if(filters.length>0)
	{
		for(var j=0; j<filters.length; j++)
		{
			filters[j].className="unchecked";
		}
		searchWithFilters("","","");
	}
}

function putFilterPeriod()/*добавление фильтра-диапазона*/
{
	var first=take('ifrom').n;
	var last=take('ito').n;
	var lim=first.className;
	var ind=last.className;
	var obj=take(ind).n;
	var par=obj.parentNode;
	var cls="";
	var text="";
	if((parseInt(first.value,10)>parseInt(last.value,10))||
	(isNaN(parseInt(first.value,10))&&isNaN(parseInt(last.value,10))))
	{
		alert('Задан недопустимый период');
		return;
	}
	else
	{
		if(!isNaN(parseInt(first.value,10))&&!isNaN(parseInt(last.value,10)))
		{
			cls+="("+lim+" BETWEEN '"+first.value+"','"+last.value+"')";
			text+='c '+first.value+' по '+last.value;
		}
		if(!isNaN(parseInt(first.value,10))&&isNaN(parseInt(last.value,10)))
		{
			cls+="("+lim+" GE '"+first.value+"')";
			text+='c '+first.value;
		}
		if(isNaN(parseInt(first.value,10))&&!isNaN(parseInt(last.value,10)))
		{
			cls+="("+lim+" LE '"+last.value+"')";
			text+='по '+last.value;
		}
		var today=new Date();
		var seconds=today.getTime();
		var oid='dinamic_'+numDB+'_'+seconds;
		var div=take(par).create('div',{className:cls});
		var span=div.create('span',{onmousedown:'function(){appendFilter(this);}',title:'ФИЛЬТРОВАТЬ',className:'unchecked',textNode:text,id:oid});
		//div.create('i',{textNode:'(0)'});
		div.create('i',{textNode:'0'});
		par.insertBefore(div.n,obj);
		var arg={};
		arg.next=ind;
		arg.ind=oid;
		arg.cname=cls;
		arg.itext=text;
		appendFilter(span.n,arg);
	}
}

function addFilterPeriod(o)/*окно для добавления фильтра-диапазона по годам*/
{
	var arg={'cls':'dialog2','message':'ДИАПАЗОН','target':self,'callback':'putFilterPeriod',callbackname:'Добавить','width':'500','height':'400'};
	showLayerWin('periodwin',arg);
	var div=take('periodwinform');
	div.n.innerHTML="";
	var cont=div.create('div',{className: 'period'});
	cont.create('span',{className: 'from', textNode: ' с '});
	var span=cont.create('span',{className: 'input'});
	span.create('input',{type: 'text', id: 'ifrom', value: '', maxLength: '4', className:o.parentNode.className});
	cont.create('span',{className: 'to', textNode: ' по '});
	var span1=cont.create('span',{className: 'input'});
	span1.create('input',{type: 'text', id: 'ito', value: '', maxLength: '4', className:o.id});
	var help=div.create('div',{style:{textAlign:'center',color:'#eee'}});
	help.create('span',{textNode: 'YYYY',style:{padding: '5px 30px 5px 20px'}});
	help.create('span',{textNode: 'YYYY',style:{padding: '5px 10px 5px 50px'}});
}

function addFilterVoc(v,item,label,sign)/*выбор фильтров из словаря*/
{
	var query="";
	var start=vocstart;
	vstr=v;
	if(item!=null)
	{
		fobject=item;
		var par=item.parentNode;
		var carr=take(par).getsign('span',{className:'checked'});
		cstr="";
		for(var i=0; i<carr.length; i++)
		{
			cstr+=carr[i].innerHTML;
			if(i<carr.length-1)
				cstr+='[END]';
		}
		var uarr=take(par).getsign('span',{className:'unchecked'});
		ustr="";
		for(var i=0; i<uarr.length; i++)
		{
			ustr+=uarr[i].innerHTML;
			if(i<uarr.length-1)
				ustr+='[END]';
		}
		skipfirst="";
		voclab=item.parentNode.className;
		endvoc="";
		vocstart=1;
		firstterm="";
		indxterms="";
		lastterm="";
		vvstr="";
		query=vvstr=firstterm="";
	}
	else
	{
		indxterms=prepareIndxTerms();
		start=parseInt(vocstart,10);
		if(sign==0)
		{
			start=start-portion;
			if(start==1)
			{
				skipfirst="";
				query=firstterm="";
			}
			else
			{
				var arr=firstterm.split('[END]');
				arr.pop();
				var newstr=arr[arr.length-1];
				firstterm=arr.join('[END]');
				query=skipfirst=newstr;
			}
		}
		else
		{
			start=start+portion;
			query=skipfirst=lastterm;
			firstterm=firstterm+'[END]'+query;
		}
		voclab=label;
	}
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
	querylist.push(["_version","1.2.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["$label",voclab]);
	querylist.push(["label",voclab]);
	querylist.push(["$start",start]);
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	querylist.push(["iddb",numDB]);
	querylist.push(["query",query]);
	querylist.push(["$vstr",vstr]);	
	querylist.push(["$vvstr",vvstr]);	
	querylist.push(["$cstr",cstr]);	
	querylist.push(["$ustr",ustr]);	
	querylist.push(["$firstterm",firstterm]);
	if((sign!=null)&&(skipfirst))
	{
		querylist.push(["$skipFirst","true"]);
		querylist.push(["skipFirst","true"]);
	}
	if(indxterms!="")
		querylist.push(["$indxterms",indxterms]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,openFiltersWin);
}

function wwPages()/*листание словаря фильтров*/
{
	var pages='';
	if(skipfirst)
		pages+='<input type="button" class="button2" value="&#8249; Назад" onmousedown="addFilterVoc(\''+vstr+'\',null,\''+voclab+'\',0);"/>';
	if(!endvoc)
		pages+='<input type="button" class="button2" value="Далее &#8250;" onmousedown="addFilterVoc(\''+vstr+'\',null,\''+voclab+'\',1);"/>';
	return pages;
}

function putFilterVoc()/*добавление фильтра-словаря*/
{
	var today=new Date();
	var seconds=today.getTime();
	var arr=take('menu1').tags('code');
	var par=fobject.parentNode;
	var str="";
	for(var i=0; i<arr.length; i++)
	{
		var text=arr[i].innerHTML;
		if(voclab!="PF")
			text=text.toLowerCase();
		var oid='fixed_'+numDB+'_'+i+'_'+seconds;
		var div=take(par).create('div',{className:"("+voclab+" '"+text+"')"});
		var span=div.create('span',{onmousedown:'function(){appendFilter(this);}',title:'ФИЛЬТРОВАТЬ',className:'unchecked',textNode:text,id:oid});
		//div.create('i',{textNode:'(0)'});
		div.create('i',{textNode:'0'});
		par.insertBefore(div.n,fobject);
		str+="[NEXT]"+fobject.id+"[IND]"+oid+"[CLASS]"+"("+voclab+" '"+replaceSymb(text)+"')[TEXT]"+replaceSymb(text);
		if(i<arr.length-1)
			str+="[END]";
	}
	if(str!="")
	{
		if(addfilters!="")
			addfilters+="[END]"+str;
		else
			addfilters=str;
	}
	fobject=null;
	delLayerWin();
}

function openFiltersWin(x)/*окно для добавления фильтра из словаря*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		if(take('vocwinform').n!=null)
			delLayerWin();
		var arg={};
		vstr=_vstr;
		arg.cls='dialog2';
		arg.message=vstr;
		arg.callback='putFilterVoc';
		arg.target=self;
		arg.width="500";
		arg.height="400";
		arg.callbackname='Добавить';
		showLayerWin('vocwin',arg);
		var doc=take('vocwinform');
		doc.n.innerHTML="";
		if(response[0]._indx_0!=null)
		{
			if(typeof _str!="undefined")
				vvstr=_str;
			if(typeof _skipFirst!="undefined")
				skipfirst=_skipFirst;
			if(typeof _firstterm!="undefined")
				firstterm=_firstterm;
			if(response[0]._end!=null)
				endvoc=true;
			else
				endvoc=false;
			voclab=_label;
			vocstart=parseInt(_start);
			var str='';
			var i=-1;
			var pages=wwPages();
			var menu='<div id="scont" class="scont">'+pages+'</div>';
			doc.n.innerHTML=menu;
			var tabbeg='<center><table cellspacing="0">';
			var tabend='</table></center>';
			var scont=take('scont');
			var menu1=scont.create('div',{id:'menu1',style:{display:'none'}});
			menu1.create('input',{type:'hidden',id:'andor',name:'andor',value:'OR'});
			if(typeof _indxterms!="undefined")
			{
				indxterms=_indxterms;
				var arr=indxterms.split('[END]');
				for(var j=0; j < arr.length; j++)
				{
					if(arr[j]!="")
						menu1.create('code',{style:{display:'none'},textNode: replaceSymb(arr[j].substring(arr[j].indexOf('|')+1)).replace(/&quot;/g,'"'),id: arr[j].substring(0,arr[j].indexOf('|'))});
				}
			}
			for (var key in response[0])
			{
				var value = response[0][key];
				if(key.indexOf('indx_')!=-1)
				{
					i++;
					var flag="";
					var flag2="";
					if(menu1.n.childNodes.length>1)
					{
						var childs=menu1.n.childNodes;
						for(var j=0; j<childs.length; j++)
						{
							if(childs[j].id=='_'+(vocstart+i))
							{
								flag='checked="true"';
								break;
							}
						}
					}
					var term=value._item;
					var carr=_cstr.split('[END]');
					for(var j=0; j<carr.length; j++)
					{
						if(carr[j].toUpperCase()==term)
						{
							flag='checked="true"';
							flag2='disabled="true"';
							break;
						}
					}
					var uarr=_ustr.split('[END]');
					for(var j=0; j<uarr.length; j++)
					{
						if(uarr[j].toUpperCase()==term)
						{
							flag='checked="true"';
							flag2='disabled="true"';
							break;
						}
					} 
					if((i % 2)==0)
						str+='<tr class="searchrez3">';
					else
						str+='<tr class="searchrez2">';
					str+='<td width="5%" ><input id="'+(vocstart+i)+'" type="checkbox" '+flag+' '+flag2+' class="addbox" name="'+_label+'"  value="'+replaceSymb4(term)+'" onclick="putTerms(this)"/><span style="display: none">'+term+'</span></td><td>'+term+'</td></tr>';
					lastterm=_lastterm=term;
				}
			}
			doc.n.innerHTML+=tabbeg+str+tabend;
		}
		else
		{
			doc.create('p',{textNode: 'Доступные фильтры не найдены.'});
		}
	}
}

function appendFilter(o,arg)/*добавление фильтра к поиску*/
{
	switch(o.className)
	{
		case "unchecked":	o.className="checked";
							o.title="ОЧИСТИТЬ ФИЛЬТР";
		break;
		case "checked":		o.className="unchecked";
							o.title="ФИЛЬТРОВАТЬ";
		break;
		default:break;
	}
	var filterstr="";
	var filtersids="";
	var fshowstr="";
	fstrarr=[];
	fidsarr=[];
	fshowarr=[];
	var ndb=numDB;
	if(typeof _localiddb!="undefined")
		ndb=_iddb;
	var arr=take('filters_'+ndb).getsign('div',{className: 'filters'});
	for(var i=0; i<arr.length; i++)
	{
		var filters=take(arr[i]).getsign('span',{className:'checked'});
		if(filters.length>0)
		{
			var str="";
			var showstr='<i>'+arr[i].firstChild.innerHTML.toLowerCase()+'</i> ';
			for(var j=0; j<filters.length; j++)
			{
				str+=convertlimits(filters[j].parentNode.className);
				fidsarr.push(filters[j].id);
				showstr+=filters[j].innerHTML;
				if(j<filters.length-1)
				{
					str+=' OR ';
					showstr+=' ИЛИ ';
				}
			}
			fstrarr.push(str);
			fshowarr.push(showstr);
		}
	}
	if(fstrarr.length>0)
	{
		filtersids=fidsarr.join('[END]');
		if(fstrarr.length>1)
		{
			filterstr='[bracket]'+fstrarr.join('[/bracket] AND [bracket]')+'[/bracket]';
			fshowstr=fshowarr.join(' И ');
		}
		else
		{
			filterstr='[bracket]'+fstrarr[0]+'[/bracket]';
			fshowstr=fshowarr[0];
		}
	}
	else
	{
		filterstr="";
		filtersids="";
		fshowstr="";
	}
	if(typeof arg!="undefined")
		searchWithFilters(filterstr,filtersids,fshowstr,arg);
	else
		searchWithFilters(filterstr,filtersids,fshowstr);
}

function searchWithFilters(filterstr,filtersids,fshowstr,arg)/*поиск с фильтрами*/
{
	typework="search";
	lockedfilters="";
	swfterm="";
	var handler=modules["search"].directory+'/search.php';
	var str="";
	var showstr="";
	if(_str!="")
	{
		str=_str;
	}
	else
	{
		str=_swfterm;
	}
	if(_showstr!="")
	{
		showstr=_showstr;
	}
	else
	{
		showstr=_rshowstr;
	}
	str=prepareStr(str);
	showstr=prepareStr(showstr);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
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
	querylist.push(["iddb",numDB]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	var outfrm=outform;
	var ndb=numDB;
	if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
		ndb=numdbBIBL;
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
	var term="";
	var flag=true;
	str=brackets(str);
	var tmp=/(^\[bracket\]AUIDS )|(^\[bracket\]ID )/;
	if(tmp.test(str))
		flag=false;
	term=prepareTerm(str);
	if(flag)
		term=prepareStr(term);
	if(filterstr!="")
	{
		if(typeof arg!="undefined")
		{
			var addstr='[NEXT]'+arg.next+'[IND]'+arg.ind+'[CLASS]'+convertlimits(arg.cname)+'[TEXT]'+arg.itext;
			addfilters=addfilters+'[END]'+addstr;
		}
		filterstr=replaceSymb(filterstr);
		querylist.push(["$filterstr",filterstr]);
		querylist.push(["$filtersids",filtersids]);
		querylist.push(["$fshowstr",prepareShowstring(fshowstr)]);
		swfterm+=' AND '+filterstr;
		filterstr=brackets(filterstr);
		term+=' AND '+prepareTerm(filterstr);
	}
	if(typeof _rubricator!="undefined")
		querylist.push(["$rubricator",_rubricator]);
	querylist.push(["query/body",term]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	querylist.push(["_history","yes"]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	if(typeof dbs[numDB].addqueries !="undefined")
	{
		var obj={};
		obj.term=term;
		obj.db=ndb;
		var arr=prepareAddQuery(obj);
		if(arr!=null)
			Array.prototype.push.apply(gArr, arr);
	}
	callToRCP(gArr);
}

function filtersQuery()/*запрос на вывод фильтров*/
{
	typework="";
	if((typeof _size!= "undefined")&&(parseInt(_size,10)>0))
	{
		if(typeof _stopfilters=="undefined")
		{
			var str=replaceSymb(_str);
			str=brackets(str);
			var term=prepareTerm(str);
			if(typeof _swfterm!="undefined")
			{
				term=brackets(_swfterm);
				term=prepareTerm(term);
			}
			var ndb=numDB;
			if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
				ndb=_iddb;
			var filter=take('filters_'+ndb).getsign('span',{className:'unchecked'});
			var filter=take('filters_'+ndb).getsign('span',{className:'unchecked'});
			for(var j=0; j<filter.length; j++)
			{
				var gArr=new Array();
				var querylist=new Array();
				gArr.push(["_action","execute"]);
				gArr.push(["_html","stat"]);
				gArr.push(["_errorhtml","error"]);
				querylist.push(["_service","STORAGE:opacfindd:FindSize"]);
				querylist.push(["_version","1.2.0"]);
				querylist.push(["session",numsean]);
				querylist.push(["queryList[0]/iddb",numDB]);
				querylist.push(["queryList[0]/query","("+term+") AND "+filter[j].parentNode.className]);
				querylist.push(["queryList[0]/queryId",filter[j].id]);
				if(typeof _localiddb!="undefined")
					gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
				else
					gArr.push(["querylist",prepareQueryString(querylist)]);
				ajaxToRCP(gArr,callbackfiltersquery);
			}
		}
		else
		{
			if(typeof _see=="undefined")
			{
				if(lockedfilters!="")
				{
					var arr=lockedfilters.split('[END]');
					var len=arr.length;
					for(var i=0; i<len; i++)
					{
						if(arr[i]!="")
						{
							var ids=arr[i].split('[ID]');
							if(take(ids[0]).n!=null)
							{
								//take(ids[0]).n.nextSibling.innerHTML='('+ids[1]+')';
								take(ids[0]).n.nextSibling.innerHTML=ids[1];
							}
						}
					}
				}
			}
		}
	}
}

function callbackfiltersquery(x)/*вывод фильтров*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		/*WriteError(error)*/;
	}
	else
	{
		var str='';
		for (var key in response[0])
		{
			var value = response[0][key];
			if(key.indexOf('resultList')!=-1)
			{
				//take(response[0]._resultList_0._queryId).n.nextSibling.innerHTML='('+response[0]._resultList_0._size+')';
				take(response[0]._resultList_0._queryId).n.nextSibling.innerHTML=response[0]._resultList_0._size;
				str+=response[0]._resultList_0._queryId+'[ID]'+response[0]._resultList_0._size+'[END]';
			}
		}
		lockedfilters+=str;
	}
}

/*конец фильтры*/

/*фасеты*/

function appendFacet(o)/*добавление фасетов к поиску*/
{
	switch(o.className)
	{
		case "unchecked":	o.className="checked";
							o.title="ОТМЕНИТЬ";
		break;
		case "checked":		o.className="unchecked";
							o.title="УТОЧНИТЬ";
		break;
		default:break;
	}
	var term=o.innerHTML;
	var lab=o.parentNode.className;
	var role=o.parentNode.lastChild.className;
	var title=o.parentNode.parentNode.parentNode.firstChild.innerHTML;
	var tmp='[TITLE]'+title+'[NAME]'+lab+'[ROLE]'+role+'[VALUE]'+term;
	var str="";
	var showstr="";
	var fstr="";
	var bstr="";
	var farr=[];
	var barr=[];
	if(typeof _str !="undefined")
		str=_str;
	if(typeof _showstr !="undefined")
		showstr=_showstr;
	if(lockedfilters!="")
		farr=lockedfilters.split('[END]');
	for(var i=0; i<farr.length; i++)
	{
		if(farr[i]!=tmp)
		{
			if(fstr!="")
				fstr+='[END]';
			fstr+=farr[i];
		}
	}
	if(o.className=="checked")
	{
		if(fstr!="")
			fstr+='[END]';
		fstr+=tmp;
	}
	lockedfilters=replaceSymb(fstr);
	if(typeof biblio != "undefined")
	{
		if(fstr!="")
		{
			farr=[];
			farr=fstr.split('[END]');
			for(var i=0; i<farr.length; i++)
			{
				var titl=farr[i].substring(farr[i].indexOf('[TITLE]')+7,farr[i].indexOf('[NAME]'));
				var bobj={};
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))]={};
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].isRole=farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]'));
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].values=[];
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].values.push(prepareStr(farr[i].substring(farr[i].indexOf('[VALUE]')+7)));
				barr.push(bobj);
			}
		}
		var aarr=[];
		farr=[];
		for(var i=0; i<barr.length; i++)
		{
			for(var key in barr[i])
			{
				if((typeof aarr[key] == "undefined") || (aarr[key].constructor !== Object))
				{
					aarr[key]={};
					aarr[key].name=key;
					aarr[key].isRole=barr[i][key].isRole;
					aarr[key].values=barr[i][key].values;
					farr.push(aarr[key]);
				}
				else
				{
					for(var j=0;j<barr[i][key].values.length; j++)
						aarr[key].values.push(barr[i][key].values[j]);
				}
			}
		}
	}
	if(typeof solr != "undefined")
	{
		if(lockedfilters!="")
		{
			farr=[];
			farr=lockedfilters.split('[END]');
			for(var i=0; i<farr.length; i++)
			{
				if(i > 0)
					bstr+=' AND ';
				bstr+='[bracket]'+farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]'))+' '+brackets(farr[i].substring(farr[i].indexOf('[VALUE]')+7))+'[/bracket]';
			}
		}
	}
	var obj={};
	obj._str=str;
	obj._showstr=showstr;
	if(farr.length > 0)
	{
		if(typeof solr != "undefined")
			obj._bstr=bstr;
		else
			obj._bstr=farr;
		obj._history="yes";
	}
	simpleSearch(lab,obj);
}

function prepareFacetsForBibliosearch()/*формирование запроса с фасетами*/
{
	var farr=[];
	var barr=[];
	var bstr="";
	if(lockedfilters!="")
	{
		farr=lockedfilters.split('[END]');
		if(typeof biblio != "undefined")
		{
			for(var i=0; i<farr.length; i++)
			{
				var titl=farr[i].substring(farr[i].indexOf('[TITLE]')+7,farr[i].indexOf('[NAME]'));
				var bobj={};
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))]={};
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].isRole=farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]'));
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].values=[];
				bobj[farr[i].substring(farr[i].indexOf('[NAME]')+6,farr[i].indexOf('[ROLE]'))].values.push(prepareStr(farr[i].substring(farr[i].indexOf('[VALUE]')+7)));
				barr.push(bobj);
			}
			var aarr=[];
			farr=[];
			for(var i=0; i<barr.length; i++)
			{
				for(var key in barr[i])
				{
					if((typeof aarr[key] == "undefined") || (aarr[key].constructor !== Object))
					{
						aarr[key]={};
						aarr[key].name=key;
						aarr[key].isRole=barr[i][key].isRole;
						aarr[key].values=barr[i][key].values;
						farr.push(aarr[key]);
					}
					else
					{
						for(var j=0;j<barr[i][key].values.length; j++)
							aarr[key].values.push(barr[i][key].values[j]);
					}
				}
			}
		}
		if(typeof solr != "undefined")
		{
			for(var i=0; i<farr.length; i++)
			{
				if(i > 0)
					bstr+=' AND ';
				bstr+='[bracket]'+farr[i].substring(farr[i].indexOf('[ROLE]')+6,farr[i].indexOf('[VALUE]'))+' '+brackets(farr[i].substring(farr[i].indexOf('[VALUE]')+7))+'[/bracket]';
			}
		}
		var obj={};
		if(farr.length > 0)
		{
			if(typeof solr != "undefined")
				obj._bstr=bstr;
			else
				obj._bstr=farr;
		}
		lockedfilters=replaceSymb(lockedfilters);
		return obj;
	}
	else
	{
		return null;
	}
}

function facetsBack(o)/*предыдущая порция*/
{
	take(o.parentNode.previousSibling).show();
	take(o.parentNode).hide();
}

function facetsNext(o)/*следующая порция*/
{
	take(o.parentNode.nextSibling).show();
	take(o.parentNode).hide();
}

/*конец фасеты*/

/*основные поисковые функции*/

function simpleSearchAll(l)/*поиск во всех базах*/
{
	typework="searchallbases";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["allbases"].directory+'/allbases.php']);
	var obj=null;
	if(typeof l !="undefined")
		obj=createSearchString(l);
	else
		obj=createSearchString();
	if(obj==null)
	{
		alert('Неверно задано поисковое предписание!');
		return;
	}
	typesearch="simple";
	var str=prepareStr(obj._str);
	var showstr=prepareStr(obj._showstr);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	querylist.push(["$str",replaceSymb(str)]);
	querylist.push(["$showstr",showstr]);
	str=brackets(str);
	var term=prepareTerm(str);
	var dbflag=false;
	for(var key in dbs)
	{
		if(dbs[key]["type"]!="AF")
		{
			if(key!="all")
			{
				if((typeof iddb[key] !="undefined")&&(((typeof l =="undefined")&&(searchlabel!="")&&(typeof dbs[key]["labels"][searchlabel]!="undefined"))||((typeof l !="undefined")&&(typeof dbs[key]["labels"][l]!="undefined"))))
				{
					if(typeof iddb[key][5] != "undefined")
					{
						var arr=iddb[key][5];
						for(var i=0; i<arr.length; i++)
						{
							if(arr[i][0]=="067")
							{
								dbflag=true;
								break;
							}
						}
					}
					if(!dbflag)
					{
						querylist.push(["_service","STORAGE:opacfindd:FindSize"]);
						querylist.push(["_version","1.1.0"]);
						querylist.push(["session",numsean]);
						querylist.push(["iddb",key]);
						querylist.push(["query",term]);
						gArr.push(["querylist",prepareQueryString(querylist,key)]);
						querylist.length=0;
					}
					dbflag=false;
				}
			}
		}
	}
	callToRCP(gArr);
}

function searchInBase(o)/*поиск в конкретной базе из окна поиска по всем базам*/
{
	typework="search";
	typesearch="simple";
	lockedfilters="";
	swfterm="";
	var howmuch=portion;
	var startfrom=0;
	var action="php";
	if(typeof biblio!="undefined")
		action="biblio";
	var handler=modules["search"].directory+'/search.php';
	var str=prepareStr(_str);
	var showstr=prepareStr(_showstr);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	var term=prepareTerm(str);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action",action]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.7.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_start",startfrom]);
	querylist.push(["start",startfrom]);
	querylist.push(["$length",howmuch]);
	querylist.push(["length",howmuch]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	numDB=o.id.substring(1);
	var outfrm=outform;
	var ndb=numDB;
	if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
		ndb=numdbBIBL;
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
	querylist.push(["iddb",ndb]);
	querylist.push(["query/body",term]);
	if(typeof biblio!="undefined")
	{
		lockedfilters="";
		var bobj={'query': term ,'databases':[ndb],'paging':{'limit': portion,'offset': startfrom}};
		var fobj=prepareFacetsForBibliosearch();
		if(fobj!=null)
			bobj.filters=fobj._bstr;
		gArr.push(["_bibliostr",JSON.stringify(bobj)]);
		gArr.push(["_session",numsean]);
		querylist.push(["$bibliosearch","yes"]);
	}
	if(typeof solr!="undefined")
	{
		lockedfilters="";
		for(var i=0; i<facetss.length; i++)
		{
			querylist.push(["facets["+i+"]/type",facetss[i].type]);
			querylist.push(["facets["+i+"]/name",facetss[i].name]);
			querylist.push(["facets["+i+"]/field",facetss[i].field]);
			querylist.push(["$solr","yes"]);
		}
	}
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function simpleSearch(l,arg)/*основной поиск*/
{
	if(typeof arg == "undefined")
		lockedfilters="";
	swfterm="";
	if((typework=="searchallbases")||(numDB=='all'))
	{
		simpleSearchAll(l);
	}
	else
	{
		typework="search";
		var obj=null;
		if(typeof arg != "undefined")
		{
			obj=arg;
		}
		else
		{
			if(typeof l !="undefined")
				obj=createSearchString(l);
			else
				obj=createSearchString();
		}
		if(obj==null)
		{
			alert('Неверно задано поисковое предписание!');
			return;
		}
		var action="php";
		if(typeof biblio!="undefined")
			action="biblio";
		var handler=modules["search"].directory+'/search.php';
		var str=prepareStr(replaceSymb(obj._str));
		var showstr=prepareStr(obj._showstr);
		showstr=prepareShowstring(showstr);
		if((str.indexOf('[bracket]AUIDS ')!=-1)||(str.indexOf('[bracket]ID ')!=-1))
			str=replaceSlash(str);
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action",action]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",handler]);
		querylist.push(["_service","STORAGE:opacfindd:FindView"]);
		querylist.push(["_version","2.7.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["_start",0]);
		querylist.push(["start",0]);
		querylist.push(["$start",0]);
		querylist.push(["$length",portion]);
		querylist.push(["length",portion]);
		querylist.push(["_showstr",showstr]);
		querylist.push(["_str",str]);
		var outfrm=outform;
		var ndb=numDB;
		if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
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
		if(searchlabel!="")
		{
			querylist.push(["$searchlabel",searchlabel]);
		}
		if(searchtermin!="")
		{
			if(searchtermin.indexOf('*')!=-1)
				searchtermin=searchtermin.substring(0,searchtermin.indexOf('*'));
			querylist.push(["$searchtermin",searchtermin]);
		}
		querylist.push(["iddb",ndb]);
		str=brackets(str);
		var term=prepareTerm(str);
		querylist.push(["query/params[0]/name","presence"]);
		querylist.push(["query/params[0]/value","INCLUDE"]);
		if(typeof biblio!="undefined")
		{
			var bobj={'query': term ,'databases':[ndb],'paging':{'limit': portion,'offset': 0}};
			if(typeof obj._bstr!="undefined")
				bobj.filters=obj._bstr;
			gArr.push(["_bibliostr",JSON.stringify(bobj)]);
			gArr.push(["_session",numsean]);
			if(typeof obj._history!="undefined")
				querylist.push(["_history","yes"]);
			querylist.push(["$bibliosearch","yes"]);
		}
		if(typeof solr!="undefined")
		{
			if(lockedfilters != "")
				term+=' AND '+prepareTerm(obj._bstr);
			for(var i=0; i<facetss.length; i++)
			{
				querylist.push(["facets["+i+"]/type",facetss[i].type]);
				querylist.push(["facets["+i+"]/name",facetss[i].name]);
				querylist.push(["facets["+i+"]/field",facetss[i].field]);
			}
			querylist.push(["$solr","yes"]);
			if((typeof obj._history!="undefined")||(lockedfilters!=""))
				querylist.push(["_history","yes"]);
		}
		querylist.push(["query/body",term]);
		if(typeof _localiddb!="undefined")
			gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
		else
			gArr.push(["querylist",prepareQueryString(querylist)]);
		if(searchlabel!="")
		{
			if(typeof dbs[ndb]["labels"][searchlabel][4]!="undefined")
			{
				if((dbs[ndb]["labels"][searchlabel][4]!="Y")&&(dbs[ndb]["labels"][searchlabel][4]!="N")&&(dbs[ndb]["labels"][searchlabel][4]!="true")&&(dbs[ndb]["labels"][searchlabel][4]!="false")&&(dbs[ndb]["labels"][searchlabel][4]!=""))
				{
					var arr=dbs[ndb]["labels"][searchlabel][4].split(',');
					for(var i=0; i<arr.length;i++)
					{
						querylist.length=0;
						querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
						querylist.push(["_version","1.2.0"]);
						querylist.push(["session",numsean]);
						querylist.push(["label",arr[i]]);
						querylist.push(["length",100]);	
						querylist.push(["iddb",ndb]);
						querylist.push(["query",searchtermin]);
						querylist.push(["$facetlabel",arr[i]]);
						querylist.push(["$facettermin",searchtermin]);
						querylist.push(["$facettitle",dbs[ndb]["labels"][arr[i]][0].split(' | ')[1]]);
						gArr.push(["querylist",prepareQueryString(querylist)]);
					}
				}
			}
		}
		livsrc=null;
		livlabel="";
		if(typeof dbs[ndb].addqueries !="undefined")
		{
			var obj={};
			obj.term=term;
			obj.db=ndb;
			var arr=prepareAddQuery(obj);
			if(arr!=null)
				Array.prototype.push.apply(gArr, arr);
		}
		callToRCP(gArr);
	}
}

function nextSearch(c)/*основной поиск - вывод порций*/
{
	typework="search";
	var howmuch="";
	var startfrom="";
	if(typeof c=="undefined")
	{
		howmuch=portion;
		startfrom=0;
		if((typeof _start!="undefined")&&(typeof _see =="undefined"))
			startfrom=_start;
	}
	else
	{
		howmuch=_length;
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
	}
	var action="php";
	if(typeof biblio!="undefined")
		action="biblio";
	var handler=modules["search"].directory+'/search.php';
	var str=prepareStr(_str);
	var showstr=prepareStr(_showstr);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action",action]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.7.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_start",startfrom]);
	if(typeof biblio!="undefined")
		querylist.push(["start",0]);
	else
		querylist.push(["start",startfrom]);
	querylist.push(["$stopfilters","yes"]);
	querylist.push(["$length",howmuch]);
	querylist.push(["length",howmuch]);
	querylist.push(["_history","yes"]);
	if(typeof _lastdb!="undefined")
		numDB=_lastdb;
	var ndb=numDB;
	if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
		ndb=_iddb;
	querylist.push(["iddb",ndb]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	var outfrm=outform;
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
	if(typeof _searchtitle!="undefined")
		querylist.push(["$searchtitle",_searchtitle]);
	str=brackets(str);
	var term=prepareTerm(str);
	if(typeof _filterstr!="undefined")
	{
		querylist.push(["$filterstr",_filterstr]);
		querylist.push(["$filtersids",_filtersids]);
		querylist.push(["$fshowstr",_fshowstr]);
		var filterstr=brackets(_filterstr);
		term+=' AND '+prepareTerm(filterstr);
	}
	if(typeof _rubricator !="undefined")
		querylist.push(["$rubricator",_rubricator]);
	if(typeof _rshowstr !="undefined")
		querylist.push(["$rshowstr",_rshowstr]);
	if(typeof _swfterm!="undefined")
	{
		swfterm=replaceSymb(_swfterm);
		var flag=true;
		var tmp=/(^\[bracket\]AUIDS )|(^\[bracket\]ID )/;
		if(tmp.test(str))
			flag=false;
		term=prepareTerm(swfterm);
		if(flag)
			term=prepareStr(term);
	}
	querylist.push(["query/body",term]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	var label="0";
	var direct="asc";
	if(typeof _sortlabel !="undefined")
		label=_sortlabel;
	if(take('sortlab').n!=null)
		label=take('sortlab').n.options[take('sortlab').n.selectedIndex].value;
	if(typeof _direct !="undefined")
		direct=_direct;
	if((label=='PY')||(label=='DT'))
		direct="desc";
	if(label!="0")
	{
		querylist.push(["query/label",label]);
		querylist.push(["query/direct",direct]);
		querylist.push(["$label",label]);
		querylist.push(["$sortlabel",label]);
		querylist.push(["$sortdirect",direct]);
	}
	if(typeof biblio!="undefined")
	{
		if(label!="0")
		{
			if((label=='DT')||(label=='PY'))
				term+=' SORTD '+label;
			else
				term+=' SORT '+label;
		}
		var bobj={'query': term ,'databases':[ndb],'paging':{'limit': portion,'offset': startfrom}};
		var fobj=prepareFacetsForBibliosearch();
		if(fobj!=null)
			bobj.filters=fobj._bstr;
		gArr.push(["_bibliostr",JSON.stringify(bobj)]);
		gArr.push(["_session",numsean]);
		querylist.push(["$bibliosearch","yes"]);
		//if(fobj!=null)
		//	querylist.push(["$facets",fobj._bshowstr]);
	}
	if(typeof solr!="undefined")
	{
		for(var i=0; i<facetss.length; i++)
		{
			querylist.push(["facets["+i+"]/type",facetss[i].type]);
			querylist.push(["facets["+i+"]/name",facetss[i].name]);
			querylist.push(["facets["+i+"]/field",facetss[i].field]);
			querylist.push(["$solr","yes"]);
		}
	}
	if(typeof _searchlabel != "undefined")
	{
		querylist.push(["$searchlabel",_searchlabel]);
	}
	if(typeof _searchtermin != "undefined")
	{
		querylist.push(["$searchtermin",_searchtermin]);
	}
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	if(typeof _searchlabel != "undefined")
	{
		if(typeof dbs[ndb]["labels"][_searchlabel][4]!="undefined")
		{
			if((dbs[ndb]["labels"][_searchlabel][4]!="Y")&&(dbs[ndb]["labels"][_searchlabel][4]!="N")&&(dbs[ndb]["labels"][_searchlabel][4]!="true")&&(dbs[ndb]["labels"][_searchlabel][4]!="false")&&(dbs[ndb]["labels"][_searchlabel][4]!=""))
			{
				var arr=dbs[ndb]["labels"][_searchlabel][4].split(',');
				for(var i=0; i<arr.length;i++)
				{
					querylist.length=0;
					querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
					querylist.push(["_version","1.2.0"]);
					querylist.push(["session",numsean]);
					querylist.push(["label",arr[i]]);
					querylist.push(["length",100]);	
					querylist.push(["iddb",ndb]);
					querylist.push(["query",_searchtermin]);
					querylist.push(["$facetlabel",arr[i]]);
					querylist.push(["$facettermin",_searchtermin]);
					querylist.push(["$facettitle",dbs[ndb]["labels"][arr[i]][0].split(' | ')[1]]);
					gArr.push(["querylist",prepareQueryString(querylist)]);
				}
			}
		}
	}
	callToRCP(gArr);
}

function showLable(o)/*поиск по подсвеченным полям в подробной форме вывода*/
{
	typework="search";
	swfterm="";
	var lab=o.className;
	if(lab=="AF")
	{
		numDB=numdbf;
		getAnnotation(o.firstChild.value,"ID")
	}
	else
	{
		var db=numDB;
		if(typeof _localiddb!="undefined")
			db=_iddb;
		if(typeof dbs[db]["labels"][lab] =="undefined")
		{
			if(lab=="RP")
				lab="AC";
			if(lab=="TM")
				lab="SH";
		}
		var action="php";
		if(typeof biblio!="undefined")
			action="biblio";
		var labtext=dbs[db]["labels"][lab][0];
		var howmuch=portion;
		var startfrom=0;
		var handler="html/search.php";
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action",action]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",modules["search"].directory+'/search.php']);
		querylist.push(["_service","STORAGE:opacfindd:FindView"]);
		querylist.push(["_version","2.7.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["_start",startfrom]);
		querylist.push(["start",startfrom]);
		querylist.push(["$length",howmuch]);
		querylist.push(["length",howmuch]);
		if(typeof $lastdb!="undefined")
			numDB=$lastdb;
		var ndb=numDB;
		if((typeof dbs[ndb]=="undefined")||(typeof _localiddb!="undefined"))
			ndb=_iddb;
		querylist.push(["iddb",ndb]);
		//var term=o.innerText || o.textContent;
		var term=o.firstChild.nodeValue;
		term=replaceSymb(term);
		term=prepareStr(term);
		if(term.indexOf('(')!=-1)
			term="[apos]"+term+"[/apos]";
		var showstr=prepareStr("<i>"+labtext+" </i>"+term);
		var str="[bracket]"+lab+" "+term+"[/bracket]";
		showstr=prepareShowstring(showstr);
		querylist.push(["_showstr",showstr]);
		querylist.push(["_str",str]);
		term=prepareTerm(str);
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
		querylist.push(["query/body",term]);
		querylist.push(["query/params[0]/name","presence"]);
		querylist.push(["query/params[0]/value","INCLUDE"]);
		if(typeof biblio!="undefined")
		{
			lockedfilters="";
			var bobj={'query': term ,'databases':[ndb],'paging':{'limit': portion,'offset': startfrom}};
			var fobj=prepareFacetsForBibliosearch();
			if(fobj!=null)
				bobj.filters=fobj._bstr;
			gArr.push(["_bibliostr",JSON.stringify(bobj)]);
			gArr.push(["_session",numsean]);
			querylist.push(["$bibliosearch","yes"]);
			//if(fobj!=null)
			//	querylist.push(["$facets",fobj._bshowstr]);
		}
		if(typeof solr!="undefined")
		{
			lockedfilters="";
			for(var i=0; i<facetss.length; i++)
			{
				querylist.push(["facets["+i+"]/type",facetss[i].type]);
				querylist.push(["facets["+i+"]/name",facetss[i].name]);
				querylist.push(["facets["+i+"]/field",facetss[i].field]);
				querylist.push(["$solr","yes"]);
			}
		}
		if(typeof _localiddb!="undefined")
			gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
		else
			gArr.push(["querylist",prepareQueryString(querylist)]);
		callToRCP(gArr);
	}
}

function historySearch(ind)/*поиск из истории поиска*/
{
	typework="search";
	var gArr=new Array();
	var querylist=new Array();
	var str=showstr=etb=handler="";
	var stri=take('str'+ind);
	var showstri=prepareStr(take('showstr'+ind));
	var etbi=take('etb'+ind);
	var outformi=take('outf'+ind);
	var handleri=take('hand'+ind);
	var outfrm=outform;
	if(stri.n!=null)
	{
		str=stri.n.innerHTML;
		if((showstri.n!=null)&&(showstri.n.innerHTML!=""))
		{
			showstr=prepareStr(showstri.n.innerHTML);
		}
	}
	if(etbi.n!=null)
	{
		numDB=etbi.n.innerHTML.substring(0,etbi.n.innerHTML.indexOf(':'));
		etb=etbi.n.innerHTML.substring(etbi.n.innerHTML.indexOf(':')+1);
	}
	if(handleri.n!=null)
		handler=handleri.n.innerHTML;
	showstr=prepareShowstring(showstr);
	var action="php";
	if(typeof biblio!="undefined")
		action="biblio";
	gArr.push(["_action",action]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.7.0"]);
	querylist.push(["session",numsean]);
	if(typeof _localiddb!="undefined")
		querylist.push(["iddb",_localiddb]);
	else
		querylist.push(["iddb",numDB]);
	querylist.push(["_start",0]);
	querylist.push(["start",0]);
	querylist.push(["_history","yes"]);	
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	if((typeof dbs[numDB]!="undefined")&&(typeof dbs[numDB].outform!="undefined"))
		outfrm=dbs[numDB].outform;
	if(outformi.n!=null)
		if(outformi.n.innerHTML!="")
			outfrm=outformi.n.innerHTML;
	querylist.push(["$outform",outfrm]);
	querylist.push(["outformList[0]/outform",outfrm]);
	querylist.push(["outformList[1]/outform","LINEORD"]);
	if(outfrm=="SHORTFM")
	{
		querylist.push(["outformList[2]/outform","SHORTFMS"]);
		querylist.push(["outformList[3]/outform","SHORTFMSTR"]);
	}
	str=brackets(str);
	querylist.push(["query/body",prepareTerm(str)]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	if(typeof biblio!="undefined")
	{
		lockedfilters="";
		var bobj={'query': prepareTerm(str) ,'databases':[numDB],'paging':{'limit': portion,'offset': 0}};
		gArr.push(["_bibliostr",JSON.stringify(bobj)]);
		gArr.push(["_session",numsean]);
		querylist.push(["$bibliosearch","yes"]);
	}
	if(typeof solr!="undefined")
	{
		lockedfilters="";
		for(var i=0; i<facetss.length; i++)
		{
			querylist.push(["facets["+i+"]/type",facetss[i].type]);
			querylist.push(["facets["+i+"]/name",facetss[i].name]);
			querylist.push(["facets["+i+"]/field",facetss[i].field]);
			querylist.push(["$solr","yes"]);
		}
	}
	if(str.indexOf('DT ')!=-1)
	{
		querylist.push(["query/label","DT"]);
		querylist.push(["query/direct","desc"]);
		querylist.push(["$sortlabel","DT"]);
		querylist.push(["$sortdirect","desc"]);
		querylist.push(["$label","DT"]);
		querylist.push(["$direct","desc"]);
	}
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function createSearchString(l)/*формирование поискового запроса*/
{
	var obj={_str:"",_showstr:""};
	if((typeof scrolllayer != "undefined")&&(scrolllayer=="left_frame"))
		typesearch='combined';
	if((typesearch=='simple')||(typesearch=='combined')||((typeof l !="undefined")&&((l=='AUIDS')||(l=='COD'))))
	{
		var ndb=numDB;
		if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
			ndb=numdbBIBL;
		var tmp="";
		if(typesearch=='combined')
		{
			if(showrubterm!="")
				tmp=showrubterm;
			if(livsrc!=null)
				tmp=livsrc.value;
			if(tmp=="")
				if(vocobj!="")
					tmp=take(vocobj).n.value;
		}
		else
			tmp=take('simple_search').getsign('input',{type:'text'})[0].value;
		if((tmp!='') && (tmp.length > 1))
		{
			var lab="";
			if(typesearch=='combined')
			{
				lab=livlabel;
				if(lab=="")
					if(vocobj!="")
						lab=take(vocobj).n.className;
			}
			else
				lab=take('simple_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);
			if(typeof l !="undefined")
				lab=l;
			searchlabel=lab;
			if(typeof dbs[ndb]["labels"][lab]!="undefined")
			{
				var labtext=dbs[ndb]["labels"][lab][0];
				var tmpl=/'$/;
				if(tmpl.test(tmp))
				{
					tmp=tmp.substring(1,tmp.length-1);
					tmp=tmp.replace(/\' OR \'/gi,"[/apos] OR [apos]");
					tmp=tmp.replace(/\' AND \'/gi,"[/apos] AND [apos]");
					tmp=replaceSymb(tmp);
					tmp="[apos]"+tmp+"[/apos]";
				}
				obj._str+='[bracket]'+lab+' '+replaceSymb(tmp)+'[/bracket]';
				searchtermin=replaceSymb(tmp);
				if(showtext!="")
					obj._showstr+='<i>'+labtext+'</i> '+showtext;
				else
					obj._showstr+='<i>'+labtext+'</i> '+tmp;
			}
			else
				return null;
		}
		else
			return null;
	}
	else if(typesearch=='authority')
	{
		var tmp=take('authority_search').getsign('input',{type:'text'})[0].value;
		if((tmp!='') && (tmp.length > 1))
		{
			var lab=take('authority_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);
			if(typeof l !="undefined")
				lab=l;
			var labtext=dbs[numDB]["labels"][lab][0];
			obj._str+='[bracket]'+lab+' '+replaceSymb(tmp)+'[/bracket]';
			obj._showstr+='<i>'+labtext+'</i> '+replaceSymb(tmp);
		}
		else
			return null;
	}
	else if(typesearch=='expand')
	{
		var ndb=numDB;
		if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
			ndb=numdbBIBL;
		var arri=take('expand_search').getsign('input',{className:'iLAB'});
		var arr=[];
		var count=0;
		for(var i=0; i<arri.length; i++)
		{
			if(arri[i].value!="")
			{
				arr.push(arri[i]);
				count++;
			}
		}
		if(count<1)
			return null;
		for(var i=0; i<arr.length; i++)
		{
			var lab=null;
			var log=null;
			if(arr[i].parentNode.previousSibling.className=='opt1')
			{
				lab=arr[i].parentNode.previousSibling.previousSibling.firstChild.lastChild.className.substring(1);
				log=arr[i].parentNode.previousSibling.firstChild.lastChild.className.substring(1);
			}
			else
				lab=arr[i].parentNode.previousSibling.firstChild.lastChild.className.substring(1);
			if(i==0)
				searchlabel=lab;
			var term=arr[i].value;
			term=term.Trim();
			var term1=term2=tmp="";
			if((term.indexOf("' OR '")!=-1)||(term.indexOf("' AND '")!=-1)||(term.indexOf("' NOT '")!=-1))
			{
				term=term.substring(1,term.length-1);
				tmp=term.replace(new RegExp("' AND '",'g')," И ");
				tmp=tmp.replace(new RegExp("' OR '",'g')," ИЛИ ");
				var labtext=dbs[ndb]["labels"][lab][0];
				obj._showstr+='<i>'+labtext+'</i> '+replaceSymb(tmp);
				var arr1=term.split('\' AND \'');
				for(var j=0; j<arr1.length; j++)
				{
					if(arr1[j]!="")
					{
						var arr2=arr1[j].split('\' OR \'');
						for(var z=0; z<arr2.length; z++)
						{
							term1+=arr2[z];
							if(z<(arr2.length-1))
								term1+="[/apos] OR [apos]";
						}
						if(j<(arr1.length-1))
							term1+="[/apos] AND [apos]";
					}
				}
				term1=term1.replace(/\' NOT \'/gi,"[/apos] NOT [apos]");
				term1="[apos]"+replaceSymb(term1)+"[/apos]"
			}
			else
			{
				var tmpl=/'$/;
				var labtext=dbs[ndb]["labels"][lab][0];
				if(tmpl.test(term))
				{
					term1=term.substring(1,term.length-1);
					term1=replaceSymb(term1);
					obj._showstr+='<i>'+labtext+'</i> '+term1;
					term1="[apos]"+term1+"[/apos]";
				}
				else
				{
					term1=replaceSymb(term);
					if((log!=null)&&(log!="EXACT"))
					{
						if(log=='ANY')
							term1=term1.replace(/\s{1,}/g,' OR ');
						else
							term1=term1.replace(/\s{1,}/g,' AND ');
					}
					var showterm=term1.replace(/ OR /g,' ИЛИ ');
					showterm=showterm.replace(/ AND /g,' И ');
					obj._showstr+='<i>'+labtext+'</i> '+showterm;
				}
			}
			obj._str+='[bracket]'+lab+' '+term1+'[/bracket]';
			if(i==0)
				searchtermin=term1;
			if(count>1)
			{
				if(i<count-1)
				{
					if(arr[i].parentNode.parentNode.previousSibling.className=='logcontainer')
					{
						obj._str+= ' '+arr[i].parentNode.parentNode.previousSibling.firstChild.lastChild.className.substring(1)+' ';
						obj._showstr+=' <i>'+dbs[ndb]["labels"][arr[i].parentNode.parentNode.previousSibling.firstChild.lastChild.className.substring(1)][0]+'</i> ';
					}
					else
					{
						obj._str+= ' AND ';
						obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';
					}
				}
			}
		}
		if((take('limits_'+ndb).n!=null)&&(take('limits_'+ndb).n.style.display!="none"))
		{
			var limits=take('limits_'+ndb).getsign('div',{className: 'limits_left'});
			for(var i=0; i<limits.length; i++)
			{
				var ltitle=limits[i].firstChild.innerHTML;
				if(limits[i].lastChild.className=="input")
				{
					if(limits[i].lastChild.firstChild.id.indexOf('one')!=-1)
					{
						var lobj=limits[i].lastChild.firstChild;
						if(lobj.value!="")
						{
							obj._str+= ' AND [bracket]'+lobj.className+' [apos]'+lobj.value+'[/apos][/bracket]';
							obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';
							obj._showstr+='<i>'+ltitle+'</i> '+lobj.value;
						}
					}
					else
					{
						var lobj=take(limits[i]).tags('input');
						var first=lobj[0].value;
						var last=lobj[1].value;
						var lim=lobj[0].className;
						if(parseInt(first,10)>parseInt(last,10))
							return null;
						else
						{
							if(!isNaN(parseInt(first,10))&&!isNaN(parseInt(last,10)))
							{
								obj._str='[bracket]'+obj._str+ '[/bracket] AND [bracket]'+lim+' BETWEEN [apos]'+first+'[/apos],[apos]'+last+'[/apos][/bracket]';
								obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';
								obj._showstr+='<i>'+ltitle+' c</i> '+first+' <i>по</i> '+last;
							}
							if(!isNaN(parseInt(first,10))&&isNaN(parseInt(last,10)))
							{
								obj._str='[bracket]'+obj._str+ '[/bracket] AND [bracket]'+lim+' GE [apos]'+first+'[/apos][/bracket]';
								obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';
								obj._showstr+='<i>'+ltitle+' c</i> '+first+' ';
							}
							if(isNaN(parseInt(first,10))&&!isNaN(parseInt(last,10)))
							{
								obj._str='[bracket]'+obj._str+ '[/bracket] AND [bracket]'+lim+' LE [apos]'+last+'[/apos][/bracket]';
								obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';
								obj._showstr+='<i>'+ltitle+' по</i> '+last+' ';
							}
						}
					}
				}
				else
				{
					if(limits[i].lastChild.lastChild.className!="all")
					{
						var lim=limits[i].lastChild.lastChild.className;
						var val=limits[i].lastChild.lastChild.innerHTML;
						obj._str='[bracket]'+obj._str+ '[/bracket] AND '+convertbrackets(lim);
						obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';
						obj._showstr+='<i>'+ltitle+'</i> '+val;
					}
				}
			}
		}
	}
	else
	{
		var ndb=numDB;
		if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
			ndb=numdbBIBL;
		if((typeof l !="undefined")&&(typeof fromaftobibl!="undefined")&&(l==fromaftobibl[0]))
		{
			var lab=l;
			var labtext=dbs[ndb]["labels"][lab][0];
			tmp=take('itemprof').n.value;
			obj._str+='[bracket]'+lab+' '+replaceSymb(tmp)+'[/bracket]';
			obj._showstr+='<i>'+labtext+'</i> '+replaceSymb(tmp);
		}
		else
		{
			var par=take('expr').n;
			var tmp="";
			var tmp2="";
			var tmp3="";
			var tmp4="";
			var tmp6="";
			var ind="";
			if(par.childNodes.length==0)
			{
				if(take('itemprof').n.value!='')
					putLAB(take('sand').n);
				else
					return null;
			}
			for(var j=0; j<par.childNodes.length; j++)
			{
				if(par.childNodes[j].hasChildNodes())
				{
					var ind=par.childNodes[j].id;
					if(par.childNodes[j].innerHTML.indexOf('OR')!=-1)
						tmp3='OR';
					if(par.childNodes[j].innerHTML.indexOf('AND')!=-1)
						tmp3='AND';
					if(par.childNodes[j].innerHTML.indexOf('NOT')!=-1)
						tmp3='NOT';
					var and=take(ind).n.className;
					var arr=take(ind).getsign('span',{className: ind});
					if(arr.length>0)
					{
						for(var i=0; i<arr.length; i++)
						{
							if(ind=='FT')
							{
								tmp=arr[i].innerHTML.replace(/\s*-\s*/g,'-');
								tmp=tmp.replace(/\s{2,}/g,' ');
								tmp=replaceSymb(tmp);
								tmp6=tmp;
							}
							else if(ind=='PY')
							{
								tmp6=arr[i].innerHTML;
								tmp=arr[i].innerHTML.replace(/с \<b\>/i,"BETWEEN [apos]");
								tmp=tmp.replace(/\<\/b\> по \<b\>/i,"[/apos],[apos]");
								tmp=tmp.replace(/\<\/b\>/i,"[/apos]");
							}
							else
							{
								var tmp5=/'$/;
								if(tmp5.test(arr[i].innerHTML))
								{
									tmp=tmp6=arr[i].innerHTML.substring(1,arr[i].innerHTML.length-1);
									tmp=tmp.replace(/\' OR \'/gi,"[apos] OR [/apos]");
									tmp=tmp.replace(/\' AND \'/gi,"[apos] AND [/apos]");
									tmp=tmp.replace(/\' NOT \'/gi,"[apos] NOT [/apos]");
									tmp=replaceSymb(tmp);
									tmp="[apos]"+tmp+"[/apos]";
									tmp6=tmp6.replace(/\' OR \'/gi,"\\\' ИЛИ \\\'");
									tmp6=tmp6.replace(/\' AND \'/gi,"\\\' И \\\'");
									tmp6=tmp6.replace(/\' NOT \'/gi,"\\\' НЕ \\\'");
								}
								else
								{
									tmp=tmp6=arr[i].innerHTML;
									tmp6=tmp6.replace(/\' OR \'/gi,"\\\' ИЛИ \\\'");
									tmp6=tmp6.replace(/\' AND \'/gi,"\\\' И \\\'");
									tmp6=tmp6.replace(/\' NOT \'/gi,"\\\' НЕ \\\'");
									tmp=replaceSymb(tmp);
								}
							}
							tmp2+=tmp;
							tmp4+=tmp6;
							if(i!=(arr.length-1))
							{
								if(tmp3!='')
								{
									tmp2+=' '+tmp3+' ';
									tmp4+=dbs[ndb]["labels"][tmp3][0];
								}
							}
						}
						var labtext=dbs[ndb]["labels"][ind][0];
						if(and!="")
						{
							obj._str+=' '+and+' [bracket]'+ind+' '+tmp2+'[/bracket]';
							obj._showstr+=' <i>'+dbs[ndb]["labels"][and][0]+' '+labtext+'</i> '+tmp4;
						}
						else
						{
							obj._str+='[bracket]'+ind+' '+tmp2+'[/bracket]';
							obj._showstr+='<i>'+labtext+'</i> '+tmp4;
						}
						if(j==0)
						{
							searchlabel=ind;
							searchtermin=tmp2;
						}
						tmp2=tmp=tmp6=tmp4="";
					}
				}
			}
		}
	}
	return obj;
}

function SeeF(act,str)/*ссылки [SEEF]*/
{
	act=act.replace(/\[quot\]/gi,'"');
	act=act.replace(/\[apos\]/gi,"'");
	act=act.replace(/\[backslash\]/gi,"\\\\");/*зависит от выходной формы*/
	//act=act.replace(/\[backslash\]/gi,"\\");
	if((act.indexOf('RELATION')!=-1)&&(typeof str != "undefined")&& (str=='Статьи/части')&&(dbs[numDB].seef=="hierarchical"))
	{
		showArticles(act);
	}
	else
	{
		typework="search";
		lockedfilters="";
		var handler=modules["search"].directory+'/search.php';
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","php"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",handler]);
		querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
		querylist.push(["_version","2.5.0"]);
		querylist.push(["session",numsean]);
		var str=prepareStr(_str);
		var showstr=prepareStr(_showstr);
		str=replaceSymb(str);
		showstr=prepareShowstring(showstr);
		querylist.push(["_showstr",showstr]);
		querylist.push(["_str",str]);
		querylist.push(["_history","yes"]);
		querylist.push(["$see","SEEF"]);
		querylist.push(["$stopfilters","yes"]);
		querylist.push(["$length",400]);
		querylist.push(["_start",0]);
		querylist.push(["iddb",numDB]);
		querylist.push(["action","SEEF"]);
		querylist.push(["id",act]);
		if(typeof solr!="undefined")
		{
			for(var i=0; i<facetss.length; i++)
			{
				querylist.push(["facets["+i+"]/type",facetss[i].type]);
				querylist.push(["facets["+i+"]/name",facetss[i].name]);
				querylist.push(["facets["+i+"]/field",facetss[i].field]);
				querylist.push(["$solr","yes"]);
			}
		}
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
		if(typeof _localiddb!="undefined")
			gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
		else
			gArr.push(["querylist",prepareQueryString(querylist)]);
		callToRCP(gArr);
	}
}

function See(o,ind,act,c,rdb)/*ссылки [SEE*/
{
	if(ind==null)
		ind=_id;
	if(act==null)
		act=_see;
	var indx=replaceSymb(ind);
	addid="see"+indx;
	if(((act=="SEEF")&&(take('see'+indx).n!=null))&&((typeof dbs[numDB].seef!="undefined")&&(dbs[numDB].seef=="hierarchical")))
	{
		if(take('see'+indx).n.style.display=='none')
		{
			if(take('see'+indx).n.innerHTML=='')
			{
				typework="";
				take('see'+indx).n.innerHTML='<div class="progress small"><div></div></div>';
				var gArr=new Array();
				var querylist=new Array();
				gArr.push(["_action","execute"]);
				gArr.push(["_html","stat"]);
				gArr.push(["_errorhtml","error"]);
				querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
				querylist.push(["_version","1.2.0"]);
				querylist.push(["session",numsean]);
				querylist.push(["label","YTV"]);
				querylist.push(["length",400]);	
				querylist.push(["iddb",numDB]);
				querylist.push(["query",ind]);
				querylist.push(["$tmp",indx]);
				if(typeof _localiddb!="undefined")
					gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
				else
					gArr.push(["querylist",prepareQueryString(querylist)]);
				ajaxToRCP(gArr,showSee2Win);
			}
		}
		showHide2(o,addid);
	}
	else
	{
		if(act=='SEEF')
		{
			SeeF(o);
		}
		else
		{
			typework="search";
			var howmuch="";
			var startfrom="";
			lockedfilters="";
			if(c==null)
			{
				howmuch=portion;
				startfrom=0;
			}
			else
			{
				howmuch=_length;
				startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
			}
			if(ind==null)
				ind=$id;
			if(act==null)
				act=$see;
			var handler=modules["search"].directory+'/search.php';
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","php"]);
			gArr.push(["_errorhtml","error1"]);
			gArr.push(["_handler",handler]);
			querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
			querylist.push(["_version","2.5.0"]);
			querylist.push(["session",numsean]);
			var str=prepareStr(_str);
			var showstr=prepareStr(_showstr);
			str=replaceSymb(str);
			showstr=prepareShowstring(showstr);
			querylist.push(["_showstr",showstr]);
			querylist.push(["_str",str]);
			querylist.push(["_history","yes"]);
			querylist.push(["_start",startfrom]);
			querylist.push(["$length",howmuch]);
			querylist.push(["$see",act]);
			querylist.push(["$id",indx]);
			querylist.push(["$stopfilters","yes"]);
			var db=numDB;
			if((typeof rdb!="undefined")&&(rdb!=""))
			{
				querylist.push(["$lastdb",numDB]);
				db=rdb;
			}
			querylist.push(["iddb",db]);
			querylist.push(["id",ind]);
			querylist.push(["start",startfrom]);
			querylist.push(["length",howmuch]);
			querylist.push(["action",act]);
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
			if(typeof solr!="undefined")
			{
				for(var i=0; i<facetss.length; i++)
				{
					querylist.push(["facets["+i+"]/type",facetss[i].type]);
					querylist.push(["facets["+i+"]/name",facetss[i].name]);
					querylist.push(["facets["+i+"]/field",facetss[i].field]);
					querylist.push(["$solr","yes"]);
				}
			}
			if(typeof _localiddb!="undefined")
				gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
			else
				gArr.push(["querylist",prepareQueryString(querylist,db)]);
			callToRCP(gArr);
		}
	}
}

function showSee2Win(x)/*вывод томов/выпусков по годам*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		var div=take('see'+_tmp);
		div.n.innerHTML="";
		if(response[0]._indx_0!=null)
		{
			var j=0;
			for (var key in response[0])
			{
				if(key.indexOf('indx_')!=-1)
				{
					var value = response[0][key];
					var item = value._item.split('[Y]');
					if(replaceSymb(item[0])==_tmp)
					{
						var span=div.create('span',{id:replaceSymb(value._item),className: 'see', data:'Всего выпусков: '+value._size,onmousedown:'function(){showIssues(this)}'});
						span.create('b',{textNode:item[1]});
						span.text(' г.');
						span.create('i',{className:'comma'});
						div.create('div',{className: 'issuediv',style:{display:'none'}});
						j++;
					}
				}
			}
			if(j==0)
				div.create('p',{textNode:'В базе данных не найдены библиографические записи на отдельные тома/выпуски данного издания', style:{textAlign:'center'}});
		}
		else
		{
			div.create('p',{textNode:'В базе данных не найдены библиографические записи на отдельные тома/выпуски данного издания', style:{textAlign:'center',margin:'40px 0 0 0'}});
		}
	}
}

function showIssues(o)/*запрос на вывод томов/выпусков за год*/
{
	typework="";
	if(o.nextSibling.style.display=='none')
	{
		if(o.nextSibling.innerHTML=='')
		{
			o.nextSibling.innerHTML='<div class="progress small"><div></div></div>';
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			querylist.push(["_service","STORAGE:opacfindd:FindView"]);
			querylist.push(["_version","2.5.0"]);
			querylist.push(["session",numsean]);
			querylist.push(["start",0]);
			querylist.push(["length",400]);
			querylist.push(["iddb",numDB]);
			querylist.push(["outformList[0]/outform","ISSUE"]);
			querylist.push(["query/body","YTV "+o.id]);
			querylist.push(["$tmp",o.id]);
			if(typeof _localiddb!="undefined")
				gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
			else
				gArr.push(["querylist",prepareQueryString(querylist)]);
			ajaxToRCP(gArr,showIssuesWin);
		}
		o.className+=' border';
		o.nextSibling.style.display='';
	}
	else
	{
		o.className='see';
		o.nextSibling.style.display='none';
	}
}

function showIssuesWin(x)/*вывод томов/выпусков за год*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		var div=take(_tmp).n.nextSibling;
		div.innerHTML="";
		var j=0;
		for (var key in response[0])
		{
			if(key.indexOf('_result_')!=-1)
			{
				var value = response[0][key];
				var ind=value._id;
				var item = value._ISSUE_0[0].split('[TULTIP]');
				var span=take(div).create('span',{id:'_'+replaceSymb(ind),className: 'issue', data:item[1],onmousedown:'function(){showRecords(this)}'});
				if(item[0]!="")
					span.create('b',{textNode:item[0]});
				else
					span.create('b',{textNode:item[1]});
				span.create('i',{className:'comma'});
				take(div).create('div',{className: 'recdiv',style:{display:'none'}});
				j++;
			}
		}
	}
}

function showRecords(o)/*запрос на вывод записи на том/выпуск*/
{
	typework="";
	if(o.nextSibling.style.display=='none')
	{
		if(o.nextSibling.innerHTML=='')
		{
			o.nextSibling.innerHTML='<div class="progress small"><div></div></div>';
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			querylist.push(["_service","STORAGE:opacfindd:FindView"]);
			querylist.push(["_version","2.5.0"]);
			querylist.push(["session",numsean]);
			querylist.push(["start",0]);
			querylist.push(["length",portion]);
			querylist.push(["iddb",numDB]);
			querylist.push(["outformList[0]/outform","SHOTFORM"]);
			//querylist.push(["outformList[0]/outform","SHOTWEB"]);
			if(typeof _linkstring!="undefined")
				querylist.push(["outformList[1]/outform","LINEORD"]);
			querylist.push(["query/body","ID "+o.id.substring(1)]);
			querylist.push(["$tmp",o.id]);
			if(typeof _localiddb!="undefined")
				gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
			else
				gArr.push(["querylist",prepareQueryString(querylist)]);
			ajaxToRCP(gArr,showRecordsWin);
		}
		o.className+=' border';
		o.nextSibling.style.display='';
	}
	else
	{
		o.className='issue';
		o.nextSibling.style.display='none';
	}
}

function showRecordsWin(x)/*вывод записи на том/выпуск*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		var next=take(_tmp).n.nextSibling;
		var div=take(next);
		div.n.innerHTML="";
		var tab=div.create('div',{className:'table'});
		var row=tab.create('div',{className:'row'});
		var td4=row.create('div',{className:'td w88x vtop'});
		var td5=row.create('div',{className:'td vtop p10x'});
		var slids=[];
		var imgsrc="";
		var j=0;
		for (var key in response[0])
		{
			if(key.indexOf('_result_')!=-1)
			{
				var value = response[0][key];
				var ind=value._id;
				var rdb=value._sourceIddb;
				var arrcont=value._SHOTFORM_0._content_0;
				var arr=[];
				if(typeof _linkstring!="undefined")
				{
					arr=value._LINEORD_0;					
				}
				for(var i=0; i<arrcont.length;i++)
				{
					var atext=arrcont[i];
					var tmp=/\[divshotformicons\].*\[\/divshotformicons\]/i;
					if(tmp.test(atext))
						atext=atext.replace(tmp,'');
					atext=parseBB(atext);
					if(atext!="")
					{
						j++;
						if(j==1)
						{
							var outfrm=outform;
							if(typeof dbs[numDB].outform!="undefined")
								outfrm=dbs[numDB].outform;
							if(outfrm=='SHOTFRM')
							{
								td5.n.innerHTML+='<u class="fstr f120 lh140" title="подробнее" onmousedown=addSee(\''+replaceSlash(ind)+'\')>'+atext+'</u>';
							}
							else
								td5.n.innerHTML+='<div class="fstr">'+atext+'</div>';
						}
						else if(j==2)
						{
							td5.n.innerHTML+='<code>'+atext+'</code>';
						}
						else
						{
							if(arrcont[i].indexOf('[CONTENT]')!=-1)
							{
								slids.push(arrcont[i].substring(9));
							}
						}
					}
				}
				for (var arg in value._SHOTFORM_0)
				{
					if(arg.indexOf('_action_')!=-1)
					{
						var val = value._SHOTFORM_0[arg];
						if(val._id=="SEEF")
						{
							if(val._title.indexOf('Первый МГМУ')==-1)
							{
								if(val._title.indexOf('Оригинал')==-1)
								{
									var ps=td5.create('div',{className:'pt10x'});
									ps.create('a',{id:ind+'articles',className: 'SEEF',textNode:val._title, href:'javascript: SeeF(\''+convertseef(val._arg)+'\',\''+val._title+'\')'});
								}
							}							
						}
						if(val._id=='IMG')
						{
							imgsrc=val._arg;
						}
						if(val._id=='URL')
						{
							var pu=td5.create('div');
							if(typeof _auth!="undefined")
								pu.create('a',{className: 'URL',textNode:val._title, href:''+val._arg});
							else
								pu.create('span',{className: 'el',textNode:'Просмотр документа доступен после авторизации'});
						}
					}
				}
				if(arr.length>0)
				{
					for(var i=0; i<arr.length; i++)
					{
						if(arr[i]!="")
						{
							var p=td5.create('p',{className:arr[i],style:{display:'none'}});
							var span=p.create('span',{style:{fontSize:'100%',marginLeft:'0px'},className:'url',onmousedown:'function () {showOrderWin(this,\''+rdb+'\',\''+replaceSlash(ind)+'\');}'});
							if(arr[i]=="043")
								span.text("Заказ документа");
							if(arr[i]=="044")
								span.text("Просмотр документа");
							if(arr[i]=="058")
								span.text("Показать онлайн");
							if(arr[i]=="059")
								span.text("Заказать онлайн доступ");
							if(arr[i]=="066")
								span.text("Заказать на биржу");
						}
					}
				}
				if(imgsrc!="")
				{
					var fig=td4.create('figure',{tabindex:'1'});
					fig.create('img',{border: '0',hSpace:'0',vSpace:'0', alt:'',title:'',src: imgsrc});
				}
				else
				{
					var s4=td4.create('span');
					var c4=s4.create('cite');
					var s41=c4.create('span',{tabIndex:'1', className:'book'});
					var u4=s41.create('ul',{className:'paperback_front'});
					u4.create('li');
					var u41=s41.create('ul',{className:'ruled_paper'});
					u41.create('li');
					u41.create('li');
					u41.create('li');
					u41.create('li');
					u41.create('li');
					var u42=s41.create('ul',{className:'paperback_back'});
					u42.create('li');
				}
				if(slids.length>0)
				{
					var span=td4.create('span',{className:'titleslides',onclick:'function(){showSlidesCont(this)}'});
					for(var i=0; i<slids.length; i++)
					{
						span.create('input',{type:'hidden', name:'tab', value:slids[i]});
					}
				}
			}
		}
		verifyLink(next);
		preloadImages(imgsrc);
	}
}

function showArticles(obj)/*запрос на вывод статей*/
{
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
	querylist.push(["_version","2.3.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numDB]);
	querylist.push(["action","SEEF"]);
	querylist.push(["id",obj]);
	querylist.push(["outformList[0]/outform","SHOTFORM"]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	var arg={};
	arg.cls='dialog2';
	arg.message="Статьи/части";
	showLayerWin('issueswin',arg);
	ajaxToRCP(gArr,showArticlesWin);
}

function showArticlesWin(x)/*вывод статей*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		var doc=take('issueswinform');
		doc.n.innerHTML="";
		var j=0;
		var cls="";
		if(parseInt(response[0]._size,10)>0)
		{
			for (var key in response[0])
			{
				if(key.indexOf('_result_')!=-1)
				{
					var value = response[0][key];
					var ind=value._id;
					var arr=value._SHOTFORM_0._content_0;
					if((j % 2)==0)
						cls='searchrez1';
					else
						cls='searchrez';
					var div=doc.create('div',{className:cls,style:{padding:'10px'}});
					for(var i=0; i<arr.length; i++)
					{
						var atext=arr[i];
						var tmp=/\[divshotformicons\].*\[\/divshotformicons\]/i;
						if(tmp.test(atext))
							atext=atext.replace(tmp,'');
						if(i==0)
						{
							div.create('div',{className: 'fleft',textNode:(j+1)+'. '+atext});
						}
						else
						{
							if(atext!="")
								div.create('div',{textNode:atext});
						}
					}
					j++;
				}
			}
			doc.n.innerHTML=parseBB(doc.n.innerHTML);
		}
		else
		{
			doc.create('p',{textNode:'В базе данных не найдены библиографические записи на отдельные статьи/части данного выпуска/тома', style:{textAlign:'center',margin:'40px 0 0 0'}});
		}
	}
}

function seeAdd(o,ind,c,rdb)/*запрос на подробный вывод*/
{
	typework="";
	addid="add"+c;
	if(take(addid).n.style.display=='none')
	{
		if(take(addid).n.innerHTML=='')
		{
			take(addid).n.innerHTML='<div class="progress small"><div></div></div>';
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			querylist.push(["_service","STORAGE:opacfindd:FindView"]);
			querylist.push(["_version","2.3.0"]);
			querylist.push(["session",numsean]);
			var tmp=/\\{1,}/g;
			if(tmp.test(ind))
				ind=ind.replace(tmp,'\\');
			querylist.push(["iddbIds[0]/id",ind]);
			var db=numDB;
			if((typeof rdb!="undefined")&&(rdb!=""))
			{
				db=rdb;
			}
			querylist.push(["iddbIds[0]/iddb",db]);
			var dboutff=outformfull;
			if((typeof dbs[db] !="undefined")&&(typeof dbs[db].outformfull !="undefined"))
				dboutff=dbs[db].outformfull;
			querylist.push(["outform",dboutff]);
			querylist.push(["_history","yes"]);
			querylist.push(["$iddb",db]);
			if(typeof _localiddb!="undefined")
				gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
			else
				gArr.push(["querylist",prepareQueryString(querylist,db)]);
			ajaxToRCP(gArr,displayAdd);
		}
	}
	showHide2(o,addid);
}

function displayAdd(x)/*подробный вывод в том же окне*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError('ajax');
	}
	else
	{
		var dboutff=outformfull;
		if((typeof dbs[_iddb] !="undefined")&&(typeof dbs[_iddb].outformfull !="undefined"))
			dboutff=dbs[_iddb].outformfull;
		var outf=eval('response[0]._result_0._'+dboutff+'_0');
		if(outf!=null)
		{
			var str="";
			var arr=outf;
			for(var i=0; i<arr.length; i++)
			{
				if(arr[i]!="")
				{
					var term=arr[i];
					var pref=postf="";
					if(term.indexOf('<')!=-1)
					{
						term=term.replace(/</,' ');
						term=term.replace(/>/,' ');
						pref='<b>'+term.substring(0,term.indexOf(':')+1)+'</b>';
						postf=term.substring(term.indexOf(':')+1);
						term="";
					}
					str+='<p>'+pref+term+postf+'</p>';
				}
			}
			take(addid).n.innerHTML=parseBB(str);
		}
	}
}

function ajaxSee(ind,count,rdb)/*запрос на вывод Аннотация (ссылка [SEE4]*/
{
	typework="";
	seeid="SEE4"+count;
	if(take(seeid).n.style.display=='none')
	{
		if(take(seeid).n.innerHTML=="")
		{
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
			querylist.push(["_version","2.0.0"]);
			querylist.push(["session",numsean]);
			var db=numDB;
			if((typeof rdb!="undefined")&&(rdb!=""))
			{
				db=rdb;
			}
			querylist.push(["iddb",db]);
			querylist.push(["id",ind]);
			querylist.push(["action","SEE4"]);
			querylist.push(["_history","yes"]);
			if(typeof _localiddb!="undefined")
				gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
			else
				gArr.push(["querylist",prepareQueryString(querylist,db)]);
			ajaxToRCP(gArr,displaySEE4);
		}
		else
		{
			take(seeid).show();
			take(seeid).n.previousSibling.className="add2";
		}
	}
	else
	{
		take(seeid).hide();
		take(seeid).n.previousSibling.className="add1";
	}
}

function displaySEE4(x)/*вывод Аннотация (ссылка [SEE4]*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError('ajax');
	}
	else
	{
		if(response[0]._result_0._SEE4_0!=null)
		{
			take(seeid).n.previousSibling.className="add2";
			take(seeid).show();
			take(seeid).n.innerHTML=response[0]._result_0._SEE4_0[0];
		}
	}
}

/*поиск в библиографии, связанный с поиском в АФ*/

function searchFromAfToBibl()/*поиск библиографии из авторитетных записей (по кнопке)*/
{
	var lab=fromaftobibl[0];
	if(typeof prefind == "undefined")
	{
		if((typeof dbs[numDB]!="undefined")&&(parseInt(dbs[numDB].afrubricator,10)>2))
			lab='COD';
	}
	vocobj="itemsimple";
	typesearch="simple";
	addVoc();
	if((typeof biblcounter!="undefined")&&(parseInt(biblcounter,10)>1)&&(parseInt(dbs[numDB].afrubricator,10)>0))
	{
		simpleSearchAll(lab);
	}
	else
	{
		if(typeof _iddbbibl!="undefined")
			numDB=_iddbbibl;
		else
			numDB=numdbBIBL;
		simpleSearch(lab);
	}
}

function searchTerm(o)/*поиск библиографии из авторитетной записи (по иконке лупы)*/
{
	var lab=fromaftobibl[0];
	if(typeof o != "string")
	{
		var obj=take(o).getsign('input',{type:'checkbox'})[0];
		if(typeof obj !="undefined")
		{
			take('menu1').create('code', {textNode: replaceSymb(obj.value), id: '_'+obj.name});
			lab=obj.name;
		}
		else
		{
			take('menu1').create('code', {textNode: replaceSymb(o.parentNode.id), id: '_'+lab});
		}
	}
	else
	{
		if(typeof prefind=="undefined")
		{
			if((typeof dbs[numDB]!="undefined")&&(parseInt(dbs[numDB].afrubricator,10)>2))
				lab='COD';
		}
		take('menu1').create('code', {textNode: o, id: '_'+o});
	}
	vocobj="itemsimple";
	typesearch="simple";
	addVoc();
	if((typeof biblcounter!="undefined")&&(parseInt(biblcounter,10)>1)&&(parseInt(dbs[numDB].afrubricator,10)>0))
	{
		simpleSearchAll(lab);
	}
	else
	{
		if(typeof _iddbbibl!="undefined")
			numDB=_iddbbibl;
		else
			numDB=numdbBIBL;
		if(typeof dbs[numDB]["labels"][lab]=="undefined")
			lab=fromaftobibl[0];
		simpleSearch(lab);
	}
}

function getAFStat()/*предварительный поиск библиографии из авторитетной записи*/
{
	typework="";
	var filter=take('searchrezults').getsign('input',{'name':'stat'});
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:FindSize"]);
	querylist.push(["_version","1.2.0"]);
	querylist.push(["session",numsean]);
	for(var j=0; j<filter.length; j++)
	{
		querylist.push(["queryList["+j+"]/iddb",numdbBIBL]);
		querylist.push(["queryList["+j+"]/query","(AUIDS '"+filter[j].value+"')"]);
		querylist.push(["queryList["+j+"]/queryId",filter[j].className]);
	}
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callbackgetAFStat);
}

function callbackgetAFStat(x)/*предварительный поиск библиографии из авторитетной записи, вывод количества*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		for (key in response[0])
		{
			var value = response[0][key];
			if(key.indexOf('resultList')!=-1)
			{
				var ind=value._queryId;
				var div=take(ind).n;
				div.innerHTML=value._size;
				take(div.parentNode).show();
			}
		}
	}
}

/*конец поиск в библиографии, связанный с поиском в АФ*/

/*словарь*/

function searchVoc(l,t)/*поиск из словаря*/
{
	if(dbs[numDB].type=='AF')
		vocsearchInAF(l,t);
	else
	{
		var db=numDB;
		if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
			db=_iddb;
		typework="search";
		if(typesearch!='combined')
			typesearch='simple';
		lockedfilters="";
		swfterm="";
		t=t.replace(/\&nbsp\;/g,' ');
		var str=prepareStr("[bracket]"+l+" [apos]"+replaceSymb(t)+"[/apos][/bracket]");
		/*if((l=='AUIDS')||(l=='ID'))
		{
			str=replaceSlash(str);

		}*/
		var action="php";
		if(typeof biblio!="undefined")
			action="biblio";
		var showstr=prepareStr('<i>'+dbs[db]["labels"][l][0]+'</i> '+replaceSymb(t));
		showstr=prepareShowstring(showstr);
		var handler=modules["search"].directory+'/search.php';
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action",action]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_param","1"]);
		gArr.push(["_handler",handler]);
		querylist.push(["_service","STORAGE:opacfindd:FindView"]);
		querylist.push(["_version","2.7.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["_start",0]);
		querylist.push(["start",0]);
		querylist.push(["$length",portion]);
		querylist.push(["length",portion]);
		querylist.push(["_showstr",showstr]);
		querylist.push(["_str",str]);
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
		querylist.push(["iddb",ndb]);
		//str=brackets(str);
		querylist.push(["query/body",prepareTerm(str)]);
		querylist.push(["query/params[0]/name","presence"]);
		querylist.push(["query/params[0]/value","INCLUDE"]);		
		if(typeof biblio!="undefined")
		{
			lockedfilters="";
			var bobj={'query': prepareTerm(str) ,'databases':[ndb],'paging':{'limit': portion,'offset': 0}};
			gArr.push(["_bibliostr",JSON.stringify(bobj)]);
			gArr.push(["_session",numsean]);
			querylist.push(["$bibliosearch","yes"]);
		}
		if(typeof solr!="undefined")
		{
			lockedfilters="";
			for(var i=0; i<facetss.length; i++)
			{
				querylist.push(["facets["+i+"]/type",facetss[i].type]);
				querylist.push(["facets["+i+"]/name",facetss[i].name]);
				querylist.push(["facets["+i+"]/field",facetss[i].field]);
				querylist.push(["$solr","yes"]);
			}
		}
		if(typeof _localiddb!="undefined")
			gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
		else
			gArr.push(["querylist",prepareQueryString(querylist,db)]);
		callToRCP(gArr);
	}
}

function showVoc(item,label,sign)/*вывод словаря*/
{
	typework="search";
	var skipFirst="";
	var _vstr="";
	var query="";
	var start=1;
	var firstterm="";
	var indxterms="";
	var andor=0;
	var vocobj="";
	var savedterms="";
	var title="Словарь";
	if(item!=null)
	{
		if(typeof _str!="undefined")
			_str="";
		skipFirst="";
		if((typeof scrolllayer !="undefined")&&(scrolllayer=="left_frame"))
		{
			if(typesearch!="combined")
				typesearch="combined";
			vocobj=item.previousSibling.id;
		}
		else
		{
			if(typesearch!="combined")
			{
				if(item.nextSibling.nodeType==1)
				{
					if(item.nextSibling.className=="logcontainer")
						vocobj=item.nextSibling.nextSibling.lastChild.firstChild.id;
					else
						vocobj=item.nextSibling.lastChild.firstChild.id;
				}
			}
		}
		var val=take(vocobj).n.value;
		if(val.indexOf("'")==0)
			val=val.substring(1,val.length-1);
		val=replaceSymb(val);
		val=prepareStr(val);
		query=firstterm=val;
		if(typesearch=="expand")
		{
			savedterms=prepareSavedTerms(vocobj);
			savedterms=prepareStr(savedterms);
		}
	}
	else
	{
		if(typeof _title!="undefined")
			title=_title;
		andor=take('andor').n.selectedIndex;
		indxterms=prepareIndxTerms();
		start=parseInt(_start,10);
		vocobj=_vocobj;
		if(typeof _savedterms!="undefined")
		{
			savedterms=replaceSymb(_savedterms);
			savedterms=prepareStr(savedterms);
		}
		if(sign==0)
		{
			start=parseInt(_start,10)-portion;
			if(start==1)
			{
				skipFirst="";
				var arr=_firstterm.split('[END]');
				query=firstterm=arr[0];
			}
			else
			{
				firstterm=_firstterm;
				var arr=firstterm.split('[END]');
				arr.pop();
				var newstr=arr[arr.length-1];
				firstterm=arr.join('[END]');
				query=skipFirst=newstr;
			}
		}
		else
		{
			start=parseInt(_start,10)+portion;
			query=skipFirst=_lastterm;
			firstterm=_firstterm+'[END]'+query;
		}
	}
	if(label==null)
	{
		if(typesearch=="combined")
		{
			label=item.previousSibling.className;
		}
		if(typesearch!="combined")
		{
			if(item.nextSibling.className=="logcontainer")
				label=item.nextSibling.nextSibling.firstChild.firstChild.lastChild.className.substring(1);

			else
				label=item.nextSibling.firstChild.firstChild.lastChild.className.substring(1);
		}
		if(label=='FT')
			return;
		var db=numDB;
		if(typeof _localiddb!="undefined")
			db=_iddb;
		if((typeof query!="undefined")&&(query==""))
			_vstr='<span><i>'+dbs[db]["labels"][label][0]+'</i> ВСЕ</span>';
		else
			_vstr='<span><i>'+dbs[db]["labels"][label][0]+'</i> '+query+'</span>';
	}
	else
		_vstr=_showstr;
	_vstr=prepareStr(_vstr);
	_vstr=prepareShowstring(_vstr);
	var handler=modules["voc"].directory+'/voc.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	if(dbs[numDB].type=="AF")
	{
		querylist.push(["_service","STORAGE:opacafd:List"]);
		querylist.push(["_version","1.0.0"]);
		querylist.push(["mode","index"]);
	}
	else
	{
		querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
		querylist.push(["_version","1.2.0"]);
	}
	querylist.push(["session",numsean]);
	querylist.push(["$title",title]);
	querylist.push(["$label",label]);
	querylist.push(["label",label]);
	querylist.push(["$start",start]);
	querylist.push(["$showstr",_vstr]);
	if((typeof _str!="undefined")&&(_str!=""))
	{
		var str=prepareStr(_str);
		str=replaceSymb(str);
		querylist.push(["$str",str]);
		querylist.push(["query",str]);
	}
	else
	{
		if((typeof query!="undefined")&&(query!=""))
		{
			querylist.push(["query",query]);
		}
		else
		{
			querylist.push(["query",""]);
			querylist.push(["$str",""]);
		}
	}
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	querylist.push(["iddb",numDB]);
	querylist.push(["$andor",andor]);
	querylist.push(["$vocobj",vocobj]);
	if((typeof firstterm!="undefined")&&(firstterm!=""))
		querylist.push(["$firstterm",replaceSymb(firstterm)]);
	else
		querylist.push(["$firstterm",""]);
	querylist.push(["$typesearch",typesearch]);
	if(typesearch=='professional')
	{
		var estr=take('expr').n.innerHTML;
		estr=estr.replace(/\"/g,'');
		querylist.push(["$expr",estr]);
	}
	if(indxterms!="")
		querylist.push(["$indxterms",indxterms]);
	if(savedterms!="")
		querylist.push(["$savedterms",savedterms]);
	if((sign!=null)&&(skipFirst!=''))
	{
		querylist.push(["$skipFirst","true"]);
		querylist.push(["skipFirst","true"]);
	}
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function searchAlfabet(o,sign)/*вывод словаря по алфавиту*/
{
	typework="search";
	var skipFirst="";
	var _vstr="";
	var query="";
	var start=1;
	var firstterm="";
	var label="";
	var ndb=numDB;
	if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
		ndb=_iddb;
	if(o!=null)
	{
		query=firstterm=o.innerHTML;
		skipFirst="";
		if(typesearch=="combined")
			label="AH";
		else
			label=take('simple_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);
		if(label=='FT')
			label='TI';
	}
	else
	{
		if(typeof _label!="undefined")
			label=_label;
		start=parseInt(_start,10);
		if(sign==0)
		{
			start=parseInt(_start,10)-portion;
			if(start==1)
			{
				skipFirst="";
				query=firstterm;
			}
			else
			{
				firstterm=_firstterm;
				var arr=firstterm.split('[END]');
				arr.pop();
				var newstr=arr[arr.length-1];
				firstterm=arr.join('[END]');
				query=skipFirst=newstr;
			}
		}
		else
		{
			start=parseInt(_start,10)+portion;
			query=skipFirst=_lastterm;
			firstterm=_firstterm+'[END]'+query;
		}
	}
	if(o!=null)
		_vstr='<span><i>'+dbs[ndb]["labels"][label][0]+'</i> '+o.innerHTML+'</span>';
	else
		_vstr=_showstr;
	_vstr=prepareStr(_vstr);
	_vstr=prepareShowstring(_vstr);
	var handler=modules["voc"].directory+'/voc.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
	querylist.push(["_version","1.2.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["$label",label]);
	querylist.push(["label",label]);
	querylist.push(["$start",start]);
	querylist.push(["$showstr",_vstr]);
	if((typeof query!="undefined")&&(query!=""))
	{
		var quer=prepareStr(query);
		quer=replaceSymb(quer);
		querylist.push(["query",quer]);
	}
	else
	{
		querylist.push(["query",""]);
	}
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	querylist.push(["iddb",numDB]);
	querylist.push(["$firstterm",replaceSymb(firstterm)]);
	querylist.push(["$typesearch",typesearch]);
	if(typesearch=='profs')
	{
		var estr=take('expr').n.innerHTML;
		estr=estr.replace(/\"/g,'');
		querylist.push(["$expr",estr]);
	}
	/*if(typesearch=='simple')
		typesearch='expand';
	querylist.push(["$typesearch",typesearch]);*/
	if((sign!=null)&&(skipFirst!=''))
	{
		querylist.push(["$skipFirst","true"]);
		querylist.push(["skipFirst","true"]);
	}
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

/*конец словарь*/

function searchNews(num,ndb)/*новые поступления*/
{
	typework="search";
	var handler=modules["search"].directory+'/search.php';
	var today=new Date();
	var twomonth=new Date(today.getTime()-86400000*60);
	var y1=twomonth.getFullYear();
	var d1=(twomonth.getDate()<10)?'0'+(twomonth.getDate()):twomonth.getDate();
	var m1=(twomonth.getMonth()+1<10)?'0'+(twomonth.getMonth()+1):twomonth.getMonth()+1;
	var lab="DT";
	if((typeof num !="undefined")&&(num != null))
	{
		lab="DEZ";
		y1=Year-1;
		m1=mm;
		d1=dd;
	}
	/*var str=prepareStr("[bracket]"+lab+" BETWEEN [apos]"+y1+""+m1+""+d1+"[apos],[apos]"+Year+""+mm+""+dd+"[apos][/bracket]");
	var showstr=prepareStr("<i>Дата </i> с "+d1+"."+m1+"."+y1+" по "+dd+"."+mm+"."+Year);*/
	var str=prepareStr("[bracket]"+lab+" LE [apos]"+Year+""+mm+""+dd+"[apos][/bracket]");
	var showstr=prepareStr("<i>Дата </i> по "+dd+"."+mm+"."+Year);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	var term=prepareTerm(str);
	var action="php";
	if(typeof biblio!="undefined")
		action="biblio";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action",action]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.7.0"]);
	querylist.push(["session",numsean]);
	//querylist.push(["_history","yes"]);
	querylist.push(["_start",0]);
	querylist.push(["start",0]);
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	//querylist.push(["$sortlabel","PY"]);
	//querylist.push(["$label","PY"]);
	querylist.push(["$sortlabel","DT"]);
	querylist.push(["$label","DT"]);
	querylist.push(["$sortdirect","desc"]);
	querylist.push(["$direct","desc"]);
	querylist.push(["$renew","yes"]);
	if(typeof num !="undefined")
	{
		querylist.push(["$searchtitle","Рекомендуем"]);
	}
	else
	{
		querylist.push(["$searchtitle","Новые поступления"]);
	}
	var db=numDB;
	if(typeof ndb !="undefined")
		db=ndb;
	if(typeof numdbNews != "undefined")
		db=numdbNews;
	var outfrm=outform;
	if(typeof dbs[db].outform!="undefined")
		outfrm=dbs[db].outform;
	querylist.push(["$outform",outfrm]);
	querylist.push(["outformList[0]/outform",outfrm]);
	querylist.push(["outformList[1]/outform","LINEORD"]);
	if(outfrm=="SHORTFM")
	{
		querylist.push(["outformList[2]/outform","SHORTFMS"]);
		querylist.push(["outformList[3]/outform","SHORTFMSTR"]);
	}
	querylist.push(["iddb",db]);
	querylist.push(["query/body",term]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	if(typeof biblio!="undefined")
	{
		var bobj={'query': term ,'databases':[db],'paging':{'limit': portion,'offset': 0}};
		gArr.push(["_bibliostr",JSON.stringify(bobj)]);
		gArr.push(["_session",numsean]);
		querylist.push(["$bibliosearch","yes"]);
	}
	if(typeof solr!="undefined")
	{
		for(var i=0; i<facetss.length; i++)
		{
			querylist.push(["facets["+i+"]/type",facetss[i].type]);
			querylist.push(["facets["+i+"]/name",facetss[i].name]);
			querylist.push(["facets["+i+"]/field",facetss[i].field]);
			querylist.push(["$solr","yes"]);
		}
	}
	//querylist.push(["query/label","PY"]);
	querylist.push(["query/label","DT"]);
	querylist.push(["query/direct","desc"]);
	gArr.push(["querylist",prepareQueryString(querylist,db)]);
	callToRCP(gArr);
}

/*конец основные поисковые функции*/

/*---------------------------------------------------дополнительные поисковые функции-------------------------------------*/

function callAddQuery(o)/*дополнительные запросы - поиск найденного в других интерфейсах*/
{
	;
}

function searchInCollection(o)/*вывод коллекций для проекта Институт Рошаля*/
{
	lockedfilters="";
	var lab=o.className;
	var term=o.lastChild.value;
	var obj={};
	obj._str='[bracket]'+lab+' '+replaceSymb(term)+'[/bracket]';
	obj._showstr='<i>'+dbs[numDB]["labels"][lab][0]+'</i> '+replaceSymb(term);
	simpleSearch(lab,obj);
}

/*для поиска типа combined выпадающий список из справочного файла для проекта Нематериальное наследие*/

function showHBRegions()
{
	typework="";
	if(take('handbook_container').n!=null)
	{
		if(take('handbook_container').n.childNodes.length==1)
		{
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			gArr.push(["_ctype","text/xml; charset=utf-8"]);
			querylist.push(["_service","STORAGE:opacsettingd:HandbookView"]);
			querylist.push(["_version","1.0.0"]);
			querylist.push(["session",numsean]);
			querylist.push(["format","RUSMARC"]);
			querylist.push(["type","BIBL"]);
			querylist.push(["name[0]",handbookname]);
			querylist.push(["_xmlstring","handbook"]);
			gArr.push(["querylist",prepareQueryString(querylist)]);
			ajaxToRCP(gArr,callBackShowHBRegions);
		}
	}
}

function callBackShowHBRegions(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	if(x.responseXML == null)
	{
		eval(x.responseText);
		delLayerWin();
		WriteError(error);
	}
	else
	{
		var xml = x.responseXML;
		var xmlDoc=xml.documentElement;
		if(xmlDoc==null)
		{
			eval(x.responseText);
			if(typeof error!="undefined")
				WriteError(error);
		}
		else
		{
			var root=getcNode(xmlDoc);
			var doc=take('handbook_container');
			doc.n.innerHTML="";
			if(root.hasChildNodes())
			{
				var kids=root.childNodes;
				for(var i=0; i<kids.length; i++)
				{
					if(kids[i].nodeType==1)
					{
						doc.create('div',{className:kids[i].getAttribute('value'),textNode:kids[i].getAttribute('title'),onmousedown:'function(){searchHBRegions(this)}'});
					}
				}
			}
		}
	}
}

function searchHBRegions(o)
{
	showrubterm=o.className;
	showtext=o.innerHTML;
	simpleSearch(handbooklabel);
}

/*конец для поиска типа combined выпадающий список из справочного файла для проекта Нематериальное наследие*/

function searchWithFacet(o)/*имитация фасетов без solr или bibliosearch средствами ADABAS*/
{
	typework="search";
	typesearch="combined";
	var handler=modules["search"].directory+'/search.php';
	livsrc=null;
	livlabel="";
	var term=o.innerHTML;
	var lab=o.className;
	var slab=take(o.parentNode.parentNode.parentNode).getsign('input',{className:'label'})[0].value;
	var sterm=take(o.parentNode.parentNode.parentNode).getsign('input',{className:'termin'})[0].value;
	var str='[bracket]'+slab+' '+sterm+'*[/bracket]'+' AND [bracket]'+lab+' '+term+'*[/bracket]';
	var showstr=_showstr+' и <i>'+dbs[numDB]["labels"][lab][0]+'</i> '+term;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.7.0"]);
	querylist.push(["session",numsean]);
	if(typeof _localiddb!="undefined")
		querylist.push(["iddb",_localiddb]);
	else
		querylist.push(["iddb",numDB]);
	querylist.push(["_start",0]);
	querylist.push(["start",0]);
	//querylist.push(["_history","yes"]);	
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	if((typeof dbs[numDB]!="undefined")&&(typeof dbs[numDB].outform!="undefined"))
		outfrm=dbs[numDB].outform;
	querylist.push(["$outform",outfrm]);
	querylist.push(["outformList[0]/outform",outfrm]);
	querylist.push(["outformList[1]/outform","LINEORD"]);
	if(outfrm=="SHORTFM")
	{
		querylist.push(["outformList[2]/outform","SHORTFMS"]);
		querylist.push(["outformList[3]/outform","SHORTFMSTR"]);
	}
	str=brackets(str);
	querylist.push(["query/body",prepareTerm(str)]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function seeAddNN(ind)/*запрос на подробный вывод для проекта Нематериальное наследие*/
{
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.3.0"]);
	querylist.push(["session",numsean]);
	var tmp=/\\{1,}/g;
	if(tmp.test(ind))
		ind=ind.replace(tmp,'\\');
	querylist.push(["iddbIds[0]/id",ind]);
	var db=numDB;
	if((typeof rdb!="undefined")&&(rdb!=""))
	{
		db=rdb;
	}
	if(typeof _str=="undefined")
		db=numdbBIBL;
	querylist.push(["iddbIds[0]/iddb",db]);
	var dboutff=outformfull;
	if((typeof dbs[db] !="undefined")&&(typeof dbs[db].outformfull !="undefined"))
		dboutff=dbs[db].outformfull;
	//querylist.push(["outform",dboutff]);
	querylist.push(["outform","FULLTEST"]);
	querylist.push(["_history","yes"]);
	querylist.push(["$iddb",db]);
	scrollobj=take(replaceSlash(ind)).n;
	var arg={};
	arg.cls='dialog2';
	arg.message=" ";
	showLayerWin('addnnwin',arg);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callbackseeAddNN);
}

function callbackseeAddNN(x)/*подробный вывод для проекта Нематериальное наследие*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		var lastscrollobj=scrollobj;
		scrollobj=null;
		delLayerWin();
		scrollobj=lastscrollobj;
		WriteError(error);
	}
	else
	{
		var doc=take('addnnwinform');
		doc.n.innerHTML="";
		if(parseInt(response[0]._size,10)>0)
		{
			var img=pathimg+'/nofoto2.gif';
			var bibcard='';
			var bibres='';
			var addres='';
			for (var key in response[0])
			{
				if(key.indexOf('_result_')!=-1)
				{
					var value = response[0][key];
					var arr=value._FULLTEST_0[0].split('[END]');
					bibres+='<div class="bibres">';
					if(arr[0]!='')
					{
						img=arr[0].substring(arr[0].indexOf('[show]')+6,arr[0].indexOf('[/show]'));
/*только для проекта rusfolknasledie
						if(img.indexOf('http:')==-1)
								img='http://ih-clone.rucml.ru'+img;
конец только для проекта rusfolknasledie*/
							}
					if(arr[1]!='')
					{
						var annot='';
						var pref='';
						var postf='';
						var title='';
						if(arr[1].indexOf('[ANNOT]')!=-1)
						{
							annot=arr[1].substring(arr[1].indexOf('[ANNOT]')+7,arr[1].indexOf('[/ANNOT]'));
							pref=arr[1].substring(0,arr[1].indexOf('[ANNOT]'));
							postf=arr[1].substring(arr[1].indexOf('[/ANNOT]')+8);
							if(pref.indexOf('[TITLE]')!=-1)
								title='<div class="TITLE">'+pref.substring(pref.indexOf('[TITLE]')+7,pref.indexOf('[/TITLE]'))+'</div>';
						}
						else
						{
							pref=arr[1].substring(0,arr[1].indexOf('[TITLE]'));
							postf=arr[1].substring(arr[1].indexOf('[/TITLE]')+8);
							title='<div class="TITLE">'+arr[1].substring(arr[1].indexOf('[TITLE]')+7,arr[1].indexOf('[/TITLE]'))+'</div>';
						}
						var titlelogo='';
						if(pref.indexOf('[titleLogo]')!=-1)
							titlelogo='<div class="titlelogo">'+pref.substring(pref.indexOf('[titleLogo]')+11,pref.indexOf('[/titleLogo]'))+'</div>';
						var passport='';
						if(pref.indexOf('[passport]')!=-1)
							passport='<div class="passport">'+pref.substring(pref.indexOf('[passport]')+10,pref.indexOf('[/passport]'))+'</div>';
						var rubric='';
						if(pref.indexOf('[RUBRIC]')!=-1)
							rubric='<div class="rubric">'+pref.substring(pref.indexOf('[RUBRIC]')+8,pref.indexOf('[/RUBRIC]'))+'</div>';
						var tmp1=/\[RUB\]/gi;
						var tmp2=/\[\/RUB\]\<p\>/gi;
						if(tmp1.test(arr[1]))
						{
							rubric=rubric.replace(tmp1,'<p class="rubricator"  onmousedown="searchCLR2(this)" id="');
							rubric=rubric.replace(tmp2,'">');
						}
						var tclass="";
						if(titlelogo!="")
							tclass=' tooltip';
						annot='<div class="shotform'+tclass+'"><img src="'+img+'"/>'+passport+'</div>'+titlelogo+''+title+''+rubric+'<p class="annot">'+annot;
						bibres+=parseBB(annot)+'</p>';
						bibres+=parseBB(postf);
					}
					bibres+='</div>';
/*только для проекта rusfolknasledie
					var tmp=/ src="\//g;
					var tmp1=/ href="\//g;
					var tmp2=/file=\//g;
					if(tmp.test(bibres))
					{
						bibres=bibres.replace(tmp,' src="http://ih-clone.rucml.ru/');
					}
					if(tmp1.test(bibres))
					{
						bibres=bibres.replace(tmp1,' href="http://ih-clone.rucml.ru/');
					}
					if(tmp2.test(bibres))
					{
						bibres=bibres.replace(tmp2,'file=http://ih-clone.rucml.ru/');
					}
конец только для проекта rusfolknasledie*/
					for(i=2; i<arr.length-1; i++)
					{
						if(arr[i]!='')
						{
							addres+='<div class="addres">';
							var addarr=arr[i].split('</p>');
							for(j=0; j<addarr.length; j++)
							{
								if(addarr[j].indexOf('[big]')!=-1)
								{
									addres+='<div title="Развернуть" onclick="showHide1(this);" class="wrapped">'+addarr[j].substring(addarr[j].indexOf('[big]')+5,addarr[j].indexOf('[/big]'))+'</p></div><div class="expl" style="display:none">';
								}
								else
								{
									if(addarr[j]!='')
									{
										if(addarr[j].indexOf('[AF]')!=-1)
										{
											var from=addarr[j].substring(addarr[j].indexOf('[AF]'),addarr[j].indexOf('[/AF]')+5);
											var ind=addarr[j].substring(addarr[j].indexOf('[AF]')+4,addarr[j].indexOf('[/AF]'));
											var to='<span class="a"  onmousedown="vocsearchInAF(\'ID\',\''+replaceSymb(ind)+'\')">См. в авторитетном файле</span>'
											addarr[j]=addarr[j].replace(from,to);
										}
										addres+=''+addarr[j]+'</p>';
									}
								}
							}
							addres+='</div></div>';
						}
					}
				}
			}
			doc.n.innerHTML='<div class="addnndiv table"><div class="row"><div class="td">'+bibres+'<div class="spacer"></div><hr/></div></div><div class="row"><div class="td">'+parseBB(addres)+'</div></div></div>';
		}
		else
		{
			doc.create('p',{textNode:'Запись с данным идентификатором не найдена.', style:{textAlign:'center',margin:'50px 0 0 0'}});
		}
	}
}

/*------------------------------------для проекта СКК ЛИБНЕТ------------------------------------*/

var culttype='CULTURE';

function addSeeCulture(ind,rdb)/*подробный вывод описания объектов культуры*/
{
	typework="search";
	lockedfilters="";
	var handler=modules["collection"].directory+'/culture.php';
	if(typeof rdb!="undefined")
		numDB=rdb;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	var start=0;
	if(typeof _start!="undefined")
		start=_start;
	querylist.push(["_start",start]);
	var str=prepareStr(_str);
	var showstr=prepareStr(_showstr);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	querylist.push(["iddbIds[0]/id",ind]);
	querylist.push(["iddbIds[0]/iddb",numDB]);
	querylist.push(["_iddb",numDB]);
	querylist.push(["$iddb",numDB]);
	querylist.push(["$outform","COLLECTION"]);
	querylist.push(["outformList[0]/outform","SHOTFRM"]);
	querylist.push(["outformList[1]/outform","CULTURE"]);
	querylist.push(["outformList[2]/outform","FULLFRMARC"]);
	querylist.push(["outformList[3]/outform","UNIMARC"]);
	querylist.push(["$stopfilters","yes"]);
	querylist.push(["$culttype",culttype]);
	querylist.push(["_history","yes"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function showFormatСC(o)/*переключатель типов вывода подробного описания объектов культуры*/
{
	switch(o)
	{
		case 'RUSMARC': take('rusmarc_output').show();
						take('archive_output').hide();
						take('full_output').hide();
						take('bfirst').n.onclick=function(){showFormatСC('FULLFRMARC');};
						take('bfirst').n.value="Полное описание";
						take('bsecond').n.onclick=function(){showFormatСC('CULTURE');};
						take('bsecond').n.value="Описание объекта культуры";
						take('formattitle').n.innerHTML="RUSMARC";
						culttype='RUSMARC';
		break;
		case 'FULLFRMARC': take('rusmarc_output').hide();
						take('archive_output').hide();
						take('full_output').show();
						take('bfirst').n.onclick=function(){showFormatСC('RUSMARC');};
						take('bfirst').n.value="RUSMARC";
						take('bsecond').n.onclick=function(){showFormatСC('CULTURE');};
						take('bsecond').n.value="Описание объекта культуры";
						take('formattitle').n.innerHTML="Полное описание";
						culttype='FULLFRMARC';
		break;
		case 'CULTURE': take('rusmarc_output').hide();
						take('archive_output').show();
						take('full_output').hide();
						take('bfirst').n.onclick=function(){showFormatСC('RUSMARC');};
						take('bfirst').n.value="RUSMARC";
						take('bsecond').n.onclick=function(){showFormatСC('FULLFRMARC');};
						take('bsecond').n.value="Полное описание";
						take('formattitle').n.innerHTML="Описание объекта культуры";
						culttype='CULTURE';
		break;
		default:break;
	}
}

function showItemСC(i,arg)/*запрос на вывод ссылок в подробном описании объектов культуры*/
{
	showFormatСC(culttype);
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	var arr=arg.split("[END]");
	for(var j=0; j<arr.length; j++)
	{
		querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
		querylist.push(["_version","2.0.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["iddb",numDB]);
		querylist.push(["action","SEEF"]);
		querylist.push(["id",replaceS(arr[j])]);
		querylist.push(["$ind","alinkss"]);
		querylist.push(["outformList[0]/outform","SHOTFRM"]);
		querylist.push(["_history","yes"]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
		querylist.length=0;
	}
	ajaxToRCP(gArr,callbackShowItemСC);
}

function callbackShowItemСC(x)/*вывод ссылок в подробном описании объектов культуры*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		var div=take(_ind);
		div.n.innerHTML="";
		var size=parseInt(response[0]._size,10);
		if(size>0)
		{
			for(var j=0; j<response.length; j++)
			{				
				for (var key in response[j])
				{
					if(key.indexOf('_result_')!=-1)
					{
						var value = response[j][key];
						var ind=replaceSymb(value._id);
						var arrcont=value._SHOTFRM_0;
						for(var i=0; i<arrcont.length;i++)
						{
							if(i==0)
							{
								var text=arrcont[i].replace(/\[b\]/gi,'');
								text=text.replace(/\[\/b\]/gi,'');
								div.create('p',{textNode:text,className:'b u red',onclick:'function(){addSeeCulture("'+ind+'")};'});
								break;
							}
						}
					}
				}
			}
			take('incdiv').show();
		}
	}
}

var coltype='COLLECTION';

function addSeeCollection(ind,rdb)/*подробный вывод коллекций*/
{
	typework="search";
	lockedfilters="";
	var handler=modules["collection"].directory+'/collection.php';
	if(typeof rdb!="undefined")
		numDB=rdb;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	var start=0;
	if(typeof _start!="undefined")
		start=_start;
	querylist.push(["_start",start]);
	var str=prepareStr(_str);
	var showstr=prepareStr(_showstr);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	querylist.push(["iddbIds[0]/id",ind]);
	querylist.push(["iddbIds[0]/iddb",numDB]);
	querylist.push(["_iddb",numDB]);
	querylist.push(["$iddb",numDB]);
	querylist.push(["$outform","COLLECTION"]);
	querylist.push(["outformList[0]/outform","SHOTFRM"]);
	querylist.push(["outformList[1]/outform","COLLECTION"]);
	querylist.push(["outformList[2]/outform","FULLFRMARC"]);
	querylist.push(["outformList[3]/outform","UNIMARC"]);
	querylist.push(["$stopfilters","yes"]);
	querylist.push(["$coltype",coltype]);
	querylist.push(["_history","yes"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function showFormatС(o)/*переключатель типов вывода подробного описания коллекций*/
{
	switch(o)
	{
		case 'RUSMARC': take('rusmarc_output').show();
						take('archive_output').hide();
						take('full_output').hide();
						take('bfirst').n.onclick=function(){showFormatС('FULLFRMARC');};
						take('bfirst').n.value="Полное описание";
						take('bsecond').n.onclick=function(){showFormatС('COLLECTION');};
						take('bsecond').n.value="Описание коллекции";
						take('formattitle').n.innerHTML="RUSMARC";
						coltype='RUSMARC';
		break;
		case 'FULLFRMARC': take('rusmarc_output').hide();
						take('archive_output').hide();
						take('full_output').show();
						take('bfirst').n.onclick=function(){showFormatС('RUSMARC');};
						take('bfirst').n.value="RUSMARC";
						take('bsecond').n.onclick=function(){showFormatС('COLLECTION');};
						take('bsecond').n.value="Описание коллекции";
						take('formattitle').n.innerHTML="Полное описание";
						coltype='FULLFRMARC';
		break;
		case 'COLLECTION': take('rusmarc_output').hide();
						take('archive_output').show();
						take('full_output').hide();
						take('bfirst').n.onclick=function(){showFormatС('RUSMARC');};
						take('bfirst').n.value="RUSMARC";
						take('bsecond').n.onclick=function(){showFormatС('FULLFRMARC');};
						take('bsecond').n.value="Полное описание";
						take('formattitle').n.innerHTML="Описание коллекции";
						coltype='COLLECTION';
		break;
		default:break;
	}
}

function showItemС(i,arg)/*запрос на вывод ссылок в подробном описании коллекций*/
{
	showFormatС(i);
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
	querylist.push(["_version","2.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numDB]);
	querylist.push(["action","SEEF"]);
	querylist.push(["id",replaceS(arg)]);
	querylist.push(["$ind","alinkss"]);
	querylist.push(["outformList[0]/outform","SHOTFRM"]);
	querylist.push(["_history","yes"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callbackShowItemС);
}

function callbackShowItemС(x)/*вывод ссылок в подробном описании коллекций*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		var div=take(_ind);
		div.n.innerHTML="";
		var size=parseInt(response[0]._size,10);
		if(size>0)
		{
			for (var key in response[0])
			{
				if(key.indexOf('_result_')!=-1)
				{
					var value = response[0][key];
					var ind=replaceSymb(value._id);
					var arrcont=value._SHOTFRM_0;
					for(var i=0; i<arrcont.length;i++)
					{
						if(i==0)
						{
							var text=arrcont[i].replace(/\[b\]/gi,'');
							text=text.replace(/\[\/b\]/gi,'');
							div.create('p',{textNode:text,className:'b u red',onclick:'function(){addSeeCollection("'+ind+'")};'});
							break;
						}
					}
				}
			}
			take('incdiv').show();
		}
	}
}

var archtype='ARCHIVE';

function addSeeArchive(ind,rdb)/*подробный вывод архивных материалов*/
{
	typework="search";
	lockedfilters="";
	var handler=modules["archiv"].directory+'/archiv.php';
	if(typeof rdb!="undefined")
		numDB=rdb;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	var start=0;
	if(typeof _start!="undefined")
		start=_start;
	querylist.push(["_start",start]);
	var str=prepareStr(_str);
	var showstr=prepareStr(_showstr);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	querylist.push(["iddbIds[0]/id",ind]);
	querylist.push(["iddbIds[0]/iddb",numDB]);
	querylist.push(["_iddb",numDB]);
	querylist.push(["$iddb",numDB]);
	querylist.push(["$outform","ARCHIV"]);
	querylist.push(["outformList[0]/outform","SHOTFORM"]);
	querylist.push(["outformList[1]/outform","ARCHIV"]);
	querylist.push(["outformList[2]/outform","FULLFRMARC"]);
	querylist.push(["outformList[3]/outform","UNIMARC"]);
	querylist.push(["$stopfilters","yes"]);
	querylist.push(["$archtype",archtype]);
	querylist.push(["_history","yes"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function showItem(i,arg)/*запрос на вывод ссылок в подробном описании архивных материалов*/
{
	showFormat(i);
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
	querylist.push(["_version","2.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numDB]);
	querylist.push(["action","SEEF"]);
	querylist.push(["id",replaceS(arg)]);
	querylist.push(["$ind","alinkss"]);
	querylist.push(["outformList[0]/outform","SHOTARCHIV"]);
	querylist.push(["outformList[1]/outform","SHOTFORM"]);
	querylist.push(["_history","yes"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callbackShowItem);
}

function callbackShowItem(x)/*вывод ссылок в подробном описании архивных материалов*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		var div=take(_ind);
		div.n.innerHTML="";
		for (var key in response[0])
		{
			if(key.indexOf('_result_')!=-1)
			{
				var value = response[0][key];
				var ind=replaceSymb(value._id);
				var arrcont=value._SHOTFORM_0._content_0;
				for(var i=0; i<arrcont.length;i++)
				{
					if(i==0)
					{
						var text=arrcont[i].replace(/\[b\]/gi,'');
						text=text.replace(/\[\/b\]/gi,'');
						div.create('p',{textNode:text,className:'b u red',onclick:'function(){addSeeArchive("'+ind+'")};'});
						break;
					}
				}
			}
		}
	}
}

function showFormat(o)/*переключатель типов вывода подробного описания архивных материал*/
{
	switch(o)
	{
		case 'RUSMARC': take('rusmarc_output').show();
						take('archive_output').hide();
						take('full_output').hide();
						take('bfirst').n.onclick=function(){showFormat('FULLFRMARC');};
						take('bfirst').n.value="Полное описание";
						take('bsecond').n.onclick=function(){showFormat('ARCHIVE');};
						take('bsecond').n.value="Архивное описание";
						take('formattitle').n.innerHTML="RUSMARC";
						archtype='RUSMARC';
		break;
		case 'FULLFRMARC': take('rusmarc_output').hide();
						take('archive_output').hide();
						take('full_output').show();
						take('bfirst').n.onclick=function(){showFormat('RUSMARC');};
						take('bfirst').n.value="RUSMARC";
						take('bsecond').n.onclick=function(){showFormat('ARCHIVE');};
						take('bsecond').n.value="Архивное описание";
						take('formattitle').n.innerHTML="Полное описание";
						archtype='FULLFRMARC';
		break;
		case 'ARCHIVE': take('rusmarc_output').hide();
						take('archive_output').show();
						take('full_output').hide();
						take('bfirst').n.onclick=function(){showFormat('RUSMARC');};
						take('bfirst').n.value="RUSMARC";
						take('bsecond').n.onclick=function(){showFormat('FULLFRMARC');};
						take('bsecond').n.value="Полное описание";
						take('formattitle').n.innerHTML="Архивное описание";
						archtype='ARCHIVE';
		break;
		default:break;
	}
}

function addSee(ind)/*подробный вывод библиографии в новом окне(смена основного окна)*/
{
	typework="search";
	if(typeof ind=="undefined")
		ind=_biblid;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["add"].directory+'/add.php']);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	var str=prepareStr(_str);
	var showstr=prepareStr(_showstr);
	ind=prepareStr(ind);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	querylist.push(["outformList[0]/outform","FULLFRM1"]);
	querylist.push(["outformList[1]/outform","FULLFRM2S"]);
	querylist.push(["outformList[2]/outform","FULLFRM3"]);
	querylist.push(["outformList[3]/outform","FULLFRM4"]);
	querylist.push(["outformList[4]/outform","FULLFRM5"]);
	querylist.push(["outformList[5]/outform","FULLFRM6"]);
	querylist.push(["outformList[6]/outform","BIBREF"]);
	querylist.push(["iddbIds[0]/id",ind]);
	if(typeof _iddbbibl !="undefined")
		numDB=_iddbbibl;
	querylist.push(["iddbIds[0]/iddb",numDB]);
	querylist.push(["$iddbbibl",numDB]);
	if(typeof _start != "undefined")
		querylist.push(["$start",_start]);
	else
	{
		if((typeof _typesearch !="undefined")&&(_typesearch=="fulltext"))
		{
			if(typeof _prev != "undefined")
				querylist.push(["$prev",_prev]);
			if(typeof _next != "undefined")
				querylist.push(["$next",_next]);
		}
	}
	querylist.push(["$showstr",showstr]);
	querylist.push(["$str",str]);
	querylist.push(["$biblid",replaceSymb(ind)]);
	querylist.push(["$stopfilters","yes"]);
	if(typeof _rubricator !="undefined")
		querylist.push(["$rubricator",_rubricator]);
	if(typeof _rshowstr !="undefined")
		querylist.push(["$rshowstr",_rshowstr]);
	if(typeof _filterstr !="undefined")
		querylist.push(["$filterstr",_filterstr]);
	if(typeof _filtersids !="undefined")
		querylist.push(["$filtersids",_filtersids]);
	if(typeof _fshowstr !="undefined")
		querylist.push(["$fshowstr",_fshowstr]);
	querylist.push(["_history","yes"]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

/*---------------------------------конец для проекта СКК ЛИБНЕТ---------------------------------*/

function fulltextSearch(nm)/*поиск по полному тексту unused*/
{
	typework="search";
	if(((take('itemfulltxt').n==null)||(take('itemfulltxt').n.value==""))&&(nm==null))
	{
		return;
	}
	var ftxt="";
	var str="";
	var showstr="";
	var val=take('itemfulltxt').n.value;
	var lab=take('fulltext_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);
	var startfrom=1;
	var howmuch=portion;
	if(nm!=null)
	{
		if(typeof _str!="undefined")
			str=_str;
		startfrom=nm;
		ftxt=replaceSymb(str);
		showstr=_showstr;
		ftxt=ftxt.replace(/\[\/bracket\]/g,"");
		ftxt=ftxt.replace(/\[bracket\]/g,"");
		ftxt=ftxt.replace(/^FR /,'');
		ftxt=ftxt.replace(/^KS /,'');
	}
	else
	{
		val=val.Trim();
		showstr=str=ftxt=val;
		str="[bracket]"+lab+" "+replaceSymb(str)+"[/bracket]";
		showstr='<i>'+dbs[numDB]["labels"][lab][0]+'</i> '+replaceSymb(showstr);
	}
	str=prepareStr(str);
	showstr=prepareStr(showstr);
	ftxt=prepareStr(ftxt);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	var ftarr=[];
	var bd='declare namespace ft="http://www.w3.org/2002/04/xquery-operators-text" for $rec in input()/diss where ft:text-contains($rec/TEXT, "%search%") order by $rec/ID return $rec/ID';
	if(lab=='KS')
	{
		if(ftxt.indexOf(' ')!=-1)
			ftarr=ftxt.split(' ');
		bd='declare namespace ft="http://www.w3.org/2002/04/xquery-operators-text" for $rec in input()/diss where ';
		if(ftarr.length==0)
			bd+='ft:text-contains($rec/TEXT, "'+ftxt+'")';
		else
		{
			for(var i=0; i<ftarr.length; i++)
			{
				bd+='ft:text-contains($rec/TEXT, "'+ftarr[i]+'")';
				if(i<ftarr.length-1)
					bd+=' and ';
			}
		}
		ftxt='1';
		bd+=' order by $rec/ID return $rec/ID';
	}
	var unesc=encodeVal(bd);
	var handler=modules["fulltext"].directory+'/fulltext.php';
	var outfrm=outform;
	if(typeof dbs[fulltextbase].outform!="undefined")
		outfrm=dbs[fulltextbase].outform;
	var fArr=new Array();
	fArr.push(["_action","fulltext"]);
	fArr.push(["_errorhtml","error1"]);
	fArr.push(["_handler",handler]);
	fArr.push(["_body",unesc]);
	fArr.push(["_start",startfrom]);
	fArr.push(["_session",numsean]);
	fArr.push(["_userId",identif]);
	fArr.push(["_outform",outfrm]);
	fArr.push(["_length",howmuch]);
	fArr.push(["_showstr",showstr]);
	fArr.push(["_str",str]);
	fArr.push(["_typesearch","fulltext"]);	
	fArr.push(["_label",lab]);
	fArr.push(["_iddb",fulltextbase]);
	fArr.push(["_service","STORAGE:opacfindd:FindView"]);
	fArr.push(["_version","2.0.0"]);
	fArr.push(["_history","yes"]);
	fArr.push(["db","fulltext"]);
	fArr.push(["title","Полнотекстовый поиск"]);
	fArr.push(["args[0]/name","search"]);
	fArr.push(["args[0]/value",ftxt]);
	fArr.push(["vars[0]/description","Поисковый термин"]);
	fArr.push(["vars[0]/name","search"]);
	fArr.push(["vars[0]/type","var"]);
	fArr.push(["length",howmuch]);
	fArr.push(["start",startfrom]);
	fArr.push(["portion[0]",portion]);
	callToRCP(fArr);
}

function See8(ind,rdb)/*unused*/
{
	typework="search";
	lockedfilters="";
	var handler=modules["search"].directory+'/search.php';
	var indx=replaceSymb(ind);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error3"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["$stopfilters","yes"]);
	querylist.push(["_start",0]);
	querylist.push(["$length",portion]);
	var db=numDB;
	if((typeof rdb!="undefined")&&(rdb!=""))
	{
		db=rdb;
	}
	querylist.push(["iddbIds[0]/iddb",db]);
	querylist.push(["iddbIds[0]/id",indx]);
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
	var str=prepareStr(_str);
	var showstr=prepareStr(_showstr);
	str=replaceSymb(str);
	showstr=prepareShowstring(showstr);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	querylist.push(["$see","SEE8"]);
	querylist.push(["_history","yes"]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist,db)]);
	var trg=self;
	if(parent.take('recordswin'+''+(parent.countwin-1)).n == null)
	{
		var arg={'cls':'dialog2','target': self, 'message':'ПРОСМОТР ЗАПИСЕЙ','divframe':'1','forlinks':'1'};
		showLayerWin('recordswin',arg);
		self.frames[0].document.open();
		self.frames[0].document.close();
		trg=self.frames[0];
	}
	callToRCP(gArr,trg);
}

function callNewBooks(ndb)/*запрос на вывод новых поступлений при загрузке страницы - unused*/
{
	if(typeof ndb == "undefined")
		ndb=numDB;
	typework="";
	var y=Year-1;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.7.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["start",0]);
	querylist.push(["length",portion]);
	var outfrm=outform;
	if(typeof dbs[ndb].outform!="undefined")
		outfrm=dbs[ndb].outform;
	querylist.push(["$outform",outfrm]);
	querylist.push(["outformList[0]/outform",outfrm]);
	//querylist.push(["outformList[1]/outform","LINEORD"]);
	querylist.push(["iddb",ndb]);
	/*querylist.push(["query/body","(PY BETWEEN '"+y+""+mm+""+dd+"','"+Year+""+mm+""+dd+"')"]);
	querylist.push(["query/label","PY"]);*/
	querylist.push(["query/body","(DT LE '"+Year+""+mm+""+dd+"')"]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	querylist.push(["query/label","DT"]);
	querylist.push(["query/direct","desc"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callBackNewBooks);
}

function callBackNewBooks(x)/*вывод новых поступлений при загрузке страницы - unused*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
		WriteError(error);
	else
	{
		var par=take('newscontainer');
		for (var key in response[0])
		{
			var value = response[0][key];
			if(key.indexOf('result_')!=-1)
			{
				var arr=value._ORDERFORM_0;
				var div=par.create('div',{className:'newrecs'});
				var ns=null;
				for(var i=0; i<arr.length-1; i++)
				{
					ns=div.create('div',{textNode:arr[i],className:'newssign'});
				}
				str+='</div>';
			}
		}
		par.create('div',{title:'еще',textNode:'еще',className:'newselse',onmousedown:'function(){searchNews()}'});
	}
}

/*----------------------------------------------конец дополнительные поисковые функции-------------------------------------*/

/*---------------------------------------------- конец поиск в библиографии ---------------------------------------------------*/