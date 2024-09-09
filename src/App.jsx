import SearchBar from "@/components/SearchBar";
import { UserList } from "@/components/UserList";
import { UserProvider } from "@/context/UserContext";

function App() {
    return (
        <UserProvider>
            <div className="bg-slate-50">
                <div className="flex flex-col items-center p-4">
                    <h2 className="text-lg font-semibold w-full mb-2 lg:w-3/5 md:w-1/2 max-w-lg">
                        List View
                    </h2>
                    <SearchBar />
                    <UserList />
                </div>
            </div>
        </UserProvider>
    );
}

export default App;
