import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productColorFormSchema } from "../utils/productColorFormSchema";
import { Button } from "@/components/custom/button";
import InputField from "@/components/custom/inputField";
import { ImageInput } from "@/components/custom/ImageInput/ImageInput";
import toast from "react-hot-toast";
import Loader from "../../../components/Shared/loader/loader";
import { useSingleProductColorQuery, useUpdateProductColorMutation } from "../../../redux/features/productColors/productColorApi";
import { Form } from "@/components/ui/form";

export default function UpdateProductColor({ setShowUpdateForm, refetch, targetID, parentID }) {
    const [updateProductColor] = useUpdateProductColorMutation();
    const { data: productColor, isLoading: productColorLoading, refetch: refetchProductColor } = useSingleProductColorQuery({ id: targetID });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [image, setImage] = useState("");
    const form = useForm({
        resolver: zodResolver(productColorFormSchema),
        defaultValues: {
            product: parentID || "",
            serial: productColor?.serial || "",
        },
    });

    useEffect(() => {
        if (productColor) {
            form.reset({
                serial: productColor?.serial || "",
            });
            setImage(productColor?.image || "");
        }
    }, [productColor, form]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("product", parentID || "");
        if (image) formData.append("image", image);
        formData.append("serial", data.serial);

        const result = await updateProductColor({ id: targetID, updatedData: formData });

        if (result.data) {
            await refetchProductColor();
            refetch();
            toast.success("Product Color updated successfully!");
        }

        setIsSubmitting(false);
        setShowUpdateForm(false);
    };

    if (productColorLoading) {
        return <Loader height="30dvh" />;
    }

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
                            allowUpdateImage
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
                        <Button className="mt-2" loading={isSubmitting}>
                            Update Product Color
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
