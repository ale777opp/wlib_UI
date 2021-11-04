/*вывод дерева MeSH*/

function seeTreeView()/*запрос на вывод дерева MeSH*/
{
	typework="search";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["letter"].directory+'/letter.php']);
	querylist.push(["_service","STORAGE:opacafd:List"]);
	querylist.push(["_version","1.3.0"]);
	querylist.push(["mode","alpha"]);
	querylist.push(["label","CMS"]);
	querylist.push(["query",""]);
	querylist.push(["session",numsean]);
	querylist.push(["length",50]);
	querylist.push(["iddb",numDB]);
	querylist.push(["$label","CMS"]);
	querylist.push(["$fromaftobibl","COD"]);
	querylist.push(["$query",""]);
	querylist.push(["$iddbaf",numDB]);
	querylist.push(["$treeview","yes"]);
	querylist.push(["$iddbtitle",dbs[numDB].alias]);
	querylist.push(["$length",50]);
	querylist.push(["$typesearch","authority"]);
	querylist.push(["$showstr","<span><i>Дерево</i> MeSH</span>"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	callToRCP(gArr);
}

function openTreeView(x,b)/*отображение дерева MeSH*/
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
						{
							vquery=v._query;
							//if(typeof _treeview == "undefined")
								vquery+='*';
						}
						if((_lastquery!=v._query)&&(query!=v._query))
						{
							if(typeof v._main=="undefined")
							{
								arr.push([v._label,v._query,v._title,hasNextLevel,vquery]);
								start=v._query;
								count++;
							}
						}
					}
				}
				if(count>0)
				{
					//if(llevel==level)
					//{
						var div=cont.create('div',{style:{margin:'0px 0px 0px 45px',padding:'0px'}});
						var p=div.create('p',{className:'aftitle',id:ind,style:{margin:'0px',padding:'0px'}});
						var addterm='';
						if(typeof _treeview != "undefined")
							addterm='['+arr[0][1]+']';
						var inp=p.create('input',{type:'checkbox',className:'addbox',name:_fromaftobibl,value:arr[0][4],onclick:'function(){putTerms(this);}'});
						if(typeof _treeview != "undefined")
							inp.conceal();
						if(arr[0][3]=="1")
						{
							var k="";
							var a="";
							if(b!=0)
							{
								k="100";
								a=",";
							}
							var span=p.create('span',{className:'afplusimg',title:'Дерево',onmousedown:'function(){seeTreeM(this,"add'+arr[0][1]+'_'+count+''+k+'","'+arr[0][0]+'","'+arr[0][1]+'","'+_lastquery+'","'+nlevel+'"'+a+''+k+');}',textNode:title});
							if(addterm!="")
								span.create('span',{style:{marginLeft:'15px',marginRight:'15px',color:'#333'},textNode:addterm});
						}
						else
						{
							var span=p.create('span',{className:'afbulletimg',textNode:title});
							if(addterm!="")
								span.create('span',{style:{marginLeft:'15px',color:'#333'},textNode:addterm});
						}
						p.create('span',{className:'afsearchimg',title:'Искать в каталоге',onmousedown:'function(){searchTerm(this.parentNode);}'});
						p.create('span',{className:'afannotimg',title:'Аннотация',onmousedown:'function(){showAnnotationTree(this.parentNode.id);}'});
						if(pubmed!="")
							p.create('a',{target:'_blank',href:'//www.ncbi.nlm.nih.gov/pubmed/?term='+encodeURIComponent(pubmed),textNode:'Искать в PubMed'});
						if(ebsco!="")
							p.create('a',{target:'_blank',href:'//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='+encodeURIComponent(ebsco),textNode:'Искать в EBSCO', style:{marginLeft:'20px'}});
						div.create('div',{id:'add'+arr[0][1]+'_'+count+''+k,style:{display:'none'}});
					//}
				}
			}
		}
		if(!endvoc)
		{
			var s=cont.create('span',{title:'Далее',className:'nexttr',onmousedown:'function(){nextSeeTreeM(this,"'+treeobj+'","'+label+'","'+start+'","'+query+'","'+llevel+'");}'});
			s.create('span',{textNode:'Далее'});
		}
	}
}

