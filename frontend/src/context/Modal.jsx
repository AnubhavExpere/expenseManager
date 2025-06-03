import {createContext, useState } from 'react';

//context for modal visibility
export const ModalContext = createContext();

//context provider for modal context 
export const ModalProvider = (props) => {
    const [visibleAddExpense, setVisibleAddExpense] = useState(false);
    const [visibleImport, setVisibleImport] = useState(false);

    return (
        <ModalContext.Provider value={{ visibleAddExpense, setVisibleAddExpense, visibleImport, setVisibleImport }}>
            {props.children}
        </ModalContext.Provider>
    );
}