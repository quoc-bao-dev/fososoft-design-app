import { useResizeStore } from "@/stores/useResizeStore";
import { SocialMediaItem } from "@/types/social-media/ISocialMedia";
import { FormatPhoneNumberCountry } from "@/utils/format/FormatNumber";
import { JSX } from "react";
import EmailLink from "../../../common/contact-links/EmailLink";
import PhoneLink from "../../../common/contact-links/PhoneLink";
import SocialMediaList from "../../../common/social/SocialMediaList";
import InfoSection from "../elements/InfoSection";

interface CompanyInfoItem {
  label: string;
  value: JSX.Element | string;
}

interface ServiceItem {
  name: string;
  link: string;
  link_type: string;
}

interface PolicyItem {
  name: string;
  link: string;
  link_type: string;
}

const companyInfo: CompanyInfoItem[] = [
  { label: "MST:", value: "031405287" },
  {
    label: "Hotline:",
    value: (
      <PhoneLink
        phoneNumber="0901136968"
        className="hover:text-[#B3C5D4]/80 custom-transition"
      >
        {FormatPhoneNumberCountry("0901136968", "VN")}
      </PhoneLink>
    ),
  },
  {
    label: "Email:",
    value: (
      <EmailLink
        email="info@fososoft.com"
        className="hover:text-[#B3C5D4]/80 custom-transition"
      />
    ),
  },
  // { label: "Địa chỉ trụ sở:", value: "số 68 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM" },
  {
    label: "Địa chỉ công ty:",
    value:
      "Tòa nhà VCC Building, 69/1/3 Nguyễn Gia Trí, Phường 25, Quận Bình Thạnh, TP.HCM",
  },
];

const services: ServiceItem[] = [
  {
    name: "FMRP - Quản lý xưởng online",
    link: "https://fososoft.com/phan-mem-quan-ly-san-xuat-fmrp",
    link_type: "new_tab",
  },
  {
    name: "Thiết kế App Mobile",
    link: "/",
    link_type: "normal",
  },
  {
    name: "Thiết kế Website",
    link: "https://thietkewebfoso.com/",
    link_type: "new_tab",
  },
  // { name: "Thiết kế App Mobile", link: "https://thietkeappfoso.com/", link_type: "new_tab" },
  {
    name: "Thuê Hosting & Server",
    link: "https://fososoft.com/thue-hosting-server",
    link_type: "new_tab",
  },
  // { name: "Thuê IT Outsourcing", link: "https://fososoft.vn/dich-vu-cho-thue-nhan-su/", link_type: "new_tab" },
  // { name: "FPOS - Trợ lý bán hàng", link: "https://fososoft.vn/fpos-banhang/", link_type: "new_tab" }
];

const policies: PolicyItem[] = [
  {
    name: "Chính sách bảo mật",
    link: "https://fososoft.com/chinh-sach-bao-mat",
    link_type: "new_tab",
  },
  {
    name: "Quy định thanh toán",
    link: "https://fososoft.com/chinh-sach-bao-mat",
    link_type: "new_tab",
  },
  {
    name: "Chính sách cookie",
    link: "https://fososoft.com/chinh-sach-bao-mat",
    link_type: "new_tab",
  },
];

interface SocialSectionProps {
  socialMedia: SocialMediaItem[];
}

const FooterContent: React.FC<SocialSectionProps> = ({ socialMedia }) => {
  const { isVisibleTablet } = useResizeStore();

  return (
    <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between lg:gap-0 gap-4">
      <div className="lg:max-w-[60%] max-w-full space-y-6">
        <InfoSection title="CÔNG TY TNHH CÔNG NGHỆ FOSO" items={companyInfo} />
        {!isVisibleTablet && (
          <SocialMediaList
            socialMedia={socialMedia}
            className="bg-[#F2F2F2]/10 hover:bg-[#F2F2F2]/5"
          />
        )}
      </div>

      <div className="grid grid-cols-4 2xl:gap-20 md:gap-10 gap-4 justify-end lg:max-w-[40%] max-w-full">
        <div className="md:col-span-2 col-span-4">
          <InfoSection title="Giải pháp" items={services} />
        </div>
        <div className="md:col-span-2 col-span-4">
          <InfoSection title="Chính sách" items={policies} />
        </div>
      </div>
    </div>
  );
};

export default FooterContent;
