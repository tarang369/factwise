import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/UserContext";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
    const { state, dispatch } = useUserContext();

    const handleSearch = (e) => {
        dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
    };

    return (
        <div className="w-full md:w-1/2 lg:w-3/5 max-w-lg">
            <div className="relative">
                <CiSearch className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search user"
                    className="pl-8"
                    value={state.search_term}
                    onChange={handleSearch}
                />
            </div>
        </div>
    );
};

export default SearchBar;
