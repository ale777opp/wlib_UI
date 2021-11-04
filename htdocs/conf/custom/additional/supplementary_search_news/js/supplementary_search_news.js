/*---------------------------------- дополнительный новостной модуль ----------------------------*/

/*новости сайта*/

function searchNewsSite(ndb,sign,c)/*вывод новостей сайта*/
{
	if((typeof ndb == "undefined")||(ndb == null))
		ndb=_iddb;
	if((typeof sign == "undefined")||(sign == null))
		sign=_sign;
	var howmuch="";
	var startfrom="";
	if(typeof c=="undefined")
	{
		howmuch=portion;
		startfrom=0;
	}
	else
	{
		howmuch=_length;
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
	}
	typework="search";
	var handler=modules["search"].directory+'/_additional/newssite.php';
	var y=Year-1;
	var str="";
	var showstr="";
	if(sign=="all")
	{
		str=prepareStr("[bracket]DT BETWEEN [apos]"+y+""+mm+""+dd+"[apos],[apos]"+Year+""+mm+""+dd+"[apos][/bracket]");
		showstr="<i>за </i>"+Year+" год";
	}
	else
	{
		str=prepareStr("[bracket]DT LE [apos]"+y+""+mm+""+dd+"[apos][/bracket]");
		showstr="<i>Архив новостей </i>";
	}
	var term=prepareTerm(str);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
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
	querylist.push(["$outform","SHORTNEWS"]);
	querylist.push(["outformList[0]/outform","SHORTNEWS"]);
	querylist.push(["iddb",ndb]);
	querylist.push(["$iddb",ndb]);
	querylist.push(["$sign",sign]);
	querylist.push(["_history","yes"]);
	querylist.push(["query/body",term]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	querylist.push(["query/label","DT"]);
	querylist.push(["query/direct","desc"]);
	if(sign=="all")
	{
		querylist.push(["$renew","yes"]);
	}
	gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	callToRCP(gArr);
}

function addSeeNewsSite(ind,ndb)/*подробный вывод новости*/
{
	typework="search";
	var sign="all";
	if(typeof _sign!="undefined")
		sign=_sign;
	var handler=modules["search"].directory+'/_additional/newssiteadd.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["start",0]);
	querylist.push(["length",portion]);
	querylist.push(["_start",0]);
	querylist.push(["$length",portion]);
	querylist.push(["iddbIds[0]/id",ind]);
	querylist.push(["iddbIds[0]/iddb",ndb]);
	querylist.push(["outform","FULLNEWS"]);
	querylist.push(["_history","yes"]);
	querylist.push(["$iddb",ndb]);
	querylist.push(["$sign",sign]);
	gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	callToRCP(gArr);
}

/*конец новости сайта*/

/*новые поступления*/

function searchNewRecs(ndb,sign,c)/*новые поступления*/
{
	if((typeof ndb == "undefined")||(ndb == null))
		ndb=_iddb;
	var howmuch="";
	var startfrom="";
	var month="";
	var year="";
	if(typeof c=="undefined")
	{
		howmuch=portion;
		startfrom=0;
	}
	else
	{
		howmuch=_length;
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
	}
	typework="search";
	var handler=modules["search"].directory+'/_additional/newrecs.php';
	var y=Year-1;
	var str="";
	var showstr="";
	if(sign=="all")
	{
		str=prepareStr("[bracket]DT BETWEEN [apos]"+y+""+mm+""+dd+"[apos],[apos]"+Year+""+mm+""+dd+"[apos][/bracket]");
		month=mm;
		year=Year;
		showstr="<i>за </i>"+Year+" год";
		sign=showstr;
	}
	else
	{
		if((typeof sign == "undefined")||(sign == null))
		{
			str=_str;
			showstr=_showstr;
			month=_month;
			year=_year;
			sign=_sign;
		}
		else
		{
			str=sign.str;
			showstr=sign.showstr;
			month=sign.m;
			year=sign.y;
			sign=showstr;
		}
	}
	var action="php";
	if(typeof biblio!="undefined")
		action="biblio";
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
	var outfrm=outform;
	if(typeof dbs[ndb].outform!="undefined")
		outfrm=dbs[ndb].outform;
	querylist.push(["$outform",outfrm]);
	querylist.push(["outformList[0]/outform",outfrm]);
	querylist.push(["iddb",ndb]);
	querylist.push(["$iddb",ndb]);
	querylist.push(["$sign",sign]);
	if(month!="")
		querylist.push(["$month",month]);
	if(year!="")
		querylist.push(["$year",year]);
	querylist.push(["_history","yes"]);
	querylist.push(["query/body",term]);
	querylist.push(["query/params[0]/name","presence"]);
	querylist.push(["query/params[0]/value","INCLUDE"]);
	if(typeof biblio!="undefined")
	{
		var bobj={'query': term ,'databases':[ndb],'paging':{'limit': portion,'offset': 0}};
		var fobj=prepareFacetsForBibliosearch();
		if(fobj!=null)
			bobj.filters=fobj._bstr;
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
	querylist.push(["query/label","DT"]);
	querylist.push(["query/direct","desc"]);
	querylist.push(["$newrecs",handler]);
	gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	callToRCP(gArr);
}

function setEvent(y,m)/*новые поступления из календаря*/
{
	var y1=0;
	var m1=0;
	var flagyear=false;
	if(typeof y == "object")
	{
		y1=parseInt(take('y_10').n.className,10);
		m1=parseInt(take('m_10').n.className,10);
		if(y.id == 'y_10')
			flagyear=true;
	}
	else
	{
		y1=parseInt(y,10);
		m1=parseInt(m,10);
	}
	if(typeof _newrecs != "undefined")
	{
		var validnumber;
		if(m1==1)
			(isLeapyear(y1))?validnumber=29:validnumber=28;
		else if((m1==3)||(m1==5)||(m1==8)||(m1==10))
			validnumber=30;
		else
			validnumber=31;
		var m2=(m1+1<10)?'0'+(m1+1):m1+1;
		var str="";
		var showstr="";
		if(flagyear)
		{
			str="[bracket]DT BETWEEN [apos]"+y1+"0101[apos],[apos]"+y1+"1231[apos][/bracket]";
			showstr="<i>за </i> "+y1+" год";
		}
		else
		{
			str="[bracket]DT BETWEEN [apos]"+y1+""+m2+"01[apos],[apos]"+y1+""+m2+""+validnumber+"[apos][/bracket]";
			showstr="<i>за "+months[m1]+"</i> "+y1+" года";
		}
		var arg={};
		arg.str=str;
		arg.showstr=showstr;
		arg.m=m2;
		arg.y=y1;
		searchNewRecs(_iddb,arg);
	}
}

/*конец новые поступления*/

/*публикации*/

function searchPubThemeList(ndb,lab)/*список тем*/
{
	typework="search";
	var handler=modules["search"].directory+'/_additional/publicationslist.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
	querylist.push(["_version","1.2.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["$label",lab]);
	querylist.push(["label",lab]);
	//querylist.push(["$start",1]);
	querylist.push(["query",""]);
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	querylist.push(["iddb",ndb]);
	gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	callToRCP(gArr);
}

function searchPubTheme(o,ndb,c)/*список публикаций по теме*/
{
	var howmuch="";
	var startfrom="";
	if(typeof c=="undefined")
	{
		howmuch=portion;
		startfrom=0;
		//if(typeof _start!="undefined")
		//	startfrom=_start;
	}
	else
	{
		howmuch=_length;
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
	}
	typework="search";
	var handler=modules["search"].directory+'/_additional/publications.php';
	var str=prepareStr("[bracket]TM "+o.innerHTML+"[/bracket]");
	var showstr="<i>Тема</i> "+o.innerHTML;
	var term=prepareTerm(str);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_start",startfrom]);
	querylist.push(["start",startfrom]);
	querylist.push(["$length",howmuch]);
	querylist.push(["length",howmuch]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	querylist.push(["$outform","SHORTPUB"]);
	querylist.push(["outformList[0]/outform","SHORTPUB"]);
	querylist.push(["iddb",ndb]);
	querylist.push(["$iddb",ndb]);
	querylist.push(["$sign",o.innerHTML]);
	querylist.push(["_history","yes"]);
	querylist.push(["query/body",term]);
	querylist.push(["query/label","DT"]);
	querylist.push(["query/direct","desc"]);
	gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	callToRCP(gArr);
}

function searchPublications(ndb,sign,c)/*архив публикаций*/
{
	if((typeof ndb == "undefined")||(ndb == null))
		ndb=_iddb;
	if((typeof sign == "undefined")||(sign == null))
		sign=_sign;
	var howmuch="";
	var startfrom="";
	if(typeof c=="undefined")
	{
		howmuch=portion;
		startfrom=0;
		if(typeof _start!="undefined")
			startfrom=_start;
	}
	else
	{
		howmuch=_length;
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
	}
	typework="search";
	var handler=modules["search"].directory+'/_additional/publications.php';
	var y=Year-1;
	var str="";
	var showstr="";
	if(sign=="all")
	{
		str=prepareStr("[bracket]DT BETWEEN [apos]"+y+""+mm+""+dd+"[apos],[apos]"+Year+""+mm+""+dd+"[apos][/bracket]");
		showstr=prepareStr("<i>Дата </i> с "+dd+"."+mm+"."+y+" по "+dd+"."+mm+"."+Year);
	}
	else
	{
		str=prepareStr("[bracket]DT LE [apos]"+y+""+mm+""+dd+"[apos][/bracket]");
		showstr=prepareStr("<i>Дата </i> по "+dd+"."+mm+"."+y);
	}
	var term=prepareTerm(str);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_start",startfrom]);
	querylist.push(["start",startfrom]);
	querylist.push(["$length",howmuch]);
	querylist.push(["length",howmuch]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	querylist.push(["$outform","SHORTPUB"]);
	querylist.push(["outformList[0]/outform","SHORTPUB"]);
	querylist.push(["iddb",ndb]);
	querylist.push(["$iddb",ndb]);
	querylist.push(["$sign",sign]);
	querylist.push(["_history","yes"]);
	querylist.push(["query/body",term]);
	querylist.push(["query/label","DT"]);
	querylist.push(["query/direct","desc"]);
	if(sign=="all")
	{
		querylist.push(["$renew","yes"]);
	}
	gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	callToRCP(gArr);
}

function addPublications(ind,ndb)/*подробный вывод публикаций*/
{
	typework="search";
	var sign="all";
	if(typeof _sign!="undefined")
		sign=_sign;
	var handler=modules["search"].directory+'/_additional/publicationsadd.php';
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["start",0]);
	querylist.push(["length",portion]);
	querylist.push(["_start",0]);
	querylist.push(["$length",portion]);
	querylist.push(["iddbIds[0]/id",ind]);
	querylist.push(["iddbIds[0]/iddb",ndb]);
	querylist.push(["outform","FULLPUB"]);
	querylist.push(["_history","yes"]);
	querylist.push(["$iddb",ndb]);
	querylist.push(["$sign",sign]);
	gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	callToRCP(gArr);
}

/*конец публикации*/

/*фотогалерея*/

function searchPhotoThemeList(ndb,lab,c)/*разделы фотогалереи*/
{
	var howmuch="";
	var startfrom="";
	if(typeof c=="undefined")
	{
		howmuch=portion;
		startfrom=0;
	}
	else
	{
		howmuch=_length;
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
	}
	typework="search";
	var handler=modules["search"].directory+'/_additional/photos.php';
	var str=prepareStr("[bracket]LTPHL ФОТОГАЛЕРЕЯ[/bracket]");
	var showstr="<i>Тема</i> ФОТОГАЛЕРЕЯ";
	var term=prepareTerm(str);
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:FindView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_start",startfrom]);
	querylist.push(["start",startfrom]);
	querylist.push(["$length",howmuch]);
	querylist.push(["length",howmuch]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
	querylist.push(["$outform","SHORTPHOTO"]);
	querylist.push(["outformList[0]/outform","SHORTPHOTO"]);
	querylist.push(["iddb",ndb]);
	querylist.push(["$iddb",ndb]);
	querylist.push(["_history","yes"]);
	querylist.push(["query/body",term]);
	/*querylist.push(["query/label","DT"]);
	querylist.push(["query/direct","desc"]);*/
	gArr.push(["querylist",prepareQueryString(querylist,ndb)]);
	callToRCP(gArr);
}

function searchPhoto(act,outf,ndb,sign,c)/*фотогалерея*/
{
	var handler=modules["search"].directory+'/_additional/photos.php';
	var howmuch="";
	var startfrom="";
	var actstr="";
	var actterm="";
	var outfrm="";
	var db="";
	var ssign="";
	if(sign!=null)
	{
		ssign=sign;
	}
	else
	{
		if(typeof _sign!="undefined")
			ssign=_sign;		
	}
	if(c==null)
	{
		howmuch=portion;
		startfrom=0;
		actstr=act;
		actterm=act;
		db=ndb;
		outfrm=outf;
	}
	else
	{
		actstr=_actstr;
		actterm=actstr;
		howmuch=_length;
		startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);
		db=_iddb;
		outfrm=_outform;
	}
	actterm=actterm.replace(/\[quot\]/gi,'"');
	actterm=actterm.replace(/\[apos\]/gi,"'");
	actterm=actterm.replace(/\[backslash\]/gi,"\\");/*зависит от выходной формы*/
	//actterm=actterm.replace(/\[backslash\]/gi,"\\\\");
	typework="unknown";
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","php"]);
	gArr.push(["_errorhtml","error1"]);
	gArr.push(["_handler",handler]);
	querylist.push(["_service","STORAGE:opacfindd:MetaView"]);
	querylist.push(["_version","2.5.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["_history","yes"]);
	querylist.push(["_start",startfrom]);
	querylist.push(["start",startfrom]);
	querylist.push(["$length",howmuch]);
	querylist.push(["length",howmuch]);
	querylist.push(["iddb",db]);
	querylist.push(["action","SEEF"]);
	querylist.push(["id",actterm]);
	querylist.push(["$actstr",actstr]);
	querylist.push(["$outform",outfrm]);
	if(ssign!="")
		querylist.push(["$sign",ssign]);
	querylist.push(["outformList[0]/outform",outfrm]);
	gArr.push(["querylist",prepareQueryString(querylist,db)]);
	callToRCP(gArr);
}

function zoomImg(o)/*увеличение картинки в фотогалерее*/
{
	var src="";
	var title="";
	var fig=take(o).tags('input')[0];
	if(fig!=null)
		src=fig.value;
	var figc=take(o).tags('figcaption')[0];
	if(figc!=null)
		title='<span>'+figc.innerHTML+'</span>';
	var arg={};
	arg.cls='dialog3';
	arg.message=" ";
	arg.divframe=1;
	arg.target=self;
	showLayerWin('zoomwin',arg);
	self.frames["zoomwinframe"].document.open();
	self.frames[0].document.write('<html><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta http-equiv="Content-Script-Type" content="text/javascript"/><style type="text/css">img {height: 100% !important;} body {margin:0; padding:0; text-align:center;} span {display:table-cell; vertical-align:middle; text-align:center; font-size:13px; font-family:sans-serif; color: #fff; padding: 10px 10% 10px 10%;} div { display:table; vertical-align:middle; background:rgba(51,51,51,0.7); height:80px; position:absolute; bottom:10px; left:0; width:100%;} span > b {display:block;}</style></head><body><img src="'+src+'"/><div>'+title+'</div></body></html>');
	self.frames[0].document.close();
}

/*конец фотогалерея*/

/*------------------------------- конец дополнительный новостной модуль ----------------------------*/