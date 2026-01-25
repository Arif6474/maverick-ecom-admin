import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSizeFormSchema } from "../utils/productSizeFormSchema";
import { useGetSingleProductSizeQuery, useUpdateProductSizeMutation } from "../../../redux/features/productSizes/productSizeApi";
import { Button } from "@/components/custom/button";
import InputField from "@/components/custom/inputField";
import toast from "react-hot-toast";
import Loader from "../../../components/Shared/loader/loader";
import { Form } from "@/components/ui/form";

export default function UpdateProductSize({ setShowUpdateForm, refetch, targetID, parentID }) {
  const [updateProductSize] = useUpdateProductSizeMutation();
  const { data: productSize, isLoading: productSizeLoading, refetch: refetchProductSize } = useGetSingleProductSizeQuery({ id: targetID });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(productSizeFormSchema),
    defaultValues: {
      name: productSize?.name || "",
      serial: productSize?.serial || "",
    },
  });

  useEffect(() => {
    if (productSize) {
      form.reset({
        name: productSize.name,
        serial: productSize?.serial.toString() || "",
      });
    }
  }, [productSize, form]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    data.product = parentID;
    const result = await updateProductSize({ id: targetID, updatedData: data });

    if (result.data) {
      refetch();
      refetchProductSize();
      toast.success("Product Size updated successfully!");
    }

    setIsSubmitting(false);
    setShowUpdateForm(false);
  };

  if (productSizeLoading) {
    return <Loader height="30dvh" />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <InputField control={form.control} name="name" label="Product Size Name" placeholder="Enter size name" />
          <InputField control={form.control} name="serial" label="Serial" placeholder="Enter serial number" />
          <Button className="mt-2" loading={isSubmitting}>
            Update Product Size
          </Button>
        </div>
      </form>
    </Form>
  );
}
