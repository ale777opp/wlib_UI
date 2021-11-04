/*------------------------------ авторизация, регистрация и статистика -------------------------------------*/

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

function doAuthorization(l,p)/*авторизация*/
{
	var curDate=new Date();
	if(typeof l=="undefined")
		l=take('login').n.value;
	if(typeof p=="undefined")
		p=take('password').n.value;
	if((l=="")||(p==""))
	{
		alert("Вы не заполнили все поля или заполнили их неправильно!");
		return;
	}
	typework="authorization";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_logintype","LOGIN"]);
	gArr.push(["_login",trimSpaces(l.toUpperCase())]);
	gArr.push(["_password",trimSpaces(p)]);
	gArr.push(["_auth",curDate.getTime()]);
	gArr.push(["_userinfo","yes"]);
	callToRCP(gArr,"_self",'/'+foldername+'/');
}

/*--------------------------------------------------------регистрация------------------------------------------------*/

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
		if(take('FL').n!=null)
			WW=take('FL').n.value;
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
		gArr.push(["AB:",take('AB').n.value]);
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
		if(take('FL').n!=null)
			gArr.push(["FL:",take('FL').n.value]);
		if(take('EN').n!=null)
			gArr.push(["EN:",take('EN').n.value+'-'+Year+''+mm+''+dd]);
		gArr.push(["AW:","READER"]);
		ajaxToRCP(gArr,openRegistrWin);
	}
}

function openRegistrWin(x)/*регистрация - проверка создания записи на читателя*/
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
		var isn="";
		var tmp=/^0\s*/;
		if(tmp.test(answere))
		{
			isn=answere.substring(answere.lastIndexOf(' ')+1);
			var gArr=new Array();
			var querylist=new Array();
			gArr.push(["_action","registrold"]);
			gArr.push(["_errorhtml","error"]);
			gArr.push(["_serviceclass","CATALOGING"]);
			gArr.push(["_service","PARAM"]);
			gArr.push(["_numsean",numsean]);
			gArr.push(["_login",identif]);
			gArr.push(["arg2",""]);
			gArr.push(["arg4","USER"]);
			gArr.push(["arg5","REA"]);
			gArr.push(["arg6",isn]);
			gArr.push(["arg8","FDT_SPACE"]);
			ajaxToRCP(gArr,openRegistrWinOk);
		}
		else
		{
			var error={};
			error._message_0=answere;
			error._action_1="Для продления абонемента войдите в личный кабинет и нажмите кнопку НОВЫЙ АБОНЕМЕНТ";
			delLayerWin();
			WriteError(error);
		}
	}
}

function openRegistrWinOk(x)/*сообщение об успешной регистрации*/
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
		var text1="";
		var mail="";
		var ep="";
		for(var i=0; i<arr.length; i++)
		{
			if(arr[i].substring(0,3)=='AO:')
			{
				text1=arr[i].substring(3);
			}
			if(arr[i].substring(0,3)=='AI:')
			{
				mail=arr[i].substring(3);
			}
			if(arr[i].substring(0,3)=='EP:')
			{
				ep=arr[i].substring(3);
			}
		}
		delLayerWin();
		if(typeof _typereg=="undefined")
		{
			var arg={};
			arg.cls='dialog2';
			arg.target=self;
			arg.message='РЕГИСТРАЦИЯ ЗАВЕРШЕНА';
			arg.dispatcher='reAuth';
			arg.width='500';
			arg.height='400';
			showLayerWin('hiwin',arg);
			var doc=take('hiwinform');
			doc.n.innerHTML="";
			var p=doc.create('div',{textNode:'Спасибо, '});
			p.create('span',{textNode: text1});
			p.text(take('reganswere').n.value);
		}
		else if(_typereg=="regform")
		{
			sendConfirm(text1,mail);
		}
		else if(_typereg=="_promo")
		{
			prolongSign(ep);
		}
		else
		{
			sendBill(text1,mail);
		}
	}
}

function sendConfirm(fio,mail)/*отправка по электронной почте сообщения читателю с регистрационными данными*/
{
	var log=take('AY').n.value;
	var pass=take('readercode').n.value;
	var gArr=new Array();
	gArr.push(["_to",mail]);
	gArr.push(["_subject","Подтверждение регистрации"]);
	gArr.push(["_fio",fio]);
	gArr.push(["_body","\nЗдравствуйте, "+fio+". Вы успешно зарегистрировались в системе.\nВаши регистрационные данные для входа в электронный каталог:\nЛогин: "+log+", Пароль: "+pass+". Для получения читательского билета обратитесь в Отдел регистрации Библиотеки.\n\n"]);
	ajaxToRCP(gArr,confirmsendedOK,"/opacg/html/circle/php/mail.php");
}

function confirmsendedOK(x)/*сообщение об успешной отправке подтверждения регистрации*/
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
		arg.message='РЕГИСТРАЦИЯ ЗАВЕРШЕНА';
		arg.dispatcher='reAuth';
		arg.width='500';
		arg.height='400';
		showLayerWin('hiwin',arg);
		var doc=take('hiwinform');
		doc.n.innerHTML="";
		var p=doc.create('div',{textNode:'Спасибо, '});
		p.create('span',{textNode: fio});
		p.text('. Вы успешно зарегистрировались в системе. На Ваш электронный адрес выслано подтверждение регистрации. Для входа в каталог нажмите ссылку Вход.');
	}
}

/*----------------------регистрация - платный электронный абонемент-------------------------------------------*/

function getPrice()/*запрос стоимости подписки на электронный абонемент*/
{
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacholdd:Setting"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["id",identif]);
	querylist.push(["toDo","getInfoIndividES"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,openRWin);
}

function openRWin(x)/*вывод информации о стоимости подписки на электронный абонемент*/
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
		price=response[0]._groupAccess_0._price;
	}
}

