export function setFaviconTitles(faviconPath: string, title?: string) {
  let link: HTMLLinkElement | null =
    document.querySelector("link[rel~='icon']");

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.href = faviconPath;

  if (title) {
    document.title = title;
  }
}
