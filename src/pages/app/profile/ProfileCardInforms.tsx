import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileProps } from "./Profile";


export function ProfileCardInforms({displayName, email }: ProfileProps) {

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right text-white font-normal leading-5 ">
          Nome
        </Label>
        <Input
          id="name"
          defaultValue={displayName}
          className="col-span-3"
          disabled={true}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right text-white font-normal leading-5 ">
          Email
        </Label>
        <Input
          id="email"
          defaultValue={email}
          className="col-span-3"
          disabled={true}
        />
      </div>
    </div>
  )
}
