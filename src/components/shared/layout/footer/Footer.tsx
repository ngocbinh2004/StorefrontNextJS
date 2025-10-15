import FooterDesktop from "./desktop/FooterDesktop";
import FooterMobile from "./mobile/FooterMobile";

export default function LayoutFooter() {
  return (
    <div className="mt-8 page-footer">
      <FooterDesktop />
      {/* <FooterMobile /> */}
    </div>
  );
}
