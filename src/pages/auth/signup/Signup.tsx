import { Link } from "react-router-dom";
import { SignupInfo } from "./components/SingupInfo";
import { SignupForm } from "./components/SignupForm";



export function Signup() {
  return (
    <div className="flex  w-full h-screen  overflow-hidden p-2 ">
      <SignupInfo />
      <div className="flex flex-col justify-center w-1/2 px-6">
        <h1 className="text-3xl font-medium">Cadastre-se agora</h1>
        <p className="mt-4 text-muted-foreground font-normal text-lg">
          Crie sua conta agora mesmo
        </p>
        <SignupForm />
        <div className="mt-8 flex justify-center text-lg">
          <p>Já tem uma conta?</p>
          <Link to="/login" className="text-primary ml-1">
            Entre agora.
          </Link>
        </div>
      </div>
    </div>
  );
}
