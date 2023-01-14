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
			$tbl='instrum_categorias';
			$select='*';
			$app=new Apis($tbl);
			$row=$app->consultadatos($query,$select);
			
			if (!is_null($row)) {
			$var = var2js($row);	
			echo $var;
			}else{

			$records[] = array(
                                'IdCategorias'=>1,
                                'title'=>'No existen registros',
                                'description'=>'No existen registros',
                                'inventario'=>'0',
                                'reservado'=>'0',
                                'status'=>'Deactivated',
                            );
					
				$var = var2js($records);	
				echo $var;					
			}
			
			break;
			
			case 'guardar':
					$chartic=array();
					//LLAMO LA TABLA
					$tbl_categorias='instrum_categorias';
					
					//LA ASIGNO A LA CLASE
					$categ=new Apis($tbl_categorias);
					//CARGO EL ARRAY 
					$chartic['title']=$_POST['title'];
					$chartic['description']=$_POST['title'];
					$chartic['inventario']=0;
					$chartic['reservado']=0;
					$chartic['status']='Active';
					//GUARDO
					$id=$categ->guardar($chartic);
					
					//VERIFICO
						if($id>0){
								$msg[] = array('IdCategorias'=>1,'menssage'=>'Categoría guardada con exito!!');
						}else{
								$msg[] = array('menssage'=>'ERROR. La Categoría no se pudo guardar!');
						}
				//IMPRIMO RESPUESTA		
				$var = var2js($msg);	
				echo $var;
			break;
			case 'actualizar':
					$chartic=array();
					//LLAMO LA TABLA
					$tbl_categorias='instrum_categorias';
											
						$apps=new Apis($tbl_categorias);
						$chartic['title']=$_POST['title'];
						$chartic['status']=$_POST['status'];
						$apps->actualizar($chartic,'IdCategorias',$_POST['IdCategorias']);
						$msg[] = array('menssage'=>'OK. La Categoría: '.$_POST['IdCategorias'].'-'.$_POST['title'].' fue actualizado correctamente!');
						$var = var2js($msg);	
						echo $var;				
			
			break;
			case 'eliminar':
			
					sql_delete("instrum_categorias","IdCategorias=" . intval($_POST['id']));
					$msg[] = array('menssage'=>'OK. El registro '.$_POST['id'].' fue eliminado correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

													
?>
