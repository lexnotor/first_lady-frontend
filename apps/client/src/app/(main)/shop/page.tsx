import SearchBar from "@/components/SearchBar";
import SearchResult from "@/components/SearchResult";
import DetailProduit from "@/components/detailProduit";

const Page = () => {
    return (
        <div className="">
            <SearchBar />

            {/* space */}
            <div className="my-2" />
            <div className="px-3">
                <SearchResult />
            </div>
            <DetailProduit />
        </div>
    );
};

export default Page;