function showAnnotationTree(o)/*запрос на просмотр аннотации из дерева MeSH*/
{
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacafd:View"]);
	querylist.push(["_version","1.7.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["iddb",numDB]);
	querylist.push(["id",o]);
	querylist.push(["mode","annotation"]);
	querylist.push(["viewOptions[0]","meshNewTree"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,openAnnotTreeWin);
}

function openAnnotTreeWin(x)/*отображение аннотации из дерева MeSH*/
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
			var arg={'cls':'dialog2','message': 'Информация','width':'95%','height':'95%'};
			showLayerWin('infowin',arg);
		}
		var doc=take('infowinform');
		doc.n.innerHTML="";
		var div=doc.create('div',{id:'srezults1',style:{margin:'40px 0 0 40px'}});
		var div1=div.create('div');
		var div2=div.create('div',{style:{padding:'20px'}});
		for(var arg in response[0])
		{
			if(arg.indexOf('_result_')!=-1)
			{
				var value=response[0][arg];
				var pubmed="";
				var ebsco="";
				if(typeof value._AFHEADFORM_0!="undefined")
				{
					if(typeof value._AFHEADFORM_0._originalTermin!="undefined")
					{
						pubmed=value._AFHEADFORM_0._originalTermin+"[MeSH Terms]";
						if(typeof _auth!="undefined")
						{
							ebsco="(MH "+value._AFHEADFORM_0._originalTermin+")";
						}
						var p=div1.create('p',{className:'aftitle',id:value._AFHEADFORM_0._id,style:{margin:'0px',padding:'0px'}});
						p.create('input',{type:'checkbox',className:value._AFHEADFORM_0._title,name:'AUIDS',value:value._AFHEADFORM_0._id,style:{visibility:'hidden'}});
						p.create('span',{textNode:value._AFHEADFORM_0._title,style:{fontWeight:'bold',textNransform:'uppercase',marginRight:'10px'}});
						if(pubmed!="")
							p.create('a',{target:'_blank',href:'//www.ncbi.nlm.nih.gov/pubmed/?term='+encodeURIComponent(pubmed),textNode:'Искать в PubMed', style:{marginLeft:'20px'}});
						if(ebsco!="")
							p.create('a',{target:'_blank',href:'//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='+encodeURIComponent(ebsco),textNode:'Искать в EBSCO', style:{marginLeft:'20px'}});
					}
					pubmed="";
					ebsco="";
				}
				for (var prop in value)
				{
					if(prop.indexOf('AFANNOT')!=-1)
					{
						var val=value[prop];
						var use="";
						var mode="";
						var action="";
						for (var k in val)
						{
							var v=val[k];
							if(k=="_use")
								use=v;
							if(k=="_mode")
								mode=v;
							if(k=="_action")
								action=v;
							if(k=="_title")
								div2.create('p',{className:'b',textNode:v});
							if(k.indexOf('_entries_')!=-1)
							{
								var p1=div2.create('p',{className:'afsmall'});
								if((use=='search')||(use=='insert'))
								{
									if(typeof v._id != "undefined")
									{
										p1.create('input',{type:'checkbox',className:v._text,name:'AUIDS',value:v._id,style:{visibility:'hidden'}});
									}
									else
									{
										p1.create('span',{textNode:'- '});
									}
								}
								else
								{
									p1.create('span',{textNode:'- '});
								}
								p1.create('span',{textNode:v._text});
							}
							if(k.indexOf('_references_')!=-1)
							{
								var p1=div2.create('p',{className:'afsmall'});
								if((use=='search')||(use=='insert'))
								{
									if(typeof v._id != "undefined")
									{
										p1.create('input',{type:'checkbox',className:v._text,name:'AUIDS',value:v._id,style:{visibility:'hidden'}});
									}
									else
									{
										p1.create('span',{textNode:'- '});
									}
								}
								else
								{
									if(action != 'mesh3')
										p1.create('span',{textNode:'- '});
								}
								if(typeof v._blocked != "undefined")
								{
									p1.create('span',{textNode:v._title});
									/*if((use=='search')||(use=='insert'))
									{
										p1.create('span',{className:'afsearchimg',title:'Искать в каталоге',onmousedown:'function(){searchTerm(this.parentNode,null,\'AUIDS\');}'});
									}*/
								}
								else if((typeof v._id != "undefined")&&(mode=='direct'))
								{
									var span=p1.create('span',{id:v._id,className:'afbig'});
									span.create('input',{type:'hidden',className:v._title,name:'AUIDS',value:v._id});
									span.create('span',{style:{marginRight:'10px'},textNode:v._title,title:'Аннотация',onmousedown:'function(){showAnnotationTree(this.parentNode.id);}'});
									//span.create('span',{className:'afannotimg',title:'Аннотация',onmousedown:'function(){showAnnotationTree(this.parentNode.id);}'});
									//span.create('span',{className:'afsearchimg',title:'Искать в каталоге',onmousedown:'function(){searchTerm(this.parentNode.id,this.parentNode.childNodes[1].innerHTML,\'AUIDS\');}'});
								}
								else if((typeof v._query != "undefined")&&(mode=='indirect')&&(action=='mesh3'))
								{
									//var span=p1.create('span',{className:'afbig'});
									var len=v._query.split('.').length-1;
									p1.create('span',{className:'afplusimg',title:'Дерево',onmousedown:'function(){seeTreeMM(this,"add'+v._query+'100","'+v._label+'","'+v._query+'","'+v._query+'",'+len+',100);}',textNode:v._title});
									div2.create('div',{id:'add'+v._query+'100',style:{display:'none'}});
								}
								else
									p1.create('span',{style:{textDecoration:'line-throgh'},textNode:v._title});
								if(typeof v._originalTermin != "undefined")
								{
									pubmed=v._originalTermin+"[MeSH Terms]";
									if(typeof _auth!="undefined")
									{
										ebsco="(MH "+v._originalTermin+")";
									}
									if(pubmed!="")
										p1.create('a',{target:'_blank',href:'//www.ncbi.nlm.nih.gov/pubmed/?term='+encodeURIComponent(pubmed),textNode:'Искать в PubMed', style:{marginLeft:'20px'}});
									if(ebsco!="")
										p1.create('a',{target:'_blank',href:'//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='+encodeURIComponent(ebsco),textNode:'Искать в EBSCO', style:{marginLeft:'20px'}});
								}
							}
						}
					}
				}
			}
		}
	}
}

