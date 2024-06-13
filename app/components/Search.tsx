import React from "react";
import { FaSearch } from "react-icons/fa"; 

const Search = () => {
    return(
        <div className="w-full mx-auto ">
            <form className="w-full border p-2 rounded-lg  bg-gray-100 flex flex-row">
                <input
                    type="text"
                    className="w-full bg-gray-100 focus:outline-none"
                    placeholder="지역으로 검색"
                />
                <p className="p-2"><FaSearch /></p> 
            </form>
            
        </div>
    );
}

export default Search;