function doRegistration(o)/*регистрация - сбор введенных данных и распределение по типам*/
{
	var WW="";
	if(take('WW').n!=null)
		WW=take('WW').n.value;
	var mail=take('mail').n.value;
	mail=mail.toLowerCase();
	var nik=take('nik').n.value.toUpperCase();
	var c1=take('readercode').n.value;
	var c2=take('readercode2').n.value;
	var emailRegular = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	if(!emailRegular.test(mail))
	{
		alert('Неверно введен e-mail!');
		return;
	}
	if(take('ipfirst').n!=null)
	{
		var v1=take('ipfirst').n.value;
		var v2=take('ipsecond').n.value;
		var v3=take('ipthird').n.value;
		if(((v1=="")||(v1.length<4))||((v2=="")||(v2.length<4))||((v3=="")||(v3.length<4)))
		{
			alert('Неверно введен код!');
			take('ipfirst').n.focus();
			return;
		}
		else
			promocod=v1+''+v2+''+v3;
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
	else if(WW=="")
	{
		alert('Кодовое слово не введено!');
		return;
	}
	else if(mail=="")
	{
		alert('Не введен e-mail!');
		return;
	}
	else if(nik=="")
	{
		alert('Форма обращения не введена!');
		return;
	}
	else
	{
		var arg={};
		arg.target=self;
		arg.cls='loader';
		showLayerWin('loaderwin',arg);

		readerobj={};
		readerobj.AA=c1;
		readerobj.AO=nik;
		readerobj.FU=mail;
		readerobj.WW=WW;
		readerobj.AI=mail;
		if(promocod!="")
		{
			promoCheck();
		}
		else
		{
			simpleRegistration();
		}
	}
}

function simpleRegistration()/*регистрация - запрос на создание записи на читателя*/
{
	var curDate=new Date();
	var Year=curDate.getFullYear();
	var maxYear=Year+5;
	var dd=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();
	var mm=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","registrold"]);
	gArr.push(["_errorhtml","error"]);
	gArr.push(["_serviceclass","CATALOGING"]);
	gArr.push(["_service","PARAM"]);
	gArr.push(["_numsean",numsean]);
	gArr.push(["_login",identif]);
	gArr.push(["arg2","ONLINE"]);
	gArr.push(["arg4","USER"]);
	gArr.push(["arg5","NEW"]);
	gArr.push(["arg6","0"]);
	gArr.push(["AA:",readerobj.AA]);
	gArr.push(["AO:",readerobj.AO]);
	gArr.push(["FU:",readerobj.FU]);
	gArr.push(["FG:",Year+''+mm+''+dd]);
	gArr.push(["FB:",maxYear+''+mm+''+dd]);
	gArr.push(["WW:",readerobj.WW]);
	gArr.push(["AI:",readerobj.AI]);
	gArr.push(["AX:","19900101"]);
	gArr.push(["AY:",readerobj.AI.toUpperCase()]);
	gArr.push(["AE:","RU"]);
	gArr.push(["FL:","ONLINE"]);
	gArr.push(["AW:","READER"]);
	ajaxToRCP(gArr,openRegistrWin);
}

function prolongSign(cod)/*продление договора*/
{
	if(typeof cod=="string")
		EP=cod;
	if(EP!="N/A")
	{
		if(typeof cod!="string")
		{
			var text='Новый абонемент';
			if((typeof _typereg!="undefined")&&(_typereg=="_promo"))
				text='Активировать код';
			var arg={'cls':'dialog2','message':text,'target':self,'width':'400','height':'300'};
			showLayerWin('billwin',arg);
			var doc=take('billwinform');
			doc.n.innerHTML="";
			var cont=doc.create('div',{id: 'butcontainer', style:{textAlign:'center'}});
			cont.create('input', {className: 'mt30x w80 b button', id: 'promobut',value: 'Активировать код', type: 'button', onclick:'showPromo'});
			cont.create('input', {className: 'url w80 f80 m20x', id: 'billbut',value: 'Оплатить абонемент', type: 'button', onclick:'prolongSignBill'});
		}
		else
		{
			prolongSignPromo(cod);
		}
	}
	else
	{
		alert('Данному типу пользователя операция недоступна.');
		return;
	}
}

function sendBill(fio,mail)/*регистрация - отправка счета*/
{
	var gArr=new Array();
	gArr.push(["_to",mail]);
	gArr.push(["_subject","Счет на оплату услуг ЭБА"]);
	gArr.push(["_fio",fio]);
	gArr.push(["_price",price]);
	gArr.push(["_filename","bill"]);
	gArr.push(["_body","\nЗдравствуйте, "+fio+". Во вложенном файле находится счет, после оплаты которого Вы сможете воспользоваться услугами ЭБА, авторизовавшись в системе.\n\n"]);
	ajaxToRCP(gArr,billsendedOK,"/opacg/html/circle/php/mail.php");
}

function billsendedOK(x)/*регистрация - подтверждение отправки счета*/
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
		arg.message='РЕГИСТРАЦИЯ ЗАВЕРШЕНА';
		arg.dispatcher='reAuth';
		arg.width='500';
		arg.height='400';
		showLayerWin('hiwin',arg);
		var doc=take('hiwinform');
		doc.n.innerHTML="";
		var p=doc.create('div',{textNode:'Спасибо, '});
		p.create('span',{textNode: fio});
		p.text('. Вы успешно зарегистрировались в системе. На Ваш электронный адрес выслан счет, после оплаты которого Вы сможете воспользоваться услугами ЭБА, авторизовавшись в системе.');
	}
}

function prolongSignBill()/*продление договора - выставление счета*/
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
	querylist.push(["mode","ES"]);
	querylist.push(["code",EP]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,prolongSignBillOk)
}

function prolongSignBillOk(x)/*продление договора - отправка счета по электронной почте счета*/
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
		if(response[0]._balanceES_0!=null)
		{
			if(response[0]._balanceES_0._type=="INDIVIDUAL")
			{
				var gArr=new Array();
				gArr.push(["_to",AI]);
				gArr.push(["_subject","Счет на оплату услуг ЭБА"]);
				gArr.push(["_fio",AO]);
				gArr.push(["_price",price]);
				gArr.push(["_filename","bill"]);
				gArr.push(["_body","\nЗдравствуйте, "+AO+". Во вложенном файле находится счет, после оплаты которого Вы сможете продолжить пользоваться услугами ЭБА, авторизовавшись в системе.\n\n"]);
				ajaxToRCP(gArr,prolongSignOkWin,"/opacg/html/circle/php/mail.php");
			}
			else
			{
				var arg={};
				arg.cls='dialog2';
				arg.target=self;
				arg.message='ПРОДЛЕНИЕ ДОГОВОРА';
				arg.width='500';
				arg.height='400';
				showLayerWin('hiwin',arg);
				var doc=take('hiwinform');
				doc.n.innerHTML="";
				var p=doc.create('div',{style:{textAlign:'center', margin: '50px 10px 10px 10px', font: 'normal 12pt/24pt Arial, sans-serif'},textNode:'Уважаемый '});
				p.create('span',{textNode: AO,style:{color: '#3999e3'}});
				p.text('. Для продления срока действия Вашего договора Вам необходимо обратиться к контактному лицу по работе с Электронным абонементом в Вашей организации.');
			}
		}
		else
		{
			var error={};
			error._message_0="Операция невозможна";
			error._action_1="для данного пользователя";
			WriteError(error);
		}
	}
}

function prolongSignOkWin(x)/*продление договора - сообщение об успешно отправленном счете*/
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
		arg.message='ПРОДЛЕНИЕ ДОГОВОРА';
		arg.width='500';
		arg.height='400';
		showLayerWin('hiwin',arg);
		var doc=take('hiwinform');
		doc.n.innerHTML="";
		var p=doc.create('div',{textNode:'Спасибо, '});
		p.create('span',{textNode: AO});
		p.text('. На Ваш электронный адрес выслан счет, после оплаты которого Вы сможете продолжить пользоваться услугами ЭБА, авторизовавшись в системе.');
	}
}

