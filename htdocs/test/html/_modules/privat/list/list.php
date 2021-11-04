<?php  
// /htdocs/wlib/html/_modules/privat/list

require_once(THEINCLUDESPATH.'/functions.php'); 
require_once(THEINCLUDESPATH.'/handlers.php');
$globaloutput='<div id="infor"><div class="col_title">';
$ufio="";

if(isset($_POST['response']))
{
	
	$result=prepareJson($_POST['response']);
	$response0=$result->response_0;
	list($rvars, $realname) = printResponseVars($response0,"");
	echo $rvars;
	
	

	//создание скрытого поля с информацией о читателе для дальнейшей передачи scan.liart.ru
	$user_info = getuserinfo(substr($response0->session, -6));
	$globaloutput .= '<input type="hidden" id="user_card_info" value="'.$user_info.'" />';
	
	if(isset($response0->_iddb))
		$iddb=$response0->_iddb;
	if(isset($response0->_localiddb))
	{
		$iddb=$response0->_localiddb;
		$particle="lib_";
	}
	if(isset($response0->_skin))
	{
		if($response0->_skin!="")
			$skin=$response0->_skin;
	}
	if(isset($response0->_id))
		$lind=$response0->_id;
	if(isset($response0->_ltitle))
		$ltitle=$response0->_ltitle;
	if(isset($response0->_laddress))
		$laddress=$response0->_laddress;
	if(isset($response0->_sigla))
		$sigla=$response0->_sigla;
	if(isset($response0->_site))
		$site=$response0->_site;
	if(isset($response0->_elcat))
		$elcat=$response0->_elcat;
	$start=intval($response0->start);
	$size=intval($response0->size);
	$total=intval($response0->total);
	$length=intval($response0->length);
	$s=intval($response0->session);
	$uclaim="";
	$uprolong="";
	$ulogout="";
	$ustat="";
	$uhistlog="";
	$ufio=$response0->_fio;
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
				if($result->response_1->balanceES_0->status != "SOON")
				{
					$ustat='<input type="button" class="button2" value="Статистика" onmousedown="statInd();"/>';
				}
			}
		}
		$uhistlog='<input type="button" class="button2" value="История сеансов" onmousedown="showAllLists()"/>';
	}
	else
	{
		if($flag45)
			$uclaim='<input type="button" class="button2" value="Печать требований" onmousedown="printClaim()"/>';
	}
	if(isset($_POST['_auth']))
		$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info">'.$ufio.'</span></div>';
	$globaloutput.='<div id="buttons_title" class="fright">';
	if(isset($_POST['_auth']))
		$globaloutput.=$uprolong.''.$ustat.'<input type="button" class="button2" value="Список заказов" onmousedown="ordersSearch();"/>';
	$globaloutput.=''.$ulogout.'</div><div class="spacer"></div></div><div class="spacer"></div><div class="h3">Список литературы сеанса: <b class="highlight">'.$s.'</b></div><div class="spacer"></div>';
	
	if($total==0)
	{
		$globaloutput.='<br/><br/><br/><div class="period_container acenter b p30x f80 h250x">Список литературы пуст.<br/><br/>'.$uhistlog.' </div>';
	}
	else
	{
		$globaloutput.='<div class="memo"><span class="fright"><b>Показывать:</b><br/><select id="portionlist" onchange="showOrderList(null,'.$s.');">';
		if($start==15)
			$globaloutput.='<option value="15" selected="selected">15</option>';
		else
			$globaloutput.='<option value="15">15</option>';
		if($start=='50')
			$globaloutput.='<option value="50" selected="selected">50</option>';
		else
			$globaloutput.='<option value="50">50</option>';
		if($start=='100')
			$globaloutput.='<option value="100" selected="selected">100</option>';
		else
			$globaloutput.='<option value="100">100</option>';
		if($length==$total)
			$globaloutput.='<option value="'.$total.'" selected="selected">все</option>';
		else
			$globaloutput.='<option value="'.$total.'">все</option>';
		$globaloutput.='</select></span><span class="fleft"><b style="margin-left:5px">Всего записей в списке:</b> <b class="highlight" id="termin1">'.$total.'</b>&#160;&#160;<b>Отмечено записей:</b> <b class="highlight" id="marked">0</b><br/>'.$uclaim.'<input type="button" class="button2" value="Печать cписка" onmousedown="listPrint();"/><input type="button" class="button2" value="Выгрузить в Word" onmousedown="loadWord();"/><input type="button" class="button2" value="Удалить" onmousedown="listDel();"/><input type="button" id="copy_button" class="button2" value="Копировать фрагмент" onmousedown="multiAddToScan();"/>'.$uhistlog.'</span><div class="spacer" style="height: 5px"> </div></div>';
		$N1=ceil($total/$length);
		//$output.='<div><span class="url uslugi" onmousedown="sendToScan(\''.$theid.'\');">Заказать копию</span></div>';
		if($N1!= 1)
		{
			$globaloutput.='<p class="pages">'.resPaginator($start,$length,$total,$s,'2').'</p><br/>';
		}
		$count=0;
		$linordcount=-1;
		$globaloutput.= '<div id="red_message"></div>';
		$globaloutput.='<div class="col_content"><table cellspacing="0" class="filter mb210x" id="tableorder"><thead><tr class="h2"><td class="w3 acenter amiddle"><input type="checkbox" onclick="Marklist(this)" id="mark" value=""/></td><td class="w3 acenter b amiddle nowrap">№<br/>п/п</td><td class="acenter b amiddle">Документ</td><td class="acenter b amiddle td2unvisible">База данных</td><td class="acenter b amiddle td2unvisible">Дата добавления</td></tr></thead><tbody>';
		foreach ($response0 as $key => $value)
		{
			$res = strpos($key, 'result_'); 
			if($res !== false)
			{
				$ldb=$value->iddb;
				if(isset($value->ORDERFORM_0))
				{
					$count++;
					$linordcount++;
					$linord='result_'.$linordcount;
					if($count % 2 == 0)
					{
						$globaloutput.='<tr class="h2"><td class="check w3 acenter" ><input type="checkbox" name="marker" value="'.$value->id.'" onclick="countList()" class="'.$ldb.'"/></td><td class="num w3 acenter b">'.($start+$count).'.</td><td class="short">';
					}
					else
					{
						$globaloutput.='<tr class="c2"><td class="check w3 acenter"><input type="checkbox" name="marker" value="'.$value->id.'" onclick="countList()" class="'.$ldb.'"/></td><td class="num w3 acenter b">'.($start+$count).'.</td><td class="short">';
					}
					$arr=$value->ORDERFORM_0;
					
					
					$arrlen=count($arr);
					for($j=0; $j<$arrlen; $j++)
					{
						$res1 = strpos($arr[$j], '[URL]');
						if($res1!== false)
							$globaloutput.='<p onmousedown="loadFreeUrl(\''.addslashes($value->id).'\',\''.substr($arr[$j],strpos($arr[$j],'>')+1).'\')" class="URL">'.substr($arr[$j],strpos($arr[$j],'<')+1,strpos($arr[$j],'>')-strpos($arr[$j],'<')-1).'</p>';
						else
							$globaloutput.=parseBB($arr[$j]);
					}
					if(isset($value->sourceIddb))
					{
						$ldb=$value->sourceIddb;
						$item='dbs_'.$ldb;
						if(isset($fjson->$item->alias))
							$ldb=$fjson->$item->alias;
					}
					$globaloutput.='</td><td class="acenter td1unvisible">'.$ldb.'</td><td class="acenter">'.substr($value->date,6).'.'.substr($value->date,4,2).'.'.substr($value->date,0,4).' '.substr($value->time,0,2).':'.substr($value->time,2,2).':'.substr($value->time,4).'</td></tr>';
				}
				if(isset($value->error_0))
				{
					$count++;
					$globaloutput.='<tr style="background: #fff"><td class="check"  class="w3 acenter"><input type="checkbox" name="marker" value="'.$value->id.'" onclick="countList()" class="'.$ldb.'"/></td><td class="num"  class="w3 acenter b">'.($start+$count).'</td><td class="short" style="color: #900">';
					$globaloutput.=$value->error_0[0].'</td><td class="acenter">'.$ldb.'</td><td class="acenter">'.substr($value->date,6).'.'.substr($value->date,4,2).'.'.substr($value->date,0,4).' '.substr($value->time,0,2).':'.substr($value->time,2,2).':'.substr($value->time,4).'</td></tr>';
					
				}
			}
		}
		$globaloutput.='</tbody></table></div><div class="spacer h50x"> </div>';
		if($N1!= 1)
		{
			$globaloutput.='<p class="pages">'.resPaginator($start,$length,$total,$s,'2').'</p><br/>';
		}
	}
	$globaloutput.='</div>';
}
else
{
	if(isset($_POST['fio']))
		$ufio=$_POST['fio'];
	$globaloutput.='<div id="user_info_title" class="fleft"><span class="caption">Личный кабинет</span><span id="user_info">'.$ufio.'</span></div></div><div class="acenter f80 lh80"><br/><br/><br/><div class="period_container acenter b p30x f80 h250x">Список литературы пуст.<br/><br/>'.$uhistlog.'</div></div></div>';
}
include (THEPAGESPATH.'/includes/'.$particle.'searchdiv.php');
echo $globaloutput;
?>
<script type="text/javascript">
	
	var data = <?php echo check_bases($_POST['response']); ?>; //получение списка критериев для отключения возможности заказа
	
	//раскрашивание и добавление класса get_off
	var checkboxes = document.getElementsByName("marker");
	
	for(var i=0; i<checkboxes.length; i++){
	
		if(data.indexOf(checkboxes[i].value) != -1){
			
			checkboxes[i].parentNode.className += " get_off";
			var firstsib = checkboxes[i].parentNode.nextSibling;
			var title = firstsib.nextSibling;
			title.style = "color:red";
			
		}

	}
	
	
	var off_checkboxes = document.getElementsByClassName('get_off');
	if(off_checkboxes.length>0){
		var red_message = document.getElementById('red_message');
		red_message.innerHTML = '<small>Издания, выделенные красным цветом, не подлежат копированию.</small>';
		red_message.style = 'margin: 1% 10%; color:red; border:1px solid #777; padding:5px; text-align:center';
	
	}
	
	// блок отключения
	var btn = document.getElementById('copy_button');
	

	window.addEventListener('click', function all_check_boxes(){
		
		for(var j=0; j<off_checkboxes.length; j++){	
			
			if(off_checkboxes[j].firstChild.checked == true){
				btn.disabled = true;
				break;
			}else{
				btn.disabled = false;
			}
		}
			
	}); 
	
	
</script>

<?php
include (THEPAGESPATH.'/includes/'.$particle.'footer.php');
?>

