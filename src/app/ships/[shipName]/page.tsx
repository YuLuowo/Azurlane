import { FC } from "react";

interface ShipPageProps {
    params: { shipName: string };
}

const ShipPage: FC<ShipPageProps> = ({ params }) => {
    const decodedShipName = decodeURIComponent(params.shipName);
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold text-blue-600">{decodedShipName}</h1>
        </div>
    );
};

export default ShipPage;