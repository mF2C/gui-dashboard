<?php 

    require_once '../net/netCalls.php';
    header('Content-Type: application/json');
    switch($_REQUEST['action']){
        case 'deviceDynamic':
            $ret = deviceDynamic();
            echo $ret;
            break;
        case 'getDevice':
            $ret = getDevice();
            echo $ret;
            break;
        case 'getAgent':
            $ret = getDevice();
            echo $ret;
            break;
        case 'createService':
            $ret = createService();
            echo $ret;
            break;
        case 'getAllServices':
            $ret = getAllServices();
            echo $ret;
            break;
        default:
            break;
            
    }


?>