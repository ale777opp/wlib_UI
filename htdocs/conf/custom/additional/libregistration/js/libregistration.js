/*онлайн регистрация читателей*/

/*генерация пароля*/

function rnd(l)
{
	return Math.floor(Math.random() * l);
}

function generatePass(l)
{
	var len=6;
	if(typeof l!="undefined")
		len=l;
	var result = '';
	var symbols = ['A','B','C','D','E','F','G','H','J','K','L','M','N','P','R','S','T','W','X','Y','Z',2,3,4,5,6,7,8,9];
	for(i = 0; i < len; i++)
	{
		result += symbols[rnd(symbols.length)];
	}
	return result;
}

/*конец генерация пароля*/

/*смена пароля*/

function callChangePass()/*запрос на смену пароля - генерация пароля*/
{
	var mail=take('login').n.value;
	var emailRegular = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	if(!emailRegular.test(mail))
	{
		alert('Неверно введен e-mail!');
		return;
	}
	else
	{
		var pass=generatePass();
		if(IsAlfaDigit(pass))
		{
			var codecont=null;
			if(take('codecont').n!=null)
				codecont=take('codecont');
			else
				codecont=take(document.body).create('input',{type:'hidden',id:'codecont',value:''});
			codecont.n.value=pass;
			checkReaderInfo();
		}
		else
		{
			if(take('codecont').n!=null)
				codecont.n.value="";
			alert("Не удалось сгенерировать пароль!\nПовторите попытку.");
			return;
		}
	}
}

function checkReaderInfo()/*запрос на проверку по введенному логину существования записи на читателя*/
{
	if((take('codecont').n!=null)&&(take('codecont').n.value!=""))
	{
		var arg={};
		arg.target=self;
		arg.cls='loader';
		showLayerWin('loaderwin',arg);
		typework="";
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","execute"]);
		gArr.push(["_html","stat"]);
		gArr.push(["_errorhtml","error"]);
		var curDate = new Date();
		var year=curDate.getFullYear();
		var day=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();
		var month=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","execute"]);
		gArr.push(["_html","stat"]);
		gArr.push(["_errorhtml","error"]);
		querylist.push(["_service","STORAGE:opacstatd:PersonalVisit"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["userid",identif]);
		querylist.push(["time[0]",year+'01010000']);
		querylist.push(["time[1]",year+''+month+''+day+'0000']);
		querylist.push(["field","AI"]);
		querylist.push(["value",take('login').n.value]);
		querylist.push(["registr[0]",""]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
		ajaxToRCP(gArr,callbackcheckReaderInfo);
	}
	else
	{
		alert("Не удалось сгенерировать пароль!\nПовторите попытку.");
		return;
	}
}

function callbackcheckReaderInfo(x)/*запрос на получение информации о читателе*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		delLayerWin();
		WriteError('Указанный пользователь в системе не зарегистрирован','index');
	}
	else
	{
		if(typeof response!="undefined")
		{
			if(typeof response[0]._reader_0!="undefined")
			{
				var arr=response[0]._reader_0;
				var eml='';
				var log='';
				for(var i=0; i<arr.length; i++)
				{
					if(arr[i].indexOf('AI:')!=-1)
					{
						var tmp=arr[i].substring(3);
						if(tmp!='N/A')
							eml=tmp;
					}
					if(arr[i].indexOf('AY:')!=-1)
					{
						var tmp=arr[i].substring(3);
						if(tmp!='N/A')
							log=tmp;
					}
				}
				if((eml!='')&&(eml==take('login').n.value)&&(log!=''))
				{
					var loginp=null;
					if(take('loginp').n!=null)
						loginp=take('loginp');
					else
						loginp=take(document.body).create('input',{type:'hidden',id:'loginp',value:''});
					loginp.n.value=log;
					var len=eml.length;
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
					gArr.push(["arg7","AI"]);
					gArr.push(["arg8","FDT"]);
					gArr.push(["arg10","[SEARCHBUF]AW,6,A,D,FU,"+len+",D,AW,10,A,NE.\n[RECORDBUF]READER"+eml+"DEFINITION\n[BEGIN]1\n[PORTION]10\n"]);
					ajaxToRCP(gArr,openChW);
				}
				else
				{
					WriteError('Указанный пользователь в системе не зарегистрирован','index');
				}
			}
		}
	}
}

function openChW(x)/*запрос на запись нового пароля*/
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
		}
		chPass(isn);
	}
}

function chPass(isn)/*запись нового пароля*/
{
	if((take('codecont').n!=null)&&(take('codecont').n.value!=""))
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
		gArr.push(["AA:",take('codecont').n.value]);
		ajaxToRCP(gArr,openChPassW);
	}
	else
	{
		if(take('codecont').n!=null)
				codecont.n.value="";
			alert("Не удалось сгенерировать пароль!\nПовторите попытку.");
			return;
	}
}

