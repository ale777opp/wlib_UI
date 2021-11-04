<?php 
// /htdocs/wlib/html/pages/index
class Db{
    protected $pdo;
	protected $db = array();
	public $data = array();
	
	public function pdo_connect(){
		try{
			$this->pdo = new PDO("mysql:host={$this ->db['dbhost']};dbport={$this ->db['dbport']};dbname={$this ->db['dbname']};charset=utf8", $this ->db['dbuser'], $this ->db['dbpass']);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch(PDOException $e){
            echo $e->getMessage();
        }
	}

	public function pdo_query($query){
	
		$this->pdo->beginTransaction();
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $this->pdo->commit();
		return $result;
	
	}
	
    public function __construct(){
		$this ->db =[
            'dbhost' => DBHOST,
            'dbport' => DBPORT,
            'dbuser' => DBUSER,
            'dbpass' => DBPASS,
            'dbname' => DBNAME,
            'dbtable'=> TBNAME
        ];
		$this->pdo_connect();
		echo "работает конструктор#3";
		$this->data = json_encode($this->pdo_query('
		   SELECT newinlib_itemcontent.id,newinlib_itemcontent.title,newinlib_itemcontent.content, newinlib_item.avatar_img_name 
		   FROM newinlib_itemcontent 
		   JOIN newinlib_item ON newinlib_itemcontent.item_id = newinlib_item.id
		   ORDER BY id DESC LIMIT 300
		'));
   
    }
	
}

$con = new Db();

?>

