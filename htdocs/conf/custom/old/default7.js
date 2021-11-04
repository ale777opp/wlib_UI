
var curDate=new Date();var Month=curDate.getMonth();var Year=curDate.getFullYear();var maxYear=Year+1;var minYear=1920;var validd1=31;var validm=12;var dd=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();var mm=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;var cd=Year+mm+dd;function isLeapyear(theyear)
{return(!(theyear%4)&&(theyear%100||!(theyear%400)))?true:false;}
function setValidDay(v,y,ind)
{var validnumber;if(v=='02')
(isLeapyear(y))?validnumber=29:validnumber=28;else if((v=='04')||(v=='06')||(v=='09')||(v=='11'))
validnumber=30;else
validnumber=31;if((parseInt(take(ind).n.value,10)>validnumber)||(take(ind).n.value.length<2))
take(ind).n.value=validnumber;}
var monthDays=new Array(31,28,31,30,31,30,31,31,30,31,30,31);var months=new Array('Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь');var cobj=null;function CreateCal(e)
{var obj=new calObj(getSrc(e).id);obj.calPrint(e);}
function CreateCal2(e)
{var obj=new calObj(getSrc(e).id,'2005',maxYear);obj.calPrint(e);}
function CreateCal1(e)
{var obj=new calObj(getSrc(e).id,'1920');obj.calPrint(e);}
function calObj(ind,minyear,maxyear)
{this.id="_"+ind;this.year=Year;this.month=Month;this.day=curDate.getDate();this.minyear=minyear||minYear;this.maxyear=maxyear||maxYear;this.className="calendar";this.years=new Array();var len=this.maxyear-this.minyear;this.week=new Array('Пн','Вт','Ср','Чт','Пт','Сб','Вс');this.setCal=setCal;this.calPrint=calPrint;this.fillCels=fillCels;maxYear=this.maxyear;minYear=this.minyear;}
function fillCels(e)
{var par=this.parentNode.parentNode;var ind=getSrc(e).parentNode.id.substring(getSrc(e).parentNode.id.indexOf('_')+1);var y=parseInt(take('y_'+ind).n.value);var m=(parseInt(take('m_'+ind).n.className)+1<10)?'0'+(parseInt(take('m_'+ind).n.className)+1):parseInt(take('m_'+ind).n.className)+1;var dd=getSrc(e).innerHTML;dd=(parseInt(dd)+1<10)?'0'+(parseInt(dd)):parseInt(dd);take('d'+ind).n.value=dd;take('m'+ind).n.value=m;take('y'+ind).n.value=y;putDT(e);calDel(par.id);}
function setCal(e)
{var par=take('numeric'+cobj.id);par.n.innerHTML="";var nDate=new Date(Year,Month,0);if(isLeapyear(Year))
monthDays[1]=29;else
monthDays[1]=28;var days=monthDays[Month];var start=nDate.getDay();days+=start;var i=0;for(i=0;i<start;i++)
par.create('span',{className:'empty',textNode:'.'});for(i=start;i<days;i++)
{var cls;if((i%7==5)||(i%7==6))
cls='rest';else
cls='work';var span=par.create('span',{textNode:(i-start+1),className:cls,title:' выбрать ',onmousedown:'fillCels'});if((i-start+1)==curDate.getDate())
{span.n.className='now';}}
if(((i%7)<7)&&(i%7)!=0)
{for(var j=(i%7);j<7;j++)
par.create('span',{className:'empty',textNode:'.'});}
take('m'+cobj.id).n.className=Month;take('m'+cobj.id).n.innerHTML=months[Month];take('y'+cobj.id).n.value=Year;}
function putCMonth(e)
{var obj=getSrc(e);var elem=obj.parentNode;var par=elem.parentNode;var mobj=take(elem.id.substring(1)).n;Month=mobj.className=obj.className;mobj.innerHTML=obj.innerHTML;par.removeChild(elem);}
function changeMonth(e)
{var elem=getSrc(e);var par=elem.parentNode;var cmo=take(par).create('ul',{id:'m'+elem.id,className:'cselect'});for(var i=0;i<months.length;i++)
{var opt=cmo.create('li',{textNode:months[i],className:i,onmousedown:'putCMonth'});if(i==Month)
opt.n.className='active';}}
function calPrint(e)
{calDel(this.id);cobj=this;var elem=take(document.body).create('div',{id:this.id,className:this.className});var header=elem.create('div',{className:'close'});header.create('span',{textNode:'X',title:'Закрыть',className:'del',onmousedown:'function(){calDel("'+this.id+'");};'});var top=elem.create('div',{className:'top'});top.create('span',{className:'arl',title:'назад',onclick:'setMounth',textNode:'<'});top.create('span',{id:'m'+this.id,title:'изменить',textNode:months[this.month],className:this.month,onmousedown:'changeMonth'});top.create('span',{className:'arr',title:'вперед',onclick:'setMounth',textNode:'>'});top.create('span',{className:'arl',title:'назад',onclick:'setYear',textNode:'<'});top.create('input',{type:'text',title:'изменить',id:'y'+this.id,value:this.year,maxLength:'4',onkeyup:'setYear',onblur:'setYear'});top.create('span',{className:'arr',title:'вперед',onclick:'setYear',textNode:'>'});var days=elem.create('div',{className:'days'});var len=this.week.length;for(var i=0;i<len;i++)
{days.create('span',{textNode:this.week[i]});}
var num=elem.create('div',{id:'numeric'+this.id});this.setCal(e);X=getX(e);Y=getY(e);var r=(isIE)?parseInt(document.body.clientWidth-X):parseInt(window.innerWidth-X);var t=(isIE)?parseInt(document.body.clientHeight-Y):parseInt(window.innerHeight-Y);var w=elem.getw();var h=elem.geth();var sX=sY=0;if(r<w)sX=parseInt(X-w);else sX=parseInt(X);if(t<h)sY=parseInt(Y-h);else sY=parseInt(Y);elem.setx(sX);elem.sety(sY);}
function setMounth(e)
{var c=0;if(getSrc(e).className=='arr')
c=1;var oldm=parseInt(take('m'+cobj.id).n.className);var curm=(c==0)?oldm-1:oldm+1;if(curm>11)
{curm=0;}
if(curm<0)
{curm=11;}
Month=curm;setCal(e);}
function setYear(e)
{var cury=Year;if(getSrc(e).nodeName.toLowerCase()=='input')
{if(getSrc(e).value.length<4)
return;else
cury=getSrc(e).value;}
else
{var c=0;if(getSrc(e).className=='arr')
c=1;var oldy=parseInt(take('y'+cobj.id).n.value);var cury=(c==0)?oldy-1:oldy+1;}
if((cury>maxYear)||(cury<minYear))
cury=curDate.getFullYear();Year=cury;setCal(e);}
function calDel(ind)
{var div=take(ind).n;if(div!=null)
{div.parentNode.removeChild(div);curDate=new Date();Month=curDate.getMonth();Year=curDate.getFullYear();}
else
return;cobj=null;}
function correctVal(e)
{var elem=getSrc(e);if(elem.nodeName.toLowerCase()!='input')
return;var val=elem.value;if(!IsInt(val))
{alert('Значение должно быть цифровым!');elem.focus();return;}
var pref=getSrc(e).id.substring(0,1);var tail=getSrc(e).id.substring(1,getSrc(e).id.length);var etype=(!isIE)?e.type:window.event.type;switch(pref)
{case'd':if(((val=='')||(val.length<2))&&(etype=="blur"))
elem.value=dd;if(val.length==2)
{if((parseInt(val,10)>validd1)||(parseInt(val,10)==0))
elem.value=dd;if((parseInt(val,10)<10)&&(parseInt(val,10)!=0))
elem.value="0"+parseInt(val,10);var y=(take('y'+tail).n.value.length==4)?parseInt(take('y'+tail).n.value,10):minYear;if(take('m'+tail).n.value!="")
setValidDay(take('m'+tail).n.value,y,'d'+tail);if((getCode(e)==39)&&(etype!="blur"))
take('m'+tail).n.focus();}
break;case'm':if((take('d'+tail).n.value.length<2)||(parseInt(take('d'+tail).n.value)>validd1))
take('d'+tail).n.value=dd;if(((val=='')||(val.length<2))&&(etype=="blur"))
elem.value=mm;if(val.length==2)
{var y=(take('y'+tail).n.value.length==4)?parseInt(take('y'+tail).n.value,10):minYear;if((parseInt(val,10)>validm)||(parseInt(val,10)==0))
elem.value=mm;if((parseInt(val,10)<10)&&(parseInt(val,10)!=0))
elem.val="0"+parseInt(val,10);setValidDay(parseInt(val,10),y,'d'+tail);if((getCode(e)==37)&&(etype!="blur"))
take('d'+tail).n.focus();if((getCode(e)==39)&&(etype!="blur"))
take('y'+tail).n.focus();}
break;case'y':if(take('m'+tail).n.value.length<2)
take('m'+tail).n.value=mm;if(take('d'+tail).n.value.length<2)
take('d'+tail).n.value=dd;if(((val=='')||(parseInt(val,10)<minYear)||(parseInt(val,10)>maxYear))&&(etype=="blur"))
elem.value=Year;setValidDay(take('m'+tail).n.value,parseInt(elem.value,10),'d'+tail);if((getCode(e)==37)&&(etype!="blur"))
take('m'+tail).n.focus();break;case'h':if((val=='')||(val.length<2))
elem.value='00';if(val.length==2)
{if((parseInt(val,10)>23)||(parseInt(val,10)==0))
elem.value='00';if((parseInt(val,10)<10)&&(parseInt(val,10)!=0))
elem.value="0"+parseInt(val,10);}
break;case's':if(take('h'+tail).n.value.length<2)
take('h'+tail).n.value='00';if((val=='')||(val.length<2))
elem.value='00';if(val.length==2)
{if((parseInt(val,10)>59)||(parseInt(val,10)==0))
elem.value='00';if((parseInt(val,10)<10)&&(parseInt(val,10)!=0))
elem.val="0"+parseInt(val,10);}
break;default:break;}}
function setValidDate(y,m,d)
{var str="";if((y.length<4)||(parseInt(y,10)<parseInt(Year,10))||(parseInt(y,10)>parseInt(maxYear,10)))
y=Year;str+=y;if(m.length<2)
m='0'+m;else
{if(parseInt(m,10)>12)
m='12';}
str+=m;if(d.length<2)
d='0'+d;else
{var vd=findDay(y,m);if(parseInt(d,10)>vd)
d=vd;}
str+=d;if(parseInt(str)<parseInt(cd))
str=cd;return str;}
function findDay(y,m)
{var validnumber;if(m=='02')
(isLeapyear(y))?validnumber=29:validnumber=28;else if((m=='04')||(m=='06')||(m=='09')||(m=='11'))
validnumber=30;else
validnumber=31;return validnumber;}
function putDT(e)
{if(getSrc(e).nodeName.toLowerCase()!='span')
correctVal(e);viewNext();}
function viewNext()
{if(take('inext').n!=null)
take('inext').show();if(take('timeordcontainer').n!=null)
take('timeordcontainer').hide();if(take('iconfirm').n!=null)
take('iconfirm').hide();}
function IsInt(val)
{var temp=/\d/;for(var i=0;i<val.length;i++)
{if(!temp.test(val.charAt(i)))
{return false;}}
return true;}
var servername="emll.ru";var outform="SHOTFORM";var outformfull="FULLFORM";var fromaftobibl=["AUIDS","Код"];var foldername="newlib";var pathactrcp="/request";var pathcss="/newlib/newlib/css";var pathjs="/newlib/newlib/js";var pathimg="/newlib/newlib/img";var pathhtml="/newlib/newlib/html";var pathdoc="/newlib/newlib/documents";var pathrubricator="/newlib/newlib/rubricator";var dbs=[];dbs["17"]=[];dbs["17"]["type"]="BIBL";dbs["17"]["mode"]="LOCAL";dbs["17"]["alias"]="Единый каталог ЦНМБ";dbs["17"]["dbindex"]="ecnmb";dbs["17"]["outform"]="SHORTWEB";dbs["17"]["outformfull"]="FULLWEB";dbs["17"]["loadurl"]="stat";dbs["17"]["seef"]="hierarchical";dbs["17"]["labels"]=[];dbs["17"]["labels"]["AND"]=[" И ","",""];dbs["17"]["labels"]["OR"]=[" ИЛИ ","",""];dbs["17"]["labels"]["NOT"]=[" НЕ ","",""];dbs["17"]["labels"]["AUIDS"]=["Код","",""];dbs["17"]["labels"]["AH"]=["Везде","Y","N"];dbs["17"]["labels"]["RP"]=["Автор","Y","N"];dbs["17"]["labels"]["TITL"]=["Заглавие","Y","N"];dbs["17"]["labels"]["TIJ"]=["Заглавие журнала","Y","N"];dbs["17"]["labels"]["TM"]=["Тема","Y","N"];dbs["17"]["labels"]["NI"]=["ISBN/ISSN","Y","N"];dbs["17"]["labels"]["PM"]=["Публикация/Изготовление","Y","N"];dbs["17"]["labels"]["KL"]=["Классификация","Y","N"];dbs["17"]["labels"]["GC"]=["ГАСНТИ","Y","N"];dbs["17"]["labels"]["FGOS"]=["Специальность/Дисциплина","Y","Y"];dbs["17"]["labels"]["PN"]=["Имя лица","Y","Y"];dbs["17"]["labels"]["CM"]=["Организация","Y","Y"];dbs["17"]["labels"]["COD"]=["Код","Y","N"];dbs["17"]["labels"]["SC"]=["Предметная категория","Y","Y"];dbs["17"]["labels"]["MS"]=["MeSH","Y","Y"];dbs["17"]["labels"]["FG"]=["Форма, жанр и т.д.","Y","Y"];dbs["17"]["limits"]=[];dbs["17"]["limits"]["0"]=[];dbs["17"]["limits"]["0"]["name"]="0";dbs["17"]["limits"]["0"]["title"]="Год";dbs["17"]["limits"]["0"]["type"]="period";dbs["17"]["limits"]["1"]=[];dbs["17"]["limits"]["1"]["name"]="1";dbs["17"]["limits"]["1"]["title"]="Вид документа";dbs["17"]["limits"]["1"]["type"]="fixed";dbs["17"]["limits"]["1"]["content"]=[];dbs["17"]["limits"]["1"]["content"][0]=[];dbs["17"]["limits"]["1"]["content"][0]["value"]="(LRES 'ТЕКСТЫ')";dbs["17"]["limits"]["1"]["content"][0]["text"]="тексты";dbs["17"]["limits"]["1"]["content"][1]=[];dbs["17"]["limits"]["1"]["content"][1]["value"]="(LRES 'ЭЛЕКТРОННЫЕ')";dbs["17"]["limits"]["1"]["content"][1]["text"]="электронные";dbs["17"]["filters"]=[];dbs["17"]["filters"]["0"]=[];dbs["17"]["filters"]["0"]["name"]="0";dbs["17"]["filters"]["0"]["title"]="Форма ресурса";dbs["17"]["filters"]["0"]["type"]="fixed";dbs["17"]["filters"]["0"]["label"]="LFR";dbs["17"]["filters"]["0"]["content"]=[];dbs["17"]["filters"]["0"]["content"][0]=[];dbs["17"]["filters"]["0"]["content"][0]["value"]="(LFR 'ONLINE')";dbs["17"]["filters"]["0"]["content"][0]["text"]="online";dbs["17"]["filters"]["1"]=[];dbs["17"]["filters"]["1"]["name"]="1";dbs["17"]["filters"]["1"]["title"]="Вид издания";dbs["17"]["filters"]["1"]["type"]="fixed";dbs["17"]["filters"]["1"]["label"]="LPUB";dbs["17"]["filters"]["1"]["content"]=[];dbs["17"]["filters"]["1"]["content"][0]=[];dbs["17"]["filters"]["1"]["content"][0]["value"]="(LPUB 'КНИГИ')";dbs["17"]["filters"]["1"]["content"][0]["text"]="книги";dbs["17"]["filters"]["1"]["content"][1]=[];dbs["17"]["filters"]["1"]["content"][1]["value"]="(LPUB 'СТАТЬИ')";dbs["17"]["filters"]["1"]["content"][1]["text"]="статьи";dbs["17"]["filters"]["1"]["content"][2]=[];dbs["17"]["filters"]["1"]["content"][2]["value"]="(LPUB 'ПЕРИОДИКА')";dbs["17"]["filters"]["1"]["content"][2]["text"]="периодика";dbs["17"]["filters"]["2"]=[];dbs["17"]["filters"]["2"]["name"]="2";dbs["17"]["filters"]["2"]["title"]="Содержание";dbs["17"]["filters"]["2"]["type"]="fixed";dbs["17"]["filters"]["2"]["label"]="LFC";dbs["17"]["filters"]["2"]["content"]=[];dbs["17"]["filters"]["2"]["content"][0]=[];dbs["17"]["filters"]["2"]["content"][0]["value"]="(LFC 'ДИССЕРТАЦИИ/АВТОРЕФЕРАТЫ')";dbs["17"]["filters"]["2"]["content"][0]["text"]="диссертации/авторефераты";dbs["17"]["filters"]["2"]["content"][1]=[];dbs["17"]["filters"]["2"]["content"][1]["value"]="(LFC 'УЧЕБНЫЕ ИЗДАНИЯ')";dbs["17"]["filters"]["2"]["content"][1]["text"]="учебные издания";dbs["17"]["filters"]["2"]["content"][2]=[];dbs["17"]["filters"]["2"]["content"][2]["value"]="(LFC 'СПРАВОЧНЫЕ ИЗДАНИЯ')";dbs["17"]["filters"]["2"]["content"][2]["text"]="справочные издания";dbs["17"]["filters"]["3"]=[];dbs["17"]["filters"]["3"]["name"]="3";dbs["17"]["filters"]["3"]["title"]="Год";dbs["17"]["filters"]["3"]["type"]="dinamic";dbs["17"]["filters"]["3"]["label"]="PY";dbs["17"]["filters"]["4"]=[];dbs["17"]["filters"]["4"]["name"]="4";dbs["17"]["filters"]["4"]["title"]="Язык";dbs["17"]["filters"]["4"]["type"]="fixed";dbs["17"]["filters"]["4"]["label"]="AH";dbs["17"]["filters"]["4"]["content"]=[];dbs["17"]["filters"]["4"]["content"][0]=[];dbs["17"]["filters"]["4"]["content"][0]["value"]="(LLA 'РУССКИЙ')";dbs["17"]["filters"]["4"]["content"][0]["text"]="русский";dbs["17"]["filters"]["4"]["content"][1]=[];dbs["17"]["filters"]["4"]["content"][1]["value"]="(LLA 'АНГЛИЙСКИЙ')";dbs["17"]["filters"]["4"]["content"][1]["text"]="английский";dbs["17"]["filters"]["4"]["content"][2]=[];dbs["17"]["filters"]["4"]["content"][2]["value"]="(LLA 'НЕМЕЦКИЙ')";dbs["17"]["filters"]["4"]["content"][2]["text"]="немецкий";dbs["17"]["filters"]["4"]["content"][3]=[];dbs["17"]["filters"]["4"]["content"][3]["value"]="(LLA 'ФРАНЦУЗСКИЙ')";dbs["17"]["filters"]["4"]["content"][3]["text"]="французский";dbs["24"]=[];dbs["24"]["type"]="AF";dbs["24"]["mode"]="LOCAL";dbs["24"]["alias"]="Медицинские предметные рубрики (MeSH)";dbs["24"]["dbindex"]="mesh";dbs["24"]["afrubricator"]="2";dbs["24"]["labels"]=[];dbs["24"]["labels"]["AND"]=[" И ","",""];dbs["24"]["labels"]["OR"]=[" ИЛИ ","",""];dbs["24"]["labels"]["NOT"]=[" НЕ ","",""];dbs["24"]["labels"]["AUIDS"]=["Код","",""];dbs["24"]["labels"]["MS"]=["MeSH","Y","Y"];dbs["24"]["labels"]["SHM"]=["Рубрики верхнего уровня MESH","Y","Y"];dbs["6"]=[];dbs["6"]["type"]="AF";dbs["6"]["mode"]="LOCAL";dbs["6"]["alias"]="Авторитетный файл ЦНМБ";dbs["6"]["dbindex"]="muaf";dbs["6"]["afrubricator"]="1";dbs["6"]["labels"]=[];dbs["6"]["labels"]["AND"]=[" И ","",""];dbs["6"]["labels"]["OR"]=[" ИЛИ ","",""];dbs["6"]["labels"]["NOT"]=[" НЕ ","",""];dbs["6"]["labels"]["AUIDS"]=["Код","",""];dbs["6"]["labels"]["AH"]=["Все заголовки","Y","Y"];dbs["6"]["labels"]["PN"]=["Имя лица","Y","Y"];dbs["6"]["labels"]["CM"]=["Наименование организации","Y","Y"];var numdbBIBL="17";var numdbf="6";var modules={"annotation":{"directory":"af"},"letter":{"directory":"af"},"tree":{"directory":"af"},"bookrating":{"directory":"bookrating/_additional"},"bookrating.html":{"directory":"bookrating/_ratings"},"findlib":{"directory":"fundholders"},"sigla":{"directory":"fundholders"},"alllists":{"directory":"privat/list"},"list":{"directory":"privat/list"},"print_orders.xsl":{"directory":"list/xsl"},"libcard":{"directory":"privat/orders"},"order":{"directory":"privat/orders"},"personstat":{"directory":"privat/stat"},"stataddindivid":{"directory":"privat/stat"},"statdigit":{"directory":"privat/stat"},"statindivid":{"directory":"privat/stat"},"statindividadd":{"directory":"privat/stat"},"statindividaddwide":{"directory":"privat/stat"},"reg":{"directory":"privat/_additional"},"readerhistory":{"directory":"readerhistory"},"add":{"directory":"search"},"allbases":{"directory":"search"},"archiv":{"directory":"search"},"collection":{"directory":"search"},"culture":{"directory":"search"},"fulltext":{"directory":"search"},"history":{"directory":"search"},"search":{"directory":"search"},"voc":{"directory":"search"},"find":{"directory":"search/_additional"},"":{}};var pages={"about":{"directory":"about","name":"О проекте","mapping":"text","display":"yes"},"bookrating":{"directory":"bookrating","name":"Популярное","mapping":"text","display":"yes"},"contacts":{"directory":"contacts","name":"Контакты","mapping":"text","display":"yes"},"help":{"directory":"help","name":"Помощь","mapping":"text","display":"yes"},"index":{"directory":"index","name":"Главная","mapping":"image","display":"no"},"privat":{"directory":"privat","name":"Авторизация","mapping":"text","display":"yes"},"regform":{"directory":"regform","name":"Регистрация","mapping":"text","display":"yes"},"_collective":{"directory":"regform","name":"Регистрация коллективных пользователей","mapping":"text","display":"no"},"_individual":{"directory":"regform","name":"Регистрация индивидуальных пользователей","mapping":"text","display":"no"},"_promo":{"directory":"regform","name":"Регистрация с кодом","mapping":"text","display":"no"},"_change":{"directory":"privat","name":"Запрос смены пароля","mapping":"text","display":"no"},"_overcharge":{"directory":"privat","name":"Запрос смены пароля","mapping":"text","display":"no"},"sign":{"directory":"sign","name":"Подписка","mapping":"text","display":"yes"}};var isIE=(navigator.userAgent.indexOf('MSIE')!=-1)&&(!window.opera)?true:false;var curs=(document.compatMode=='CSS1Compat')?'pointer':'hand';var docEl=null;var arrwin=[];var countwin=0;var frmh=1000;var movable=false;var _x=0;var _y=0;var scalable=false;var __x,__y,__xx,__yy,__l,__t,__r,__b,__w,__h,sw,sh,cx,cy,dx,dy,xm,ym;var wraparr=new Array();var price="0";var typesearch="simple";var typework="";var skipfirst="";var voclab="";var endvoc="";var vocobj="itemsimple";var vocstart=1;var firstterm="";var indxterms="";var andor=0;var lastterm="";var vstr="";var vvstr="";var cstr="";var ustr="";var fobject=null;var menu=null;var addfilters="";var lockedfilters="";var swfterm="";var addid="";var seeid="";var flag45=false;var portion=15;var begin=1;var portioncount=0;var portionarr=[];var quant=0;var promocod="";var readerobj=null;var treeobj=null;var rez=[];var siglaid=null;var basequant="";var realdbaf="";var iddbbibl="";var editqueryflag=false;var searchlabel='';var scrollobj=null;function getSrc(e)
{if(e)
return e.target;else
return event.srcElement||docEl.event.srcElement;}
function getCode(e)
{e=(e)?e:(event||docEl.event);var code=e.keyCode;return code;}
function getEtype(e)
{e=(e)?e:(event||docEl.event);return e.type;}
function getCtrl(e)
{e=(e)?e:(event||docEl.event);var code=e.ctrlKey;return code;}
function getBody()
{if(document.documentElement)
return document.documentElement;else
return document.body;}
function getX(e)
{var doc=getBody();if(e)
return e.pageX;else
if(isIE)
return event.clientX+doc.scrollLeft;else
return event.clientX;}
function getY(e)
{var doc=getBody();if(e)
return parseInt(e.pageY);else
if(isIE)
return event.clientY+doc.scrollTop;else
return event.clientY;}
function getXY(e)
{var x=0,y=0;if(!e)e=window.event;if(e.pageX||e.pageY)
{x=e.pageX;y=e.pageY;}
else if(e.clientX||e.clientY)
{x=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)-document.documentElement.clientLeft;y=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop)-document.documentElement.clientTop;}
return{"x":x,"y":y};}
var elem_rect={x:function(elem){var b=document.body,e=document.documentElement,x=window.pageXOffset||e.scrollLeft||b.scrollLeft,c=e.clientLeft||b.clientLeft||0;return Math.round(elem.getBoundingClientRect().left+x-c);},y:function(elem){var b=document.body,e=document.documentElement,y=window.pageYOffset||e.scrollTop||b.scrollTop,c=e.clientTop||b.clientTop||0;return Math.round(elem.getBoundingClientRect().top+y-c);}}
function getAbsolutePosition(elem)
{var obj={x:0,y:0};while(elem)
{obj.x+=elem.offsetLeft;obj.y+=elem.offsetTop;elem=elem.offsetParent;}
return obj;}
function pageOffset()
{var obj={x:0,y:0};if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
obj.x+=docEl.pageXOffset||docEl.document.documentElement.scrollLeft||docEl.document.body.scrollLeft;obj.y+=docEl.pageYOffset||docEl.document.documentElement.scrollTop||docEl.document.body.scrollTop;return obj;}
function sendForm(queryArr,target,action,method,width,height)
{this.queryArr=queryArr;this.target=target||"_self";this.action=action||pathactrcp;this.method=method||"post";this.width=width||screen.availWidth;this.height=height||screen.availHeight;this.formSubmit=formSubmit;this.ajaxForm=ajaxForm;}
function formSubmit()
{var today=new Date();var seconds=today.getTime();var NameWin="n"+seconds+Math.floor(Math.random()*9999);var Scr="alwaysRaised=yes,menubar=yes,width="+this.width+",height="+this.height+",left="+parseInt(((screen.availWidth-1)-this.width)/2)+",top="+parseInt(((screen.availHeight-1)-this.height)/2)+",resizable=yes,scrollbars=no,toolbar=no,location=no,directories=no,status=no";var doc,src;if(typeof this.target=="string")
{switch(this.target)
{case"_new":var win=window.open('',NameWin);if(win!=null)
{doc=win.document;src=win.name;doc.open();doc.write('<html><head><title>send</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta http-equiv="Content-Script-Type" content="text/javascript"/><meta http-equiv="cache-control" content="no-cache"/></head><body style="background: #fff; font: bold 18px Times, serif; color: red; text-align: center;"><p>Пожалуйста, подождите...</p></body></html>');doc.close();}
else
{alert("Невозможно завершить операцию!\nВаш броузер блокирует всплывающие окна.");return;}
break;default:doc=document;src=this.target;break;}}
else
{doc=this.target.window.document;src=this.target.window.name;}
if(typework!="")
{if((typework=="authorization")||(typework.indexOf('template')!=-1))
this.queryArr.push(["_oldsean",numsean]);else
this.queryArr.push(["_numsean",numsean]);}
if(typeof _auth!="undefined")
this.queryArr.push(["_auth",_auth]);var frm=doc.createElement('form');for(var i=0;i<this.queryArr.length;i++)
{var field=doc.createElement('input');field.type="hidden";field.name=this.queryArr[i][0];field.value=this.queryArr[i][1];frm.appendChild(field);}
doc.body.appendChild(frm);frm.action=this.action;frm.method=this.method;frm.target=src;frm.submit();}
var ajaxForm={XHRobj:function()
{try
{return new XMLHttpRequest()||new window.XDomainRequest();}
catch(e){}
try
{return new ActiveXObject("Msxml2.XMLHTTP");}
catch(e){}
try
{return new ActiveXObject("Microsoft.XMLHTTP");}
catch(e){}
return null;},send:function(arr,callback,act,hdr,callerror)
{var xhr=ajaxForm.XHRobj();var pstr="";if(act==null)
act=pathactrcp;if(arr!=null)
pstr=serializeData(arr);if(xhr)
{xhr.onreadystatechange=function()
{if(xhr.readyState==4)
{if(xhr.status==200)
{if(callback!=null)
{callback(xhr);}
xhr=null;}
else
{if(callerror!=null)
{callerror(xhr);}}}}
if(pstr!="")
{xhr.open("post",act,true);xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");xhr.send(pstr);}
else
{xhr.open("get",act,true);xhr.send(null);}}}};function serializeData(arr)
{var qstr="";for(var i=0;i<arr.length;i++)
{qstr+=arr[i][0]+"="+arr[i][1];if(i<arr.length-1)
qstr+="&";}
return qstr;}
function prepareQueryString(arr,ndb)
{if(typeof ndb!="undefined")
arr=addGlobalsToQuery(arr,ndb);else
arr=addGlobalsToQuery(arr);var qstr="";for(var i=0;i<arr.length;i++)
{qstr+="<"+arr[i][0]+">"+arr[i][1];if(i<arr.length-1)
qstr+="[separator]";}
return qstr;}
function addGlobalsToQuery(arr,ndb)
{var db=numdbBIBL;if(typeof numDB!="undefined")
{db=numDB;}
else
{if(typeof _localiddb!="undefined")
db=_iddb;}
if(typeof ndb!="undefined")
{db=ndb;}
if((typeof dbs[db]!="undefined")&&(typeof dbs[db]["brokerid"]!="undefined"))
{arr.push(["_brokerid",dbs[db]["brokerid"]]);arr.push(["$brokerid",db+":"+dbs[db]["brokerid"]]);}
if((typeof dbs[db]!="undefined")&&(typeof dbs[db]["fundlogin"]!="undefined"))
{arr.push(["userId",dbs[db]["fundlogin"]]);}
else
{arr.push(["userId",identif]);}
if(typework!="")
{if(typework=="search")
{if((typesearch=="simple")||(typesearch=="expand")||(typesearch=="professional")||(typesearch=="fulltext"))
{var larr=[];var lstr="";if((typeof iddb!="undefined")&&(typeof iddb[db]!="undefined"))
{if(typeof iddb[db][5]!="undefined")
{larr=iddb[db][5];for(var i=0;i<larr.length;i++)
{if((larr[i][0]=="043")||(larr[i][0]=="044")||(larr[i][0]=="058")||(larr[i][0]=="059"))
lstr+=larr[i][0]+'[ID]'+larr[i][1]+'[END]';}}}
if(lstr!="")
arr.push(["$linkstring",lstr]);}
if(lockedfilters!="")
arr.push(["$lockedfilters",lockedfilters]);if(swfterm!="")
arr.push(["$swfterm",swfterm]);}
if(typeof _localiddb!="undefined")
{arr.push(["$localiddb",_localiddb]);arr.push(["_iddb",_iddb]);}
else
{if(typework=="searchallbases")
arr.push(["_iddb",numdbBIBL]);else
arr.push(["_iddb",db]);}
if(typeof _skin!="undefined")
arr.push(["$skin",_skin]);if(typeof _ltitle!="undefined")
arr.push(["$ltitle",replaceSymb(_ltitle)]);if(typeof _lind!="undefined")
arr.push(["$lind",replaceSymb(_lind)]);if(typeof _laddress!="undefined")
arr.push(["$laddress",replaceSymb(_laddress)]);if(typeof _sigla!="undefined")
arr.push(["$sigla",_sigla]);if(typeof _site!="undefined")
arr.push(["$site",_site]);if(typeof _elcat!="undefined")
arr.push(["$elcat",_elcat]);if(addfilters!="")
{addfilters=addfilters.replace(/\"/g,'\\\"');addfilters=prepareStr(addfilters);arr.push(["$addfilters",addfilters]);}
arr.push(["$typework",typework]);if(basequant!="")
arr.push(["$basequant",basequant]);}
if(flag45)
arr.push(["$flag45","yes"]);return arr;}
function callToRCP(qArr,trg,pathactrcp,method,w,h)
{var qFrm=new sendForm(qArr,trg,pathactrcp,method,w,h);qFrm.formSubmit();qFrm=null;}
function ajaxToRCP(qArr,collback,act,hdr,collerror)
{var qFrm=new sendForm(qArr,collback,act,hdr,collerror);qFrm.ajaxForm.send(qArr,collback,act,hdr,collerror);qFrm=null;}
function _take(arg)
{this.d=document;if(docEl!=null)
this.d=docEl.document;if(typeof arg=='string')
this.n=this.d.getElementById(arg);else
this.n=arg;}
_take.prototype={text:function(arg)
{var chld=new _take(this.d.createTextNode(arg));this.n.appendChild(chld.n);try
{return chld;}
finally
{chld=null;}},create:function(tag,arg)
{var chld=new _take(this.d.createElement(tag));for(var key in arg)
{var value=arg[key];if(key=='textNode')
chld.n.appendChild(this.d.createTextNode(value));else if(key=='className')
eval('chld.n.'+key+'=value');else if(key.substring(0,2)=='on')
eval('chld.n.'+key+'='+value);else if(key=='style')
{for(prop in value)
eval('chld.n.'+key+'.'+prop+'=value[prop]');}
else
{chld.n.setAttribute(key,value);}}
this.n.appendChild(chld.n);try
{return chld;}
finally
{chld=null;}},createNS:function(NS,tag,arg)
{var chld=new _take(this.d.createElementNS(NS,tag));for(var key in arg)
{var value=arg[key];if(key.substring(0,2)=='on')
eval('chld.n.'+key+'='+value);else if(key=='style')
{for(prop in value)
eval('chld.n.'+key+'.'+prop+'=value[prop]');}
else
{var attr=this.d.createAttribute(key);chld.n.setAttributeNS(null,key,value);}}
this.n.appendChild(chld.n);try
{return chld;}
finally
{chld=null;}},tags:function(tag)
{if(this.n!=null)
return this.n.getElementsByTagName(tag.toLowerCase());else
return;},getsign:function(tag,sign)
{if(this.n!=null)
{var arr=new Array();var parr=this.n.getElementsByTagName(tag.toLowerCase());for(var i=0;i<parr.length;i++)
{for(var key in sign)
{if(sign[key]=='')
{if(eval("parr[i]."+key))
arr.push(parr[i]);}
else
{if(eval("parr[i]."+key)==sign[key])
arr.push(parr[i]);}}}
try
{return arr;}
finally
{arr=null;}}},getx:function()
{if(this.n!=null)
return this.n.offsetLeft;else
return;},gety:function()
{if(this.n!=null)
return this.n.offsetTop;else
return;},getw:function()
{if(this.n!=null)
return this.n.offsetWidth;else
return;},geth:function()
{if(this.n!=null)
return this.n.offsetHeight;else
return;},getb:function()
{if(this.n!=null)
return this.n.offsetHeight+this.n.offsetTop;else
return;},getr:function()
{if(this.n!=null)
return this.n.offsetWidth+this.n.offsetLeft;else
return;},setx:function(x)
{if(this.n!=null)
return this.n.style.left=x+"px";else
return;},sety:function(y)
{if(this.n!=null)
return this.n.style.top=y+"px";else
return;},setw:function(w)
{if(this.n!=null)
return this.n.style.width=w+"px";else
return;},seth:function(h)
{if(this.n!=null)
return this.n.style.height=h+"px";else
return;},transparency:function(arg)
{if(this.n!=null)
{var support="opacity"in this.n.style;if(support)
return(arg!=10)?this.n.style.opacity='0.'+arg:this.n.style.opacity='10';else
return(arg!=10)?this.n.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity='+arg+'0)':this.n.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity=100)';}
else
return;},fade:function(arg)
{if(this.n!=null)
{var support="opacity"in this.n.style;if(support)
return this.n.style.opacity=arg/100;else
return this.n.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity='+arg+')';}
else
return;},visualise:function()
{if(this.n!=null)
return this.n.style.visibility="visible";else
return;},conceal:function()
{if(this.n!=null)
return this.n.style.visibility="hidden";else
return;},show:function()
{if(this.n!=null)
return this.n.style.display="";else
return;},hide:function()
{if(this.n!=null)
return this.n.style.display="none";else
return;},addevent:function(e,t,f)
{if(this.d.addEventListener)
this.d.addEventListener(t,f,false);else
eval('this.d'+'.on'+t+'='+'f');},stopevent:function(event)
{if(this.d.stopPropagation)
this.d.stopPropagation();else
this.d.cancelBubble=true;},delevent:function(t,f)
{if(this.d.attachEvent)
this.d.detachEvent('on'+t,f,true);else
this.d.removeEventListener(t,f,false);}};function take(arg)
{return new _take(arg);}
var delta_x=0;var delta_y=0;var delta_w=0;var delta_h=0;var w_block=0;var h_block=0;function startMove(e)
{movable=true;var o;var c;if(isIE)
{if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
e=docEl.event||this.ownerDocument.parentWindow.event;c=e.srcElement;o=e.srcElement.parentNode.parentNode;x=e.clientX;y=e.clientY;}
else
{c=e.target;o=e.target.parentNode.parentNode;x=e.pageX;y=e.pageY;}
if(c.className=='pheader')
{delta_x=o.offsetLeft-x;delta_y=o.offsetTop-y;o.onmousemove=moveThis;}}
function stopMove(e)
{movable=false;document.onmousemove=null;e=e||window.event;e.stopPropagation?e.stopPropagation():(e.cancelBubble=true);}
function moveThis(e)
{if(!movable)
return;var o;var c;if(isIE)
{if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
e=docEl.event||this.ownerDocument.parentWindow.event;c=e.srcElement;o=e.srcElement.parentNode.parentNode;x=e.clientX;y=e.clientY;}
else
{c=e.target;o=e.target.parentNode.parentNode;x=e.pageX;y=e.pageY;}
if(docEl.getSelection)
docEl.getSelection().removeAllRanges();else
if(docEl.document.selection&&docEl.document.selection.clear)
docEl.document.selection.clear();if(c.className=='pheader')
{o.style.top=delta_y+y+"px";o.style.left=delta_x+x+"px";}}
function startScale(e)
{scalable=true;var o;if(isIE)
{if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
e=docEl.event||this.ownerDocument.parentWindow.event;o=e.srcElement;x=e.clientX;y=e.clientY;}
else
{o=e.target;x=e.pageX;y=e.pageY;}
if(o.className.indexOf('dialog')!=-1)
{var obj=take(o);__l=obj.getx();__t=obj.gety();__x=x+pageOffset().x-obj.getx();__y=y+pageOffset().y-obj.gety();__w=obj.getw();__h=obj.geth();__r=obj.getr();__b=obj.getb();__xx=x+pageOffset().x;__yy=y+pageOffset().y;obj=null;o.onmousemove=toScale;}}
function stopScale(e)
{scalable=false;document.onmousemove=null;e=e||window.event;e.stopPropagation?e.stopPropagation():(e.cancelBubble=true);}
function toScale(e)
{if(!scalable)
return;var o;if(isIE)
{if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
e=docEl.event||this.ownerDocument.parentWindow.event;o=e.srcElement;x=e.clientX;y=e.clientY;}
else
{o=e.target;x=e.pageX;y=e.pageY;}
if(docEl.getSelection)
docEl.getSelection().removeAllRanges();else
if(docEl.document.selection&&docEl.document.selection.clear)
docEl.document.selection.clear();if(o.className.indexOf('dialog')!=-1)
{var obj=take(o);var h=(isIE)?docEl.document.body.clientHeight||docEl.document.documentElement.clientHeight:window.innerHeight;var w=(isIE)?docEl.document.body.clientWidth||docEl.document.documentElement.clientWidth:docEl.innerWidth;var oX=parseInt(o.style.left);var oY=parseInt(o.style.top);var oW=o.offsetWidth;var oH=o.offsetHeight;cx=e.clientX+pageOffset().x;cy=e.clientY+pageOffset().y;dx=cx-__x;dy=cy-__y;xm=__r-oW/2;ym=__b-oH/2;var minw=100;var minh=100;if((cx==xm)||(cy==ym))
{obj=null;return;}
if(cx<xm)
{sw=__r-dx;}
if(cx>xm)
{sw=__w+(cx-__xx);dx=oX;}
if(cy>ym)
{sh=__h+(cy-__yy);dy=__t;}
if(cy<ym)
{sh=__b-dy;}
if(obj.gety()<pageOffset().y)
{dy=pageOffset().y;sh=__b-dy;}
if(obj.getx()<pageOffset().x)
{dx=pageOffset().x;sw=__r-dx;}
if((obj.getr()-pageOffset().x)>w)
sw=w-__l-5;if((obj.getb()-pageOffset().y)>h)
sh=h-__t-5;if((sw>minw)&&(sh>minh))
{obj.setx(dx);obj.sety(dy);obj.setw(sw);obj.seth(sh);var fobj=take(o.firstChild);var lobj=take(o.firstChild.lastChild);fobj.setw(sw-10);fobj.seth(sh-10);lobj.setw(sw-10);lobj.seth(sh-35);__r=dx+sw;__b=dy+sh;__l=dx;__t=dy;__w=sw;__h=sh;__xx=cx;__yy=cy;fobj=null;lobj=null;obj=null;}}}
function stopEffects(e)
{movable=false;scalable=false;document.onmousemove=null;e=e||window.event;e.stopPropagation?e.stopPropagation():(e.cancelBubble=true);}
function unWrapLayer(e)
{stopEffects(e);var o;if(isIE)
{if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
e=docEl.event||this.ownerDocument.parentWindow.event;o=e.srcElement;}
else
o=e.target;o.className='wrap';o.onmousedown=wrapLayer;o.title='Развернуть';var doc=o.parentNode.parentNode.parentNode;var tdoc=take(doc);var ind=doc.id;hideBgDiv(ind+'bgdiv');if(typeof(wraparr[ind])=='undefined')
wraparr[ind]=new Array();if(wraparr[ind].length!=0)
wraparr[ind].length=0;wraparr[ind]=([tdoc.getw(),tdoc.geth()]);tdoc.seth(40);var fobj=take(doc.firstChild);var lobj=take(doc.lastChild);var llobj=take(doc.lastChild.lastChild);fobj.seth(40);lobj.seth(32);llobj.hide();tdoc.setx(0);var h=(isIE)?docEl.document.body.clientHeight||docEl.document.documentElement.clientHeight:docEl.innerHeight;tdoc.sety(h-40);doc.style.overflow='hidden';tdoc=fobj=lobj=llobj=null;}
function wrapLayer(e)
{stopEffects(e);var o;if(isIE)
{if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
e=docEl.event||this.ownerDocument.parentWindow.event;o=e.srcElement;}
else
o=e.target;o.className='unwrap';o.onmousedown=unWrapLayer;o.title='Свернуть';var doc=o.parentNode.parentNode.parentNode;var tdoc=take(doc);var ind=doc.id;showBgDiv(ind+'bgdiv');var y=(isIE)?((docEl.document.body.clientHeight||docEl.document.documentElement.clientHeight)-wraparr[ind][1])/2:(docEl.innerHeight-wraparr[ind][1])/2;var x=(isIE)?((docEl.document.body.clientWidth||docEl.document.documentElement.clientWidth)-wraparr[ind][0])/2:(docEl.innerWidth-wraparr[ind][0])/2;tdoc.setx(x);tdoc.sety(y);var fobj=take(doc.firstChild);var lobj=take(doc.lastChild);var llobj=take(doc.lastChild.lastChild);fobj.seth(wraparr[ind][1]);lobj.seth(wraparr[ind][1]-10);llobj.show();tdoc.seth(wraparr[ind][1]);tdoc.setw(wraparr[ind][0]);var i=0;for(var key in wraparr)
{if(key==ind)
{wraparr.splice(i,1);break;}
i++;}
tdoc=fobj=lobj=llobj=null;}
function findArrIndex(k,arr)
{var l=arr.length;for(var i=0;i<l;i++)
{if(arr[i][1].id==k)
{return i;}}
return-1;}
function delLayerWin()
{try
{var i=arrwin.length-1;var par=arrwin[i][0];var div=arrwin[i][1];var arg=arrwin[i][2];arrwin.splice(i,1);countwin--;deleteBgDiv(div);par.removeChild(div);var body=(docEl!=null)?docEl.document.body:document.body;if(countwin<1)
body.style.overflow='';var calendar=take(body).getsign('div',{className:'calendar'});var len=calendar.length;if(len>0)
{for(var i=0;i<len;i++)
{body.removeChild(calendar[i]);}}
if(arg!="")
eval(arg);if(countwin<1)
{if(scrollobj!=null)
{scrollobj.scrollIntoView();}
scrollobj=null;}}
catch(e){};}
function createBgDiv(ind,count)
{if(docEl==null)
{if(this.nodeName)
docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;else
docEl=this;}
var container=docEl.document.body;var tcontainer=take(container);var bgdiv=tcontainer.create('div',{id:ind,className:'bgdiv',style:{position:'absolute',top:'0px',left:'0px',width:container.scrollWidth+'px',height:container.scrollHeight+'px',zIndex:99999+count}});bgdiv.transparency(5);if(isIE)
{var div=take(ind);if(div.n.previousSibling)
{if((div.n.previousSibling.previousSibling)&&(div.n.previousSibling.previousSibling.id.indexOf('win')!=-1))
{var par=div.n.previousSibling.previousSibling;var tpar=take(par);tpar.hide();tpar=null;}}
div=null;}
return bgdiv;}
function deleteBgDiv(ind)
{if(typeof ind!="string")
ind=ind.previousSibling;var div=take(ind);if(div.n!=null)
{if(isIE)
{if((div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling)&&(div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling.id.indexOf('win')!=-1))
{var par=div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling;var tpar=take(par);tpar.show();tpar=null;}}
div.n.parentNode.removeChild(div.n);div=null;}
return;}
function hideBgDiv(ind)
{var div=take(ind);if(div.n!=null)
{div.hide();if(isIE)
{if(div.n.parentNode)
{if((div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling)&&(div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling.id.indexOf('win')!=-1))
{var par=div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling;var tpar=take(par);tpar.show();tpar=null;}}}}
div=null;return;}
function showBgDiv(ind)
{var div=take(ind);if(div.n!=null)
{div.show();if(isIE)
{if(div.n.parentNode)
{if((div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling)&&(div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling.id.indexOf('win')!=-1))
{var par=div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling;var tpar=take(par);tpar.hide();tpar=null;}}}}
div=null;return;}
function showLayerWin(ind,arg)
{var msg=layopen=layclose=divframe=callback=disabled="";var t=w=h=len=0;var src="about:blank";var callbackname="Выполнить";var cls="dialog";var browsed="";var forlinks="";var closename="Закрыть";var multipart="application/x-www-form-urlencoded";var dispatcher="closeThisWin";var closeel=null;docEl=self;if(arg!=null)
{for(var key in arg)
{var value=arg[key];if(key=='target')
docEl=eval(value);if(key=='cls')
cls=value;if(key=='browsed')
browsed=value;if(key=='forlinks')
forlinks=value;if(key=='message')
msg=value;if(key=='src')
src=value;else if(key=='width')
w=value;else if(key=='height')
h=value;else if(key=='layopen')
layopen=value;else if(key=='layclose')
layclose=value;else if(key=='divframe')
divframe=value;else if(key=='callback')
callback=value;else if(key=='callbackname')
callbackname=value;else if(key=='closename')
closename=value;else if(key=='multipart')
multipart=value;else if(key=='dispatcher')
dispatcher=value;else if(key=='disabled')
disabled=value;}
if(layopen!="")
eval(layopen);}
if(browsed=="")
{docEl.scrollTo(0,0);docEl.document.body.style.overflow='hidden';}
var ww=document.compatMode=='CSS1Compat'&&!window.opera?docEl.document.documentElement.clientWidth:docEl.document.body.clientWidth;var dl=document.compatMode=='CSS1Compat'&&!window.opera?docEl.document.documentElement.scrollLeft:docEl.document.body.scrollLeft;var dt=document.compatMode=='CSS1Compat'&&!window.opera?docEl.document.documentElement.scrollTop:docEl.document.body.scrollTop;var hw=document.compatMode=='CSS1Compat'&&!window.opera?docEl.document.documentElement.clientHeight:docEl.document.body.clientHeight;var container=(docEl!=null)?docEl.document.body:document.body;var tcontainer=take(container);if(browsed=="")
{if(w=="")
w=ww-20;else
{if(w.indexOf('%')!=-1)
w=ww/100*(w.substring(0,w.length-1));}
if(h=="")
h=hw-20;else
{if(h.indexOf('%')!=-1)
h=hw/100*(h.substring(0,h.length-1));}
len=(ww-w)/2+dl;t=(hw-h)/2+dt;}
else
{w=ww-2;h=hw-2;len=10+dl;t=1+dt;}
if(forlinks!="")
{w=w-100;len=len+50;}
var inner=null;var bgdiv=null;var div=null;if((cls=='dialog')||(cls=='dialog2'))
{if(browsed!="")
{if(navigator.userAgent.toLowerCase().indexOf('chrome')!=-1)
{w=screen.availWidth-10;h=screen.availHeight-60;}
div=tcontainer.create('div',{className:'dialog3',style:{background:'#fff',width:w+'px',height:(h-30)+'px',zIndex:99999+countwin+1,overflow:'hidden',margin:'0px',padding:'0px'},id:ind+''+countwin});inner=div.create('div',{style:{border:'none',margin:'0px',padding:'0px',background:'#fff',width:w+'px',height:(h-30)+'px',overflow:'hidden',cursor:'default',zIndex:99999+countwin+2}});closeel=1;}
else
{bgdiv=createBgDiv(ind+''+countwin+'bgdiv',countwin);div=tcontainer.create('div',{className:cls,style:{width:w+'px',height:h+'px',zIndex:99999+countwin+1,overflow:'hidden',margin:'0px',padding:'0px',cursor:'se-resize'},id:ind+''+countwin,onmousedown:'startScale',onmouseup:'stopScale',onmouseout:'stopScale',onmouseover:'stopScale'});var inner=div.create('div',{style:{border:'none',margin:'5px',padding:'0px',background:'#fff',width:(w-10)+'px',height:(h-10)+'px',overflow:'hidden',cursor:'default',zIndex:99999+countwin+2}});var p=inner.create('p',{textNode:msg,className:'pheader',style:{textAlign:'center',zIndex:99999+countwin+3},onmousedown:'startMove',onmouseup:'stopMove',onmouseout:'stopMove',onmouseover:'stopMove'});p.create('span',{textNode:'X',title:'Закрыть',className:'del',onmousedown:dispatcher});p.create('span',{textNode:'_',title:'Свернуть',className:'unwrap',onmousedown:unWrapLayer});}
if(divframe!="")
{var theh=(browsed!="")?(h-30):(h-35);var thew=(browsed!="")?w:(w-10);var ifr=null;if(forlinks=="")
{ifr=inner.create('iframe',{name:ind+'frame',id:ind+'frame',style:{width:thew+'px',height:theh+'px',zIndex:99999+countwin+4},border:'0',frameBorder:'0',marginWidth:'0',marginHeight:'0',scrolling:'no',src:src});}
else
{ifr=inner.create('iframe',{name:ind+'frame',id:ind+'frame',style:{width:(w-10)+'px',height:(h-125)+'px',zIndex:99999+countwin+4},frameborder:'0',marginwidth:'0',marginheight:'0',scrolling:'no',src:src});var pin=inner.create('p',{style:{textAlign:'center',marginTop:'10px'}});pin.create('input',{className:'button2',id:'closebut',value:closename,onmousedown:dispatcher,type:'button'});pin=null;}
ifr=null;}
else
{var frm=null;frm=inner.create('form',{id:ind+'form',enctype:multipart,onsubmit:'function(){return false;}',className:'winform',style:{background:'#fff',cursor:'default',margin:'0px',padding:'0px',overflow:'auto',width:'100%',height:(h-100)+'px'}});var lpc=frm.create('div',{style:{font:'normal 10pt/24pt Arial',padding:'10px 0 10px 50px'},textNode:'Пожалуйста, подождите ...'});lpc.n.innerHTML+='<div class="progress small"><div></div></div>';var pin=null;if(forlinks=="")
{pin=inner.create('p',{style:{textAlign:'center'}});if(callback!="")
{if(disabled!="")
pin.create('input',{className:'button',id:'callbut',value:callbackname,onkeyup:callback,onmousedown:callback,type:'button',disabled:'true'});else
pin.create('input',{className:'button',id:'callbut',value:callbackname,onkeyup:callback,onmousedown:callback,type:'button'});}
pin.create('input',{className:'button2',id:'closebut',value:closename,onmousedown:dispatcher,type:'button'});}
frm=pin=null;}}
else
{var div=tcontainer.create('div',{className:cls,style:{zIndex:99999+countwin+1,margin:'0px',padding:'0px'},id:ind+''+countwin});var frm=div.create('form',{id:ind+'form'});if(cls=='loader')
{var lpc=frm.create('div',{style:{font:'normal 10pt/24pt Arial',padding:'10px 0 10px 50px'},textNode:'Пожалуйста, подождите ...'});lpc.n.innerHTML+='<div class="progress small"><div></div></div>';}
else
{var lpc=frm.create('div',{style:{width:'100%',height:'100%'}});lpc.n.innerHTML+='<div class="progress"><div></div></div>';}}
if(closeel==null)
div.addevent('keyup',eval(dispatcher));arrwin[countwin]=[div.n.parentNode,div.n,layclose];countwin++;frmh=container.clientHeight||window.innerHeight;if(browsed=="")
{container.style.overflow="hidden";}
div.setx(len);div.sety(t);tcontainer=bgdiv=div=inner=p=null;return;}
function closeThisWin(event)
{stopEffects(event);var etype=getEtype(event).toLowerCase();if(etype=='keyup')
{var Key=getCode(event);if(Key==27)
{delLayerWin();return false;}
else
return;}
else
{delLayerWin();return false;}}
function replaceSlash(val)
{val=val.replace(/\\/g,'\\\\');return val;}
function encodeVal(s)
{var encodeval=encodeURIComponent(s);encodeval=encodeval.replace(/~/g,'%7E');encodeval=encodeval.replace(/!/g,'%21');encodeval=encodeval.replace(/\(/g,'%28');encodeval=encodeval.replace(/\)/g,'%29');encodeval=encodeval.replace(/'/g,'%27');encodeval=encodeval.replace(/\%20/g,'+');return encodeval;}
function brackets(val)
{val=val.replace(/\(/g,'\\\(');val=val.replace(/\)/g,'\\\)');return val;}
function convertbrackets(val)
{val=val.replace(/\(/g,'[bracket]');val=val.replace(/\)/g,'[/bracket]');val=val.replace(/\'/g,'[apos]');val=val.replace(/\"/g,'[quot]');return val;}
function prepareTerm1(val)
{val=val.replace(/\[apos\]/g,"'");val=val.replace(/\[\/apos\]/g,"'");val=val.replace(/\[quot\]/g,'"');val=val.replace(/\[bracket\]/g,"");val=val.replace(/\[\/bracket\]/g,"");return val;}
function prepareTerm(val)
{val=val.replace(/\[apos\]/g,"'");val=val.replace(/\[\/apos\]/g,"'");val=val.replace(/\[quot\]/g,'"');val=val.replace(/\&amp;/g,'&');val=val.replace(/\[bracket\]/g,"(");val=val.replace(/\[\/bracket\]/g,")");return val;}
function prepareTerm2(val)
{val=val.replace(/\(/g,'');val=val.replace(/\)/g,'');val=val.replace(/\,/g,'');val=val.replace(/\[/g,'');val=val.replace(/\]/g,'');val=val.replace(/&amp;/g,'&');return val;}
function prepareShowstring(s)
{if(s.indexOf('[bracket]')!=-1)
{var lab=s.substring(s.indexOf('[bracket]')+9,s.indexOf(' '));var ndb=numDB;if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
ndb=_iddb;if(typeof dbs[ndb]!="undefined")
{if(typeof dbs[ndb]["labels"][lab]!="undefined")
{s=s.replace(new RegExp(lab,'i'),dbs[ndb]["labels"][lab][0]);}}}
s=s.replace(/ NOT /g,' НЕ ');s=s.replace(/ AND /g,' И ');s=s.replace(/ OR /g,' ИЛИ ');s=s.replace(/\[apos\]/g,'');s=s.replace(/\[\/apos\]/g,'');s=s.replace(/\[bracket\]/g,'');s=s.replace(/\[\/bracket\]/g,'');s=s.replace(/\&quot\;/g,'');s=s.replace(/\"/g,'');s=s.replace(/\'/g,'');s=s.replace(/\\/g,'');s=s.replace(/\(/g,'');s=s.replace(/\)/g,'');return s;}
function prepareStr(s)
{var tmp=/\\{1,}/g;if(tmp.test(s))
s=s.replace(tmp,'\\');return s;}
function replaceSymb1(val)
{val=val.replace(/\&/g,'[amp]');return val;}
function replaceS(val)
{val=val.replace(/\\/g,'\\\\');val=val.replace(/&quot;/g,'"');val=val.replace(/&apos;/g,"'");val=val.replace(/&#034;/g,'"');val=val.replace(/&#039;/g,"'");return val;}
function replaceSymb(val)
{val=val.replace(/\\/g,'\\\\');val=val.replace(/\"/g,'\\\"');val=val.replace(/\'/g,"\\\'");return val;}
function replaceSymb2(val)
{val=val.replace(/\\/g,'\\\\');val=val.replace(/\"/g,'\\\"');return val;}
function replaceSymb3(val)
{val=val.replace(/\'/g,'');val=val.replace(/\"/g,'');return val;}
function replaceSymb4(val)
{val=val.replace(/\'/g,'&apos;');val=val.replace(/\"/g,'&quot;');return val;}
function replaceMail(val)
{val=val.replace(/\\/g,'\\\\');val=val.replace(/\"/g,'\\\"');val=val.replace(/\'/g,"\\\'");val=val.replace(/\@/g,'[at]');val=val.replace(/\&/g,'[amp]');return val;}
function trimBrackets(val)
{var tmp=/(^\s*\[\/*bracket\]\s*)|(\s*\[\/*bracket\]\s*$)/;while(tmp.test(val))
{val=val.replace(tmp,'');}
if((val!='OR')&&(val!='AND')&&(val!='NOT'))
val=val+'|';return val;}
function Trim2(val)
{val=val.replace(/[\<|\>|\"|\*|\'|\%|\:|\.|\,|\-|\_|\;|\(|\)|\&|\/]/g,'');return val;}
function trimSpaces(val)
{val=val.replace(/^\s*/g,'');val=val.replace(/\s*$/g,'');return val;}
function Trim1(val)
{val=val.replace(/\.* *\, *`\-*/g,'');val=val.replace(/\.* *\, *\-*/g,'');val=val.replace(/\.* *\, *\-*/g,'');val=val.replace(/\. *\-*/g,'');val=val.replace(/^\. */g,'');return val;}
function Trim()
{var val=new String(this);val=val.replace(/^\s*/g,'');val=val.replace(/\s*$/g,'');return val;}
String.prototype.Trim=Trim;function unique(u)
{var result=[],i=0,j=0,length=u.length;while(i<length)
{var I=u[i++][0],k=j;while(k--&&result[k][0]!==I);if(k<0)result[j++]=[I,u[i-1][1]];}
return result;}
function getcNode(rNode)
{var cNode=null;if(rNode.hasChildNodes())
{var children=rNode.childNodes;for(var j=0;j<children.length;j++)
{if(children[j].nodeType==1)
{cNode=children[j];break;}}}
return cNode;}
function getcNodeByName(rNode,name)
{var cNode=null;if(rNode.hasChildNodes())
{var children=rNode.childNodes;for(var j=0;j<children.length;j++)
{if(children[j].nodeType==1)
{if(children[j].nodeName.toLowerCase()==name)
{cNode=children[j];break;}}}}
return cNode;}
function printErrAjax(ind,root)
{var arg={'message':'ОШИБКА','target':self,'width':'590','height':'450'};showLayerWin(ind,arg);var div=take(ind+'form');div.n.innerHTML="";div.create('div',{id:'type11',textNode:'ОШИБКА'});var mess=div.create('div',{id:'message11'});var act=div.create('div',{id:'action11'});if(root.hasChildNodes())
{var children=root.childNodes;for(var j=0;j<children.length;j++)
{if(children[j].nodeType==1)
{if(children[j].nodeName=='message')
{var kids=children[j].childNodes;for(var i=0;i<kids.length;i++)
{if((kids[i].nodeType==1)&&(kids[i].nodeName=='entry'))
{var text=kids[i].text||kids[i].textContent;mess.create('p',{textNode:text});}}}
if(children[j].nodeName=='action')
{var kids=children[j].childNodes;for(var i=0;i<kids.length;i++)
{if((kids[i].nodeType==1)&&(kids[i].nodeName=='entry'))
{var text=kids[i].text||kids[i].textContent;act.create('p',{textNode:text});}}}
if(children[j].nodeName=='reason')
{var kids=children[j].childNodes;for(var i=0;i<kids.length;i++)
{if((kids[i].nodeType==1)&&(kids[i].nodeName=='message'))
{var kinds=kids[i].childNodes;for(var z=0;z<kinds.length;z++)
{if((kinds[z].nodeType==1)&&(kinds[z].nodeName=='entry'))
{var text=kinds[z].text||kinds[z].textContent;mess.create('p',{textNode:text});}}}}}}}}
else
{mess.create('p',{textNode:'Неизвестная ошибка выполнения.'});act.create('p',{textNode:'Обратитесь к администратору системы'});}
div=mess=act=null;}
function WriteError(t,h)
{if(typeof t!="object")
{t={};t._message_0="Указанный пользователь в системе не зарегистрирован.";t._action_1="Введите правильные данные";}
else
{if(typeof t._action_1=="undefined")
t._action_1="Введите правильные данные";}
var arg={'cls':'dialog2','message':'ОШИБКА','target':self,'width':'500','height':'400'};if(typeof h=="string")
{if(h=='index')
{arg["dispatcher"]="function c(){goToLocation('index');}";}
else
{arg["dispatcher"]='historyBack';}}
showLayerWin('errorwin',arg);var div=take('errorwinform');div.n.innerHTML="";div.create('p',{textNode:t._message_0});div.create('p',{textNode:t._action_1});}
function historyBack()
{history.go(-1);}
function disPlay(o)
{if(o.parentNode.nextSibling!=null)
{var obj=o.parentNode.nextSibling;if(obj.style.display!="none")
{obj.style.display="none";o.parentNode.className="folder";o.title="Развернуть";}
else
{obj.style.display="";o.parentNode.className="folder_";o.title="Свернуть";}}}
function showHide2(o,ind)
{var par=o.parentNode;var next=par.nextSibling;var cls=o.className;if(par.className=='tabs')
{var parr=take(par).tags('span');var narr=take(next).getsign('div',{className:'adddiv'});for(var i=0;i<parr.length;i++)
{parr[i].className='add1';}
for(var i=0;i<narr.length;i++)
{narr[i].style.display='none';}}
if(cls=='add1')
{o.className='add2 border';take(ind).n.style.display='';}
else
{o.className='add1';take(ind).n.style.display='none';}}
function showHide1(o)
{var obj=o.nextSibling;if(obj!=null)
{obj.style.display=(obj.style.display=="none")?"":"none";o.title=(o.title=="Развернуть")?"Свернуть":"Развернуть";o.className=(o.className.indexOf('_')!=-1)?o.className.substring(0,o.className.indexOf('_')):o.className+'_';}}
function showHide(o)
{if(o.nextSibling!=null)
{var obj=o.nextSibling;if(obj.style.display!="none")
{obj.style.display="none";o.className="add1";o.title="Развернуть";}
else
{obj.style.display="";o.className="add2";o.title="Свернуть";}}}
function colorize(o)
{if(o.className=="colorized")
o.className="decolorize";else
o.className="colorized";searchWithRubricator();}
function showHideM(o,g)
{var obj=take(o);if(obj.n.className.indexOf('_')!=-1)
{obj.n.className=obj.n.className.substring(0,obj.n.className.indexOf('_'));}
else
{obj.n.className=obj.n.className+'_';}
if(typeof g!="undefined")
{var obj1=take(g);if(obj1.n.className.indexOf('_')!=-1)
{obj1.n.className=obj1.n.className.substring(0,obj1.n.className.indexOf('_'));}
else
{obj1.n.className=obj1.n.className+'_';}}}
function chooseBase(o,ind)
{if(typeof o=="string")
{if((typesearch=="authority")&&(typeof prefind!="undefined"))
o=numdbf;if(typework=="searchallbases")
o='all';if(biblcounter>1)
{if(typeof dbs[o]=="undefined")
o=numDB=numdbBIBL;take('i'+dbs[o]["dbindex"]).n.checked=true;}
switchSearch(typesearch);}
else
{if(o.nodeName.toLowerCase()=='label')
{numDB=o.previousSibling.value;if(numDB=='all')
typework="searchallbases";else
typework="search";switchSearch(o.parentNode.className);}
else
{numDB=o.nextSibling.className.substring(1);if(numDB=='all')
typework="searchallbases";else
typework="search";if((ind!="")&&(ind=="ifundholders"))
switchSearch('fundholders');else
{if(dbs[numDB].type=="AF")
switchSearch('authority');else
switchSearch('simple');}}
if((take('searchhead').n!=null)||(take('vochead').n!=null))
lockSrezults();}}
function initd()
{if(typeof error!="undefined")
WriteError(error,'back');else
{scrollFloat.init(document.getElementById('searchdiv'))
if(take('editq').n!=null)
{if(take('expand_search').n!=null)
{if((typeof _str!="undefined")&&(_str.indexOf('[bracket]AUIDS ')==-1)&&(_str.indexOf('[bracket]COD ')==-1))
take('editq').show();}}
if(typeof _numDB!="undefined")
{numDB=_numDB;}
else if(typeof _iddb!="undefined")
{numDB=_iddb;}
else
{if(take('bases_div').n!=null)
{var barr=take('bases_div').getsign('input',{name:'base'});if(barr.length>0)
numDB=barr[0].value;else
{if(take('bases_container').n!=null)
numDB=take('bases_container').n.firstChild.className.substring(1);}}}
if(take('bases_div').n!=null)
{if(typeof take('bases_div').getsign('input',{value:numDB})[0]!="undefined")
{var inp=take('bases_div').getsign('input',{value:numDB})[0];if(inp.type!="hidden")
inp.checked=true;}}
if(typeof _typesearch!="undefined")
{typesearch=_typesearch;}
if(typeof _typework!="undefined")
{typework=_typework;}
if(take('middle').n!=null)
{var arr=take('middle').tags('input');for(var i=0;i<arr.length;i++)
arr[i].onkeyup=KeyPress;}
if(take('password').n!=null)
take('password').n.onkeyup=KeyPress;if(take('readercode2').n!=null)
take('readercode2').n.onkeyup=KeyPress;if(typeof numDB=="number")
numDB=numDB+"";if(take('currdb').n!=null)
{var currdb=take('currdb').n;if((typeof numdbAF!="undefined")&&(numDB==numdbAF)&&(dbs[numDB].switch_in_base!="in_base"))
{if(currdb.nodeName.toLowerCase()=="span")
{currdb.innerHTML=take('bases_container').n.firstChild.innerHTML;currdb.className=take('bases_container').n.firstChild.className;}}
else
{if(currdb.nodeName.toLowerCase()=="span")
{if(typework=='searchallbases')
numDB='all';currdb.innerHTML=dbs[numDB]["alias"];currdb.className='i'+numDB;}}}
if(typeof _addfilters!="undefined")
addfilters=_addfilters;if(typeof _lockedfilters!="undefined")
lockedfilters=_lockedfilters;if(typeof _swfterm!="undefined")
swfterm=replaceSymb(_swfterm);var filtersdiv='filters_'+numDB;if(typeof _localiddb!="undefined")
{numDB=_localiddb;filtersdiv='filters_'+_iddb;}
chooseBase(numDB);if(take(filtersdiv).n!=null)
{take(filtersdiv).show();if(typeof _addfilters!="undefined")
{var afarr=addfilters.split('[END]');for(var i=0;i<afarr.length;i++)
{if(afarr[i]!="")
{var nextid=afarr[i].substring(afarr[i].indexOf('[NEXT]')+6,afarr[i].indexOf('[IND]'));var oid=afarr[i].substring(afarr[i].indexOf('[IND]')+5,afarr[i].indexOf('[CLASS]'));var cls=afarr[i].substring(afarr[i].indexOf('[CLASS]')+7,afarr[i].indexOf('[TEXT]'));var txt=afarr[i].substring(afarr[i].indexOf('[TEXT]')+6);var obj=take(nextid).n;if(obj!=null)
{var par=obj.parentNode;var arr=take(par).tags('span');var flag=false;for(var j=0;j<arr.length;j++)
{if(arr[j].innerHTML.toUpperCase()==txt.toUpperCase())
{flag=true;break;}
else
flag=false;}
if(!flag)
{var div=take(par).create('div',{className:prepareTerm(cls)});var span=div.create('span',{onmousedown:'function(){appendFilter(this);}',title:'ФИЛЬТРОВАТЬ',className:'unchecked',textNode:txt,id:oid});div.create('i',{textNode:'(0)'});par.insertBefore(div.n,obj);}}}}}
if(typeof _filtersids!="undefined")
{var farr=_filtersids.split('[END]');for(var i=0;i<farr.length;i++)
{if(take(farr[i]).n!=null)
{take(farr[i]).n.className="checked";take(farr[i]).n.title="ОЧИСТИТЬ ФИЛЬТР";take(farr[i]).n.nextSibling.style.display="none";}}}
if(typeof _rubricator!="undefined")
{openBranches();}
filtersQuery();}
flag45=findFlag45();if(take('readercode2').n!=null)
{if(take('d1').n!=null)
{take('d1').n.onblur=changeData;take('d1').n.onmouseup=changeData;}
if(take('m1').n!=null)
{take('m1').n.onblur=changeData;take('m1').n.onmouseup=changeData;}
if(take('y1').n!=null)
{take('y1').n.onblur=changeData;take('y1').n.onmouseup=changeData;}}
if((typeof _typereg!="undefined")&&(_typereg!="regform"))
{getPrice();}
if(typeof _vocobj!="undefined")
writeRezult();if(take('rcounter').n!=null)
findBaseQuantity();getBookInfo();checkReaderInfo();}}
function checkReaderInfo()
{if(typeof overcharge!="undefined")
{take('readercode').n.disabled=true;take('readercode2').n.disabled=true;take('readerbutton').n.disabled=true;var arg={};arg.target=self;arg.cls='loader';showLayerWin('loaderwin',arg);typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);var curDate=new Date();var year=curDate.getFullYear();var day=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();var month=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacstatd:PersonalVisit"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["userid",identif]);querylist.push(["time[0]",year+'01010000']);querylist.push(["time[1]",year+''+month+''+day+'0000']);querylist.push(["field","AI"]);querylist.push(["value",overcharge]);querylist.push(["registr[0]",""]);gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,callbackcheckReaderInfo);}}
function callbackcheckReaderInfo(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError('Указанный пользователь в системе не зарегистрирован','index');}
else
{if(typeof response!="undefined")
{if(typeof response[0]._reader_0!="undefined")
{delLayerWin();var arr=response[0]._reader_0;var eml='';for(var i=0;i<arr.length;i++)
{if(arr[i].indexOf('AI:')!=-1)
{var tmp=arr[i].substring(3);if(tmp!='N/A')
eml=tmp;break;}}
if((eml!='')&&(eml==overcharge))
{take('readercode').n.disabled=false;take('readercode2').n.disabled=false;take('readerbutton').n.disabled=false;take('readercode').n.focus();}
else
{WriteError('Указанный пользователь в системе не зарегистрирован','index');}}}}}
function findBaseQuantity()
{if(typeof _basequant!="undefined")
{basequant=_basequant;showBaseCounter('stop');}
else
{var arr=take('rcounter').tags('ul');for(var i=0;i<arr.length;i++)
{arr[i].classList.add('animate');}
setTimeout('openBaseInfo()',300);}}
function openBaseInfo()
{var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_html","error"]);querylist.push(["_service","STORAGE:opacfindd:FindSize"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["iddb",numdbBIBL]);gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,openBaseInfoCallback);}
function openBaseInfoCallback(x)
{eval(x.responseText);if(typeof error!="undefined")
{;}
else
{basequant=response[0]._size;showBaseCounter();}}
function showBaseCounter(o)
{var arr=take('rcounter').tags('ul');var rsize=7;var rdelta=rsize-basequant.length;var fullquant='';for(var j=0;j<rdelta;j++)
fullquant+='0';fullquant+=basequant;var i=0;(function(){if(i<arr.length){arr[i].firstChild.innerHTML=fullquant.charAt(i);arr[i].classList.remove('animate');i++;if(typeof o!="undefined")
arguments.callee();else
setTimeout(arguments.callee,300);}})();}
function openBranches()
{var arr=_rubricator.split('[END]');for(var i=0;i<arr.length;i++)
{var obj=take('rub_'+arr[i]).n;obj.className='colorized';var par=obj.parentNode.parentNode;displayNode(par);}}
function displayNode(o)
{o.style.display="";if(o.id!="rubricator")
{if((o.previousSibling)&&(o.previousSibling.nodeType==1))
{o.previousSibling.className='folder_';o.previousSibling.title='Свернуть';}
displayNode(o.parentNode);}
else
return;}
function placeLabs()
{var ndb=numDB;var dtype="";if(dbs[ndb]!=null)
dtype=dbs[ndb]["type"];if((dtype=='AF')&&(typeof prefind!="undefined"))
ndb=numdbf;if(ndb=='all')
{ndb=numdbBIBL;}
var doc=take('labs_div_'+ndb);if(doc.n!=null)
{var labs=doc.tags('div');if(dtype=="BIBL")
{if(take('simple_search').n!=null)
{var span=take('simple_search').tags('span')[0];span.className=labs[0].className;span.innerHTML=labs[0].innerHTML;}
if(take('expand_search').n!=null)
{var div=take('expand_search').getsign('div',{className:'labcontainer'});var count=0;if((labs[0].className=="iFT")||(labs[0].className=="iAH"))
count=1;for(var i=0;i<div.length;i++)
{if(typeof labs[count]!="undefined")
{div[i].firstChild.firstChild.lastChild.className=labs[count].className;div[i].firstChild.firstChild.lastChild.innerHTML=labs[count].innerHTML;var lab=labs[count].className.substring(1);var voc=null;var par=null;if(div[i].previousSibling.className=='logcontainer')
{par=div[i].previousSibling.previousSibling;}
else
{par=div[i].previousSibling;}
if((par.nodeName.toLowerCase()=='b')||((par.nodeName.toLowerCase()=='input')))
voc=par;if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][1]!="N"))
{voc.className='voc';voc.onmousedown=function(){showVoc(this);};}
else
{voc.className='voc disabled';voc.onmousedown=function(){return false;};}
count++;}}}
if(take('professional_search').n!=null)
{var span=take('professional_search').tags('span')[0];var voc=take('professional_search').getsign('b',{className:'voc'})[0];var lab=labs[0].className.substring(1);if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][1]!="N"))
{voc.className='voc';voc.onmousedown=function(){showVoc(this);};}
else
{voc.className='voc disabled';voc.onmousedown=function(){return false;};}
if(take('saf').n!=null)
{if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][2]!="N"))
take('saf').n.disabled=false;else
take('saf').n.disabled=true;}
span.className=labs[0].className;span.innerHTML=labs[0].innerHTML;}
if(take('fulltext_search').n!=null)
{var span=take('fulltext_search').tags('span')[0];if(typeof _lab=="undefined")
{doc=take('fullt_div');labs=doc.tags('div');span.className=labs[0].className;span.innerHTML=labs[0].innerHTML;}
else
{var lab=take('fullt_div').getsign('div',{className:'i'+_lab})[0];span.className=lab.className;span.innerHTML=lab.innerHTML;}}}
else
{if(take('authority_search').n!=null)
{var span=take('authority_search').tags('span')[0];var voc=take('authority_search').getsign('input',{className:'voc'})[0];var lab=labs[0].className.substring(1);span.className=labs[0].className;span.innerHTML=labs[0].innerHTML;if(voc!=null)
{if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][2]!="N"))
{voc.className='voc';voc.onmousedown=function(){findInAf(take('itemaf').n);};}
else
{voc.className='voc disabled';voc.onmousedown=function(){return false;};}}}}}}
function lockSrezults()
{var rez=take('searchrezult');var inf=take('infor');if(rez.n!=null)
{var div=take('disablediv');if(inf.n!=null)
{if(div.n==null)
div=inf.create('div',{id:'disablediv'});div.show();div.transparency(5);}}}
function KeyPress(e)
{var Src=getSrc(e);var Key=getCode(e);if(Key==13)
{if(Src.nodeName.toLowerCase()=='input')
{if(Src.id=='iCA')
searchFundHolders();else if(Src.id=='mylib')
findMyLibrary();else if(Src.id=='itemaf')
findInAf();else if(Src.id=='itemfulltxt')
fulltextSearch();else if(Src.id=='password')
doAuthorization();else if(Src.id=='readercode2')
doRegistration();else
{if((Src.id=='itemsimple')||(Src.id=='itemprof')||(Src.id=='item0')||(Src.id=='item1')||(Src.id=='item2'))
simpleSearch();else
return;}
return false;}}
else if(Src.id=="itemsimple")
{if(numDB!="all")
{var db=numDB;if(typeof _localiddb!="undefined")
db=_iddb;var mark=take('itemsimple').n.parentNode.previousSibling.firstChild.lastChild.className.substring(1);if((typeof dbs[db]["labels"][mark]!="undefined")&&(dbs[db]["labels"][mark][1]=="Y"))
livesearch();}}
else
return;}
function livesearch()
{typework="";var item=take('itemsimple').n;var div=take('livesearch');var val=item.value;var tmp=/^[\<|\>|\"|\*|\'|\%|\:|\.|\,|\-|\_|\;|\(|\)|\&|\/]+/;if(tmp.test(val))
val=Trim2(val);if((val=="")||(val.length<1))
{div.hide();return;}
var lab=item.parentNode.previousSibling.firstChild.lastChild.className.substring(1);var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:IndexView"]);querylist.push(["_version","1.2.0"]);querylist.push(["session",numsean]);querylist.push(["label",lab]);querylist.push(["length",portion]);querylist.push(["iddb",numDB]);querylist.push(["query",val]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,showLivWin);}
function showLivWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{;}
else
{if(response[0]._indx_0!=null)
{var div=take('livesearch');div.n.innerHTML="";var item=take('itemsimple').n.parentNode;var j=0;for(var key in response[0])
{var value=response[0][key];if(key.indexOf('indx_')!=-1)
{if((j%2)==0)
cls='g';else
cls='w';div.create('p',{className:cls,textNode:value._item,onmousedown:'function(){displayVoc(this)}'});}
j++;}
var poz=getAbsolutePosition(item);var h=take(item).geth();var X=poz.x;var y=poz.y+h;var w=take(item).getw();div.show();div.setx(X);div.sety(y);div.setw(w);}}}
function displayVoc(o)
{var text=o.innerHTML;var div=take('livesearch');var item=take('itemsimple');text=text.replace(/\(/gi,'[bracket]');text=text.replace(/\)/gi,'[/bracket]');text="'"+text+"'";item.conceal();item.n.value=text;div.hide();simpleSearch();}
function initnum()
{var arr=take(document.body).getsign('td',{className:'num'});for(var j=0;j<arr.length;j++)
{if((j%2)==0)
arr[j].parentNode.className="g";else
arr[j].parentNode.className="w";take(arr[j]).text(parseInt(arr[j].parentNode.previousSibling.firstChild.firstChild.nodeValue)+1);}}
function goToLocation(o)
{var fr=take(document.body).create('form',{method:'POST',action:'/'+foldername+'/'});if((typeof o=="string")&&(o.indexOf('close')==-1))
{if(typeof numsean!="undefined")
fr.create('input',{type:'hidden',name:'_numsean',value:numsean});if(typeof _localiddb!="undefined")
{fr.create('input',{type:'hidden',name:'_localiddb',value:_localiddb});fr.create('input',{type:'hidden',name:'_iddb',value:_iddb});}
else
fr.create('input',{type:'hidden',name:'_iddb',value:numDB});if(typeof _skin!="undefined")
fr.create('input',{type:'hidden',name:'_skin',value:_skin});if(typeof _ltitle!="undefined")
fr.create('input',{type:'hidden',name:'_ltitle',value:replaceSymb(_ltitle)});if(typeof _lind!="undefined")
fr.create('input',{type:'hidden',name:'_lind',value:replaceSymb(_lind)});if(typeof _laddress!="undefined")
fr.create('input',{type:'hidden',name:'_laddress',value:replaceSymb(_laddress)});if(typeof _sigla!="undefined")
fr.create('input',{type:'hidden',name:'_sigla',value:_sigla});if(typeof _site!="undefined")
fr.create('input',{type:'hidden',name:'_site',value:_site});if(typeof _elcat!="undefined")
fr.create('input',{type:'hidden',name:'_elcat',value:_elcat});if(addfilters!="")
{addfilters=addfilters.replace(/\"/g,'\\\"');addfilters=prepareStr(addfilters);fr.create('input',{type:'hidden',name:'_addfilters',value:addfilters});}
if(typeof _linkstring!="undefined")
fr.create('input',{type:'hidden',name:'_linkstring',value:_linkstring});if(typeof _cataloguer!="undefined")
fr.create('input',{type:'hidden',name:'_cataloguer',value:_cataloguer});if(typeof _typework!="undefined")
fr.create('input',{type:'hidden',name:'_typework',value:_typework});if(basequant!="")
fr.create('input',{type:'hidden',name:'_basequant',value:basequant});var fio="";if(!flag45)
{if(typeof AO!="undefined")
fio=AO;}
else
fr.create('input',{type:'hidden',name:'_flag45',value:'yes'});fr.create('input',{type:'hidden',name:'fio',value:fio});if(o.indexOf('individual')!=-1)
fr.create('input',{type:'hidden',name:'_typereg',value:o});if(o.indexOf('promo')!=-1)
fr.create('input',{type:'hidden',name:'_typereg',value:o});if(o.indexOf('regform')!=-1)
fr.create('input',{type:'hidden',name:'_typereg',value:o});if(o.indexOf('index')==-1)
{if((o.indexOf('history')==-1)&&(o.indexOf('sigla')==-1)&&(o.indexOf('participants')==-1))
{if(typeof pages[o]!="undefined")
fr.create('input',{type:'hidden',name:'p',value:pages[o].directory+'/'+o});}
else
{if(o.indexOf('participants')!=-1)
{searchFundHolders(null,'Юр. Лицо');return;}
else if(o.indexOf('sigla')!=-1)
{openSigla(null,_localiddb,_skin);return;}
else
{if(typeof modules[o]!="undefined")
fr.create('input',{type:'hidden',name:'m',value:modules[o].directory+'/'+o+'.php'});}}}
if((o.indexOf('teacher')!=-1)||(o.indexOf('student')!=-1))
fr.create('input',{type:'hidden',name:'typecat',value:o});if(typeof _auth!="undefined")
fr.create('input',{type:'hidden',name:'_auth',value:_auth});}
fr.n.submit();}
function showHistory()
{if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A")&&(typeof _auth!="undefined"))
{typework="history";var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["history"].directory+'/history.php']);querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);querylist.push(["$fio",AO]);if(typeof _reader!="undefined")
querylist.push(["$reader",_reader])
querylist.push(["$typework",typework]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
else
{goToLocation('history');}}
function doAuthorization(l,p)
{var curDate=new Date();if(typeof l=="undefined")
l=take('login').n.value;if(typeof p=="undefined")
p=take('password').n.value;if((l=="")||(p==""))
{alert("Вы не заполнили все поля или заполнили их неправильно!");return;}
typework="authorization";var gArr=new Array();var querylist=new Array();gArr.push(["_logintype","LOGIN"]);gArr.push(["_login",l.toUpperCase()]);gArr.push(["_password",p]);gArr.push(["_auth",curDate.getTime()]);gArr.push(["_userinfo","yes"]);callToRCP(gArr,"_self",'/'+foldername+'/');}
function clearSearch()
{if(take('middle').n!=null)
{var arr=take('middle').getsign('input',{type:'text'});for(var i=0;i<arr.length;i++)
arr[i].value="";if(take('expr').n!=null)
take('expr').n.innerHTML="";}
editqueryflag=false;}
function clearFilters(o)
{var filters=take('filters_'+numDB).getsign('span',{className:'checked'});if(filters.length>0)
{for(var j=0;j<filters.length;j++)
{filters[j].className="unchecked";}
searchWithFilters("","","");}}
function putFilterPeriod()
{var first=take('ifrom').n;var last=take('ito').n;var lim=first.className;var ind=last.className;var obj=take(ind).n;var par=obj.parentNode;var cls="";var text="";if((parseInt(first.value,10)>parseInt(last.value,10))||(isNaN(parseInt(first.value,10))&&isNaN(parseInt(last.value,10))))
{alert('Задан недопустимый период');return;}
else
{if(!isNaN(parseInt(first.value,10))&&!isNaN(parseInt(last.value,10)))
{cls+="("+lim+" BETWEEN '"+first.value+"','"+last.value+"')";text+='c '+first.value+' по '+last.value;}
if(!isNaN(parseInt(first.value,10))&&isNaN(parseInt(last.value,10)))
{cls+="("+lim+" GE '"+first.value+"')";text+='c '+first.value;}
if(isNaN(parseInt(first.value,10))&&!isNaN(parseInt(last.value,10)))
{cls+="("+lim+" LE '"+last.value+"')";text+='по '+last.value;}
var today=new Date();var seconds=today.getTime();var oid='dinamic_'+numDB+'_'+seconds;var div=take(par).create('div',{className:cls});var span=div.create('span',{onmousedown:'function(){appendFilter(this);}',title:'ФИЛЬТРОВАТЬ',className:'unchecked',textNode:text,id:oid});div.create('i',{textNode:'(0)'});par.insertBefore(div.n,obj);var arg={};arg.next=ind;arg.ind=oid;arg.cname=cls;arg.itext=text;appendFilter(span.n,arg);}}
function addFilterPeriod(o)
{var arg={'cls':'dialog2','message':'ДИАПАЗОН','target':self,'callback':'putFilterPeriod',callbackname:'Добавить','width':'500','height':'400'};showLayerWin('periodwin',arg);var div=take('periodwinform');div.n.innerHTML="";var cont=div.create('div',{className:'period'});cont.create('span',{className:'from',textNode:' с '});var span=cont.create('span',{className:'input'});span.create('input',{type:'text',id:'ifrom',value:'',maxLength:'4',className:o.parentNode.className});cont.create('span',{className:'to',textNode:' по '});var span1=cont.create('span',{className:'input'});span1.create('input',{type:'text',id:'ito',value:'',maxLength:'4',className:o.id});var help=div.create('div',{style:{textAlign:'center',color:'#eee'}});help.create('span',{textNode:'YYYY',style:{padding:'5px 30px 5px 20px'}});help.create('span',{textNode:'YYYY',style:{padding:'5px 10px 5px 50px'}});}
function addFilterVoc(v,item,label,sign)
{var query="";var start=vocstart;vstr=v;if(item!=null)
{fobject=item;var par=item.parentNode;var carr=take(par).getsign('span',{className:'checked'});cstr="";for(var i=0;i<carr.length;i++)
{cstr+=carr[i].innerHTML;if(i<carr.length-1)
cstr+='[END]';}
var uarr=take(par).getsign('span',{className:'unchecked'});ustr="";for(var i=0;i<uarr.length;i++)
{ustr+=uarr[i].innerHTML;if(i<uarr.length-1)
ustr+='[END]';}
skipfirst="";voclab=item.parentNode.className;endvoc="";vocstart=1;firstterm="";indxterms="";lastterm="";vvstr="";query=vvstr=firstterm="";}
else
{indxterms=prepareIndxTerms();start=parseInt(vocstart,10);if(sign==0)
{start=start-portion;if(start==1)
{skipfirst="";query=firstterm="";}
else
{var arr=firstterm.split('[END]');arr.pop();var newstr=arr[arr.length-1];firstterm=arr.join('[END]');query=skipfirst=newstr;}}
else
{start=start+portion;query=skipfirst=lastterm;firstterm=firstterm+'[END]'+query;}
voclab=label;}
typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:IndexView"]);querylist.push(["_version","1.2.0"]);querylist.push(["session",numsean]);querylist.push(["$label",voclab]);querylist.push(["label",voclab]);querylist.push(["$start",start]);querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["iddb",numDB]);querylist.push(["query",query]);querylist.push(["$vstr",vstr]);querylist.push(["$vvstr",vvstr]);querylist.push(["$cstr",cstr]);querylist.push(["$ustr",ustr]);querylist.push(["$firstterm",firstterm]);if((sign!=null)&&(skipfirst))
{querylist.push(["$skipFirst","true"]);querylist.push(["skipFirst","true"]);}
if(indxterms!="")
querylist.push(["$indxterms",indxterms]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,openFiltersWin);}
function wwPages()
{var pages='';if(skipfirst)
pages+='<input type="button" class="button2" value="&#8249; Назад" onmousedown="addFilterVoc(\''+vstr+'\',null,\''+voclab+'\',0);"/>';if(!endvoc)
pages+='<input type="button" class="button2" value="Далее &#8250;" onmousedown="addFilterVoc(\''+vstr+'\',null,\''+voclab+'\',1);"/>';return pages;}
function putFilterVoc()
{var today=new Date();var seconds=today.getTime();var arr=take('menu1').tags('code');var par=fobject.parentNode;var str="";for(var i=0;i<arr.length;i++)
{var text=arr[i].innerHTML;if(voclab!="PF")
text=text.toLowerCase();var oid='fixed_'+numDB+'_'+i+'_'+seconds;var div=take(par).create('div',{className:"("+voclab+" '"+text+"')"});var span=div.create('span',{onmousedown:'function(){appendFilter(this);}',title:'ФИЛЬТРОВАТЬ',className:'unchecked',textNode:text,id:oid});div.create('i',{textNode:'(0)'});par.insertBefore(div.n,fobject);str+="[NEXT]"+fobject.id+"[IND]"+oid+"[CLASS]"+"("+voclab+" '"+replaceSymb(text)+"')[TEXT]"+replaceSymb(text);if(i<arr.length-1)
str+="[END]";}
if(str!="")
{if(addfilters!="")
addfilters+="[END]"+str;else
addfilters=str;}
fobject=null;delLayerWin();}
function openFiltersWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{if(take('vocwinform').n!=null)
delLayerWin();var arg={};vstr=_vstr;arg.cls='dialog2';arg.message=vstr;arg.callback='putFilterVoc';arg.target=self;arg.width="500";arg.height="400";arg.callbackname='Добавить';showLayerWin('vocwin',arg);var doc=take('vocwinform');doc.n.innerHTML="";if(response[0]._indx_0!=null)
{if(typeof _str!="undefined")
vvstr=_str;if(typeof _skipFirst!="undefined")
skipfirst=_skipFirst;if(typeof _firstterm!="undefined")
firstterm=_firstterm;if(response[0]._end!=null)
endvoc=true;else
endvoc=false;voclab=_label;vocstart=parseInt(_start);var str='';var i=-1;var pages=wwPages();var menu='<div id="scont" class="scont">'+pages+'</div>';doc.n.innerHTML=menu;var tabbeg='<center><table cellspacing="0">';var tabend='</table></center>';var scont=take('scont');var menu1=scont.create('div',{id:'menu1',style:{display:'none'}});menu1.create('input',{type:'hidden',id:'andor',name:'andor',value:'OR'});if(typeof _indxterms!="undefined")
{indxterms=_indxterms;var arr=indxterms.split('[END]');for(var j=0;j<arr.length;j++)
{if(arr[j]!="")
menu1.create('code',{style:{display:'none'},textNode:replaceSymb(arr[j].substring(arr[j].indexOf('|')+1)).replace(/&quot;/g,'"'),id:arr[j].substring(0,arr[j].indexOf('|'))});}}
for(var key in response[0])
{var value=response[0][key];if(key.indexOf('indx_')!=-1)
{i++;var flag="";var flag2="";if(menu1.n.childNodes.length>1)
{var childs=menu1.n.childNodes;for(var j=0;j<childs.length;j++)
{if(childs[j].id=='_'+(vocstart+i))
{flag='checked="true"';break;}}}
var term=value._item;var carr=_cstr.split('[END]');for(var j=0;j<carr.length;j++)
{if(carr[j].toUpperCase()==term)
{flag='checked="true"';flag2='disabled="true"';break;}}
var uarr=_ustr.split('[END]');for(var j=0;j<uarr.length;j++)
{if(uarr[j].toUpperCase()==term)
{flag='checked="true"';flag2='disabled="true"';break;}}
if((i%2)==0)
str+='<tr class="searchrez3">';else
str+='<tr class="searchrez2">';str+='<td width="5%" ><input id="'+(vocstart+i)+'" type="checkbox" '+flag+' '+flag2+' class="addbox" name="'+_label+'"  value="'+replaceSymb4(term)+'" onclick="putTerms(this)"/><span style="display: none">'+term+'</span></td><td>'+term+'</td></tr>';lastterm=_lastterm=term;}}
doc.n.innerHTML+=tabbeg+str+tabend;}
else
{doc.create('p',{textNode:'Доступные фильтры не найдены.'});}}}
function convertlimits(val)
{val=val.replace(/\'/g,'[apos]');val=val.replace(/\(/g,'[bracket]');val=val.replace(/\)/g,'[/bracket]');return val;}
function appendFilter(o,arg)
{switch(o.className)
{case"unchecked":o.className="checked";o.title="ОЧИСТИТЬ ФИЛЬТР";break;case"checked":o.className="unchecked";o.title="ФИЛЬТРОВАТЬ";break;default:break;}
var filterstr="";var filtersids="";var fshowstr="";fstrarr=[];fidsarr=[];fshowarr=[];var ndb=numDB;if(typeof _localiddb!="undefined")
ndb=_iddb;var arr=take('filters_'+ndb).getsign('div',{className:'filters'});for(var i=0;i<arr.length;i++)
{var filters=take(arr[i]).getsign('span',{className:'checked'});if(filters.length>0)
{var str="";var showstr='<i>'+arr[i].firstChild.innerHTML.toLowerCase()+'</i> ';for(var j=0;j<filters.length;j++)
{str+=convertlimits(filters[j].parentNode.className);fidsarr.push(filters[j].id);showstr+=filters[j].innerHTML;if(j<filters.length-1)
{str+=' OR ';showstr+=' ИЛИ ';}}
fstrarr.push(str);fshowarr.push(showstr);}}
if(fstrarr.length>0)
{filtersids=fidsarr.join('[END]');if(fstrarr.length>1)
{filterstr='[bracket]'+fstrarr.join('[/bracket] AND [bracket]')+'[/bracket]';fshowstr=fshowarr.join(' И ');}
else
{filterstr='[bracket]'+fstrarr[0]+'[/bracket]';fshowstr=fshowarr[0];}}
else
{filterstr="";filtersids="";fshowstr="";}
if(typeof arg!="undefined")
searchWithFilters(filterstr,filtersids,fshowstr,arg);else
searchWithFilters(filterstr,filtersids,fshowstr);}
function switchSearch(obj)
{if(take('main').n!=null)
{var o="";if(typeof obj!="string")
{o=obj.id;editqueryflag=false}
else
{o=obj;}
if(numDB=='all')
editqueryflag=false;if((o=='fulltext')||(o=='fundholders')||(o=='authority')||(typework=="searchallbases"))
editqueryflag=false;var bl=take('main').getsign('div',{className:'baselimits'});var ls=take('limits_search');if(editqueryflag==false)
{clearSearch();var ss=take('simple_search');var es=take('expand_search');var ps=take('professional_search');var fh=take('fundholders_search');var fts=take('fulltext_search');var as=take('authority_search');var s=take('simple');var e=take('expand');var p=take('professional');var f=take('fundholders');var ft=take('fulltext');var sb=take('sbuttons');switch(o)
{case'simple':if((typeof dbs[numDB]=="undefined")||(dbs[numDB]["type"]!='BIBL'))
{if(typeof dbs['all']!="undefined")
numDB='all';else
numDB=numdbBIBL;if(biblcounter>=1)
{if(take('i'+dbs[numDB]["dbindex"]).n.nodeName.toLowerCase()=='input')
take('i'+dbs[numDB]["dbindex"]).n.checked=true;else
{take('currdb').n.innerHTML=dbs[numDB]["alias"];take('currdb').n.className='i'+numDB;}}}
if(es.n!=null)
{es.hide();if((numDB!="all")&&(typework!="searchallbases"))
{e.show();e.n.className="sel";}
else
e.hide();}
if(ps.n!=null)
{ps.hide();if((numDB!="all")&&(typework!="searchallbases"))
{p.show();p.n.className="sel";}
else
p.hide();}
if(fh.n!=null)
{fh.hide();if(f.n!=null)
{if(f.n.nodeName.toLowerCase()=='span')
f.n.className="sel";f.show();}}
if(ls.n!=null)
{ls.hide();ls.n.className='limits';for(var i=0;i<bl.length;i++)
{take(bl[i]).hide();}}
if(sb.n!=null)
{sb.hide();}
if(as.n!=null)
as.hide();if(ss.n!=null)
{ss.show();s.show();s.n.className="sel_";ss.getsign('input',{type:'text'})[0].focus();}
if(typeof fulltextbase!="undefined")
{if(numDB==fulltextbase)
{ft.show();ft.n.className="sel";fts.hide();}
else
{ft.hide();fts.hide();}}
typesearch='simple';break;case'expand':if((typeof dbs[numDB]=="undefined")||(dbs[numDB]["type"]!='BIBL'))
{if(typeof dbs['all']!="undefined")
numDB='all';else
numDB=numdbBIBL;if(biblcounter>=1)
{if(take('i'+dbs[numDB]["dbindex"]).n.nodeName.toLowerCase()=='input')
take('i'+dbs[numDB]["dbindex"]).n.checked=true;else
{take('currdb').n.innerHTML=dbs[numDB]["alias"];take('currdb').n.className='i'+numDB;}}}
if(ss.n!=null)
{ss.hide();s.n.className="sel";}
if(ps.n!=null)
{ps.hide();p.n.className="sel";}
if(take('limits_'+numDB).n!=null)
{if(ls.n!=null)
{ls.show();ls.n.className='limits';}
for(var i=0;i<bl.length;i++)
{take(bl[i]).hide();}}
if(fh.n!=null)
{fh.hide();if(f.n!=null)
{if(f.n.nodeName.toLowerCase()=='span')
f.n.className="sel";f.show();}}
if(sb.n!=null)
{sb.show();}
if(as.n!=null)
as.hide();if(typeof fulltextbase!="undefined")
{if(numDB==fulltextbase)
{ft.show();ft.n.className="sel";}
else
ft.hide();}
if(typeof fulltextbase!="undefined")
{if(numDB==fulltextbase)
{ft.show();ft.n.className="sel";fts.hide();}
else
{ft.hide();fts.hide();}}
if(es.n!=null)
{es.show();e.n.className="sel_";typesearch='expand';es.getsign('input',{type:'text'})[0].focus();}
break;case'professional':if(ss.n!=null)
{ss.hide();s.n.className="sel";}
if(es.n!=null)
{es.hide();e.n.className="sel";}
if(ls.n!=null)
{ls.hide();ls.n.className='limits';for(var i=0;i<bl.length;i++)
{take(bl[i]).hide();}}
if(fh.n!=null)
{fh.hide();if(f.n!=null)
{if(f.n.nodeName.toLowerCase()=='span')
f.n.className="sel";f.show();}}
if(sb.n!=null)
{sb.hide();}
if(as.n!=null)
as.hide();if(typeof fulltextbase!="undefined")
{if(numDB==fulltextbase)
{ft.show();ft.n.className="sel";fts.hide();}
else
{ft.hide();fts.hide();}}
if(ps.n!=null)
{ps.show();p.n.className="sel_";typesearch='professional';ps.getsign('input',{type:'text'})[0].focus();}
break;case'fundholders':if(ss.n!=null)
{ss.hide();s.n.className="sel";s.show();}
if(es.n!=null)
{es.hide();e.n.className="sel";e.hide();}
if(ps.n!=null)
{ps.hide();p.n.className="sel";p.hide();}
if(ls.n!=null)
{ls.hide();ls.n.className='limits';for(var i=0;i<bl.length;i++)
{take(bl[i]).hide();}}
if(sb.n!=null)
{sb.hide();}
if(as.n!=null)
as.hide();if(typeof fulltextbase!="undefined")
{if(numDB==fulltextbase)
{ft.show();ft.n.className="sel";fts.hide();}
else
{ft.hide();fts.hide();}}
if(fh.n!=null)
{fh.show();if(f.n!=null)
{if(f.n.nodeName.toLowerCase()=='input')
{s.n.className="sel__";e.n.className="sel__";if(p.n!=null)
p.n.className="sel__";}
else
{s.n.className="sel";e.n.className="sel";if(p.n!=null)
p.n.className="sel";f.n.className="sel_";}}
typesearch='fundholders';fh.getsign('input',{type:'text'})[0].focus();}
break;case'fulltext':if(fh.n!=null)
{fh.hide();if(f.n!=null)
{if(f.n.nodeName.toLowerCase()=='span')
{f.n.className="sel";f.hide();}}}
if(ls.n!=null)
{ls.hide();ls.n.className='limits';for(var i=0;i<bl.length;i++)
{take(bl[i]).hide();}}
if(ss.n!=null)
{ss.hide();s.n.className="sel";}
if(es.n!=null)
{es.hide();e.n.className="sel";}
if(ps.n!=null)
{ps.hide();p.n.className="sel";}
if(as.n!=null)
as.hide();if(typeof fulltextbase!="undefined")
{if(numDB==fulltextbase)
{ft.show();ft.n.className="sel_";fts.show();typesearch='fulltext';fts.getsign('input',{type:'text'})[0].focus();}
else
{ft.hide();fts.hide();}}
break;case'authority':if(sb.n!=null)
sb.hide();if(fh.n!=null)
{fh.hide();if(f.n!=null)
{if(f.n.nodeName.toLowerCase()=='span')
f.n.className="sel";f.hide();}}
if(ls.n!=null)
{ls.hide();ls.n.className='limits';for(var i=0;i<bl.length;i++)
{take(bl[i]).hide();}}
if(ss.n!=null)
{ss.hide();s.n.className="sel";s.hide();}
if(es.n!=null)
{es.hide();e.n.className="sel";e.hide();}
if(ps.n!=null)
{ps.hide();p.n.className="sel";p.hide();}
if(fts.n!=null)
{fts.hide();ft.hide();}
if(as.n!=null)
{var opt=as.getsign('div',{className:'opt'})[0];var list=opt.parentNode.previousSibling;var ndb=numDB;if(typeof prefind!="undefined")
{ndb=numdbf;if(take('i'+dbs[ndb]["dbindex"]).n.nodeName.toLowerCase()=='input')
take('i'+dbs[ndb]["dbindex"]).n.checked=true;else
{take('currdb').n.innerHTML=dbs[ndb]["alias"];take('currdb').n.className='i'+ndb;}}
if(take('labs_div_'+ndb).n!=null)
{var divarr=take('labs_div_'+ndb).tags('div');if((divarr.length<2)||(parseInt(dbs[ndb].afrubricator,10)>1))
{take(opt).hide();}
else
take(opt).show();if(parseInt(dbs[ndb].afrubricator,10)>0)
{take(list).hide();take('afalfabet').show();}
else
{take(list).show();take('afalfabet').hide();}}
else
{take('afalfabet').hide();take(opt).hide();take(list).hide();}
typesearch='authority';as.show();as.getsign('input',{type:'text'})[0].focus();}
break;default:break;}}
else
{if(take('limits_'+numDB).n!=null)
{if(ls.n!=null)
{ls.show();ls.n.className='limits';}
for(var i=0;i<bl.length;i++)
{take(bl[i]).hide();}}
else
{if(ls.n!=null)
{ls.hide();ls.n.className='limits';}}}
placeLabs();}}
function showLimits(o)
{if(o.className.indexOf('_')!=-1)
{take(o.className.substring(0,o.className.length-1)+'_'+numDB).hide();o.className=o.className.substring(0,o.className.length-1);}
else
{take(o.className+'_'+numDB).show();o.className=o.className+'_';}}
function closeMenu(e)
{var obj=getSrc(e);var s="";if((obj.parentNode)&&(obj.parentNode==menu)&&(obj.parentNode.className.indexOf('_')!=-1))
return;if(menu!=null)
{var ld=take(document.body).getsign('div',{className:'options'});for(var i=0;i<ld.length;i++)
take(ld[i]).hide();if(take('bases_container').n!=null)
take('bases_container').hide();if(take('logic_div').n!=null)
take('logic_div').hide();if(take('andor_div').n!=null)
take('andor_div').hide();if(take('voc_div').n!=null)
take('voc_div').hide();if(take('searchdiv').n!=null)
{var arr=take('searchdiv').getsign('img',{className:'labs'});for(var i=0;i<arr.length;i++)
{if(arr[i].parentNode.className.indexOf('_')!=-1)
arr[i].parentNode.className=arr[i].parentNode.className.substring(0,arr[i].parentNode.className.length-1);}
var arr=take('searchdiv').getsign('img',{className:'log'});for(var i=0;i<arr.length;i++)
{if(arr[i].parentNode.className.indexOf('_')!=-1)
arr[i].parentNode.className=arr[i].parentNode.className.substring(0,arr[i].parentNode.className.length-1);}}}
if(take('livesearch').n!=null)
take('livesearch').hide();}
document.onmouseup=closeMenu;function showOptions(o,ind)
{var par=take(o.parentNode);var next=null;var s="";var ndb=numDB;var dtype="";if(dbs[ndb]!=null)
dtype=dbs[ndb]["type"];if((dtype=='AF')&&(typeof prefind!="undefined"))
ndb=numdbf;if((ind=='logic_div')||(ind=='andor_div'))
{s=1;next=take(ind);}
else if(ind=='voc_div')
{next=take(ind);}
else if(ind=='labs_div')
next=take(ind+'_'+ndb);else if(ind=='fullt_div')
next=take(ind);else if(ind=='bases_div')
next=take('bases_container');else
next=take(o.parentNode.id+'_opt');var poz=getAbsolutePosition(par.n);var h=par.geth();var x=poz.x;var y=poz.y+h+pageOffset().y;var w=par.getw();if(par.n.className.indexOf('_')==-1)
{next.show();next.setx(x);next.sety(y);if(typeof ind=="undefined")
next.setw(w);par.n.className=par.n.className+'_';menu=par.n;}
else
{next.hide();par.n.className=par.n.className.substring(0,par.n.className.length-1);menu=null;}}
function putLAB(o)
{var obj=take('itemprof').n;var val=obj.value;if(val==" ")
val="";else
val=val.Trim();var par=take('expr');var lab=obj.parentNode.previousSibling.firstChild.lastChild.className.substring(1);var doc=null;var and=o.id.substring(1).toUpperCase();var tie="";switch(and)
{case'AND':tie='И';break;case'OR':tie='ИЛИ';break;case'NOT':tie='НЕ';break;default:break;}
if(par.n.innerHTML.indexOf(lab)!=-1)
doc=take(lab);else
{if(par.n.hasChildNodes())
doc=par.create('span',{id:lab,className:and,title:tie});else
doc=par.create('span',{id:lab});}
if(doc.n.hasChildNodes())
doc.n.innerHTML="";if(val!="")
{var db=numDB;if(typeof _localiddb!="undefined")
db=_iddb;doc.create('span',{textNode:dbs[db]["labels"][lab][0],className:'fel'});doc.create('span',{className:lab,textNode:val});}
else
par.n.removeChild(doc.n);obj.value="";}
function PutLabValue(o)
{var ndb=numDB;var dtype="";if(dbs[ndb]!=null)
dtype=dbs[ndb]["type"];if((dtype=='AF')&&(typeof prefind!="undefined"))
ndb=numdbf;var obj=menu.lastChild;var lab=o.className.substring(1);var img=menu.firstChild;var inp=null;var s="";obj.className=o.className;obj.innerHTML=o.innerHTML;if(menu.className.indexOf('_')!=-1)
menu.className=menu.className.substring(0,menu.className.length-1);if(obj.id=='currdb')
chooseBase(img,o.id);if(menu.parentNode.nextSibling!=null)
{if((img.className!='log')&&(img.className!='stype'))
{inp=menu.parentNode.nextSibling.firstChild;inp.focus();}}
if((typesearch!="simple")&&(menu.parentNode.className!="limits_left")&&(menu.parentNode.className!="opt2")&&(menu.parentNode.className!="opt1")&&(menu.parentNode.className!="andor"))
{var voc=null;if(menu.parentNode.previousSibling)
voc=menu.parentNode.previousSibling;else
voc=menu.parentNode.parentNode.previousSibling;if(voc.className=='logcontainer')
voc=voc.previousSibling;if(voc.nodeName.toLowerCase()!='input')
{if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][1]!="N"))
{voc.className='voc';voc.onmousedown=function(){showVoc(this);};}
else
{voc.className='voc disabled';voc.onmousedown=function(){return false;};}}
if(typeof dbs[ndb]["labels"]!="undefined")
{if(take('saf').n!=null)
{if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][2]!="N"))
take('saf').n.disabled=false;else
take('saf').n.disabled=true;}
if(take('authority_search').n!=null)
{var voc=take('authority_search').getsign('input',{className:'voc'})[0];if(voc!=null)
{if((typeof dbs[ndb]["labels"][lab]!="undefined")&&(dbs[ndb]["labels"][lab][2]!="N"))
{voc.className='voc';voc.onmousedown=function(){findInAf(take('itemaf').n);};}
else
{voc.className='voc disabled';voc.onmousedown=function(){return false;};}}}}}}
function searchWithFilters(filterstr,filtersids,fshowstr,arg)
{typework="search";lockedfilters="";swfterm="";var handler=modules["search"].directory+'/search.php';var str="";var showstr="";if(_str!="")
{str=_str;}
else
{str=_swfterm;}
if(_showstr!="")
{showstr=_showstr;}
else
{showstr=_rshowstr;}
str=prepareStr(str);showstr=prepareStr(showstr);str=replaceSymb(str);showstr=prepareShowstring(showstr);var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);querylist.push(["_start",0]);querylist.push(["start",0]);querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["iddb",numDB]);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);var outfrm=outform;var ndb=numDB;if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
ndb=_iddb;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
swfterm=str;var term="";var flag=true;str=brackets(str);var tmp=/(^\[bracket\]AUIDS )|(^\[bracket\]ID )/;if(tmp.test(str))
flag=false;term=prepareTerm(str);if(flag)
term=prepareStr(term);if(filterstr!="")
{if(typeof arg!="undefined")
{var addstr='[NEXT]'+arg.next+'[IND]'+arg.ind+'[CLASS]'+convertlimits(arg.cname)+'[TEXT]'+arg.itext;addfilters=addfilters+'[END]'+addstr;}
filterstr=replaceSymb(filterstr);querylist.push(["$filterstr",filterstr]);querylist.push(["$filtersids",filtersids]);querylist.push(["$fshowstr",prepareShowstring(fshowstr)]);swfterm+=' AND '+filterstr;filterstr=brackets(filterstr);term+=' AND '+prepareTerm(filterstr);}
if(typeof _rubricator!="undefined")
querylist.push(["$rubricator",_rubricator]);querylist.push(["query/body",term]);querylist.push(["_history","yes"]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function searchWithRubricator()
{typework="search";lockedfilters="";var handler=modules["search"].directory+'/search.php';var str="";var showstr="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);querylist.push(["_start",0]);querylist.push(["start",0]);querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["iddb",numDB]);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);var outfrm=outform;var ndb=numDB;if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
ndb=_iddb;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
swfterm=str;var term="";if(take('rubricator').n!=null)
{var arr=take('rubricator').getsign('a',{className:'colorized'});if(arr.length>0)
{var rstr="";var rsstr="<i>Рубрикатор</i> ";var rtstr=dbs[numDB]["rubricator"]+" ";for(var i=0;i<arr.length;i++)
{rstr+=replaceSymb(arr[i].id.substring(arr[i].id.indexOf('_')+1));rtstr+=replaceSymb(arr[i].innerHTML);rsstr+=replaceSymb(arr[i].innerHTML);if(i<arr.length-1)
{rstr+='[END]';rsstr+=' И ';rtstr+=' AND ';}}
querylist.push(["$rubricator",rstr]);querylist.push(["$rshowstr",prepareShowstring(rsstr)]);swfterm+='[bracket]'+convertbrackets(replaceSlash(brackets(rtstr)))+'[/bracket]';term+=brackets(rtstr);}}
if(term!="")
{querylist.push(["query/body",term]);querylist.push(["_history","yes"]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}}
function searchInBase(o)
{typework="search";typesearch="simple";lockedfilters="";swfterm="";var howmuch=portion;var startfrom=0;var handler=modules["search"].directory+'/search.php';var str=prepareStr(_str);var showstr=prepareStr(_showstr);str=replaceSymb(str);showstr=prepareShowstring(showstr);var term=prepareTerm(str);var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);querylist.push(["_start",startfrom]);querylist.push(["start",startfrom]);querylist.push(["$length",howmuch]);querylist.push(["length",howmuch]);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);numDB=o.id.substring(1);var outfrm=outform;var ndb=numDB;if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
ndb=numdbBIBL;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
querylist.push(["iddb",numDB]);querylist.push(["query/body",term]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function simpleSearchAll(l)
{typework="searchallbases";var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["allbases"].directory+'/allbases.php']);var obj=null;if(typeof l!="undefined")
obj=createSearchString(l);else
obj=createSearchString();if(obj==null)
{alert('Неверно задано поисковое предписание!');return;}
typesearch="simple";var str=prepareStr(obj._str);var showstr=prepareStr(obj._showstr);str=replaceSymb(str);showstr=prepareShowstring(showstr);querylist.push(["$str",replaceSymb(str)]);querylist.push(["$showstr",showstr]);str=brackets(str);var term=prepareTerm(str);for(var key in dbs)
{if(dbs[key]["type"]!="AF")
{if(key!="all")
{if((typeof iddb[key]!="undefined")&&(((typeof l=="undefined")&&(searchlabel!="")&&(typeof dbs[key]["labels"][searchlabel]!="undefined"))||((typeof l!="undefined")&&(typeof dbs[key]["labels"][l]!="undefined"))))
{querylist.push(["_service","STORAGE:opacfindd:FindSize"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["iddb",key]);querylist.push(["query",term]);gArr.push(["querylist",prepareQueryString(querylist,key)]);querylist.length=0;}}}}
callToRCP(gArr);}
function simpleSearch(l)
{lockedfilters="";swfterm="";if((typework=="searchallbases")||(numDB=='all'))
{simpleSearchAll(l);}
else
{typework="search";var obj=null;if(typeof l!="undefined")
obj=createSearchString(l);else
obj=createSearchString();if(obj==null)
{alert('Неверно задано поисковое предписание!');return;}
var handler=modules["search"].directory+'/search.php';var str=prepareStr(replaceSymb(obj._str));var showstr=prepareStr(obj._showstr);showstr=prepareShowstring(showstr);if((str.indexOf('[bracket]AUIDS ')!=-1)||(str.indexOf('[bracket]ID ')!=-1))
str=replaceSlash(str);var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);querylist.push(["_start",0]);querylist.push(["start",0]);querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);var outfrm=outform;var ndb=numDB;if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
ndb=_iddb;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
querylist.push(["iddb",numDB]);str=brackets(str);var term=prepareTerm(str);querylist.push(["query/body",term]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}}
function filtersQuery()
{typework="";if((typeof _size!="undefined")&&(parseInt(_size,10)>1))
{if(typeof _stopfilters=="undefined")
{var str=replaceSymb(_str);str=brackets(str);var term=prepareTerm(str);if(typeof _swfterm!="undefined")
{term=brackets(_swfterm);term=prepareTerm(term);}
var ndb=numDB;if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
ndb=_iddb;var filter=take('filters_'+ndb).getsign('span',{className:'unchecked'});var filter=take('filters_'+ndb).getsign('span',{className:'unchecked'});for(var j=0;j<filter.length;j++)
{var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:FindSize"]);querylist.push(["_version","1.2.0"]);querylist.push(["session",numsean]);querylist.push(["queryList[0]/iddb",numDB]);querylist.push(["queryList[0]/query","("+term+") AND "+filter[j].parentNode.className]);querylist.push(["queryList[0]/queryId",filter[j].id]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,callbackfiltersquery);}}
else
{if(typeof _see=="undefined")
{if(lockedfilters!="")
{var arr=lockedfilters.split('[END]');var len=arr.length;for(var i=0;i<len;i++)
{if(arr[i]!="")
{var ids=arr[i].split('[ID]');if(take(ids[0]).n!=null)
take(ids[0]).n.nextSibling.innerHTML='('+ids[1]+')';}}}}}}}
function callbackfiltersquery(x)
{eval(x.responseText);if(typeof error!="undefined")
{;}
else
{var str='';for(var key in response[0])
{var value=response[0][key];if(key.indexOf('resultList')!=-1)
{take(response[0]._resultList_0._queryId).n.nextSibling.innerHTML='('+response[0]._resultList_0._size+')';str+=response[0]._resultList_0._queryId+'[ID]'+response[0]._resultList_0._size+'[END]';}}
lockedfilters+=str;}}
function nextSearch(c)
{typework="search";var howmuch="";var startfrom="";if(typeof c=="undefined")
{howmuch=portion;startfrom=0;if((typeof _start!="undefined")&&(typeof _see=="undefined"))
startfrom=_start;}
else
{howmuch=_length;startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);}
var handler=modules["search"].directory+'/search.php';var str=prepareStr(_str);var showstr=prepareStr(_showstr);str=replaceSymb(str);showstr=prepareShowstring(showstr);var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);querylist.push(["_start",startfrom]);querylist.push(["start",startfrom]);querylist.push(["$stopfilters","yes"]);querylist.push(["$length",howmuch]);querylist.push(["length",howmuch]);querylist.push(["_history","yes"]);if(typeof _lastdb!="undefined")
numDB=_lastdb;querylist.push(["iddb",numDB]);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);var outfrm=outform;var ndb=numDB;if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
ndb=_iddb;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
if(typeof _searchtitle!="undefined")
querylist.push(["$searchtitle",_searchtitle]);str=brackets(str);var term=prepareTerm(str);if(typeof _filterstr!="undefined")
{querylist.push(["$filterstr",_filterstr]);querylist.push(["$filtersids",_filtersids]);querylist.push(["$fshowstr",_fshowstr]);var filterstr=brackets(_filterstr);term+=' AND '+prepareTerm(filterstr);}
if(typeof _rubricator!="undefined")
querylist.push(["$rubricator",_rubricator]);if(typeof _rshowstr!="undefined")
querylist.push(["$rshowstr",_rshowstr]);if(typeof _swfterm!="undefined")
{swfterm=replaceSymb(_swfterm);var flag=true;var tmp=/(^\[bracket\]AUIDS )|(^\[bracket\]ID )/;if(tmp.test(str))
flag=false;term=prepareTerm(swfterm);if(flag)
term=prepareStr(term);}
querylist.push(["query/body",term]);var label="0";var direct="asc";if(take('sortlab').n!=null)
label=take('sortlab').n.options[take('sortlab').n.selectedIndex].value;if(typeof _direct!="undefined")
direct=_direct;if(label=='PY')
direct="desc";if(label!="0")
{querylist.push(["query/label",label]);querylist.push(["query/direct",direct]);querylist.push(["$label",label]);}
if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function createSearchString(l)
{var obj={_str:"",_showstr:""};if((typesearch=='simple')||((typeof l!="undefined")&&((l=='AUIDS')||(l=='COD'))))
{var ndb=numDB;if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
ndb=numdbBIBL;tmp=take('simple_search').getsign('input',{type:'text'})[0].value;if((tmp!='')&&(tmp.length>1))
{var lab=take('simple_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);if(typeof l!="undefined")
lab=l;searchlabel=lab;if(typeof dbs[ndb]["labels"][lab]!="undefined")
{var labtext=dbs[ndb]["labels"][lab][0];var tmpl=/'$/;if(tmpl.test(tmp))
{tmp=tmp.substring(1,tmp.length-1);tmp=tmp.replace(/\' OR \'/gi,"[/apos] OR [apos]");tmp=tmp.replace(/\' AND \'/gi,"[/apos] AND [apos]");tmp=replaceSymb(tmp);tmp="[apos]"+tmp+"[/apos]";}
obj._str+='[bracket]'+lab+' '+replaceSymb(tmp)+'[/bracket]';obj._showstr+='<i>'+labtext+'</i> '+tmp;}
else
return null;}
else
return null;}
else if(typesearch=='authority')
{tmp=take('authority_search').getsign('input',{type:'text'})[0].value;if((tmp!='')&&(tmp.length>1))
{var lab=take('authority_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);if(typeof l!="undefined")
lab=l;var labtext=dbs[numDB]["labels"][lab][0];obj._str+='[bracket]'+lab+' '+replaceSymb(tmp)+'[/bracket]';obj._showstr+='<i>'+labtext+'</i> '+replaceSymb(tmp);}
else
return null;}
else if(typesearch=='expand')
{var ndb=numDB;if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
ndb=numdbBIBL;var arri=take('expand_search').getsign('input',{className:'iLAB'});var arr=[];var count=0;for(var i=0;i<arri.length;i++)
{if(arri[i].value!="")
{arr.push(arri[i]);count++;}}
if(count<1)
return null;for(var i=0;i<arr.length;i++)
{var lab=null;var log=null;if(arr[i].parentNode.previousSibling.className=='opt1')
{lab=arr[i].parentNode.previousSibling.previousSibling.firstChild.lastChild.className.substring(1);log=arr[i].parentNode.previousSibling.firstChild.lastChild.className.substring(1);}
else
lab=arr[i].parentNode.previousSibling.firstChild.lastChild.className.substring(1);if(i==0)
searchlabel=lab;var term=arr[i].value;term=term.Trim();var term1=term2=tmp="";if((term.indexOf("' OR '")!=-1)||(term.indexOf("' AND '")!=-1)||(term.indexOf("' NOT '")!=-1))
{term=term.substring(1,term.length-1);tmp=term.replace(new RegExp("' AND '",'g')," И ");tmp=tmp.replace(new RegExp("' OR '",'g')," ИЛИ ");var labtext=dbs[ndb]["labels"][lab][0];obj._showstr+='<i>'+labtext+'</i> '+replaceSymb(tmp);var arr1=term.split('\' AND \'');for(var j=0;j<arr1.length;j++)
{if(arr1[j]!="")
{var arr2=arr1[j].split('\' OR \'');for(var z=0;z<arr2.length;z++)
{term1+=arr2[z];if(z<(arr2.length-1))
term1+="[/apos] OR [apos]";}
if(j<(arr1.length-1))
term1+="[/apos] AND [apos]";}}
term1=term1.replace(/\' NOT \'/gi,"[/apos] NOT [apos]");term1="[apos]"+replaceSymb(term1)+"[/apos]"}
else
{var tmpl=/'$/;var labtext=dbs[ndb]["labels"][lab][0];if(tmpl.test(term))
{term1=term.substring(1,term.length-1);term1=replaceSymb(term1);obj._showstr+='<i>'+labtext+'</i> '+term1;term1="[apos]"+term1+"[/apos]";}
else
{term1=replaceSymb(term);if((log!=null)&&(log!="EXACT"))
{if(log=='ANY')
term1=term1.replace(/\s{1,}/g,' OR ');else
term1=term1.replace(/\s{1,}/g,' AND ');}
var showterm=term1.replace(/ OR /g,' ИЛИ ');showterm=showterm.replace(/ AND /g,' И ');obj._showstr+='<i>'+labtext+'</i> '+showterm;}}
obj._str+='[bracket]'+lab+' '+term1+'[/bracket]';if(count>1)
{if(i<count-1)
{if(arr[i].parentNode.parentNode.previousSibling.className=='logcontainer')
{obj._str+=' '+arr[i].parentNode.parentNode.previousSibling.firstChild.lastChild.className.substring(1)+' ';obj._showstr+=' <i>'+dbs[ndb]["labels"][arr[i].parentNode.parentNode.previousSibling.firstChild.lastChild.className.substring(1)][0]+'</i> ';}
else
{obj._str+=' AND ';obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';}}}}
if((take('limits_'+ndb).n!=null)&&(take('limits_'+ndb).n.style.display!="none"))
{var limits=take('limits_'+ndb).getsign('div',{className:'limits_left'});for(var i=0;i<limits.length;i++)
{var ltitle=limits[i].firstChild.innerHTML;if(limits[i].lastChild.className=="input")
{if(limits[i].lastChild.firstChild.id.indexOf('one')!=-1)
{var lobj=limits[i].lastChild.firstChild;if(lobj.value!="")
{obj._str+=' AND [bracket]'+lobj.className+' [apos]'+lobj.value+'[/apos][/bracket]';obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';obj._showstr+='<i>'+ltitle+'</i> '+lobj.value;}}
else
{var lobj=take(limits[i]).tags('input');var first=lobj[0].value;var last=lobj[1].value;var lim=lobj[0].className;if(parseInt(first,10)>parseInt(last,10))
return null;else
{if(!isNaN(parseInt(first,10))&&!isNaN(parseInt(last,10)))
{obj._str='[bracket]'+obj._str+'[/bracket] AND [bracket]'+lim+' BETWEEN [apos]'+first+'[/apos],[apos]'+last+'[/apos][/bracket]';obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';obj._showstr+='<i>'+ltitle+' c</i> '+first+' <i>по</i> '+last;}
if(!isNaN(parseInt(first,10))&&isNaN(parseInt(last,10)))
{obj._str='[bracket]'+obj._str+'[/bracket] AND [bracket]'+lim+' GE [apos]'+first+'[/apos][/bracket]';obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';obj._showstr+='<i>'+ltitle+' c</i> '+first+' ';}
if(isNaN(parseInt(first,10))&&!isNaN(parseInt(last,10)))
{obj._str='[bracket]'+obj._str+'[/bracket] AND [bracket]'+lim+' LE [apos]'+last+'[/apos][/bracket]';obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';obj._showstr+='<i>'+ltitle+' по</i> '+last+' ';}}}}
else
{if(limits[i].lastChild.lastChild.className!="all")
{var lim=limits[i].lastChild.lastChild.className;var val=limits[i].lastChild.lastChild.innerHTML;obj._str='[bracket]'+obj._str+'[/bracket] AND '+convertbrackets(lim);obj._showstr+='<i>'+dbs[ndb]["labels"]["AND"][0]+'</i> ';obj._showstr+='<i>'+ltitle+'</i> '+val;}}}}}
else
{var ndb=numDB;if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
ndb=numdbBIBL;if((typeof l!="undefined")&&(typeof fromaftobibl!="undefined")&&(l==fromaftobibl[0]))
{var lab=l;var labtext=dbs[ndb]["labels"][lab][0];tmp=take('itemprof').n.value;obj._str+='[bracket]'+lab+' '+replaceSymb(tmp)+'[/bracket]';obj._showstr+='<i>'+labtext+'</i> '+replaceSymb(tmp);}
else
{var par=take('expr').n;var tmp="";var tmp2="";var tmp3="";var tmp4="";var tmp6="";var ind="";if(par.childNodes.length==0)
{if(take('itemprof').n.value!='')
putLAB(take('sand').n);else
return null;}
for(var j=0;j<par.childNodes.length;j++)
{if(par.childNodes[j].hasChildNodes())
{var ind=par.childNodes[j].id;if(par.childNodes[j].innerHTML.indexOf('OR')!=-1)
tmp3='OR';if(par.childNodes[j].innerHTML.indexOf('AND')!=-1)
tmp3='AND';if(par.childNodes[j].innerHTML.indexOf('NOT')!=-1)
tmp3='NOT';var and=take(ind).n.className;var arr=take(ind).getsign('span',{className:ind});if(arr.length>0)
{for(var i=0;i<arr.length;i++)
{if(ind=='FT')
{tmp=arr[i].innerHTML.replace(/\s*-\s*/g,'-');tmp=tmp.replace(/\s{2,}/g,' ');tmp=replaceSymb(tmp);tmp6=tmp;}
else if(ind=='PY')
{tmp6=arr[i].innerHTML;tmp=arr[i].innerHTML.replace(/с \<b\>/i,"BETWEEN [apos]");tmp=tmp.replace(/\<\/b\> по \<b\>/i,"[/apos],[apos]");tmp=tmp.replace(/\<\/b\>/i,"[/apos]");}
else
{var tmp5=/'$/;if(tmp5.test(arr[i].innerHTML))
{tmp=tmp6=arr[i].innerHTML.substring(1,arr[i].innerHTML.length-1);tmp=tmp.replace(/\' OR \'/gi,"[apos] OR [/apos]");tmp=tmp.replace(/\' AND \'/gi,"[apos] AND [/apos]");tmp=tmp.replace(/\' NOT \'/gi,"[apos] NOT [/apos]");tmp=replaceSymb(tmp);tmp="[apos]"+tmp+"[/apos]";tmp6=tmp6.replace(/\' OR \'/gi,"\\\' ИЛИ \\\'");tmp6=tmp6.replace(/\' AND \'/gi,"\\\' И \\\'");tmp6=tmp6.replace(/\' NOT \'/gi,"\\\' НЕ \\\'");}
else
{tmp=tmp6=arr[i].innerHTML;tmp6=tmp6.replace(/\' OR \'/gi,"\\\' ИЛИ \\\'");tmp6=tmp6.replace(/\' AND \'/gi,"\\\' И \\\'");tmp6=tmp6.replace(/\' NOT \'/gi,"\\\' НЕ \\\'");tmp=replaceSymb(tmp);}}
tmp2+=tmp;tmp4+=tmp6;if(i!=(arr.length-1))
{if(tmp3!='')
{tmp2+=' '+tmp3+' ';tmp4+=dbs[ndb]["labels"][tmp3][0];}}}
var labtext=dbs[ndb]["labels"][ind][0];if(and!="")
{obj._str+=' '+and+' [bracket]'+ind+' '+tmp2+'[/bracket]';obj._showstr+=' <i>'+dbs[ndb]["labels"][and][0]+' '+labtext+'</i> '+tmp4;}
else
{obj._str+='[bracket]'+ind+' '+tmp2+'[/bracket]';obj._showstr+='<i>'+labtext+'</i> '+tmp4;}
tmp2=tmp=tmp6=tmp4="";}}}}}
return obj;}
function showInterface()
{vocobj=_vocobj;var obj=take(vocobj).n;var sel=null;var voc=null;if(obj.parentNode.previousSibling.className=='opt1')
sel=obj.parentNode.previousSibling.previousSibling.firstChild.lastChild;else
sel=obj.parentNode.previousSibling.firstChild.lastChild;var labsel=_label;if(_label=="SHM")
{_label=="MS";labsel="MS";}
if((typeof dbs[numDB]!="undefined")&&(typeof dbs[numDB]["labels"][labsel]!="undefined"))
{sel.innerHTML=dbs[numDB]["labels"][labsel][0];sel.className="i"+labsel;voc=obj.parentNode.parentNode.previousSibling;if(voc.className=='logcontainer')
voc=voc.previousSibling;if(dbs[numDB]["labels"][labsel][1]=="N")
{voc.className='voc disabled';voc.onmousedown=function(){return false;};}
else
{voc.className='voc';voc.onmousedown=function(){showVoc(this);};}
if(take('saf').n!=null)
{if(dbs[numDB]["labels"][labsel][2]=="N")
take('saf').n.disabled=true;else
take('saf').n.disabled=false;}
if(take('authority_search').n!=null)
{var voc=take('authority_search').getsign('input',{className:'voc'})[0];if(voc!=null)
{if(dbs[numDB]["labels"][labsel][2]=="N")
{voc.className='voc disabled';voc.onmousedown=function(){return false;};}
else
{voc.className='voc';voc.onmousedown=function(){findInAf(take('itemaf').n);};}}}}}
function nextSearchAlfabetAuth()
{var howmuch=parseInt(_length,10);var start=1;if(typeof _start!="undefined")
start=parseInt(_start,10)+howmuch;_query=_skipFirst=_lastterm;_firstterm=_firstterm+'[END]'+_query;searchAlfabetAuth(null,null,null,_label,_query,_firstterm,start);}
function previousSearchAlfabetAuth(num)
{var howmuch=portion;if(typeof _length!="undefined")
howmuch=parseInt(_length,10);var term="";var fterm="";var start=1;var label="";if(typeof _start!="undefined")
start=parseInt(_start,10)-howmuch;if(typeof _firstterm!="undefined")
{var arr=_firstterm.split('[END]');if(arr.length>1)
arr.pop();var newstr=arr[arr.length-1];var fterm=arr.join('[END]');term=_query=_skipFirst=newstr;}
if(typeof _term!="undefined")
term=_term;searchAlfabetAuth(null,null,null,_label,term,fterm,start);}
function searchAlfabetAuth(o,title,db,lab,term,fterm,start)
{typework="search";var indxterms="";var fraftobibl=fromaftobibl[0];if(typeof term=="undefined")
term="";if((o!=null)&&(typeof o!="undefined"))
term=o.innerHTML;var length=portion;var viewoptions="useSearchableRef";var labname="";if((db==null)||(typeof db=="undefined"))
{db=numDB;}
if(typesearch=="professional")
{typesearch="authority";}
if((typeof dbs[db]!="undefined")&&(typeof dbs[db].afrubricator!="undefined")&&(parseInt(dbs[db].afrubricator,10)>1))
{if(typeof dbs[db].labels["SHM"]!="undefined")
{lab="SHM";labname="Рубрики верхнего уровня";}
if(typeof prefind=="undefined")
fraftobibl='COD';length=50;viewoptions="meshNewTree";}
else
{if(typeof lab=="undefined")
lab=take('itemaf').n.parentNode.previousSibling.lastChild.lastChild.className.substring(1);if((typeof dbs[db]["labels"]!="undefined")&&(typeof dbs[db]["labels"][lab]!="undefined"))
labname=dbs[db]["labels"][lab][0];if((term=="")&&(take('itemaf').n.value!=""))
term=take('itemaf').n.value;}
if(lab=="")
{var arr=dbs[db]["labels"];for(var key in arr)
{lab=key;}
labname=dbs[db]["labels"][lab][0];}
var showstr=prepareStr('<span><i>'+labname+'</i> '+term+'</span>');showstr=prepareShowstring(showstr);term=convertbrackets(term);var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["letter"].directory+'/letter.php']);querylist.push(["_service","STORAGE:opacafd:List"]);querylist.push(["_version","1.0.0"]);querylist.push(["mode","alpha"]);querylist.push(["label",lab]);querylist.push(["$returntolist",term]);querylist.push(["$query",term]);querylist.push(["query",prepareTerm(term)]);querylist.push(["$listtype","letter"]);querylist.push(["$label",lab]);if(typeof start=="undefined")
start=1;querylist.push(["$start",start]);if((typeof fterm!="undefined")&&(start>1))
{querylist.push(["$skipFirst","true"]);querylist.push(["skipFirst","true"]);querylist.push(["$firstterm",fterm]);indxterms=prepareIndxTerms();}
else
querylist.push(["$firstterm",term]);if(indxterms!="")
querylist.push(["$indxterms",indxterms]);querylist.push(["session",numsean]);querylist.push(["$length",length]);querylist.push(["length",length]);querylist.push(["iddb",db]);querylist.push(["$iddbaf",db]);if(title==null)
{if(typeof _iddbtitle!="undefined")
title=_iddbtitle;else
title=dbs[db].alias;}
querylist.push(["$iddbtitle",title]);querylist.push(["$typesearch",typesearch]);querylist.push(["$showstr",showstr]);querylist.push(["$vocobj","itemaf"]);querylist.push(["$andor","AND"]);querylist.push(["$fromaftobibl",fraftobibl]);querylist.push(["nextLevel","true"]);querylist.push(["viewOptions[0]",viewoptions]);querylist.push(["$viewOptions",viewoptions]);gArr.push(["querylist",prepareQueryString(querylist,db)]);callToRCP(gArr);}
function getAnnotation(o,l,db,num)
{var lab="";var ind="";var query="";if((typeof l!="undefined")&&(l!=null))
lab=l;else
lab=_label;if(typeof o!="string")
{ind=o.id;query=replaceSlash(_query);}
else
{ind=o;query=replaceSlash(o);}
if((typeof db!="undefined")&&(db!=null))
iddbbibl=db;else
{if(typeof _iddbbibl!="undefined")
iddbbibl=_iddbbibl;}
typework="search";vocobj="itemaf";typesearch="authority";var handler=modules["annotation"].directory+'/annotation.php';var viewoptions="useSearchableRef";/*if((typeof dbs[numDB]!="undefined")&&(parseInt(dbs[numDB].afrubricator,10)>1))
{viewoptions="meshNewTree";}*/
var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacafd:View"]);querylist.push(["_version","1.3.0"]);querylist.push(["session",numsean]);if(typeof _iddbaf!="undefined")
numDB=_iddbaf;querylist.push(["$iddbaf",numDB]);if(typeof _iddbtitle!="undefined")
querylist.push(["$iddbtitle",_iddbtitle]);var len=portion;var start=1;if(typeof _length!="undefined")
len=parseInt(_length,10);if(typeof _start!="undefined")
start=parseInt(_start,10)+len;if(((typeof _listtype!="undefined")&&(_listtype=="permutation"))||(typeof num!="undefined"))
querylist.push(["$start",_start]);else
querylist.push(["$start",start]);querylist.push(["$length",len]);querylist.push(["$label",lab]);querylist.push(["$fromaftobibl",fromaftobibl[0]]);querylist.push(["$query",query]);querylist.push(["$vocobj",vocobj]);querylist.push(["$andor","AND"]);if(typeof _listtype=="undefined")
_listtype="permutation";querylist.push(["$listtype",_listtype]);querylist.push(["iddb",numDB]);querylist.push(["id",ind]);querylist.push(["mode","annotation"]);if(typeof _mode!="undefined")
querylist.push(["$mode",_mode]);if(typeof _biblid!="undefined")
querylist.push(["$biblid",replaceSymb(_biblid)]);var showstr=prepareStr(_showstr);if(iddbbibl!="")
{querylist.push(["$iddbbibl",iddbbibl]);showstr=prepareStr('<span><i>Код</i> '+query+'</span>');}
if((typeof _returntolist!="undefined")&&(_returntolist!=""))
{querylist.push(["$returntolist",replaceSlash(_returntolist)]);}
showstr=prepareShowstring(showstr);if(typeof _str!="undefined")
{var str=prepareStr(_str);str=replaceSymb(str);querylist.push(["$str",str]);}
querylist.push(["$showstr",showstr]);querylist.push(["$typesearch",typesearch]);if(typeof _firstterm!="undefined")
{if(typeof num=="undefined")
querylist.push(["$firstterm",prepareStr(_firstterm)+"[END]"]);else
querylist.push(["$firstterm",prepareStr(_firstterm)]);}
if(typeof _ftitle!="undefined")
querylist.push(["$ftitle",replaceSymb(_ftitle)]);if(typeof _skipFirst!="undefined")
querylist.push(["$skipFirst","true"]);querylist.push(["$viewOptions",viewoptions]);querylist.push(["viewOptions[0]",viewoptions]);if(iddbbibl!="")
gArr.push(["querylist",prepareQueryString(querylist,dbs[iddbbibl].afsearch)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function seeTreeM(o,c,l,q,pq,ll)
{typework="";treeobj=c;var plus=take(treeobj).n.previousSibling.firstChild;if(plus.nodeName.toLowerCase()=='input')
plus=plus.nextSibling;if(take(treeobj).n.style.display=='none')
{if(take(treeobj).n.innerHTML=='')
{var length=50;var viewoptions="useSearchableRef";if(parseInt(dbs[numDB].afrubricator,10)>1)
{viewoptions="meshNewTree";}
var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacafd:View"]);querylist.push(["_version","1.3.0"]);querylist.push(["session",numsean]);querylist.push(["label",l]);querylist.push(["length",length]);querylist.push(["iddb",numDB]);querylist.push(["mode","meshtree"]);querylist.push(["query",q]);querylist.push(["$lastquery",pq]);querylist.push(["$level",ll]);var fraftobibl=fromaftobibl[0];if(parseInt(dbs[numDB].afrubricator,10)>1)
{if(typeof prefind=="undefined")
fraftobibl='COD';}
querylist.push(["$fromaftobibl",fraftobibl]);querylist.push(["nextLevel","true"]);querylist.push(["viewOptions[0]",viewoptions]);gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,openTree);}
plus.className='afminusimg';take(treeobj).show();}
else
{take(treeobj).hide();plus.className='afplusimg';}}
function openTree(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{var cont=take(treeobj);if((_listtype!="letter")&&(typeof _mlabel!="undefined")&&(_mlabel=="COD")||(typeof _fromnexttree!="undefined"))
{var par=cont.n.parentNode.parentNode;var k=parseInt(par.id.substring(2),10)+1;if(!isNaN(k))
{var arr=take('srezults').getsign('div',{align:'left'});var len=arr.length
for(var i=k;i<len;i++)
{par.parentNode.removeChild(arr[i]);}}}
var query=response[0]._next_0._query;var label=response[0]._next_0._label;var start=replaceSymb(response[0]._next_0._start);var endvoc=false;var llevel=parseInt(_level,10);if(typeof response[0]._end!="undefined")
endvoc=true;for(arg in response[0])
{if(arg.indexOf('result_')!=-1)
{var value=response[0][arg];var level=value._level;var ind=value._id;var vquery=ind;var clevel=parseInt(level,10);var nlevel=parseInt(llevel,10)+1;var count=0;var pubmed="";var ebsco="";if(typeof value._AFSHORTFORM_0._originalTermin!="undefined"){pubmed=value._AFSHORTFORM_0._originalTermin+"[MeSH Terms]";if(typeof _auth!="undefined"){ebsco="(MH "+value._AFSHORTFORM_0._originalTermin+")";}}var arr=[];var title=value._AFSHORTFORM_0._title_0[0];var hasNextLevel="0";for(prop in value._AFSHORTFORM_0)
{if(prop.indexOf('meshCodes_')!=-1)
{var v=value._AFSHORTFORM_0[prop];if(typeof v._hasNextLevel!="undefined")
hasNextLevel="1";else
hasNextLevel="0";if(_fromaftobibl=="COD")
vquery=v._query+'*';if((_lastquery!=v._query)&&(query!=v._query))
{if(typeof v._main=="undefined")
{arr.push([v._label,v._query,v._title,hasNextLevel,vquery]);start=v._query;count++;}}}}
if(count>0)
{var div=cont.create('div',{style:{margin:'0px 0px 0px 45px',padding:'0px'}});var p=div.create('div',{className:'aftitle',id:ind,style:{margin:'0px',padding:'0px'}});p.create('input',{type:'checkbox',className:'addbox',name:_fromaftobibl,value:arr[0][4],onclick:'function(){putTerms(this);}'});if(arr[0][3]=="1")
{p.create('span',{className:'afplusimg',title:'Дерево',onmousedown:'function(){seeTreeM(this,"add'+arr[0][1]+'_'+count+'","'+arr[0][0]+'","'+arr[0][1]+'","'+_lastquery+'","'+level+'");}',textNode:title});}
else
{p.create('span',{className:'afbulletimg',textNode:title});}
p.create('span',{className:'afsearchimg',title:'Искать в каталоге',onmousedown:'function(){searchTerm(this.parentNode);}'});p.create('span',{className:'afannotimg',title:'Аннотация',onmousedown:'function(){getAnnotation(this.parentNode);}'});if(pubmed!="") p.create('a',{target:'_blank',href:'//www.ncbi.nlm.nih.gov/pubmed/?term='+encodeURIComponent(pubmed),textNode:'Искать в PubMed'});if(ebsco!="") p.create('a',{target:'_blank',href:'//search.ebscohost.com/login.aspx?authtype=url&custid=s5491879&group=main&site=ehost&scope=site&direct=true&db=mdc&type=0&bquery='+encodeURIComponent(ebsco),textNode:'Искать в EBSCO', style:{marginLeft:'20px'}});div.create('div',{id:'add'+arr[0][1]+'_'+count,style:{display:'none'}});}}}
if(!endvoc)
{var s=cont.create('span',{title:'Далее',className:'nexttr',onmousedown:'function(){nextSeeTreeM(this,"'+treeobj+'","'+label+'","'+start+'","'+query+'","'+llevel+'");}'});s.create('span',{textNode:'Далее'});}}}
function seeAlso(o,c)
{typework="search";var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["tree"].directory+'/tree.php']);querylist.push(["_service","STORAGE:opacafd:View"]);querylist.push(["_version","1.3.0"]);querylist.push(["session",numsean]);querylist.push(["$iddbaf",_iddbaf]);if(typeof _iddbtitle!="undefined")
querylist.push(["$iddbtitle",_iddbtitle]);querylist.push(["$label",_label]);querylist.push(["$fromaftobibl",fromaftobibl[0]]);querylist.push(["$andor",0]);querylist.push(["$vocobj",vocobj]);querylist.push(["$start",1]);querylist.push(["$length",_length]);querylist.push(["iddb",numDB]);querylist.push(["id",o.id]);querylist.push(["mode","see"]);querylist.push(["$query",replaceSymb(_query)]);querylist.push(["codes[0]",c]);querylist.push(["$typesearch",typesearch]);querylist.push(["$listtype",_listtype]);if(typeof _mode!="undefined")
querylist.push(["$mode",_mode]);if(typeof _biblid!="undefined")
querylist.push(["$biblid",replaceSymb(_biblid)]);var showstr=prepareStr(_showstr);if(typeof _iddbbibl!="undefined")
{querylist.push(["$iddbbibl",_iddbbibl]);showstr=prepareStr('<span><i>Код</i> '+_query+'</span>');}
if((typeof _returntolist!="undefined")&&(_returntolist!=""))
{querylist.push(["$returntolist",replaceSymb(_returntolist)]);}
showstr=prepareShowstring(showstr);querylist.push(["$showstr",showstr]);if(typeof _str!="undefined")
{var str=prepareStr(_str);str=replaceSymb(str);querylist.push(["$str",str]);}
var viewoptions="useSearchableRef";if(parseInt(dbs[numDB].afrubricator,10)>1)
viewoptions="meshNewTree";querylist.push(["$viewOptions",viewoptions]);querylist.push(["viewOptions[0]",viewoptions]);if(typeof _iddbbibl!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,dbs[_iddbbibl].afsearch)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function seeAlsoOtherLanguage(o)
{typework="search";var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["tree"].directory+'/tree.php']);querylist.push(["_service","STORAGE:opacafd:View"]);querylist.push(["_version","1.3.0"]);querylist.push(["session",numsean]);querylist.push(["$iddbaf",numDB]);if(typeof _iddbtitle!="undefined")
querylist.push(["$iddbtitle",_iddbtitle]);querylist.push(["$label",_label]);querylist.push(["$fromaftobibl",fromaftobibl[0]]);querylist.push(["$vocobj",vocobj]);querylist.push(["$start",1]);querylist.push(["$length",_length]);querylist.push(["$query",replaceSymb(_query)]);querylist.push(["$andor",0]);querylist.push(["iddb",numDB]);querylist.push(["id",o.id]);querylist.push(["mode","seeOtherLanguage"]);querylist.push(["codes[0]",""]);querylist.push(["$typesearch",typesearch]);querylist.push(["$listtype",_listtype]);if(typeof _mode!="undefined")
querylist.push(["$mode",_mode]);if(typeof _biblid!="undefined")
querylist.push(["$biblid",replaceSymb(_biblid)]);var showstr=prepareStr(_showstr);if(typeof _iddbbibl!="undefined")
{querylist.push(["$iddbbibl",_iddbbibl]);showstr=prepareStr('<span><i>Код</i> '+_query+'</span>');}
if((typeof _returntolist!="undefined")&&(_returntolist!=""))
{querylist.push(["$returntolist",replaceSymb(_returntolist)]);}
showstr=prepareShowstring(showstr);querylist.push(["$showstr",showstr]);if(typeof _str!="undefined")
{var str=prepareStr(_str);str=replaceSymb(str);querylist.push(["$str",str]);}
var viewoptions="useSearchableRef";if(parseInt(dbs[_iddbaf].afrubricator,10)>1)
viewoptions="meshNewTree";querylist.push(["$viewOptions",viewoptions]);querylist.push(["viewOptions[0]",viewoptions]);if(typeof _iddbbibl!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,dbs[_iddbbibl].afsearch)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function nextTree(l)
{var start=1;if(typeof _start!="undefined")
start=parseInt(_start,10)+30;_mterm=_mterm+'[END]'+l;seeMeshTree(null,_mlabel,_code,_mterm,start,l);}
function previousTree()
{var start=1;if(typeof _start!="undefined")
start=parseInt(_start,10)-30;if(start<1)
start=1;var arr=_mterm.split('[END]');arr.pop();var newstr=arr[arr.length-1];_mterm=arr.join('[END]');seeMeshTree(null,_mlabel,_code,_mterm,start,newstr);}
function seeMeshTree(o,l,q,skip,start,mterm)
{typework="search";var length=50;var viewoptions="meshNewTree";var handler=modules["letter"].directory+'/letter.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacafd:View"]);querylist.push(["_version","1.3.0"]);querylist.push(["session",numsean]);if(typeof start=="undefined")
start=1;querylist.push(["$start",start]);querylist.push(["$iddbaf",numDB]);if(typeof _iddbtitle!="undefined")
querylist.push(["$iddbtitle",_iddbtitle]);querylist.push(["$label",_label]);querylist.push(["$vocobj",vocobj]);querylist.push(["$mlabel",l]);querylist.push(["label",l]);querylist.push(["$fromaftobibl",'COD']);querylist.push(["length",length]);querylist.push(["$length",length]);querylist.push(["iddb",numDB]);querylist.push(["mode","meshtree"]);if(((typeof skip!="undefined")&&(skip!=null))&&(start>1))
{querylist.push(["$skipFirst","true"]);querylist.push(["skipFirst","true"]);}
if((typeof skip!="undefined")&&(skip!=null))
querylist.push(["$mterm",skip]);else
querylist.push(["$mterm",q]);if(typeof mterm!="undefined")
querylist.push(["start",mterm]);querylist.push(["query",q]);querylist.push(["$code",q]);querylist.push(["$query",replaceSymb(_query)]);querylist.push(["$andor",0]);querylist.push(["$typesearch",typesearch]);querylist.push(["$listtype",_listtype]);if(typeof _firstterm!="undefined")
querylist.push(["$firstterm",_firstterm]);if(typeof _mode!="undefined")
querylist.push(["$mode",_mode]);if(typeof _biblid!="undefined")
querylist.push(["$biblid",replaceSymb(_biblid)]);var showstr=prepareStr(_showstr);if(typeof _iddbbibl!="undefined")
{querylist.push(["$iddbbibl",_iddbbibl]);showstr=prepareStr('<span><i>Код</i> '+_query+'</span>');}
if((typeof _returntolist!="undefined")&&(_returntolist!=""))
{querylist.push(["$returntolist",replaceSymb(_returntolist)]);}
showstr=prepareShowstring(showstr);querylist.push(["$showstr",showstr]);if(typeof _str!="undefined")
{var str=prepareStr(_str);str=replaceSymb(str);querylist.push(["$str",str]);}
querylist.push(["$fromnexttree","1"]);querylist.push(["$viewOptions",viewoptions]);querylist.push(["viewOptions[0]",viewoptions]);if(typeof _iddbbibl!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,dbs[_iddbbibl].afsearch)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function openAuthWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{delLayerWin();var count=0;var cont=take('main');var continner=cont.create('div',{id:'continner',style:{display:'none'}});var adb="";var alab="";var aterm="";var sterm="";var body="";var title="";var flag=false;for(arg in response[0])
{var value=response[0][arg];if(arg.indexOf('_afList_')!=-1)
{if(typeof value._empty=="undefined")
{var cls='searchrez1';if((count%2)==0)
cls='searchrez';adb=value._iddb;if((typeof numdbAF!="undefined")&&(adb!=numdbAF))
{alab=value._label;aterm=value._query;title=value._title;var div=continner.create('div',{className:cls});div.create('input',{type:'hidden',id:'af_'+adb,name:alab,value:aterm});div.create('u',{title:'перейти',textNode:title,className:'big',onmousedown:'function(){searchAlfabetAuth(null,\"'+title+'\",\"'+adb+'\",\"'+alab+'\",\"'+aterm+'\");}'});count++;flag=false;}}}
if(arg.indexOf('_prefind_')!=-1)
{if(value._size!="0")
{var cls='searchrez1';if((count%2)==0)
cls='searchrez';adb=value._iddb;if((typeof numdbAF!="undefined")&&(adb!=numdbAF))
{title=value._title;aterm=value._query_0._body;alab=_label;firstterm=_term;var div=continner.create('div',{className:cls});div.create('input',{type:'hidden',id:'af_'+adb,name:alab,value:aterm});div.create('u',{title:'перейти',textNode:title,className:'big',onmousedown:'function(){simpleSearchAF(\"'+title+'\",\"'+adb+'\",\"'+alab+'\",\"'+aterm+'\");}'});count++;flag=true;}}}}
if(count==1)
{if(typesearch=="professional")
{_label=alab;_iddb=adb;_term=aterm;}
if(flag)
simpleSearchAF(title,adb,alab,aterm);else
searchAlfabetAuth(null,title,adb,alab,aterm);}
else
{var arg={};arg.cls='dialog2';arg.message='ЕАФ';arg.target=self;arg.width='500';arg.height='400';showLayerWin('authwin',arg);var doc=take('authwinform');doc.n.innerHTML="";if(count==0)
{doc.create('p',{textNode:'По вашему запросу ничего не найдено.',style:{font:'normal 10pt Verdana',textAlign:'center'}});}
else
{doc.n.appendChild(take('continner').n);}
take('continner').show();}}}
function nextFp(c)
{var howmuch=_length;var startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);simpleSearchAF(null,null,_label,_query,_body,startfrom);}
function previoussimpleSearchAF()
{var start=1;if(typeof _start!="undefined")
start=parseInt(_start,10);if(start<1)
start=1;simpleSearchAF(null,null,_label,_query,null,start);}
function simpleSearchAF(title,db,lab,term,fterm,start)
{typework="search";typesearch="authority";var flagfirst=false;if(typeof _body!="undefined")
{if(fterm==0)
fterm=_body;}
if((db==null)||(typeof db=="undefined"))
{db=numDB;}
if(typeof term=="undefined")
{term=take('itemaf').n.value;if(term=="")
{if(parseInt(dbs[db].afrubricator,10)>0)
{searchAlfabetAuth();}
else
{alert('Неверно задано поисковое предписание!');}
return;}}
if(title==null)
{if(typeof _iddbtitle!="undefined")
title=_iddbtitle;else
title=dbs[db].alias;}
if(typeof lab=="undefined")
{lab=take('labs_div_'+db).tags('div')[0].className.substring(1);}
var length=portion;var viewoptions="useSearchableRef";var indxterms="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["letter"].directory+'/letter.php']);querylist.push(["_service","STORAGE:opacafd:Find"]);querylist.push(["_version","1.0.0"]);querylist.push(["iddb",db]);querylist.push(["$iddbaf",db]);querylist.push(["$iddbtitle",title]);querylist.push(["session",numsean]);var fraftobibl=fromaftobibl[0];if(lab!="ID")
{if(parseInt(dbs[db].afrubricator,10)>1)
{if(typeof prefind=="undefined")
fraftobibl='COD';viewoptions="meshNewTree";querylist.push(["nextLevel","true"]);}
else
{lab=take('itemaf').n.parentNode.previousSibling.lastChild.lastChild.className.substring(1);}}
querylist.push(["length",length]);querylist.push(["$length",length]);querylist.push(["$viewOptions",viewoptions]);querylist.push(["viewOptions[0]",viewoptions]);if((typeof fterm=="undefined")||(fterm==null))
{if(typeof fterm=="undefined")
flagfirst=true;term=convertbrackets(term);term=prepareStr(term);term=replaceSlash(term);if(typeof prefind=="undefined")
{fterm=lab+' '+term;}
else
fterm=term;if(lab=='ID')
fterm=lab+' '+term;}
else
{indxterms=prepareIndxTerms();if(indxterms!="")
querylist.push(["$indxterms",indxterms]);}
querylist.push(["$body",fterm]);querylist.push(["$label",lab]);querylist.push(["$fromaftobibl",fraftobibl]);if(typeof start=="undefined")
start=1;if(start>1)
querylist.push(["start",start]);if((typeof _biblid!="undefined")&&(arguments.length>0))
querylist.push(["$biblid",replaceSymb(_biblid)]);if((typeof _str!="undefined")&&(arguments.length>0))
querylist.push(["$str",replaceSymb(_str)]);var showstr="";if((typeof _iddbbibl!="undefined")&&(arguments.length>0))
{querylist.push(["$iddbbibl",_iddbbibl]);showstr='<span><i>Код</i> '+term+'</span>';}
else
{if(!flagfirst)
{if(typeof _ftitle!="undefined")
firstterm=_ftitle;}
showstr='<span><i>'+dbs[db]["labels"][lab][0]+'</i> '+firstterm+'</span>';}
querylist.push(["$ftitle",replaceSymb(firstterm)]);querylist.push(["$returntolist",fterm]);showstr=prepareShowstring(showstr);querylist.push(["$start",start]);querylist.push(["$vocobj","itemaf"]);querylist.push(["$query",term]);querylist.push(["$showstr",showstr]);var andor=0;if(take('andor').n!=null)
{if(take('andor').n.className=="AND")
andor=1;else
andor=0;}
querylist.push(["$andor",andor]);querylist.push(["$typesearch","authority"]);querylist.push(["$listtype","permutation"]);querylist.push(["query/body",prepareTerm(fterm)]);querylist.push(["query/label","s1"]);querylist.push(["query/mode","wordSet"]);firstterm="";gArr.push(["querylist",prepareQueryString(querylist,db)]);callToRCP(gArr);}
function searchAF(o)
{typework="";var term="";var label="";var label1="";var searchtype="list";if(typesearch=="authority")
{term=take('itemaf').n.value;label=label1=take('itemaf').n.parentNode.previousSibling.lastChild.lastChild.className.substring(1);if(typeof prefind!="undefined")
{if(label1=="AH")
label1="SH";}}
else
{term=take('itemprof').n.value;label=label1=take('itemprof').n.parentNode.previousSibling.lastChild.lastChild.className.substring(1);}
if(typeof o=="undefined")
{searchtype="find";if(term=="")
{alert("Неверно задано поисковое предписание!");return;}}
term=replaceSymb(term);term=brackets(term);var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacafd:View"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["searchType",searchtype]);querylist.push(["mode","searchfrombibl"]);querylist.push(["term",term]);querylist.push(["label",label1]);querylist.push(["$term",term]);querylist.push(["$label",label]);querylist.push(["iddb",numdbBIBL]);gArr.push(["querylist",prepareQueryString(querylist)]);var arg={};arg.target=self;arg.cls='loader';showLayerWin('loaderwin',arg);ajaxToRCP(gArr,openAuthWin);}
function nextFindInAf()
{var start=1;if(typeof _start!="undefined")
start=parseInt(_start,10)+portion;_query=_skipFirst=_lastterm;_firstterm=_firstterm+'[END]'+_query;findInAf(_iddbtitle,_iddbaf,_label,_query,_firstterm,start);}
function previousFindInAf()
{var start=1;if(typeof _start!="undefined")
start=parseInt(_start,10)-portion;if(start<1)
start=1;var arr=_firstterm.split('[END]');arr.pop();var newstr=arr[arr.length-1];var fterm=arr.join('[END]');_query=_skipFirst=newstr;findInAf(_iddbtitle,_iddbaf,_label,_query,fterm,start);}
function findInAf(o)
{if(typeof o=="number")
{if((typeof _listtype!="undefined")&&(_listtype=="permutation"))
previoussimpleSearchAF();else
previousSearchAlfabetAuth(1);}
else
{if(typeof prefind!="undefined")
searchAF(o);else
{if(typeof o=="object")
searchAlfabetAuth();else
simpleSearchAF();}}}
function getAfList(o)
{typework="";var val=o.nextSibling.value;var num=val.substring(val.indexOf('[NUM]')+5,val.indexOf('[/NUM]'));var i1=val.substring(val.indexOf('[I1]')+4,val.indexOf('[/I1]'));var i2=val.substring(val.indexOf('[I2]')+4,val.indexOf('[/I2]'));var value=val.substring(val.indexOf('[VALUE]')+7,val.indexOf('[/VALUE]'));if(value.indexOf('$2')!=-1)
value=value.substring(0,value.indexOf('$2'));var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacafd:View"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["mode","fieldToQuery"]);querylist.push(["field/i1",i1]);querylist.push(["field/i2",i2]);querylist.push(["field/num",num]);querylist.push(["$iddbbibl",numDB]);var tmp=/\\{1,}/g;if(tmp.test(value))
value=value.replace(tmp,'\\');querylist.push(["field/value",value]);gArr.push(["querylist",prepareQueryString(querylist,numdbAF)]);var arg={};arg.target=self;arg.cls='loader';showLayerWin('loaderwin',arg);ajaxToRCP(gArr,openAfListWin);}
function openAfListWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{var count=0;var cont=take('main');var continner=null;if(take('continner').n!=null)
{continner=take('continner');continner.n.innerHTML="";}
else
continner=cont.create('div',{id:'continner',style:{display:'none'}});var adb="";var atitle="";var abody="";var alab="";var aterm="";for(arg in response[0])
{var value=response[0][arg];if(arg.indexOf('_prefind_')!=-1)
{if(value._size!="0")
{var cls='searchrez1';if((count%2)==0)
cls='searchrez';adb=value._iddb;atitle=value._title;abody=value._query_0._body;alab=value._query_0._parsed_0._label;aterm=value._query_0._parsed_0._content;var tmp=/\\{1,}/g;if(tmp.test(aterm))
aterm=aterm.replace(tmp,'\\');var div=continner.create('div',{className:cls});div.create('input',{type:'hidden',id:'af_'+adb,name:alab,value:aterm});div.create('u',{title:'перейти',textNode:atitle,className:'big',onmousedown:'function(){simpleSearchAF(\"'+atitle+'\",\"'+adb+'\",\"'+alab+'\",\"'+replaceSymb(aterm)+'\");}'});count++;}}}
if(count==1)
{simpleSearchAF(atitle,adb,alab,replaceSymb(aterm));}
else
{delLayerWin();var arg={};arg.cls='dialog2';arg.message='ЕАФ';arg.target=self;arg.width='500';arg.height='400';showLayerWin('authwin',arg);var doc=take('authwinform');doc.n.innerHTML="";if(count==0)
{doc.create('p',{textNode:'По вашему запросу ничего не найдено.',style:{font:'normal 10pt Verdana',textAlign:'center'}});}
else
{doc.n.appendChild(take('continner').n);}
take('continner').show();}}}
function findAnnotation(atitle,adb,alab,aterm,ndb)
{numDB=adb;getAnnotation(aterm,alab,ndb);}
function searchFundHolders(c,t)
{typework="search";var howmuch=portion;var startfrom=0;var query='';var text='';if(typeof t=="undefined")
text=take('iCA').n.value;else
text=t;query='(AH '+replaceSymb(text)+')';var showstr=prepareStr('<i>Везде</i> '+replaceSymb(text));if((typeof c!="undefined")&&(c!=null))
{if(typeof _length!="undefined")
howmuch=_length;startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);if(typeof _showstr!="undefined")
showstr=prepareStr(_showstr);if(typeof _query!="undefined")
query=prepareStr(_query);}
query=replaceSymb(query);showstr=prepareShowstring(showstr);numDB=numdbAF;typework="search";var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["findlib"].directory+'/findlib.php']);querylist.push(["_service","STORAGE:opacafd:Find"]);querylist.push(["_version","1.0.0"]);querylist.push(["iddb",numDB]);querylist.push(["$iddbaf",numDB]);querylist.push(["length",howmuch]);querylist.push(["$length",howmuch]);querylist.push(["$typesearch","fundholders"]);querylist.push(["_history","yes"]);querylist.push(["_start",startfrom]);querylist.push(["start",startfrom]);querylist.push(["$showstr",showstr]);querylist.push(["query/body",query]);querylist.push(["$query",query]);querylist.push(["viewOptions[0]",""]);querylist.push(["query/outforms[0]","TITLE"]);querylist.push(["query/outforms[1]","ADDRESS"]);querylist.push(["query/outforms[2]","BLK856"]);gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function nextFh(c)
{searchFundHolders(c);}
function openSigla(o,ndb,skin,biblid)
{var ind="";var trg="";var db=numdbBIBL;if(o!=null)
{ind=o.parentNode.id;typework="";trg="_blank";}
else
{ind=_lind;typework="search";trg="_self";db=_iddb;}
var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["sigla"].directory+'/sigla.php']);querylist.push(["_service","STORAGE:opacafd:View"]);querylist.push(["_version","1.3.0"]);querylist.push(["session",numsean]);querylist.push(["iddb",numdbAF]);querylist.push(["id",ind]);querylist.push(["length",portion]);querylist.push(["mode","OUTRECORD"]);querylist.push(["outforms[0]","TITLE"]);querylist.push(["outforms[1]","ADDRESS"]);querylist.push(["outforms[2]","BLK300"]);querylist.push(["outforms[3]","BLK305"]);querylist.push(["outforms[4]","BLK856"]);querylist.push(["$skin",skin]);querylist.push(["$lind",replaceSymb(ind)]);querylist.push(["$localiddb",ndb]);querylist.push(["$iddb",db]);gArr.push(["querylist",prepareQueryString(querylist,numdbAF)]);if(typeof biblid!="undefined")
{querylist.length=0;querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);querylist.push(["outformList[0]/outform","FULLFRM1"]);querylist.push(["outformList[1]/outform","FULLFRM2S"]);querylist.push(["outformList[2]/outform","FULLFRM3"]);querylist.push(["outformList[3]/outform","FULLFRM4"]);querylist.push(["outformList[4]/outform","FULLFRM5"]);querylist.push(["outformList[5]/outform","FULLFRM6"]);querylist.push(["outformList[6]/outform","BIBREF"]);querylist.push(["_brokerid",dbs[db]["brokerid"]]);querylist.push(["iddbIds[0]/id",biblid]);querylist.push(["iddbIds[0]/iddb",ndb]);gArr.push(["querylist",prepareQueryString(querylist,ndb)]);}
callToRCP(gArr,trg)}
function addLibToSearch(o)
{var sigla=o.nextSibling.value;if(sigla!="")
{var today=new Date();var seconds=today.getTime();var str="[NEXT]addfilterobj[IND]filter_1_"+seconds+"_"+seconds+"[CLASS](PF '"+sigla+"')[TEXT]"+sigla;if(typeof _addfilters!="undefined")
addfilters=_addfilters+"[END]"+str;else
addfilters=str;alert('Фильтр добавлен');}
else
{alert('Невозможно добавить фильтр к поиску. Отсутствует сигла');}}
function findSigla(o)
{typework="";siglaid=o.nextSibling;var howmuch=portion;var startfrom=0;var str=take('mysigla').n.value;if(siglaid.style.display=='none')
{if(siglaid.innerHTML=="")
{siglaid.innerHTML='<div class="progress small"><div></div></div>';o.className='wrapped_';take(siglaid).show();var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacafd:Find"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["iddb",numdbAF]);querylist.push(["start",startfrom]);querylist.push(["length",howmuch]);querylist.push(["_start",startfrom]);querylist.push(["$sstart",startfrom]);querylist.push(["$length",howmuch]);querylist.push(["$sigla",str]);querylist.push(["$ids",take('myids').n.value]);querylist.push(["query/body","(AH "+str+")"]);querylist.push(["viewOptions[0]",""]);querylist.push(["query/outforms[0]","TITLE"]);querylist.push(["query/outforms[1]","ADDRESS"]);querylist.push(["query/outforms[2]","SIGLA"]);querylist.push(["query/outforms[3]","BLK856"]);gArr.push(["querylist",prepareQueryString(querylist,numdbAF)]);ajaxToRCP(gArr,callBackfindSigla);}
else
{o.className='wrapped_';take(siglaid).show();}}
else
{take(siglaid).hide();o.className='wrapped';}}
function findSiglaNext(c)
{typework="";var howmuch=portion;var startfrom=0;if(typeof c!="undefined")
startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);if(isNaN(startfrom))
startfrom=0;var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacafd:Find"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["iddb",numdbAF]);querylist.push(["length",howmuch]);querylist.push(["$length",howmuch]);querylist.push(["$sigla",take('mysigla').n.value]);querylist.push(["$ids",take('myids').n.value]);querylist.push(["$sstart",startfrom]);querylist.push(["_start",startfrom]);querylist.push(["start",startfrom]);querylist.push(["query/body","(AH "+take('mysigla').n.value+")"]);querylist.push(["viewOptions[0]",""]);querylist.push(["query/outforms[0]","TITLE"]);querylist.push(["query/outforms[1]","ADDRESS"]);querylist.push(["query/outforms[2]","SIGLA"]);querylist.push(["query/outforms[3]","BLK856"]);gArr.push(["querylist",prepareQueryString(querylist,numdbAF)]);ajaxToRCP(gArr,callBackfindSigla);}
function wPs(s,b)
{var pages="";if(s==0)
pages="";else
{var N1=Math.ceil(s/portion);if(N1!=1)
{var N2=Math.ceil(N1/10);var N3=Math.ceil((b+1)/portion);var N4=Math.ceil(N3/10);var i1=(N4-1)*10+1;var N5=N4*10;var i2;if(N1>N5)
i2=N4*10;else
i2=N1;if(N4>1)
{pages+='&#160;<a class="new" href="javascript: findSiglaNext('+parseInt((N4-2)*10+1)+')">&lt;&lt; Пред.</a>&#160;';}
for(;i1<=i2;i1++)
{if(i1==N3)
{pages+='&#160;<span class="now">'+i1+'</span>&#160;';}
else
{pages+='&#160;<a class="new" href="javascript: findSiglaNext('+parseInt(i1)+')">'+i1+'</a>&#160;';}}
if(N2>N4)
{pages+='&#160;<a class="new" href="javascript: findSiglaNext('+parseInt(N4*10+1)+')">След. &gt;&gt;</a>&#160;';}}}
return pages;}
function callBackfindSigla(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{siglaid.innerHTML="";var sstr=take('searchquery').n.value;var count=0;var size=parseInt(response[0]._size,10);var pages=take(siglaid).create('div',{className:'pages'});var doc=take(siglaid).create('div',{className:'table w100',id:'siglatable'});var pages1=take(siglaid).create('div',{className:'pages'});if(size>0)
{for(var arg in response[0])
{if(arg.indexOf('_result_')!=-1)
{var value=response[0][arg];var ind=value._id;var titl="";var addr="";var sigla="";var tr=doc.create('div',{className:'row'});tr.create('div',{className:'td w3',textNode:(parseInt(_sstart,10)+count+1)});var td=tr.create('div',{className:'td'});var td1=tr.create('div',{id:ind,className:'td w20'});var ek="";var site="";var url="";var abis="";var skin="";var ndb="";for(var sign in value)
{if(sign.indexOf('userforms_')!=-1)
{var val=value[sign];var t=val._AFANNOTTEXT_0._title;for(var k in val._AFANNOTTEXT_0)
{var v="";if(k.indexOf('entries_')!=-1)
v=val._AFANNOTTEXT_0[k];switch(t)
{case"Title":if(typeof v._text!="undefined")
titl=v._text;break;case"Addresse":if(typeof v._text!="undefined")
addr=v._text;break;case"Sigla":if(typeof v._text!="undefined")
sigla=v._text;break;case"Internet":if(typeof v._text!="undefined")
{var arr=v._text.split('[END]');if(arr[0]=='Интернет-сайт')
{site=arr[1];}
if(arr[0]=='Электронный каталог')
{ek=arr[1];}
if(arr[0]=='Поиск в ЭК')
{url=arr[1];}
if(arr[0]=='ABIS')
{abis=arr[1];}}
break;default:break;}}}}
if(url!="")
{td.create('span',{className:'afsearchimg'});td.create('span',{title:'Перейти в библиотеку',textNode:titl,className:'f120 c8 u curs',onclick:'function(){openUrl(this,\''+sigla+'\',\''+abis+'\',\''+url+'\')}'});}
else
td.create('div',{textNode:titl,className:'f120 c8'});td.create('div',{className:'afsmall c6 pl20x',textNode:addr});if((sigla!="СКБР")&&(sigla!="СКЭР")&&(sigla!="КБД"))
{td1.create('span',{className:'aflinkinfo p5x',textNode:'О библиотеке',onmousedown:'function(){showLibInfo(this.parentNode.id)}'});if(site!="")
td1.create('a',{className:'aflinkinfo p5x',textNode:'Интернет-сайт',target:'_blank',href:site});if(ek!="")
td1.create('a',{className:'aflinkinfo p5x',textNode:'Электронный каталог',target:'_blank',href:ek});}
count++;}}
pages.n.innerHTML=wPs(parseInt(size,10),parseInt(_sstart,10));pages1.n.innerHTML=wPs(parseInt(size,10),parseInt(_sstart,10));}
else
{doc.create('div',{textNode:'Библиотеки не найдены.',style:{textAlign:'center'}});}}}
function showLibInfo(ind)
{typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacafd:View"]);querylist.push(["_version","1.3.0"]);querylist.push(["session",numsean]);querylist.push(["iddb",numdbAF]);querylist.push(["id",ind]);querylist.push(["length",portion]);querylist.push(["$length",portion]);querylist.push(["$start",1]);querylist.push(["mode","OUTRECORD"]);querylist.push(["outforms[0]","BLK856"]);querylist.push(["outforms[1]","TITLE"]);querylist.push(["outforms[2]","ADDRESS"]);querylist.push(["outforms[3]","BLK305"]);querylist.push(["outforms[4]","BLK300"]);querylist.push(["outforms[5]","BLOCK310"]);querylist.push(["outforms[6]","BLOCK320"]);querylist.push(["outforms[7]","BLOCK330"]);querylist.push(["outforms[8]","BLOCK340"]);querylist.push(["outforms[9]","BLOCK4"]);querylist.push(["outforms[10]","BLOCK5"]);querylist.push(["outforms[11]","BLOCK7"]);gArr.push(["querylist",prepareQueryString(querylist,numdbAF)]);ajaxToRCP(gArr,openInfoWin);}
function openInfoWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{if(take('infowinform').n==null)
{var arg={'cls':'dialog2','message':'Информация','cls':'dialog2','width':'95%','height':'95%'};showLayerWin('infowin',arg);}
var doc=take('infowinform');doc.n.innerHTML="";var div=doc.create('div',{className:'infores'});var titl='';var addr='';var ek='';var site='';var img='';var sigla='';var outer=div.create('div',{className:'infores'});var inner=div.create('div',{className:'infores'});outer.create('img',{src:pathimg+'/nophoto.jpg',align:'left',style:{margin:'0 20px 10px 0'}});for(arg in response[0])
{var value=response[0][arg];if(arg.indexOf('_result_')!=-1)
{var val=value._AFANNOTTEXT_0;for(term in val)
{var afv=val[term];if(term.indexOf('_entries_')!=-1)
{if(val._title=='Internet')
{var arr=afv._text.split('[END]');if(arr[0]=='Интернет-сайт')
{site=arr[1];}
if(arr[0]=='Электронный каталог')
{ek=arr[1];}
if(arr[0]=='IMG')
{img=arr[1];}
if(arr[0]=='Каталог в СКБМ')
{sigla=arr[2];}}
else if(val._title=='Title')
{titl=val._entries_0._text;}
else if(val._title=='Addresse')
{addr=val._entries_0._text;}
else
{inner.create('p',{textNode:replaceSymb(afv._text)});}}}
if(typeof value._AFANNOTREF_0!="undefined")
{var ref=inner.create('div',{className:'ml210px'});var v=value._AFANNOTREF_0;if(typeof v._title!="undefined")
{if(v._title=="См. также более узкое понятие:")
{ref.create('p',{textNode:'Включает:',className:'b pt5px pb5px'});}
if(v._title=="См. также более широкое понятие:")
{ref.create('p',{textNode:'Входит в:',className:'b pt5px pb5px'});}}
for(t in v)
{var args=v[t];if(t.indexOf('_references_')!=-1)
{if(typeof args._biblQuery!="undefined")
{ref.create('p',{textNode:replaceSymb(args._biblQuery),className:'aflinkinfo',onclick:'function(){showLibInfo(\''+replaceSymb(args._id)+'\');}'});}}}}}}
outer.create('p',{className:'fstr',textNode:titl});if((sigla.indexOf('ЗАО')==-1)&&(sigla.indexOf('ВАО')==-1)&&(sigla.indexOf('СЗАО')==-1)&&(sigla.indexOf('СВАО')==-1))
{var p1=outer.create('p');p1.create('b',{textNode:'Адрес: '});p1.text(addr);}
if(site!="")
{var p=outer.create('p');p.create('b',{textNode:'Интернет-сайт: '});p.create('a',{target:'_blank',href:site,textNode:site});}
if(ek!="")
{var p=outer.create('p');p.create('b',{textNode:'Электронный каталог: '});p.create('a',{target:'_blank',href:ek,textNode:ek});}}}
function lookAtMap(o)
{alert('В разработке');}
function checkAvail(o,ndb,skin,c)
{typework="";var ind=o.parentNode.parentNode.parentNode.parentNode.id+'search';var howmuch=portion;var startfrom=0;var biblid=take('biblid'+c).n.value;var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacafd:Find"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["iddb",numdbAF]);querylist.push(["start",startfrom]);querylist.push(["length",howmuch]);querylist.push(["_start",startfrom]);querylist.push(["$length",howmuch]);querylist.push(["$biblid",biblid]);querylist.push(["$ind",ind]);querylist.push(["query/body","(ID '"+o.parentNode.id+"')"]);querylist.push(["viewOptions[0]",""]);querylist.push(["query/outforms[0]","BLK856"]);gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,callBackCheckAvail);}
function callBackCheckAvail(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var ek="";var url="";var abis="";if(typeof response[0]._result_0._userforms_0._AFANNOTTEXT_0!="undefined")
{for(sign in response[0]._result_0._userforms_0._AFANNOTTEXT_0)
{var val=response[0]._result_0._userforms_0._AFANNOTTEXT_0[sign];if(sign.indexOf('_entries_')!=-1)
{var arr=val._text.split('[END]');var arr=val._text.split('[END]');if(arr[0]=='Электронный каталог')
{ek=arr[1];}
if(arr[0]=='Поиск в ЭК')
{url=arr[1];}
if(arr[0]=='ABIS')
{abis=arr[1];}}}}
if((url!="")&&(ek!="")&&(abis!=""))
{if(abis=="OPAC2")
{var biblid=_biblid;var expression="(ID '"+biblid.substring(biblid.lastIndexOf('-')+1)+"')";window.open(url+''+encodeVal(expression),"");}
else if(abis=="MEGAPRO")
{var searchquery=take(_ind).n.value;var SB="",AU="",TI="",PY="";if(searchquery.indexOf('[NI]')!=-1)
{SB=searchquery.substring(searchquery.indexOf('[NI]')+4,searchquery.indexOf('[/NI]'));if((SB.indexOf('X')!=-1)||(SB.indexOf('Х')!=-1)||(SB.indexOf('(')!=-1)||(SB.indexOf(')')!=-1)||(SB.indexOf('[')!=-1)||(SB.indexOf(']')!=-1))
SB="";}
if(searchquery.indexOf('[RP]')!=-1)
AU=searchquery.substring(searchquery.indexOf('[RP]')+4,searchquery.indexOf('[/RP]'));if(searchquery.indexOf('[TITL]')!=-1)
TI=searchquery.substring(searchquery.indexOf('[TITL]')+6,searchquery.indexOf('[/TITL]'));if(searchquery.indexOf('[PY]')!=-1)
PY=searchquery.substring(searchquery.indexOf('[PY]')+4,searchquery.indexOf('[/PY]'));PY=PY.replace(/\[/g,'');PY=PY.replace(/\]/g,'');if((PY.indexOf('#')!=-1)||(PY.indexOf('|')!=-1))
{PY="";}
else
{if(isNaN(parseInt(PY)))
{PY="";}}
var str="";if(SB!="")
{str="&lookfor0%5B%5D="+encodeVal(SB)+"&type0%5B%5D=ISN";}
else
{if(AU!="")
{str+="&lookfor0%5B%5D="+encodeVal(AU)+"&type0%5B%5D=Author";}
if(TI!="")
{str+="&lookfor0%5B%5D="+encodeVal(TI)+"&type0%5B%5D=Title";}
if(PY!="")
{str+="&lookfor0%5B%5D="+encodeVal(PY)+"&type0%5B%5D=year";}}
window.open(url+''+str,"");}
else
{window.open(url,"");}}
else
{alert('Невозможно перейти в локальный каталог.');}}}
function openUrl(o,sigla,abis,searchstr)
{var searchquery=take('searchquery').n.value;var expression="",SB="",AU="",TI="",PY="";if(searchquery.indexOf('[NI]')!=-1)
{SB=searchquery.substring(searchquery.indexOf('[NI]')+4,searchquery.indexOf('[/NI]'));if((SB.indexOf('X')!=-1)||(SB.indexOf('Х')!=-1)||(SB.indexOf('(')!=-1)||(SB.indexOf(')')!=-1)||(SB.indexOf('[')!=-1)||(SB.indexOf(']')!=-1))
SB="";}
if(searchquery.indexOf('[RP]')!=-1)
AU=searchquery.substring(searchquery.indexOf('[RP]')+4,searchquery.indexOf('[/RP]'));if(searchquery.indexOf('[TITL]')!=-1)
TI=searchquery.substring(searchquery.indexOf('[TITL]')+6,searchquery.indexOf('[/TITL]'));if(searchquery.indexOf('[PY]')!=-1)
PY=searchquery.substring(searchquery.indexOf('[PY]')+4,searchquery.indexOf('[/PY]'));PY=PY.replace(/\[/g,'');PY=PY.replace(/\]/g,'');if((PY.indexOf('#')!=-1)||(PY.indexOf('|')!=-1))
{PY="";}
else
{if(isNaN(parseInt(PY)))
{PY="";}}
var AND="";if(abis=="OPAC")
{if(AU!="")
{AU=AU.replace(/\(/g,'\\(');AU=AU.replace(/\)/g,'\\)');if(sigla.toUpperCase()=='ЦНМБ')
expression+='(RP '+replaceSymb3(AU)+')';else if((sigla.toUpperCase()=='АСТРАХАНСКАЯ ОНБ')||(sigla.toUpperCase()=='Б СДС МОСКВА'))
expression+='(AC '+replaceSymb3(AU)+')';else
expression+='(AU '+replaceSymb3(AU)+')';AND=" AND ";}
if(TI!="")
{TI=TI.replace(/\(/g,'\\(');TI=TI.replace(/\)/g,'\\)');if(sigla=='ЦНМБ')
expression+=AND+'(TITL '+replaceSymb3(TI)+')';else
expression+=AND+'(TI '+replaceSymb3(TI)+')';AND=" AND ";}
if(PY!="")
{expression+=AND+"(PY '"+PY+"')";}
var today=new Date();var ParmScr="menubar=no,width="+(screen.width-12)+",height="+(screen.height-130)+",left=0,top=0,resizable=yes,toolbar=no,location=no,scrollbars=yes,directories=no,status=yes";var tmp=/\[d\]/g;if(tmp.test(searchstr))
searchstr=searchstr.replace(tmp,'$');var url=searchstr.split("?")[0];var hashstr=searchstr.split("?")[1];var ssearchstr=hashstr.split("&");var arg0=ssearchstr[0].split("=")[1];var arg1=ssearchstr[1].split("=")[1];var cgi="/cgiopac";var win=window.open("","opac"+Math.floor(Math.random()*9999)+today.getTime(),ParmScr);win.document.open();win.document.writeln('<html><head><title>OPAC-Global</title>'+'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'+'</head><body bgcolor="#FAFAF1" onload="document.forms[0].submit()">'+'<p style="color: red; font: bold 14pt serif; text-align: center">Пожалуйста, подождите...</p>'+'<form name="reg" id="reg" action="'+url+cgi+'/opacg/opac.exe" method="post">'+'<input type="hidden" name="arg0" value="'+arg0+'"/>'+'<input type="hidden" name="arg1" value="'+arg1+'"/>'+'<input type="hidden" name="_searchstr" value="/opacg/freesearch.html?'+ssearchstr[2]+'&'+ssearchstr[3]+encodeURIComponent(expression)+'"/>'+'<input type="hidden" name="TypeAccess" value="PayAccess"/></form>'+'</body></html>');win.document.close();}
else if(abis=="OPAC2")
{if(AU!="")
{AU=AU.replace(/\(/g,'\\(');AU=AU.replace(/\)/g,'\\)');if(sigla.toUpperCase()=='ЦНМБ')
expression+='(RP '+replaceSymb3(AU)+')';else if((sigla.toUpperCase()=='АСТРАХАНСКАЯ ОНБ')||(sigla.toUpperCase()=='Б СДС МОСКВА'))
expression+='(AC '+replaceSymb3(AU)+')';else
expression+='(AU '+replaceSymb3(AU)+')';AND=" AND ";}
if(TI!="")
{TI=TI.replace(/\(/g,'\\(');TI=TI.replace(/\)/g,'\\)');if(sigla=='ЦНМБ')
expression+=AND+'(TITL '+replaceSymb3(TI)+')';else
expression+=AND+'(TI '+replaceSymb3(TI)+')';AND=" AND ";}
if(PY!="")
{expression+=AND+"(PY '"+PY+"')";}
window.open(searchstr+encodeURIComponent(expression),"");}
else if(abis=="WLIB")
{var expression="";if(AU!="")
{AU=AU.replace(/\(/g,'');AU=AU.replace(/\)/g,'');AU+=" ";expression+=replaceSymb(AU);}
if(TI!="")
{TI=TI.replace(/\(/g,'');TI=TI.replace(/\)/g,'');TI+=" ";expression+=replaceSymb(TI);}
if(PY!="")
{expression+=PY;}
window.open(searchstr+encodeURIComponent(expression),"");}
else if(abis=="WLIB1")
{if(AU!="")
{AU=AU.replace(/\(/g,'');AU=AU.replace(/\)/g,'');AU=replaceSymb3(AU);expression+='&AC='+encodeURIComponent(AU);}
if(TI!="")
{TI=TI.replace(/\(/g,'');TI=TI.replace(/\)/g,'');TI=replaceSymb3(TI);expression+='&TI='+encodeURIComponent(TI);}
if(PY!="")
{expression+='&PY='+PY;}
window.open(searchstr+expression,"");}
else if(abis=="VGBIL")
{var expression=searchstr;var myids=take('myids').n.value.split('[SIGLA]');var ind=myids[0].substring(myids[0].lastIndexOf('-')+1);expression+=ind;window.open(expression,"");}
else if(abis=="BEN")
{var expression=searchstr;window.open(expression,"");}
else if(abis=="SAMARA")
{var expression=searchstr;var str="";var v0="&tag_100a,700a=",v1="&tag_245a=",v2="&tag_260c=";if(AU!="")
v0+=encodeVal(AU);if(TI!="")
v1+=encodeVal(TI);if(PY!="")
{v2+=PY;}
str=v0+v1+v2;window.open(expression+str,"");}
else if((abis=="ALEF")||(abis=="SIGLA"))
{var expression=searchstr;var str="";var v0="&v0=",v1="&v1=",v2="&v2=",ys="&ys=",ye="&ye=";if(SB!="")
v0+=SB;if(AU!="")
v1+=encodeVal(AU);if(TI!="")
v2+=encodeVal(TI);if(PY!="")
{ys+=PY;ye+=PY;}
str=v0+v1+v2+ys;window.open(expression+str,"");}
else if(abis=="ALANIA")
{var expression=searchstr;var str="";var par1_value="&par1_value=",par3_value="&par3_value=",par5_value="&par5_value=";if(AU!="")
par1_value+=encodeVal(AU);if(TI!="")
par3_value+=encodeVal(TI);if(PY!="")
{par5_value+=PY;}
str=par1_value+par3_value+par5_value;window.open(expression+str,"");}
else if(abis=="PRIMO")
{var expression=searchstr;var str="";var v0="&vl(freeText0)=",v1="&vl(boolOperator0)=AND",v2="&vl(freeText1)=",ys="&vl(boolOperator1)=AND",ye="&vl(freeText2)=";if(AU!="")
v0+=encodeVal(AU);if(TI!="")
v2+=encodeVal(TI);if(PY!="")
{ye+=PY;}
str=v0+v1+v2+ys+ye;window.open(expression+str,"");}
else if(abis=="KPRSL")
{var expression=searchstr;var str="";var v0="&TIP=",v1="";if(TI!="")
v0+=encodeVal(TI);if(PY!="")
{v1+="&PY="+PY;}
str=v0+v1;window.open(expression+str,"");}
else if(abis=="IRBIS")
{var expression=searchstr;var str="";var AND="";if(SB!="")
{str+="(<.>B="+SB+"<.>)";AND='%2B';}
if(AU!="")
{str+=AND+"(<.>A="+encodeVal(AU)+"$<.>)";AND='*';}
if(TI!="")
{str+=AND+"(<.>T="+encodeVal(TI)+"$<.>)";AND='*';}
if(PY!="")
{str+=AND+"(<.>G="+PY+"$<.>)";}
expression+=str;window.open(expression,"");}
else if(abis=="IRBIS2")
{var expression=searchstr;window.open(expression,"");}
else if(abis=="IRBIS1")
{var expression=searchstr;var str="";var AND="";if(AU!="")
{str+="(<.>A="+AU+"$<.>)";AND='*';}
if(TI!="")
{str+=AND+"(<.>T="+TI+"$<.>)";AND='*';}
if(PY!="")
{str+=AND+"(<.>G="+PY+"$<.>)";}
expression+=str;window.open(expression,"");}
else if(abis=="IRBIS3")
{var expression=searchstr;var str="";if(AU!="")
{str+="&term_1="+encodeVal(AU);}
if(TI!="")
{str+="&term_2="+encodeVal(TI);}
if(PY!="")
str+="&term_3="+PY;expression+=str;window.open(expression,"");}
else if(abis=="FOLIANT")
{var expression=searchstr;var str="";if(AU!="")
{str+="&DATA0="+encodeVal(AU);}
if(TI!="")
{str+="&DATA1="+encodeVal(TI);}
if(PY!="")
str+="&DATA2="+PY;expression+=str;window.open(expression,"");}
else if(abis=="MARC")
{var expression=searchstr;var str="";if(AU!="")
{str+="&T1="+encodeVal(AU);}
if(TI!="")
{str+="&T2="+encodeVal(TI);}
if(PY!="")
str+="&T3="+PY;expression+=str;window.open(expression,"");}
else if(abis=="BIBCOM")
{var expression=searchstr;var str="";if(AU!="")
{str+="criteria=and.author.words."+encodeVal(AU);}
if(TI!="")
{str+="&criteria=and.title.words."+encodeVal(TI);}
expression+=str;window.open(expression,"");}
else if(abis=="MCBS")
{var expression=searchstr;window.open(expression,"");}
else if(abis=="RCOIT")
{var expression=searchstr;var str="";if(AU!="")
{AU="&arrFilter_pf"+encodeVal("[OUTPUT_AUTHORS]")+"="+encodeVal(AU);str+=AU;}
if(TI!="")
{TI="&arrFilter_ff"+encodeVal("[NAME]")+"="+encodeVal(TI);str+=TI;}
if(PY!="")
{PY="&arrFilter_pf"+encodeVal("[YEAR]")+"="+encodeVal(PY);str+=PY;}
expression+=str;window.open(expression,"");}
else if(abis=="RUSLAN")
{var expression=searchstr;window.open(expression,"");}
else if(abis=="FOXPRO")
{var expression=searchstr;window.open(expression,"");}
else if(abis=="ASBIBL3")
{var expression=searchstr;window.open(expression,"");}
else if(abis=="UBONLINE")
{var expression=searchstr;window.open(expression,"");}
else if(abis=="ABSOTEK")
{var expression=searchstr;window.open(expression,"");}
else if(abis=="MARC1")
{var expression=searchstr;var str="";if(AU!="")
{AU="author="+encodeVal(AU);str+=AU;}
if(TI!="")
{TI="&title="+encodeVal(TI);str+=TI;}
if(PY!="")
{PY="&data="+encodeVal(PY);str+=PY;}
expression+=str;window.open(expression,"");}
else if(abis=="CNSHB")
{var expression=searchstr;var str="";var ID="";if(searchquery.indexOf('[ID]')!=-1)
ID=searchquery.substring(searchquery.indexOf('[ID]')+4,searchquery.indexOf('[/ID]'));if(ID!="")
str+="&trn="+ID;if(AU!="")
{AU="&au="+AU;str+=AU;}
if(TI!="")
{TI="&ti="+TI;str+=TI;}
if(PY!="")
{PY="&ya="+PY;str+=PY;}
expression+=str;window.open(expression,"");}
else if(abis=="PRLIB")
{var expression=searchstr;var str='<?xml version="1.0" encoding="utf-16"?><query version="1.0">';if(AU!="")
str+='<param name="AUTHR" oper="~" logic="and">'+AU+'</param>';if(TI!="")
str+='<param name="ALL" oper="~" logic="and">'+TI+'</param>';str+='</query>';expression+=encodeVal(str);window.open(expression,"");}
else
return;}
function showLable(o)
{typework="search";swfterm="";var lab=o.className;var db=numDB;if(typeof _localiddb!="undefined")
db=_iddb;if(typeof dbs[db]["labels"][lab]=="undefined")
{if(lab=="RP")
lab="AC";if(lab=="TM")
lab="SH";}
var labtext=dbs[db]["labels"][lab][0];var howmuch=portion;var startfrom=0;var handler="html/search.php";var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["search"].directory+'/search.php']);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);querylist.push(["_start",startfrom]);querylist.push(["start",startfrom]);querylist.push(["$length",howmuch]);querylist.push(["length",howmuch]);if(typeof $lastdb!="undefined")
numDB=$lastdb;querylist.push(["iddb",numDB]);var term=o.firstChild.nodeValue;term=replaceSymb(term);term=prepareStr(term);if(term.indexOf('(')!=-1)
term="[apos]"+term+"[/apos]";var showstr=prepareStr("<i>"+labtext+" </i>"+term);var str="[bracket]"+lab+" "+term+"[/bracket]";showstr=prepareShowstring(showstr);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);term=prepareTerm(str);var outfrm=outform;var ndb=numDB;if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
ndb=_iddb;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
querylist.push(["query/body",term]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function historySearch(ind)
{typework="search";var gArr=new Array();var querylist=new Array();var str=showstr=etb=handler="";var stri=take('str'+ind);var showstri=prepareStr(take('showstr'+ind));var etbi=take('etb'+ind);var outformi=take('outf'+ind);var handleri=take('hand'+ind);var outfrm=outform;if(stri.n!=null)
{str=stri.n.innerHTML;if((showstri.n!=null)&&(showstri.n.innerHTML!=""))
{showstr=prepareStr(showstri.n.innerHTML);}}
if(etbi.n!=null)
{numDB=etbi.n.innerHTML.substring(0,etbi.n.innerHTML.indexOf(':'));etb=etbi.n.innerHTML.substring(etbi.n.innerHTML.indexOf(':')+1);}
if(handleri.n!=null)
handler=handleri.n.innerHTML;showstr=prepareShowstring(showstr);gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);if(typeof _localiddb!="undefined")
querylist.push(["iddb",_localiddb]);else
querylist.push(["iddb",numDB]);querylist.push(["_start",0]);querylist.push(["start",0]);querylist.push(["_history","yes"]);querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);if((typeof dbs[numDB]!="undefined")&&(typeof dbs[numDB].outform!="undefined"))
outfrm=dbs[numDB].outform;if(outformi.n!=null)
if(outformi.n.innerHTML!="")
outfrm=outformi.n.innerHTML;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
str=brackets(str);querylist.push(["query/body",prepareTerm(str)]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function showSee2Win(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var div=take('see'+_tmp);div.n.innerHTML="";if(response[0]._indx_0!=null)
{var j=0;for(var key in response[0])
{if(key.indexOf('indx_')!=-1)
{var value=response[0][key];var item=value._item.split('[Y]');if(replaceSymb(item[0])==_tmp)
{var span=div.create('span',{id:replaceSymb(value._item),className:'see',data:'Всего выпусков: '+value._size,onmousedown:'function(){showIssues(this)}'});span.create('b',{textNode:item[1]});span.text(' г.');span.create('i',{className:'comma'});div.create('div',{className:'issuediv',style:{display:'none'}});}
else
break;}
j++;}
if(j==0)
div.create('p',{textNode:'В базе данных не найдены библиографические записи на отдельные тома/выпуски данного издания',style:{textAlign:'center'}});}
else
{div.create('p',{textNode:'В базе данных не найдены библиографические записи на отдельные тома/выпуски данного издания',style:{textAlign:'center',margin:'40px 0 0 0'}});}}}
function showIssuesWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var div=take(_tmp).n.nextSibling;div.innerHTML="";var j=0;for(var key in response[0])
{if(key.indexOf('_result_')!=-1)
{var value=response[0][key];var ind=value._id;var item=value._ISSUE_0[0].split('[TULTIP]');var span=take(div).create('span',{id:'_'+replaceSymb(ind),className:'issue',data:item[1],onmousedown:'function(){showRecords(this)}'});if(item[0]!="")
span.create('b',{textNode:item[0]});else
span.create('b',{textNode:item[1]});span.create('i',{className:'comma'});take(div).create('div',{className:'recdiv',style:{display:'none'}});j++;}}}}
function showRecordsWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var next=take(_tmp).n.nextSibling;var div=take(next);div.n.innerHTML="";var tab=div.create('div',{className:'table'});var row=tab.create('div',{className:'row'});var td4=row.create('div',{className:'td w88x vtop'});var td5=row.create('div',{className:'td vtop p10x'});var slids=[];var imgsrc="";for(var key in response[0])
{if(key.indexOf('_result_')!=-1)
{var value=response[0][key];var ind=value._id;var rdb=value._sourceIddb;var arrcont=value._SHOTFORM_0._content_0;var arr=[];if(typeof _linkstring!="undefined")
{arr=value._LINEORD_0;}
for(var i=0;i<arrcont.length;i++)
{var atext=arrcont[i];var tmp=/\[divshotformicons\].*\[\/divshotformicons\]/i;if(tmp.test(atext))
atext=atext.replace(tmp,'');atext=parseBB(atext);if(i==0)
{var outfrm=outform;if(typeof dbs[numDB].outform!="undefined")
outfrm=dbs[numDB].outform;if(outfrm=='SHOTFRM')
{td5.n.innerHTML+='<u class="fstr f120 lh140" title="подробнее" onmousedown=addSee(\''+replaceSlash(ind)+'\')>'+atext+'</u>';}
else
td5.n.innerHTML+='<div class="fstr">'+atext+'</div>';}
else if(i==1)
{td5.n.innerHTML+='<code>'+atext+'</code>';}
else
{if(arrcont[i].indexOf('[CONTENT]')!=-1)
{slids.push(arrcont[i].substring(9));}}}
for(var arg in value._SHOTFORM_0)
{if(arg.indexOf('_action_')!=-1)
{var val=value._SHOTFORM_0[arg];if(val._id=="SEEF")
{if(val._title.indexOf('Первый МГМУ')==-1)
{if(val._arg.indexOf('Оригинал')==-1)
{var ps=td5.create('div',{className:'pt10x'});ps.create('a',{id:ind+'articles',className:'SEEF',textNode:val._title,href:'javascript: SeeF(\''+replaceSymb(val._arg)+'\')'});}}}
if(val._id=='IMG')
{imgsrc=val._arg;}}}
if(arr.length>0)
{for(var i=0;i<arr.length;i++)
{if(arr[i]!="")
{var p=td5.create('p',{className:arr[i],style:{display:'none'}});var span=p.create('span',{style:{fontSize:'100%',marginLeft:'0px'},className:'url',onmousedown:'function () {showOrderWin(this,\''+rdb+'\',\''+replaceSlash(ind)+'\');}'});if(arr[i]=="043")
span.text("Заказ документа");if(arr[i]=="044")
span.text("Просмотр документа");if(arr[i]=="058")
span.text("Показать онлайн");if(arr[i]=="059")
span.text("Заказать онлайн доступ");}}}
if(imgsrc!="")
{var fig=td4.create('figure',{tabindex:'1'});fig.create('img',{border:'0',hSpace:'0',vSpace:'0',alt:'',title:'',src:imgsrc});}
else
{var s4=td4.create('span');var c4=s4.create('cite');var s41=c4.create('span',{tabIndex:'1',className:'book'});var u4=s41.create('ul',{className:'paperback_front'});u4.create('li');var u41=s41.create('ul',{className:'ruled_paper'});u41.create('li');u41.create('li');u41.create('li');u41.create('li');u41.create('li');var u42=s41.create('ul',{className:'paperback_back'});u42.create('li');}
if(slids.length>0)
{var span=td4.create('span',{className:'titleslides',onclick:'function(){showSlidesCont(this)}'});for(var i=0;i<slids.length;i++)
{span.create('input',{type:'hidden',name:'tab',value:slids[i]});}}}}
verifyLink(next);preloadImages(imgsrc);}}
function showArticlesWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var doc=take('issueswinform');doc.n.innerHTML="";var j=0;var cls="";if(parseInt(response[0]._size,10)>0)
{for(var key in response[0])
{if(key.indexOf('_result_')!=-1)
{var value=response[0][key];var ind=value._id;var arr=value._SHOTFORM_0._content_0;if((j%2)==0)
cls='searchrez1';else
cls='searchrez';var div=doc.create('div',{className:cls,style:{padding:'10px'}});for(var i=0;i<arr.length;i++)
{var atext=arr[i];var tmp=/\[divshotformicons\].*\[\/divshotformicons\]/i;if(tmp.test(atext))
atext=atext.replace(tmp,'');if(i==0)
{div.create('div',{className:'fleft',textNode:(j+1)+'. '+atext});}
else
{if(atext!="")
div.create('div',{textNode:atext});}}
j++;}}
doc.n.innerHTML=parseBB(doc.n.innerHTML);}
else
{doc.create('p',{textNode:'В базе данных не найдены библиографические записи на отдельные статьи/части данного выпуска/тома',style:{textAlign:'center',margin:'40px 0 0 0'}});}}}
function showArticles(obj)
{typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:MetaView"]);querylist.push(["_version","2.3.0"]);querylist.push(["session",numsean]);querylist.push(["iddb",numDB]);querylist.push(["action","SEEF"]);querylist.push(["id",obj]);querylist.push(["outformList[0]/outform","SHOTFORM"]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);var arg={};arg.cls='dialog2';arg.message="Статьи/части";showLayerWin('issueswin',arg);ajaxToRCP(gArr,showArticlesWin);}
function showRecords(o)
{typework="";if(o.nextSibling.style.display=='none')
{if(o.nextSibling.innerHTML=='')
{o.nextSibling.innerHTML='<div class="progress small"><div></div></div>';var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);querylist.push(["start",0]);querylist.push(["length",portion]);querylist.push(["iddb",numDB]);querylist.push(["outformList[0]/outform","SHOTFORM"]);if(typeof _linkstring!="undefined")
querylist.push(["outformList[1]/outform","LINEORD"]);querylist.push(["query/body","ID "+o.id.substring(1)]);querylist.push(["$tmp",o.id]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,showRecordsWin);}
o.className+=' border';o.nextSibling.style.display='';}
else
{o.className='issue';o.nextSibling.style.display='none';}}
function showIssues(o)
{typework="";if(o.nextSibling.style.display=='none')
{if(o.nextSibling.innerHTML=='')
{o.nextSibling.innerHTML='<div class="progress small"><div></div></div>';var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);querylist.push(["start",0]);querylist.push(["length",400]);querylist.push(["iddb",numDB]);querylist.push(["outformList[0]/outform","ISSUE"]);querylist.push(["query/body","YTV "+o.id]);querylist.push(["$tmp",o.id]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,showIssuesWin);}
o.className+=' border';o.nextSibling.style.display='';}
else
{o.className='see';o.nextSibling.style.display='none';}}
function See(o,ind,act,c,rdb)
{if(ind==null)
ind=_id;if(act==null)
act=_see;var indx=replaceSymb(ind);addid="see"+indx;if(((act=="SEEF")&&(take('see'+indx).n!=null))&&((typeof dbs[numDB].seef!="undefined")&&(dbs[numDB].seef=="hierarchical")))
{if(take('see'+indx).n.style.display=='none')
{if(take('see'+indx).n.innerHTML=='')
{typework="";take('see'+indx).n.innerHTML='<div class="progress small"><div></div></div>';var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:IndexView"]);querylist.push(["_version","1.2.0"]);querylist.push(["session",numsean]);querylist.push(["label","YTV"]);querylist.push(["length",400]);querylist.push(["iddb",numDB]);querylist.push(["query",ind]);querylist.push(["$tmp",indx]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,showSee2Win);}}
showHide2(o,addid);}
else
{typework="search";var howmuch="";var startfrom="";lockedfilters="";if(c==null)
{howmuch=portion;startfrom=0;}
else
{howmuch=_length;startfrom=parseInt(howmuch,10)*(parseInt(c,10)-1);}
if(ind==null)
ind=$id;if(act==null)
act=$see;var handler=modules["search"].directory+'/search.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:MetaView"]);querylist.push(["_version","2.3.0"]);querylist.push(["session",numsean]);var str=prepareStr(_str);var showstr=prepareStr(_showstr);str=replaceSymb(str);showstr=prepareShowstring(showstr);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);querylist.push(["_history","yes"]);querylist.push(["_start",startfrom]);querylist.push(["$length",howmuch]);querylist.push(["$see",act]);querylist.push(["$id",indx]);querylist.push(["$stopfilters","yes"]);var db=numDB;if((typeof rdb!="undefined")&&(rdb!=""))
{querylist.push(["$lastdb",numDB]);db=rdb;}
querylist.push(["iddb",db]);querylist.push(["id",ind]);querylist.push(["start",startfrom]);querylist.push(["length",howmuch]);querylist.push(["action",act]);var outfrm=outform;var ndb=numDB;if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
ndb=_iddb;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,db)]);callToRCP(gArr);}}
function SeeF(act)
{act=act.replace(/\[quot\]/gi,'"');act=act.replace(/\[apos\]/gi,"'");act=act.replace(/\[backslash\]/gi,"\\\\");if(act.indexOf('RELATION')!=-1)
{showArticles(act);}
else
{typework="search";lockedfilters="";var handler=modules["search"].directory+'/search.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:MetaView"]);querylist.push(["_version","2.3.0"]);querylist.push(["session",numsean]);var str=prepareStr(_str);var showstr=prepareStr(_showstr);str=replaceSymb(str);showstr=prepareShowstring(showstr);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);querylist.push(["_history","yes"]);querylist.push(["$see","SEEF"]);querylist.push(["$stopfilters","yes"]);querylist.push(["$length",400]);querylist.push(["_start",0]);querylist.push(["iddb",numDB]);querylist.push(["action","SEEF"]);querylist.push(["id",act]);var outfrm=outform;var ndb=numDB;if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
ndb=_iddb;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}}
function See8(ind,rdb)
{typework="search";lockedfilters="";var handler=modules["search"].directory+'/search.php';var indx=replaceSymb(ind);var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error3"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);querylist.push(["$stopfilters","yes"]);querylist.push(["_start",0]);querylist.push(["$length",portion]);var db=numDB;if((typeof rdb!="undefined")&&(rdb!=""))
{db=rdb;}
querylist.push(["iddbIds[0]/iddb",db]);querylist.push(["iddbIds[0]/id",indx]);var outfrm=outform;var ndb=numDB;if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
ndb=_iddb;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
var str=prepareStr(_str);var showstr=prepareStr(_showstr);str=replaceSymb(str);showstr=prepareShowstring(showstr);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);querylist.push(["$see","SEE8"]);querylist.push(["_history","yes"]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,db)]);var trg=self;if(parent.take('recordswin'+''+(parent.countwin-1)).n==null)
{var arg={'cls':'dialog2','target':self,'message':'ПРОСМОТР ЗАПИСЕЙ','divframe':'1','forlinks':'1'};showLayerWin('recordswin',arg);self.frames[0].document.open();self.frames[0].document.close();trg=self.frames[0];}
callToRCP(gArr,trg);}
function seePlace(o,ind,c,rdb)
{typework="";addid="place"+c;if(take(addid).n.style.display=='none')
{if(take(addid).n.innerHTML=='')
{take(addid).n.innerHTML='<div class="progress small"><div></div></div>';var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacholdd:MoveCopies"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);var db=numDB;if((typeof rdb!="undefined")&&(rdb!=""))
{db=rdb;}
querylist.push(["iddb",db]);querylist.push(["idbr",ind]);querylist.push(["copyform","SEE7BB"]);querylist.push(["writeoff","false"]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,db)]);ajaxToRCP(gArr,displayPlace);}}
showHide2(o,addid);}
function displayPlace(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var str="";var count=0;var obj1={};var div=take(addid);for(var key in response[0])
{var value=response[0][key];if(key.indexOf('copies_')!=-1)
{obj1[count]={};obj1[count].COPYINFO="";for(var arg in value)
{var val=value[arg];if(arg.indexOf('_inventory')!=-1)
obj1[count].INVENTORY=val;if(arg.indexOf('_barcode')!=-1)
obj1[count].CODE=val;if(arg.indexOf('_location')!=-1)
obj1[count].STATUS=val;if(arg.indexOf('_copyinfo')!=-1)
{obj1[count].COPYINFO=val[0];}}
count++;}}
if(count>0)
{for(var i=0;i<count;i++)
{str+='<div class="w100 f80 p10x"><b>'+(i+1)+'. Статус </b>: <span class="red">'+obj1[i].STATUS+'</span></div>';str+='<div class="table w100">';str+='<div class="row b bge"><div class="td f80 w30 p10x">Инвентарный номер</div><div class="td f80 w30 p10x">Код</div><div class="td f80 p10x">Сведения об экземпляре</div></div>';str+='<div class="row b1e"><div class="td f80 w30 p10x">'+obj1[i].INVENTORY+'</div><div class="td f80 w30 p10x">'+obj1[i].CODE+'</div><div class="td f80 p10x">'+parseBB(obj1[i].COPYINFO)+'</div></div>';str+='</div>';}}
else
{str+='<div class="acenter f80 p20x">Экземпляры не найдены</div>';}
div.n.innerHTML=str;}
addid="";}
function seeBibcard(o,ind,c,rdb)
{typework="";addid="bib"+c;if(take(addid).n.style.display=='none')
{if(take(addid).n.innerHTML=='')
{take(addid).n.innerHTML='<div style="position:absolute;top:0" class="progress small"><div></div></div>';var db=numDB;if((typeof rdb!="undefined")&&(rdb!=""))
{db=rdb;}
var gArr=new Array();gArr.push(["userId",identif]);gArr.push(["session",numsean]);gArr.push(["_xsl","/"+foldername+"/"+foldername+"/html/_modules/search/_output/xsl/bibcard.xsl"]);gArr.push(["_errorXsl","/"+foldername+"/"+foldername+"/html/_modules/search/_output/xsl/error.xsl"]);gArr.push(["_service","STORAGE:opacfindd:FindView"]);gArr.push(["_version","2.3.0"]);gArr.push(["outformList[0]/outform","bibcard"]);gArr.push(["outformList[0]/bibcardType","formatted"]);gArr.push(["outformList[0]/bibcardName","base"]);gArr.push(["iddbIds[0]/iddb",db]);var tmp=/\\{1,}/g;if(tmp.test(ind))
ind=ind.replace(tmp,'\\');gArr.push(["iddbIds[0]/id",ind]);take(addid).create('iframe',{name:ind+'frame',id:ind+'frame',style:{width:'520px',height:'330px',border:'0',frameBorder:'0',marginWidth:'0',marginHeight:'0',scrolling:'no'},src:'about:blank'});self.frames[ind+'frame'].document.open();self.frames[ind+'frame'].document.close();callToRCP(gArr,self.frames[ind+'frame'],"/cgiopac/opacg/direct.exe");}}
showHide2(o,addid);}
function reSize(y)
{var div=take(addid);var ifr=div.n.lastChild;try
{div.n.innerHTML=ifr.contentDocument.getElementById('cont').innerHTML;}
catch(e){}
addid="";}
function seeAdd(o,ind,c,rdb)
{typework="";addid="add"+c;if(take(addid).n.style.display=='none')
{if(take(addid).n.innerHTML=='')
{take(addid).n.innerHTML='<div class="progress small"><div></div></div>';var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.3.0"]);querylist.push(["session",numsean]);var tmp=/\\{1,}/g;if(tmp.test(ind))
ind=ind.replace(tmp,'\\');querylist.push(["iddbIds[0]/id",ind]);var db=numDB;if((typeof rdb!="undefined")&&(rdb!=""))
{db=rdb;}
querylist.push(["iddbIds[0]/iddb",db]);var dboutff=outformfull;if((typeof dbs[db]!="undefined")&&(typeof dbs[db].outformfull!="undefined"))
dboutff=dbs[db].outformfull;querylist.push(["outform",dboutff]);querylist.push(["_history","yes"]);querylist.push(["$iddb",db]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,db)]);ajaxToRCP(gArr,displayAdd);}}
showHide2(o,addid);}
function displayAdd(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError('ajax');}
else
{var dboutff=outformfull;if((typeof dbs[_iddb]!="undefined")&&(typeof dbs[_iddb].outformfull!="undefined"))
dboutff=dbs[_iddb].outformfull;var outf=eval('response[0]._result_0._'+dboutff+'_0');if(outf!=null)
{var str="";var arr=outf;for(var i=0;i<arr.length;i++)
{if(arr[i]!="")
{var term=arr[i];var pref=postf="";if(term.indexOf('<')!=-1)
{term=term.replace(/</,' ');term=term.replace(/>/,' ');pref='<b>'+term.substring(0,term.indexOf(':')+1)+'</b>';postf=term.substring(term.indexOf(':')+1);term="";}
str+='<p>'+pref+term+postf+'</p>';}}
take(addid).n.innerHTML=parseBB(str);}}}
function seeAddS(o)
{var doc=o.nextSibling;if(doc.style.display=="none")
{o.className=(o.className=='seeadd')?'seeaddaktive':'seeaddaktive1';doc.style.display="";}
else
{o.className=(o.className=='seeaddaktive')?'seeadd':'seeadd1';doc.style.display="none";}}
var culttype='CULTURE';function addSeeCulture(ind,rdb)
{typework="search";lockedfilters="";var handler=modules["collection"].directory+'/culture.php';if(typeof rdb!="undefined")
numDB=rdb;var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);var start=0;if(typeof _start!="undefined")
start=_start;querylist.push(["_start",start]);var str=prepareStr(_str);var showstr=prepareStr(_showstr);str=replaceSymb(str);showstr=prepareShowstring(showstr);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);querylist.push(["iddbIds[0]/id",ind]);querylist.push(["iddbIds[0]/iddb",numDB]);querylist.push(["_iddb",numDB]);querylist.push(["$iddb",numDB]);querylist.push(["$outform","COLLECTION"]);querylist.push(["outformList[0]/outform","SHOTFRM"]);querylist.push(["outformList[1]/outform","CULTURE"]);querylist.push(["outformList[2]/outform","FULLFRMARC"]);querylist.push(["outformList[3]/outform","UNIMARC"]);querylist.push(["$stopfilters","yes"]);querylist.push(["$culttype",culttype]);querylist.push(["_history","yes"]);gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function showFormatСC(o)
{switch(o)
{case'RUSMARC':take('rusmarc_output').show();take('archive_output').hide();take('full_output').hide();take('bfirst').n.onclick=function(){showFormatСC('FULLFRMARC');};take('bfirst').n.value="Полное описание";take('bsecond').n.onclick=function(){showFormatСC('CULTURE');};take('bsecond').n.value="Описание объекта культуры";take('formattitle').n.innerHTML="RUSMARC";culttype='RUSMARC';break;case'FULLFRMARC':take('rusmarc_output').hide();take('archive_output').hide();take('full_output').show();take('bfirst').n.onclick=function(){showFormatСC('RUSMARC');};take('bfirst').n.value="RUSMARC";take('bsecond').n.onclick=function(){showFormatСC('CULTURE');};take('bsecond').n.value="Описание объекта культуры";take('formattitle').n.innerHTML="Полное описание";culttype='FULLFRMARC';break;case'CULTURE':take('rusmarc_output').hide();take('archive_output').show();take('full_output').hide();take('bfirst').n.onclick=function(){showFormatСC('RUSMARC');};take('bfirst').n.value="RUSMARC";take('bsecond').n.onclick=function(){showFormatСC('FULLFRMARC');};take('bsecond').n.value="Полное описание";take('formattitle').n.innerHTML="Описание объекта культуры";culttype='CULTURE';break;default:break;}}
function showItemСC(i,arg)
{showFormatСC(culttype);typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);var arr=arg.split("[END]");for(var j=0;j<arr.length;j++)
{querylist.push(["_service","STORAGE:opacfindd:MetaView"]);querylist.push(["_version","2.0.0"]);querylist.push(["session",numsean]);querylist.push(["iddb",numDB]);querylist.push(["action","SEEF"]);querylist.push(["id",replaceS(arr[j])]);querylist.push(["$ind","alinkss"]);querylist.push(["outformList[0]/outform","SHOTFRM"]);querylist.push(["_history","yes"]);gArr.push(["querylist",prepareQueryString(querylist)]);querylist.length=0;}
ajaxToRCP(gArr,callbackShowItemСC);}
function callbackShowItemСC(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var div=take(_ind);div.n.innerHTML="";var size=parseInt(response[0]._size,10);if(size>0)
{for(var j=0;j<response.length;j++)
{for(var key in response[j])
{if(key.indexOf('_result_')!=-1)
{var value=response[j][key];var ind=replaceSymb(value._id);var arrcont=value._SHOTFRM_0;for(var i=0;i<arrcont.length;i++)
{if(i==0)
{var text=arrcont[i].replace(/\[b\]/gi,'');text=text.replace(/\[\/b\]/gi,'');div.create('p',{textNode:text,className:'b u red',onclick:'function(){addSeeCulture("'+ind+'")};'});break;}}}}}
take('incdiv').show();}}}
var coltype='COLLECTION';function addSeeCollection(ind,rdb)
{typework="search";lockedfilters="";var handler=modules["collection"].directory+'/collection.php';if(typeof rdb!="undefined")
numDB=rdb;var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);var start=0;if(typeof _start!="undefined")
start=_start;querylist.push(["_start",start]);var str=prepareStr(_str);var showstr=prepareStr(_showstr);str=replaceSymb(str);showstr=prepareShowstring(showstr);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);querylist.push(["iddbIds[0]/id",ind]);querylist.push(["iddbIds[0]/iddb",numDB]);querylist.push(["_iddb",numDB]);querylist.push(["$iddb",numDB]);querylist.push(["$outform","COLLECTION"]);querylist.push(["outformList[0]/outform","SHOTFRM"]);querylist.push(["outformList[1]/outform","COLLECTION"]);querylist.push(["outformList[2]/outform","FULLFRMARC"]);querylist.push(["outformList[3]/outform","UNIMARC"]);querylist.push(["$stopfilters","yes"]);querylist.push(["$coltype",coltype]);querylist.push(["_history","yes"]);gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function showFormatС(o)
{switch(o)
{case'RUSMARC':take('rusmarc_output').show();take('archive_output').hide();take('full_output').hide();take('bfirst').n.onclick=function(){showFormatС('FULLFRMARC');};take('bfirst').n.value="Полное описание";take('bsecond').n.onclick=function(){showFormatС('COLLECTION');};take('bsecond').n.value="Описание коллекции";take('formattitle').n.innerHTML="RUSMARC";coltype='RUSMARC';break;case'FULLFRMARC':take('rusmarc_output').hide();take('archive_output').hide();take('full_output').show();take('bfirst').n.onclick=function(){showFormatС('RUSMARC');};take('bfirst').n.value="RUSMARC";take('bsecond').n.onclick=function(){showFormatС('COLLECTION');};take('bsecond').n.value="Описание коллекции";take('formattitle').n.innerHTML="Полное описание";coltype='FULLFRMARC';break;case'COLLECTION':take('rusmarc_output').hide();take('archive_output').show();take('full_output').hide();take('bfirst').n.onclick=function(){showFormatС('RUSMARC');};take('bfirst').n.value="RUSMARC";take('bsecond').n.onclick=function(){showFormatС('FULLFRMARC');};take('bsecond').n.value="Полное описание";take('formattitle').n.innerHTML="Описание коллекции";coltype='COLLECTION';break;default:break;}}
function showItemС(i,arg)
{showFormatС(i);typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:MetaView"]);querylist.push(["_version","2.0.0"]);querylist.push(["session",numsean]);querylist.push(["iddb",numDB]);querylist.push(["action","SEEF"]);querylist.push(["id",replaceS(arg)]);querylist.push(["$ind","alinkss"]);querylist.push(["outformList[0]/outform","SHOTFRM"]);querylist.push(["_history","yes"]);gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,callbackShowItemС);}
function callbackShowItemС(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var div=take(_ind);div.n.innerHTML="";var size=parseInt(response[0]._size,10);if(size>0)
{for(var key in response[0])
{if(key.indexOf('_result_')!=-1)
{var value=response[0][key];var ind=replaceSymb(value._id);var arrcont=value._SHOTFRM_0;for(var i=0;i<arrcont.length;i++)
{if(i==0)
{var text=arrcont[i].replace(/\[b\]/gi,'');text=text.replace(/\[\/b\]/gi,'');div.create('p',{textNode:text,className:'b u red',onclick:'function(){addSeeCollection("'+ind+'")};'});break;}}}}
take('incdiv').show();}}}
var archtype='ARCHIVE';function addSeeArchive(ind,rdb)
{typework="search";lockedfilters="";var handler=modules["archiv"].directory+'/archiv.php';if(typeof rdb!="undefined")
numDB=rdb;var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);var start=0;if(typeof _start!="undefined")
start=_start;querylist.push(["_start",start]);var str=prepareStr(_str);var showstr=prepareStr(_showstr);str=replaceSymb(str);showstr=prepareShowstring(showstr);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);querylist.push(["iddbIds[0]/id",ind]);querylist.push(["iddbIds[0]/iddb",numDB]);querylist.push(["_iddb",numDB]);querylist.push(["$iddb",numDB]);querylist.push(["$outform","ARCHIV"]);querylist.push(["outformList[0]/outform","SHOTFORM"]);querylist.push(["outformList[1]/outform","ARCHIV"]);querylist.push(["outformList[2]/outform","FULLFRMARC"]);querylist.push(["outformList[3]/outform","UNIMARC"]);querylist.push(["$stopfilters","yes"]);querylist.push(["$archtype",archtype]);querylist.push(["_history","yes"]);gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function showItem(i,arg)
{showFormat(i);typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:MetaView"]);querylist.push(["_version","2.0.0"]);querylist.push(["session",numsean]);querylist.push(["iddb",numDB]);querylist.push(["action","SEEF"]);querylist.push(["id",replaceS(arg)]);querylist.push(["$ind","alinkss"]);querylist.push(["outformList[0]/outform","SHOTARCHIV"]);querylist.push(["outformList[1]/outform","SHOTFORM"]);querylist.push(["_history","yes"]);gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,callbackShowItem);}
function callbackShowItem(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var div=take(_ind);div.n.innerHTML="";for(var key in response[0])
{if(key.indexOf('_result_')!=-1)
{var value=response[0][key];var ind=replaceSymb(value._id);var arrcont=value._SHOTFORM_0._content_0;for(var i=0;i<arrcont.length;i++)
{if(i==0)
{var text=arrcont[i].replace(/\[b\]/gi,'');text=text.replace(/\[\/b\]/gi,'');div.create('p',{textNode:text,className:'b u red',onclick:'function(){addSeeArchive("'+ind+'")};'});break;}}}}}}
function showFormat(o)
{switch(o)
{case'RUSMARC':take('rusmarc_output').show();take('archive_output').hide();take('full_output').hide();take('bfirst').n.onclick=function(){showFormat('FULLFRMARC');};take('bfirst').n.value="Полное описание";take('bsecond').n.onclick=function(){showFormat('ARCHIVE');};take('bsecond').n.value="Архивное описание";take('formattitle').n.innerHTML="RUSMARC";archtype='RUSMARC';break;case'FULLFRMARC':take('rusmarc_output').hide();take('archive_output').hide();take('full_output').show();take('bfirst').n.onclick=function(){showFormat('RUSMARC');};take('bfirst').n.value="RUSMARC";take('bsecond').n.onclick=function(){showFormat('ARCHIVE');};take('bsecond').n.value="Архивное описание";take('formattitle').n.innerHTML="Полное описание";archtype='FULLFRMARC';break;case'ARCHIVE':take('rusmarc_output').hide();take('archive_output').show();take('full_output').hide();take('bfirst').n.onclick=function(){showFormat('RUSMARC');};take('bfirst').n.value="RUSMARC";take('bsecond').n.onclick=function(){showFormat('FULLFRMARC');};take('bsecond').n.value="Полное описание";take('formattitle').n.innerHTML="Архивное описание";archtype='ARCHIVE';break;default:break;}}
function addSee(ind)
{typework="search";if(typeof ind=="undefined")
ind=_biblid;var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["add"].directory+'/add.php']);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);var str=prepareStr(_str);var showstr=prepareStr(_showstr);ind=prepareStr(ind);str=replaceSymb(str);showstr=prepareShowstring(showstr);querylist.push(["outformList[0]/outform","FULLFRM1"]);querylist.push(["outformList[1]/outform","FULLFRM2S"]);querylist.push(["outformList[2]/outform","FULLFRM3"]);querylist.push(["outformList[3]/outform","FULLFRM4"]);querylist.push(["outformList[4]/outform","FULLFRM5"]);querylist.push(["outformList[5]/outform","FULLFRM6"]);querylist.push(["outformList[6]/outform","BIBREF"]);querylist.push(["iddbIds[0]/id",ind]);if(typeof _iddbbibl!="undefined")
numDB=_iddbbibl;querylist.push(["iddbIds[0]/iddb",numDB]);querylist.push(["$iddbbibl",numDB]);if(typeof _start!="undefined")
querylist.push(["$start",_start]);else
{if((typeof _typesearch!="undefined")&&(_typesearch=="fulltext"))
{if(typeof _prev!="undefined")
querylist.push(["$prev",_prev]);if(typeof _next!="undefined")
querylist.push(["$next",_next]);}}
querylist.push(["$showstr",showstr]);querylist.push(["$str",str]);querylist.push(["$biblid",replaceSymb(ind)]);querylist.push(["$stopfilters","yes"]);if(typeof _rubricator!="undefined")
querylist.push(["$rubricator",_rubricator]);if(typeof _rshowstr!="undefined")
querylist.push(["$rshowstr",_rshowstr]);if(typeof _filterstr!="undefined")
querylist.push(["$filterstr",_filterstr]);if(typeof _filtersids!="undefined")
querylist.push(["$filtersids",_filtersids]);if(typeof _fshowstr!="undefined")
querylist.push(["$fshowstr",_fshowstr]);querylist.push(["_history","yes"]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function ajaxSee(ind,count,rdb)
{typework="";seeid="SEE4"+count;if(take(seeid).n.style.display=='none')
{if(take(seeid).n.innerHTML=="")
{var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:MetaView"]);querylist.push(["_version","2.0.0"]);querylist.push(["session",numsean]);var db=numDB;if((typeof rdb!="undefined")&&(rdb!=""))
{db=rdb;}
querylist.push(["iddb",db]);querylist.push(["id",ind]);querylist.push(["action","SEE4"]);querylist.push(["_history","yes"]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,db)]);ajaxToRCP(gArr,displaySEE4);}
else
{take(seeid).show();take(seeid).n.previousSibling.className="add2";}}
else
{take(seeid).hide();take(seeid).n.previousSibling.className="add1";}}
function displaySEE4(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError('ajax');}
else
{if(response[0]._result_0._SEE4_0!=null)
{take(seeid).n.previousSibling.className="add2";take(seeid).show();take(seeid).n.innerHTML=response[0]._result_0._SEE4_0[0];}}}
function loadFreeUrl(o,url,rdb)
{typework="";var html="url";if(url.indexOf('/reg?WW=')!=-1)
{html="url1";}
var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html",html]);gArr.push(["_errorhtml","error1"]);querylist.push(["_service","STORAGE:opacholdd:Edd"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);var db=numDB;if(typeof rdb!="undefined")
{db=rdb;}
querylist.push(["iddb",db]);querylist.push(["idbr",replaceSymb(o)]);querylist.push(["$docurl",url]);querylist.push(["$numsean",numsean]);querylist.push(["$identif",identif]);querylist.push(["idEd",url]);querylist.push(["mode","STATIST_ONLINE"]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,db)]);callToRCP(gArr,"_blank");}
function makearr(a,s)
{arr=a.split(s);for(var i=0;i<arr.length;i++)
{if(arr[i]!="")
{if(arr[i].indexOf(s)==-1)
rez.push(arr[i]);else
rez.push(makearr(arr[i]));}}
return rez;}
function editQuery()
{var db=numDB;if(typeof _str!="undefined")
{if(typesearch=="fulltext")
{var lab=_str.substring(_str.indexOf('bracket]')+8,_str.indexOf(' '));var term=_str.substring(_str.indexOf(' ')+1,_str.indexOf('[/bracket'));var labs=take('fulltext_search').getsign('div',{className:'select'});var fields=take('fulltext_search').getsign('input',{className:'iLAB'});labs[0].lastChild.className="i"+lab;labs[0].lastChild.innerHTML=dbs[db]["labels"][lab][0];fields[0].value=term;}
else
{if(take('expand_search').n!=null)
{switchSearch("expand");var res=[];var arr=[];var tmp=/(\[\/bracket\] AND \[bracket\])|(\[\/bracket\] OR \[bracket\])|(\[\/bracket\] NOT \[bracket\])/;if(tmp.test(_str))
arr=_str.split(tmp);else
arr.push(_str);var ties=take('expand_search').getsign('div',{className:'select1'});var labs=take('expand_search').getsign('div',{className:'select'});var fields=take('expand_search').getsign('input',{className:'iLAB'});var count=fields.length;for(var i=0;i<arr.length;i++)
{if((arr[i]!="")&&(typeof arr[i]!="undefined"))
{res.push(trimBrackets(arr[i]));}}
var strres=res.join(' ');res=[];res=strres.split('|');var len=res.length;if(take('limits_'+db).n!=null)
{var limits=take('limits_'+db).getsign('div',{className:'limits_left'});for(var j=0;j<len;j++)
{var lab="";var term=prepareTerm(res[j]);term=term.Trim();var tie=term.substring(0,term.indexOf(' '));term=term.substring(term.indexOf(' ')+1);lab=term.substring(0,term.indexOf(' '));term=term.substring(term.indexOf(' ')+1);for(var i=0;i<limits.length;i++)
{if(limits[i].lastChild.className=="input")
{var lobj=take(limits[i]).tags('input');var lim=lobj[0].className;if(lim==lab)
{if(term.indexOf('BETWEEN ')!=-1)
{term=term.substring(term.indexOf(' ')+1);var tmp=term.split(',');lobj[0].value=tmp[0].substring(1,tmp[0].length-1);lobj[1].value=tmp[1].substring(1,tmp[1].length-1);}
if(term.indexOf('GE ')!=-1)
{lobj[0].value=term.substring(term.indexOf("'")+1,term.length-1);}
if(term.indexOf('LE ')!=-1)
{lobj[1].value=term.substring(term.indexOf("'")+1,term.length-1);}
take('limits_search').n.className='limits_';take('limits_'+db).show();break;}}
else
{if(limits[i].lastChild.id.indexOf('l_'+db+'_')!=-1)
{var div=take(limits[i].lastChild.id+'_opt');if(div.n!=null)
{var arr=div.tags('div');for(var k=0;k<arr.length;k++)
{var tmp=arr[k].className;var tmp1=lab+' '+term;tmp=tmp.replace(/\(/g,'');tmp=tmp.replace(/\)/g,'');if(tmp1==tmp)
{take('limits_search').n.className='limits_';take('limits_'+db).show();limits[i].lastChild.lastChild.className=arr[k].className;limits[i].lastChild.lastChild.innerHTML=arr[k].innerHTML;break;}}}}}}}}
for(var i=0;i<count;i++)
{var lab="";var term="";if(typeof res[i]!="undefined")
{term=prepareTerm(res[i]);if(i==0)
{lab=term.substring(0,term.indexOf(' '));term=term.substring(term.indexOf(' ')+1);}
else
{term=term.Trim();var tie=term.substring(0,term.indexOf(' '));term=term.substring(term.indexOf(' ')+1);lab=term.substring(0,term.indexOf(' '));term=term.substring(term.indexOf(' ')+1);if(ties.length>0)
{if(tie!="")
{ties[i-1].lastChild.className="i"+tie;ties[i-1].lastChild.innerHTML=dbs[db]["labels"][tie][0];}}}
if(typeof dbs[db]["labels"][lab]!="undefined")
{labs[i].lastChild.className="i"+lab;labs[i].lastChild.innerHTML=dbs[db]["labels"][lab][0];fields[i].value=term;}}}
editqueryflag=true;}}}}
function prepareIndxTerms()
{var str="";if(take('menu1').n!=null)
{var arr=take('menu1').tags('code');for(var i=0;i<arr.length;i++)
{str+=arr[i].id+'|'+replaceSymb(arr[i].innerHTML);if(i<arr.length-1)
str+='[END]';}}
return str;}
function prepareSavedTerms(o)
{var arr=take('expand_search').getsign('input',{className:'iLAB'});var str="";for(var i=0;i<arr.length;i++)
{if((arr[i].id!=o)&&(arr[i].value!=""))
{var lab="";if(arr[i].parentNode.previousSibling.className=='opt1')
lab=arr[i].parentNode.previousSibling.previousSibling.firstChild.lastChild.className.substring(1);else
lab=arr[i].parentNode.previousSibling.firstChild.lastChild.className.substring(1);str+='['+arr[i].id+']['+lab+']'+replaceSymb(arr[i].value);if(i<arr.length-1)
str+='[END]';}}
return str;}
function putTerms(o)
{var doc=take('menu1');var but=take('fromaftobibl');switch(o.checked)
{case true:doc.create('code',{textNode:o.value,id:'_'+o.id});if(doc.n.childNodes.length>1)
{doc.show();if(but.n!=null)
but.visualise();}
break;case false:if(take('_'+o.id).n!=null)
doc.n.removeChild(take('_'+o.id).n);if(doc.n.childNodes.length<2)
{doc.hide();if(but.n!=null)
but.conceal();}
break;default:break;}}
function addVoc()
{if(take('menu1').n.childNodes.length==1)
{alert("Выберите элемент из списка!");return;}
var andor=take('andor').n.className;var obj=take(vocobj).n;obj.value="";var arr=take('menu1').tags('code');for(var i=0;i<arr.length;i++)
{var term=arr[i].innerHTML;if((vocobj=="itemprof")||(vocobj=="itemaf"))
obj.value+=term;else
obj.value+="'"+term+"'";if(i!=(arr.length-1))
obj.value+=' '+andor+' ';}}
function searchFromAfToBibl()
{var lab=fromaftobibl[0];if(typeof prefind=="undefined")
{if((typeof _viewOptions!="undefined")&&(_viewOptions=="meshNewTree"))
lab='COD';}
vocobj="itemsimple";addVoc();if((typeof biblcounter!="undefined")&&(parseInt(biblcounter,10)>1))
{simpleSearchAll(lab);}
else
{if(typeof _iddbbibl!="undefined")
numDB=_iddbbibl;else
numDB=numdbBIBL;simpleSearch(lab);}}
function searchTerm(o)
{var lab=fromaftobibl[0];if(typeof o!="string")
{var obj=take(o).getsign('input',{type:'checkbox'})[0];if(typeof obj!="undefined")
{take('menu1').create('code',{textNode:replaceSymb(obj.value),id:'_'+obj.name});lab=obj.name;}
else
{take('menu1').create('code',{textNode:replaceSymb(o.parentNode.id),id:'_'+lab});}}
else
{if(typeof prefind=="undefined")
{if((typeof dbs[numDB]!="undefined")&&(parseInt(dbs[numDB].afrubricator,10)>1))
lab='COD';}
take('menu1').create('code',{textNode:o,id:'_'+o});}
vocobj="itemsimple";addVoc();if((typeof biblcounter!="undefined")&&(parseInt(biblcounter,10)>1))
{simpleSearchAll(lab);}
else
{if(typeof _iddbbibl!="undefined")
numDB=_iddbbibl;else
numDB=numdbBIBL;if(typeof dbs[numDB]["labels"][lab]=="undefined")
lab=fromaftobibl[0];simpleSearch(lab);}}
function searchVoc(l,t)
{var db=numDB;if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
db=_iddb;typework="search";lockedfilters="";swfterm="";t=t.replace(/\&nbsp\;/g,' ');var str=prepareStr("[bracket]"+l+" [apos]"+replaceSymb(t)+"[/apos][/bracket]");if((l=='AUIDS')||(l=='ID'))
{str=replaceSlash(str);}
var showstr=prepareStr('<i>'+dbs[db]["labels"][l][0]+'</i> '+t);showstr=prepareShowstring(showstr);var handler=modules["search"].directory+'/search.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_param","1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);querylist.push(["_start",0]);querylist.push(["start",0]);querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);var outfrm=outform;var ndb=numDB;if((typeof dbs[numDB]=="undefined")||(typeof _localiddb!="undefined"))
ndb=_iddb;if(typeof dbs[ndb].outform!="undefined")
outfrm=dbs[ndb].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
querylist.push(["iddb",numDB]);querylist.push(["query/body",prepareTerm(str)]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,db)]);callToRCP(gArr);}
function showVoc(item,label,sign)
{typework="search";var skipFirst="";var _vstr="";var query="";var start=1;var firstterm="";var indxterms="";var andor=0;var vocobj="";var savedterms="";var title="Словарь";if(item!=null)
{if(typeof _str!="undefined")
_str="";skipFirst="";if(item.nextSibling.className=="logcontainer")
vocobj=item.nextSibling.nextSibling.lastChild.firstChild.id;else
vocobj=item.nextSibling.lastChild.firstChild.id;var val=take(vocobj).n.value;if(val.indexOf("'")==0)
val=val.substring(1,val.length-1);val=replaceSymb(val);val=prepareStr(val);query=firstterm=val;if(typesearch=="expand")
savedterms=prepareSavedTerms(vocobj);}
else
{if(typeof _title!="undefined")
title=_title;andor=take('andor').n.selectedIndex;indxterms=prepareIndxTerms();start=parseInt(_start,10);vocobj=_vocobj;if(typeof _savedterms!="undefined")
savedterms=replaceSymb(_savedterms);if(sign==0)
{start=parseInt(_start,10)-portion;if(start==1)
{skipFirst="";var arr=_firstterm.split('[END]');query=firstterm=arr[0];}
else
{firstterm=_firstterm;var arr=firstterm.split('[END]');arr.pop();var newstr=arr[arr.length-1];firstterm=arr.join('[END]');query=skipFirst=newstr;}}
else
{start=parseInt(_start,10)+portion;query=skipFirst=_lastterm;firstterm=_firstterm+'[END]'+query;}}
if(label==null)
{if(item.nextSibling.className=="logcontainer")
label=item.nextSibling.nextSibling.firstChild.firstChild.lastChild.className.substring(1);else
label=item.nextSibling.firstChild.firstChild.lastChild.className.substring(1);if(label=='FT')
return;var db=numDB;if(typeof _localiddb!="undefined")
db=_iddb;if((typeof query!="undefined")&&(query==""))
_vstr='<span><i>'+dbs[db]["labels"][label][0]+'</i> ВСЕ</span>';else
_vstr='<span><i>'+dbs[db]["labels"][label][0]+'</i> '+query+'</span>';}
else
_vstr=_showstr;_vstr=prepareStr(_vstr);_vstr=prepareShowstring(_vstr);var handler=modules["voc"].directory+'/voc.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:IndexView"]);querylist.push(["_version","1.2.0"]);querylist.push(["session",numsean]);querylist.push(["$title",title]);querylist.push(["$label",label]);querylist.push(["label",label]);querylist.push(["$start",start]);querylist.push(["$showstr",_vstr]);if((typeof _str!="undefined")&&(_str!=""))
{var str=prepareStr(_str);str=replaceSymb(str);querylist.push(["$str",str]);querylist.push(["query",str]);}
else
{if((typeof query!="undefined")&&(query!=""))
{querylist.push(["query",query]);}
else
{querylist.push(["query",""]);querylist.push(["$str",""]);}}
querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["iddb",numDB]);querylist.push(["$andor",andor]);querylist.push(["$vocobj",vocobj]);if((typeof firstterm!="undefined")&&(firstterm!=""))
querylist.push(["$firstterm",replaceSymb(firstterm)]);else
querylist.push(["$firstterm",""]);querylist.push(["$typesearch",typesearch]);if(typesearch=='professional')
{var estr=take('expr').n.innerHTML;estr=estr.replace(/\"/g,'');querylist.push(["$expr",estr]);}
if(indxterms!="")
querylist.push(["$indxterms",indxterms]);if(savedterms!="")
querylist.push(["$savedterms",savedterms]);if((sign!=null)&&(skipFirst!=''))
{querylist.push(["$skipFirst","true"]);querylist.push(["skipFirst","true"]);}
if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function searchAlfabet(o,sign)
{typework="search";var skipFirst="";var _vstr="";var query="";var start=1;var firstterm="";var label="";var ndb=numDB;if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
ndb=_iddb;if(o!=null)
{query=firstterm=o.innerHTML;skipFirst="";label=take('simple_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);if(label=='FT')
label='TI';}
else
{if(typeof _label!="undefined")
label=_label;start=parseInt(_start,10);if(sign==0)
{start=parseInt(_start,10)-portion;if(start==1)
{skipFirst="";query=firstterm;}
else
{firstterm=_firstterm;var arr=firstterm.split('[END]');arr.pop();var newstr=arr[arr.length-1];firstterm=arr.join('[END]');query=skipFirst=newstr;}}
else
{start=parseInt(_start,10)+portion;query=skipFirst=_lastterm;firstterm=_firstterm+'[END]'+query;}}
if(o!=null)
_vstr='<span><i>'+dbs[ndb]["labels"][label][0]+'</i> '+o.innerHTML+'</span>';else
_vstr=_showstr;_vstr=prepareStr(_vstr);_vstr=prepareShowstring(_vstr);var handler=modules["voc"].directory+'/voc.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:IndexView"]);querylist.push(["_version","1.2.0"]);querylist.push(["session",numsean]);querylist.push(["$label",label]);querylist.push(["label",label]);querylist.push(["$start",start]);querylist.push(["$showstr",_vstr]);if((typeof query!="undefined")&&(query!=""))
{var quer=prepareStr(query);quer=replaceSymb(quer);querylist.push(["query",quer]);}
else
{querylist.push(["query",""]);}
querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["iddb",numDB]);querylist.push(["$firstterm",replaceSymb(firstterm)]);querylist.push(["$typesearch",typesearch]);if(typesearch=='profs')
{var estr=take('expr').n.innerHTML;estr=estr.replace(/\"/g,'');querylist.push(["$expr",estr]);}
if((sign!=null)&&(skipFirst!=''))
{querylist.push(["$skipFirst","true"]);querylist.push(["skipFirst","true"]);}
if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function writeRezult()
{vocobj=_vocobj;var doc=take('menu1');var but=take('fromaftobibl');if(doc.n!=null)
{if(typeof _savedterms!="undefined")
{var arr=_savedterms.split("[END]");for(var j=0;j<arr.length;j++)
{if(arr[j]!="")
{var ind=arr[j].substring(arr[j].indexOf("[")+1,arr[j].indexOf("]"));var lab=arr[j].substring(arr[j].lastIndexOf("[")+1,arr[j].lastIndexOf("]"));var term=arr[j].substring(arr[j].lastIndexOf("]")+1);var o=take(ind).n;o.value=term;var sel=null;if(o.parentNode.previousSibling.className=='opt1')
sel=o.parentNode.previousSibling.previousSibling.firstChild.lastChild;else
sel=o.parentNode.previousSibling.firstChild.lastChild;sel.className="i"+lab;sel.innerHTML=dbs[numDB]["labels"][lab][0];}}}
typevoc=true;if(typeof _expr!="undefined")
take('expr').n.innerHTML=_expr;if(doc.n.childNodes.length>1)
{doc.show();if(but.n!=null)
but.visualise();}}
showInterface();}
function Mark(o)
{var arr=take('searchrezult').getsign('input',{name:'marker'});if(o.checked)
{for(var i=0;i<arr.length;i++)
arr[i].checked=true;}
else
{for(var i=0;i<arr.length;i++)
arr[i].checked=false;}}
function Marklist(o)
{var arr=take('tableorder').getsign('input',{type:'checkbox'});if(o.checked)
{for(var i=0;i<arr.length;i++)
{arr[i].checked=true;if(arr[i].id!='mark')
arr[i].parentNode.parentNode.className='checked';}}
else
{for(var i=0;i<arr.length;i++)
{arr[i].checked=false;if(arr[i].id!='mark')
arr[i].parentNode.parentNode.className='unchecked';}}
countList();}
function countList()
{var arr=take('tableorder').getsign('input',{type:'checkbox'});var count=0;for(var i=0;i<arr.length;i++)
{if(arr[i].checked==true)
{if(arr[i].id!='mark')
{count++;arr[i].parentNode.nextSibling.innerHTML=count;arr[i].parentNode.parentNode.className="checked";}}
else
{if(arr[i].id!='mark')
{arr[i].parentNode.nextSibling.innerHTML="";arr[i].parentNode.parentNode.className="unchecked";}}}
if(take('marked').n!=null)
take('marked').n.innerHTML=count;}
function printClaim()
{if(printTab())
{var arg={'cls':'dialog2','message':'ПЕЧАТЬ ТРЕБОВАНИЙ','target':self,'callback':'printClaimStart',callbackname:'Печать','width':'400','height':'250'};showLayerWin('orderwin',arg);var doc=take('orderwinform');doc.n.innerHTML="";var cont=doc.create('div',{id:'dateordcontainer',className:'period'});var div1=cont.create('div',{className:'mt10x'});var div2=cont.create('div',{className:'mt5x mb20x'});div1.create('span',{textNode:'*',style:{display:'inline-block',width:'10px',padding:'0',margin:'0'}});div1.create('span',{textNode:'Код читателя:',style:{width:'130px',textAlign:'left',padding:'10px 0 0 0',margin:'0'}});div1.create('input',{type:'text',maxLength:25,value:'',id:'icdr',name:'icdr'});div2.create('span',{textNode:'Место выдачи:',style:{width:'130px',textAlign:'left',padding:'10px 0 0 0',margin:'0 0 0 10px'}});div2.create('input',{type:'text',maxLength:25,value:'',id:'icdr1',name:'icdr1'});cont.create('i',{textNode:'* Обязательно к заполнению',className:'f80'});}}
function printClaimStart()
{if(take('icdr').n.value!="")
{typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["code",take('icdr').n.value]);if(take('icdr1').n.value!="")
querylist.push(["$place",take('icdr1').n.value]);gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,callbackprintClaim);}
else
{alert('Не введен код');return;}}
function callbackprintClaim(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError();}
else
{var code="";var fio="";if((typeof response[0]._whatThis!="undefined")&&(response[0]._whatThis!="DOCUMENT"))
{if(typeof response[0]._reader_0._visitor_0!="undefined")
{var arr=response[0]._reader_0._visitor_0;for(var i=0;i<arr.length;i++)
{if(arr[i].indexOf('FU:')!=-1)
{code=arr[i].substring(arr[i].indexOf('FU:')+3);}
if(arr[i].indexOf('AO:')!=-1)
{fio=arr[i].substring(arr[i].indexOf('AO:')+3);}}
if(code!="")
{typework="";var year=curDate.getFullYear();var day=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();var month=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;var hour=(curDate.getHours()<10)?'0'+(curDate.getHours()):curDate.getHours();var minut=(curDate.getMinutes()<10)?'0'+(curDate.getMinutes()):curDate.getMinutes();var second=(curDate.getSeconds()<10)?'0'+(curDate.getSeconds()):curDate.getSeconds();var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_xsl","/"+foldername+"/"+foldername+"/html/_modules/privat/list/xsl/print_orders.xsl"]);gArr.push(["_errorXsl","/"+foldername+"/"+foldername+"/html/_modules/search/_output/xsl/error.xsl"]);querylist.push(["_service","STORAGE:opacfindd:Order"]);querylist.push(["_version","3.0.0"]);querylist.push(["session",numsean]);querylist.push(["outform","REQUEST"]);querylist.push(["mode","view"]);querylist.push(["sortBy","NOTHING"]);querylist.push(["sortDirect","asc"]);querylist.push(["$height",window.innerHeight-200]);querylist.push(["$code",code]);querylist.push(["$fio",fio]);querylist.push(["$date",day+'.'+month+'.'+year]);querylist.push(["$time",hour+':'+minut+':'+second]);if(typeof _place!="undefined")
querylist.push(["$place",_place]);var arr=take('tableorder').getsign('input',{name:'marker'});var count=0;for(var i=0;i<arr.length;i++)
{if(arr[i].checked)
{querylist.push(["query["+count+"]/id",arr[i].value]);querylist.push(["query["+count+"]/db",arr[i].className]);count++;}}
if(count==0)
{alert('Не выбраны записи!');return false;}
if(take('excel').n!=null)
take('excel').n.parentNode.removeChild(take('excel').n);var arg={'cls':'dialog2','target':self,'message':'ПЕЧАТЬ ТРЕБОВАНИЙ','divframe':'1','forlinks':'1'};delLayerWin();showLayerWin('recordswin',arg);self.frames[0].document.open();self.frames[0].document.close();gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr,self.frames[0],"/cgiopac/opacg/settings.exe");}
else
WriteError();}
else
WriteError();}
else
WriteError();}}
function listPrint()
{if(printTab())
window.print();}
function loadWord()
{typework="";if(printTab())
{var str=take('excel').n.innerHTML;var head='<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>ЗАКАЗ</title></head><body>';str=head+str+'</body></html>';var gArr=new Array();gArr.push(["_action","export"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_numsean",numsean]);gArr.push(["_ext",".rtf"]);gArr.push(["_mode","screen"]);gArr.push(["_text",str]);callToRCP(gArr);}}
function printTab()
{var div;if(take('excel').n==null)
div=take(document.body).create('div',{id:'excel'});else
div=take('excel');div.n.innerHTML="";countList();var tab=div.create('div',{id:'tabord'});var head=tab.create('div',{style:{textAlign:'center',fontWeight:'bold'},textNode:'Список литературы'});var cont=tab.create('ol');var elem=take('tableorder').n;var arr=elem.childNodes[1].childNodes;var count=0;for(var i=0;i<arr.length;i++)
{if(arr[i].className=='checked')
{cont.create('li',{textNode:arr[i].childNodes[2].innerHTML});count++;}}
if(count==0)
{alert('Не выбраны записи!');return false;}
return true;}
function listDel()
{typework="";var arg={'cls':'dialog2','message':'СПИСОК ЛИТЕРАТУРЫ','target':self,'width':'500','height':'400'};var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:Order"]);querylist.push(["_version","2.0.0"]);querylist.push(["session",numsean]);querylist.push(["mode","clear"]);var arr=take('tableorder').getsign('input',{type:'checkbox'});var count=0;var adb="";for(var i=0;i<arr.length;i++)
{if((arr[i].checked)&&(arr[i].id!="mark"))
{adb=arr[i].className;querylist.push(["query["+count+"]/db",adb]);numDB=adb;querylist.push(["query["+count+"]/id",arr[i].value]);count++;}}
if(count==0)
{alert('Не выбраны записи!');return;}
if(confirm('Удалить выбранные записи?'))
{showLayerWin('orderwin',arg);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,numDB)]);ajaxToRCP(gArr,delMess);}}
function delMess(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var str='';str+='<div class="mess">Операция успешно завершена.</div><br/>';take('orderwinform').n.innerHTML=str;setTimeout('showOrderList()',1000);}}
function toOrderList(ind)
{typework="";var arg={'cls':'dialog2','message':'СПИСОК ЛИТЕРАТУРЫ','target':self,'width':'500','height':'400'};var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:Order"]);querylist.push(["_version","2.0.0"]);querylist.push(["session",numsean]);querylist.push(["mode","add"]);querylist.push(["outform","ORDERFORM"]);var count=0;if(typeof ind!="undefined")
{querylist.push(["query[0]/db",numDB]);querylist.push(["query[0]/id",ind]);count++;}
else
{var arr=take('searchrezult').getsign('input',{name:'marker'});for(var i=0;i<arr.length;i++)
{if((arr[i].checked)&&(arr[i].id!="mark"))
{querylist.push(["query["+count+"]/db",numDB]);querylist.push(["query["+count+"]/id",prepareStr(arr[i].value)]);count++;}}}
if(count==0)
{alert('Не выбраны записи!');return;}
showLayerWin('orderwin',arg);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,numDB)]);ajaxToRCP(gArr,createMess);}
function createMess(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{var str='';if(parseInt(response[0]._new)>0)
str+='<div class="mess">Добавлено записей: <b>'+response[0]._new+'</b>.</div>';else
str+='<div class="mess">Документ уже добавлен в список.</div>';str+='<div class="mess">Текущий размер списка: <b>'+response[0]._total+'</b>.</div>';str+='<div class="mess">Для просмотра  выбранных записей выберите пункт меню<br/><b>&laquo;СПИСОК ЛИТЕРАТУРЫ&raquo;</b>.</div><br/>';take('orderwinform').n.innerHTML=str;setTimeout('delLayerWin()',1000);}}
function showOrderList(c,s)
{typework="privat";var liststartfrom=0;var listhowmuch=portion;if(s==null)
s=numsean;if(take('portionlist').n!=null)
listhowmuch=take('portionlist').n.options[take('portionlist').n.selectedIndex].value;if(c!=null)
liststartfrom=parseInt(listhowmuch,10)*(parseInt(c,10)-1);var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["list"].directory+'/list.php']);querylist.push(["_service","STORAGE:opacfindd:Order"]);querylist.push(["_version","2.0.0"]);querylist.push(["session",s]);querylist.push(["$session",s]);querylist.push(["mode","view"]);querylist.push(["outform","ORDERFORM"]);querylist.push(["$liststartfrom",liststartfrom]);querylist.push(["length",listhowmuch]);querylist.push(["$length",listhowmuch]);querylist.push(["sortBy","NOTHING"]);querylist.push(["start",liststartfrom]);var fio="";if(!flag45)
{if(typeof AO!="undefined")
fio=AO;}
querylist.push(["$fio",fio]);if(typeof _reader!="undefined")
querylist.push(["$reader",_reader])
querylist.push(["sortDirect","asc"]);if(typeof _localiddb!="undefined")
gArr.push(["querylist",prepareQueryString(querylist,_iddb)]);else
gArr.push(["querylist",prepareQueryString(querylist,numDB)]);if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);}
callToRCP(gArr);}
function showAllLists(c)
{typework="privat";numDB=numdbBIBL;var liststartfrom=0;var listhowmuch=portion;if(c==null)
liststartfrom='';else
liststartfrom=parseInt(listhowmuch,10)*(parseInt(c,10)-1);var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",modules["alllists"].directory+'/alllists.php']);querylist.push(["_service","STORAGE:opacfindd:Order"]);querylist.push(["_version","2.0.0"]);querylist.push(["session",numsean]);querylist.push(["mode","list"]);querylist.push(["outform","ORDERFORM"]);querylist.push(["length",listhowmuch]);querylist.push(["$length",listhowmuch]);querylist.push(["sortDirect","desc"]);querylist.push(["start",liststartfrom]);var fio="";if(!flag45)
{if(typeof AO!="undefined")
fio=AO;}
querylist.push(["$fio",fio]);if(typeof _reader!="undefined")
querylist.push(["$reader",_reader])
querylist.push(["$liststartfrom",liststartfrom]);gArr.push(["querylist",prepareQueryString(querylist)]);if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);}
callToRCP(gArr);}
function ordersSearch2()
{var arg={'cls':'dialog2','message':'Список заказов','target':self,'callback':'openListOfOrders',callbackname:'Искать','width':'500','height':'400'};showLayerWin('orderwin',arg);var doc=take('orderwinform');doc.n.innerHTML="";var cont=doc.create('div',{id:'dateordcontainer',className:'period'});cont.create('div',{textNode:'Дата выполнения заказа',style:{fontWeight:'bold',margin:'5px 5px 25px 5px'}});cont.create('span',{className:'from',textNode:' с ',style:{marginRight:'15px'}});cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d1',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m1',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y1',onblur:'changeData',onmouseup:'changeData'});cont.create('span',{title:'Выбрать из календаря',id:'1',className:'calc',onmousedown:'CreateCal'});cont.create('br',{clear:'all'});cont.create('br',{clear:'all'});cont.create('span',{className:'to',textNode:' по ',style:{marginRight:'5px'}});cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d2',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m2',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y2',onblur:'changeData',onmouseup:'changeData'});cont.create('span',{title:'Выбрать из календаря',id:'2',className:'calc',onmousedown:'CreateCal'});if(flag45)
{cont.create('b',{className:'to',textNode:'Код читателя',style:{display:'block',margin:'30px 0 10px 0'}});cont.create('input',{type:'text',maxLength:25,value:'',id:'icdr',name:'icdr'});}}
function openListOfOrders()
{typework="privat";var loggin=identif.toLowerCase();var fio="";if(flag45)
{if(take('icdr').n.value!="")
loggin=take('icdr').n.value;else
{alert('Введите код читателя!');return;}}
else
{loggin=eval(login);if(typeof AO!="undefined")
fio=AO;}
var ty1=take('y1').n.value;var tm1=take('m1').n.value;var td1=take('d1').n.value;var ty2=take('y2').n.value;var tm2=take('m2').n.value;var td2=take('d2').n.value;var inputdata1=take('y1').n.value+''+take('m1').n.value+''+take('d1').n.value;var inputdata2=take('y2').n.value+''+take('m2').n.value+''+take('d2').n.value;if(inputdata2<inputdata1)
{alert('Неверно задан временной интервал!');}
else
{var handler=modules["order"].directory+'/order.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacholdd:ListOfOrders"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);if((typeof login!="undefined")&&(typeof AY!="undefined")&&(login=="AY"))
querylist.push(["login",loggin.toUpperCase()]);else if((typeof login!="undefined")&&(typeof ET!="undefined")&&(login=="ET"))
querylist.push(["codenlr",loggin]);else
querylist.push(["reader",loggin]);querylist.push(["date[0]",inputdata1]);querylist.push(["date[1]",inputdata2]);querylist.push(["$date0",inputdata1]);querylist.push(["$date1",inputdata2]);querylist.push(["$reader",loggin]);querylist.push(["$fio",fio]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);if((fio!="")&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);}
callToRCP(gArr);}}
function changeData(e)
{if(take('timeordcontainer').n!=null)
take('timeordcontainer').hide();correctVal(e);viewNext();}
function findFlag45()
{var db=numDB;if((typework=="searchallbases")||((typeof _localiddb!="undefined")&&(numDB==_localiddb)))
db=_iddb;var fl=false;if(typeof _flag45!="undefined")
{fl=true;}
else
{if(take('labs_div_'+db).n!=null)
{if((typeof iddb!="undefined")&&(typeof iddb[db]!="undefined"))
{if(iddb[db][0][3]=='BIBL')
{if(typeof iddb[db][5]!="undefined")
{var arr=iddb[db][5];for(var i=0;i<arr.length;i++)
{if(arr[i][0]=="045")
{fl=true;break;}}}}}
else
{if(db!='all')
alert("База данных "+db+" не прописана пользователю "+identif);}}}
return fl;}
function ordersSearch()
{typework="privat";flag45=findFlag45();if(flag45)
{ordersSearch2();}
else
{if(typeof flagUnload!="undefined")
flagUnload=null;var inputdata1=Year+''+mm+''+dd;var handler=modules["order"].directory+'/order.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacholdd:ListOfOrders"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);if((typeof login!="undefined")&&((login!="FU")||(login=="FU")&&(typeof FU!="undefined")))
{var loggin=identif.toLowerCase();if(typeof _reader!="undefined")
loggin=_reader;else
loggin=eval(login);if(login=="AY")
querylist.push(["login",loggin.toUpperCase()]);else if(login=="ET")
querylist.push(["codenlr",loggin]);else
querylist.push(["reader",loggin]);}
else
{alert('Операция невозможна для данного пользователя');return;}
querylist.push(["date[0]",inputdata1]);querylist.push(["date[1]",inputdata1]);querylist.push(["$date0",inputdata1]);querylist.push(["$date1",inputdata1]);querylist.push(["$reader",loggin]);if(typeof AO!="undefined")
querylist.push(["$fio",AO]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);if((typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);}
callToRCP(gArr);}}
function verifyLink()
{var harr={};var div=take('searchrezult');if(div.n!=null)
{if((typeof _auth!="undefined")&&(typeof _linkstring!="undefined"))
{var arr=_linkstring.split('[END]');for(var i=0;i<arr.length;i++)
{if(arr[i]!="")
{var tmparr=arr[i].split('[ID]');harr[tmparr[0]]=tmparr[1];}}
if(typeof harr["043"]!="undefined")
{var arr=div.getsign('p',{className:'043'});if(arr.length>0)
{for(var i=0;i<arr.length;i++)
{arr[i].style.display="";}}}
if(typeof harr["044"]!="undefined")
{var arr=div.getsign('p',{className:'044'});if(arr.length>0)
{for(var i=0;i<arr.length;i++)
{arr[i].style.display="";}}}
if(typeof harr["059"]!="undefined")
{var arr=div.getsign('p',{className:'059'});if(arr.length>0)
{for(var i=0;i<arr.length;i++)
{arr[i].style.display="";}}}
if(typeof harr["058"]!="undefined")
{var arr=div.getsign('p',{className:'058'});if(arr.length>0)
{for(var i=0;i<arr.length;i++)
{arr[i].style.display="";}}}}}
else
{return;}}
function mailSendToEBA()
{if((take('mail').n.value=="")||(take('subject').n.value=="")||(take('fio').n.value==""))
{alert("Вы не заполнили все поля или заполнили их неправильно!");return;}
var readermail=(take('mail').n!=null)?take('mail'):null;var subj=(take('subject').n!=null)?take('subject').n.value:null;var fio=(take('fio').n!=null)?take('fio').n.value:null;fio="\n\n"+fio;var mess=(take('itbody').n!=null)?take('itbody').n.value:null;var gArr=new Array();gArr.push(["_from",readermail.n.value]);gArr.push(["_answer","ok"]);gArr.push(["_subject",subj]);gArr.push(["_body",fio+"\n"+subj+"\n"+mess+"\n\n"]);ajaxToRCP(gArr,msendedOK,"/opacg/html/circle/php/mail.php");readermail=subj=fio=mess=null;}
function msendedOK(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var answere=take('answere').n.value;var msg="";var callback='reAnswere';if(take('msg').n!=null)
msg=take('msg').n.value;if(take('callback').n!=null)
callback=take('callback').n.value;var arg={'cls':'dialog2','message':msg,'width':'500','height':'400'};arg.dispatcher=callback;showLayerWin('confirmwin',arg);var doc=take('confirmwinform');doc.n.innerHTML="";doc.create('div',{textNode:answere,className:'red',style:{margin:'50px 10px 0px 10px',fontSize:'140%',textAlign:'center'}});setTimeout(eval(callback),1000);}}
function closeSession()
{goToLocation('close');}
function forgotPassword()
{typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["code",take('login').n.value]);gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,showForgotWin);}
function showForgotWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError();}
else
{var code="";var mail="";if((typeof response[0]._whatThis!="undefined")&&(response[0]._whatThis!="DOCUMENT"))
{if(typeof response[0]._reader_0._visitor_0!="undefined")
{var arr=response[0]._reader_0._visitor_0;for(var i=0;i<arr.length;i++)
{if(arr[i].indexOf('EN:')!=-1)
{code=arr[i].substring(arr[i].indexOf('EN:')+3);}
if(arr[i].indexOf('AI:')!=-1)
{mail=arr[i].substring(arr[i].indexOf('AI:')+3);}}}
else
WriteError();if(code!="")
{var str='\n\n';str+=' Ваш пароль для доступа к сервису Электронный абонемент: ';str+=code;str+=' \n\n';var gArr=new Array();gArr.push(["_action","mail"]);gArr.push(["_html","mail"]);gArr.push(["_errorhtml","error"]);gArr.push(["_to",mail]);gArr.push(["_subject","Электронный абонемент"]);gArr.push(["_body",str]);ajaxToRCP(gArr,forgotOk);}
else
WriteError();}
else
WriteError();}}
function forgotOk(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var answere="На Ваш почтовый адрес отправлен пароль для доступа к сервису Электронный абонемент.";var msg='Восстановление пароля';var arg={'cls':'dialog2','message':msg,'width':'500','height':'400','dispatcher':'function cbname(){goToLocation(\'privat\')}'};showLayerWin('confirmwin',arg);var doc=take('confirmwinform');doc.n.innerHTML="";doc.create('div',{textNode:answere,style:{margin:'50px 10px 0px 10px',color:'#096cc0',fontWeight:'bold',textAlign:'center'}});}}
function doLibRegistration()
{var inputdata=take('y1').n.value+''+take('m1').n.value+''+take('d1').n.value;var c1=take('readercode').n.value;var c2=take('readercode2').n.value;var mail=take('AY').n.value;var emailRegular=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;if(!emailRegular.test(mail))
{alert('Неверно введен e-mail!');return;}
if(c1!=c2)
{alert('Поля "Пароль" и "Подтверждение пароля" - не совпадают!');return;}
else if(c1.length<6)
{alert('Слишком короткий пароль!');return;}
else if(take('AY').n.value=="")
{alert('Не введен e-mail!');return;}
else if(take('AO').n.value=="")
{alert('Введите фамилию, имя, отчество!');return;}
else if(inputdata=="")
{alert('Введите дату рождения!');return;}
else if(take('FA').n.options[take('FA').n.selectedIndex].value=="")
{alert('Пол не выбран!');return;}
else if((take('FE').n!=null)&&(take('FE').n.options[take('FE').n.selectedIndex].value==""))
{alert('Социальный статус не выбран!');return;}
else if(!take('agree').n.checked)
{alert('Вы не выразили согласие с правилами пользования библиотекой!');return;}
else
{var curDate=new Date();var Year=curDate.getFullYear();var maxYear=Year+5;var dd=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();var mm=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;var gArr=new Array();var querylist=new Array();gArr.push(["_action","registrold"]);gArr.push(["_errorhtml","error"]);gArr.push(["_serviceclass","CATALOGING"]);gArr.push(["_service","PARAM"]);gArr.push(["_numsean",numsean]);gArr.push(["_login",identif]);gArr.push(["arg2","ONLINE"]);gArr.push(["arg4","USER"]);gArr.push(["arg5","NEW"]);gArr.push(["arg6","0"]);gArr.push(["AA:",c1]);gArr.push(["AB:",take('AB').n.value]);gArr.push(["AO:",take('AO').n.value.toUpperCase()]);gArr.push(["AX:",inputdata]);gArr.push(["FA:",take('FA').n.options[take('FA').n.selectedIndex].value]);if((take('FE').n!=null)&&(take('FE').n.options[take('FE').n.selectedIndex].value!=""))
gArr.push(["FE:",take('FE').n.options[take('FE').n.selectedIndex].value]);if((take('EA').n!=null)&&(take('EA').n.options[take('EA').n.selectedIndex].value!=""))
gArr.push(["EA:",take('EA').n.options[take('EA').n.selectedIndex].value]);if((take('EB').n!=null)&&(take('EB').n.options[take('EB').n.selectedIndex].value!=""))
gArr.push(["EB:",take('EB').n.options[take('EB').n.selectedIndex].value]);gArr.push(["FG:",Year+''+mm+''+dd]);gArr.push(["FB:",(Year+5)+''+mm+''+dd]);gArr.push(["AY:",take('AY').n.value.toUpperCase()]);gArr.push(["FU:",take('AY').n.value]);gArr.push(["AI:",take('AY').n.value]);gArr.push(["AE:","RU"]);if(take('FL').n!=null)
gArr.push(["FL:",take('FL').n.value]);if(take('EN').n!=null)
gArr.push(["EN:",take('EN').n.value+'-'+Year+''+mm+''+dd]);gArr.push(["AW:","READER"]);ajaxToRCP(gArr,openRegistrWin);}}
function doRegistration(o)
{var WW="";if(take('WW').n!=null)
WW=take('WW').n.value;var mail=take('mail').n.value;mail=mail.toLowerCase();var nik=take('nik').n.value.toUpperCase();var c1=take('readercode').n.value;var c2=take('readercode2').n.value;var emailRegular=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;if(!emailRegular.test(mail))
{alert('Неверно введен e-mail!');return;}
if(take('ipfirst').n!=null)
{var v1=take('ipfirst').n.value;var v2=take('ipsecond').n.value;var v3=take('ipthird').n.value;if(((v1=="")||(v1.length<4))||((v2=="")||(v2.length<4))||((v3=="")||(v3.length<4)))
{alert('Неверно введен код!');take('ipfirst').n.focus();return;}
else
promocod=v1+''+v2+''+v3;}
if(c1!=c2)
{alert('Поля "Пароль" и "Подтверждение пароля" - не совпадают!');return;}
else if(c1.length<6)
{alert('Слишком короткий пароль!');return;}
else if(WW=="")
{alert('Кодовое слово не введено!');return;}
else if(mail=="")
{alert('Не введен e-mail!');return;}
else if(nik=="")
{alert('Форма обращения не введена!');return;}
else
{var arg={};arg.target=self;arg.cls='loader';showLayerWin('loaderwin',arg);readerobj={};readerobj.AA=c1;readerobj.AO=nik;readerobj.FU=mail;readerobj.WW=WW;readerobj.AI=mail;if(promocod!="")
{promoCheck();}
else
{simpleRegistration();}}}
function openRegistrWinOk(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{var doc=take('loaderwinform');var arr=answere.split('[END]');var text1="";var mail="";var ep="";for(var i=0;i<arr.length;i++)
{if(arr[i].substring(0,3)=='AO:')
{text1=arr[i].substring(3);}
if(arr[i].substring(0,3)=='AI:')
{mail=arr[i].substring(3);}
if(arr[i].substring(0,3)=='EP:')
{ep=arr[i].substring(3);}}
delLayerWin();if(typeof _typereg=="undefined")
{var arg={};arg.cls='dialog2';arg.target=self;arg.message='РЕГИСТРАЦИЯ ЗАВЕРШЕНА';arg.dispatcher='reAuth';arg.width='500';arg.height='400';showLayerWin('hiwin',arg);var doc=take('hiwinform');doc.n.innerHTML="";var p=doc.create('div',{textNode:'Спасибо, '});p.create('span',{textNode:text1});p.text(take('reganswere').n.value);}
else if(_typereg=="regform")
{sendConfirm(text1,mail);}
else if(_typereg=="_promo")
{prolongSign(ep);}
else
{sendBill(text1,mail);}}}
function openRegistrWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{var isn="";var tmp=/^0\s*/;if(tmp.test(answere))
{isn=answere.substring(answere.lastIndexOf(' ')+1);var gArr=new Array();var querylist=new Array();gArr.push(["_action","registrold"]);gArr.push(["_errorhtml","error"]);gArr.push(["_serviceclass","CATALOGING"]);gArr.push(["_service","PARAM"]);gArr.push(["_numsean",numsean]);gArr.push(["_login",identif]);gArr.push(["arg2",""]);gArr.push(["arg4","USER"]);gArr.push(["arg5","REA"]);gArr.push(["arg6",isn]);gArr.push(["arg8","FDT_SPACE"]);ajaxToRCP(gArr,openRegistrWinOk);}
else
{var error={};error._message_0=answere;error._action_1="Для продления абонемента войдите в личный кабинет и нажмите кнопку НОВЫЙ АБОНЕМЕНТ";delLayerWin();WriteError(error);}}}
function sendConfirm(fio,mail)
{var log=take('AY').n.value;var pass=take('readercode').n.value;var gArr=new Array();gArr.push(["_to",mail]);gArr.push(["_subject","Подтверждение регистрации"]);gArr.push(["_fio",fio]);gArr.push(["_body","\nЗдравствуйте, "+fio+". Вы успешно зарегистрировались в системе.\nВаши регистрационные данные для входа в электронный каталог:\nЛогин: "+log+", Пароль: "+pass+". Для получения читательского билета обратитесь в Отдел регистрации Библиотеки.\n\n"]);ajaxToRCP(gArr,confirmsendedOK,"/opacg/html/circle/php/mail.php");}
function confirmsendedOK(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{delLayerWin();var arg={};arg.cls='dialog2';arg.target=self;arg.message='РЕГИСТРАЦИЯ ЗАВЕРШЕНА';arg.dispatcher='reAuth';arg.width='500';arg.height='400';showLayerWin('hiwin',arg);var doc=take('hiwinform');doc.n.innerHTML="";var p=doc.create('div',{textNode:'Спасибо, '});p.create('span',{textNode:fio});p.text('. Вы успешно зарегистрировались в системе. На Ваш электронный адрес выслано подтверждение регистрации. Для входа в каталог нажмите ссылку Вход.');}}
function sendBill(fio,mail)
{var gArr=new Array();gArr.push(["_to",mail]);gArr.push(["_subject","Счет на оплату услуг ЭБА"]);gArr.push(["_fio",fio]);gArr.push(["_price",price]);gArr.push(["_filename","bill"]);gArr.push(["_body","\nЗдравствуйте, "+fio+". Во вложенном файле находится счет, после оплаты которого Вы сможете воспользоваться услугами ЭБА, авторизовавшись в системе.\n\n"]);ajaxToRCP(gArr,billsendedOK,"/opacg/html/circle/php/mail.php");}
function billsendedOK(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{delLayerWin();var arg={};arg.cls='dialog2';arg.target=self;arg.message='РЕГИСТРАЦИЯ ЗАВЕРШЕНА';arg.dispatcher='reAuth';arg.width='500';arg.height='400';showLayerWin('hiwin',arg);var doc=take('hiwinform');doc.n.innerHTML="";var p=doc.create('div',{textNode:'Спасибо, '});p.create('span',{textNode:fio});p.text('. Вы успешно зарегистрировались в системе. На Ваш электронный адрес выслан счет, после оплаты которого Вы сможете воспользоваться услугами ЭБА, авторизовавшись в системе.');}}
function addElemStat(o,s)
{portion=110;typework="privat";numDB=numdbBIBL;var handler=modules["statindividaddwide"].directory+'/statindividaddwide.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacesd:Manage"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["toDo","ExpStatES"]);querylist.push(["stat/startFrom/infoUser",s]);querylist.push(["stat/startFrom/idBibRec",o.parentNode.className]);querylist.push(["stat/level","2"]);querylist.push(["$howMuch",portion]);querylist.push(["$startFrom",s]);querylist.push(["$firstrec",replaceSymb(o.parentNode.className)]);querylist.push(["$fio",AO]);querylist.push(["$AI",AI]);querylist.push(["$umail",take('uml').n.value]);querylist.push(["$dtc",take('dtc').n.value]);gArr.push(["querylist",prepareQueryString(querylist)]);if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);}
callToRCP(gArr);}
function addElemStatP(o)
{portion=100;typework="privat";numDB=numdbBIBL;var handler=modules["statindividaddwide"].directory+'/statindividaddwide.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacesd:Manage"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["toDo","ExpMyStatES"]);querylist.push(["stat/level","2"]);querylist.push(["stat/code",EP]);querylist.push(["stat/reader",ET]);querylist.push(["stat/idBibRec",o.parentNode.className]);querylist.push(["stat/startFrom",1]);querylist.push(["stat/howMuch",portion]);querylist.push(["$howMuch",portion]);querylist.push(["$startFrom",1]);querylist.push(["$firstrec",replaceSymb(o.parentNode.className)]);querylist.push(["$fio",AO]);querylist.push(["$AI",AI]);querylist.push(["$umail",take('uml').n.value]);querylist.push(["$dtc",take('dtc').n.value]);querylist.push(["$back","P"]);gArr.push(["querylist",prepareQueryString(querylist)]);if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);}
callToRCP(gArr);}
function seeAddStatDigitMy()
{portion=110;typework="privat";numDB=numdbBIBL;var useres="";if(take('ues').n!=null)
useres=take('ues').n.value
var handler=modules["statdigit"].directory+'/statdigit.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacesd:Manage"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["toDo","ExpStatOrdersForDigitization"]);querylist.push(["stat/code",useres]);querylist.push(["stat/reader",ET]);querylist.push(["stat/startFrom",1]);querylist.push(["stat/howMuch",portion]);querylist.push(["$startFrom",1]);querylist.push(["$howMuch",portion]);querylist.push(["$portioncount",0]);querylist.push(["$fio",AO]);querylist.push(["$AI",AI]);querylist.push(["$umail",take('uml').n.value]);querylist.push(["$dtc",take('dtc').n.value]);gArr.push(["querylist",prepareQueryString(querylist)]);if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist)]);}
callToRCP(gArr);}
function seeAddStatDigit(num)
{portion=110;typework="privat";numDB=numdbBIBL;var useres="";if(take('ues').n!=null)
useres=take('ues').n.value
var handler=modules["statdigit"].directory+'/statdigit.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacesd:Manage"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["toDo","ExpStatOrdersForDigitization"]);querylist.push(["stat/code",useres]);querylist.push(["stat/startFrom",1]);querylist.push(["stat/howMuch",portion]);querylist.push(["$startFrom",1]);querylist.push(["$howMuch",portion]);querylist.push(["$portioncount",0]);querylist.push(["$fio",AO]);querylist.push(["$AI",AI]);querylist.push(["$umail",take('uml').n.value]);querylist.push(["$dtc",take('dtc').n.value]);gArr.push(["querylist",prepareQueryString(querylist)]);if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist)]);}
callToRCP(gArr);}
function seeAddStat(s,r,p,f)
{portion=110;typework="privat";numDB=numdbBIBL;var ind=""
if(typeof s!="string")
{s=take('nga').n.value+''+take('ues').n.value+''+take('dtc').n.value;portioncount=0;}
else
{portioncount=parseInt(p,10);ind=r;}
var handler=modules["statindividadd"].directory+'/statindividadd.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacesd:Manage"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["toDo","ExpStatES"]);querylist.push(["stat/level","1"]);querylist.push(["stat/startFrom/infoUser",s.toUpperCase()]);querylist.push(["stat/howMuch",portion]);querylist.push(["$startFrom",s.toUpperCase()]);querylist.push(["$howMuch",portion]);querylist.push(["$portioncount",portioncount]);querylist.push(["$fio",AO]);querylist.push(["$AI",AI]);querylist.push(["$umail",take('uml').n.value]);querylist.push(["$dtc",take('dtc').n.value]);gArr.push(["querylist",prepareQueryString(querylist)]);if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist)]);}
callToRCP(gArr);}
function seeAddStatP(s,r,p,f)
{typework="privat";numDB=numdbBIBL;var ind=""
if(typeof s!="string")
{s=EP+''+ET+''+take('dtc').n.value;portioncount=0;}
else
{portioncount=parseInt(p,10);ind=r;}
portion=110;var handler=modules["statindividadd"].directory+'/statindividadd.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacesd:Manage"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["toDo","ExpMyStatES"]);querylist.push(["stat/level","1"]);querylist.push(["stat/code",EP]);querylist.push(["stat/reader",ET]);querylist.push(["stat/startFrom",1]);querylist.push(["stat/howMuch",portion]);querylist.push(["$startFrom",s]);querylist.push(["$howMuch",portion]);querylist.push(["$portioncount",portioncount]);querylist.push(["$fio",AO]);querylist.push(["$AI",AI]);querylist.push(["$umail",take('uml').n.value]);querylist.push(["$dtc",take('dtc').n.value]);querylist.push(["$back","P"]);gArr.push(["querylist",prepareQueryString(querylist)]);if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist)]);}
callToRCP(gArr);}
function seeAddStatInd(s)
{portion=110;var back="";if(typeof s!="string")
{s=ET;}
else
{back="userlist";}
typework="privat";numDB=numdbBIBL;var dc=take('dtc').n.value;var ds=take('dts').n.value;var handler=modules["stataddindivid"].directory+'/stataddindivid.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacholdd:ListOfOrders"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["codenlr",s]);querylist.push(["date[0]",dc]);querylist.push(["date[1]",ds]);querylist.push(["startFrom",1]);querylist.push(["fond","ED"]);querylist.push(["howMuch",portion]);querylist.push(["$startFrom",1]);querylist.push(["$howMuch",portion]);querylist.push(["$fio",AO]);querylist.push(["$AI",AI]);querylist.push(["$umail",take('uml').n.value]);querylist.push(["$dtc",take('dtc').n.value]);querylist.push(["$groupid",EP]);querylist.push(["$date0",dc]);querylist.push(["$date1",ds]);if(back!="")
querylist.push(["$back",back]);gArr.push(["querylist",prepareQueryString(querylist)]);if((!flag45)&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist)]);}
callToRCP(gArr);}
function statInd()
{typework="privat";if((typeof EP=="undefined")||(EP=="")||(EP=="N/A"))
{alert('Данному типу пользователя статистика недоступна.');return;}
else
{var handler=modules["statindivid"].directory+'/statindivid.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacesd:Manage"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["toDo","StatES"]);querylist.push(["es/code",EP]);querylist.push(["es/reader",ET]);querylist.push(["$AI",AI]);querylist.push(["$fio",AO]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);callToRCP(gArr);}}
function showPersons(o)
{portion=110;typework="privat";var groupid="";if(typeof o!="number")
{begin=1;portioncount=0;quant=0;portionarr=[];thegroup=o.parentNode;portionarr[portioncount]=begin;}
else
{if(o==0)
{portioncount--;begin=portionarr[portioncount];}
else
{portioncount++;begin=begin+portion;portionarr[portioncount]=begin;}}
groupid=thegroup.id.substring(1);var handler=modules["personstat"].directory+'/personstat.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacesd:Manage"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",top.numsean]);querylist.push(["id",top.identif]);querylist.push(["toDo","MembersES"]);querylist.push(["es/code",groupid]);querylist.push(["es/begin",begin]);querylist.push(["es/number",portion]);querylist.push(["$portioncount",portioncount]);querylist.push(["$begin",begin]);querylist.push(["$groupid",groupid]);querylist.push(["$fio",AO]);querylist.push(["$AI",AI]);querylist.push(["$umail",take('uml').n.value]);querylist.push(["$dtc",take('dtc').n.value]);querylist.push(["$date0",take('dtc').n.value]);querylist.push(["$date1",take('dts').n.value]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);callToRCP(gArr);}
function prolongSign(cod)
{if(typeof cod=="string")
EP=cod;if(EP!="N/A")
{if(typeof cod!="string")
{var text='Новый абонемент';if((typeof _typereg!="undefined")&&(_typereg=="_promo"))
text='Активировать код';var arg={'cls':'dialog2','message':text,'target':self,'width':'400','height':'300'};showLayerWin('billwin',arg);var doc=take('billwinform');doc.n.innerHTML="";var cont=doc.create('div',{id:'butcontainer',style:{textAlign:'center'}});cont.create('input',{className:'mt30x w80 b button',id:'promobut',value:'Активировать код',type:'button',onclick:'showPromo'});cont.create('input',{className:'url w80 f80 m20x',id:'billbut',value:'Оплатить абонемент',type:'button',onclick:'prolongSignBill'});}
else
{prolongSignPromo(cod);}}
else
{alert('Данному типу пользователя операция недоступна.');return;}}
function nextPortion(e)
{var elem=getSrc(e);var val=elem.value;switch(elem.id)
{case'ipfirst':if(val.length==4)
take('ipsecond').n.focus();else
{if(take('promoakt').n!=null)
take('promoakt').n.disabled=true;}
break;case'ipsecond':if(take('ipfirst').n.value.length<4)
take('ipfirst').n.focus();else
{if(val.length==4)
take('ipthird').n.focus();else
{if(take('promoakt').n!=null)
take('promoakt').n.disabled=true;}}
break;case'ipthird':if(take('ipfirst').n.value.length<4)
{if(take('promoakt').n!=null)
take('promoakt').n.disabled=true;take('ipfirst').n.focus();}
else if(take('ipsecond').n.value.length<4)
{if(take('promoakt').n!=null)
take('promoakt').n.disabled=true;take('ipsecond').n.focus();}
else
{if(val.length==4)
{if(take('promoakt').n!=null)
{take('promoakt').n.disabled=false;take('promoakt').n.focus();}}}
break;default:break;}}
function showPromo(cod)
{var par=take('butcontainer');if(par.n!=null)
{par.n.innerHTML="";par.create('b',{className:'blue',textNode:'Введите код:',style:{display:'block',margin:'20px',textAlign:'center'}});par.create('input',{type:'text',id:'ipfirst',value:'',maxLength:'4',className:'date',onblur:'nextPortion',onkeyup:'nextPortion'});par.create('span',{className:'to',textNode:' - '});par.create('input',{type:'text',id:'ipsecond',value:'',maxLength:'4',className:'date',onblur:'nextPortion',onkeyup:'nextPortion'});par.create('span',{className:'to',textNode:' - '});par.create('input',{type:'text',id:'ipthird',value:'',maxLength:'4',className:'date',onblur:'nextPortion',onkeyup:'nextPortion'});if(typeof cod!="string")
par.create('input',{type:'button',className:'url f80 w50',disabled:'true',id:'promoakt',value:'Активировать',onmousedown:'prolongSignPromo',style:{margin:'20px',textAlign:'center'}});else
par.create('input',{type:'button',className:'url f80 w50',disabled:'true',id:'promoakt',value:'Активировать',onmousedown:'function(){prolongSignPromo(\''+cod+'\');}',style:{margin:'20px',textAlign:'center'}});take('ipfirst').n.focus();}}
function promoCheck()
{typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacholdd:Setting"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["toDo","PromoCode"]);querylist.push(["mode","CHECK"]);querylist.push(["promo",promocod]);gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,promoCheckOk);}
function promoCheckOk(x)
{eval(x.responseText);delLayerWin();if(typeof error!="undefined")
{WriteError(error);}
else
{simpleRegistration();}}
function simpleRegistration()
{var curDate=new Date();var Year=curDate.getFullYear();var maxYear=Year+5;var dd=(curDate.getDate()<10)?'0'+(curDate.getDate()):curDate.getDate();var mm=(curDate.getMonth()+1<10)?'0'+(curDate.getMonth()+1):curDate.getMonth()+1;var gArr=new Array();var querylist=new Array();gArr.push(["_action","registrold"]);gArr.push(["_errorhtml","error"]);gArr.push(["_serviceclass","CATALOGING"]);gArr.push(["_service","PARAM"]);gArr.push(["_numsean",numsean]);gArr.push(["_login",identif]);gArr.push(["arg2","ONLINE"]);gArr.push(["arg4","USER"]);gArr.push(["arg5","NEW"]);gArr.push(["arg6","0"]);gArr.push(["AA:",readerobj.AA]);gArr.push(["AO:",readerobj.AO]);gArr.push(["FU:",readerobj.FU]);gArr.push(["FG:",Year+''+mm+''+dd]);gArr.push(["FB:",maxYear+''+mm+''+dd]);gArr.push(["WW:",readerobj.WW]);gArr.push(["AI:",readerobj.AI]);gArr.push(["AX:","19900101"]);gArr.push(["AY:",readerobj.AI.toUpperCase()]);gArr.push(["AE:","RU"]);gArr.push(["FL:","ONLINE"]);gArr.push(["AW:","READER"]);ajaxToRCP(gArr,openRegistrWin);}
function prolongSignPromo(cod)
{typework="";if(typeof cod!="string")
cod=EP;var pcode=promocod;if(promocod=="")
{if(take('ipfirst').n!=null)
{var v1=take('ipfirst').n.value;var v2=take('ipsecond').n.value;var v3=take('ipthird').n.value;if(((v1=="")||(v1.length<4))||((v2=="")||(v2.length<4))||((v3=="")||(v3.length<4)))
{alert('Неверно введен код!');take('ipfirst').n.focus();return;}
else
pcode=v1+''+v2+''+v3;}}
var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacholdd:Setting"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["toDo","PromoCode"]);querylist.push(["mode","PROMOTE"]);querylist.push(["promo",pcode]);querylist.push(["reader",cod]);gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,prolongSignPromoOk);}
function prolongSignPromoOk(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{var text='Ваш абонемент активирован.';delLayerWin();var arg={};arg.cls='dialog2';arg.target=self;arg.width='500';arg.height='400';if((typeof _typereg!="undefined")&&(_typereg=="_promo"))
{text='Вы успешно зарегистрировались в системе. Для того, чтобы воспользоваться услугами ЭБА, перейдите на страницу Авторизации.';arg.message='РЕГИСТРАЦИЯ ЗАВЕРШЕНА';arg.dispatcher='reAuth';}
else
{arg.message='АБОНЕМЕНТ АКТИВИРОВАН';arg.dispatcher='ordersSearch';}
showLayerWin('hiwin',arg);var doc=take('hiwinform');doc.n.innerHTML="";doc.create('div',{className:'answ',textNode:text});}
promocod="";readerobj=null;}
function prolongSignBill()
{typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,prolongSignBillOk)}
function prolongSignBillOk(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{if(response[0]._balanceES_0!=null)
{if(response[0]._balanceES_0._type=="INDIVIDUAL")
{var gArr=new Array();gArr.push(["_to",AI]);gArr.push(["_subject","Счет на оплату услуг ЭБА"]);gArr.push(["_fio",AO]);gArr.push(["_price",price]);gArr.push(["_filename","bill"]);gArr.push(["_body","\nЗдравствуйте, "+AO+". Во вложенном файле находится счет, после оплаты которого Вы сможете продолжить пользоваться услугами ЭБА, авторизовавшись в системе.\n\n"]);ajaxToRCP(gArr,prolongSignOkWin,"/opacg/html/circle/php/mail.php");}
else
{var arg={};arg.cls='dialog2';arg.target=self;arg.message='ПРОДЛЕНИЕ ДОГОВОРА';arg.width='500';arg.height='400';showLayerWin('hiwin',arg);var doc=take('hiwinform');doc.n.innerHTML="";var p=doc.create('div',{style:{textAlign:'center',margin:'50px 10px 10px 10px',font:'normal 12pt/24pt Arial, sans-serif'},textNode:'Уважаемый '});p.create('span',{textNode:AO,style:{color:'#3999e3'}});p.text('. Для продления срока действия Вашего договора Вам необходимо обратиться к контактному лицу по работе с Электронным абонементом в Вашей организации.');}}
else
{var error={};error._message_0="Операция невозможна";error._action_1="для данного пользователя";WriteError(error);}}}
function prolongSignOkWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{delLayerWin();var arg={};arg.cls='dialog2';arg.target=self;arg.message='ПРОДЛЕНИЕ ДОГОВОРА';arg.width='500';arg.height='400';showLayerWin('hiwin',arg);var doc=take('hiwinform');doc.n.innerHTML="";var p=doc.create('div',{textNode:'Спасибо, '});p.create('span',{textNode:AO});p.text('. На Ваш электронный адрес выслан счет, после оплаты которого Вы сможете продолжить пользоваться услугами ЭБА, авторизовавшись в системе.');}}
function callChangePass()
{var protocol=window.location.protocol;var host=window.location.host;if(take('login').n.value=="")
{alert("Введите ваш логин!");return;}
var readermail=take('login');var val=readermail.n.value;var subj="Запрос на смену пароля для доступа к Электронному библиотечному абонементу";var str="\n\n";str+=protocol+"//"+host+"/"+foldername+"?_overcharge="+val;str+="\n\n";var gArr=new Array();gArr.push(["_to",val]);gArr.push(["_fio","fio"]);gArr.push(["_subject",subj]);gArr.push(["_body",str]);ajaxToRCP(gArr,msendedOK,"/opacg/html/circle/php/mail.php");readermail.n.value="";}
function changePass()
{var len=overcharge.length;var gArr=new Array();var querylist=new Array();gArr.push(["_action","registrold"]);gArr.push(["_errorhtml","error"]);gArr.push(["_serviceclass","CATALOGING"]);gArr.push(["_service","PARAM"]);gArr.push(["_numsean",numsean]);gArr.push(["_login",identif]);gArr.push(["arg4","USER"]);gArr.push(["arg5","VIE"]);gArr.push(["arg7","AY"]);gArr.push(["arg8","FDT"]);gArr.push(["arg10","[SEARCHBUF]AW,6,A,D,FU,"+len+",D,AW,10,A,NE.\n[RECORDBUF]READER"+overcharge+"DEFINITION\n[BEGIN]1\n[PORTION]10\n"]);var arg={};arg.target=self;arg.cls='loader';showLayerWin('loaderwin',arg);ajaxToRCP(gArr,openChangeWin);}
function openChangeWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{var doc=take('loaderwinform');var arr=answere.split('[END]');var isn=""
var fio="";var mail="";for(var i=0;i<arr.length;i++)
{if(arr[i].indexOf('[ISN]')!=-1)
{isn=arr[i].substring(arr[i].indexOf('[ISN]')+5);}
if(arr[i].substring(0,3)=='AO:')
{text1=arr[i].substring(3);}
if(arr[i].substring(0,3)=='AI:')
{mail=arr[i].substring(3);}}
changePassw(isn);}}
function changePassw(isn)
{var c1=take('readercode').n.value;var c2=take('readercode2').n.value;if(c1!=c2)
{alert('Поля "Пароль" и "Подтверждение пароля" - не совпадают!');delLayerWin();return;}
else if(c1.length<6)
{alert('Слишком короткий пароль!');delLayerWin();return;}
else
{var gArr=new Array();var querylist=new Array();gArr.push(["_action","registrold"]);gArr.push(["_errorhtml","error"]);gArr.push(["_serviceclass","CATALOGING"]);gArr.push(["_service","PARAM"]);gArr.push(["_numsean",numsean]);gArr.push(["_login",identif]);gArr.push(["arg4","USER"]);gArr.push(["arg5","SUP"]);gArr.push(["arg6",isn]);gArr.push(["AA:",c1]);ajaxToRCP(gArr,openChangePasswWin);}}
function openChangePasswWin(x)
{if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{delLayerWin();var arg={};arg.cls='dialog2';arg.target=self;arg.message='ПАРОЛЬ ИЗМЕНЕН';arg.dispatcher='reAuth';arg.width='500';arg.height='400';showLayerWin('hiwin',arg);var doc=take('hiwinform');doc.n.innerHTML="";var p=doc.create('div',{style:{textAlign:'center',margin:'50px 10px 10px 10px',font:'normal 12pt/24pt Arial, sans-serif'},textNode:'Ваш пароль изменен. Для того, чтобы воспользоваться услугами ЭБА, перейдите на страницу Авторизации.'});}}
function reAuth()
{goToLocation('privat');}
function reAnswere()
{goToLocation('contacts');}
function getPrice()
{typework="";var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacholdd:Setting"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["toDo","getInfoIndividES"]);gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,openRWin);}
function openRWin(x)
{eval(x.responseText);if(typeof error!="undefined")
{WriteError(error);}
else
{price=response[0]._groupAccess_0._price;}}
function fulltextSearch(nm)
{typework="search";if(((take('itemfulltxt').n==null)||(take('itemfulltxt').n.value==""))&&(nm==null))
{return;}
var ftxt="";var str="";var showstr="";var val=take('itemfulltxt').n.value;var lab=take('fulltext_search').getsign('img',{className:'labs'})[0].nextSibling.className.substring(1);var startfrom=1;var howmuch=portion;if(nm!=null)
{if(typeof _str!="undefined")
str=_str;startfrom=nm;ftxt=replaceSymb(str);showstr=_showstr;ftxt=ftxt.replace(/\[\/bracket\]/g,"");ftxt=ftxt.replace(/\[bracket\]/g,"");ftxt=ftxt.replace(/^FR /,'');ftxt=ftxt.replace(/^KS /,'');}
else
{val=val.Trim();showstr=str=ftxt=val;str="[bracket]"+lab+" "+replaceSymb(str)+"[/bracket]";showstr='<i>'+dbs[numDB]["labels"][lab][0]+'</i> '+replaceSymb(showstr);}
str=prepareStr(str);showstr=prepareStr(showstr);ftxt=prepareStr(ftxt);str=replaceSymb(str);showstr=prepareShowstring(showstr);var ftarr=[];var bd='declare namespace ft="http://www.w3.org/2002/04/xquery-operators-text" for $rec in input()/diss where ft:text-contains($rec/TEXT, "%search%") order by $rec/ID return $rec/ID';if(lab=='KS')
{if(ftxt.indexOf(' ')!=-1)
ftarr=ftxt.split(' ');bd='declare namespace ft="http://www.w3.org/2002/04/xquery-operators-text" for $rec in input()/diss where ';if(ftarr.length==0)
bd+='ft:text-contains($rec/TEXT, "'+ftxt+'")';else
{for(var i=0;i<ftarr.length;i++)
{bd+='ft:text-contains($rec/TEXT, "'+ftarr[i]+'")';if(i<ftarr.length-1)
bd+=' and ';}}
ftxt='1';bd+=' order by $rec/ID return $rec/ID';}
var unesc=encodeVal(bd);var handler=modules["fulltext"].directory+'/fulltext.php';var outfrm=outform;if(typeof dbs[fulltextbase].outform!="undefined")
outfrm=dbs[fulltextbase].outform;var fArr=new Array();fArr.push(["_action","fulltext"]);fArr.push(["_errorhtml","error1"]);fArr.push(["_handler",handler]);fArr.push(["_body",unesc]);fArr.push(["_start",startfrom]);fArr.push(["_session",numsean]);fArr.push(["_userId",identif]);fArr.push(["_outform",outfrm]);fArr.push(["_length",howmuch]);fArr.push(["_showstr",showstr]);fArr.push(["_str",str]);fArr.push(["_typesearch","fulltext"]);fArr.push(["_label",lab]);fArr.push(["_iddb",fulltextbase]);fArr.push(["_service","STORAGE:opacfindd:FindView"]);fArr.push(["_version","2.0.0"]);fArr.push(["_history","yes"]);fArr.push(["db","fulltext"]);fArr.push(["title","Полнотекстовый поиск"]);fArr.push(["args[0]/name","search"]);fArr.push(["args[0]/value",ftxt]);fArr.push(["vars[0]/description","Поисковый термин"]);fArr.push(["vars[0]/name","search"]);fArr.push(["vars[0]/type","var"]);fArr.push(["length",howmuch]);fArr.push(["start",startfrom]);fArr.push(["portion[0]",portion]);callToRCP(fArr);}
function ieslider(o)
{if(document.all&&!document.addEventListener)
{var ind=o.id;switch(ind)
{case'lab1':take('slider1').visualise();take('lab3').visualise();take('slider2').conceal();take('slider3').conceal();take('lab1').conceal();take('lab2').conceal();take('lab4').conceal();break;case'lab2':take('slider2').visualise();take('lab4').visualise();take('lab1').visualise();take('slider1').conceal();take('slider3').conceal();take('lab3').conceal();take('lab2').conceal();break;case'lab3':take('slider2').visualise();take('lab4').visualise();take('lab1').visualise();take('slider1').conceal();take('slider3').conceal();take('lab3').conceal();take('lab2').conceal();break;case'lab4':take('slider3').visualise();take('lab2').visualise();take('slider2').conceal();take('slider1').conceal();take('lab1').conceal();take('lab3').conceal();take('lab4').conceal();break;default:break;}
take(o).conceal();}
else
return;}
var scrollFloat=function()
{var app={};app.init=function init(node)
{if(node&&node.nodeType==1)
handleWindowScroll(node);};function handleWindowScroll(floatElement)
{window.onscroll=function()
{if(pageOffset().y>floatElement.offsetTop)
{floatElement.style.position='fixed';floatElement.style.top='0';floatElement.style.zIndex='9999';}
else
{floatElement.style.position='';floatElement.style.top='';floatElement.style.zIndex='1';}};}
return app;}();var bbcodes={"[b]":"<b>","[/b]":"</b>","[u]":"<u>","[/u]":"</u>","[br]":"<br/>","[br/]":"<br/>","[hr]":"<hr/>","[hr/]":"<hr/>","[div]":"<div>","[/div]":"</div>","[p]":"<p>","[/p]":"</p>","[ul]":"<ul class=\"bbc\">","[/ul]":"</ul>","[ol]":"<ol>","[/ol]":"</ol>","[li]":"<li>","[/li]":"</li>","[url]":"<a target=\"_blank\" href=\"","[/url]":"\">","[/a]":"</a>","[size=20]":"<span class=\"size20\">","[/size]":"</span>","[lev3]":"<span class=\"lev3\">","[/lev3]":"</span>","[i class=RP]":"<span class=\"RP\" onclick=\"showLable(this)\">","[i class=AU]":"<span class=\"AU\" onclick=\"showLable(this)\">","[i class=TM]":"<span class=\"TM\" onclick=\"showLable(this)\">","[i class=SH]":"<span class=\"SH\" onclick=\"showLable(this)\">","[i class=KL]":"<span class=\"KL\" onclick=\"showLable(this)\">","[i class=SE]":"<span class=\"SE\" onclick=\"showLable(this)\">","[i class=BC]":"<span class=\"BC\" onclick=\"showLable(this)\">","[i class=UD]":"<span class=\"UD\" onclick=\"showLable(this)\">","[i class=KW]":"<span class=\"KW\" onclick=\"showLable(this)\">","[i class=CA]":"<span class=\"CA\" onclick=\"showLable(this)\">","[i class=FGOS]":"<span class=\"FGOS\" onclick=\"showLable(this)\">","[i class=PM]":"<span class=\"PM\" onclick=\"showLable(this)\">","[i class=PU]":"<span class=\"PU\" onclick=\"showLable(this)\">","[i class=FG]":"<span class=\"FG\" onclick=\"showLable(this)\">","[i class=TS]":"<span class=\"TS\" onclick=\"showLable(this)\">","[i class=MS]":"<span class=\"MS\" onclick=\"showLable(this)\">","[indent]":"<span class=\"indent\">","[/indent]":"</span>","[i]":"<span class=\"i\">","[/i]":"</span>"};function addslash(v)
{var ret="";for(var i=0;i<v.length;i++)
{if("\\^$*+?{}[]().:!=|-,/".indexOf(v.charAt(i))!=-1)
{ret+="\\"+v.charAt(i);}
else
{ret+=v.charAt(i);}}
return ret;};function parseBB(v)
{for(var key in bbcodes)
{var tmp=eval("/"+addslash(key)+"/gi");if(tmp.test(v))
{v=v.replace(tmp,bbcodes[key]);}}
return v;}
function deleteBB(v)
{for(var key in bbcodes)
{var tmp=eval("/"+addslash(key)+"/gi");if(tmp.test(v))
{v=v.replace(tmp,"");}}
return v;}
function callNewBooks()
{typework="";var y=Year-1;var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);querylist.push(["start",0]);querylist.push(["length",portion]);var outfrm=outform;if(typeof dbs[numDB].outform!="undefined")
outfrm=dbs[numDB].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);querylist.push(["iddb",numDB]);querylist.push(["query/body","(PY BETWEEN '"+y+""+mm+""+dd+"','"+Year+""+mm+""+dd+"')"]);querylist.push(["query/label","PY"]);querylist.push(["query/direct","desc"]);gArr.push(["querylist",prepareQueryString(querylist)]);ajaxToRCP(gArr,callBackNewBooks);}
function callBackNewBooks(x)
{eval(x.responseText);if(typeof error!="undefined")
WriteError(error);else
{var str="";var count=0;for(var key in response[0])
{var value=response[0][key];if(key.indexOf('result_')!=-1)
{count++;if((count%2)==0)
str+='<div class="searchrez1">';else
str+='<div class="searchrez">';var arr=value._ORDERFORM_0;for(var i=0;i<arr.length-1;i++)
{str+='<div class="table"><div class="row"><div class="td w80x vtop"><img class="ramka3" border="0" hspace="0" vspace="0" alt="" title="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="/></div><div class="td vtop p10x"><p>'+arr[i]+'</p></div></div></div>';}
str+='</div>';}}
str+='<p title="подробнее" class="else" onmousedown="searchNews">подробнее &raquo;</p>';take('newbooks').n.innerHTML=str;}}
function searchNews(num)
{typework="search";var handler=modules["search"].directory+'/search.php';var today=new Date();var twomonth=new Date(today.getTime()-86400000*60);var y1=twomonth.getFullYear();var d1=(twomonth.getDate()<10)?'0'+(twomonth.getDate()):twomonth.getDate();var m1=(twomonth.getMonth()+1<10)?'0'+(twomonth.getMonth()+1):twomonth.getMonth()+1;var lab="DT";if(typeof num!="undefined")
{lab="DEZ";y1=Year-1;m1=mm;d1=dd;}
var str=prepareStr("[bracket]"+lab+" BETWEEN [apos]"+y1+""+m1+""+d1+"[apos],[apos]"+Year+""+mm+""+dd+"[apos][/bracket]");var showstr=prepareStr("<i>Дата </i> с "+d1+"."+m1+"."+y1+" по "+dd+"."+mm+"."+Year);str=replaceSymb(str);showstr=prepareShowstring(showstr);var term=prepareTerm(str);var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacfindd:FindView"]);querylist.push(["_version","2.5.0"]);querylist.push(["session",numsean]);querylist.push(["_history","yes"]);querylist.push(["_start",0]);querylist.push(["start",0]);querylist.push(["$length",portion]);querylist.push(["length",portion]);querylist.push(["_showstr",showstr]);querylist.push(["_str",str]);querylist.push(["$sortlabel","PY"]);querylist.push(["$sortdirect","desc"]);querylist.push(["$label","PY"]);querylist.push(["$direct","desc"]);querylist.push(["$renew","yes"]);if(typeof num!="undefined")
{querylist.push(["$searchtitle","Рекомендуем"]);}
else
{querylist.push(["$searchtitle","Новинки"]);}
var outfrm=outform;if(typeof dbs[numDB].outform!="undefined")
outfrm=dbs[numDB].outform;querylist.push(["$outform",outfrm]);querylist.push(["outformList[0]/outform",outfrm]);querylist.push(["outformList[1]/outform","LINEORD"]);if(outfrm=="SHORTFM")
{querylist.push(["outformList[2]/outform","SHORTFMS"]);querylist.push(["outformList[3]/outform","SHORTFMSTR"]);}
querylist.push(["iddb",numDB]);querylist.push(["query/body",term]);querylist.push(["query/label","PY"]);querylist.push(["query/direct","desc"]);gArr.push(["querylist",prepareQueryString(querylist)]);callToRCP(gArr);}
function getWidgetSvfu()
{var val=take('sitename').n.value;var tmp=/^(https?\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)$/;if(tmp.test(val))
{var lim=val.indexOf('//');if(lim==-1)
lim=0;else
lim+=2;var divcode=take('getsitename');var divimg1=take('takewidgets1');var divimg2=take('takewidgets2');divcode.n.innerHTML="";divimg1.n.innerHTML="";divimg2.n.innerHTML="";var csstext='<style type="text/css">.widget_svfu{display:inline-block;width:100%;min-width:320px;max-width:1024px;text-align:center;vertical-align:middle;background:#f0f3f6;border: 1px solid #fff;box-shadow: 0 0 0 1px #e0e3e6;border-radius:9px;font: normal 120%/100% Arial, sans-serif;color:#666;}.widget_svfu > span{display:inline-block;width:48%;min-width:320px;height:35px;vertical-align:middle;}.widget_svfu span span{line-height: 200%;margin: 20px 0 0 0;}.widget_svfu:before{ content: ""; display: inline-block; min-height: inherit; height: 100%; vertical-align: middle;}.widget_svfu_search_outer{background: #93bede;position: relative;border:none;box-shadow: inset 0px 2px 3px 0px rgba(0, 0, 0, .3), 0px 1px 0px 0px rgba(255, 255, 255, .8);border-radius:5px;margin: 20px 0 20px 0;}.widget_svfu_search_outer input{height:95%;border:none;background:transparent;display: inline-block;vertical-align: middle;}.widget_svfu_search_outer input[type="text"]{width:86%;font: italic normal 90%/100% Arial, sans-serif;padding: 0 0 0 2%;}.widget_svfu_search_outer input[type="submit"]{width:12%;color: #2373B5;font:normal 200%/120% Arial,sans-serif;background: url(//'+servername+'/'+foldername+'/'+foldername+'/img/search_svfu.gif)center center no-repeat;cursor:pointer;}</style>';var text1='<span><span>Электронная библиотека СВФУ</span></span><span class="widget_svfu_search_outer"><input placeholder="Искать по автору ..." type="text" id="RP" name="RP" value=""/><input type="submit" name="widget_svfu_search_button" value=" "/></span><input type="hidden" name="from" value="'+val+'"/>';var text2='<span><span>Электронная библиотека СВФУ</span></span><span class="widget_svfu_search_outer"><input placeholder="Искать по ключевым словам ..." type="text" id="AH" name="AH" value=""/><input type="submit" name="widget_svfu_search_button" value=""/></span><input type="hidden" name="from" value="'+val+'"/>';divcode.n.innerHTML='<p class="blue b">Поиск по автору:</p><textarea>'+csstext+'<form class="widget_svfu" method="POST" accept-charset="UTF-8" action="//'+servername+'/'+foldername+'/find.php" target="_blank">'+text1+'</form></textarea><br/><br/><p class="blue b">Поиск по ключевым словам:</p><textarea>'+csstext+'<form class="widget_svfu" method="POST" accept-charset="UTF-8" action="//'+servername+'/'+foldername+'/find.php" target="_blank">'+text2+'</form></textarea>';divimg1.n.innerHTML=text1;divimg2.n.innerHTML=text2;divimg1.show();divimg2.show();}
else
alert("Адрес сайта введен некорректно!");}
function getCookies(thecookiename)
{var cookies=false;var all=document.cookie;if(all==="")
return cookies;else
{var list=all.split("; ");for(var i=0;i<list.length;i++)
{var cookie=list[i];var name=cookie.substring(0,cookie.indexOf("="));if(name==thecookiename)
{cookies=true;break;}}
return cookies;}}
function showSlidesCont(o)
{var arg={'cls':'dialog2','target':self,'message':'СОДЕРЖАНИЕ','forlinks':'1','divframe':'1'};showLayerWin('slidswin',arg);var arr=take(o).getsign('input',{type:'hidden'});var len=arr.length;var cssrule1='';var cssrule2='';var cssrule3='';var cssrule4='';var slides='';var div=take(document.body).create('div',{id:'slidescont'});div.hide();var styles=div.create('style',{type:'text/css'});var wrapper=div.create('div',{className:'wrapper hidden',id:'wrapper'});var panel=wrapper.create('div',{className:'panel'});div.create('div',{className:'lpanel'});div.create('div',{className:'rpanel'});var t=-40;var t1=-40;var tdelta=10;var h=180;var h1=180;var hdelta=-20;var l=-8;var ldelta=12;var l1=-28;var l1delta=-4;var len1=len;var k=0;for(var i=0;i<len;i++)
{if(i==0)
wrapper.create('input',{type:'radio',name:'point',id:'slide'+(i+1),checked:'checked'});else
wrapper.create('input',{type:'radio',name:'point',id:'slide'+(i+1)});panel.create('label',{'for':'slide'+(i+1)});cssrule1+='input:nth-of-type('+(i+1)+'):checked ~ .panel label:nth-child('+(i+1)+'),';cssrule2+='input:nth-of-type('+(i+1)+'):checked ~ img:nth-of-type('+(i+1)+'),';cssrule3+='input:nth-of-type('+(i+1)+'):checked ~ label:nth-of-type('+(i+2)+'),';}
cssrule1+='input:nth-of-type('+len+'):checked ~ .panel label:nth-child('+len+') { background: #333; border-color: #fff; }';cssrule2+='input:nth-of-type('+len+'):checked ~ img:nth-of-type('+len+') { opacity: 1;z-index: '+(len+1)+';transform: scale(1); }';cssrule3+='input:nth-of-type('+len+'):checked ~ label:nth-of-type(1) { z-index: '+(len+1)+'; }';for(var i=0;i<len;i++)
{wrapper.create('img',{src:arr[i].value,className:'ims'});for(var j=i;j<(len-1)+i;j++)
{if((j+2)<=len)
{cssrule4+='input:nth-of-type('+(i+1)+'):checked ~ img:nth-of-type('+(j+2)+') {top:'+t+'%; left:'+l+'%;height: '+h+'%;z-index:'+len1+';}';t+=tdelta;h+=hdelta;l+=ldelta;}
else
{cssrule4+='input:nth-of-type('+(i+1)+'):checked ~ img:nth-of-type('+(k+1)+') {top:'+t1+'%; left:'+l1+'%;height: '+h1+'%;z-index:'+len1+';}';t1+=tdelta;h1+=hdelta;l1+=l1delta;k++;}
len1--;}
len1=len;t1=t=-40;h1=h=180;l=-8;l1=-28;k=0;}
for(var i=0;i<len;i++)
{var lab=wrapper.create('label',{'for':'slide'+(i+1)});lab.create('img',{src:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='})}
wrapper.n.appendChild(panel.n);styles.n.innerHTML=cssrule1+' '+cssrule2+' '+cssrule3+' '+cssrule4;self.frames[0].document.open();self.frames[0].document.write('<html><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta http-equiv="Content-Script-Type" content="text/javascript"/><link href="/'+foldername+'/'+foldername+'/css/_additional/slides.css" type="text/css" rel="stylesheet"/><script>function preloadImages(){var arr=document.getElementsByTagName("img"); document.body.removeChild(document.getElementById("loader"));} window.onload=preloadImages;</script></head><body>'+div.n.innerHTML.replace(/checked="checked"/,'checked')+'<div id="loader"><div class="progress"><div></div></div></div></body></html>');self.frames[0].document.close();div.n.parentNode.removeChild(div.n);}
function preloadImages(imgs)
{var images=[];if(typeof imgs=="string")
images.push(imgs);else
images=imgs;for(i=0;i<images.length;i++)
{img=new Image();img.src=images[i];}}
function getBookInfo()
{if(take('searchrezult').n!=null)
{var arr=take('searchrezult').getsign('input',{className:'isbn'});if((typeof arr!="undefined")&&(arr.length>0))
{var str="";for(var i=0;i<arr.length;i++)
{str+='ISBN'+arr[i].value;if(i<arr.length-1)
str+=',';}
take('searchrezult').create('script',{src:'https://books.google.com/books?jscmd=viewapi&bibkeys='+str+'&callback=bookinfo'});}}}
function bookinfo(x)
{if(typeof x!="undefined")
{for(arg in x)
{var value=x[arg];var arr=take('infor').getsign('cite',{id:arg});for(var i=0;i<arr.length;i++)
{var img=take(arr[i]);if(img.n!=null)
{var par=img.n.parentNode;if(typeof value.thumbnail_url!="undefined")
{value.thumbnail_url=value.thumbnail_url.replace(/zoom=5/ig,'zoom=1');var fig=take(par).create('figure',{tabindex:'1'});fig.create('img',{border:'0',hSpace:'0',vSpace:'0',alt:'',title:'',src:value.thumbnail_url.replace(/\u0026/ig,'&')});par.removeChild(img.n);}
if(typeof value.info_url!="undefined")
{take(par).create('a',{className:'gb',href:value.info_url.replace(/\u0026/ig,'&'),target:'_blank',textNode:'GoogleBooks'});}}}}}}
function myHands()
{if(flag45)
{var arg={'cls':'dialog2','message':'КНИГИ НА РУКАХ','target':self,'callback':'callmyHands',callbackname:'Искать','width':'400','height':'250'};showLayerWin('orderwin',arg);var doc=take('orderwinform');doc.n.innerHTML="";var cont=doc.create('div',{id:'dateordcontainer',className:'period'});cont.create('b',{className:'to',textNode:'Код читателя',style:{display:'block',margin:'30px 0 10px 0'}});cont.create('input',{type:'text',maxLength:25,value:'',id:'icdr',name:'icdr'});}
else
{callmyHands();}}
function callmyHands()
{var handler=modules["order"].directory+'/libcard.php';var gArr=new Array();var querylist=new Array();gArr.push(["_action","php"]);gArr.push(["_errorhtml","error1"]);gArr.push(["_handler",handler]);querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);var fio="";var code=""
if(flag45)
{if((take('icdr').n!=null)&&(take('icdr').n.value!=""))
code=take('icdr').n.value;else
{alert('Введите код!');return;}}
else
{if(typeof AO!="undefined")
fio=AO;if(typeof FU!="undefined")
code=FU;}
querylist.push(["code",code]);querylist.push(["formBibl",'GIVEFORM']);querylist.push(["$fio",fio]);if(typeof _reader!="undefined")
querylist.push(["$reader",code]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);if((fio!="")&&(typeof EP!="undefined")&&(EP!="")&&(EP!="N/A"))
{querylist.length=0;querylist.push(["_service","STORAGE:opacholdd:InfoAbout"]);querylist.push(["_version","1.1.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["mode","ES"]);querylist.push(["code",EP]);gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);}
callToRCP(gArr);}
function prolong()
{typework="";var arg={'cls':'dialog2','message':'ПРОДЛИТЬ','target':self,'width':'500','height':'400'};var gArr=new Array();var querylist=new Array();gArr.push(["_action","execute"]);gArr.push(["_html","stat"]);gArr.push(["_errorhtml","error"]);querylist.push(["_service","STORAGE:opacholdd:ToProlong"]);querylist.push(["_version","1.0.0"]);querylist.push(["session",numsean]);querylist.push(["id",identif]);querylist.push(["status",'PROLONG']);var arr=take('searchrezult').getsign('input',{type:'checkbox'});var count=0;var adb="";for(var i=0;i<arr.length;i++)
{if((arr[i].checked)&&(arr[i].id!="mark"))
{querylist.push(["codeDoc["+count+"]",arr[i].value]);count++;}}
if(count==0)
{alert('Выберите документ!');return;}
if(confirm('Изменить дату возврата?'))
{gArr.push(["querylist",prepareQueryString(querylist,numdbBIBL)]);showLayerWin('orderwin',arg);ajaxToRCP(gArr,prolongOK);}}
function prolongOK(x)
{eval(x.responseText);if(typeof error!="undefined")
{delLayerWin();WriteError(error);}
else
{take('orderwinform').n.innerHTML='<div>Дата возврата изменена.</div>';setTimeout('delLayerWin()',1000);}}
function myBooks()
{var arg={'cls':'dialog2','target':self,'message':'ИСТОРИЯ ВЫДАЧ','callback':'callReaderHistory','callbackname':'Показать','width':'500','height':'400'};showLayerWin('recordswin',arg);var doc=take('recordswinform');doc.n.innerHTML="";var cont=doc.create('div',{id:'dateordcontainer',className:'period'});cont.create('div',{textNode:'Дата выполнения заказа',style:{fontWeight:'bold',margin:'5px 5px 25px 5px'}});cont.create('span',{className:'from',textNode:' с ',style:{marginRight:'15px'}});cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d1',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m1',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y1',onblur:'changeData',onmouseup:'changeData'});cont.create('span',{title:'Выбрать из календаря',id:'1',className:'calc',onmousedown:'CreateCal'});cont.create('br',{clear:'all'});cont.create('br',{clear:'all'});cont.create('span',{className:'to',textNode:' по ',style:{marginRight:'5px'}});cont.create('input',{className:'date',type:'text',maxLength:2,value:dd,id:'d2',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:2,value:mm,id:'m2',onblur:'changeData',onmouseup:'changeData'});cont.create('input',{className:'date',type:'text',maxLength:4,value:Year,id:'y2',onblur:'changeData',onmouseup:'changeData'});cont.create('span',{title:'Выбрать из календаря',id:'2',className:'calc',onmousedown:'CreateCal'});if(flag45)
{cont.create('b',{className:'to',textNode:'Код читателя',style:{display:'block',margin:'30px 0 10px 0'}});cont.create('input',{type:'text',maxLength:25,value:'',id:'icdr',name:'icdr'});}}
function callReaderHistory()
{var inputdata1=take('y1').n.value+''+take('m1').n.value+''+take('d1').n.value;var inputdata2=take('y2').n.value+''+take('m2').n.value+''+take('d2').n.value;var code="";if(inputdata2<inputdata1)
{alert('Неверно задан временной интервал!');return;}
if(flag45)
{if(take('icdr').n.value!="")
code=take('icdr').n.value;else
{alert('Введите код читателя!');return;}}
else
{code=FU;}
typework="";delLayerWin();var arg={'cls':'dialog2','target':self,'message':'История выдач','divframe':'1','forlinks':'1'};showLayerWin('recordswin',arg);self.frames[0].document.open();self.frames[0].document.close();trg=self.frames[0];var gArr=new Array();gArr.push(["_inputdata1",inputdata1]);gArr.push(["_inputdata2",inputdata2]);gArr.push(["_code",code]);gArr.push(["_height",window.innerHeight-200]);callToRCP(gArr,trg,pathhtml+'/_modules/readerhistory/readerhistory.php');}
function callBookRating()
{var ifr=null;if(take('nframe').n!=null)
ifr=take('nframe');else
ifr=take('infor').create('iframe',{src:'about:blank',marginHeight:'0',marginWidth:'0',border:'0',style:{margin:'0px',padding:'0px',width:'1px',height:'1px'},id:'nframe','name':'nframe',scrolling:'no',frameBorder:'0'});var idoc=(document.selection)?ifr.n.contentWindow.document:ifr.n.contentDocument;idoc.open();idoc.close();ifr.n.src=pathhtml+'/_modules/bookrating/_additional/bookrating.php';var arg={};arg.cls='loader1';showLayerWin('loader1win',arg);}
var Share={Url:function(o,purl,pimg,pdesc)
{if(typeof purl=="undefined")
{this.titl=document.title;var meta=document.getElementsByTagName('meta');for(var i=0;i<meta.length;i++)
{if(meta[i].name.toLowerCase()=="description")
{this.desc=meta[i].content;break;}}
this.URL='http://'+servername+'/'+foldername;this.IMG='http://'+servername+''+pathimg+'/logo_big.png';}
else
{if(pimg=="")
{if(o.parentNode.parentNode.firstChild.firstChild.nodeName.toLowerCase()=='figure')
{pimg=o.parentNode.parentNode.firstChild.firstChild.firstChild.src;}}
this.URL=purl;this.IMG=pimg;this.desc=replaceSymb3(pdesc);if(this.desc.indexOf('[/size]')!=-1)
{this.titl=this.desc.substring(this.desc.indexOf('[size=20]')+9,this.desc.indexOf('[/size]'));this.desc=this.desc.substring(this.desc.indexOf('[/size]')+7);this.desc=deleteBB(this.desc);}
else
this.titl=this.desc;}
this.caller=eval('this.'+o.className);this.caller();},vkontakte:function()
{url='https://vk.com/share.php?';url+='url='+encodeURIComponent(this.URL);url+='&title='+encodeURIComponent(this.titl);url+='&description='+encodeURIComponent(this.desc);url+='&image='+encodeURIComponent(this.IMG);url+='&noparse=true';Share.popup(url);},facebook:function()
{url='https://www.facebook.com/share.php?display=popup&';url+='u='+encodeURIComponent(this.URL);url+='&title='+encodeURIComponent(this.titl);url+='&picture='+encodeURIComponent(this.IMG);url+='&description='+encodeURIComponent(this.desc);Share.popup(url);},odnoklassniki:function()
{url='https://connect.ok.ru/offer?';url+='url='+encodeURIComponent(this.URL);url+='&title='+encodeURIComponent(this.titl);url+='&description='+encodeURIComponent(this.desc);Share.popup(url);},twitter:function()
{url='https://twitter.com/intent/tweet?';url+='text='+encodeURIComponent(this.titl);url+='&url='+encodeURIComponent(this.URL);url+='&hashtags='+encodeURIComponent('это интересно');Share.popup(url);},popup:function(url)
{var Scr="alwaysRaised=yes,menubar=yes,width=600,height=400,left="+parseInt(((screen.availWidth-1)-600)/2)+",top="+parseInt(((screen.availHeight-1)-400)/2)+",resizable=yes,scrollbars=no,toolbar=no,location=no,directories=no,status=no";var win=window.open(url,'',Scr);}};var onloadfuncs=new Array();function registrOnloadFunctions(func)
{var oldonload=window.onload;if(typeof window.onload!='function')
{window.onload=func;}
else
{onloadfuncs.push(oldonload);onloadfuncs.push(func);window.onload=function()
{for(i=0;i<onloadfuncs.length;i++)
{onloadfuncs[i]();}}}}