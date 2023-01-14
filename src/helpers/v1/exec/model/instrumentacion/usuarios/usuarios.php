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

if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}
		include_spip('base/connect_sql');
		include_spip('inc/filtres_ecrire');
		include_spip('inc/filtres');
		include_spip('inc/utils');
		include_spip('inc/json');
 
 include_spip('exec/model/claseapi');
		switch ($_POST['opcion']) {
		case 'consultar':
			
			$query='';
			$tbl='instrum_usuarios';
			$select='*';
			$app=new Apis($tbl);
			$row=$app->consultadatos($query,$select);
			
			if (!is_null($row)) {
			$var = var2js($row);	
			echo $var;
			}else{

			$records[] = array(
                                'id'=>1,
                                'username'=>'No existen registros',
                                'password'=>'No existen registros',
                                'nombres'=>'No existen registros',
                                'apellidos'=>'No existen registros',
                                'rol'=>'No existen registros',
                                'token'=>'No existen registros',
                                'clave'=>'No existen registros',
                                'status'=>'Deactivated',
                            );
					
				$var = var2js($records);	
				echo $var;					
			}
			
			break;
			
			case 'consultarusuario':
			   
			$query='username="'.$_POST['username'].'"';
			$tbl='instrum_usuarios';
			$select='*';
			$app=new Apis($tbl);
			$row=$app->consultadatos($query,$select);
			if (!is_null($row)) {
			$var = var2js($row);
			echo $var;
			}else{
			$records[] = array(
                                'id'=>'null',
                                'username'=>'null',
                                'password'=>'null',
                                'nombres'=>'null',
                                'apellidos'=>'null',
                                'rol'=>'null',
                                'token'=>'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI',
                                'clave'=>'null',
                                'status'=>'null',
                            );
				$var = var2js($records);	
				echo $var;	                            
			}               
			break;
			case 'guardar':
					$chartic=array();
					//LLAMO LA TABLA
					$tbl='instrum_usuarios';
					//LA ASIGNO A LA CLASE
					$user=new Apis($tbl);
					//CARGO EL ARRAY 
					$chartic['username']=$_POST['username'];
					$chartic['password']=$_POST['clave'];
					$chartic['nombres']=$_POST['nombres'];
					$chartic['apellidos']=$_POST['apellidos'];
					$chartic['role']=$_POST['rol'];
					$chartic['token']=$_POST['token'];
					$chartic['clave']=$_POST['password'];
					$chartic['status']='Active';
					//GUARDO
					$id=$user->guardar($chartic);
					
					//VERIFICO
						if($id>0){
								$msg[] = array('id'=>1,'menssage'=>'Usuario guardado con exito!!');
						}else{
								$msg[] = array('menssage'=>'ERROR. El Usuario no se pudo guardar!');
						}
				//IMPRIMO RESPUESTA		
				$var = var2js($msg);	
				echo $var;
			break;
			case 'actualizar':
					$chartic=array();
					//LLAMO LA TABLA
					$tbl_categorias='instrum_usuarios';
											
						$apps=new Apis($tbl_categorias);
    					$chartic['username']=$_POST['username'];
    					$chartic['password']=$_POST['password'];
    					$chartic['nombres']=$_POST['password'];
    					$chartic['apellidos']=$_POST['apellidos'];
    					$chartic['rol']=$_POST['rol'];
						$apps->actualizar($chartic,'id',$_POST['id']);
						$msg[] = array('menssage'=>'OK. La Categoría: '.$_POST['id'].'-'.$_POST['nombres'].' fue actualizado correctamente!');
						$var = var2js($msg);	
						echo $var;				
			
			break;
			case 'eliminar':
			
					sql_delete("instrum_usuarios","id=" . intval($_POST['id']));
					$msg[] = array('menssage'=>'OK. El registro '.$_POST['id'].' fue eliminado correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

													
?>
