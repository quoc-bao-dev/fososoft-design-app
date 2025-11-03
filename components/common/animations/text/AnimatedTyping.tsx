'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedTypingProps {
    phrases: string[]
    className?: string
    typingSpeed?: number
    delayBetweenPhrases?: number
    style?: React.CSSProperties
}

export default function AnimatedTyping({
    phrases,
    className = '',
    typingSpeed = 50,
    delayBetweenPhrases = 2500,
    style = {},
}: AnimatedTypingProps) {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
    const [displayedText, setDisplayedText] = useState('')

    const timeoutRef = useRef<NodeJS.Timeout[]>([])

    const clearAllTimeouts = () => {
        timeoutRef.current.forEach(clearTimeout)
        timeoutRef.current = []
    }

    const typePhrase = (phrase: string) => {
        clearAllTimeouts()
        setDisplayedText('')
        phrase.split('').forEach((letter, index) => {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + letter)
            }, typingSpeed * index)
            timeoutRef.current.push(timeout)
        })
    }

    useEffect(() => {
        typePhrase(phrases[currentPhraseIndex])

        const phraseDuration =
            phrases[currentPhraseIndex].length * typingSpeed + delayBetweenPhrases

        const phraseInterval = setTimeout(() => {
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        }, phraseDuration)

        return () => {
            clearTimeout(phraseInterval)
            clearAllTimeouts()
        }
    }, [currentPhraseIndex, phrases, typingSpeed, delayBetweenPhrases])

    return (
        <AnimatePresence mode="wait">
            <motion.p
                key={currentPhraseIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={className}
                style={{
                    background:
                        'linear-gradient(78deg, #0375F3 11.85%, #036EEA 20.65%, #0267E1 29.45%, #0261D7 38.25%, #025ACE 47.05%, #0254C5 55.84%, #024EBC 64.64%, #0148B3 73.44%, #0142A9 82.24%, #013DA0 91.04%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    ...style,
                }}
            >
                {displayedText}
            </motion.p>
        </AnimatePresence>
    )
}
