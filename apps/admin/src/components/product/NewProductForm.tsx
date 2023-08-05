/*title description brand sales category quantity price */
const NewProductForm = () => {
    return (
        <form className="w-full table-form">
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
                    />
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="brand" className="input-label">
                    Marque
                </label>
                <div className="input-content">
                    <input type="text" placeholder="Vlisco" id="brand" />
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="categorie" className="input-label">
                    Categorie
                </label>
                <div className="input-content">
                    <select name="categorie" id="categorie">
                        <option value="super_wax">Super Wax</option>
                    </select>
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="quantity" className="input-label">
                    Quantité
                </label>
                <div className="input-content">
                    <input
                        type="number"
                        id="quantity"
                        defaultValue={0}
                        min={0}
                    />
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="price" className="input-label">
                    Prix
                </label>
                <div className="input-content">
                    <input
                        type="number"
                        name="price"
                        id="price"
                        defaultValue={0}
                        min={0}
                    />
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
                    />
                </div>
            </div>
        </form>
    );
};

export default NewProductForm;
