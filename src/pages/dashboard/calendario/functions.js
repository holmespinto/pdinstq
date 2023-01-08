import { getItemStorage } from '../components/itemStorage.ts';
//import { environment } from '../../../environments/environments';
//import { APICore } from '../../../helpers/api/apiCore';

function styleFormat(str, num) {
    let pos = str?.search('.-');
    if (num === 0) {
        let newStr = str?.substring(Number(pos) + 2);
        return newStr;
    } else {
        let newStr = str?.slice(0, pos);
        return newStr;
    }
}
function arrayUnicos(array) {
    // eslint-disable-next-line array-callback-return
    const titulosUnicos = array.filter((valor, indice) => {
        return array.indexOf(valor) === indice;

    });
    return titulosUnicos;
}

function allTitles(todoData) {
    if (todoData) {
        let category = '';
        // eslint-disable-next-line array-callback-return
        Object.keys(todoData)?.map((key) => {
            if (key !== 0) {
                category += styleFormat(todoData[key]?.text, 0) + ',';
            }
        });
        let titulos = category.slice(1).split(',');
        let titulosUnicos = arrayUnicos(titulos);
        return titulosUnicos;
    }
}

function allIds(todoData) {
    if (todoData) {
        let category = '';
        // eslint-disable-next-line array-callback-return
        Object.keys(todoData)?.map((key) => {
            if (key !== 0) {
                category += styleFormat(todoData[key]?.text, 1) + ',';
            }
        });
        let ids = category.slice(1).split(',');
        let idUnicos = arrayUnicos(ids);
        return idUnicos;
    }
}
function allCanastas(todoData,IdUser) {
  if (todoData) {
    const apartados = getItemStorage({
      typeOfStorage: localStorage,
      item: 'storesDataRef',
  });
    // eslint-disable-next-line array-callback-return
    const filter = apartados.filter((item) =>
      item.idUser === IdUser
  );

     // let category = [];
      let caids = '';
      //let idrow = [];
      // eslint-disable-next-line array-callback-return
      Object.keys(filter)?.map((key) => {
          //if (key !== 0) {
            //category.push({id:filter[key]?.rowid,title:filter[key]?.value})
             caids += filter[key]?.rowid + ',';
          //}
      });


     let ids = caids.split(',');
     let idUnicos = arrayUnicos(ids);
      return idUnicos;
  }
}

function SelectTitulosCategorias(local, idUser,idCategoria) {
    const apartados = getItemStorage({
        typeOfStorage: localStorage,
        item: `${local}`,
    });
    // eslint-disable-next-line array-callback-return
    const filterB = apartados.filter((item) => {
        if (item.IdCategorias === idCategoria) {
            return item;
        }
    });    // eslint-disable-next-line array-callback-return
    const filterC = filterB.filter((item3) => {
        if (item3.idUser === idUser) {
            return item3;
        }
    });
    const titulos = [];
    const options = [];
    // eslint-disable-next-line array-callback-return
    filterC?.map((record, index) => {
        titulos.push(record.value);
    });
    // eslint-disable-next-line array-callback-return
    arrayUnicos(titulos)?.map((record, index) => {
        options.push({ value: `${record}` });
    });
    return options;
}

function getHora(launchDate) {
    const futureDate = new Date();
    futureDate.setTime(launchDate.getTime());
    const fiveMinutesInMillis = 120 * 60 * 1000;
    futureDate.setTime(futureDate.getTime() + fiveMinutesInMillis);
    return futureDate;
}

/*
const api = new APICore();
function listas(params) {
    const options = [];
    const url = `${environment.baseURL}?&accion=${params}&opcion=${environment.opConsultar}`;
    const datos = api.setLista(`${url}`);
    datos.then(function (resp) {
        if (resp) {
            resp &&
                resp.length > 0 &&
                resp.map((record: any, index) => {
                    switch (params) {
                        case 'categorias':
                            const categorias = {
                                value: record.id,
                                label: record.categoria,
                            };
                            options.push(categorias);
                            break;
                        case 'marcas':
                            const marcas = {
                                value: record.id,
                                label: record.marcas,
                            };
                            options.push(marcas);
                            break;
                        case 'presentaciones':
                            const presentaciones = {
                                value: record.id,
                                label: record.presentacion,
                            };
                            options.push(presentaciones);
                            break;
                        default:
                    }
                });
        }
    });
    return options;
}

const options_marcas = {
    options: listas('marcas'),
};
*/

export { allTitles, allIds, SelectTitulosCategorias,allCanastas,getHora};
