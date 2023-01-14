<?php
/**
 *
 * @About:      API Interface
 * @File:       index.php
 * @Date:       $Date:$ febrero-2022
 * @Version:    $Rev:$ 1.0
 * @Developer:  Holmes Pinto (holmespinto@gmail.com)
 **/
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: text/html; charset=utf-8");
// Si no se han enviado encabezados, enviar uno
 
if (headers_sent()) {
    header('Location: https://instrumentos.autoevaluacion.com.co/');
    exit;
}

function getRequest($url, $data, $varibles,$refer = "", $timeout = 10, $header = [])
{
    $urls = "https://api.compucel.co/ecrire/?exec=router&bonjour=oui"; 
    $ch = curl_init();
    $ssl = stripos($urls,'https://') === 0 ? true : false;
    $options = [
        CURLOPT_URL => $urls,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => 1,
		CURLOPT_USERPWD=>$data['var_login'].':'.$data['password'],
        CURLOPT_POSTFIELDS => $varibles,
        CURLOPT_FOLLOWLOCATION => 1,
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_AUTOREFERER => 1,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)',
        CURLOPT_TIMEOUT => $timeout,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_0,
        CURLOPT_HTTPHEADER => ['Expect:'],
        CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4,
        CURLOPT_REFERER => $refer
    ];
     
    if (!empty($header)) {
        $options[CURLOPT_HTTPHEADER] = $header;
    }
    if ($refer) {
        $options[CURLOPT_REFERER] = $refer;
    }
    if ($ssl) {
        //support https
        $options[CURLOPT_SSL_VERIFYHOST] = false;
        $options[CURLOPT_SSL_VERIFYPEER] = false;
    }
    
   
    curl_setopt_array($ch,$options);

 //$httpcode = curl_getinfo($ch, 'CURLINFO_HTTP_CODE');
    $returnData = curl_exec($ch);

    if (curl_errno($ch)) {
        //error message
        $returnData = curl_error($ch);
         
    }
    curl_close($ch);
    return $returnData;
    
    
}
 
switch($_GET['accion']) {
		case "usuarios":
                    $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 		    
					 $getRes = getRequest($url,$post,$_GET);
					echo $getRes;
		break;
		case "categorias":
                    $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 			    
					 $getRes = getRequest($url,$post,$_GET);
					echo $getRes;
		break;
		case "presentaciones":
		            $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 	
					 $getRes = getRequest($url,$post,$_GET);
					echo $getRes;
		break;	

		case "marcas":
		            $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 		    
					 $getRes = getRequest($url,$post,$_GET);
					echo $getRes;
		break;	
		case "productos":
		            $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 		    
					 $getRes = getRequest($url,$post,$_GET);
					echo $getRes;
					 
		break;	
	
		case "perecederos":
		            $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 		    
					 $getRes = getRequest($url,$post,$_GET);
					echo $getRes;
					 
		break;	

		case "proveedores":
		            $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 		    
					 $getRes = getRequest($url,$post,$_GET);
					echo $getRes;
					 
		break;	
	
		case "clientes":
		            $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 		    
				 $getRes = getRequest($url,$post,$_GET);
				echo $getRes;
				 
		break;
		case "menu":
		            $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 		    
			 $getRes = getRequest($url,$post,$_GET);
				echo $getRes;
				 
		break;
		case "configurar":
		            $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 		    
					 $getRes = getRequest($url,$post,$_GET);
					echo $getRes;
					 
		break;
		case "usersearch":
		            $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 		    
					 $getRes = getRequest($url,$post,$_GET);
					echo $getRes;
					 
		break;
		case "tecnicos":
					 $getRes = getRequest($url,$post,$_GET);
					echo $getRes;
					 
		break;
		case "instcategorias":
		            $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 		    
					 $getRes = getRequest($url,$post,$_GET);
					echo $getRes;
					 
		break;
		case "instrumentos":
		            $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 		    
					 $getRes = getRequest($url,$post,$_GET);
					echo $getRes;
					 
		break;
		case "instreferencias":
		            $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 		    
					 $getRes = getRequest($url,$post,$_GET);
					echo $getRes;
					 
		break;
		case "calendario":
		            $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 		    
					 $getRes = getRequest($url,$post,$_GET);
					echo $getRes;
					 
		break;		
		case "usuarios":
		            $post = array('var_login' =>'holmespinto@unicesar.edu.co','password' =>'holmespinto@unicesar.edu.co');
                    $url = "https://api.compucel.co/ecrire/?exec=router"; 		    
					 $getRes = getRequest($url,$post,$_GET);
					echo $getRes;
					 
		break;			
}

?>