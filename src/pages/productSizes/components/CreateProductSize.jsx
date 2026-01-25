import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSizeFormSchema } from "../utils/productSizeFormSchema";
import { useCreateProductSizeMutation } from "../../../redux/features/productSizes/productSizeApi";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/custom/button";
import InputField from "@/components/custom/inputField";
import toast from "react-hot-toast";

export default function CreateProductSize({ setShowCreateForm, refetch, parentID }) {
    const [createProductSize] = useCreateProductSizeMutation();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(productSizeFormSchema),
        defaultValues: {
            name: "",
            serial: '',
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        data.product = parentID;
        const result = await createProductSize(data);

        if (result.data) {
            refetch();
            toast.success("Product Size created successfully!");
            setIsLoading(false);
            setShowCreateForm(false);
        } else if (result.error) {
            toast.error(result.error.message || "Failed to create Product Size");
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-2">

                    <InputField control={form.control} name="name" label="Product Size Name" placeholder="Enter size name" />
                    <InputField control={form.control} name="serial" label="Serial" placeholder="Enter serial number" type="text" />
                    <Button className="mt-2" loading={isLoading}>
                        Create Product Size
                    </Button>
                </div>
            </form>
        </Form>
    );
}
