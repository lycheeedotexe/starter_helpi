import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserResponsesType = {
    [key: number]: string;
}

interface UserResponsesContextType {
    responses: UserResponsesType;
    setResponses: React.Dispatch<React.SetStateAction<UserResponsesType>>;
}

const defaultResponses = {
    responses: {},
    setResponses: () => {}
}

export const UserResponsesContext = createContext<UserResponsesContextType>(defaultResponses); //initialize default empty responses


export const useUserResponses = () => useContext(UserResponsesContext);

export const UserResponsesProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [responses, setResponses] = useState<UserResponsesType>(()=> {
        const savedResponses = localStorage.getItem('userResponses');
        return savedResponses ? JSON.parse(savedResponses) : {};
    });
    useEffect(() => {
        localStorage.setItem('userResponses', JSON.stringify(responses));
    }, [responses]);
    return (
        <UserResponsesContext.Provider value={{responses, setResponses}}>
            {children}
        </UserResponsesContext.Provider>
    )
}