<?php

session_start();
include_once 'PHP/Server.php';
include_once 'PHP/UserServer.php';

$text = $_SESSION['last_access'];

if (!isset($_SESSION['last_access']) || (time() - $_SESSION['last_access']) > 60){
    
    $_SESSION['last_access'] = time();
}
    
    






if (!isset($_REQUEST["request"])) {
    $response["success"] = false;
    $response["errmsg"] = "Invalid parameter";
    echo json_encode($response);
    return;
}

$reqparams = json_decode($_REQUEST["request"]);

$typearr = explode("_", $reqparams->type);


$sv = new Server();

switch ($typearr[0]) {
    case "USER":
        $sv = new UserServer();
        break;
    default :
        break;
}


$sv->setRequestParameter($reqparams);
$sv->run();
echo json_encode($sv->getResult());
?>

