<?php

class Server {
    protected $_requestParameters = false;
    protected $_response;
    protected $_connection = false;
    
    public function __construct() {
        $this->_response = array();
        $this->_response["success"] = false;
        $this->_response["errmsg"] = "deliver success, but invalid para";
        $this->_response["content"] = NULL;
    }
    public function __destruct() {
        
    }
    
    
    public function setRequestParameter($reqparams){
        $this->_requestParameters = $reqparams;
    }
    
    public function getResult(){
        return $this->_response;
    }
    
    public function run(){
        
    }
    
    protected function openConnction(){
        if(!$this->_connection){
            $Server = '127.0.0.1';
            $port= '3306';
            $dbname =  'Ebanking';
            $username = 'root';
            $password = '123456';
//            $connstr = "host=127.0.0.1 port=3306 dbname=Ebanking user=root password=123456";
            $this->_connection = new mysqli($Server.':'.$port,$username,$password,$dbname);
            if(!$this->_connection){
                $this->_response["success"] = false;
                $this->_response["errmsg"] = "Can't connect to MySQL server";
                return false;
            }  else {
                $this->_response["success"] = true;
                $this->_response["errmsg"] = "Database connect success!";
                
            }
        }
        return $this->_connection;
    }
    
    protected function closeConnection(){
        if ($this->_connection){
            mysqli_close($this->_connection);
        }
    }
    
        
}
?>