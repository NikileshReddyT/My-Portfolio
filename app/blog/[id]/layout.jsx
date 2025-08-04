export const metadata = {
    title: "Blog post | Nikilesh Reddy",
    description: "Read about my latest blog post and learn more about my work.",
    alternates: {
      canonical: "https://nikileshreddyt.tech/blog/[id]",
    },
    openGraph: {
      title: "Blog Post | Nikilesh Reddy",
      description: "Read about my latest blog post and learn more about my work.",
      url: "https://nikileshreddyt.tech/blog/[id]",
    },
    twitter: {
      title: "Blog Post | Nikilesh Reddy",
      description: "Read about my latest blog post and learn more about my work.",
    }
  };

  export default function BlogPostLayout({ children }) {
    return <>{children}</>;
  }
