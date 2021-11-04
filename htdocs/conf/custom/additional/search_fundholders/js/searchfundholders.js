/*----------------------------------- поиск библиотек-фондодержателей --------------------------------*/

function searchFundHolders(c,t)/*поиск библиотек*/
{
	typework="search";
	var howmuch=portion;
	var startfrom=0;
	var query='';
	var text='';
	if(typeof t=="undefined")
		text=take('iCA').n.value;
	else
		text=t;
	query='(AH '+replaceSymb(text)+')';
	var showstr=prepareStr('<i>Везде</i> '+replaceSymb(text));
	if((typeof c!="undefined")&&(c !=null))
	{
		if(typeof _length !="undefined")
			howmuch=_length;
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
		if(typeof _showstr !="undefined")
			showstr=prepareStr(_showstr);
		if(typeof _query !="undefined")
			query=prepareStr(_query);
	}
	query=replaceSymb(query);
	showstr=prepareShowstring(showstr);
	numDB=numdbAF;
	typework="search";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["findlib"].directory+'/findlib.php']);
	querylist.push(["_service","STORAGE:opacafd:Find"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numDB]);
	querylist.push(["$iddbaf",numDB]);
	querylist.push(["length",howmuch]);
	querylist.push(["$length",howmuch]);
	querylist.push(["$typesearch","fundholders"]);
	querylist.push(["_history","yes"]);
	querylist.push(["_start",startfrom]);
	querylist.push(["start",startfrom]);
	querylist.push(["$showstr",showstr]);
	querylist.push(["query/body",query]);
	querylist.push(["$query",query]);
	querylist.push(["viewOptions[0]",""]);
	querylist.push(["query/outforms[0]","TITLE"]);
	querylist.push(["query/outforms[1]","ADDRESS"]);
	querylist.push(["query/outforms[2]","BLK856"]);
	//querylist.push(["query/outforms[2]","BLKK856"]);//для СКК ЛИБНЕТ
	gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function nextFh(c)/*поиск библиотек листание*/
{
	searchFundHolders(c);
}

/*-------------------------дополнительные функции-----------------*/

function openSigla(o,ndb,skin,biblid)/*для локальных каталогов сводного каталога*/
{
	var ind="";
	var trg="";
	var db=numdbBIBL;
	if(o!=null)
	{
		ind=o.parentNode.id;
		typework="";
		trg="_blank";
	}
	else
	{
		ind=_lind;
		typework="search";
		trg="_self";
		db=_iddb;
	}
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["sigla"].directory+'/sigla.php']);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.3.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numdbAF]);
	querylist.push(["id",ind]);
	querylist.push(["length",portion]);
	querylist.push(["mode","OUTRECORD"]);
	querylist.push(["outforms[0]","TITLE"]);
	querylist.push(["outforms[1]","ADDRESS"]);
	querylist.push(["outforms[2]","BLK300"]);
	querylist.push(["outforms[3]","BLK305"]);
	querylist.push(["outforms[4]","BLK856"]);
	//querylist.push(["outforms[4]","BLKK856"]);//для СКК ЛИБНЕТ
	querylist.push(["$skin",skin]);
	querylist.push(["$lind",replaceSymb(ind)]);
	querylist.push(["$localiddb",ndb]);
	querylist.push(["$iddb",db]);
	gArr.push(["querylist",prepareQueryString(querylist,numdbAF)]);
	if(typeof biblid!="undefined")
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacfindd:FindView"]);
		querylist.push(["_version","2.5.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["outformList[0]/outform","FULLFRM1"]);
		querylist.push(["outformList[1]/outform","FULLFRM2S"]);
		querylist.push(["outformList[2]/outform","FULLFRM3"]);
		querylist.push(["outformList[3]/outform","FULLFRM4"]);
		querylist.push(["outformList[4]/outform","FULLFRM5"]);
		querylist.push(["outformList[5]/outform","FULLFRM6"]);
		querylist.push(["outformList[6]/outform","BIBREF"]);
		querylist.push(["_brokerid",dbs[db]["brokerid"]]);
		querylist.push(["iddbIds[0]/id",biblid]);
		querylist.push(["iddbIds[0]/iddb",ndb]);
		gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	}
	callToRCP(gArr,trg)
}