function openChPassW(x)/*отправка нового пароля на электронную почту читателя*/
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
		var protocol=window.location.protocol;
		var host=window.location.host;
		var eml=take('login').n.value;
		var log=take('loginp').n.value;
		var pass=take('codecont').n.value;
		var gArr=new Array();
		gArr.push(["_to",eml]);
		gArr.push(["_fio","fio"]);
		gArr.push(["_subject","Изменение пароля"]);
		gArr.push(["_body","\nЗдравствуйте, Ваш пароль изменен.\nВаши данные для авторизации на сайте "+protocol+"//"+host+"/"+foldername+":\nЛогин: "+eml+", Пароль: "+pass+".\n\n"]);
		ajaxToRCP(gArr,confsendOK,"/opacg/html/circle/php/mail.php");
	}
}

function confsendOK(x)
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
		var p=doc.create('div',{textNode:'Ваш пароль изменен. На Ваш электронный адрес высланы новые регистрационные данные.'});
	}
}

/*конец смена пароля*/

function doLibRegistration()/*регистрация - сбор введенных данных*/
{
	var inputdata=take('y1').n.value+''+take('m1').n.value+''+take('d1').n.value;
	var c1=take('readercode').n.value;
	var c2=take('readercode2').n.value;
	var mail=take('AY').n.value;
	var emailRegular = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	if(!emailRegular.test(mail))
	{
		alert('Неверно введен e-mail!');
		return;
	}
	if(c1!=c2)
	{
		alert('Поля "Пароль" и "Подтверждение пароля" - не совпадают!');
		return;
	}
	else if(c1.length<6)
	{
		alert('Слишком короткий пароль!');
		return;
	}
	else if(take('AY').n.value=="")
	{
		alert('Не введен e-mail!');
		return;
	}
	else if(take('AO').n.value=="")
	{
		alert('Введите фамилию, имя, отчество!');
		return;
	}
	else if(inputdata=="")
	{
		alert('Введите дату рождения!');
		return;
	}
	else if(take('FA').n.options[take('FA').n.selectedIndex].value=="")
	{
		alert('Пол не выбран!');
		return;
	}
	else if((take('FE').n!=null)&&(take('FE').n.options[take('FE').n.selectedIndex].value==""))
	{
		alert('Социальный статус не выбран!');
		return;
	}
	else if(!take('agree').n.checked)
	{
		alert('Вы не выразили согласие с правилами пользования библиотекой!');
		return;
	}
	else if(!take('agreep').n.checked)
	{
		alert('Вы не выразили согласие с правилами обработки персональных данных!');
		return;
	}
	else
	{
		var curDate=new Date();
		var Year=curDate.getFullYear();
		var maxYear=Year+5;
		var dd=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();
		var mm=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;
		var gArr=new Array();
		var querylist=new Array();
		var WW="ONLINE";
		if(typeof codepointreg != "undefined")
			WW=codepointreg;
		else
		{
			if(take('FL').n!=null)
				WW=take('FL').n.value;
		}
		gArr.push(["_action","registrold"]);
		gArr.push(["_errorhtml","error"]);
		gArr.push(["_serviceclass","CATALOGING"]);
		gArr.push(["_service","PARAM"]);
		gArr.push(["_numsean",numsean]);
		gArr.push(["_login",identif]);
		gArr.push(["arg2",WW]);
		gArr.push(["arg4","USER"]);
		gArr.push(["arg5","NEW"]);
		gArr.push(["arg6","0"]);
		gArr.push(["AA:",c1]);
		var ab="";
		if(typeof groupcode != "undefined")
			ab=groupcode;
		else
		{
			if(take('AB').n!=null)
				WW=take('AB').n.value;
		}
		gArr.push(["AB:",ab]);
		gArr.push(["AO:",take('AO').n.value.toUpperCase()]);
		gArr.push(["AX:",inputdata]);
		gArr.push(["FA:",take('FA').n.options[take('FA').n.selectedIndex].value]);
		if((take('FE').n!=null)&&(take('FE').n.options[take('FE').n.selectedIndex].value!=""))
			gArr.push(["FE:",take('FE').n.options[take('FE').n.selectedIndex].value]);
		if((take('EA').n!=null)&&(take('EA').n.options[take('EA').n.selectedIndex].value!=""))
			gArr.push(["EA:",take('EA').n.options[take('EA').n.selectedIndex].value]);
		if((take('EB').n!=null)&&(take('EB').n.options[take('EB').n.selectedIndex].value!=""))
			gArr.push(["EB:",take('EB').n.options[take('EB').n.selectedIndex].value]);
		gArr.push(["FG:",Year+''+mm+''+dd]);
		gArr.push(["FB:",(Year+5)+''+mm+''+dd]);
		gArr.push(["AY:",take('AY').n.value.toUpperCase()]);
		gArr.push(["FU:",take('AY').n.value]);
		gArr.push(["AI:",take('AY').n.value]);
		gArr.push(["AE:","RU"]);
		if(typeof codepointreg != "undefined")
			gArr.push(["FL:",codepointreg]);
		else
		{
			if(take('FL').n!=null)
				gArr.push(["FL:",take('FL').n.value]);
		}
		if(typeof notepointreg != "undefined")
			gArr.push(["EN:",notepointreg+'-'+Year+''+mm+''+dd]);
		else
		{
			if(take('EN').n!=null)
				gArr.push(["EN:",take('EN').n.value+'-'+Year+''+mm+''+dd]);
		}
		gArr.push(["AW:","READER"]);
		ajaxToRCP(gArr,openRegistrWin);
	}
}

/*конец онлайн регистрация читателей*/