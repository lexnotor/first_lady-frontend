"use client";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { createCategory } from "@/redux/product/product.slice";
import React, { useRef } from "react";
import { Button } from "ui";

const NewCategoryForm = () => {
    const dispatch = useAppDispatch();

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;

        if (title.trim().length < 3) {
            alert("Please enter min 3 character for designation");
        }

        dispatch(createCategory({ title, description })).then(() => {
            (titleRef.current.value = ""), (descriptionRef.current.value = "");
        });
    };

    return (
        <form className="flex flex-col gap-4 py-4 px-2" onSubmit={submit}>
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="">
                    Designation
                </label>
                <div className="">
                    <input
                        type="text"
                        className="py-2 px-4 w-full rounded-xl bg-primary-700"
                        ref={titleRef}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="">
                    Description
                </label>
                <div className="">
                    <textarea
                        className="py-2 px-4 w-full rounded-xl bg-primary-700"
                        ref={descriptionRef}
                    />
                </div>
            </div>
            <div className="text-center">
                <Button size="middle">Enregistrer</Button>
            </div>
        </form>
    );
};

export default NewCategoryForm;
