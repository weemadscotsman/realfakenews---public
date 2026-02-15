import { useState, useEffect } from 'react';

/**
 * Hook to detect if the "Reality Layer" is active.
 * Activated by holding down the 'Alt' key.
 */
export const useRealityLayer = () => {
    const [isRealityRevealed, setIsRealityRevealed] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Alt') {
                setIsRealityRevealed(true);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Alt') {
                setIsRealityRevealed(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return isRealityRevealed;
};