function findSigla(o)/*поиск библиотек в новом слое-окне*/
{
	typework="";
	siglaid=o.nextSibling;
	var howmuch=portion;
	var startfrom=0;
	var str=take('mysigla').n.value;
	if(siglaid.style.display=='none')
	{
		if(siglaid.innerHTML=="")
		{
			siglaid.innerHTML='<div class="progress small"><div></div></div>';
			o.className='wrapped_';
			take(siglaid).show();
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			querylist.push(["_service","STORAGE:opacafd:Find"]);
			querylist.push(["_version","1.0.0"]);
			querylist.push(["session",numsean]);
			querylist.push(["iddb",numdbAF]);
			querylist.push(["start",startfrom]);
			querylist.push(["length",howmuch]);
			querylist.push(["_start",startfrom]);
			querylist.push(["$sstart",startfrom]);
			querylist.push(["$length",howmuch]);
			querylist.push(["$sigla",str]);
			querylist.push(["$ids",take('myids').n.value]);
			querylist.push(["query/body","(AH "+str+")"]);
			querylist.push(["viewOptions[0]",""]);
			querylist.push(["query/outforms[0]","TITLE"]);
			querylist.push(["query/outforms[1]","ADDRESS"]);
			querylist.push(["query/outforms[2]","SIGLA"]);
			querylist.push(["query/outforms[3]","BLK856"]);
			//querylist.push(["query/outforms[3]","BLKK856"]);//для СКК ЛИБНЕТ
			gArr.push(["querylist",prepareQueryString(querylist,numdbAF)]);
			ajaxToRCP(gArr,callBackfindSigla);
		}
		else
		{
			o.className='wrapped_';
			take(siglaid).show();
		}
	}
	else
	{
		take(siglaid).hide();
		o.className='wrapped';
	}
}

function findSiglaNext(c)/*листание библиотек в новом слое-окне*/
{
	typework="";
	var howmuch=portion;
	var startfrom=0;
	if(typeof c!="undefined")
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
	if(isNaN(startfrom))
		startfrom=0;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacafd:Find"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numdbAF]);
	querylist.push(["length",howmuch]);
	querylist.push(["$length",howmuch]);
	querylist.push(["$sigla",take('mysigla').n.value]);
	querylist.push(["$ids",take('myids').n.value]);
	querylist.push(["$sstart",startfrom]);
	querylist.push(["_start",startfrom]);
	querylist.push(["start",startfrom]);
	querylist.push(["query/body","(AH "+take('mysigla').n.value+")"]);
	querylist.push(["viewOptions[0]",""]);
	querylist.push(["query/outforms[0]","TITLE"]);
	querylist.push(["query/outforms[1]","ADDRESS"]);
	querylist.push(["query/outforms[2]","SIGLA"]);
	querylist.push(["query/outforms[3]","BLK856"]);
	//querylist.push(["query/outforms[3]","BLKK856"]);//для СКК ЛИБНЕТ
	gArr.push(["querylist",prepareQueryString(querylist,numdbAF)]);
	ajaxToRCP(gArr,callBackfindSigla);
}

function wPs(s,b)/*порции для листания библиотек в новом слое-окне*/
{
	var pages="";
	if(s==0)
		pages="";
	else
	{
		var N1=Math.ceil(s/portion);
		if(N1!= 1)
		{
			var N2=Math.ceil(N1/10);
			var N3=Math.ceil((b+1)/portion);
			var N4=Math.ceil(N3/10);
			var i1=(N4-1)*10+1;
			var N5=N4*10;
			var i2;
			if(N1>N5)
				i2=N4*10;
			else
				i2=N1;
			if(N4 > 1)
			{
				pages+='&#160;<a class="new" href="javascript: findSiglaNext('+parseInt((N4-2)*10 + 1)+')">&lt;&lt; Пред.</a>&#160;';
			}
			for(;i1<=i2; i1++)
			{
				if(i1==N3)
				{
					pages+='&#160;<span class="now">'+i1+'</span>&#160;';
				}
				else
				{
					pages+='&#160;<a class="new" href="javascript: findSiglaNext('+parseInt(i1)+')">'+i1+'</a>&#160;';
				}
			}
			if(N2 > N4)
			{
				pages+='&#160;<a class="new" href="javascript: findSiglaNext('+parseInt(N4*10 + 1)+')">След. &gt;&gt;</a>&#160;';
			}
		}
	}
	return pages;
}

