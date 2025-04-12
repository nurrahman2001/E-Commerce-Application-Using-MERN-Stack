
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const data = {
    labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ],
    datasets: [
        {
            label: "Monthly Unique Visitors",
            data: [200, 300, 400, 500, 600, 550, 480, 520, 490, 470, 450, 400],
            borderColor: "#38BDF8",
            backgroundColor: "transparent",
        },
    ],
};
export const Statistics = () => {
    
    return (
        <div>
            <div className="grid grid-cols-4 gap-6">
                <div className="p-5 bg-white shadow-lg rounded-lg">
                    <h3 className="text-lg font-semibold">Total Revenue</h3>
                    <p className="text-xl font-bold">$811.55</p>
                    <span className="text-green-500">Revenue up (Last 30 Days)</span>
                </div>
                <div className="p-5 bg-white shadow-lg rounded-lg">
                    <h3 className="text-lg font-semibold">Total Orders</h3>
                    <p className="text-xl font-bold">66,556</p>
                    <span className="text-red-500">Orders down (Last 30 Days)</span>
                </div>
                <div className="p-5 bg-white shadow-lg rounded-lg">
                    <h3 className="text-lg font-semibold">New Customers</h3>
                    <p className="text-xl font-bold">4,565</p>
                    <span className="text-green-500">Customers up (Last 30 Days)</span>
                </div>
                <div className="p-5 bg-white shadow-lg rounded-lg">
                    <h3 className="text-lg font-semibold">Total Delivery</h3>
                    <p className="text-xl font-bold">72,000</p>
                    <span className="text-green-500">Delivery up (Last 30 Days)</span>
                </div>
            </div>

            <div className="mt-6 bg-white p-5 shadow-lg rounded-lg">
                <h3 className="text-lg font-semibold mb-3">User Hit</h3>
                <Line data={data} />
            </div></div>
    )
}

