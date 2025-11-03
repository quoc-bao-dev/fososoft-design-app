import { useCallback, useEffect, useState } from 'react';

export const usePasteImage = (onPaste: (files: File[]) => void) => {
    const [isHoveredPaste, setIsHoveredPaste] = useState(false);

    const handlePaste = useCallback((event: ClipboardEvent) => {
        if (!isHoveredPaste) return; // Only process paste if the component is hovered

        const items = event.clipboardData?.items;
        if (!items) return;

        const imageFiles: File[] = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                if (file) {
                    imageFiles.push(file);
                }
            }
        }

        if (imageFiles.length > 0) {
            onPaste(imageFiles);
            event.preventDefault();
        }
    }, [isHoveredPaste, onPaste]);

    useEffect(() => {
        document.addEventListener('paste', handlePaste);
        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, [handlePaste]);

    return {
        setIsHoveredPaste,
        isHoveredPaste
    };
};

