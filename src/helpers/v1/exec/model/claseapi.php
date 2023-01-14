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
include_spip('inc/filtres_boites');
include_spip('inc/boutons');
include_spip('inc/pipelines_ecrire');
include_spip('inc/filtres_dates');
include_spip('base/connect_sql');

 abstract class Pages {
        public function __construct() {
		//$this->periodoacademico_id=$periodoacademico_id;		
        } 
		abstract function maxid($id_max);
		abstract function api_urls_fond($nom,$dir);
		abstract function datosusuario($id_usuario);
		abstract function renombrararchivo($p);
		abstract function elimnararchivo($file);
		abstract function periodoacademicos();
		abstract function guardar($chartic);
		abstract function enviar_json_msg($msg);
		abstract function array_bidiencional($rows);
		abstract function consultadatos($query,$select);
		abstract function guardadocumentos($post,$p);
		abstract function getimageformat($tmp_file,$extension);
		abstract function actualizar($chartic,$id_nom,$id);
		abstract function getfechaformat($post);
		abstract function contarow($select);
		abstract function consultaparent($select,$table);
		abstract function consultachildren($query,$select,$id_user,$idMenu);
		abstract function user_permisos($id_user,$idMenu,$idChildren);
		abstract function consulta_menu_principal($id_post);
		abstract function consulta_categorias_instrumentos($tabla_categorias,$tabla_instrumentos);
        abstract function sumainventario($select); 
        abstract function sumareservados($select);
        
 }

class Apis extends Pages
{
         public $table;
		public function __construct($table)
         {			
			$this->table=$table;
		 }
			/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : user_permisos()
		 * Parametros de entrada : $query,$select,$id_user,$idMenu,$idChildren:
		 * Parametros de Salida:  row
		 */			
		public function consulta_menu_principal($id_post){		 
			$menuParent=array();
			//PARENT
			$query1='isTitle="false"';
			$select1='*';
			$select='mc.id,mc.key,mc.label,mc.icon,mc.url,mc.parentKey';
			$app=new Apis('menu');
			$app2=new Apis('menu_children AS mc');
			$row=$app->consultaparent($query1,$select1);
			if (!is_null($row)) {
				foreach($row as $key => $value){
					$menuParent[]=$row[''.$key.'']=$value;
					//CHILDREN		 
						$query='mc.parentKey="'.$value['id'].'"';
						$menuParent[]['children']=$app2->consultachildren($query,$select,$id_post,$value['id']);
				 }
			 
				$json = var2js($menuParent);	
				return $json;
			}else{
				$records[] = array(
					'key'=>'null',
					'label'=> 'null',
					'isTitle'=> true,
					'icon'=> 'null',
					'badge'=>Array('variant'=>'error','text'=>'0'),'children'=>Array('key'=>'null', 'label'=> 'null', 'url'=>'null', 'parentKey'=> 'null'));	
				$json = var2js($records);
				return $json;
			}
}	
			/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : consulta_categorias_instrumentos()
		 * Parametros de entrada : $query,$select,$id_user,$idMenu,$idChildren:
		 * Parametros de Salida:  row
		 */			
		public function consulta_categorias_instrumentos($tabla_categorias,$tabla_instrumentos){		 
			$menuParent=array();
			//PARENT
			$query1='';
			$select1='*';
			$select='*';
			$app=new Apis("".$tabla_categorias."");
			$app2=new Apis("".$tabla_instrumentos."");
			$row=$app->consultaparent($query1,$select1);
			if (!is_null($row)) {
				foreach($row as $key => $value){
					$menuParent[]=$row[''.$key.'']=$value;
					//CHILDREN		 
						$query='IdCategorias="'.$value['id'].'"';
						$menuParent[]['children']=$app2->consultachildren($query,$select,$id_post,$value['id']);
				 }
			 
				$json = var2js($row);	
				return $json;
			}else{
				$records[] = array(
					'key'=>'null',
					'label'=> 'null',
					'isTitle'=> true,
					'icon'=> 'null',
					'badge'=>Array('variant'=>'error','text'=>'0'),'children'=>Array('key'=>'null', 'label'=> 'null', 'url'=>'null', 'parentKey'=> 'null'));	
				$json = var2js($records);
				return $json;
			}
        }
	/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : user_permisos()
		 * Parametros de entrada : $query,$select,$id_user,$idMenu,$idChildren:
		 * Parametros de Salida:  row
		 */			
		public function user_permisos($id_user,$idMenu,$idChildren){
			$query='idMenu="'.intval($idMenu).'" AND idChildren="'.intval($idChildren).'" AND idUsuario="'.intval($id_user).'"';
			$select='COUNT(*) AS num';
			$sql = sql_select(''.$select.'',''.$this->table.'',''.$query.'');
				while ($row = sql_fetch($sql)) {
					if($row['num']==0){
						return '';
					}else{
						return 'checked';
					}
				}
		}		 
	/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : consultapermisos()
		 * Parametros de entrada : $query,$select,$_POST['id'],$value['id']:
		 * Parametros de Salida:  row
		 */			
		public function consultachildren($query,$select,$id_user,$idMenu){
			$app=new Apis("menu_usuarios");
			$sql = sql_select(''.$select.'',''.$this->table.'',''.$query.'');
				while ($row = sql_fetch($sql)) {	
					  $p['isChecked']=$app->user_permisos($id_user,$idMenu,$row['id']);					  	  
					  $datos[]=$row + $p;
					   
				}
				
				return $datos;
			 	 
		}		 
		/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : consultaparent()
		 * Parametros de entrada : query,select:
		 * Parametros de Salida:  row
		 */			
		public function consultaparent($query,$select){
			$app=new Apis("".$this->table."");
			$sql = sql_select(''.$select.'',''.$this->table.'',''.$query.'');
				while ($row = sql_fetch($sql)) {	
					  //$datos[]=$app->array_bidiencional($row); 
					  $datos[]=$row;
				}
			 	return $datos;
		}		 
		/**
		 * Retorno los parametros para consultar el valor id maximo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : contarow()
		 * Parametros de entrada : $select,$table
		 * Parametros de Salida: num
		 */				
		public function contarow($select){
		 
			$sql = sql_select("COUNT(*) AS num",''.$this->table.'',$select);
				while ($row = sql_fetch($sql)) {	
					return $row['num'];		
				  }	
 
		}
		
