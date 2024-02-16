import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  export function WeekFilter() {
    return (
      <Select>
        <SelectTrigger className="w-[10vw] bg-gray-900">
          <SelectValue placeholder="Dia da semana" />
        </SelectTrigger>
        <SelectContent className="bg-black text-white">
          <SelectGroup>
            <SelectItem value="sunday">Domingo</SelectItem>
            <SelectItem value="monday">Segunda-Feira</SelectItem>
            <SelectItem value="tuesday">Terça-Feira</SelectItem>
            <SelectItem value="wednesday">Quarta-Feira</SelectItem>
            <SelectItem value="thursday">Quinta-Feira</SelectItem>
            <SelectItem value="friday">Sexta-Feria</SelectItem>
            <SelectItem value="saturday">Sábado</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
  