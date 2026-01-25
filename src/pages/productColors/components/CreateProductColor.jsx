import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productColorFormSchema } from "../utils/productColorFormSchema";
import { useCreateProductColorMutation } from "../../../redux/features/productColors/productColorApi";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/custom/button";
import InputField from "@/components/custom/inputField";
import { ImageInput } from "@/components/custom/ImageInput/ImageInput";
import toast from "react-hot-toast";

export default function CreateProductColor({ setShowCreateForm, refetch, parentID }) {
    const [createProductColor] = useCreateProductColorMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState("");

    const form = useForm({
        resolver: zodResolver(productColorFormSchema),
        defaultValues: {
            image: "",
            serial: '',
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        const formData = new FormData();

        formData.append("product", parentID);
        if (image) formData.append("image", image);
        formData.append("serial", data.serial);

        const result = await createProductColor(formData);

        if (result.data) {
            refetch();
            toast.success("Product Color created successfully!");
            setIsLoading(false);
            setShowCreateForm(false);
        }
        if (result.error?.status === 400) {
            toast.error(result.error.data.message || "Failed to create Product Color");
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">

                        <ImageInput
                            fieldId="image"
                            fieldName="image"
                            state={image}
                            setState={setImage}
                            allowCreateImage
                        >
                            Upload Image
                        </ImageInput>
                        <InputField
                            control={form.control}
                            name="serial"
                            label="Serial"
                            type="text"
                            placeholder="Enter serial"
                        />

                        <Button className="mt-2" loading={isLoading}>
                            Create Product Color
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
