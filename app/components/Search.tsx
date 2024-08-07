import React, { FormEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { searchKeywordAtom } from "../recoil/RecoilContext";

interface SearchProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void; // 폼 제출 이벤트를 인자로 받는 함수
}

const Search: React.FC<SearchProps> = ({ onSubmit }) => {
    const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordAtom);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(e); // 폼 제출 이벤트를 onSubmit 함수에 전달
    };

    return (
        <div className="w-full mx-auto mb-4">
            <form onSubmit={handleSubmit} className="w-full border p-2 rounded-lg bg-gray-100 flex flex-row">
                <input
                    type="text"
                    className="w-full bg-gray-100 focus:outline-none"
                    placeholder="검색할 지역을 입력해주세요.(예 : 서울특별시 강남구, 충청남도 천안시 등)"
                    value={searchKeyword}
                    onChange={handleInputChange}
                />
                <p className="p-2"><FaSearch /></p>
            </form>
        </div>
    );
};

export default Search;