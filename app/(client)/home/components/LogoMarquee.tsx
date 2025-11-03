import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { useResizeStore } from '@/stores/useResizeStore';

type LogoMarqueeProps = {
    logos: string[];
};


const LogoMarquee: React.FC<LogoMarqueeProps> = ({ logos }) => {
    const { isVisibleTablet } = useResizeStore()
    const firstRowItems = logos.slice(0, 7);
    const secondRowItems = logos.slice(7, 14);
    const thirdRowItems = logos.slice(14, logos?.length);

    return (
        <div className="space-y-4 overflow-hidden">
            <Marquee speed={30} pauseOnHover gradient={true} direction='right' gradientWidth={isVisibleTablet ? 100 : 200} className='flex w-full overflow-hidden'>
                {firstRowItems.map((logo, index) => (
                    <div key={`logo-1-${index + 1}`} className="lg:w-auto w-[200px] 3xl:h-[120px] lg:h-[110px] h-auto shrink-0 lg:mx-6 lg:px-0 px-6 bg-white flex items-center overflow-hidden">
                        <Image
                            src={logo}
                            alt={`logo-1-${index}`}
                            width={150}
                            height={120}
                            className="size-full object-contain shrink-0"
                        />
                    </div>
                ))}
            </Marquee>

            <Marquee speed={30} pauseOnHover gradient={true} direction='left' gradientWidth={isVisibleTablet ? 100 : 200} className='flex w-full overflow-hidden'>
                {secondRowItems.map((logo, index) => (
                    <div key={`logo-2-${index + 1}`} className="lg:w-auto w-[200px] 3xl:h-[120px] lg:h-[110px] h-auto shrink-0 lg:mx-6 lg:px-0 px-6 bg-white flex items-center overflow-hidden">
                        <Image
                            src={logo}
                            alt={`logo-2-${index}`}
                            width={150}
                            height={120}
                            className="size-full object-contain"
                        />
                    </div>
                ))}
            </Marquee>

            <Marquee speed={30} pauseOnHover gradient={true} direction='right' gradientWidth={isVisibleTablet ? 100 : 200} className='flex w-full overflow-hidden'>
                {thirdRowItems.map((logo, index) => (
                    <div key={`logo-3-${index + 1}`} className="lg:w-auto w-[200px] 3xl:h-[120px] lg:h-[110px] h-auto shrink-0 lg:mx-6 lg:px-0 px-6 bg-white flex items-center overflow-hidden">
                        <Image
                            src={logo}
                            alt={`logo-3-${index}`}
                            width={150}
                            height={120}
                            className="size-full object-contain"
                        />
                    </div>
                ))}
            </Marquee>

            {/* <Marquee speed={30} pauseOnHover direction='right' autoFill gradient={true} gradientWidth={200}>
                {secondRowItems.map((logo, index) => (
                    <div key={`logo-2-${index}`} className="w-fit mx-4 flex items-center">
                        <Image
                            src={logo}
                            alt={`logo-2-${index}`}
                            width={150}
                            height={120}
                            className="3xl:w-[150px] w-[130px] h-auto aspect-1.36/1 object-contain"
                        />
                    </div>
                ))}
            </Marquee>

            <Marquee speed={30} pauseOnHover autoFill gradient={true} gradientWidth={200}>
                {thirdRowItems.map((logo, index) => (
                    <div key={`logo-3-${index}`} className="w-fit mx-4 flex items-center">
                        <Image
                            src={logo}
                            alt={`logo-3-${index}`}
                            width={150}
                            height={120}
                            className="3xl:w-[150px] w-[130px] h-auto aspect-1.36/1 object-contain"
                        />
                    </div>
                ))}
            </Marquee> */}
        </div>
    );
};

export default LogoMarquee;