function showPromo(cod)/*продление договора - ввод промокода*/
{
	var par=take('butcontainer');
	if(par.n!=null)
	{
		par.n.innerHTML="";
		par.create('b',{className: 'blue', textNode: 'Введите код:', style:{display:'block',margin:'20px', textAlign:'center'}});
		par.create('input',{type: 'text', id: 'ipfirst', value: '', maxLength: '4', className:'date',onblur:'nextPortion',onkeyup:'nextPortion'});
		par.create('span',{className: 'to', textNode: ' - '});
		par.create('input',{type: 'text', id: 'ipsecond', value: '', maxLength: '4', className:'date',onblur:'nextPortion',onkeyup:'nextPortion'});
		par.create('span',{className: 'to', textNode: ' - '});
		par.create('input',{type: 'text', id: 'ipthird', value: '', maxLength: '4', className:'date',onblur:'nextPortion',onkeyup:'nextPortion'});
		if(typeof cod!="string")
			par.create('input', {type:'button',className: 'url f80 w50',disabled: 'true', id: 'promoakt', value: 'Активировать', onmousedown:'prolongSignPromo',style:{margin:'20px',textAlign:'center'}});
		else
			par.create('input', {type:'button',className: 'url f80 w50',disabled: 'true', id: 'promoakt', value: 'Активировать', onmousedown:'function(){prolongSignPromo(\''+cod+'\');}',style:{margin:'20px',textAlign:'center'}});
		take('ipfirst').n.focus();
	}
}

function nextPortion(e)/*переключение между полями для ввода промокода*/
{
	var elem=getSrc(e);
	var val=elem.value;
	switch(elem.id)
	{
		case 'ipfirst':		if(val.length==4)
								take('ipsecond').n.focus();
							else
							{
								if(take('promoakt').n!=null)
									take('promoakt').n.disabled=true;
							}
		break;
		case 'ipsecond':	if(take('ipfirst').n.value.length<4)
								take('ipfirst').n.focus();
							else
							{
								if(val.length==4)
									take('ipthird').n.focus();
								else
								{
									if(take('promoakt').n!=null)
										take('promoakt').n.disabled=true;
								}
							}
		break;
		case 'ipthird':		if(take('ipfirst').n.value.length<4)
							{
								if(take('promoakt').n!=null)
									take('promoakt').n.disabled=true;
								take('ipfirst').n.focus();
							}
							else if(take('ipsecond').n.value.length<4)
							{
								if(take('promoakt').n!=null)
									take('promoakt').n.disabled=true;
								take('ipsecond').n.focus();
							}
							else
							{
								if(val.length==4)
								{
									if(take('promoakt').n!=null)
									{
										take('promoakt').n.disabled=false;
										take('promoakt').n.focus();
									}
								}
							}
		break;
		default: break;
	}
}

function prolongSignPromo(cod)/*продление договора - активация промокода*/
{
	typework="";
	if(typeof cod!="string")
		cod=EP;
	var pcode=promocod;
	if(promocod=="")
	{
		if(take('ipfirst').n!=null)
		{
			var v1=take('ipfirst').n.value;
			var v2=take('ipsecond').n.value;
			var v3=take('ipthird').n.value;
			if(((v1=="")||(v1.length<4))||((v2=="")||(v2.length<4))||((v3=="")||(v3.length<4)))
			{
				alert('Неверно введен код!');
				take('ipfirst').n.focus();
				return;
			}
			else
				pcode=v1+''+v2+''+v3;
		}
	}
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacholdd:Setting"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","PromoCode"]);
	querylist.push(["mode","PROMOTE"]);
	querylist.push(["promo",pcode]);
	querylist.push(["reader",cod]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,prolongSignPromoOk);
}

function prolongSignPromoOk(x)/*сообщение об успешной регистрации с промокодом / активации промокода*/
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
		var text='Ваш абонемент активирован.';
		delLayerWin();
		var arg={};
		arg.cls='dialog2';
		arg.target=self;
		arg.width='500';
		arg.height='400';
		if((typeof _typereg!="undefined")&&(_typereg=="_promo"))
		{
			text='Вы успешно зарегистрировались в системе. Для того, чтобы воспользоваться услугами ЭБА, перейдите на страницу Авторизации.';
			arg.message='РЕГИСТРАЦИЯ ЗАВЕРШЕНА';
			arg.dispatcher='reAuth';
		}
		else
		{
			arg.message='АБОНЕМЕНТ АКТИВИРОВАН';
			arg.dispatcher='ordersSearch';
		}
		showLayerWin('hiwin',arg);
		var doc=take('hiwinform');
		doc.n.innerHTML="";
		doc.create('div',{className:'answ',textNode:text});
	}
	promocod="";
	readerobj=null;
}

function promoCheck()/*проверка валидности промокода*/
{
	typework="";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacholdd:Setting"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","PromoCode"]);
	querylist.push(["mode","CHECK"]);
	querylist.push(["promo",promocod]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,promoCheckOk);
}

function promoCheckOk(x)/*регистрация с промокодом*/
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	delLayerWin();
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		simpleRegistration();
	}
}

/*смена пароля*/

function changePass()/*поиск информации о читателе по логину*/
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

function openChangeWin(x)/*получение информации о читателе*/
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

function changePassw(isn)/*запись нового пароля*/
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

function openChangePasswWin(x)/*подтверждение смены пароля*/
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

/*конец смена пароля*/

/*--------------конец регистрация - платный электронный абонемент---------------------------------------------*/

/*----------------------------------------------------конец регистрация----------------------------------------------------*/

function loadFreeUrl(o,url,rdb)/*вывод полного текста документа через статистику*/
{
	typework="";
	var html="url";
	if(url.indexOf('/reg?WW=')!=-1)
	{
		html="url1";
	}
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html",html]);
	gArr.push(["_errorhtml","error1"]);
	querylist.push(["_service","STORAGE:opacholdd:Edd"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	var db=numDB;
	if(typeof rdb!="undefined")
	{
		db=rdb;
	}
	querylist.push(["iddb",db]);
	querylist.push(["idbr",replaceSymb(o)]);
	querylist.push(["$docurl",url]);
	querylist.push(["$numsean",numsean]);
	querylist.push(["$identif",identif]);
	querylist.push(["idEd",url]);
	querylist.push(["mode","STATIST_ONLINE"]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist,db)]);
	callToRCP(gArr,"_blank");
}

/*-------------личный кабинет------------*/