		/**
		 * Retorno los parametros para consultar el valor id maximo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : sumainventario()
		 * Parametros de entrada : $idReferencia
		 * Parametros de Salida: num SELECT SUM(inventario) AS inventario FROM `instrum_instrumentos` WHERE idReferencia='2' ORDER BY `idCategorias` ASC
		 */				
		public function sumainventario($idReferencia){
		 
			$sql = sql_select("SUM(inventario) AS inventario",''.$this->table.'','idCategorias<>2 AND idReferencia="'.$idReferencia.'"');
				while ($row = sql_fetch($sql)) {	
					return $row['inventario'];		
				  }	
 
		}
		/**
		 * Retorno los parametros para consultar el valor id maximo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : sumainventario()
		 * Parametros de entrada : $idReferencia
		 * Parametros de Salida: num SELECT SUM(inventario) AS inventario FROM `instrum_instrumentos` WHERE idReferencia='2' ORDER BY `idCategorias` ASC
		 */				
		public function sumareservados($idReferencia){
		 
			$sql = sql_select("SUM(reservado) AS reservado",''.$this->table.'','idCategorias<>2 AND idReferencia="'.$idReferencia.'"');
				while ($row = sql_fetch($sql)) {	
					return $row['reservado'];		
				  }	
 
		}		
		/**
		 * Retorno los parametros para consultar el valor id maximo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : maxid()
		 * Parametros de entrada : $id_max
		 * Parametros de Salida: id_max
		 */				
		public function maxid($id_max){
			$args = func_get_args();
			$this->id_max = $id_max;
			 
			$sql = sql_select("MAX($id_max) AS id_max",''.$this->table.'');
				while ($row = sql_fetch($sql)) {	
					return $row['id_max']+1;		
				  }	
 
		}
		/**
		 * Retorno los parametros para buscar la urle en uu archivo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : api_urls_fond()
		 * Parametros de entrada : $nom,$di
		 * Parametros de Salida:  p
		 */				
		function api_urls_fond($nom,$dir) {
			$f = find_in_path($nom, $dir);
			$p = pathinfo($f);
			if (!isset($p['extension']) or !$p['extension']) {
				return $f;
			}
			if (!isset($p['extension']) or !$p['filename']) {
				$p['filename'] = ($p['basename'] ? substr($p['basename'], 0, -strlen($p['extension']) - 1) : '');
			}
			$p['fond'] = ($f ? substr($f, 0, -strlen($p['extension']) - 1) : '');

			return $p;
		}	
		/**
		 * Retorno los parametros consultar datosusuario en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : datosusuario()
		 * Parametros de entrada : $id_usuario
		 * Parametros de Salida:  row
		 */			
		public function datosusuario($id_usuario){
		 
			$sql = sql_select("*",'usuarios','id_pensum="'.$id_usuario.'"');
				while ($row = sql_fetch($sql)) {	
					return $row;		
				  }	
 
		}
		/**
		 * Retorno los parametros para renombrar un archivo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : renombrararchivo()
		 * Parametros de entrada : $p =array
		 * Parametros de Salida:  fichier
		 */		
		public function renombrararchivo($p){
 				$fichier=$p['dirname'].'/'.$p['objeto'].'_'.$p['id_max'].'_'.$p['id_autor'].'_'.$p['numero_documento'].'.'.$p['extension'];
				$tmpfile="".$p['dirname']."/".rtrim(ltrim(str_replace("%20"," ",$p['basename'])))."";
				 		 @rename($tmpfile, $fichier);
						 if (file_exists($tmpfile)) {
							unlink($tmpfile);
						 }
				return $fichier;		 
		}
		/**
		 * Retorno los parametros para eliminar un archivo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : elimnararchivo()
		 * Parametros de entrada : $file
		 * Parametros de Salida:  $
		 */		
		public function elimnararchivo($file){
 				  	//$file="".$p['dirname']."/".rtrim(ltrim(str_replace("%20"," ",$p['basename'])))."";
						 if (file_exists($file)) {
							unlink($file);
							$sw=1;
						 }else{
							$sw=0; 
						 }
				return $sw;		 
		}		
		/**
		 * Retorno los parametros para verificar periodoacademicos en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : periodoacademicos()
		 * Parametros de entrada : 
		 * Parametros de Salida:  periodoacademicos
		 */ 		
		public function periodoacademicos(){
				$response = array();
 				date_default_timezone_set('America/Bogota');	
				$j=date('j');
				$m=date('m');
				$y=date('Y');		 
			$sql=sql_select("*",'periodoacademicos',"fechainicio <= '".$y."-".$m."-".$j."' AND  fechafin >= '".$y."-".$m."-".$j."'");
				while ($row = sql_fetch($sql)) {	
					return $row;		
				  }	
		}		
		/**
		 * Retorno los parametros para guardar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : general_gardar_registro()
		 * Parametros de entrada :$chartic=array(),$table
		 * Parametros de Salida: 
		 */ 
		function guardar($chartic=array()){

			if ($set) {
			$chartic = array_merge($chartic, $set);
			}					
			$chartic = pipeline('pre_insertion',
				array(
					'args' => array(
					'table' => ''.$this->table.'',
				),
				'data' => $chartic
				)
			);							
				$id=sql_insertq("".$this->table."", $chartic);
			pipeline('post_insertion',
			array(
				'args' => array(
				'table' =>''.$this->table.'',
				'id_objet' => $id
				),
				'data' => $chartic
				)
			);
			return $id;
		}
		/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : actualizar()
		 * Parametros de entrada :$chartic=array(),$id_nom,$id
		 * Parametros de Salida: 
		 */ 		
		
