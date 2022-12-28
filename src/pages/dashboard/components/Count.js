// @flow
//import React,{ useEffect,useState } from 'react';

const Count = (tableProps)  => {

    return (
        <>
                    <input
                        type="number"
                        max={tableProps.cantidad}
                        min={0}
                        defaultValue={tableProps.defaultValue}
                        name={tableProps.rowid}
                        id={tableProps.rowid}
                        onChange={(e) => {
                            const page = {
                              value:e.target.value ? Number(e.target.value) : 0,
                              rowid:tableProps.rowid,
                              title:tableProps.title,
                              IdCategorias:tableProps.IdCategorias,
                              idUser:tableProps.idUser,
                              estado:'add'
                            };
                            tableProps.onDateValueCategories(page);
                        }}
                        className="form-control w-27 ms-2 p-1 d-inline-block"
                    />
        </>
    );
};

export default Count;