function callBackfindSigla(x)/*окно вывода резульатов поиска библиотек*/
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
		siglaid.innerHTML="";
		var sstr=take('searchquery').n.value;
		var count=0;
		var size=parseInt(response[0]._size,10);
		var pages=take(siglaid).create('div',{className:'pages'});
		var doc=take(siglaid).create('div',{className:'table w100', id:'siglatable'});
		var pages1=take(siglaid).create('div',{className:'pages'});
		if(size>0)
		{
			for(var arg in response[0])
			{
				if(arg.indexOf('_result_')!=-1)
				{
					var value=response[0][arg];
					var ind=value._id;
					var titl="";
					var addr="";
					var sigla="";
					var tr=doc.create('div',{className: 'row'});
					tr.create('div',{className:'td w3',textNode:(parseInt(_sstart,10)+count+1)});
					var td=tr.create('div',{className:'td'});
					var td1=tr.create('div',{id:ind,className:'td w20'});
					var ek="";
					var site="";
					var url="";
					var abis="";
					var skin="";
					var ndb="";
					for(var sign in value)
					{
						if(sign.indexOf('userforms_')!=-1)
						{
							var val=value[sign];
							var t=val._AFANNOTTEXT_0._title;
							for(var k in val._AFANNOTTEXT_0)
							{
								var v="";
								if(k.indexOf('entries_')!=-1)
									v=val._AFANNOTTEXT_0[k];
								switch(t)
								{
									case "Title":		if(typeof v._text!="undefined")
															titl=v._text;
														break;
									case "Addresse":	if(typeof v._text!="undefined")
															addr=v._text;
														break;
									case "Sigla":		if(typeof v._text!="undefined")
															sigla=v._text;
														break;
									case "Internet":	if(typeof v._text!="undefined")
														{
															var arr=v._text.split('[END]');
															if(arr[0]=='Интернет-сайт')
															{
																site=arr[1];
															}
															if(arr[0]=='Электронный каталог')
															{
																ek=arr[1];
															}
															if(arr[0]=='Поиск в ЭК')
															{
																url=arr[1];
															}
															if(arr[0]=='ABIS')
															{
																abis=arr[1];
															}
														}
														break;
									default:			break;
								}
							}
						}
					}
					if(url!="")
					{
						td.create('span',{className:'afsearchimg'});
						td.create('span',{title:'Перейти в библиотеку',textNode: titl,className:'f120 c8 u curs',onclick:'function(){openUrl(this,\''+sigla+'\',\''+abis+'\',\''+url+'\')}'});
					}
					else
						td.create('div',{textNode: titl,className:'f120 c8'});
					td.create('div',{className:'afsmall c6 pl20x',textNode:addr});
					if((sigla!="СКБР")&&(sigla!="СКЭР")&&(sigla!="КБД"))
					{
						td1.create('span',{className:'aflinkinfo p5x',textNode:'О библиотеке',onmousedown:'function(){showLibInfo(this.parentNode.id)}'});
						if(site!="")
							td1.create('a',{className:'aflinkinfo p5x',textNode:'Интернет-сайт',target:'_blank',href:site});
						if(ek!="")
							td1.create('a',{className:'aflinkinfo p5x',textNode:'Электронный каталог',target:'_blank',href:ek});
					}
					count++;
				}
			}
			pages.n.innerHTML=wPs(parseInt(size,10),parseInt(_sstart,10));
			pages1.n.innerHTML=wPs(parseInt(size,10),parseInt(_sstart,10));
		}
		else
		{
			doc.create('div',{textNode: 'Библиотеки не найдены.', style:{textAlign:'center'}});
		}
	}
}

function showLibInfo(ind)/*запрос вывода информации о библиотеке*/
{
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.3.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numdbAF]);
	querylist.push(["id",ind]);
	querylist.push(["length",portion]);
	querylist.push(["$length",portion]);
	querylist.push(["$start",1]);
	querylist.push(["mode","OUTRECORD"]);
	querylist.push(["outforms[0]","BLK856"]);
	//querylist.push(["outforms[0]","BLKK856"]);//для СКК ЛИБНЕТ
	querylist.push(["outforms[1]","TITLE"]);
	querylist.push(["outforms[2]","ADDRESS"]);
	querylist.push(["outforms[3]","BLK305"]);
	querylist.push(["outforms[4]","BLK300"]);
	querylist.push(["outforms[5]","BLOCK310"]);
	querylist.push(["outforms[6]","BLOCK320"]);
	querylist.push(["outforms[7]","BLOCK330"]);
	querylist.push(["outforms[8]","BLOCK340"]);
	querylist.push(["outforms[9]","BLOCK4"]);
	querylist.push(["outforms[10]","BLOCK5"]);
	querylist.push(["outforms[11]","BLOCK7"]);
	gArr.push(["querylist",prepareQueryString(querylist,numdbAF)]);
	ajaxToRCP(gArr,openInfoWin);
}

