
interface PageProps {
    params: { slug: string };
  }

export default function Page({params}: PageProps) {
    return (
        <div>
            <h1>Slug Problems</h1>
        </div>
    )
}