import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export const ProductBanner = ({ images = [], interval = 3000 }) => {
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length || 1; // Avoids errors when empty

    const handlers = useSwipeable({
        onSwipedLeft: () => setActiveStep((prev) => (prev + 1) % maxSteps),
        onSwipedRight: () => setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    useEffect(() => {
        if (images.length > 0) {
            const timer = setTimeout(() => {
                setActiveStep((prev) => (prev + 1) % maxSteps);
            }, interval);
            return () => clearTimeout(timer);
        }
    }, [activeStep, interval, maxSteps, images]);

    if (images.length === 0) {
        return <div className="w-full h-[500px] flex items-center justify-center">No images available</div>;
    }

    return (
        <div className="relative w-full h-[500px] overflow-hidden" {...handlers}>
            <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${activeStep * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0 h-full">
                        <img src={image} alt="Banner" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${activeStep === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};