function openInfoWin(x)/*отображение информации о библиотеке*/
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
		if(take('infowinform').n==null)
		{
			var arg={'cls':'dialog2','message': 'Информация','cls':'dialog2','width':'95%','height':'95%'};
			showLayerWin('infowin',arg);
		}
		var doc=take('infowinform');
		doc.n.innerHTML="";
		var div=doc.create('div',{className:'infores'});
		var titl='';
		var addr='';
		var ek='';
		var site='';
		var img='';
		var sigla='';
		var outer=div.create('div',{className:'infores'});
		var inner=div.create('div',{className:'infores'});
		outer.create('img',{src:pathimg+'/nophoto.jpg',align:'left',style:{margin:'0 20px 10px 0'}});
		for(arg in response[0])
		{
			var value=response[0][arg];
			if(arg.indexOf('_result_')!=-1)
			{
				var val=value._AFANNOTTEXT_0;
				for(term in val)
				{
					var afv=val[term];
					if(term.indexOf('_entries_')!=-1)
					{
						if(val._title=='Internet')
						{
							var arr=afv._text.split('[END]');
							if(arr[0]=='Интернет-сайт')
							{
								site=arr[1];
							}
							if(arr[0]=='Электронный каталог')
							{
								ek=arr[1];
							}
							if(arr[0]=='IMG')
							{
								img=arr[1];
							}
							if(arr[0]=='Каталог в СКБМ')
							{
								sigla=arr[2];
							}
						}
						else if(val._title=='Title')
						{
							titl=val._entries_0._text;
						}
						else if(val._title=='Addresse')
						{
							addr=val._entries_0._text;
						}
						else
						{
							inner.create('p',{textNode:replaceSymb(afv._text)});
						}
					}
				}
				if(typeof value._AFANNOTREF_0!="undefined")
				{
					var ref=inner.create('div',{className:'ml210px'});
					var v=value._AFANNOTREF_0;
					if(typeof v._title!="undefined")
					{
						if(v._title=="См. также более узкое понятие:")
						{
							ref.create('p',{textNode:'Включает:',className:'b pt5px pb5px'});
						}
						if(v._title=="См. также более широкое понятие:")
						{
							ref.create('p',{textNode:'Входит в:',className:'b pt5px pb5px'});
						}
					}
					for(t in v)
					{
						var args=v[t];
						if(t.indexOf('_references_')!=-1)
						{
							if(typeof args._biblQuery!="undefined")
							{
								ref.create('p',{textNode:replaceSymb(args._biblQuery),className:'aflinkinfo',onclick:'function(){showLibInfo(\''+replaceSymb(args._id)+'\');}'});
							}
						}
					}
				}
			}
		}
		outer.create('p',{className:'fstr',textNode:titl});
		if((sigla.indexOf('ЗАО')==-1)&&(sigla.indexOf('ВАО')==-1)&&(sigla.indexOf('СЗАО')==-1)&&(sigla.indexOf('СВАО')==-1))
		{
			var p1=outer.create('p');
			p1.create('b',{textNode:'Адрес: '});
			p1.text(addr);
		}
		if(site!="")
		{
			var p=outer.create('p');
			p.create('b',{textNode:'Интернет-сайт: '});
			p.create('a',{target:'_blank',href:site,textNode:site});
		}
		if(ek!="")
		{
			var p=outer.create('p');
			p.create('b',{textNode:'Электронный каталог: '});
			p.create('a',{target:'_blank',href:ek,textNode:ek});
		}
	}
}

function checkAvail(o,ndb,skin,c)/*уточнить наличие для проекта СКБМ*/
{
	typework="";
	var ind=o.parentNode.parentNode.parentNode.parentNode.id+'search';
	var howmuch=portion;
	var startfrom=0;
	var biblid=take('biblid'+c).n.value;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacafd:Find"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numdbAF]);
	querylist.push(["start",startfrom]);
	querylist.push(["length",howmuch]);
	querylist.push(["_start",startfrom]);
	querylist.push(["$length",howmuch]);
	querylist.push(["$biblid",biblid]);
	querylist.push(["$ind",ind]);
	querylist.push(["query/body","(ID '"+o.parentNode.id+"')"]);
	querylist.push(["viewOptions[0]",""]);
	querylist.push(["query/outforms[0]","BLK856"]);
	//querylist.push(["query/outforms[0]","BLKK856"]);//для СКК ЛИБНЕТ
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,callBackCheckAvail);
}

