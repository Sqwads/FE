'use client';

import { useRouter } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';

export default function CloseButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')}
      className="text-gray-500 hover:text-gray-700 text-lg transition-colors duration-200"
      aria-label="Close and return to home"
    >
      <AiOutlineClose className="size-6" />
    </button>
  );
}