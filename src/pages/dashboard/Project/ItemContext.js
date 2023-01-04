import React from 'react'
import { getItemStorage } from '../components/itemStorage.ts';

const apartadosRef = getItemStorage({
  typeOfStorage: localStorage,
  item: 'storesData',
});
const ItemContext = React.createContext(apartadosRef)
ItemContext.displayName = 'ItemContext'

export default ItemContext
