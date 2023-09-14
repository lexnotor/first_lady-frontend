"use client";
import useProduct from "@/hooks/useProduct";
import { useNewProductContext } from "../context/NewProductContext";

const ProductSection = () => {
    const { category } = useProduct();
    const { brandRef, categoryRef, descriptionRef, titleRef } =
        useNewProductContext();
    return (
        <section className="table-form w-[80%]">
            <div className="input-group">
                <label htmlFor="title" className="input-label">
                    Nom du product
                </label>
                <div className="input-content">
                    <input
                        type="text"
                        minLength={3}
                        id="title"
                        placeholder="VL3094.324"
                        ref={titleRef}
                    />
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="brand" className="input-label">
                    Marque
                </label>
                <div className="input-content">
                    <input
                        type="text"
                        placeholder="Vlisco"
                        id="brand"
                        ref={brandRef}
                    />
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="categorie" className="input-label">
                    Categorie
                </label>
                <div className="input-content">
                    <select name="categorie" id="categorie" ref={categoryRef}>
                        {category.map((cat) => (
                            <option value={cat.id} key={cat.id}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="input-group">
                <label htmlFor="description" className="input-label">
                    Description
                </label>
                <div className="input-content">
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Desciption du produit"
                        ref={descriptionRef}
                    />
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
