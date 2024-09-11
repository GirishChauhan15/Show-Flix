import { createContext, useContext } from "react";

const UserSearchData = createContext();

export const SearchProvider = UserSearchData.Provider

export const useData = () => {
    return useContext(UserSearchData)
}