export default function getCurrentPage(fullPath)
{
    return fullPath.split("/").at(-1).replace(".html", "");
}