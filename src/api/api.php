<?php 

    require_once '../net/netCalls.php';
    header('Content-Type: application/json');
    switch($_REQUEST['action']){
        case 'getEntryPoint':
            $ret = getEntryPoint();
            echo $ret;
            break;
        case 'deviceDynamic':
            $ret = deviceDynamic();
            echo $ret;
            break;
        case 'getDevice':
            $ret = getDevice();
            echo $ret;
            break;
        case 'getAgent':
            $ret = getAgent();
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
        case 'getGraphData':
            $ret = getGraphData();
            echo $ret;
            break;
        default:
            break;
            
    }


?>