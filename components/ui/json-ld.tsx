import "server-only";

/**
 * Renders one or more JSON-LD blobs as <script type="application/ld+json">.
 * Server component — do NOT import from a "use client" file. If a page is a
 * client component, wrap the JsonLd in a small server-only sibling and
 * mount that from the route's layout (or refactor the page).
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
