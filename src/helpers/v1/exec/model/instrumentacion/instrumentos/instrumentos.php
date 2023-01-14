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
		    
		case 'consultarinstrumentos':
	    
			$tbl='instrum_categorias';
			
			$select='*';
			$query='IdCategorias="'.$_POST['idCategorias'].'"';
			$app=new Apis($tbl);
			$row=$app->consultadatos($query,$select);
			
			$tbl2='instrum_instrumentos';
			$app2=new Apis($tbl2);
			
			if($_POST['idCategorias']==1){
			    $app3=new Apis('instrum_referencia');
			}else{
			  $app3=new Apis($tbl2);  
			}
			
			$select2='*';
				foreach($row as $key => $value){
					$menuParent[]=$row[''.$key.'']=$value;
					//$app3->sumarow($campo,$select);
           
					$menuParent[''.$key.'']['inventario']=$app3->sumainventario($value['IdCategorias']);
					$menuParent[''.$key.'']['reservado']=$app3->sumareservados($value['IdCategorias']);
					//CHILDREN 		 
						$query2='idCategorias<>2 AND idReferencia="'.$value['IdCategorias'].'"';
					    $menuParent[$key]['children']=$app2->consultadatos($query2,$select2);
				 }
				 
			$var = var2js($menuParent);	
			echo $var;		    
		    /*
            $instrum_categorias='instrum_categorias';
            $instrum_instrumentos='instrum_instrumentos';
			$app=new Apis();
			$row=$app->consulta_categorias_instrumentos($instrum_categorias,$instrum_instrumentos);
	
			if (!is_null($row)) {
			$var = var2js($row);	
			echo $var;
			}else{
			$records[] = array(
                                'id'=>1,
                                'idReferencia'=>'0',
                                'idCategorias'=>'0',
                                'title'=>'No existen registros',
                                'description'=>'No existen registros',
                                'inventario'=>'0',
                                'reservado'=>'0',
                                'tipo'=>'0',
                                'status'=>'Deactivated',
                            );
					
				$var = var2js($records);	
				echo $var;					
			}
			*/
		  	break;  
		case 'consultar':
			
		    if($_POST['idReferencia']>0){
			    $query='idReferencia="'.$_POST['idReferencia'].'" AND tipo="'.$_POST['tipo'].'"';
		    }else{
		      $query='tipo="'.$_POST['tipo'].'"';  
		    }
			$tbl='instrum_instrumentos';
			$select='*';
			$app=new Apis($tbl);
			$row=$app->consultadatos($query,$select);
			
			if (!is_null($row)) {
			$var = var2js($row);	
			echo $var;
			}else{
			$records[] = array(
                                'id'=>1,
                                'idReferencia'=>'0',
                                'idCategorias'=>'0',
                                'title'=>'No existen registros',
                                'description'=>'No existen registros',
                                'inventario'=>'0',
                                'reservado'=>'0',
                                'tipo'=>'0',
                                'status'=>'Deactivated',
                            );
					
				$var = var2js($records);	
				echo $var;					
			}
			
			break;
			case 'guardar':
					$chartic=array();
					//LLAMO LA TABLA
					$tbl_categorias='instrum_instrumentos';
					
					//LA ASIGNO A LA CLASE
					$categ=new Apis($tbl_categorias);
					//CARGO EL ARRAY 
					$chartic['idReferencia']=$_POST['IdReferencia'];
					$chartic['idCategorias']=$_POST['nsecion'];
					$chartic['title']=$_POST['title'];
					$chartic['description']=$_POST['description'];
					$chartic['inventario']=$_POST['inventario'];
					$chartic['reservado']=0;
					$chartic['tipo']=$_POST['nsecion'];
					$chartic['status']='Active';
					//GUARDO
					$id=$categ->guardar($chartic);
					
					//VERIFICO
						if($id>0){
								$msg[] = array('id'=>1,'menssage'=>'Instrumento guardada con exito '.$_POST['IdReferencia'].'-'.$_POST['title'].'!!');
						}else{
								$msg[] = array('menssage'=>'ERROR. El Instrumento no se pudo guardar!');
						}
				//IMPRIMO RESPUESTA		
				$var = var2js($msg);	
				echo $var;
			break;
			case 'actualizar':
					$chartic=array();
					//LLAMO LA TABLA
					$tbl_categorias='instrum_instrumentos';
											
						$apps=new Apis($tbl_categorias);
						$chartic['title']=$_POST['title'];
						$chartic['description']=$_POST['description'];
						$chartic['inventario']=$_POST['inventario'];
						$chartic['status']=$_POST['status'];
						$apps->actualizar($chartic,'id',$_POST['id']);
						$msg[] = array('menssage'=>'OK. El Instrumento: '.$_POST['id'].'-'.$_POST['title'].' fue actualizado correctamente!');
						$var = var2js($msg);	
						echo $var;				
			
			break;
			case 'eliminar':
			
					sql_delete("instrum_instrumentos","id=" . intval($_POST['id']));
					$msg[] = array('menssage'=>'OK. El registro '.$_POST['id'].' fue eliminado correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

													
?>
