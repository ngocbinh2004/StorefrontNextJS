"use client";

import CustomerWishlistNextApi from "@/common/api/next/CustomerWishlistNextApi";
import Product from "@/common/contants/Product";
import CustomerWishlist from "@/common/contants/CustomerWishlist";
import ProductVariantModel from "@/common/models/ProductVariantModel";
import { ProductJson } from "@/common/types/Product";
import { ProductVariantJson } from "@/common/types/ProductVariant";
import { StoreJson } from "@/common/types/Store";
import { CustomerJson } from "@/common/types/Customer";
import { CustomerWishlistJson } from "@/common/types/CustomerWishlist";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import ProductInventoryInfo from "../../productinventory/ProductInventoryInfo";
import AddToCartButton from "../../shoppingcart/AddToCartButton";
import InstallmentButton from "../../shoppingcart/InstallmentButton";
import WishlistButton from "../../wishlist/WishlistButton";
import ProductCountRatingElement from "../element/ProductCountRatingElement";
import ProductGroupElement from "../element/ProductGroupElement";
import ProductVariantElement from "../element/ProductVariantElement";
import ProductAttributeList from "../element/productattribute/ProductAttributeList";
import ProductBundleWrapper from "../element/productbundle/ProductBundleWrapper";
import ProductGiftAccessoryList from "../element/productgiftaccessory/ProductGiftAccessoryList";
import useInventoryStockStore from "@/common/zustands/useInventoryStockStore";
import PreOrderContainer from "../../preorder/PreOrderContainer";
import useProductVariant from "@/common/zustands/useProductVariant";
import ProductGalleryWrapper from "../element/productgallery/ProductGalleryWrapper";
import ProductServiceElement from "../element/ProductServiceElement";
import ProductRelatedNewsElement from "../element/ProductRelatedNewsElement";
import { CompanySettingContext } from "@/common/contexts/CompanySettingContextProvider";

