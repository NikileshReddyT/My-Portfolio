
export async function generateMetadata({params}) {
    const { id } = await params;
    const response = await fetch(`https://nikileshreddyt.tech/api/blog/${id}`).then(res => res.json());
    return {
        title: `${response.title} | Nikilesh's Portfolio`,
        description: response.excerpt,
        alternates: {
            canonical: `https://nikileshreddyt.tech/blog/${id}`,
        },
        openGraph: {
            title: response.title,
            description: response.excerpt,
            url: `https://nikileshreddyt.tech/blog/${id}`,
        },
        twitter: {
            title: response.title,
            description: response.excerpt,
        }
    };
}



  export default function BlogPostLayout({ children }) {
    return <>{children}</>;
  }
