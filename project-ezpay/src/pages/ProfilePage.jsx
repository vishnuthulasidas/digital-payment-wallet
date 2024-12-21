import React from 'react';
import { userService } from '../api';
   
import qrCodeIcon from '../assets/qr-code-symbol.svg'; // Make sure to adjust the path to your QR code icon

const ProfilePage = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['userProfile'],
        queryFn: userService.getCurrentUserProfile,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading profile</div>;

    return (
        <div className="flex flex-col z-10 items-center p-6 border border-black bg-white shadow-lg rounded-lg max-w-md mx-auto mt-10 relative">
            <div className="relative">
                <img
                    src={data.profilePic}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mb-4"
                />
                <img
                    src={qrCodeIcon}
                    alt="QR Code"
                    className="w-7 absolute bottom-3 right-2 p-1 rounded-full bg-black cursor-pointer"
                />
            </div>
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
                <p className="text-gray-600 mb-1">Email: {data.email}</p>
                <p className="text-gray-600 mb-1">Phone: {data.phone}</p>
                <p className="text-gray-600">EasePay ID: {data.username}</p>
            </div>
        </div>
    );
};

export default ProfilePage;