"use client";

import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { RegisterCostFormValues } from "@/core/schemas/costs/register-costs.schema";
import { formatCurrency } from "@/lib/formats/format-currency";

interface CostsFormProps {
	defaultValues?: Partial<RegisterCostFormValues & { id?: string }>;
	onSubmit: (data: RegisterCostFormValues & { id?: string }) => void;
	buttonValue?: string;
}

export function CostsForm({
	defaultValues,
	onSubmit,
	buttonValue = "Guardar",
}: CostsFormProps) {
	const form = useForm<RegisterCostFormValues>({
		mode: "all",
		criteriaMode: "firstError",
		defaultValues: {
			category: "",
			data: "",
			value: 0,
			description: "",
			...defaultValues,
		},
	});

	const onSubmitInternal = async (formData: RegisterCostFormValues) => {
		onSubmit(formData);
		form.reset();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmitInternal)}
				className="space-y-4 grid md:grid-cols-2 gap-x-4"
			>
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem className="md:col-span-1 col-span-2">
							<FormLabel>Categoria</FormLabel>
							<Select
								onValueChange={field.onChange}
								value={field.value}
							>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Selecione uma categoria" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Categorias</SelectLabel>
										<SelectItem value="Alimentação">
											Alimentação
										</SelectItem>
										<SelectItem value="Transporte">
											Transporte
										</SelectItem>
										<SelectItem value="Lazer">
											Lazer
										</SelectItem>
										<SelectItem value="Moradia">
											Moradia
										</SelectItem>
										<SelectItem value="Saúde">
											Saúde
										</SelectItem>
										<SelectItem value="Outros">
											Outros
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="data"
					render={({ field }) => (
						<FormItem className="md:col-span-1 col-span-2">
							<FormLabel>Data</FormLabel>
							<Input
								type="date"
								max={format(new Date(), "yyyy-MM-dd")}
								{...field}
							/>
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
							<Input
								type="number"
								placeholder="Montante Gasto"
								{...field}
							/>
							<p className="text-sm ml-2 text-neutral-500">
								{formatCurrency(field.value)}
							</p>
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
								className="p-4 min-h-20 placeholder:text-sm"
								maxLength={255}
								{...field}
							/>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter className="col-span-2 mt-4 gap-3 justify-end">
					<DialogClose asChild>
						<Button type="button" variant="outline">
							Cancelar
						</Button>
					</DialogClose>
					<Button type="submit" className="text-white">
						{buttonValue}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
