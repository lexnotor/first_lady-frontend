"use client";
import useAuth from "@/hooks/useAuth";
import MyRole from "./MyRole";
import PasswordForm from "./PasswordForm";
import ProfilForm from "./ProfilForm";

const UserProfile = () => {
    const { account } = useAuth();

    return (
        <div>
            <section className="flex gap-4 border p-4 rounded-xl border-primary-700">
                <div className="bg-primary-600 w-36 h-36 rounded-full"></div>
                <div className="flex flex-col justify-center gap-4">
                    <h2 className="flex gap-2 items-center">
                        <span className="italic">Nom: </span>
                        <span className="font-bold text-xl">
                            {account?.data?.names}
                        </span>
                    </h2>
                    <h2 className="flex gap-2 items-center">
                        <span className="italic">Username: </span>
                        <span className="font-bold text-xl">
                            @{account?.data?.username}
                        </span>
                    </h2>
                </div>
            </section>
            <section className="my-4 grid grid-cols-2 gap-4">
                <MyRole />

                <PasswordForm />

                <ProfilForm />
            </section>
        </div>
    );
};

export default UserProfile;
