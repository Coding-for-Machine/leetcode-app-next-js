// app/test/[slug]/page.tsx (Server Component)
import React from 'react';
import TestSlugClient from './test';

interface PageProps {
  params: { slug: string };
}

export default function TestSlugPage({ params }: PageProps) {
  const slug = React.use(params).slug;
  
  return <TestSlugClient slug={slug} />;
}