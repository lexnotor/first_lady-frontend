import React, { useRef } from "react";

const Form = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const boolRef = useRef<HTMLSelectElement>(null);

    const submitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const username = usernameRef.current.value;
        const bool = boolRef.current.value;

        const data = { username, bool };

        return data;
    };

    return (
        <div>
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor=""></label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        ref={usernameRef}
                    />
                </div>

                <div>
                    <label htmlFor=""></label>
                    <select name="bool" id="boll" ref={boolRef}>
                        <option value="true"></option>
                        <option value="false"></option>
                    </select>
                </div>

                <div>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Form;
