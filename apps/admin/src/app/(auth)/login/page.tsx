import GoogleLogin from "@/components/auth/GoogleLogin";
import LoginForm from "@/components/auth/LoginForm";
import StoreProvider from "@/redux/StoreProvider";

const Page = () => {
    return (
        <>
            <section className="flex flex-col gap-4 mb-4">
                <h2 className="text-3xl">Connectez vous</h2>
                <p className="text-neutral-400 font-light">
                    Accéder à votre compte
                </p>
            </section>

            <section>
                <GoogleLogin />
            </section>

            <section className="my-8 flex items-center gap-4">
                <hr className="border-[0.5px] border-neutral-500 grow" />
                <span>Ou</span>
                <hr className="border-[0.5px] border-neutral-500 grow" />
            </section>

            <section>
                <StoreProvider>
                    <LoginForm />
                </StoreProvider>
            </section>
        </>
    );
};

export default Page;
