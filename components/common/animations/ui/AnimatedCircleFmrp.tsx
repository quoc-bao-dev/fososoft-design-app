import React from "react";
import { motion } from "framer-motion";

interface AnimatedCircleFmrpProps {
    active: boolean;
}

const AnimatedCircleFmrp: React.FC<AnimatedCircleFmrpProps> = ({ active }) => {
    return (
        <div className="relative flex items-center justify-center">
            {active && (
                <>
                    {/* Hiệu ứng lan tỏa chính (mượt hơn, từ nhỏ -> lớn -> nhỏ lại) */}
                    <motion.div
                        className="absolute size-4 rounded-full bg-blue-200 z-[1]"
                        initial={{ scale: 0.8 }}
                        animate={{
                            scale: [0.8, 3.5, 0.8],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Hiệu ứng lan tỏa lớn hơn khi đạt cực đại */}
                    <motion.div
                        className="absolute size-8 rounded-full bg-blue-200 z-0"
                        initial={{ scale: 1 }}
                        animate={{
                            scale: [1.6, 2.5],
                            opacity: [0.5, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2, // Delay bằng một nửa thời gian của hiệu ứng đầu tiên (3s)
                        }}
                    />


                </>
            )}

            {/* Vòng tròn chính */}
            <div
                className="relative size-4 shrink-0 rounded-full flex items-center justify-center font-bold z-10"
                style={{
                    background: active
                        ?
                        "linear-gradient(77.74deg, #0375F3 11.85%, #036EEA 20.65%, #0267E1 29.45%, #0261D7 38.25%, #025ACE 47.05%, #0254C5 55.84%, #024EBC 64.64%, #0148B3 73.44%, #0142A9 82.24%, #013DA0 91.04%)"
                        :
                        "#809FB8",
                }}
            />
        </div>
    );
};

export default AnimatedCircleFmrp;
