const directoryName: string = "css";
const fileNames: string[] = ["style1.css", "style2.css", "style3.css"];
const defaultFileName: string = fileNames[0];

function setCss(
  fileName: string = defaultFileName,
  _directoryName: string = directoryName
): void {
  const filePath: string = `${_directoryName}/${fileName}`;

  const existingLink: HTMLLinkElement | null = document.querySelector(
    `link[href*="${_directoryName}/"]`
  );

  // existingLink && existingLink.remove();
  existingLink?.remove();

  const newLink: HTMLLinkElement = document.createElement("link");
  newLink.rel = "stylesheet";
  newLink.type = "text/css";
  newLink.href = filePath;

  document.head.appendChild(newLink);
}

function createLinkItem(
  fileName: string,
  _directoryName: string = directoryName
): HTMLAnchorElement {
  const linkItem: HTMLAnchorElement = document.createElement("a");
  linkItem.textContent = fileName;
  linkItem.href = "#";
  linkItem.onclick = () => setCss(fileName, _directoryName);

  return linkItem;
}

function createLinkList(
  _fileNames: string[] = fileNames,
  _directoryName: string = directoryName
) {
  const linkList: HTMLUListElement = document.createElement("ul");
  linkList.className = "species_list";

  _fileNames.forEach((fileName) => {
    const listItem: HTMLLIElement = document.createElement("li");
    const linkItem: HTMLAnchorElement = createLinkItem(
      fileName,
      _directoryName
    );

    listItem.appendChild(linkItem);
    linkList.appendChild(listItem);
  });

  return linkList;
}

const linkList: HTMLUListElement = createLinkList();
const cssSwitcher = document.querySelector("#css-switcher");

if (cssSwitcher) {
  cssSwitcher.appendChild(linkList);
} else {
  console.log("Could not find css-switcher element in DOM");
}