		function actualizar($chartic=array(),$id_nom,$id){

			if ($set) {
			$chartic = array_merge($chartic, $set);
			}					
			$chartic = pipeline('pre_insertion',
				array(
					'args' => array(
					'table' => ''.$this->table.'',
				),
				'data' => $chartic
				)
			);							
 
			sql_updateq("".$this->table."",$chartic,"".$id_nom."='".$id."'");
			pipeline('post_insertion',
			array(
				'args' => array(
				'table' =>''.$this->table.'',
				'id_objet' => $id
				),
				'data' => $chartic
				)
			);
		}
		
		/**
		 * Retorno los parametros para enviar la respuestas
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : enviar_json_msg()
		 * Parametros de entrada :$msg
		 * Parametros de Salida:  $msg
		 */ 		
 		function enviar_json_msg($msg) {
			return array(
				'data' =>$msg
			);
		}
		/**
		 * Retorno los parametros para enviar la respuestas
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : array_bidiencional()
		 * Parametros de entrada :$rows[][]
		 * Parametros de Salida:  $rows[]
		 */ 
		function array_bidiencional($rows) {
			if (is_array($rows) || is_object($rows))
			{
				foreach($rows as $keys => $datos){
						 $dato=$rows[$keys];
					if (is_array($dato)){
						foreach ($dato as $key => $value)
						{
							$row[''.$key.'']=$value;	
						}
					}
				}
			return $row;					
			}
			
					 
		}			 
						
	 			 
		/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : datosusuario()
		 * Parametros de entrada : query:
		 * Parametros de Salida:  row
		 */			
		public function consultadatos($query,$select){
			$sql = sql_select(''.$select.'',''.$this->table.'',''.$query.'');
				while ($row = sql_fetch($sql)) {	
					  $datos[]=$row; 
				}
			 	return $datos;
		}	
		
		
		/**
		 * Retorno los parametros para guardar documentos en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : guardadocumentos()
		 * Parametros de entrada : $post,$p
		 * Parametros de Salida:  id
		 */			
				public function guardadocumentos($post,$p){	
						$tbl='documentos';
						$app=new Apis($tbl);
						$tmp_file=$p['fichier_new'];
						$extension=$p['extension'];
						$date_publication = strtotime('2038-01-01 00:00:00');
						$doc=$app->getimageformat($tmp_file,$extension);

							$chartic['id_documento']=$p['id_max'];
							$chartic['id_auteur']=$post['id_autor'];
							$chartic['id_curso']=$post['id_curso'];
							$chartic['grupo_id']=$post['grupo_id'];
							$chartic['cod_materia']=$post['cod_materia'];
							$chartic['id_objet']=$p['id_objet'];
							$chartic['titulo']=$post['titulo'];
							$chartic['descriptif']=$post['descripcion'];
							$chartic['extension']=$extension;
							$chartic['date']=$post['lastModified'];
							$chartic['fichier']=$tmp_file;
							$chartic['taille']=$post['formattedSize'];
							$chartic['largeur']=$doc['largeur'];
							$chartic['hauteur']=$doc['hauteur'];
							$chartic['duree']='null';
							$chartic['media']=$doc['media'];
							$chartic['mode']=$doc['mode'];
							$chartic['status']=$post['objeto'];
							$chartic['distant']=$post['autor'];
							$chartic['credits']=$p['credits'];
							$chartic['date_publication']=$date_publication;
							$chartic['brise']=$post['type'];
							$chartic['ctype']=$post['type'];
							$chartic['periodoacademico_id']=$p['periodo'];
						 
					 $appd=new Apis('documentos');	
					$id=$appd->guardar($chartic);
					return $id;	
				}