function showHistory()/*история поисков*/
{
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A")&&(typeof _auth!="undefined"))
	{
		typework="history";
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","php"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",modules["history"].directory+'/history.php']);
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		querylist.push(["$fio",AO]);
		if(typeof _reader!="undefined")
			querylist.push(["$reader",_reader])
		querylist.push(["$typework",typework]);
		if(typeof _localiddb!="undefined")
			gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
		else
			gArr.push(["querylist",prepareQueryString(querylist)]);
		callToRCP(gArr);
	}
	else
	{
		goToLocation('history');
	}
}

function myHands()/*книги на руках - ввод штрихкода*/
{
	if(flag45)
	{
		var arg={'cls':'dialog2','message':'КНИГИ НА РУКАХ','target':self,'callback':'callmyHands',callbackname:'Искать','width':'400','height':'250'};
		showLayerWin('orderwin',arg);
		var doc=take('orderwinform');
		doc.n.innerHTML="";
		var cont=doc.create('div',{id: 'dateordcontainer', className: 'period'});
		cont.create('b',{className: 'to', textNode: 'Код читателя', style:{display:'block',margin:'30px 0 10px 0'}});
		cont.create('input',{type:'text',maxLength:25,value:'',id:'icdr',name:'icdr'});
	}
	else
	{
		callmyHands();
	}
}

function callmyHands()/*книги на руках*/
{
	var handler=modules["order"].directory+'/libcard.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
	querylist.push(["_version","1.1.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["id",identif]);
	var fio="";
	var code=""
	if(flag45)
	{
		if((take('icdr').n!=null)&&(take('icdr').n.value!=""))
			code=take('icdr').n.value;
		else
		{
			alert('Введите код!');
			return;
		}
	}
	else
	{
		if(typeof AO!="undefined")
			fio=AO;
		if(typeof FU!="undefined")
			code=FU;
	}
	querylist.push(["code",code]);
	querylist.push(["formBibl",'GIVEFORM']);
	querylist.push(["$fio",fio]);
	if(typeof _reader !="undefined")
		querylist.push(["$reader",code]);
	gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
	if((fio!="")&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
	}
	callToRCP(gArr);
}

function prolong()/*запрос на продление книги*/
{
	typework="";
	var arg={'cls':'dialog2','message':'ПРОДЛИТЬ','target':self,'width':'500','height':'400'};
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacholdd:ToProlong"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["id",identif]);
	querylist.push(["status",'PROLONG']);
	var arr=take('searchrezult').getsign('input',{type: 'checkbox'});
	var count=0;
	var adb="";
	for(var i=0; i < arr.length; i++)
	{
		if((arr[i].checked)&&(arr[i].id!="mark"))
		{
			querylist.push(["codeDoc["+count+"]",arr[i].value]);
			count++;
		}
	}
	if(count==0)
	{
		alert('Выберите документ!');
		return;
	}
	if(confirm('Изменить дату возврата?'))
	{
		gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
		showLayerWin('orderwin',arg);
		ajaxToRCP(gArr,prolongOK);
	}
}

function prolongOK(x)/*подтверждение продления книги*/
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
		take('orderwinform').n.innerHTML='<div>Дата возврата изменена.</div>';
		setTimeout('delLayerWin()',1000);
	}
}

function printClaim()/*печать требований - окно ввода штрихкода*/
{
	if(printTab())
	{
		var arg={'cls':'dialog2','message':'ПЕЧАТЬ ТРЕБОВАНИЙ','target':self,'callback':'printClaimStart',callbackname:'Печать','width':'400','height':'250'};
		showLayerWin('orderwin',arg);
		var doc=take('orderwinform');
		doc.n.innerHTML="";
		var cont=doc.create('div',{id: 'dateordcontainer', className: 'period'});
		var div1=cont.create('div',{className:'mt10x'});
		var div2=cont.create('div',{className:'mt5x mb20x'});
		div1.create('span',{textNode: '*',style:{display:'inline-block',width:'10px',padding:'0',margin:'0'}});
		div1.create('span',{textNode: 'Код читателя:', style:{width:'130px',textAlign:'left',padding:'10px 0 0 0',margin:'0'}});
		div1.create('input',{type:'text',maxLength:25,value:'',id:'icdr',name:'icdr'});
		div2.create('span',{textNode: 'Место выдачи:', style:{width:'130px',textAlign:'left',padding:'10px 0 0 0',margin:'0 0 0 10px'}});
		div2.create('input',{type:'text',maxLength:25,value:'',id:'icdr1',name:'icdr1'});
		cont.create('i',{textNode:'* Обязательно к заполнению',className:'f80'});
	}
}

function printClaimStart()/*печать требований - запрос информации о читателе*/
{
	if(take('icdr').n.value != "")
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
		querylist.push(["code",take('icdr').n.value]);
		if(take('icdr1').n.value != "")
			querylist.push(["$place",take('icdr1').n.value]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
		ajaxToRCP(gArr,callbackprintClaim);
	}
	else
	{
		alert('Не введен код');
		return;
	}
}

