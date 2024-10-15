import React from "react";
import Heading from "@/components/Heading";
import Link from "next/link";
import {FaChevronLeft} from "react-icons/fa";
import Image from "next/image";
import BookingForm from "@/components/BookingForm";
import getSingleRoom from "@/app/actions/getSingleRoom";

export default async function page({ params }) {
  const { id } = params;

  const room = await getSingleRoom(id);

  if (!room) {
    return <Heading>Room not found</Heading>;
  }

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;

  const imageSrc = room.image ? imageUrl : '/images/no-image.jpg';

  return (
    <>
      <Heading>{room.name}</Heading>
      <div className="bg-white shadow rounded-lg p-6">
        <Link
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FaChevronLeft className="inline mr-1" />
          <span className="">Back to Rooms</span>
        </Link>

        <div className="bg-bookit-grey p-4 flex flex-col sm:flex-row sm:space-x-6 border rounded-lg">
            <Image src={imageSrc} alt={room.name} width={400} height={100} className="w-full sm:w-1/3 h-64 object-cover rounded-lg" />

          <div className="mt-4 sm:mt-0 sm:flex-1">
            <p className="text-gray-600 mb-4">
              {room.description}
            </p>

            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-gray-800">Size:</span>{' '}{room.sqft} sq
                ft
              </li>
              <li>
                <span className="font-semibold text-gray-800">Availability:</span>{' '}{room.availability}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Price:</span>{' '}
                ${room.price_per_hour}/hour
              </li>
              <li>
                <span className="font-semibold text-gray-800">Address:</span>{' '}{room.address}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Amenities:</span>{' '}{room.amenities}
              </li>
            </ul>
          </div>
        </div>

        <BookingForm room={room} />
      </div>
    </>
  );
}