const ProductDetailRight = ({
  product,
  loggedUser,
  allStores,
}: {
  product: ProductJson;
  loggedUser: CustomerJson;
  allStores: StoreJson[];
}) => {
  const setting = useContext(CompanySettingContext);

  const [getSelectVariantId, setSelectVariantId] = useProductVariant(
    (state) => [state.getSelectVariantId, state.setSelectVariantId]
  );
  const [variant, setVariant] = useState(ProductVariantModel.getDefaultData());

  const [checkInstock] = useInventoryStockStore((state) => [
    state.checkInstock,
  ]);

  const onChangeVariant = useCallback(
    (item: ProductVariantJson) => {
      setVariant(item);
      setSelectVariantId(item.id);
    },
    [setSelectVariantId]
  );

  const preOrderingIsAllowed = useMemo(() => {
    return product.installment.includes(Product.INSTALLMENT_ALLOW_PREORDER);
  }, [product]);

  const displayListingPrice = useMemo(() => {
    let price = 0;

    if (variant.listing_price > variant.price) {
      price = variant.listing_price;
    } else if (
      variant.listing_price === variant.price ||
      variant.listing_price < variant.price
    ) {
      price = 0;
    } else if (
      variant.listing_price === 0 ||
      variant.listing_price === 1 ||
      variant.listing_price === 10
    ) {
      price = 0;
    }

    return price;
  }, [variant]);

  const displayPrepaymentPercentage = useMemo(() => {
    return variant.price * (product.prepayment_percentage / 100 || 0.3);
  }, [variant, product.prepayment_percentage]);

  const [wishlistItems, setWishlistItems] = useState<CustomerWishlistJson[]>(
    []
  );
  const fetchWishlistByProductId = useCallback(async () => {
    const wishlistModel = await CustomerWishlistNextApi.getDetailByProductId(
      product.id
    );
    if (!wishlistModel.hasError()) {
      setWishlistItems([wishlistModel]);
    }
  }, [product]);

  useEffect(() => {
    if (product.variants.length > 0) {
      setVariant(product.variants[0]);
    }
  }, [product, checkInstock]);

  useEffect(() => {
    if (loggedUser.id > 0) {
      fetchWishlistByProductId();
    }
  }, [loggedUser, fetchWishlistByProductId]);

  return (
    <div className="relative flex flex-col flex-1 w-full col-span-2 space-y-5">
      <div className="md:hidden">
        <ProductGalleryWrapper product={product} />
      </div>

      <h1 className="mt-2 text-xl font-bold lg:mt-0 max-md:mx-2">
        {product.name}
      </h1>

      <div className="flex items-center mx-2 lg:mx-0">
        <div className="">
          <div className="flex items-center">
            <WishlistButton
              wishlistItems={wishlistItems || []}
              productId={product.id}
              label="Yêu thích"
              from={CustomerWishlist.FROM_PRODUCT_DETAIL}
              loggedUser={loggedUser}
            />
          </div>
        </div>

        <div className="pl-2 ml-2 border-l border-gray-300">
          <div className="flex items-center">
            <ProductCountRatingElement productId={product.id} />
          </div>
        </div>

        <div className="pl-2 ml-2 border-l border-gray-300">
          <div className="flex items-center">
            <p className="text-sm max-md:hidden">SKU: {variant.sku}</p>
          </div>
        </div>
      </div>

      {product.group.length > 0 ? (
        <div className="max-md:mx-2">
          <ProductGroupElement
            items={product.group}
            activeValue={product.id}
            category_slug={product.category_slug}
          />
        </div>
      ) : null}

      <div className="max-md:mx-2">
        <ProductVariantElement
          items={product.variants}
          activeValue={variant.id}
          onChangeVariant={onChangeVariant}
        />
      </div>

      {/* giá tiền */}
      <div className="flex flex-wrap items-center justify-between my-8 max-xl:items-center max-md:mx-2">
        <div className="flex items-center flex-wrap flex-1 gap-x-[9px]">
          {variant.price > 0 ? (
            <>
              <span className="text-2xl font-bold text-primary">
                <TextMoney money={variant.price} />
              </span>
              {displayListingPrice > 0 ? (
                <span className="text-sm font-normal text-black line-through max-md:pl-0">
                  <TextMoney money={displayListingPrice} />
                </span>
              ) : null}
            </>
          ) : (
            <span className="font-medium text-red-500">Liên hệ</span>
          )}
        </div>
      </div>

      <div className="">
        <ProductInventoryInfo
          variants={product.variants}
          onChangeVariant={onChangeVariant}
          allStores={allStores}
          activeVariant={variant}
        />
      </div>

      {product.info_promotion.length > 0 ||
      product.info_promotion_note.length > 0 ? (
        <div className="border mt-3 flex w-full flex-col rounded border-[#FFDFE1] text-sm overflow-hidden max-md:mx-2 max-md:w-auto">
          <div className="bg-[#FFDFE1] p-2">
            <h2 className="text-base font-bold text-primary">Khuyến mãi</h2>
          </div>
          <div className="flex w-full flex-col items-start justify-start bg-white p-2.5 text-base">
            <div
              className="format-content"
              dangerouslySetInnerHTML={{
                __html: product.info_promotion,
              }}
            ></div>
          </div>
          {product.info_promotion_note.length > 8 ? (
            <div className="border-t border-dashed px-3 py-2.5">
              <div
                className="format-content"
                dangerouslySetInnerHTML={{
                  __html: product.info_promotion_note,
                }}
              ></div>
            </div>
          ) : null}
        </div>
      ) : null}

      {variant.id > 0 &&
      checkInstock(+setting.website_inventory_from_warehouse, variant.id) ? (
        <div className="mb-4 space-y-2 max-md:mx-2">
          <AddToCartButton productVariantId={variant.id} />
        </div>
      ) : (
        <>
          {preOrderingIsAllowed ? (
            <PreOrderContainer variant={variant} />
          ) : null}
        </>
      )}
      <ProductServiceElement />
      <ProductBundleWrapper product_id={product.id} />
      <ProductGiftAccessoryList product_id={product.id} />
      <ProductAttributeList product={product} />
      <ProductRelatedNewsElement />
    </div>
  );
};

export default ProductDetailRight;
