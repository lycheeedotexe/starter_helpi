import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type DetailedResponsesType = {
    [key: number]: string;
}

interface DetailedResponsesContextType {
    detailedResponses: DetailedResponsesType;
    setDetailedResponses: React.Dispatch<React.SetStateAction<DetailedResponsesType>>;
}

export const defaultDetailedResponses = {
    detailedResponses: {},
    setDetailedResponses: () => {}
}

export const DetailedResponsesContext = createContext<DetailedResponsesContextType>(defaultDetailedResponses); //initialize default empty responses


export const useDetailedResponses = () => useContext(DetailedResponsesContext);

export const DetailedResponsesProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [detailedResponses, setDetailedResponses] = useState<DetailedResponsesType>(()=> {
        const savedResponses = localStorage.getItem('detailedResponses');
        return savedResponses ? JSON.parse(savedResponses) : {};
    });
    useEffect(() => {
        localStorage.setItem('detailedResponses', JSON.stringify(detailedResponses));
    }, [detailedResponses]);
    return (
        <DetailedResponsesContext.Provider value={{detailedResponses, setDetailedResponses}}>
            {children}
        </DetailedResponsesContext.Provider>
    )
}