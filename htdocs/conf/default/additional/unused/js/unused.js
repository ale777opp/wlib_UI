/*не обнаружено проектов, где используются эти функции*/

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

function changePass()/*поиск информации о читателе по логину - unused*/
{
	var len=overcharge.length;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","registrold"]);
	gArr.push(["_errorhtml","error"]);
	gArr.push(["_serviceclass","CATALOGING"]);
	gArr.push(["_service","PARAM"]);
	gArr.push(["_numsean",numsean]);
	gArr.push(["_login",identif]);
	gArr.push(["arg4","USER"]);
	gArr.push(["arg5","VIE"]);
	gArr.push(["arg7","AY"]);
	gArr.push(["arg8","FDT"]);
	gArr.push(["arg10","[SEARCHBUF]AW,6,A,D,FU,"+len+",D,AW,10,A,NE.\n[RECORDBUF]READER"+overcharge+"DEFINITION\n[BEGIN]1\n[PORTION]10\n"]);
	var arg={};
	arg.target=self;
	arg.cls='loader';
	showLayerWin('loaderwin',arg);
	ajaxToRCP(gArr,openChangeWin);
}

function openChangeWin(x)/*получение информации о читателе - unused*/
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
		var doc=take('loaderwinform');
		var arr=answere.split('[END]');
		var isn=""
		var fio="";
		var mail="";
		for(var i=0; i<arr.length; i++)
		{
			if(arr[i].indexOf('[ISN]')!=-1)
			{
				isn=arr[i].substring(arr[i].indexOf('[ISN]')+5);
			}
			if(arr[i].substring(0,3)=='AO:')
			{
				text1=arr[i].substring(3);
			}
			if(arr[i].substring(0,3)=='AI:')
			{
				mail=arr[i].substring(3);
			}
		}
		changePassw(isn);
	}
}

function changePassw(isn)/*запись нового пароля - unused*/
{
	var c1=take('readercode').n.value;
	var c2=take('readercode2').n.value;
	if(c1!=c2)
	{
		alert('Поля "Пароль" и "Подтверждение пароля" - не совпадают!');
		delLayerWin();
		return;
	}
	else if(c1.length<6)
	{
		alert('Слишком короткий пароль!');
		delLayerWin();
		return;
	}
	else
	{
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","registrold"]);
		gArr.push(["_errorhtml","error"]);
		gArr.push(["_serviceclass","CATALOGING"]);
		gArr.push(["_service","PARAM"]);
		gArr.push(["_numsean",numsean]);
		gArr.push(["_login",identif]);
		gArr.push(["arg4","USER"]);
		gArr.push(["arg5","SUP"]);
		gArr.push(["arg6",isn]);
		gArr.push(["AA:",c1]);
		ajaxToRCP(gArr,openChangePasswWin);
	}
}


function forgotPassword()/*смена пароля - запрос на получение информации о читателе - unused*/
{
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
	querylist.push(["_version","1.1.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["id",identif]);
	querylist.push(["code",take('login').n.value]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,showForgotWin);
}

function openChangePasswWin(x)/*подтверждение смены пароля - unused*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	if(typeof error!="undefined")
	{
		delLayerWin();
		WriteError(error);
	}
	else
	{
		delLayerWin();
		var arg={};
		arg.cls='dialog2';
		arg.target=self;
		arg.message='ПАРОЛЬ ИЗМЕНЕН';
		arg.dispatcher='reAuth';
		arg.width='500';
		arg.height='400';
		showLayerWin('hiwin',arg);
		var doc=take('hiwinform');
		doc.n.innerHTML="";
		var p=doc.create('div',{style:{textAlign:'center', margin: '50px 10px 10px 10px', font: 'normal 12pt/24pt Arial, sans-serif'},textNode:'Ваш пароль изменен. Для того, чтобы воспользоваться услугами ЭБА, перейдите на страницу Авторизации.'});
	}
}

function showForgotWin(x)/*отправка пароля по почте - unused*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError();
	}
	else
	{
		var code="";
		var mail="";
		if((typeof response[0]._whatThis!="undefined")&&(response[0]._whatThis!="DOCUMENT"))
		{
			if(typeof response[0]._reader_0._visitor_0!="undefined")
			{
				var arr=response[0]._reader_0._visitor_0;
				for(var i=0; i<arr.length; i++)
				{
					if(arr[i].indexOf('EN:')!=-1)
					{
						code=arr[i].substring(arr[i].indexOf('EN:')+3);
					}
					if(arr[i].indexOf('AI:')!=-1)
					{
						mail=arr[i].substring(arr[i].indexOf('AI:')+3);
					}
				}
			}
			else
				WriteError();
			if(code!="")
			{
				var str='\n\n';
				str+=' Ваш пароль для доступа к сервису Электронный абонемент: ';
				str+=code;
				str+=' \n\n';
				var gArr=new Array();
				gArr.push(["_action","mail"]);
				gArr.push(["_html","mail"]);
				gArr.push(["_errorhtml","error"]);
				gArr.push(["_to",mail]);
				gArr.push(["_subject","Электронный абонемент"]);
				gArr.push(["_body",str]);
				ajaxToRCP(gArr,forgotOk);
			}
			else
				WriteError();
		}
		else
			WriteError();
	}
}

function forgotOk(x)/*подтверждение отправки пароля - unused*/
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
		var answere="На Ваш почтовый адрес отправлен пароль для доступа к сервису Электронный абонемент.";
		var msg='Восстановление пароля';
		var arg={'cls':'dialog2','message':msg,'width':'500','height':'400','dispatcher':'function cbname(){goToLocation(\'privat\')}'};
		showLayerWin('confirmwin',arg);
		var doc=take('confirmwinform');
		doc.n.innerHTML="";
		doc.create('div',{textNode:answere,style:{margin:'50px 10px 0px 10px',color:'#096cc0',fontWeight:'bold',textAlign:'center'}});
	}
}
