import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function RoomCard({room}) {
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;

  const imageSrc = room.image ? imageUrl : '/images/no-image.jpg';

  return (
    <div className='bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row border justify-between items-start sm:items-center hover:shadow-lg duration-300'>
      <div className='flex flex-col sm:flex-row sm:space-x-4'>
        <Image
          src={imageSrc}
          width={400}
          height={100}
          alt={room.name}
          className='w-full sm:w-64 sm:h-64 mb-3 sm:mb-0 object-cover rounded-lg'
        />
        <div className='space-y-1'>
          <h4 className='text-3xl text-gray-900 font-semibold'>{room.name}</h4>
          <p className='text-lg text-gray-600'>
            <span className='font-semibold text-gray-800'> Address:</span>{' '}
            {room.address}
          </p>
          <p className='text-lg text-gray-600'>
            <span className='font-semibold text-gray-800'>Availability:</span>{' '}
            {room.availability}
          </p>
          <p className='text-lg text-gray-600'>
            <span className='font-semibold text-gray-800'>Capacity:</span>{' '}
            {room.capacity}
          </p>
          <p className='text-lg text-gray-600'>
            <span className='font-semibold text-gray-800'> Price:</span>{' '}$
            {room.price_per_hour}/hour
          </p>
        </div>
      </div>
      <div className='flex flex-col self-end sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0'>
        <Link
          href={`/rooms/${room.$id}`}
          className='border border-blue-500 text-blue-900 rounded-2xl px-4 py-2 mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700 hover:text-white'
        >
          View Room
        </Link>
      </div>
    </div>
  );
}
