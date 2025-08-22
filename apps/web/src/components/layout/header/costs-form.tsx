"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { useForm } from "react-hook-form";
import { DialogClose, DialogFooter } from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { CostsFormValues } from "@/@types/costs.type";

interface CostsFormProps {
  defaultValues?: Partial<CostsFormValues & { id?: string }>;
  onSubmit: (data: CostsFormValues & { id?: string }) => void;
}

export function CostsForm({ defaultValues, onSubmit }: CostsFormProps) {
  const form = useForm<CostsFormValues>({
    defaultValues: {
      category: "",
      date: "",
      value: 0,
      description: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 grid md:grid-cols-2 gap-x-4"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categorias</SelectLabel>
                    <SelectItem value="Alimentação">Alimentação</SelectItem>
                    <SelectItem value="Transporte">Transporte</SelectItem>
                    <SelectItem value="Lazer">Lazer</SelectItem>
                    <SelectItem value="Moradia">Moradia</SelectItem>
                    <SelectItem value="Saúde">Saúde</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <Input type="date" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Valor (Kz)</FormLabel>
              <Input type="number" placeholder="Montante Gasto" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <div className="flex items-center justify-between">
                <FormLabel>Descrição</FormLabel>
                <span className="text-xs text-neutral-500">
                  {field.value?.length || 0} de 255 caracteres
                </span>
              </div>
              <Textarea
                placeholder="Escreva uma pequena descrição do seu gasto"
                className="p-4 min-h-20"
                maxLength={255}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="col-span-2 mt-4 gap-3 justify-end">
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="outline">
            Guardar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
