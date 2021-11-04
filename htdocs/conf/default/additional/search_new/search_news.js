
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
	querylist.push(["_start",0]);
	querylist.push(["start",0]);
	querylist.push(["$length",portion]);
	querylist.push(["length",portion]);
	querylist.push(["_showstr",showstr]);
	querylist.push(["_str",str]);
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
	querylist.push(["query/label","DT"]);
	querylist.push(["query/direct","desc"]);
	gArr.push(["querylist",prepareQueryString(querylist,db)]);
	callToRCP(gArr);
}
