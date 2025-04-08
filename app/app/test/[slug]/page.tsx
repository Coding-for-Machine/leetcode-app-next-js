// app/test/[slug]/page.tsx (Server Component)
"use client";

import TestSlugClient from './test';


export default async function Page({ params }: {params: Promise<{slug: string}>}) {
  const { slug } = await params
  return <TestSlugClient slug={slug} />;
}