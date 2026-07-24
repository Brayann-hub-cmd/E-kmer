import { Helmet } from "react-helmet-async";

export default function SEO({
    title,
    description,
    image = "https://e-kmer-pink.vercel.app/logo.png",
    url = "https://e-kmer-pink.vercel.app/",
}) {
    return (
        <Helmet>
            <title>{title}</title>

            <meta name="description" content={description} />

            <meta
                name="keywords"
                content="Ekmer, marketplace, ecommerce, Cameroun, vente, achat, livraison"
            />

            <link rel="canonical" href={url} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Ekmer",
                    "url": "https://e-kmer-pink.vercel.app",
                    "logo": "https://e-kmer-pink.vercel.app/logo.png",
                    "description": "Marketplace camerounaise permettant d'acheter, vendre et faire livrer des produits."
                })}
            </script>
        </Helmet>
    );
}