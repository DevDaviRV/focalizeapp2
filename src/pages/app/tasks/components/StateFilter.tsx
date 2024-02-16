import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export function StateFilter() {
  return (
    <Select>
      <SelectTrigger className="w-[10vw] bg-gray-900">
        <SelectValue placeholder="Estado da tarefa" />
      </SelectTrigger>
      <SelectContent className="bg-black text-white">
        <SelectGroup>
          <SelectItem value="finished">Finalizada</SelectItem>
          <SelectItem value="nofinished">Não Finalizada</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
