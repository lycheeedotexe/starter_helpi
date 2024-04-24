import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserResponsesType = {
    [key: number]: string;
}

interface UserResponsesContextType {
    responses: UserResponsesType;
    setResponses: (responses: UserResponsesType) => void;
}

const defaultResponses = {
    responses: {},
    setResponses: () => {}
}

export const UserResponsesContext = createContext<UserResponsesContextType>(defaultResponses); //initialize default empty responses


export const useUserResponses = () => useContext(UserResponsesContext);

export const UserResponsesProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [responses, setResponses] = useState<UserResponsesType>({});

    return (
        <UserResponsesContext.Provider value={{responses, setResponses}}>
            {children}
        </UserResponsesContext.Provider>
    )
}