function callbackprintClaim(x)/*печать требований*/
{
	/*var win=window.open();
	win.document.open();
	win.document.write(x.responseText);
	win.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		delLayerWin();
		WriteError();
	}
	else
	{
		var code="";
		var fio="";
		if((typeof response[0]._whatThis!="undefined")&&(response[0]._whatThis!="DOCUMENT"))
		{
			if(typeof response[0]._reader_0._visitor_0!="undefined")
			{
				var arr=response[0]._reader_0._visitor_0;
				for(var i=0; i<arr.length; i++)
				{
					if(arr[i].indexOf('FU:')!=-1)
					{
						code=arr[i].substring(arr[i].indexOf('FU:')+3);
					}
					if(arr[i].indexOf('AO:')!=-1)
					{
						fio=arr[i].substring(arr[i].indexOf('AO:')+3);
					}
				}
				if(code!="")
				{
					typework="";
					var year=curDate.getFullYear();
					var day=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();
					var month=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;
					var hour=(curDate.getHours()<10)?'0'+(curDate.getHours()):curDate.getHours();
					var minut=(curDate.getMinutes()<10)?'0'+(curDate.getMinutes()):curDate.getMinutes();
					var second=(curDate.getSeconds()<10)?'0'+(curDate.getSeconds()):curDate.getSeconds();
					var gArr=new Array();
					var querylist=new Array();
					gArr.push(["_action","execute"]);
					gArr.push(["_xsl","/"+foldername+"/"+foldername+"/html/_modules/privat/list/xsl/print_orders.xsl"]);
					gArr.push(["_errorXsl","/"+foldername+"/"+foldername+"/html/_modules/search/_output/xsl/error.xsl"]);
					querylist.push(["_service","STORAGE:opacfindd:Order"]);
					querylist.push(["_version","3.0.0"]);
					querylist.push(["session",numsean]);
					querylist.push(["outform","REQUEST"]);
					querylist.push(["mode","view"]);
					querylist.push(["sortBy","NOTHING"]);
					querylist.push(["sortDirect","asc"]);
					querylist.push(["$height",window.innerHeight-200]);		
					querylist.push(["$code",code]);		
					querylist.push(["$fio",fio]);
					querylist.push(["$date",day+'.'+month+'.'+year]);
					querylist.push(["$time",hour+':'+minut+':'+second]);
					if(typeof _place !="undefined")
						querylist.push(["$place",_place]);
					var arr=take('tableorder').getsign('input',{name:'marker'});
					var count=0;
					for(var i=0; i<arr.length; i++)
					{		
						if(arr[i].checked)
						{
							querylist.push(["query["+count+"]/id",arr[i].value]);
							querylist.push(["query["+count+"]/db",arr[i].className]);
							count++;
						}
					}
					if(count==0)
					{
						alert('Не выбраны записи!');
						return false;
					}
					if(take('excel').n!=null)
						take('excel').n.parentNode.removeChild(take('excel').n);
					var arg={'cls':'dialog2','target': self, 'message':'ПЕЧАТЬ ТРЕБОВАНИЙ','divframe':'1','forlinks':'1'};
					delLayerWin();
					showLayerWin('recordswin',arg);
					self.frames[0].document.open();
					self.frames[0].document.close();
					gArr.push(["querylist",prepareQueryString(querylist)]);
					callToRCP(gArr,self.frames[0],"/cgiopac/opacg/settings.exe");
				}
				else
					WriteError();
			}
			else
				WriteError();
		}
		else
			WriteError();
	}
}

function toOrderList(ind)/*запрос на добавление в список литературы*/
{
	typework="";
	var arg={'cls':'dialog2','message':'СПИСОК ЛИТЕРАТУРЫ','target':self,'width':'500','height':'400'};
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:Order"]);
	querylist.push(["_version","2.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["mode","add"]);
	querylist.push(["outform","ORDERFORM"]);
	var count=0;
	if(typeof ind!="undefined")
	{
		querylist.push(["query[0]/db",numDB]);
		querylist.push(["query[0]/id",ind]);
		count++;
	}
	else
	{
		var arr=take('searchrezult').getsign('input',{name: 'marker'});
		for(var i=0; i < arr.length; i++)
		{
			if((arr[i].checked)&&(arr[i].id!="mark"))
			{
				querylist.push(["query["+count+"]/db",numDB]);
				querylist.push(["query["+count+"]/id",prepareStr(arr[i].value)]);
				count++;
			}
		}
	}
	if(count==0)
	{
		alert('Не выбраны записи!');
		return;
	}
	showLayerWin('orderwin',arg);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist,numDB)]);
	ajaxToRCP(gArr,createMess);
}

function createMess(x)/*сообщение о добавлении в список литературы*/
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
		var str='';
		if(parseInt(response[0]._new)>0)
			str+='<div class="mess">Добавлено записей: <b>'+response[0]._new+'</b>.</div>';
		else
			str+='<div class="mess">Документ уже добавлен в список.</div>';
		str+='<div class="mess">Текущий размер списка: <b>'+response[0]._total+'</b>.</div>';
		str+='<div class="mess">Для просмотра  выбранных записей выберите пункт меню<br/><b>&laquo;СПИСОК ЛИТЕРАТУРЫ&raquo;</b>.</div><br/>';
		take('orderwinform').n.innerHTML=str;
		setTimeout('delLayerWin()',1000);
	}
}

function showOrderList(c,s)/*вывод списка литературы*/
{
	typework="privat";
	var liststartfrom=0;
	var listhowmuch=portion;
	if(s==null)
		s=numsean;
	if(take('portionlist').n!=null)
		listhowmuch=take('portionlist').n.options[take('portionlist').n.selectedIndex].value;
	if(c!=null)
		liststartfrom=parseInt(listhowmuch,10)*(parseInt(c,10)-1);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["list"].directory+'/list.php']);
	querylist.push(["_service","STORAGE:opacfindd:Order"]);
	querylist.push(["_version","2.0.0"]);
	querylist.push(["session",s]);
	querylist.push(["$session",s]);
	querylist.push(["mode","view"]);
	querylist.push(["outform","ORDERFORM"]);
	querylist.push(["$liststartfrom",liststartfrom]);
	querylist.push(["length",listhowmuch]);
	querylist.push(["$length",listhowmuch]);
	querylist.push(["sortBy","NOTHING"]);
	querylist.push(["start",liststartfrom]);
	var fio="";
	if(!flag45)
	{
		if(typeof AO!="undefined")
			fio=AO;
	}
	querylist.push(["$fio",fio]);
	if(typeof _reader!="undefined")
		querylist.push(["$reader",_reader])
	querylist.push(["sortDirect","asc"]);
	if(typeof _localiddb!="undefined")
		gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
	else
		gArr.push(["querylist",prepareQueryString(querylist,numDB)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
	}
	callToRCP(gArr);
}