		/**
		 * Retorno los parametros para optener propiedades de las imagenes en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : getimageformat()
		 * Parametros de entrada : $tmp_file,$extension
		 * Parametros de Salida:  p
		 */					
				public function getimageformat($tmp_file,$extension){
								$p=array();
								$size_image = @getimagesize($tmp_file);
								if ((strtolower($extension)=='jpg') or ( strtolower($extension)=='png')or ( strtolower($extension)=='gif')){
									$p['largeur']= $size_image[0];
									$p['hauteur']= $size_image[1];
									$p['mode']= 'image';
									$p['media']= 'image';
								}elseif (strtolower($extension=='mp4')){
									$p['largeur']= $size_image[0];
									$p['hauteur']= $size_image[1];
									$p['mode']= 'video';									
									$p['media']= 'document';									
						
								} else{
									$p['largeur']= null;
									$p['hauteur']= null;
									$p['mode']= 'document';									
									$p['media']= 'file';									
									
								}
					return $p;				
				}
		/**
		 * Retorno los parametros para concatenar las variables de las imagenes
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : getfechaformat()
		 * Parametros de entrada : $post
		 * Parametros de Salida:  p
		 */							
		public function getfechaformat($post){	
					$p=array();
						date_default_timezone_set('America/Bogota');
						$fecha_inicio=$post['fechainicio'].' '.$post['horainicio'].':00';
						$fecha_final=$post['fechafinal'].' '.$post['horafinal'].':00';
						
						$fecha_inicio = date_create($fecha_inicio);
						$fecha_inicio = date_format($fecha_inicio, 'Y-m-d H:i:s');	

						$fecha_final = date_create($fecha_final);
						$fecha_final = date_format($fecha_final, 'Y-m-d H:i:s');
			$p['fechainicio']= $fecha_inicio;			
			$p['fechafinal']= $fecha_final;
			return $p;	
		}
}