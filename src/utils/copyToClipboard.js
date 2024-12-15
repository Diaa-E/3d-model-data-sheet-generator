import { FeatureNotSupportedException } from "./customExceptions";

export default async function copyToClipboard(element)
{
    if (!(element instanceof HTMLElement))
    {
        throw new TypeError(`Invalid element "${element}"`);
    }

    if (global.ClipboardItem && navigator.clipboard.write)
    {
        // HTML might not work if the pasting target does not support the html mime
        const html = new Blob([element.innerHTML], {type: "text/html"});
        // plain text fallback
        const text = new Blob([element.textContent], {type: "text/plain"});
        const data = new ClipboardItem({ [html.type]: html, [text.type]: text });
        await navigator.clipboard.write([data]);
    }
    else if (document.execCommand)
    {
        function onCopy(e)
        {
            e.clipboardData.setData("text/html", element.innerHTML);
            e.clipboardData.setData("text/plain", element.textContent);
            e.preventDefault();
        }
        document.addEventListener("copy", onCopy);
        document.execCommand("copy");
        document.removeEventListener("copy", onCopy);
    }
    else
    {
        throw new FeatureNotSupportedException("This browser does not support copying to clipboard.");
    }
}