function callBackCheckAvail(x)/*вывод информации о наличии для проекта СКБМ*/
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
		var ek="";
		var url="";
		var abis="";
		if(typeof response[0]._result_0._userforms_0._AFANNOTTEXT_0!="undefined")
		{
			for (sign in response[0]._result_0._userforms_0._AFANNOTTEXT_0)
			{
				var val = response[0]._result_0._userforms_0._AFANNOTTEXT_0[sign];
				if(sign.indexOf('_entries_')!=-1)
				{
					var arr=val._text.split('[END]');
					var arr=val._text.split('[END]');
					if(arr[0]=='Электронный каталог')
					{
						ek=arr[1];
					}
					if(arr[0]=='Поиск в ЭК')
					{
						url=arr[1];
					}
					if(arr[0]=='ABIS')
					{
						abis=arr[1];
					}
				}
			}
		}
		if((url!="")&&(ek!="")&&(abis!=""))
		{
			var searchquery=take(_ind).n.value;
			var SB="", AU="", TI="", PY="";
			if(searchquery.indexOf('[NI]')!=-1)
			{
				SB=searchquery.substring(searchquery.indexOf('[NI]')+4,searchquery.indexOf('[/NI]'));
				if((SB.indexOf('X')!=-1)||(SB.indexOf('Х')!=-1)||(SB.indexOf('(')!=-1)||(SB.indexOf(')')!=-1)||(SB.indexOf('[')!=-1)||(SB.indexOf(']')!=-1))
					SB="";
			}
			if(searchquery.indexOf('[RP]')!=-1)
				AU=searchquery.substring(searchquery.indexOf('[RP]')+4,searchquery.indexOf('[/RP]'));
			if(searchquery.indexOf('[TITL]')!=-1)
				TI=searchquery.substring(searchquery.indexOf('[TITL]')+6,searchquery.indexOf('[/TITL]'));
			if(searchquery.indexOf('[PY]')!=-1)
				PY=searchquery.substring(searchquery.indexOf('[PY]')+4,searchquery.indexOf('[/PY]'));
			PY=PY.replace(/\[/g,'');
			PY=PY.replace(/\]/g,'');
			if((PY.indexOf('#')!=-1)||(PY.indexOf('|')!=-1))
			{
				PY="";
			}
			else
			{
				if(isNaN(parseInt(PY)))
				{
					PY="";
				}
			}
			var str="";
			if(abis=="OPAC2")
			{
				var biblid=_biblid;
				//biblid=biblid.substring(biblid.lastIndexOf('-')+1);//если 713 поле
				var expression="(ID '"+replaceSlash(prepareStr(biblid))+"')";
				window.open(url+''+encodeVal(expression), "");
			}
			else if(abis=="JIRBIS")
			{
				var biblid=_biblid;
				biblid=biblid.substring(biblid.lastIndexOf('-')+1);
				var expression=replaceSlash(prepareStr(biblid));
				window.open(url+''+encodeVal(expression), "");
			}
			else if(abis=="MEGAPRO")
			{
				if(SB!="")
				{
					str="&lookfor0%5B%5D="+encodeVal(SB)+"&type0%5B%5D=ISN";
				}
				else
				{
					if(AU!="")
					{
						str+="&lookfor0%5B%5D="+encodeVal(AU)+"&type0%5B%5D=Author";
					}
					if(TI!="")
					{
						str+="&lookfor0%5B%5D="+encodeVal(TI)+"&type0%5B%5D=Title";
					}
					if(PY!="")
					{
						str+="&lookfor0%5B%5D="+encodeVal(PY)+"&type0%5B%5D=year";
					}
				}
				window.open(url+''+str, "");
			}
			else if(abis=="MEGAPRO1")
			{
				if(SB!="")
				{
					str="&term_0="+encodeVal(SB);
				}
				else
				{
					if(AU!="")
					{
						str+="&term_1="+encodeVal(AU);
					}
					if(TI!="")
					{
						str+="&term_2="+encodeVal(TI);
					}
					if(PY!="")
					{
						str+="&filter_dateFrom="+encodeVal(PY)+"&filter_dateTo="+encodeVal(PY);
					}
				}
				window.open(url+''+str, "");
			}
			else if(abis=="MARC")
			{
				if(AU!="")
				{
					str+="&T1="+encodeVal(AU);
				}
				if(TI!="")
				{
					str+="&T2="+encodeVal(TI);
				}
				window.open(url+''+str, "");
			}
			else if(abis=="IRBIS")
			{
				var AND="";
				if(SB!="")
				{
					str+="(<.>B="+SB+"<.>)";
					AND='%2B';
				}
				if(AU!="")
				{
					str+=AND+"(<.>A="+encodeVal(AU)+"$<.>)";
					AND='*';
				}
				if(TI!="")
				{
					str+=AND+"(<.>T="+encodeVal(TI)+"$<.>)";
					AND='*';
				}
				if(PY!="")
				{
					str+=AND+"(<.>G="+PY+"$<.>)";
				}
				window.open(url+''+str, "");
			}
			else
			{
				window.open(url, "");
			}
		}
		else
		{
			alert('Невозможно перейти в локальный каталог.');
		}
	}
}

