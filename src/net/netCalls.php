<?php 
require_once('../config/config.php');
function deviceDynamic(){ 
    
	$url = API_END_POINT . "/api/device-dynamic";
	/*$fields = array(
							'log' => urlencode($user_login),
							'pwd' => urlencode($user_pass),
							'redirect_to' => urlencode('http://questaeunaprova.open-net.it/wp-admin/'),
							'testcookie' => '1',
							'wp-submit' => 'Collegati'
					);
	
	foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
	rtrim($fields_string, '&');
	*/
	//open connection
	$ch = curl_init();
	//set the url, number of POST vars, POST data
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
	    'Content-Type: application/json',
	    'slipstream-authn-info: super ADMIN')
	    );          
	/* Inserire la gestione certificato */
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	
	curl_setopt($ch,CURLOPT_URL, $url);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
 //   curl_setopt( $ch, CURLOPT_REFERER, $url );
	//execute post
    if(! $result = curl_exec($ch))
    {
       echo curl_error($ch);
    } 	
	//echo curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
	
	//close connection
	curl_close($ch);
	return $result;
}

function getEntryPoint(){
    
    $url = API_END_POINT . "/api/cloud-entry-point";//open connection
    $ch = curl_init();
    //set the url, number of POST vars, POST data
    /*
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'slipstream-authn-info: super ADMIN')
        );*/
    /* self-signed certificate handling */
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    curl_setopt($ch,CURLOPT_URL, $url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
    //   curl_setopt( $ch, CURLOPT_REFERER, $url );
    //execute post
    if(! $result = curl_exec($ch))
    {
        echo curl_error($ch);
    }
    //echo curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    
    //close connection
    curl_close($ch);
    return $result;
    
}

function getDevice(){
    
    $url = API_END_POINT . "/api/device";
    //open connection
    $ch = curl_init();
    //set the url, number of POST vars, POST data
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'slipstream-authn-info: super ADMIN'
        )
        );
    /* self-signed certificate handling */
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    curl_setopt($ch,CURLOPT_URL, $url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
    //   curl_setopt( $ch, CURLOPT_REFERER, $url );
    //execute post
    if(! $result = curl_exec($ch))
    {
        echo curl_error($ch);
    }
    //echo curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    
    //close connection
    curl_close($ch);
    return $result;
}

function getAgent(){
    
    $url = API_END_POINT . "/api/agent";
    //open connection
    $ch = curl_init();
    //set the url, number of POST vars, POST data
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'slipstream-authn-info: super ADMIN'
    )
        );
    /* self-signed certificate handling */
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    curl_setopt($ch,CURLOPT_URL, $url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
    //   curl_setopt( $ch, CURLOPT_REFERER, $url );
    //execute post
    if(! $result = curl_exec($ch))
    {
        echo curl_error($ch);
    }
    //echo curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    
    //close connection
    curl_close($ch);
    return $result;
}

function getAllServices(){
    
    $url = API_END_POINT . "/api/service";
    //open connection
    $ch = curl_init();
    //set the url, number of POST vars, POST data
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'slipstream-authn-info: super ADMIN'
    )
        );
    /* self-signed certificate handling */
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    curl_setopt($ch,CURLOPT_URL, $url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
    //   curl_setopt( $ch, CURLOPT_REFERER, $url );
    //execute post
    if(! $result = curl_exec($ch))
    {
        echo curl_error($ch);
    }
    //echo curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    
    //close connection
    curl_close($ch);
    return $result;
}

function createService(){
    
    $url = API_END_POINT . "/api/service";
    //open connection
    $ch = curl_init();
    //set the url, number of POST vars, POST data
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'slipstream-authn-info: super ADMIN'
    )
        );
    /* self-signed certificate handling */
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, '{
        "name": "uc3-it2",
        "exec": "http://192.168.56.102:48000/docker-compose-uc3.yml",
        "exec_type": "docker-compose",
        "agent_type": "normal"
    }');
    curl_setopt($ch,CURLOPT_URL, $url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
    //   curl_setopt( $ch, CURLOPT_REFERER, $url );
    //execute post
    if(! $result = curl_exec($ch))
    {
        echo curl_error($ch);
    }
    //echo curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    
    //close connection
    curl_close($ch);
    return $result;
}
function getGraphData(){
    
    $url = "http://web:9001/graph";
    //open connection
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, false);

    curl_setopt($ch,CURLOPT_URL, $url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
    //   curl_setopt( $ch, CURLOPT_REFERER, $url );
    //execute post
    if(! $result = curl_exec($ch))
    {
        echo curl_error($ch);
    }
    //echo curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    
    //close connection
    curl_close($ch);
    return $result;
    
}

?>
