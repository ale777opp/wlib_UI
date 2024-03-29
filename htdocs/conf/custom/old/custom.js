var servername="emll-copy.rucml.ru";
var outform="SHOTFORM";
var outformfull="FULLFORM";
var fromaftobibl=["AUIDS","Код"];
var usesort="yes";
var solr="yes";
var foldername="newlib";
var pathactrcp="/request";
var pathcss="/newlib/newlib/css";
var pathjs="/newlib/newlib/js";
var pathimg="/newlib/newlib/img";
var pathhtml="/newlib/newlib/html";
var pathdoc="/newlib/newlib/documents";
var pathrubricator="/newlib/newlib/rubricator";
var dbs=[];
dbs["17"]=[];
dbs["17"]["type"]="BIBL";
dbs["17"]["mode"]="LOCAL";
dbs["17"]["alias"]="Единый каталог ФЭМБ";
dbs["17"]["dbindex"]="ecfemb";
dbs["17"]["outform"]="SHORTWEB";
dbs["17"]["outformfull"]="FULLWEB";
dbs["17"]["loadurl"]="link";
dbs["17"]["seef"]="hierarchical";
dbs["17"]["bibcard"]="show";
dbs["17"]["additional"]=[];
dbs["17"]["additional"]["raitings"]="";
dbs["17"]["additional"]["comments"]="";
dbs["17"]["additional"]["social"]="display";
dbs["17"]["labels"]=[];
dbs["17"]["labels"]["AND"]=[" И ","",""];
dbs["17"]["labels"]["OR"]=[" ИЛИ ","",""];
dbs["17"]["labels"]["NOT"]=[" НЕ ","",""];
dbs["17"]["labels"]["AUIDS"]=["Код","",""];
dbs["17"]["labels"]["AH"]=["Везде","Y","N","N","false"];
dbs["17"]["labels"]["RP"]=["Автор","Y","N","author","true"];
dbs["17"]["labels"]["TITL"]=["Заглавие","Y","N","N","false"];
dbs["17"]["labels"]["TIJ"]=["Заглавие журнала","Y","N","N","true"];
dbs["17"]["labels"]["SC"]=["Предметная категория","Y","Y","subject","true"];
dbs["17"]["labels"]["TM"]=["Тема","Y","N","N","false"];
dbs["17"]["labels"]["NI"]=["ISBN/ISSN","Y","N","N","false"];
dbs["17"]["labels"]["PM"]=["Публикация/Изготовление","Y","N","N","false"];
dbs["17"]["labels"]["KL"]=["Классификация","Y","N","N","false"];
dbs["17"]["labels"]["GC"]=["ГАСНТИ","Y","N","N","false"];
dbs["17"]["labels"]["FGOS"]=["Специальность/Дисциплина","Y","Y","N","false"];
dbs["17"]["labels"]["PN"]=["Имя лица","Y","Y","N","false"];
dbs["17"]["labels"]["CM"]=["Организация","Y","Y","N","false"];
dbs["17"]["labels"]["COD"]=["Код","Y","N","N","false"];
dbs["17"]["labels"]["MS"]=["MeSH","Y","Y","N","false"];
dbs["17"]["labels"]["FG"]=["Форма, жанр и т.д.","Y","Y","N","false"];
dbs["17"]["labels"]["ACS"]=["Режим доступа","Y","N","N","true"];
dbs["17"]["labels"]["LFC"]=["Форма содержания","Y","N","N","true"];
dbs["17"]["labels"]["LFR"]=["Форма ресурса","Y","N","N","true"];
dbs["17"]["labels"]["LLA"]=["Язык публикации","Y","N","N","true"];
dbs["17"]["labels"]["LPUB"]=["Вид издания","Y","N","N","true"];
dbs["17"]["labels"]["LRES"]=["Вид документа","Y","N","N","true"];
dbs["17"]["labels"]["DT"]=["Дата ввода записи","Y","N","N","false"];
dbs["17"]["limits"]=[];
dbs["17"]["limits"]["0"]=[];
dbs["17"]["limits"]["0"]["name"]="0";
dbs["17"]["limits"]["0"]["title"]="Год";
dbs["17"]["limits"]["0"]["type"]="period";
dbs["17"]["limits"]["1"]=[];
dbs["17"]["limits"]["1"]["name"]="1";
dbs["17"]["limits"]["1"]["title"]="Режим доступа";
dbs["17"]["limits"]["1"]["type"]="fixed";
dbs["17"]["limits"]["1"]["content"]=[];
dbs["17"]["limits"]["1"]["content"][0]=[];
dbs["17"]["limits"]["1"]["content"][0]["value"]="(ACS 'СВОБОДНЫЙ')";
dbs["17"]["limits"]["1"]["content"][0]["text"]="свободный";
dbs["17"]["limits"]["1"]["content"][1]=[];
dbs["17"]["limits"]["1"]["content"][1]["value"]="(ACS 'АБОНЕМЕНТ')";
dbs["17"]["limits"]["1"]["content"][1]["text"]="абонемент";
dbs["51"]=[];
dbs["51"]["type"]="BIBL";
dbs["51"]["mode"]="LOCAL";
dbs["51"]["alias"]="Клинические рекомендации";
dbs["51"]["dbindex"]="clinrecs";
dbs["51"]["outform"]="SHORTWEB";
dbs["51"]["outformfull"]="FULLWEB";
dbs["51"]["loadurl"]="link";
dbs["51"]["seef"]="hierarchical";
dbs["51"]["bibcard"]="show";
dbs["51"]["additional"]=[];
dbs["51"]["additional"]["raitings"]="";
dbs["51"]["additional"]["comments"]="";
dbs["51"]["additional"]["social"]="display";
dbs["51"]["labels"]=[];
dbs["51"]["labels"]["AND"]=[" И ","",""];
dbs["51"]["labels"]["OR"]=[" ИЛИ ","",""];
dbs["51"]["labels"]["NOT"]=[" НЕ ","",""];
dbs["51"]["labels"]["AUIDS"]=["Код","",""];
dbs["51"]["labels"]["AH"]=["Везде","Y","Y","N","false"];
dbs["51"]["labels"]["RP"]=["Автор","Y","N","N","true"];
dbs["51"]["labels"]["TITL"]=["Заглавие","Y","N","N","false"];
dbs["51"]["labels"]["PROF"]=["Профиль КР","Y","N","N","true"];
dbs["51"]["labels"]["ICDCLS"]=["Класс заболеваний","Y","N","N","true"];
dbs["51"]["labels"]["ICDSH"]=["Код МКБ-10","Y","N","N","true"];
dbs["51"]["labels"]["AID"]=["Вид помощи","Y","N","N","true"];
dbs["51"]["labels"]["AGE"]=["Возраст","Y","N","N","true"];
dbs["51"]["labels"]["SC"]=["Предметная категория","Y","Y","subject","true"];
dbs["51"]["labels"]["TM"]=["Тема","Y","N","N","false"];
dbs["51"]["labels"]["MCT"]=["Возраст","Y","Y","N","false"];
dbs["51"]["labels"]["MS"]=["MeSH","Y","Y","N","false"];
dbs["51"]["labels"]["COD"]=["MeSH-код","Y","N","N","false"];
dbs["51"]["labels"]["LRES"]=["Вид документа","Y","N","N","true"];
dbs["51"]["labels"]["LFC"]=["Форма содержания","Y","N","N","true"];
dbs["51"]["labels"]["LLA"]=["Язык публикации","Y","N","N","true"];
dbs["51"]["labels"]["LPUB"]=["Вид издания","Y","N","N","true"];
dbs["51"]["labels"]["LFR"]=["Форма ресурса","Y","N","N","true"];
dbs["51"]["limits"]=[];
dbs["51"]["limits"]["0"]=[];
dbs["51"]["limits"]["0"]["name"]="0";
dbs["51"]["limits"]["0"]["title"]="возраст";
dbs["51"]["limits"]["0"]["type"]="fixed";
dbs["51"]["limits"]["0"]["content"]=[];
dbs["51"]["limits"]["0"]["content"][0]=[];
dbs["51"]["limits"]["0"]["content"][0]["value"]="(MCT 'ДЕТИ')";
dbs["51"]["limits"]["0"]["content"][0]["text"]="дети";
dbs["51"]["limits"]["0"]["content"][1]=[];
dbs["51"]["limits"]["0"]["content"][1]["value"]="(MCT 'ВЗРОСЛЫЕ')";
dbs["51"]["limits"]["0"]["content"][1]["text"]="взрослые";
dbs["51"]["limits"]["1"]=[];
dbs["51"]["limits"]["1"]["name"]="1";
dbs["51"]["limits"]["1"]["title"]="вид помощи";
dbs["51"]["limits"]["1"]["type"]="fixed";
dbs["51"]["limits"]["1"]["content"]=[];
dbs["51"]["limits"]["1"]["content"][0]=[];
dbs["51"]["limits"]["1"]["content"][0]["value"]="(AID 'АМБУЛАТОРНО')";
dbs["51"]["limits"]["1"]["content"][0]["text"]="амбулаторно";
dbs["51"]["limits"]["1"]["content"][1]=[];
dbs["51"]["limits"]["1"]["content"][1]["value"]="(AID 'В ДНЕВНОМ СТАЦИОНАРЕ')";
dbs["51"]["limits"]["1"]["content"][1]["text"]="в дневном стационаре";
dbs["51"]["limits"]["1"]["content"][2]=[];
dbs["51"]["limits"]["1"]["content"][2]["value"]="(AID 'СТАЦИОНАРНО')";
dbs["51"]["limits"]["1"]["content"][2]["text"]="стационарно";
dbs["51"]["limits"]["1"]["content"][3]=[];
dbs["51"]["limits"]["1"]["content"][3]["value"]="(AID 'CКОРАЯ ПОМОЩЬ')";
dbs["51"]["limits"]["1"]["content"][3]["text"]="скорая помощь";
dbs["24"]=[];
dbs["24"]["type"]="AF";
dbs["24"]["mode"]="LOCAL";
dbs["24"]["alias"]="Медицинские предметные рубрики (MeSH)";
dbs["24"]["dbindex"]="mesh";
dbs["24"]["afrubricator"]="3";
dbs["24"]["labels"]=[];
dbs["24"]["labels"]["AND"]=[" И ","",""];
dbs["24"]["labels"]["OR"]=[" ИЛИ ","",""];
dbs["24"]["labels"]["NOT"]=[" НЕ ","",""];
dbs["24"]["labels"]["AUIDS"]=["Код","",""];
dbs["24"]["labels"]["MS"]=["MeSH","Y","Y","N","false"];
dbs["24"]["labels"]["SHM"]=["Рубрики верхнего уровня MESH","Y","Y","N","false"];
dbs["6"]=[];
dbs["6"]["type"]="AF";
dbs["6"]["mode"]="LOCAL";
dbs["6"]["alias"]="Авторитетный файл ЦНМБ";
dbs["6"]["dbindex"]="muaf";
dbs["6"]["afrubricator"]="2";
dbs["6"]["labels"]=[];
dbs["6"]["labels"]["AND"]=[" И ","",""];
dbs["6"]["labels"]["OR"]=[" ИЛИ ","",""];
dbs["6"]["labels"]["NOT"]=[" НЕ ","",""];
dbs["6"]["labels"]["AUIDS"]=["Код","",""];
dbs["6"]["labels"]["AH"]=["Все заголовки","Y","Y","N","false"];
dbs["6"]["labels"]["PN"]=["Имя лица","Y","Y","N","false"];
dbs["6"]["labels"]["CM"]=["Наименование организации","Y","Y","N","false"];
var numdbBIBL="17";
var numdbf="6";
