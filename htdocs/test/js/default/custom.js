var servername="opac64-test.liart.local";
var outform="SHOTFORM";
var outformfull="FULLFORM";
var uselight="yes";
var usesort="yes";
var foldername="test";
var pathactrcp="/request";
var pathcss="/test/test/css";
var pathjs="/test/test/js";
var pathimg="";
var pathhtml="/test/test/html";
var pathdoc="/test/test/documents";
var pathrubricator="/test/test/rubricator";
var groupcode="089ЧИТАТЕЛЬ_ОНЛАЙН";
var codepointreg="Читальный зал";
var notepointreg="Internet";
var dbs=[];
dbs["425"]=[];
dbs["425"]["type"]="BIBL";
dbs["425"]["mode"]="LOCAL";
dbs["425"]["alias"]="БД Ресурсы Интернет";
dbs["425"]["dbindex"]="interres";
dbs["425"]["outform"]="SHOTFORM";
dbs["425"]["outformfull"]="FULLFRM";
dbs["425"]["loadurl"]="stat";
dbs["425"]["seef"]="hierarchical";
dbs["425"]["bibcard"]="show";
dbs["425"]["rusmarc"]="show";
dbs["425"]["place"]="show";
dbs["425"]["additional"]=[];
dbs["425"]["additional"]["raitings"]="";
dbs["425"]["additional"]["comments"]="";
dbs["425"]["additional"]["social"]="display";
dbs["425"]["labels"]=[];
dbs["425"]["labels"]["AND"]=[" И ","",""];
dbs["425"]["labels"]["OR"]=[" ИЛИ ","",""];
dbs["425"]["labels"]["NOT"]=[" НЕ ","",""];
dbs["425"]["labels"]["8561"]=["Наличие ЭД","Y","N","N","false","count","desc","1"];
dbs["425"]["labels"]["FT"]=["Все поля","N","N","N","false","count","desc","1"];
dbs["425"]["labels"]["AU"]=["Автор","Y","Y","N","false","count","desc","1"];
dbs["425"]["labels"]["CA"]=["Коллективный автор","Y","Y","N","false","count","desc","1"];
dbs["425"]["labels"]["TI"]=["Заглавие","Y","N","N","false","count","desc","1"];
dbs["425"]["labels"]["PY"]=["Год публикации","Y","N","N","false","count","desc","1"];
dbs["425"]["labels"]["PP"]=["Место издания","Y","N","N","false","count","desc","1"];
dbs["425"]["labels"]["PU"]=["Издательство","Y","N","N","false","count","desc","1"];
dbs["425"]["labels"]["SE"]=["Серия","Y","N","N","false","count","desc","1"];
dbs["425"]["labels"]["SH"]=["Предметные рубрики","Y","Y","N","false","count","desc","1"];
dbs["425"]["labels"]["SU"]=["Тема","Y","Y","N","false","count","desc","1"];
dbs["425"]["labels"]["SB"]=["ISBN","Y","N","N","false","count","desc","1"];
dbs["425"]["labels"]["SS"]=["ISSN","Y","N","N","false","count","desc","1"];
dbs["425"]["labels"]["BC"]=["ББК","Y","N","N","false","count","desc","1"];
dbs["425"]["labels"]["KW"]=["Ключевые слова","Y","N","N","false","count","desc","1"];
dbs["425"]["labels"]["DT"]=["Дата ввода записи","Y","N","N","false","count","desc","1"];
dbs["425"]["labels"]["SO"]=["Заглавие источника","Y","N","N","false","count","desc","1"];
dbs["425"]["labels"]["NP"]=["Выпуск серии, номер журнала и т.д.","Y","N","N","false","count","desc","1"];
dbs["425"]["labels"]["IN"]=["Инвентарный номер/Баркод","Y","N","N","false","count","desc","1"];
dbs["425"]["labels"]["AH"]=["Везде","Y","N","N","false","count","desc","1"];
dbs["425"]["labels"]["VD1"]=["Тип документа","Y","N","N","false","count","desc","1"];
dbs["425"]["limits"]=[];
dbs["425"]["limits"]["0"]=[];
dbs["425"]["limits"]["0"]["name"]="0";
dbs["425"]["limits"]["0"]["title"]="Год";
dbs["425"]["limits"]["0"]["type"]="period";
dbs["425"]["limits"]["1"]=[];
dbs["425"]["limits"]["1"]["name"]="1";
dbs["425"]["limits"]["1"]["title"]="Аудитория";
dbs["425"]["limits"]["1"]["type"]="fixed";
dbs["425"]["limits"]["1"]["content"]=[];
dbs["425"]["limits"]["1"]["content"][0]=[];
dbs["425"]["limits"]["1"]["content"][0]["value"]="(LAUD 'ДЕТСКАЯ')";
dbs["425"]["limits"]["1"]["content"][0]["text"]="детская";
dbs["425"]["limits"]["1"]["content"][1]=[];
dbs["425"]["limits"]["1"]["content"][1]["value"]="(LAUD 'ЮНОШЕСКАЯ')";
dbs["425"]["limits"]["1"]["content"][1]["text"]="юношеская";
dbs["425"]["limits"]["1"]["content"][2]=[];
dbs["425"]["limits"]["1"]["content"][2]["value"]="(LAUD 'ВЗРОСЛАЯ')";
dbs["425"]["limits"]["1"]["content"][2]["text"]="взрослая";
dbs["425"]["filters"]=[];
dbs["425"]["filters"]["0"]=[];
dbs["425"]["filters"]["0"]["name"]="0";
dbs["425"]["filters"]["0"]["title"]="Год публикации";
dbs["425"]["filters"]["0"]["type"]="dinamic";
dbs["425"]["filters"]["0"]["label"]="PY";
dbs["425"]["filters"]["1"]=[];
dbs["425"]["filters"]["1"]["name"]="1";
dbs["425"]["filters"]["1"]["title"]="Язык публикации";
dbs["425"]["filters"]["1"]["type"]="fixed";
dbs["425"]["filters"]["1"]["label"]="LA";
dbs["425"]["filters"]["1"]["content"]=[];
dbs["425"]["filters"]["1"]["content"][0]=[];
dbs["425"]["filters"]["1"]["content"][0]["value"]="(LA 'RUS')";
dbs["425"]["filters"]["1"]["content"][0]["text"]="русский";
dbs["425"]["filters"]["1"]["content"][1]=[];
dbs["425"]["filters"]["1"]["content"][1]["value"]="(LA 'ENG')";
dbs["425"]["filters"]["1"]["content"][1]["text"]="английский";
dbs["425"]["filters"]["1"]["content"][2]=[];
dbs["425"]["filters"]["1"]["content"][2]["value"]="(LA 'FRE')";
dbs["425"]["filters"]["1"]["content"][2]["text"]="французский";
dbs["425"]["filters"]["1"]["content"][3]=[];
dbs["425"]["filters"]["1"]["content"][3]["value"]="(LA 'ITA')";
dbs["425"]["filters"]["1"]["content"][3]["text"]="итальянский";
dbs["425"]["filters"]["2"]=[];
dbs["425"]["filters"]["2"]["name"]="2";
dbs["425"]["filters"]["2"]["title"]="Местонахождение (только для книг)";
dbs["425"]["filters"]["2"]["type"]="fixed";
dbs["425"]["filters"]["2"]["label"]="FT";
dbs["425"]["filters"]["2"]["content"]=[];
dbs["425"]["filters"]["2"]["content"][0]=[];
dbs["425"]["filters"]["2"]["content"][0]["value"]="(MH 'ОФ' OR MH 'ОФА' OR MH 'ОФБ' OR MH 'ОФНЛ' OR MH 'АРХ' OR MH 'АУП' OR MH 'БУХ' OR MH 'ВИДЕОФОНД' OR MH 'ВЫСТ' OR MH 'ДИР' OR MH 'ИН-Т' OR MH 'КАДР' OR MH 'МОК' OR MH 'НМО' OR MH 'ОИТ' OR MH 'ОК' OR MH 'ОНБ' OR MH 'ОНО' OR MH 'ООЧЗ' OR MH 'ОРК' OR MH 'ОРКЛП' OR MH 'ОРКМЧ') AND (VD 'МНОГОТОМНИК (ОБЩАЯ ЧАСТЬ) ИНОСТРАННОЕ ИЗДАНИЕ' OR 'МНОГОТОМНИК (ОБЩАЯ ЧАСТЬ).' OR VD 'МНОГОТОМНИК (ТОМ ВЫПУСКА).' OR VD 'МНОГОТОМНИК (ТОМ ВЫПУСКА)' OR VD 'МНОГОТОМНИК (ЧАСТЬ ВЫПУСКА) ИНОСТРАННОЕ ИЗДАНИЕ' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ.' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ' OR VD 'РУКОПИСНЫЕ ПЬЕСЫ' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ОБЩАЯ ЧАСТЬ)' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ОБЩАЯ ЧАСТЬ) КАТАЛОГИЗАЦИЯ.' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ТОМ ВЫПУСКА)' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ТОМ ВЫПУСКА) КАТАЛОГИЗ.' OR VD 'КНИГА РУС.' OR VD 'РУС. ДРАМА .' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ. РЕПЕРТУАР.')";
dbs["425"]["filters"]["2"]["content"][0]["text"]="Читальный зал / Б.Дмитровка";
dbs["425"]["filters"]["2"]["content"][1]=[];
dbs["425"]["filters"]["2"]["content"][1]["value"]="((MH ИЗО*) OR (MH ИЗО*)) AND (VD 'МНОГОТОМНИК (ОБЩАЯ ЧАСТЬ) ИНОСТРАННОЕ ИЗДАНИЕ' OR 'МНОГОТОМНИК (ОБЩАЯ ЧАСТЬ).' OR VD 'МНОГОТОМНИК (ТОМ ВЫПУСКА).' OR VD 'МНОГОТОМНИК (ТОМ ВЫПУСКА)' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ' OR VD 'МНОГОТОМНИК (ЧАСТЬ ВЫПУСКА) ИНОСТРАННОЕ ИЗДАНИЕ' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ.' OR VD 'РУКОПИСНЫЕ ПЬЕСЫ' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ОБЩАЯ ЧАСТЬ)' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ОБЩАЯ ЧАСТЬ) КАТАЛОГИЗАЦИЯ.' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ТОМ ВЫПУСКА)' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ТОМ ВЫПУСКА) КАТАЛОГИЗ.' OR VD 'КНИГА РУС.' OR VD 'РУС. ДРАМА .' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ. РЕПЕРТУАР.')";
dbs["425"]["filters"]["2"]["content"][1]["text"]="Центр визуальной информации/Б. Дмитровка";
dbs["425"]["filters"]["2"]["content"][2]=[];
dbs["425"]["filters"]["2"]["content"][2]["value"]="(MH ОНИ*) AND (VD 'МНОГОТОМНИК (ОБЩАЯ ЧАСТЬ) ИНОСТРАННОЕ ИЗДАНИЕ' OR 'МНОГОТОМНИК (ОБЩАЯ ЧАСТЬ).' OR VD 'МНОГОТОМНИК (ТОМ ВЫПУСКА).' OR VD 'МНОГОТОМНИК (ЧАСТЬ ВЫПУСКА) ИНОСТРАННОЕ ИЗДАНИЕ' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ.' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ' OR VD 'РУКОПИСНЫЕ ПЬЕСЫ' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ОБЩАЯ ЧАСТЬ)' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ОБЩАЯ ЧАСТЬ) КАТАЛОГИЗАЦИЯ.' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ТОМ ВЫПУСКА)' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ТОМ ВЫПУСКА) КАТАЛОГИЗ.' OR VD 'КНИГА РУС.' OR VD 'РУС. ДРАМА .' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ. РЕПЕРТУАР.')";
dbs["425"]["filters"]["2"]["content"][2]["text"]="Отдел научной информации/Б. Дмитровка";
dbs["425"]["filters"]["2"]["content"][3]=[];
dbs["425"]["filters"]["2"]["content"][3]["value"]="(MH АБ*) AND (VD 'МНОГОТОМНИК (ОБЩАЯ ЧАСТЬ) ИНОСТРАННОЕ ИЗДАНИЕ' OR 'МНОГОТОМНИК (ОБЩАЯ ЧАСТЬ).' OR VD 'МНОГОТОМНИК (ТОМ ВЫПУСКА).' OR VD 'МНОГОТОМНИК (ЧАСТЬ ВЫПУСКА) ИНОСТРАННОЕ ИЗДАНИЕ' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ.' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ' OR VD 'РУКОПИСНЫЕ ПЬЕСЫ' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ОБЩАЯ ЧАСТЬ)' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ОБЩАЯ ЧАСТЬ) КАТАЛОГИЗАЦИЯ.' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ТОМ ВЫПУСКА)' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ТОМ ВЫПУСКА) КАТАЛОГИЗ.' OR VD 'КНИГА РУС.' OR VD 'РУС. ДРАМА .' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ. РЕПЕРТУАР.')";
dbs["425"]["filters"]["2"]["content"][3]["text"]="Абонемент / Петровские линии";
dbs["425"]["filters"]["3"]=[];
dbs["425"]["filters"]["3"]["name"]="3";
dbs["425"]["filters"]["3"]["title"]="Вид документа";
dbs["425"]["filters"]["3"]["type"]="fixed";
dbs["425"]["filters"]["3"]["label"]="FT";
dbs["425"]["filters"]["3"]["content"]=[];
dbs["425"]["filters"]["3"]["content"][0]=[];
dbs["425"]["filters"]["3"]["content"][0]["value"]="VD 'МНОГОТОМНИК (ОБЩАЯ ЧАСТЬ) ИНОСТРАННОЕ ИЗДАНИЕ' OR 'МНОГОТОМНИК (ОБЩАЯ ЧАСТЬ).' OR VD 'МНОГОТОМНИК (ТОМ ВЫПУСКА).' OR VD 'МНОГОТОМНИК (ЧАСТЬ ВЫПУСКА) ИНОСТРАННОЕ ИЗДАНИЕ' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ.' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ' OR VD 'РУКОПИСНЫЕ ПЬЕСЫ' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ОБЩАЯ ЧАСТЬ)' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ОБЩАЯ ЧАСТЬ) КАТАЛОГИЗАЦИЯ.' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ТОМ ВЫПУСКА)' OR VD 'СЕРИАЛЬНОЕ ИЗДАНИЕ (ТОМ ВЫПУСКА) КАТАЛОГИЗ.' OR VD 'КНИГА РУС.' OR VD 'РУС. ДРАМА .' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ. РЕПЕРТУАР.' ";
dbs["425"]["filters"]["3"]["content"][0]["text"]="Книги";
dbs["425"]["filters"]["3"]["content"][1]=[];
dbs["425"]["filters"]["3"]["content"][1]["value"]="VD 'ЭЛЕКТРОННЫЕ РЕСУРСЫ (ТОМ, ВЫПУСК).' OR VD 'ЭЛЕКТРОННЫЕ РЕСУРСЫ (ОДНОТОМ. ИЗДАНИЕ).' OR VD 'ЭЛЕКТРОННЫЕ РЕСУРСЫ (ОБЩАЯ ЧАСТЬ МНОГОТОМ.).' OR VD 'КОНКУРС. '";
dbs["425"]["filters"]["3"]["content"][1]["text"]="Электронные издания";
dbs["425"]["filters"]["3"]["content"][2]=[];
dbs["425"]["filters"]["3"]["content"][2]["value"]="VD 'ПЕРИОДИЧЕСКИЕ ИЗДАНИЯ (ОБЩАЯ ЧАСТЬ)' OR VD 'ПЕРИОДИЧЕСКИЕ ИЗДАНИЯ (ТОМ ВЫПУСКА)' OR VD 'ОДНОТОМНОЕ ИЗДАНИЕ ДЛЯ ПЕРИОД. ИЗД. (РЕТРО)'";
dbs["425"]["filters"]["3"]["content"][2]["text"]="Периодические издания";
dbs["425"]["filters"]["3"]["content"][3]=[];
dbs["425"]["filters"]["3"]["content"][3]["value"]="VD 'ГРАФИКА МАЛЫХ ФОРМ' OR VD 'РЕПРОДУКЦИИ' OR VD 'ФОТОГРАФИИ' OR VD 'ГРАВЮРЫ' OR VD 'ОТКРЫТКИ' OR VD 'АЛЬБОМЫ'";
dbs["425"]["filters"]["3"]["content"][3]["text"]="Изобразительный материал";
dbs["425"]["filters"]["3"]["content"][4]=[];
dbs["425"]["filters"]["3"]["content"][4]["value"]="VD 'ЧАСТЬ СБОРНИКА'";
dbs["425"]["filters"]["3"]["content"][4]["text"]="Статьи из сборников";
dbs["425"]["filters"]["3"]["content"][5]=[];
dbs["425"]["filters"]["3"]["content"][5]["value"]="VD 'СТАТЬИ ИЗ ЖУРНАЛОВ.' OR VD 'СТАТЬЯ ИЗ ЖУРНАЛА' OR VD 'РУССКАЯ ДРАМА, ЧАСТЬ ЖУРНАЛА.'";
dbs["425"]["filters"]["3"]["content"][5]["text"]="Статьи из журналов";
dbs["425"]["filters"]["3"]["content"][6]=[];
dbs["425"]["filters"]["3"]["content"][6]["value"]="VD 'СТАТЬИ ИЗ ГАЗЕТ'";
dbs["425"]["filters"]["3"]["content"][6]["text"]="Статьи из газет";
dbs["425"]["filters"]["3"]["content"][7]=[];
dbs["425"]["filters"]["3"]["content"][7]["value"]="VD 'ВИДЕОДОКУМЕНТЫ. МНОГОТОМНИК (ТОМ ВЫПУСКА).' OR VD 'ВИДЕОДОКУМЕНТЫ. МНОГОТОМНИК (ОБЩАЯ ЧАСТЬ).' OR VD 'КИНО- И ВИДЕОДОКУМЕНТЫ.'";
dbs["425"]["filters"]["3"]["content"][7]["text"]="Видеодокументы";
dbs["425"]["filters"]["3"]["content"][8]=[];
dbs["425"]["filters"]["3"]["content"][8]["value"]="VD 'СПРАВКИ'";
dbs["425"]["filters"]["3"]["content"][8]["text"]="Библиографические списки";
dbs["425"]["filters"]["3"]["content"][9]=[];
dbs["425"]["filters"]["3"]["content"][9]["value"]="VD 'МИКРОФИШИ (ОБЩАЯ ЧАСТЬ МНОГОТОМНИКА.)' OR VD 'МИКРОФИШИ (ОДНОТОМН.ИЗДАНИЕ)' OR VD 'МИКРОФИШИ (ТОМ, ВЫПУСК)' OR VD 'АНАЛИТИЧЕСКОЕ ОПИСАНИЕ МИКРОФИШ'";
dbs["425"]["filters"]["3"]["content"][9]["text"]="Микрофиши";
dbs["425"]["filters"]["3"]["content"][10]=[];
dbs["425"]["filters"]["3"]["content"][10]["value"]="VD 'СЕТЕВОЙ РЕСУРС'";
dbs["425"]["filters"]["3"]["content"][10]["text"]="Ресурсы интернет";
dbs["425"]["filters"]["3"]["content"][11]=[];
dbs["425"]["filters"]["3"]["content"][11]["value"]="8561 '8561'";
dbs["425"]["filters"]["3"]["content"][11]["text"]="Цифровые копии";
dbs["400"]=[];
dbs["400"]["type"]="BIBL";
dbs["400"]["mode"]="LOCAL";
dbs["400"]["alias"]="Газетные статьи (Полный текст)";
dbs["400"]["dbindex"]="gz_elar";
dbs["400"]["outform"]="SHOTFORM";
dbs["400"]["outformfull"]="FULLFRM";
dbs["400"]["loadurl"]="link";
dbs["400"]["bibcard"]="show";
dbs["400"]["rusmarc"]="show";
dbs["400"]["labels"]=[];
dbs["400"]["labels"]["AND"]=[" И ","",""];
dbs["400"]["labels"]["OR"]=[" ИЛИ ","",""];
dbs["400"]["labels"]["NOT"]=[" НЕ ","",""];
dbs["400"]["labels"]["FT"]=["Все поля","N","N","N","false","count","desc","1"];
dbs["400"]["labels"]["AU"]=["Индивид. автор, редактор, составитель и др.","Y","Y","N","false","count","desc","1"];
dbs["400"]["labels"]["TI"]=["Заглавие","Y","N","N","false","count","desc","1"];
dbs["400"]["labels"]["SO"]=["Заглавие источника","Y","N","N","false","count","desc","1"];
dbs["400"]["labels"]["TEXT"]=["ПолнотекстПоиск","Y","N","N","false","count","desc","1"];
var numdbBIBL="425";
var numdbf="0";
