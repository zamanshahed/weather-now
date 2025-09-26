/**
 * Dynamically sets the favicon and optionally the page title.
 * @param faviconPath - Path to the favicon PNG
 * @param title - Optional browser tab title
 */
export function setFaviconTitles(faviconPath: string, title?: string) {
  console.log("Setting favicon to:", faviconPath);
  console.log("Setting title to:", title);
  // Update or create the favicon link
  let link: HTMLLinkElement | null =
    document.querySelector("link[rel~='icon']");

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.href = faviconPath;

  // Update the page title if provided
  if (title) {
    document.title = title;
  }
}
