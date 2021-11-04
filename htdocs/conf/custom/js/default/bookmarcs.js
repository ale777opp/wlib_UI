/*----------------------------закладки в результатах поиска----------------------------------*/

function seePlace(o,ind,c,rdb)/*запрос на местонахождение*/
{
	typework="";
	addid="place"+c;
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
			querylist.push(["_service","STORAGE:opacholdd:MoveCopies"]);
			querylist.push(["_version","1.1.0"]);
			querylist.push(["session",numsean]);
			//indr=prepareStr(ind);
			//ind=replaceSymb(ind);
			var db=numDB;
			if((typeof rdb!="undefined")&&(rdb!=""))
			{
				db=rdb;
			}
			querylist.push(["iddb",db]);
			querylist.push(["idbr",ind]);
			querylist.push(["copyform","SEE7BB"]);
			querylist.push(["writeoff","false"]);
			if(typeof _localiddb!="undefined")
				gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
			else
				gArr.push(["querylist",prepareQueryString(querylist,db)]);
			ajaxToRCP(gArr,displayPlace);
		}
	}
	showHide2(o,addid);
}

function displayPlace(x)/*вывод местонахождения*/
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
		var str="";
		var count=0;
		var obj1={};
		var div=take(addid);
		for (var key in response[0])
		{
			var value = response[0][key];
			if(key.indexOf('copies_')!=-1)
			{
				obj1[count]={};
				obj1[count].COPYINFO="";
				for (var arg in value)
				{
					var val = value[arg];
					if(arg.indexOf('_inventory')!=-1)
						obj1[count].INVENTORY=val;
					if(arg.indexOf('_barcode')!=-1)
						obj1[count].CODE=val;
					if(arg.indexOf('_location')!=-1)
						obj1[count].STATUS=val;
					if(arg.indexOf('_copyinfo')!=-1)
					{
						obj1[count].COPYINFO=val[0];
					}
				}
				count++;
			}
		}
		
		if(count > 0)
		{
			for(var i=0; i<count; i++)
			{
				str+='<div class="w100 f80 p10x"><b>'+(i+1)+'. Статус </b>: <span class="red">'+obj1[i].STATUS+'</span></div>';
				str+='<div class="table w100">';
				str+='<div class="row b bge"><div class="td f80 w30 p10x">Инвентарный номер</div><div class="td f80 w30 p10x">Код</div><div class="td f80 p10x">Сведения об экземпляре</div></div>';
				str+='<div class="row b1e"><div class="td f80 w30 p10x">'+obj1[i].INVENTORY+'</div><div class="td f80 w30 p10x">'+obj1[i].CODE+'</div><div class="td f80 p10x">'+parseBB(obj1[i].COPYINFO)+'</div></div>';
				str+='</div>';
			}
		}
		else
		{
			str+='<div class="acenter f80 p20x">Экземпляры не найдены</div>';
		}
		div.n.innerHTML=str;
	}
	addid="";
}

function seeBibcard(o,ind,c,rdb)/*вывод бибкарточки*/
{
	typework="";
	addid="bib"+c;
	if(take(addid).n.style.display=='none')
	{
		if(take(addid).n.innerHTML=='')
		{
			take(addid).n.innerHTML='<div style="position:absolute;top:0" class="progress small"><div></div></div>';
			var db=numDB;
			if((typeof rdb!="undefined")&&(rdb!=""))
			{
				db=rdb;
			}
			var gArr=new Array();
			gArr.push(["userId",identif]);
			gArr.push(["session",numsean]);
			gArr.push(["_xsl","/"+foldername+"/"+foldername+"/html/_modules/search/_output/xsl/bibcard.xsl"]);
			gArr.push(["_errorXsl","/"+foldername+"/"+foldername+"/html/_modules/search/_output/xsl/error.xsl"]);
			gArr.push(["_service","STORAGE:opacfindd:FindView"]);
			gArr.push(["_version","2.3.0"]);
			gArr.push(["outformList[0]/outform","bibcard"]);
			gArr.push(["outformList[0]/bibcardType","formatted"]);
			gArr.push(["outformList[0]/bibcardName","base"]);
			gArr.push(["iddbIds[0]/iddb",db]);
			var tmp=/\\{1,}/g;
			if(tmp.test(ind))
				ind=ind.replace(tmp,'\\');
			gArr.push(["iddbIds[0]/id",ind]);
			var ifrm=take(addid).create('iframe',{name: ind+'frame', id: ind+'frame', style: {width: '520px', height: '330px', border: '0', frameBorder: '0', marginWidth: '0', marginHeight: '0', scrolling: 'no'}, src: 'about:blank'});
			var fdoc=ifrm.n.contentDocument || ifrm.n.contentWindow.document;
			fdoc.open();
			fdoc.close();
			callToRCP(gArr,ifrm.n,"/cgiopac/opacg/direct.exe");
		}
	}
	showHide2(o,addid);
}

function seeRusmarc(o,ind,c,rdb)/*вывод rusmarc*/
{
	typework="";
	addid="rusm"+c;
	if(take(addid).n.style.display=='none')
	{
		if(take(addid).n.innerHTML=='')
		{
			take(addid).n.innerHTML='<div style="position:absolute;top:0" class="progress small"><div></div></div>';
			var db=numDB;
			if((typeof rdb!="undefined")&&(rdb!=""))
			{
				db=rdb;
			}
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","execute"]);
			gArr.push(["_html","stat"]);
			gArr.push(["_errorhtml","error1"]);
			querylist.push(["_service","STORAGE:opacfindd:FindView"]);
			querylist.push(["_version","2.3.0"]);
			querylist.push(["session",numsean]);
			var tmp=/\\{1,}/g;
			if(tmp.test(ind))
				ind=ind.replace(tmp,'\\');
			querylist.push(["iddbIds[0]/id",ind]);
			querylist.push(["iddbIds[0]/iddb",db]);
			querylist.push(["outformList[0]/outform","UNIMARC"]);
			querylist.push(["_history","yes"]);
			gArr.push(["querylist",prepareQueryString(querylist,db)]);
			ajaxToRCP(gArr,backSeeRusmarc);
		}
	}
	showHide2(o,addid);
}

function backSeeRusmarc(x)/*подробный вывод в том же окне*/
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
		take(addid).n.innerHTML="";
		for (key in response[0])
		{
			var value = response[0][key];
			if(key.indexOf('result_')!=-1)
			{
				if(typeof value._error_0!="undefined")
				{
					take(addid).create('p',{className:'warn',textNode:value._error_0[0]});
					break;
				}
				else
				{
					var arr=value._UNIMARC_0;
					for(var i=0;i<arr.length; i++)
					{
						take(addid).create('p',{textNode:arr[i],style:{fontFamily:'monospace',marginBottom:'0'}});
					}
				}
			}
		}
	}
}

function reSize(y)/*изменение размера фрейма бибкарточки*/
{
	var div=take(addid);
	var ifr=div.n.lastChild;
	//div.n.innerHTML="";
	//take(ifr).seth(y+5);
	//div.n.removeChild(div.n.firstChild);
	try 
	{
		div.n.innerHTML=ifr.contentDocument.getElementById('cont').innerHTML;
	}
	catch (e) {}
	addid="";
}

/*----------------------------конец закладки в результатах поиска----------------------------------*/