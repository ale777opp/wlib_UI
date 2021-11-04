<?php  
require_once(THEINCLUDESPATH.'/functions.php');  
$globaloutput='<div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div><div id="info"><div class="col_title">';
$ufio="";
if(isset($_POST['response']))
{
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	$uprolong="";
	$ulogout="";
	$uhistlog="";
	$ufio=$response0->_fio;
	$ucode=$response0->_AI;
	$umail=$response0->_umail;
	$date0=$response0->_date0;
	$date1=$response0->_date1;
	$groupid=$response0->_groupid;
	if($ufio!="")
	{
		if(isset($result->response_1))
		{
			if(isset($result->response_1->balanceES_0))
			{
				if($result->response_1->balanceES_0->type == "INDIVIDUAL")
				{
					if($result->response_1->balanceES_0->status != "YES")
					{
						$uprolong='<input type="button" class="url" value="Новый абонемент" onmousedown="prolongSign();"/>';
					}
				}
			}
		}
		/*$ulogout='<input type="button" class="button2" value="Завершить сеанс" onmousedown="closeSession()"/>';
		$uhistlog='<input type="button" class="button2" value="История сеансов" onmousedown="showAllLists()"/>';*/
	}
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info">'.$ufio.'</span></div><div id="buttons_title" class="fright">'.$uprolong.''.$uhistlog.'<input type="button" class="button2" value="Список литературы" onmousedown="showOrderList()"/><input type="button" class="button2" value="Список заказов" onmousedown="ordersSearch();"/>'.$ulogout.'</div></div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="10" width="100"/></div><div class="h3">Список читателей</div><div class="spacer"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" height="5" width="100"/></div><div class="period_container"><input type="button" class="button2" value="&#12296; к статистике" onmousedown="statInd();"/><input type="hidden" id="begin" name="begin" value="'.$response0->_begin.'"/></div><div class="col_content">';
	$count=0;
	$globaloutput.='<input type="hidden" id="dtc" name="dtc" value="'.$date0.'"/><input type="hidden" id="dts" name="dts" value="'.$date1.'"/><table cellspacing="0" class="filter" id="tableorder"><thead><tr class="h2"><td class="b amiddle">№<br/>п/п</td><td class="b amiddle">ФИО</td><td class="b amiddle">email</td><td class="acenter b amiddle">кол-во<br/>заказов</td></tr></thead><tbody>';
	foreach ($response0 as $key => $value)
	{
		$res = strpos($key, 'members_'); 
		if($res !== false)
		{
			$count++;
			if($count % 2 == 0)
			{
				$globaloutput.='<tr class="h2">';
			}
			else
			{
				$globaloutput.='<tr class="c2">';
			}
			$globaloutput.='<td class="b">'.$value->n.'</td><td>'.$value->fio.'<input type="hidden" id="uml" name="uml" value="'.$umail.'"/><input type="hidden" id="dtc" name="dtc" value="'.$response0->_dtc.'"/></td><td>'.$value->email.'</td><td class="acenter"><span class="blue">'.$value->numberOrders.'</span>';
			if(intval($value->numberOrders)>0)
				$globaloutput.='<span class="col_title"><input type="button" class="list_readers button2" value="подробнее" onclick="seeAddStatInd(\''.addslashes($value->readerId).'\')"/></span>';
			$globaloutput.='</td></tr>';
		}
	}
	$globaloutput.='</tbody></table><div class="spacer" style="height: 10px">&#160;</div><div class="period_container"><input type="button" class="button2" value="&#12296; к статистике" onmousedown="statInd();"/></div></div></div>';
}
else
{
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info">'.$ufio.'</span></div></div><div class="col_content"><br/><br/><div class="b i acenter">Статистика отсутствует.</div></div></div>';
}
include (THEPAGESPATH.'/includes/searchdiv.php');
echo $globaloutput;
include (THEPAGESPATH.'/includes/footer.php');
?>
