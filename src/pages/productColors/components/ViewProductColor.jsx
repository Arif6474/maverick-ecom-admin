import Loader from "../../../components/Shared/loader/loader";
import { Image } from "../../../components/Shared/Image/Image";
import TitleDescription from "../../../components/Shared/titleDescription/titleDescription";
import { useSingleProductColorQuery } from "../../../redux/features/productColors/productColorApi";

export default function ViewProductColor({ targetID }) {
    const { data: productColor, isLoading } = useSingleProductColorQuery({ id: targetID });

    if (isLoading) return <Loader height="30dvh" />;

    return (
        <div className="pt-4 max-h-[75vh] overflow-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {productColor?.image && <Image imgLink={productColor?.image} imgAlt={productColor?.product} />}
            <TitleDescription title="Serial" description={productColor?.serial} />
        </div>
    );
}