function seeTreeMM(o,c,l,q,pq,ll,k)
{
	if(q.indexOf('.')!=-1)
		q=q.substring(0,q.lastIndexOf('.'));
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
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error"]);
			querylist.push(["_service","STORAGE:opacafd:View"]);
			querylist.push(["_version","1.7.0"]);
			querylist.push(["session",numsean]);
			querylist.push(["label",l]);
			querylist.push(["length",length]);
			querylist.push(["iddb",numDB]);
			querylist.push(["mode","meshtree"]);
			querylist.push(["query",q]);
			querylist.push(["$lastquery",pq]);
			querylist.push(["$level",ll]);
			querylist.push(["viewOptions[0]","meshNewTree"]);
			querylist.push(["viewOptions[1]","upNode"]);
			querylist.push(["nextLevel","true"]);
			gArr.push(["querylist",prepareQueryString(querylist)]);
			//ajaxToRCP(gArr,openTreeViewM);
			if(typeof k != "undefined")
			{
				ajaxToRCP(gArr,openTreeView,pathactrcp,null,openTreeView,100);
			}
			else
			{
				ajaxToRCP(gArr,openTreeView);
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

function openTreeViewM(x)/*отображение дерева MeSH*/
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
		var query=response[0]._next_0._query;
		var label=response[0]._next_0._label;
		var start=replaceSymb(response[0]._next_0._start);
		var endvoc=false;
		if(typeof response[0]._end!="undefined")
			endvoc=true;
		for(arg in response[0])
		{
			if(arg.indexOf('result_')!=-1)
			{
				var value=response[0][arg];
				var ind=value._id;
				var vquery=ind;
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
						{
							vquery=v._query;
							//if(typeof _treeview == "undefined")
								vquery+='*';
						}
						if((_lastquery!=v._query)&&(query!=v._query))
						{
							if(typeof v._main=="undefined")
							{
								arr.push([v._label,v._query,v._title,hasNextLevel,vquery]);
								start=v._query;
								count++;
							}
						}
					}
				}
				if(count>0)
				{
					var div=cont.create('div',{style:{margin:'0px 0px 0px 45px',padding:'0px'}});
						var p=div.create('p',{className:'aftitle',id:ind,style:{margin:'0px',padding:'0px'}});
						var addterm='';
						if(typeof _treeview != "undefined")
							addterm='['+arr[0][1]+']';
						var inp=p.create('input',{type:'checkbox',className:'addbox',name:_fromaftobibl,value:arr[0][4],onclick:'function(){putTerms(this);}'});
						if(typeof _treeview != "undefined")
							inp.conceal();
						if(arr[0][3]=="1")
						{
							var span=p.create('span',{className:'afplusimg',title:'Дерево',onmousedown:'function(){seeTreeM(this,"add'+arr[0][1]+'_'+count+'100","'+arr[0][0]+'","'+arr[0][1]+'","'+_lastquery+',100");}',textNode:title});
							if(addterm!="")
								span.create('span',{style:{marginLeft:'15px',marginRight:'15px',color:'#333'},textNode:addterm});
						}
						else
						{
							var span=p.create('span',{className:'afbulletimg',textNode:title});
							if(addterm!="")
								span.create('span',{style:{marginLeft:'15px',color:'#333'},textNode:addterm});
						}
						p.create('span',{className:'afsearchimg',title:'Искать в каталоге',onmousedown:'function(){searchTerm(this.parentNode);}'});
						p.create('span',{className:'afannotimg',title:'Аннотация',onmousedown:'function(){showAnnotationTree(this.parentNode.id);}'});
						if(pubmed!="")
							p.create('a',{target:'_blank',href:'//www.ncbi.nlm.nih.gov/pubmed/?term='+encodeURIComponent(pubmed),textNode:'Искать в PubMed'});
						if(ebsco!="")
							p.create('a',{target:'_blank',href:'//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='+encodeURIComponent(ebsco),textNode:'Искать в EBSCO', style:{marginLeft:'20px'}});
						div.create('div',{id:'add'+arr[0][1]+'_'+count+'100',style:{display:'none'}});
				}
			}
		}
	}
}