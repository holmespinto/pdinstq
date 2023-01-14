<?php

/***************************************************************************\
 *  SPIP, Systeme de publication pour l'internet                           *
 *                                                                         *
 *  Copyright (c) 2001-2017                                                *
 *  Arnaud Martin, Antoine Pitrou, Philippe Riviere, Emmanuel Saint-James  *
 *                                                                         *
 *  Ce programme est un logiciel libre distribue sous licence GNU/GPL.     *
 *  Pour plus de details voir le fichier COPYING.txt ou l'aide en ligne.   *
\***************************************************************************/

 use Spip\Chiffrer\SpipCles;

if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}
include_spip('base/connect_sql');
include_spip('inc/utils');
header("Content-Type: application/json");


/**
 * Identification via HTTP (si pas de cookie)
 *
 * Gére le cas où un utilisateur ne souhaite pas de cookie :
 * on propose alors un formulaire pour s'authentifier via http
 *
 * @return string
 *     - Si connection possible en HTTP : URL pour réaliser cette identification,
 *     - chaîne vide sinon.
 **/
function login_auth_http() {
	if (!$GLOBALS['ignore_auth_http']
		and _request('var_erreur') == 'cookie'
		and (!isset($_COOKIE['spip_session']) or $_COOKIE['spip_session'] != 'test_echec_cookie')
		and (($GLOBALS['flag_sapi_name'] and preg_match(',apache,i', @php_sapi_name()))
			or preg_match(',^Apache.* PHP,', $_SERVER['SERVER_SOFTWARE']))
		// Attention dans le cas 'intranet' la proposition de se loger
		// par auth_http peut conduire a l'echec.
		and !(isset($_SERVER['PHP_AUTH_USER']) and isset($_SERVER['PHP_AUTH_PW']))
	) {
		return generer_url_action('cookie', '', false, true);
	} else {
		return '';
	}
}
/**
 * Renvoyer le secret du site (le generer si il n'existe pas encore)
 *
 * @uses SpipCles::secret_du_site()
 * @return string
 */
function secret_du_site() {
	return SpipCles::secret_du_site();
}

function exec_router_dist(){
    $login = $GLOBALS['visiteur_session']['login'];
    $session_password = $GLOBALS['visiteur_session']['pass'];
	include_spip('inc/auth');
	$row = auth_informer_login($login);
    

switch($_POST['accion']) {
		case "instcategorias":
		    include_spip('exec/model/instrumentacion/categorias/categorias');
		break;
		case "instreferencias":
		    include_spip('exec/model/instrumentacion/referencias/referencias'); 
		break;
		case "instrumentos":
	        include_spip('exec/model/instrumentacion/instrumentos/instrumentos');		    
		break;	
		case "calendario":
            include_spip('exec/model/instrumentacion/calendario/calendario');		    
		break;	
		case "usuarios":
            include_spip('exec/model/instrumentacion/usuarios/usuarios');		    
		break;			
}

 

/*	
class ControllerUsuarios{

	function usuarios(){
	include_spip('exec/model/login/usuarios');
		 
	
	}
}

*/
class ControllerPresentaciones{

	function presentaciones(){
		include_spip('exec/model/almacen/presentaciones');
	
	}
}
class ControllerMarcas{

	function marcas(){
		include_spip('exec/model/almacen/marcas');
	
	}
}

class ControllerProductos{

	function productos(){
	include_spip('exec/model/almacen/productos');
		
	
	}
}

class ControllerProveedores{

	function proveedores(){
		include_spip('exec/model/compras/proveedores');
	
	}
}

class ControllerPerecederos{

	function perecederos(){
		include_spip('exec/model/almacen/perecederos');
	
	}
}


class ControllerClientes{

	function clientes(){
		include_spip('exec/model/ventas/clientes');
	
	}
}
class ControllerMenu{

	function menu(){
		include_spip('exec/model/menu/menu');
	
	}
}
class ControllerConfigurar{

	function configurar(){
		include_spip('exec/model/configuracion/configuracion');
	 
	}
}
class ControllerUsersearch{

	function usersearch(){
		include_spip('exec/model/usersearch/usersearch');
	 
	}
}	 
class ControllerTecnicos{

	function tecnicos(){
		include_spip('exec/model/taller/tecnicos');
	 
	}
}	
class ControllerFormordenes{

	function formordenes(){
		include_spip('exec/model/taller/formordenes');
	 
	}
}

	$accion=$_POST['accion'];
	$objcontroller='Controller'.ucfirst($accion);
	
	$controller=new $objcontroller();
	$controller->$accion();
}
   
?>
  
 