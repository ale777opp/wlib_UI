<?php 
// /htdocs/wlib/html/_includes
function get_base($data,$id){
	
	$wrong_bases = array(12,17,21,404,410,417,425,400,403,305,8); // базы, для которых скрыть кнопку "Копировать фрагмент"
	
	$json = json_decode($data['response'],1);
	
	$num = explode('\\\\',$id);

	//print_r($id);
	
	foreach($json['response_0'] as $item){
	
		//echo $item['id'];

		echo "<pre>";
		//print_r($json);
		echo "</pre>";

		if (array_key_exists('id', $item)) {
			
			if(strpos($item['id'], $num[2]) || $id == $item['id']){
			
				if(in_array($item['sourceIddb'], $wrong_bases)){
		
					return 'false';
				
				}
			}
		}
	}
	
	return 'true';
	
	//return $json[response_0];
}

function getuserinfo($session){

	$handle = fopen(THEHISTORYPATH."/".$session."/user.conf", "r");
	
	while (!feof($handle)) {
		$buffer[] = fgets($handle, 4096);
		
	}
	fclose($handle);
	
	$str = http_build_query($buffer);
		
	return $str;
}


?>
