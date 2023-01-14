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
     
     function updaterInstrumentosReservado($estado){
                $Idreferencia=array();
    		    $firstKeys=explode(",",$_POST['idCategoria']);	  
    			$app=new Apis('instrum_instrumentos');   
    			foreach ($firstKeys as $k => $v) {
    			    if(intval($v)){
    			     $query="id='".$v."'";     
    			     $select='reservado,idReferencia';
    			      $row=$app->consultadatos($query,$select);
                        if($estado==2 || $estado==3 ){
                            if($estado==3){
                              $ch['reservado']=1;  
                                }else{
                               $ch['reservado']=1;  
                                }
                          }else{
                     	    $ch['reservado']=0;   
                        }    			      
    			        $app->actualizar($ch,"id",intval($v));
    			        $Idreferencia[]=$row[0]['idReferencia'];
    			      }
    			    }
    			    return array_unique($Idreferencia);
    	        }
       function updaterCategorias($Idreferencia,$estado){       
     			
     			$app=new Apis('instrum_categorias');   
    			foreach ($Idreferencia as $k => $v) {
    			    if(intval($v)){
    			     $query="IdCategorias='".$v."'";     
    			     $select='reservado';
    			      $row=$app->consultadatos($query,$select);
                        if($estado==2 || $estado==3 ){
                            if($estado==3){
                              $ch['reservado']=1;  
                                }else{
                               $ch['reservado']=1;  
                                }
                            }else{
                     	   $ch['reservado']=0;   
                        }    			      
    			        $app->actualizar($ch,"IdCategorias",intval($v));
    			      }
    			    }  
    	        }  	
		switch ($_POST['opcion']) {
		case 'consultar':
			
			$query='';
			$tbl='instrum_calendario';
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
					$tbl_categorias='instrum_calendario';
					//LA ASIGNO A LA CLASE
					$categ=new Apis($tbl_categorias);
					//CARGO EL ARRAY 
					$chartic['IdCategorias']=$_POST['IdCategorias'];
				    $chartic['idCategoria']=$_POST['idCategoria'];
					$chartic['title']=$_POST['titleCategoria'];
					$chartic['start']=$_POST['start'];
					$chartic['end']=$_POST['end'];
					$chartic['className']=$_POST['className'];
					$chartic['asignar']=$_POST['asignar'];
					$chartic['estado']=$_POST['estado'];
					$chartic['idUser']=$_POST['idUser'];
				    $chartic['status']='Active';
					//GUARDO
					$id=$categ->guardar($chartic);
					//ACTUALIZO LA TABLA DE INVENTARIO
						$Idreferencia=updaterInstrumentosReservado($_POST['estado']); 
    				    updaterCategorias($Idreferencia,$estado);				
					//VERIFICO
						if($id>0){
								$msg[] = array('IdCategorias'=>1,'menssage'=>'La solicitud fue guardada con exito!!');
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
					$tbl_categorias='instrum_calendario';
											
						$apps=new Apis($tbl_categorias);
    					$chartic['className']=$_POST['className'];
    					$chartic['asignar']=$_POST['asignar'];
    					$chartic['estado']=$_POST['estado'];
						$apps->actualizar($chartic,'id',$_POST['id']);
						
						$Idreferencia=updaterInstrumentosReservado($_POST['estado']); 
    				    updaterCategorias($Idreferencia,$estado);
  				    
    				    
    				     print_r($Idreferencia);						
						$msg[] = array('menssage'=>'OK. La Solicitud: '.$_POST['id'].' fue actualizada correctamente!');
						$var = var2js($msg);	
						echo $var;
			break;
			case 'eliminar':
			
					sql_delete("instrum_calendario","id=" . intval($_POST['id']));
					$msg[] = array('menssage'=>'OK. El registro fue eliminado correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

													
?>
