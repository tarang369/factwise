import { getUserFullName } from "@/lib/utils";
import { createContext, useContext, useEffect, useReducer } from "react";

const UserContext = createContext();

const initialState = {
    users: [],
    filtered_users: [],
    search_term: "",
};

function userReducer(state, action) {
    switch (action.type) {
        case "SET_USERS":
            return {
                ...state,
                users: action.payload,
                filteredUsers: action.payload,
            };
        case "UPDATE_USER": {
            const updated_users = state.users.map((user) =>
                user.id === action.payload.id ? action.payload : user
            );
            return {
                ...state,
                users: updated_users,
                filtered_users: updated_users,
            };
        }
        case "DELETE_USER": {
            const filtered_users = state.users.filter(
                (user) => user.id !== action.payload
            );
            return { ...state, users: filtered_users, filtered_users };
        }
        case "SET_SEARCH_TERM":
            return { ...state, search_term: action.payload };
        case "FILTER_USERS": {
            const filtered = state.users.filter(
                (user) =>
                    user.first
                        .toLowerCase()
                        .includes(state.search_term.toLowerCase()) ||
                    user.last
                        .toLowerCase()
                        .includes(state.search_term.toLowerCase()) ||
                    getUserFullName(user.first, user.last)
                        .toLowerCase()
                        .includes(state.search_term.toLowerCase())
            );
            return { ...state, filtered_users: filtered };
        }
        default:
            return state;
    }
}

export function UserProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("src/celebrities.json", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            const data = await response.json();
            dispatch({ type: "SET_USERS", payload: data });
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        dispatch({ type: "FILTER_USERS" });
    }, [state.search_term, state.users]);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);
