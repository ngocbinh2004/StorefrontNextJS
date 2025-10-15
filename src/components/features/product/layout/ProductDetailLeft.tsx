import { ProductJson } from "@/common/types/Product";
import { CustomerJson } from "@/common/types/Customer";
import CollapsibleBlock from "@/components/shared/displaydata/CollapsibleBlock";
import ProductComment from "../comment/ProductComment";
import ProductPackageInfoElement from "../element/ProductPackageInfoElement";
import ProductGalleryWrapper from "../element/productgallery/ProductGalleryWrapper";
import ProductRating from "../rating/ProductRating";
import ProductSimilarList from "../similar/ProductSimilarList";

const ProductDetailLeft = ({
  product,
  loggedUser,
}: {
  product: ProductJson;
  loggedUser: CustomerJson;
}) => {
  return (
    <div className="col-span-3 space-y-5 max-md:order-2 max-md:mx-2">
      <div className="max-md:hidden">
        <ProductGalleryWrapper product={product} />
      </div>
      <ProductPackageInfoElement product={product} />

      <ProductSimilarList key={product.id} product={product} />

      {product.description.length > 0 ? (
        <CollapsibleBlock className="mt-2">
          <div
            className="overflow-hidden product-format-content"
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          ></div>
        </CollapsibleBlock>
      ) : (
        ""
      )}

      <ProductRating product={product} loggedUser={loggedUser} />
      <ProductComment product={product} />
    </div>
  );
};

export default ProductDetailLeft;
