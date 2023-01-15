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
		case 'numeroinstrumentos':
			$total=array();
			//NUMERO DE INSTRUMENTOS
			$query1='';
			$tbl1='instrum_instrumentos';
			$select1='SUM(inventario) AS totalinstrumentos';
			$app1=new Apis($tbl1);
			$row1=$app1->consultadatos($query1,$select1);
			
			//NUMERO DE CATEGORIAS
			$queryc='';
			$tblc='instrum_categorias';
			$selectc='COUNT(*) AS totalcategorias';
			$appc=new Apis($tblc);
			$rowc=$appc->consultadatos($queryc,$selectc);
			
			//NUMERO DE SOLICITUDES
			
			$querys='';
			$tbls='instrum_calendario';
			$selects='COUNT(*) AS totalsolicitudes';
			$apps=new Apis($tbls);
			$rows=$apps->consultadatos($querys,$selects);

			

			//NUMERO DE ENTREGADOS
			
			$querye='estado=3';
			$tble='instrum_calendario';
			$selecte='COUNT(*) AS totalprestados';
			$appe=new Apis($tble);
			$rowe=$appe->consultadatos($querye,$selecte);			
			
			//ENTREGADO ESTE MES 
			
			$querym="estado=3 AND DATE_FORMAT(maj, '%Y-%m-%d')";
			$tblm='instrum_calendario';
			$selectm='COUNT(*) AS totalprestadosmes';
			$appm=new Apis($tblm);
			$rowm=$appm->consultadatos($querym,$selectm);			
			

			//NUMERO DE DOCENTES 
			
			$queryd="role='Docente'";
			$tbld='instrum_usuarios';
			$selectd='COUNT(*) AS totaldocente';
			$appd=new Apis($tbld);
			$rowd=$appd->consultadatos($queryd,$selectd);
			
			//NUMERO DE DOCENTES ASIGNADOS  
			
			$queryda="idUser<>1";
			$tblda='instrum_calendario';
			$selectda='COUNT(DISTINCT(asignar)) as totalasignados';
			$appda=new Apis($tblda);
			$rowda=$appda->consultadatos($queryda,$selectda);			

			//NUMERO DE PROYESIONES POR MES
				$tbldp='instrum_calendario';
				$appda=new Apis($tbldp);
			    $mes=1;
			    $rowmes=$appda->periodo($mes);
			    print_r($row);
			
            //CONSULTA CATEGORIAS SOLICITADAS

			$query8='';
			$tbl8='instrum_categorias';
			$select8='*';
			$app8=new Apis($tbl8);
			$row8=$app8->consultadatos($query8,$select8);
            foreach($row8 as $keys => $value){
               $id=$row8[$keys]['IdCategorias'];
               $title=$row8[$keys]['title'];
		        $sql2=sql_select("COUNT(*) AS total",'instrum_calendario','IdCategorias="'.$id.'"');
				while ($row2 = sql_fetch($sql2)) {
				    if($row2['total']>0){
				   	$solicateg[$keys]['id']=$keys;
				   	$solicateg[$keys]['total']=$row2['total'];
				   	$solicateg[$keys]['title']=$row8[$keys]['title'];
				    }
				  }	            
                
            }
            
          //CONSULTA ESTADISTICA POR ESTADOS
 			$query9='';
			$tbl9='instrum_estados';
			$select9='*';
			$app9=new Apis($tbl9);
			$row9=$app9->consultadatos($query9,$select9); 
			 foreach($row9 as $keys9 => $value9){
			    $id=$row9[$keys9]['id']; 
		        $sql92=sql_select("COUNT(*) AS total",'instrum_calendario','estado="'.$id.'"');
				while ($row92 = sql_fetch($sql92)) {
				 $estados[$keys9]['id']=$row9[$keys9]['id'];
				 $estados[$keys9]['textClass']=$row9[$keys9]['textClass'];
				 $estados[$keys9]['className']=$row9[$keys9]['className'];
				 $estados[$keys9]['title']=$row9[$keys9]['title'];
				 $estados[$keys9]['total']=$row92['total'];   
				}
			  
			 }

          //CONSULTA RESIENTES
 			$query10='C.estado=E.id AND C.idUser=U.id';
			$tbl10='instrum_calendario AS C, instrum_estados AS E,instrum_usuarios AS U';
			$select10='E.title AS estado,U.nombres, U.apellidos, C.title As elementos, C.end AS entrega';
			$app10=new Apis($tbl10);
			$row10=$app10->consultadatos($query10,$select10); 
			
			//RESPUESTAS
			$total[0]=$row1[0];
			$total[1]=$rowc[0];
			$total[2]=$rows[0];
			$total[3]=$rowe[0];
			$total[4]=$rowm[0];
			$total[5]=$rowd[0];
			$total[6]=$rowda[0];
			$total[7]=$rowmes;
			$total[8]=$solicateg;
			$total[9]=$estados;
			$total[10]=$row10;
			
			if (!is_null($total)) {
			$var = var2js($total);	
			echo $var;
			}else{

			$records[] = array(
                                'id'=>1,
                                'title'=>'No existen registros'
                            );
					
				$var = var2js($records);	
				echo $var;					
			}
			
			break;
			
		}

													
?>
