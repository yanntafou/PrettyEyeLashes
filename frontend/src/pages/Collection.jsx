import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";


const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');

    const toggleCategory = (e) => {

        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {

        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    //loading page collection for the first time, a copy of products will be created and stored in the setFilterProducts
    const applyFilter = () => {
        let productsCopy = products.slice(); //create a copy of all products

        //logic to search for a product
        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        //logic to filter a product by category
        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category))
        }

        //logic to filter a product by subcategory
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
        }

        setFilterProducts(productsCopy) //store a copy of the products
    }

    const sortProduct = () => {

        let fpCopy = filterProducts.slice();

        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
                break;
            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
                break;
            default:
                applyFilter();
                break;
        }
    }





    useEffect(() => {
        applyFilter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, subCategory, search, showSearch, products])

    useEffect(() => {
        sortProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType])

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

            {/* Filter options -left side */}

            <div className="min-w-60">

                <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
                    FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                </p>

                {/* category filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Eyelashes'} onChange={toggleCategory} /> Eyelashes
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Tools'} onChange={toggleCategory} /> Tools
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Misc'} onChange={toggleCategory} /> Misc
                        </p>
                    </div>
                </div>

                {/* subcategory filter */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Natural'} onChange={toggleSubCategory} /> Natural
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Synthetic'} onChange={toggleSubCategory} /> Synthetic
                        </p>
                        <p className="flex gap-2">
                            <input className="w-3" type="checkbox" value={'Utils'} onChange={toggleSubCategory} /> Utils
                        </p>
                    </div>
                </div>

            </div>

            {/* content -right side */}
            <div className="flex-1">

                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />

                    {/* PRoduct Sort */}
                    <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
                        <option value="relavent">Sort by : Relevant</option>
                        <option value="low-high">Sort by : Low to High</option>
                        <option value="high-low">Sort by : High to Low</option>
                    </select>
                </div>

                {/* Show all products */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {
                        filterProducts.map((item, index) => (
                            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                        ))
                    }
                </div>




            </div>

        </div>
    )
}

export default Collection
