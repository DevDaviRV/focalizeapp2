import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSignup } from "@/hooks/useSignup";


export function SignupForm () {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isPending } = useSignup();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    signup(email, password, fullName);
  };

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <div className="mb-4">
        <p className="text-muted-foreground">Nome completo</p>
        <Input
          type="text"
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <p className="text-muted-foreground">E-mail</p>
        <Input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <p className="text-muted-foreground">Senha</p>
        <Input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button disabled={isPending} size="lg" className="text-lg w-full">
        {isPending && <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />}
        {isPending ? "Criando a conta..." : "Criar minha conta"}
      </Button>
    </form>
  );
}
