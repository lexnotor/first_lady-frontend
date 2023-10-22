import useRoles from "@/hooks/useRoles";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";

const MyRole = () => {
    const { myRoles, allRoles } = useRoles();

    return (
        <article className="flex flex-col gap-4 border p-4 rounded-xl border-primary-700">
            <h1 className="font-bold">Roles et Permissions</h1>
            <ul>
                {allRoles.map((item) => {
                    return (
                        <li key={item.id} className="flex flex-col my-3">
                            <h5 className="flex gap-2 items-center font-bold">
                                <span
                                    className={`text-lg ${
                                        myRoles.find((myr) => myr.id == item.id)
                                            ? "text-secondary-800"
                                            : "text-secondary-600/20"
                                    }`}
                                >
                                    <BsCheckCircle />
                                </span>
                                <span>{item.title}</span>
                            </h5>
                            <span className="pl-6">{item.description}</span>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
};

export default MyRole;
