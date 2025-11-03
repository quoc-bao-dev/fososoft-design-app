import ButtonToTop from "@/components/common/button/ButtonToTop";
import RegisterBttonNew from "@/components/common/button/RegisterBttonNew";
import WidgetButton from "@/components/common/button/WidgetButton";
import DynamicSheetWrapper from "@/components/common/sheet/DynamicSheetWrapper";
import FooterContainer from "@/components/layouts/footer/FooterContainer";
// import FosoHeaderContainer from "@/components/layouts/header/header-foso/FosoHeaderContainer";
import { dataFmrpPages } from "@/data/UrlHeaderFmrp";
import React from "react";
import FmrpHeaderContainer from "../header/header-fmrp/FmrpHeaderContainer";
import PathCheckerWrapper from "./PathCheckerWrapper";
import FosoHeaderContainer from "../header/header-foso/FosoHeaderContainerOptimized";

const ClientLayout = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: any;
}) => {
  // const pathname = usePathname();
  // const hideBanner = pathname.startsWith("/du-an");

  return (
    <div className="bg-[#052B1E]">
      {/* header */}
      {/* {!hideBanner && (
        <Image
          src={IMAGES.banner}
          alt="fmrp"
          width={1920}
          height={1080}
          priority
          quality={100}
          className="w-full h-10 lg:h-16 2xl:h-20 4xl:h-32 object-cover"
        />
      )} */}

      <PathCheckerWrapper dataFmrpPages={dataFmrpPages}>
        <FmrpHeaderContainer />
      </PathCheckerWrapper>
      <FosoHeaderContainer />
      <div className="rounded-b-3xl bg-white relative z-0 md:z-10 ">
        {children}
      </div>

      {/* footer */}
      <div className="xl:sticky bottom-0 z-0 block static ">
        <FooterContainer />
      </div>

      <WidgetButton />
      <ButtonToTop />
      {/* <RegisterButton /> */}

      <RegisterBttonNew />
      <DynamicSheetWrapper />
    </div>
  );
};

export default ClientLayout;
