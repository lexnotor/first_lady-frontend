import { useState } from "react";

type Toggler = (b?: boolean) => void;

const useToggle = (defaultValue = false): [boolean, Toggler] => {
    const [value, changeValue] = useState(!!defaultValue || false);
    const toggle: Toggler = (val) => changeValue((old) => val ?? !old);

    return [value, toggle];
};

export default useToggle;
