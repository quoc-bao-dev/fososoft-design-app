import { removeFontWeight400 } from "@/utils/format/FormatFont";

type QuoteBoxProps = {
    content?: string
}

const QuoteBox: React.FC<QuoteBoxProps> = ({ content }) => {
    return (
        <div className="relative 3xl:px-16 xl:px-12 lg:p-6 p-0 py-8 rounded-lg text-center custom-box-content">
            {/* <p className="italic text-[#33404A] 3xl:text-xl text-lg font-medium">
                {content}
            </p> */}
            <p
                className="italic text-[#33404A] 3xl:text-xl text-lg font-medium"
                dangerouslySetInnerHTML={{ __html: `${removeFontWeight400(content ?? '')}` }}
            />
        </div>
    );
}

export default QuoteBox
