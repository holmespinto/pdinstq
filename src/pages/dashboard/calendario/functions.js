import { getItemStorage } from '../components/itemStorage.ts';

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
export { allTitles, allIds, SelectTitulosCategorias};
