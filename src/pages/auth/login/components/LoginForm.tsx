import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useLogin } from "@/hooks/useLogin";


export function LoginForm (){
  const { login, isPending } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className="mt-8" onSubmit={handleLogin}>
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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button size="lg" className="text-lg w-full" disabled={isPending}>
        {isPending && <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />}
        Entrar na minha conta
      </Button>
    </form>
  );
}