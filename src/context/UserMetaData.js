import { createContext, useContext } from "react";

export const UserMetaData = createContext();

export const MetaProvider = UserMetaData.Provider

export const useMetaData = () => {
    return useContext(UserMetaData)
}