"use client";
import CartNextApi from "@/common/api/next/CartNextApi";
import ProductBundleNextApi from "@/common/api/next/ProductBundleNextApi";
import ProductBundleModel from "@/common/models/ProductBundleModel";
import { BundlePriceJson } from "@/common/types/ProductBundleDetail";
import TextMoney from "@/components/shared/displaydata/TextMoney";
import { Divider } from "@nextui-org/divider";
import { Button, Spinner } from "@nextui-org/react";
import update from "immutability-helper";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import ProductBundleList from "./ProductBundleList";

export default function ProductBundleWrapper({
  product_id,
}: {
  product_id: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [productBundleModel, setProductBundleModel] =
    useState<ProductBundleModel>(
      new ProductBundleModel(ProductBundleModel.getDefaultData())
    );

  const fetchProductBundle = useCallback(async (product_id: number) => {
    setLoading(true);
    const myObj = await ProductBundleNextApi.getBundelDetail({
      product_id: product_id,
    });

    setProductBundleModel(myObj);

    setLoading(false);
  }, []);

  useEffect(() => {
    if (product_id > 0) {
      fetchProductBundle(product_id);
    }
  }, [product_id, fetchProductBundle]);

  const [variantCart, setVariantCart] = useState<BundlePriceJson[]>([]);
  const handleVariantSelect = useCallback(
    (item: BundlePriceJson) => {
      let findIndex = variantCart.findIndex(
        (i) => i.product_variant_id === item.product_variant_id
      );
      if (findIndex > -1) {
        setVariantCart(
          variantCart.filter(
            (v) => v.product_variant_id != item.product_variant_id
          )
        );
      } else {
        setVariantCart(
          update(variantCart, {
            $unshift: [item],
          })
        );
      }
    },
    [variantCart]
  );

  const [processing, setProcessing] = useState(false);
  const addAllToCart = useCallback(async () => {
    setProcessing(true);
    try {
      for (const variant of variantCart) {
        await CartNextApi.addToCart({
          product_variant_id: variant.product_variant_id,
          quantity: 1,
        });
      }

      //redirect to cart
      router.push(`/shopping-cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setProcessing(false);
    }
  }, [variantCart, router]);

  const calculatedData = useMemo(() => {
    let qty = 0;
    let p_original = 0;
    let p_final = 0;
    variantCart.map((item) => {
      qty++;
      p_original = p_original + item.price_original;
      p_final = p_final + item.price_final++;
    });

    return {
      quantity: qty,
      price_original: p_original,
      price_final: p_final,
    };
  }, [variantCart]);

  if (productBundleModel.id === 0) {
    return null;
  } else {
    return (
      <div className="border rounded py-[6px] px-2.5 max-md:order-11 max-md:mx-2">
        <h2 className="text-xl my-2.5 text-center">
          {"Ưu đãi hấp dẫn khi mua kèm"}
        </h2>
        <Divider />

        {loading ? (
          <Spinner />
        ) : (
          <div className="my-4 space-y-2">
            <ProductBundleList
              onVariantSelect={handleVariantSelect}
              bundleModel={productBundleModel}
            />
          </div>
        )}

        <Divider />
        <div className="flex flex-col gap-y-0.5 my-3">
          <div className="text-center text-sm">
            {"Giá bán lẻ: "}
            <span className="text-[#999999] line-through">
              <TextMoney money={calculatedData.price_original} />
            </span>
          </div>
          <div className="text-center text-sm">
            {"Giá bán sau khuyến mãi: "}
            <span className="text-base text-primary font-bold">
              <TextMoney money={calculatedData.price_final} />
            </span>
          </div>
        </div>

        <Button
          isDisabled={variantCart.length === 0 ? true : false}
          isLoading={processing}
          onClick={addAllToCart}
          color="primary"
          fullWidth
          className="font-bold text-base h-8"
        >
          {`MUA ${calculatedData.quantity} SẢN PHẨM`}
        </Button>
      </div>
    );
  }
}