function showAllLists(c)/*вывод истории сеансов*/
{
	typework="privat";
	numDB=numdbBIBL;
	var liststartfrom=0;
	var listhowmuch=portion;
	if(c==null)
		liststartfrom='';
	else
		liststartfrom=parseInt(listhowmuch,10)*(parseInt(c,10)-1);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",modules["alllists"].directory+'/alllists.php']);
	querylist.push(["_service","STORAGE:opacfindd:Order"]);
	querylist.push(["_version","2.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["mode","list"]);
	querylist.push(["outform","ORDERFORM"]);
	querylist.push(["length",listhowmuch]);
	querylist.push(["$length",listhowmuch]);
	querylist.push(["sortDirect","desc"]);
	querylist.push(["start",liststartfrom]);
	var fio="";
	if(!flag45)
	{
		if(typeof AO!="undefined")
			fio=AO;
	}
	querylist.push(["$fio",fio]);
	if(typeof _reader!="undefined")
		querylist.push(["$reader",_reader])
	querylist.push(["$liststartfrom",liststartfrom]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
	}
	callToRCP(gArr);
}

function ordersSearch2()/*окно выбора даты и ввода штрихкода для вывода списка заказов*/
{
	var arg={'cls':'dialog2','message':'Список заказов','target':self,'callback':'openListOfOrders',callbackname:'Искать','width':'500','height':'400'};
	showLayerWin('orderwin',arg);
	var doc=take('orderwinform');
	doc.n.innerHTML="";
	var cont=doc.create('div',{id: 'dateordcontainer', className: 'period'});
	cont.create('div',{textNode:'Дата выполнения заказа', style:{fontWeight: 'bold', margin: '5px 5px 25px 5px'}});
	cont.create('span',{className: 'from', textNode: ' с ', style:{marginRight:'15px'}});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d1',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m1',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y1',onblur:'changeData',onmouseup:'changeData'});
	cont.create('span',{title:'Выбрать из календаря',id:'1',className:'calc',onmousedown:'CreateCal'});
	cont.create('br',{clear:'all'});
	cont.create('br',{clear:'all'});
	cont.create('span',{className: 'to', textNode: ' по ', style:{marginRight:'5px'}});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d2',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m2',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y2',onblur:'changeData',onmouseup:'changeData'});
	cont.create('span',{title:'Выбрать из календаря',id:'2',className:'calc',onmousedown:'CreateCal'});
	if(flag45)
	{
		cont.create('b',{className: 'to', textNode: 'Код читателя', style:{display:'block',margin:'30px 0 10px 0'}});
		cont.create('input',{type:'text',maxLength:25,value:'',id:'icdr',name:'icdr'});
	}
}

function openListOfOrders()/*вывод списка заказов после ввода штрихкода*/
{
	typework="privat";
	var loggin=identif.toLowerCase();
	var fio="";
	if(flag45)
	{
		if(take('icdr').n.value!="")
			loggin=take('icdr').n.value;
		else
		{
			alert('Введите код читателя!');
			return;
		}
	}
	else
	{
		loggin=eval(login);
		if(typeof AO!="undefined")
			fio=AO;
	}
	var ty1=take('y1').n.value;
	var tm1=take('m1').n.value;
	var td1=take('d1').n.value;
	var ty2=take('y2').n.value;
	var tm2=take('m2').n.value;
	var td2=take('d2').n.value;
	var inputdata1=take('y1').n.value+''+take('m1').n.value+''+take('d1').n.value;
	var inputdata2=take('y2').n.value+''+take('m2').n.value+''+take('d2').n.value;
	if(inputdata2 < inputdata1)
	{
		alert('Неверно задан временной интервал!');
	}
	else
	{
		var handler=modules["order"].directory+'/order.php';
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","php"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",handler]);
		querylist.push(["_service","STORAGE:opacholdd:ListOfOrders"]);
		querylist.push(["_version","1.0.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		if((typeof login !="undefined")&&(typeof AY !="undefined")&&(login=="AY"))
			querylist.push(["login",loggin.toUpperCase()]);
		else if((typeof login !="undefined")&&(typeof ET !="undefined")&&(login=="ET"))
			querylist.push(["codenlr",loggin]);
		else
			querylist.push(["reader",loggin]);
		querylist.push(["date[0]",inputdata1]);
		querylist.push(["date[1]",inputdata2]);
		querylist.push(["$date0",inputdata1]);
		querylist.push(["$date1",inputdata2]);
		querylist.push(["$reader",loggin]);
		querylist.push(["$fio",fio]);
		gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
		if((fio!="")&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
		{
			querylist.length=0;
			querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
			querylist.push(["_version","1.1.0"]);
			querylist.push(["session",numsean]);
			querylist.push(["id",identif]);
			querylist.push(["mode","ES"]);
			querylist.push(["code",EP]);
			gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
		}
		callToRCP(gArr);
	}
}

function ordersSearch()/*вход в личный кабинет - вывод списка заказов*/
{
	typework="privat";
	flag45=findFlag45();
	if(flag45)
	{
		ordersSearch2();
	}
	else
	{
		if(typeof flagUnload!="undefined")
			flagUnload=null;
		var inputdata1=Year+''+mm+''+dd;
		var handler=modules["order"].directory+'/order.php';
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","php"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",handler]);
		querylist.push(["_service","STORAGE:opacholdd:ListOfOrders"]);
		querylist.push(["_version","1.0.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		if((typeof login !="undefined") && ((login != "FU") || (login == "FU") && (typeof FU != "undefined")))
		{
			var loggin=identif.toLowerCase();
			if(typeof _reader!="undefined")
				loggin=_reader;
			else
				loggin=eval(login);
			if(login=="AY")
				querylist.push(["login",loggin.toUpperCase()]);
			else if(login=="ET")
				querylist.push(["codenlr",loggin]);
			else
				querylist.push(["reader",loggin]);
		}
		else
		{
			alert('Операция невозможна для данного пользователя');
			return;
		}
		querylist.push(["date[0]",inputdata1]);
		querylist.push(["date[1]",inputdata1]);
		querylist.push(["$date0",inputdata1]);
		querylist.push(["$date1",inputdata1]);
		querylist.push(["$reader",loggin]);
		if(typeof AO !="undefined")
			querylist.push(["$fio",AO]);
		gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
		if((typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
		{
			querylist.length=0;
			querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
			querylist.push(["_version","1.1.0"]);
			querylist.push(["session",numsean]);
			querylist.push(["id",identif]);
			querylist.push(["mode","ES"]);
			querylist.push(["code",EP]);
			gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
		}
		callToRCP(gArr);
	}
}

function listPrint()/*печать списка литературы*/
{
	if(printTab())
		window.print();
}

function loadWord()/*выгрузка списка литературы в WORD*/
{
	typework="";
	if(printTab())
	{
		var str=take('excel').n.innerHTML;
		var head='<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>ЗАКАЗ</title></head><body>';
		str=head+str+'</body></html>';
		var gArr=new Array();
		gArr.push(["_action","export"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_numsean",numsean]);
		gArr.push(["_ext",".rtf"]);
		gArr.push(["_mode","screen"]);
		gArr.push(["_text",str]);
		callToRCP(gArr);
	}
}

function printTab()/*подготовка списка литературы к выгрузке и печати*/
{
	var div;
	if(take('excel').n==null)
		div=take(document.body).create('div',{id: 'excel'});
	else
		div=take('excel');
	div.n.innerHTML="";
	countList();
	var tab=div.create('div',{id: 'tabord'});
	var head=tab.create('div',{style:{textAlign:'center',fontWeight:'bold'},textNode:'Список литературы'});
	var cont=tab.create('ol');
	var elem=take('tableorder').n;
	var arr=elem.childNodes[1].childNodes;
	var count=0;
	for(var i=0; i<arr.length; i++)
	{		
		if(arr[i].className=='checked')
		{
			cont.create('li',{textNode:arr[i].childNodes[2].innerHTML});
			count++;
		}
	}
	if(count==0)
	{
		alert('Не выбраны записи!');
		return false;
	}
	return true;
}

function listDel()/*удаление помечнной позиции в списке литературы*/
{
	typework="";
	var arg={'cls':'dialog2','message':'СПИСОК ЛИТЕРАТУРЫ','target':self,'width':'500','height':'400'};
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:Order"]);
	querylist.push(["_version","2.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["mode","clear"]);
	var arr=take('tableorder').getsign('input',{type: 'checkbox'});
	var count=0;
	var adb="";
	for(var i=0; i < arr.length; i++)
	{
		if((arr[i].checked)&&(arr[i].id!="mark"))
		{
			adb=arr[i].className;
			querylist.push(["query["+count+"]/db",adb]);
			numDB=adb;
			querylist.push(["query["+count+"]/id",arr[i].value]);
			count++;
		}
	}
	if(count==0)
	{
		alert('Не выбраны записи!');
		return;
	}
	if(confirm('Удалить выбранные записи?'))
	{
		showLayerWin('orderwin',arg);
		if(typeof _localiddb!="undefined")
			gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);
		else
			gArr.push(["querylist",prepareQueryString(querylist,numDB)]);
		ajaxToRCP(gArr,delMess);
	}
}

function delMess(x)/*вывод списка литературы после удаления позиции*/
{
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		var str='';
		str+='<div class="mess">Операция успешно завершена.</div><br/>';
		take('orderwinform').n.innerHTML=str;
		setTimeout('showOrderList()',1000);
	}
}

function closeSession()/*выход из личного кабинета*/
{
	goToLocation('close');
}

/*статистика для платного электронного абонемента*/

function addElemStat(o,s)
{
	portion=110;
	typework="privat";
	numDB=numdbBIBL;
	var handler=modules["statindividaddwide"].directory+'/statindividaddwide.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacesd:Manage"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","ExpStatES"]);
	querylist.push(["stat/startFrom/infoUser",s]);
	querylist.push(["stat/startFrom/idBibRec",o.parentNode.className]);
	querylist.push(["stat/level","2"]);
	querylist.push(["$howMuch",portion]);
	querylist.push(["$startFrom",s]);
	querylist.push(["$firstrec",replaceSymb(o.parentNode.className)]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
	}
	callToRCP(gArr);
}

function addElemStatP(o)
{
	portion=100;
	typework="privat";
	numDB=numdbBIBL;
	var handler=modules["statindividaddwide"].directory+'/statindividaddwide.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacesd:Manage"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","ExpMyStatES"]);
	querylist.push(["stat/level","2"]);
	querylist.push(["stat/code",EP]);
	querylist.push(["stat/reader",ET]);
	querylist.push(["stat/idBibRec",o.parentNode.className]);
	querylist.push(["stat/startFrom",1]);
	querylist.push(["stat/howMuch",portion]);
	querylist.push(["$howMuch",portion]);
	querylist.push(["$startFrom",1]);
	querylist.push(["$firstrec",replaceSymb(o.parentNode.className)]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	querylist.push(["$back","P"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
	}
	callToRCP(gArr);
}

function seeAddStatDigitMy()
{
	portion=110;
	typework="privat";
	numDB=numdbBIBL;
	var useres="";
	if(take('ues').n!=null)
		useres=take('ues').n.value
	var handler=modules["statdigit"].directory+'/statdigit.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacesd:Manage"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","ExpStatOrdersForDigitization"]);
	querylist.push(["stat/code",useres]);
	querylist.push(["stat/reader",ET]);
	querylist.push(["stat/startFrom",1]);
	querylist.push(["stat/howMuch",portion]);
	querylist.push(["$startFrom",1]);
	querylist.push(["$howMuch",portion]);
	querylist.push(["$portioncount",0]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
	}
	callToRCP(gArr);
}

function seeAddStatDigit(num)
{
	portion=110;
	typework="privat";
	numDB=numdbBIBL;
	var useres="";
	if(take('ues').n!=null)
		useres=take('ues').n.value
	var handler=modules["statdigit"].directory+'/statdigit.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacesd:Manage"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","ExpStatOrdersForDigitization"]);
	querylist.push(["stat/code",useres]);
	querylist.push(["stat/startFrom",1]);
	querylist.push(["stat/howMuch",portion]);
	querylist.push(["$startFrom",1]);
	querylist.push(["$howMuch",portion]);
	querylist.push(["$portioncount",0]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
	}
	callToRCP(gArr);
}

function seeAddStat(s,r,p,f)
{
	portion=110;
	typework="privat";
	numDB=numdbBIBL;
	var ind=""
	if(typeof s!="string")
	{
		s=take('nga').n.value+''+take('ues').n.value+''+take('dtc').n.value;
		portioncount=0;
	}
	else
	{
		portioncount=parseInt(p,10);
		ind=r;
	}
	var handler=modules["statindividadd"].directory+'/statindividadd.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacesd:Manage"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","ExpStatES"]);
	querylist.push(["stat/level","1"]);
	querylist.push(["stat/startFrom/infoUser",s.toUpperCase()]);
	querylist.push(["stat/howMuch",portion]);
	querylist.push(["$startFrom",s.toUpperCase()]);
	querylist.push(["$howMuch",portion]);
	querylist.push(["$portioncount",portioncount]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
	}
	callToRCP(gArr);
}

function seeAddStatP(s,r,p,f)
{
	typework="privat";
	numDB=numdbBIBL;
	var ind=""
	if(typeof s!="string")
	{
		s=EP+''+ET+''+take('dtc').n.value;
		portioncount=0;
	}
	else
	{
		portioncount=parseInt(p,10);
		ind=r;
	}
	portion=110;
	var handler=modules["statindividadd"].directory+'/statindividadd.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacesd:Manage"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["toDo","ExpMyStatES"]);
	querylist.push(["stat/level","1"]);
	querylist.push(["stat/code",EP]);
	querylist.push(["stat/reader",ET]);
	querylist.push(["stat/startFrom",1]);
	querylist.push(["stat/howMuch",portion]);
	querylist.push(["$startFrom",s]);
	querylist.push(["$howMuch",portion]);
	querylist.push(["$portioncount",portioncount]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	querylist.push(["$back","P"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
	}
	callToRCP(gArr);
}

function seeAddStatInd(s)
{
	portion=110;
	var back="";
	if(typeof s !="string")
	{
		s=ET;
	}
	else
	{
		back="userlist";		
	}
	typework="privat";
	numDB=numdbBIBL;
	var dc=take('dtc').n.value;
	var ds=take('dts').n.value;
	var handler=modules["stataddindivid"].directory+'/stataddindivid.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacholdd:ListOfOrders"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["id",identif]);
	querylist.push(["mode","ES"]);
	querylist.push(["codenlr",s]);
	querylist.push(["date[0]",dc]);
	querylist.push(["date[1]",ds]);
	querylist.push(["startFrom",1]);
	querylist.push(["fond","ED"]);
	querylist.push(["howMuch",portion]);
	querylist.push(["$startFrom",1]);
	querylist.push(["$howMuch",portion]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	querylist.push(["$groupid",EP]);
	querylist.push(["$date0",dc]);
	querylist.push(["$date1",ds]);
	if(back!="")
		querylist.push(["$back",back]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
	{
		querylist.length=0;
		querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);
		querylist.push(["_version","1.1.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["mode","ES"]);
		querylist.push(["code",EP]);
		gArr.push(["querylist",prepareQueryString(querylist)]);
	}
	callToRCP(gArr);
}

function statInd()
{
	typework="privat";
	if((typeof EP == "undefined")||(EP=="")||(EP=="N/A"))
	{
		alert('Данному типу пользователя статистика недоступна.');
		return;
	}
	else
	{
		var handler=modules["statindivid"].directory+'/statindivid.php';
		var gArr=new Array();
		var querylist=new Array();
		gArr.push(["_action","php"]);
		gArr.push(["_errorhtml","error1"]);
		gArr.push(["_handler",handler]);
		querylist.push(["_service","STORAGE:opacesd:Manage"]);
		querylist.push(["_version","1.0.0"]);
		querylist.push(["session",numsean]);
		querylist.push(["id",identif]);
		querylist.push(["toDo","StatES"]);
		querylist.push(["es/code",EP]);
		querylist.push(["es/reader",ET]);
		querylist.push(["$AI",AI]);
		querylist.push(["$fio",AO]);
		gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
		callToRCP(gArr);
	}
}

function showPersons(o)
{
	portion=110;
	typework="privat";
	var groupid="";
	if(typeof o!="number")
	{
		begin=1;
		portioncount=0;
		quant=0;
		portionarr=[];
		thegroup=o.parentNode;
		portionarr[portioncount]=begin;
	}
	else
	{
		if(o==0)
		{
			portioncount--;
			begin=portionarr[portioncount];
		}
		else
		{
			portioncount++;
			begin=begin+portion;
			portionarr[portioncount]=begin;
		}
	}

	groupid=thegroup.id.substring(1);
	var handler=modules["personstat"].directory+'/personstat.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacesd:Manage"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",top.numsean]);
	querylist.push(["id",top.identif]);
	querylist.push(["toDo","MembersES"]);
	querylist.push(["es/code",groupid]);
	querylist.push(["es/begin",begin]);
	querylist.push(["es/number",portion]);
	querylist.push(["$portioncount",portioncount]);
	querylist.push(["$begin",begin]);
	querylist.push(["$groupid",groupid]);
	querylist.push(["$fio",AO]);
	querylist.push(["$AI",AI]);
	querylist.push(["$umail",take('uml').n.value]);
	querylist.push(["$dtc",take('dtc').n.value]);
	querylist.push(["$date0",take('dtc').n.value]);
	querylist.push(["$date1",take('dts').n.value]);
	gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);
	callToRCP(gArr);
}

/*конец статистика для платного электронного абонемента*/

function myBooks()/*окно выбора даты для истории выдач*/
{
	var arg={'cls':'dialog2','target': self, 'message':'ИСТОРИЯ ВЫДАЧ','callback':'callReaderHistory','callbackname':'Показать','width':'500','height':'400'};
	showLayerWin('recordswin',arg);
	var doc=take('recordswinform');
	doc.n.innerHTML="";
	var cont=doc.create('div',{id: 'dateordcontainer', className: 'period'});
	cont.create('div',{textNode:'Дата выполнения заказа', style:{fontWeight: 'bold', margin: '5px 5px 25px 5px'}});
	cont.create('span',{className: 'from', textNode: ' с ', style:{marginRight:'15px'}});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d1',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m1',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y1',onblur:'changeData',onmouseup:'changeData'});
	cont.create('span',{title:'Выбрать из календаря',id:'1',className:'calc',onmousedown:'CreateCal'});
	cont.create('br',{clear:'all'});
	cont.create('br',{clear:'all'});
	cont.create('span',{className: 'to', textNode: ' по ', style:{marginRight:'5px'}});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d2',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m2',onblur:'changeData',onmouseup:'changeData'});
	cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y2',onblur:'changeData',onmouseup:'changeData'});
	cont.create('span',{title:'Выбрать из календаря',id:'2',className:'calc',onmousedown:'CreateCal'});
	if(flag45)
	{
		cont.create('b',{className: 'to', textNode: 'Код читателя', style:{display:'block',margin:'30px 0 10px 0'}});
		cont.create('input',{type:'text',maxLength:25,value:'',id:'icdr',name:'icdr'});
	}
}

function callReaderHistory()/*история выдач*/
{
	var inputdata1=take('y1').n.value+''+take('m1').n.value+''+take('d1').n.value;
	var inputdata2=take('y2').n.value+''+take('m2').n.value+''+take('d2').n.value;
	var code="";
	if(inputdata2 < inputdata1)
	{
		alert('Неверно задан временной интервал!');
		return;
	}
	if(flag45)
	{
		if(take('icdr').n.value!="")
			code=take('icdr').n.value;
		else
		{
			alert('Введите код читателя!');
			return;
		}
	}
	else
	{
		code=FU;
	}
	typework="";
	delLayerWin();
	var arg={'cls':'dialog2','target': self, 'message':'История выдач','divframe':'1','forlinks':'1'};
	showLayerWin('recordswin',arg);
	self.frames[0].document.open();
	self.frames[0].document.close();
	trg=self.frames[0];
	var gArr=new Array();
	gArr.push(["_inputdata1",inputdata1]);
	gArr.push(["_inputdata2",inputdata2]);
	gArr.push(["_code",code]);
	gArr.push(["_height",window.innerHeight-200]);
	callToRCP(gArr,trg,pathhtml+'/_modules/readerhistory/readerhistory.php');
}

/*-------------конец личный кабинет------------*/

/*--------- дополнительные функции -------------*/

/*--------- рейтинги -------------*/

function callBookRating()/*часто выдаваемые книги*/
{
	var ifr=null;
	if(take('nframe').n !=null)
		ifr=take('nframe');
	else
		ifr=take('infor').create('iframe',{src:'about:blank',marginHeight:'0', marginWidth:'0', border:'0', style:{margin:'0px',padding:'0px',width:'1px',height:'1px'}, id:'nframe','name':'nframe',scrolling:'no',frameBorder:'0'});
	var idoc=(document.selection)?ifr.n.contentWindow.document:ifr.n.contentDocument;
	idoc.open();
	idoc.close();
	ifr.n.src=pathhtml+'/_modules/bookrating/_additional/bookrating.php';
	var arg={};
	arg.cls='loader';
	showLayerWin('loader1win',arg);
}

function callEBookRating()/*часто выдаваемые электронные документы*/
{
	var ifr=null;
	if(take('nframe').n !=null)
		ifr=take('nframe');
	else
		ifr=take('infor').create('iframe',{src:'about:blank',marginHeight:'0', marginWidth:'0', border:'0', style:{margin:'0px',padding:'0px',width:'1px',height:'1px'}, id:'nframe','name':'nframe',scrolling:'no',frameBorder:'0'});
	var idoc=(document.selection)?ifr.n.contentWindow.document:ifr.n.contentDocument;
	idoc.open();
	idoc.close();
	ifr.n.src=pathhtml+'/_modules/ebookrating/_additional/ebookrating.php';
	var arg={};
	arg.cls='loader';
	showLayerWin('loader1win',arg);
}

/*--------- конец рейтинги ---------*/

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

function reAuth()
{
	goToLocation('privat');
}

function reAnswere()
{
	goToLocation('contacts');
}

/*--------- конец дополнительные функции -------------*/

/*------------------------------ конец авторизация, регистрация и статистика -------------------------------------*/