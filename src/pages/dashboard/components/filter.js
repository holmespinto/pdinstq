import { getItemStorage } from './itemStorage.ts';

function clearArray(array) {
  while (array.length > 0) {
    array.pop();
  }
}
function getpedidos(id,IdCategorias,idUser){
  const apartados = getItemStorage({
    typeOfStorage: localStorage,
    item: 'storesData',
  })
  // eslint-disable-next-line array-callback-return
  const filterA = apartados.filter(item1 => {
    if (item1.rowid === id) {
      return item1
    }
  })
  // eslint-disable-next-line array-callback-return
  const filterB = filterA.filter(item2 => {
    if (item2.IdCategorias === IdCategorias) {
      return item2
    }
  })
  // eslint-disable-next-line array-callback-return
  const filterC = filterB.filter(item3 => {
    if (item3.idUser === idUser) {
      return item3
    }
  })
    const value = filterC[filterC.length-1]?.value>0?filterC[filterC.length-1]?.value:0
  return value

}


export { getpedidos,clearArray };