function openUrl(o,sigla,abis,searchstr)/*переход в каталог библиотеки для проекта СКК*/
{
	var searchquery=take('searchquery').n.value;
	var expression="", SB="", AU="", TI="", PY="";
	if(searchquery.indexOf('[NI]')!=-1)
	{
		SB=searchquery.substring(searchquery.indexOf('[NI]')+4,searchquery.indexOf('[/NI]'));
		if((SB.indexOf('X')!=-1)||(SB.indexOf('Х')!=-1)||(SB.indexOf('(')!=-1)||(SB.indexOf(')')!=-1)||(SB.indexOf('[')!=-1)||(SB.indexOf(']')!=-1))
			SB="";
	}
	if(searchquery.indexOf('[RP]')!=-1)
		AU=searchquery.substring(searchquery.indexOf('[RP]')+4,searchquery.indexOf('[/RP]'));
	if(searchquery.indexOf('[TITL]')!=-1)
		TI=searchquery.substring(searchquery.indexOf('[TITL]')+6,searchquery.indexOf('[/TITL]'));
	if(searchquery.indexOf('[PY]')!=-1)
		PY=searchquery.substring(searchquery.indexOf('[PY]')+4,searchquery.indexOf('[/PY]'));
	PY=PY.replace(/\[/g,'');
	PY=PY.replace(/\]/g,'');
	if((PY.indexOf('#')!=-1)||(PY.indexOf('|')!=-1))
	{
		PY="";
	}
	else
	{
		if(isNaN(parseInt(PY)))
		{
			PY="";
		}
	}
	var AND="";
	if(abis=="OPAC")
	{
		if(AU!="")
		{
			AU=AU.replace(/\(/g,'\\(');
			AU=AU.replace(/\)/g,'\\)');
			if(sigla.toUpperCase()=='ЦНМБ')
				expression+='(RP '+replaceSymb3(AU)+')';
			else if((sigla.toUpperCase()=='АСТРАХАНСКАЯ ОНБ')||(sigla.toUpperCase()=='Б СДС МОСКВА'))
				expression+='(AC '+replaceSymb3(AU)+')';
			else
				expression+='(AU '+replaceSymb3(AU)+')';
			AND=" AND ";
		}
		if(TI!="")
		{
			TI=TI.replace(/\(/g,'\\(');
			TI=TI.replace(/\)/g,'\\)');
			if(sigla=='ЦНМБ')
				expression+=AND+'(TITL '+replaceSymb3(TI)+')';
			else
				expression+=AND+'(TI '+replaceSymb3(TI)+')';
			AND=" AND ";
		}
		if(PY!="")
		{
			expression+=AND+"(PY '"+PY+"')";
		}
		var today=new Date();
		var ParmScr="menubar=no,width=" + (screen.width - 12) +
		",height=" + (screen.height - 130) +
		",left=0,top=0,resizable=yes,toolbar=no,location=no,scrollbars=yes,directories=no,status=yes";
		var tmp=/\[d\]/g;
		if(tmp.test(searchstr))
			searchstr=searchstr.replace(tmp,'$');
		var url=searchstr.split("?")[0];
		var hashstr=searchstr.split("?")[1];
		var ssearchstr=hashstr.split("&");
		var arg0=ssearchstr[0].split("=")[1];
		var arg1=ssearchstr[1].split("=")[1];
		var cgi="/cgiopac";
		var win=window.open("", "opac"+Math.floor(Math.random()*9999)+today.getTime(), ParmScr);
		win.document.open();
		win.document.writeln('<html><head><title>OPAC-Global</title>'+
		'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'+
		'</head><body bgcolor="#FAFAF1" onload="document.forms[0].submit()">'+
		'<p style="color: red; font: bold 14pt serif; text-align: center">Пожалуйста, подождите...</p>'+
		'<form name="reg" id="reg" action="'+url+cgi+'/opacg/opac.exe" method="post">'+
		'<input type="hidden" name="arg0" value="'+arg0+'"/>'+
		'<input type="hidden" name="arg1" value="'+arg1+'"/>'+
		'<input type="hidden" name="_searchstr" value="/opacg/freesearch.html?'+ssearchstr[2]+'&'+ssearchstr[3]+encodeURIComponent(expression)+'"/>'+
		'<input type="hidden" name="TypeAccess" value="PayAccess"/></form>'+
		'</body></html>');
		win.document.close();
	}
	else if(abis=="OPAC2")
	{
		if(AU!="")
		{
			AU=AU.replace(/\(/g,'\\(');
			AU=AU.replace(/\)/g,'\\)');
			if(sigla.toUpperCase()=='ЦНМБ')
				expression+='(RP '+replaceSymb3(AU)+')';
			else if((sigla.toUpperCase()=='АСТРАХАНСКАЯ ОНБ')||(sigla.toUpperCase()=='Б СДС МОСКВА'))
				expression+='(AC '+replaceSymb3(AU)+')';
			else
				expression+='(AU '+replaceSymb3(AU)+')';
			AND=" AND ";
		}
		if(TI!="")
		{
			TI=TI.replace(/\(/g,'\\(');
			TI=TI.replace(/\)/g,'\\)');
			if(sigla=='ЦНМБ')
				expression+=AND+'(TITL '+replaceSymb3(TI)+')';
			else
				expression+=AND+'(TI '+replaceSymb3(TI)+')';
			AND=" AND ";
		}
		if(PY!="")
		{
			expression+=AND+"(PY '"+PY+"')";
		}
		window.open(searchstr+encodeURIComponent(expression), "");
	}
	else if(abis=="WLIB")
	{
		var expression="";
		if(AU!="")
		{
			AU=AU.replace(/\(/g,'');
			AU=AU.replace(/\)/g,'');
			AU+=" ";
			expression+=replaceSymb(AU);
		}
		if(TI!="")
		{
			TI=TI.replace(/\(/g,'');
			TI=TI.replace(/\)/g,'');
			TI+=" ";
			expression+=replaceSymb(TI);
		}
		if(PY!="")
		{
			expression+=PY;
		}
		window.open(searchstr+encodeURIComponent(expression), "");
	}
	else if(abis=="WLIB1")
	{
		if(AU!="")
		{
			AU=AU.replace(/\(/g,'');
			AU=AU.replace(/\)/g,'');
			AU=replaceSymb3(AU);
			expression+='&AC='+encodeURIComponent(AU);
		}
		if(TI!="")
		{
			TI=TI.replace(/\(/g,'');
			TI=TI.replace(/\)/g,'');
			TI=replaceSymb3(TI);
			expression+='&TI='+encodeURIComponent(TI);
		}
		if(PY!="")
		{
			expression+='&PY='+PY;
		}
		window.open(searchstr+expression, "");
	}
	else if(abis=="WLIB3")
	{
		if(AU!="")
		{
			AU=AU.replace(/\(/g,'');
			AU=AU.replace(/\)/g,'');
			AU=replaceSymb3(AU);
			expression+='&RP='+encodeURIComponent(AU);
		}
		if(TI!="")
		{
			TI=TI.replace(/\(/g,'');
			TI=TI.replace(/\)/g,'');
			TI=replaceSymb3(TI);
			expression+='&TITL='+encodeURIComponent(TI);
		}
		if(PY!="")
		{
			expression+='&PY='+PY;
		}
		window.open(searchstr+expression, "");
	}
	else if(abis=="VGBIL")
	{
		var expression=searchstr;
		var myids=take('myids').n.value.split('[SIGLA]');
		var ind=myids[0].substring(myids[0].lastIndexOf('-')+1);
		expression+=ind;
		window.open(expression, "");
	}
	else if(abis=="BEN")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="SAMARA")
	{
		var expression=searchstr;
		var str="";
		var v0="&tag_100a,700a=", v1="&tag_245a=", v2="&tag_260c=";
		if(AU!="")
			v0+=encodeVal(AU);
		if(TI!="")
			v1+=encodeVal(TI);
		if(PY!="")
		{
			v2+=PY;
		}
		str=v0+v1+v2;
		window.open(expression+str, "");
	}
	else if((abis=="ALEF")||(abis=="SIGLA"))
	{
		var expression=searchstr;
		var str="";
		var v0="&v0=", v1="&v1=", v2="&v2=", ys="&ys=", ye="&ye=";
		if(SB!="")
			v0+=SB;
		if(AU!="")
			v1+=encodeVal(AU);
		if(TI!="")
			v2+=encodeVal(TI);
		if(PY!="")
		{
			ys+=PY;
			ye+=PY;
		}
		str=v0+v1+v2+ys;
		window.open(expression+str, "");
	}
	else if(abis=="ALANIA")
	{
		var expression=searchstr;
		var str="";
		var par1_value="&par1_value=", par3_value="&par3_value=", par5_value="&par5_value=";
		if(AU!="")
			par1_value+=encodeVal(AU);
		if(TI!="")
			par3_value+=encodeVal(TI);
		if(PY!="")
		{
			par5_value+=PY;
		}
		str=par1_value+par3_value+par5_value;
		window.open(expression+str, "");
	}
	else if(abis=="PRIMO")
	{
		var expression=searchstr;
		var str="";
		var v0="&vl(freeText0)=", v1="&vl(boolOperator0)=AND", v2="&vl(freeText1)=", ys="&vl(boolOperator1)=AND", ye="&vl(freeText2)=";
		if(AU!="")
			v0+=encodeVal(AU);
		if(TI!="")
			v2+=encodeVal(TI);
		if(PY!="")
		{
			ye+=PY;
		}
		str=v0+v1+v2+ys+ye;
		window.open(expression+str, "");
	}
	else if(abis=="KPRSL")
	{
		var expression=searchstr;
		var str="";
		var v0="&TIP=", v1="";
		if(TI!="")
			v0+=encodeVal(TI);
		if(PY!="")
		{
			v1+="&PY="+PY;
		}
		str=v0+v1;
		window.open(expression+str, "");
	}
	else if(abis=="IRBIS")
	{
		var expression=searchstr;
		var str="";
		var AND="";
		if(SB!="")
		{
			str+="(<.>B="+SB+"<.>)";
			AND='%2B';
		}
		if(AU!="")
		{
			str+=AND+"(<.>A="+encodeVal(AU)+"$<.>)";
			AND='*';
		}
		if(TI!="")
		{
			str+=AND+"(<.>T="+encodeVal(TI)+"$<.>)";
			AND='*';
		}
		if(PY!="")
		{
			str+=AND+"(<.>G="+PY+"$<.>)";
		}
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="IRBIS2")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="IRBIS1")
	{
		var expression=searchstr;
		var str="";
		var AND="";
		if(AU!="")
		{
			str+="(<.>A="+AU+"$<.>)";
			AND='*';
		}
		if(TI!="")
		{
			str+=AND+"(<.>T="+TI+"$<.>)";
			AND='*';
		}
		if(PY!="")
		{
			str+=AND+"(<.>G="+PY+"$<.>)";
		}
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="IRBIS3")
	{
		var expression=searchstr;
		var str="";
		if(AU!="")
		{
			str+="&term_1="+encodeVal(AU);
		}
		if(TI!="")
		{
			str+="&term_2="+encodeVal(TI);
		}
		if(PY!="")
			str+="&term_3="+PY;
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="FOLIANT")
	{
		var expression=searchstr;
		var str="";
		if(AU!="")
		{
			str+="&DATA0="+encodeVal(AU);
		}
		if(TI!="")
		{
			str+="&DATA1="+encodeVal(TI);
		}
		if(PY!="")
			str+="&DATA2="+PY;
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="MARC")
	{
		var expression=searchstr;
		var str="";
		if(AU!="")
		{
			str+="&T1="+encodeVal(AU);
		}
		if(TI!="")
		{
			str+="&T2="+encodeVal(TI);
		}
		if(PY!="")
			str+="&T3="+PY;
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="BIBCOM")
	{
		var expression=searchstr;
		var str="";
		if(AU!="")
		{
			str+="criteria=and.author.words."+encodeVal(AU);
		}
		if(TI!="")
		{
			str+="&criteria=and.title.words."+encodeVal(TI);
		}
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="MCBS")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="RCOIT")
	{
		var expression=searchstr;
		var str="";
		if(AU!="")
		{
			AU="&arrFilter_pf"+encodeVal("[OUTPUT_AUTHORS]")+"="+encodeVal(AU);
			str+=AU;
		}
		if(TI!="")
		{
			TI="&arrFilter_ff"+encodeVal("[NAME]")+"="+encodeVal(TI);
			str+=TI;
		}
		if(PY!="")
		{
			PY="&arrFilter_pf"+encodeVal("[YEAR]")+"="+encodeVal(PY);
			str+=PY;
		}
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="RUSLAN")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="FOXPRO")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="ASBIBL3")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="UBONLINE")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="ABSOTEK")
	{
		var expression=searchstr;
		window.open(expression, "");
	}
	else if(abis=="MARC1")
	{
		var expression=searchstr;
		var str="";
		if(AU!="")
		{
			AU="author="+encodeVal(AU);
			str+=AU;
		}
		if(TI!="")
		{
			TI="&title="+encodeVal(TI);
			str+=TI;
		}
		if(PY!="")
		{
			PY="&data="+encodeVal(PY);
			str+=PY;
		}
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="CNSHB")
	{
		var expression=searchstr;
		var str="";
		var ID="";
		if(searchquery.indexOf('[ID]')!=-1)
			ID=searchquery.substring(searchquery.indexOf('[ID]')+4,searchquery.indexOf('[/ID]'));
		if(ID!="")
			str+="&trn="+ID;
		if(AU!="")
		{
			AU="&au="+AU;
			str+=AU;
		}
		if(TI!="")
		{
			TI="&ti="+TI;
			str+=TI;
		}
		if(PY!="")
		{
			PY="&ya="+PY;
			str+=PY;
		}
		expression+=str;
		window.open(expression, "");
	}
	else if(abis=="PRLIB")
	{
		var expression=searchstr;
		var str='';
		if(AU!="")
		{
			str+='{';
			str+='"id":"sf_au_en","field":"sf_au_en","type":"string","input":"text","operator":"equal","value":"'+AU+'"}';
		}
		if(TI!="")
		{
			if(AU!="")
				str+=',';
			str+='{';
			str+='"id":"sf_ti","field":"sf_ti","type":"string","input":"text","operator":"equal","value":"'+TI+'"}';
		}
		str='{"condition":"AND","rules":['+str+'],"valid":true}';
		expression+=encodeVal(str);
		window.open(expression, "");
	}
	else
		return;
}

function addLibToSearch(o)/*добавить фильтр к поиску - проект СКК ЛИБНЕТ*/
{
	var sigla=o.nextSibling.value;
	if(sigla!="")
	{
		var today=new Date();
		var seconds=today.getTime();
		var str="[NEXT]addfilterobj[IND]filter_1_"+seconds+"_"+seconds+"[CLASS](PF '"+sigla+"')[TEXT]"+sigla;
		if(typeof _addfilters!="undefined")
			addfilters=_addfilters+"[END]"+str;
		else
			addfilters=str;
		alert('Фильтр добавлен');
		//switchSearch('simple');
	}
	else
	{
		alert('Невозможно добавить фильтр к поиску. Отсутствует сигла');
	}
}

/*---------------дополнительные функции-----------------------------------*/

/*-------------------------------- конец поиск библиотек-фондодержателей ------------------------------*/