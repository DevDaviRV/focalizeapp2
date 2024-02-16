import { Logo } from "@/common/Logo";


export function SignupInfo () {
  return (
    <div className="lg:w-1/2 bg-muted rounded-xl p-6 lg:p-12">
      <Logo />
      <h2 className="mt-8 lg:mt-10 text-3xl lg:text-4xl leading-[50px] font-medium">
        Vença o que te venceu até hoje. Focalize sua vida.
      </h2>
      <p className="mt-6 text-muted-foreground">
        Conquiste mais usando a ferramenta que torna a organização uma aliada
        contra o TDAH.
      </p>
      <div className="bg-foreground text-background p-4 lg:p-8 rounded-xl mt-12 leading-7">
        "O app Focalize transformou minha luta diária com o TDAH. Gerencio
        tarefas, evito distrações, controlo tudo e tenho vitórias diárias! Se
        alguém mais enfrenta desafios semelhantes, confie em mim, esse app é a
        revolução contra a procrastinação!"
      </div>
    </div>
  );
}
