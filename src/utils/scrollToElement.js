export default function scrollToElement(element)
{
    if (!(element instanceof HTMLElement))
    {
        throw new TypeError(`Invalid element: ${element}`);
    }

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    element.focus();
}