import { FaBox, FaPercent, FaRecycle, FaTruck } from "react-icons/fa";


export default function Features() {
    const features = [
        { icon: <FaTruck className="text-6xl text-purple-500" />, title: "Curb-side pickup" },
        { icon: <FaBox className="text-5xl text-purple-500" />, title: "Free shipping on orders over $50" },
        { icon: <FaPercent className="text-5xl text-purple-500" />, title: "Low prices guaranteed" },
        { icon: <FaRecycle className="text-5xl text-purple-500" />, title: "Available to you 24/7" },
    ];

    return (
        <div className="bg-white my-10 py-16 px-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center ">
                        <div className="px-3 " >{feature.icon}</div>
                        <div>
                            <p className="text-lg font-semibold">{feature.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
