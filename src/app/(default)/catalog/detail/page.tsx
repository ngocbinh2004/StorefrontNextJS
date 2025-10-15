import CustomerSessionApi from "@/common/api/server/CustomerSessionApi";
import ProductApi from "@/common/api/server/ProductApi";
import ProductCategoryApi from "@/common/api/server/ProductCategoryApi";
import StoreApi from "@/common/api/server/StoreApi";
import ProductModel from "@/common/models/ProductModel";
import { BreadcrumbItem } from "@/common/types/Breadcrumb";
import { ProductJson } from "@/common/types/Product";
import ProductDetailLeft from "@/components/features/product/layout/ProductDetailLeft";
import ProductDetailRight from "@/components/features/product/layout/ProductDetailRight";
import ProductRecentlyViewedAction from "@/components/features/product/recentlyviewed/ProductRecentlyViewedAction";
import ProductRecentlyViewedList from "@/components/features/product/recentlyviewed/ProductRecentlyViewedList";
import Breadcrumb from "@/components/shared/displaydata/Breadcrumb";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const slug = searchParams.productslug?.toString() || "";
  const product = await ProductApi.getDetailBySlug(slug);

  if (product.id === 0) {
    // let url = `/${searchParams.categoryslug?.toString() || ""}/${
    //   searchParams.productslug?.toString() || ""
    // }.html`;
    // const getRedirecLink = await RedirectLinkApi.getDetailBySourceUrl(url);
    // if (!getRedirecLink.hasError()) {
    //   redirect(getRedirecLink.redirect_url);
    // } else {
    notFound();
  }

  const graphFile =
    product.seo_graph_file.id > 0
      ? product.seo_graph_file
      : product.avatar_file_list[0];

  const hasIndex = true;

  const canonicalStr =
    product.seo_canonical.length > 0
      ? product.seo_canonical
      : `${ProductModel.getMarkUrl(
          product.category_slug,
          product.seo_url,
          product.id
        )}`;

  return {
    title: product.seo_title.length > 0 ? product.seo_title : product.name,
    description: product.seo_meta_description,
    robots: {
      index: hasIndex,
      follow: true,
      googleBot: {
        index: hasIndex,
        follow: true,
      },
    },
    alternates: {
      canonical: canonicalStr,
    },
    openGraph: {
      images: [
        {
          url: graphFile?.url,
          width: graphFile?.width,
          height: graphFile?.height,
          alt: product.name,
        },
      ],
      type: "website",
      locale: "vi",
      siteName: "OVIRO",
      title: product.seo_title,
      description: product.seo_meta_description,
    },
  };
}

const CatalogDetailPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const slug = searchParams.productslug?.toString() || "";

  const product = await ProductApi.getDetailBySlug(slug);

  if (product.id === 0) {
    notFound();
  }

  let newProduct: ProductJson = product.toJson();

  const loggedUser = await CustomerSessionApi.getCurrentLoggedUserDetail();
  const allStores = await StoreApi.getAllItems();

  let ids: number[] = [
    ...newProduct.category_id_list,
    newProduct.category_primary,
  ];
  const getCategoryList = await ProductCategoryApi.getByIdList(ids.join(","));

  const nav: BreadcrumbItem[] = [
    ...(getCategoryList.total > 0
      ? getCategoryList.items.map((i) => {
          return {
            label: i.name,
            href: `/${i.seo_url}`,
          };
        })
      : []),
    ...[
      {
        label: product.name,
        href: ProductModel.getMarkUrl(
          product.category_slug,
          product.seo_url,
          product.id
        ),
      },
    ],
  ];

  //json
  const jsonLdOne = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        process.env.NEXT_PUBLIC_WEB_BASE_URL +
        ProductModel.getMarkUrl(
          product.category_slug,
          product.seo_url,
          product.id
        ),
    },
    headline: product.name,
    keywords: product.seo_meta_keyword,
    thumbnailUrl: product.avatar_file_list[0]?.url,
    description: product.seo_meta_description,
    image: {
      "@type": "ImageObject",
      url: product.avatar_file_list[0]?.url,
      height: 900,
      width: 1200,
    },
    author: {
      "@type": "Person",
      name: "OVIRO",
    },
  };

  // json breadcrumb for post
  const jsonLdFour = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      ...nav.map((item, idx) => ({
        "@type": "ListItem",
        position: ++idx,
        name: item.label,
        item: item.href,
      })),
    ],
  };

  return (
    <div className="container">
      <Breadcrumb data={nav} />
      <div className="grid grid-cols-5 md:gap-x-[30px] rounded-lg bg-white max-md:my-2 max-md:grid-cols-1 mt-9">
        <ProductRecentlyViewedAction productId={product.id} />
        <ProductDetailLeft
          product={newProduct}
          loggedUser={loggedUser.toJson()}
        />
        <ProductDetailRight
          product={newProduct}
          loggedUser={loggedUser.toJson()}
          allStores={allStores.items.map((i) => i.toJson())}
        />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOne) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFour) }}
      />

      <div className="mt-4">
        <ProductRecentlyViewedList className={"border"} />
      </div>
    </div>
  );
};

export default CatalogDetailPage;
