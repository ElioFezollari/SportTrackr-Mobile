import React, { createContext, useState, useContext } from 'react';

const PopUpContext = createContext();

export const PopUpProvider = ({ children }) => {
    const [popUp, setPopUp] = useState(false);

    return (
        <PopUpContext.Provider value={{ popUp, setPopUp }}>
            {children}
        </PopUpContext.Provider>
    );
};

export const usePopUp = () => {
    return useContext(PopUpContext);
};
