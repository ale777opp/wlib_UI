<?php
require_once('functions.php');
if(isset($_POST['sortpath']))
{
	$path1=$_POST['sortpath'].'conf/default/conf/sort.conf';
	$path2=$_POST['sortpath'].'conf/custom/conf/sort.conf';
	$jstr=$_POST['sortjson'];
	if(is_writable($path1))
	{
		writeFile($path1,$jstr);
	}
	else
		echo 'alert("Не удалось записать данные в файл '.$path1.'!");';
	if(is_writable($path2))
	{
		writeFile($path2,$jstr);
		echo 'alert("Список меток для сортировки изменен!");';
	}
	else
		echo 'alert("Не удалось записать данные в файл '.$path2.'!");';
}
?>
