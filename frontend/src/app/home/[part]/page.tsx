'use client';
import React from 'react'
import { useSearchParams, usePathname, useParams } from 'next/navigation';

const page = () => {
  const searchParams = useSearchParams();
  console.log(searchParams);
  const searchparams = searchParams.get('params1')
  const pathname = usePathname();
  console.log(pathname);
  const lastSegment = pathname.split('/').filter(Boolean).pop();
  console.log(lastSegment);
  const params = useParams();
  console.log(params);

  return (
    <div>
      <h1>{pathname}</h1>
    </div>
  )
}

export default page