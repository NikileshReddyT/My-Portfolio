import SimpleNavbar from "../../components/SimpleNavbar";

export const metadata = {
  title: "Blog | Nikilesh Reddy",
  description: "Read articles and tutorials by Nikilesh Reddy on web development, AI, machine learning, and other technology topics.",
  alternates: {
    canonical: "https://nikileshreddyt.tech/blog",
  },
   openGraph: {
    title: "Blog | Nikilesh Reddy",
    description: "Read articles and tutorials by Nikilesh Reddy on web development, AI, machine learning, and other technology topics.",
    url: "https://nikileshreddyt.tech/blog",
  },
  twitter: {
    title: "Blog | Nikilesh Reddy",
    description: "Read articles and tutorials by Nikilesh Reddy on web development, AI, machine learning, and other technology topics.",
  }
};

export default function BlogLayout({ children }) {
  return <>
  <SimpleNavbar/>
  <div className="min-h-screen bg-gradient-to-br from-[var(--background)] to-[var(--card-bg)] text-white py-16 px-4 sm:px-6 lg:px-8">
  {children}
  </div>
  </>;
}