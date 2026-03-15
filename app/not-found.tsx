import Link from 'next/link';

export default function NotFound() {
  <div className='flex flex-col items-center justify-center min-h-[70vh] text-center px-4'>
    <h1 className='text-6xl font-bold text-blue-600 mb-4'>404</h1>

    <h2 className='text-2xl font-semibold mb-2'>Page Not Found</h2>

    <p className='text-gray-500 mb-6 max-w-md'>
      The page you are looking for doesn &nbsb;t exist or has been moved.
    </p>

    <Link
      href='/'
      className='px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition'
    >
      Go Back Home
    </Link>
  </div>;
}
