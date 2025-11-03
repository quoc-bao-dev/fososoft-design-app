import { SocialMediaItem } from "@/types/social-media/ISocialMedia";
import Image from "next/image";
import Link from 'next/link';

interface SocialMediaListProps {
    socialMedia: SocialMediaItem[];
    className?: string
    style?: any
}

const SocialMediaList: React.FC<SocialMediaListProps> = ({ socialMedia, className, style }) => (
    <div className="flex xl:space-x-4 space-x-2">
        {
            socialMedia.map((social, index) => (
                <Link
                    key={index}
                    href={social.link}
                    target="_blank"
                    className={`${className} p-3 rounded-2xl text-xl text-[#B4B8C5] hover:scale-105 custom-transition flex-shrink-0`}
                    style={style}
                >
                    <Image
                        width={100}
                        height={100}
                        alt="social-media"
                        className='xxl:size-6 size-5 object-contain'
                        src={social?.icon}
                    />
                </Link>
            ))
        }
    </div>
);

export default SocialMediaList;
