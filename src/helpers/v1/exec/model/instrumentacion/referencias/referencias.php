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
			$tbl='instrum_referencia AS i';
			$select='i.id,i.IdCategorias,i.title,i.description,i.inventario,i.reservado,if(i.inventario=i.reservado AND i.reservado!=0, "Deactivated", "Active") AS status ';
			$app=new Apis($tbl);
			$row=$app->consultadatos($query,$select);
			
			if (!is_null($row)) {
			$var = var2js($row);	
			echo $var;
			}else{

			$records[] = array(
                                'id'=>1,
                                'referencia'=>'Aun no existen referencia cargadas'
                            );
					
				$var = var2js($records);	
				echo $var;					
			}
			
			break;
			case 'guardar':
					$chartic=array();
					//LLAMO LA TABLA
					$tbl_categorias='instrum_referencia';
					
					//LA ASIGNO A LA CLASE
					$categ=new Apis($tbl_categorias);
					//CARGO EL ARRAY 
					$chartic['IdCategorias']=1;
					$chartic['title']=$_POST['title'];
					$chartic['description']=$_POST['title'];
					$chartic['inventario']=0;
					$chartic['reservado']=0;
					$chartic['status']='Active';
					//GUARDO
					$id=$categ->guardar($chartic);
					
					//VERIFICO
						if($id>0){
								$msg[] = array('id'=>1,'menssage'=>'Referencia guardada con exito!!');
						}else{
								$msg[] = array('menssage'=>'ERROR. La Referencia no se pudo guardar!');
						}
				//IMPRIMO RESPUESTA		
				$var = var2js($msg);	
				echo $var;
			break;
			case 'actualizar':
					$chartic=array();
					//LLAMO LA TABLA
					$tbl_categorias='instrum_referencia';
											
						$apps=new Apis($tbl_categorias);
						$chartic['title']=$_POST['title'];
						$chartic['inventario']=$_POST['inventario'];
						$chartic['reservado']=$_POST['reservado'];
						$chartic['status']=$_POST['status'];
						$apps->actualizar($chartic,'id',$_POST['id']);
						$msg[] = array('menssage'=>'OK. La Referencia: '.$_POST['id'].'-'.$_POST['title'].' fue actualizado correctamente!');
						$var = var2js($msg);	
						echo $var;				
			
			break;
			case 'eliminar':
			
					sql_delete("instrum_referencia","id=" . intval($_POST['id']));
					$msg[] = array('menssage'=>'OK. El registro fue eliminado correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

													
?>
