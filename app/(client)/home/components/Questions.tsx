"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IMAGES } from "@/constants/Images";

type QuestionItem = {
  value: string;
  question: string;
  answer: string;
};

const QUESTIONS: QuestionItem[] = [
  {
    value: "item-1",
    question: "FOSO sử dụng ngôn ngữ gì để thiết kế app?",
    answer:
      "FOSO phát triển ứng dụng bằng React Native - giải pháp đa nền tảng cho iOS & Android. Cách tiếp cận này giúp giao diện nhất quán, ra mắt nhanh và dễ bảo trì.",
  },
  {
    value: "item-2",
    question: "Chi phí thiết kế app là bao nhiêu?",
    answer:
      "Chi phí thiết kế một ứng dụng mobile app “hợp lý” phụ thuộc vào Quy mô – Tính năng – Mục tiêu kinh doanh chứ không có một con số cố định cho mọi dự án. Với những app yêu cầu cơ bản về giao diện, thiết kế, nội dung chỉ có giá từ 80 triệu đồng/ app.",
  },
  {
    value: "item-3",
    question: "Các dịch vụ bảo hành, bảo trì như thế nào?",
    answer:
      "Có nhé. FOSO cung cấp các gói bảo trì, bảo hành, nâng cấp định kỳ và hỗ trợ kỹ thuật lâu dài sau triển khai.",
  },
  {
    value: "item-4",
    question: "Thời gian thiết kế app bao lâu?",
    answer:
      "Với app cơ bản, thời gian trung bình từ 4–6 tuần. Các ứng dụng có nhiều tính năng đặc thù hoặc yêu cầu tích hợp hệ thống phức tạp sẽ mất thời gian nhiều hơn.",
  },
  {
    value: "item-5",
    question: "Doanh nghiệp nào nên làm app và vì sao nên làm app?",
    answer:
      "Bất kì doanh nghiệp, tổ chức đang có nhu cầu mở rộng kinh doanh bằng các giải pháp công nghệ, tự động hóa quy trình, tạo trải nghiệm người dùng tốt hơn và đẩy mạnh thương hiệu đều nên đầu tư vào thiết kế app.",
  },
];

const Questions = () => {
  return (
    <section className="xl:custom-padding-section">
      <div className="custom-container px-2 xl:px-0 flex flex-col md:flex-row items-center gap-8 xl:gap-10">
        {/* Left: FAQ Content */}
        <div className="w-full lg:w-[59%]">
          <div className="space-y-2 mb-4 lg:mb-16 text-center">
            <h2 className="text-title-section-small text-[#1A2025] font-extrabold">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-[#6B7280] 3xl:text-base text-sm">
              Bạn cần hiểu thêm về dịch vụ thiết kế app của FOSO? Tham khảo các
              lời giải đáp dưới đây nhé!
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {QUESTIONS.map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className=" data-[state=open]:mt-4  data-[state=open]:rounded-[16px] data-[state=open]:border-none px-3 transition-all duration-200 data-[state=open]:bg-[#FFF6F4]"
              >
                <AccordionTrigger
                  className="
                    text-left text-base xl:text-lg font-semibold text-[#1A2025] 
                    data-[state=open]:text-[#F3654A] 
                    transition-colors duration-200 py-4 group
                  "
                >
                  <div className="flex items-center justify-between w-full">
                    <p className="lg:text-lg">{item.question}</p>
                    <div className="size-[28px] text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#F3654A]">
                      <ArrowIcon />
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="text-[#33404A] text-sm xl:text-base pb-3">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Right: Image */}
        <div className="flex items-end h-fit justify-center lg:flex-1 min-w-0">
          <Image
            src={IMAGES.thietKeApp}
            alt="Thiết kế app mobile"
            width={1000}
            height={1000}
            className="w-[80%] mx-auto mg:w-full object-contain h-fit object-bottom origin-bottom"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Questions;

const ArrowIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.6201 7.76527C20.6201 7.91943 20.5675 8.06257 20.4622 8.1947L12.0306 16.9815C11.9254 17.1136 11.7885 17.1797 11.6201 17.1797C11.4727 17.1797 11.3359 17.1136 11.2096 16.9815L2.80959 8.1947C2.68328 8.06257 2.62012 7.91943 2.62012 7.76527C2.62012 7.5891 2.68328 7.43494 2.80959 7.30281L3.6938 6.37789C3.82012 6.24575 3.95696 6.17969 4.10433 6.17969C4.27275 6.17969 4.42012 6.24575 4.54643 6.37789L11.6201 13.7773L18.7254 6.37789C18.8306 6.24575 18.9675 6.17969 19.1359 6.17969C19.2833 6.17969 19.4201 6.24575 19.5464 6.37789L20.4622 7.30281C20.5675 7.43494 20.6201 7.5891 20.6201 7.76527Z"
        fill="currentColor"
      />
    </svg>
  );
};
