"use strict";

// stolen from https://betterprogramming.pub/how-to-use-jsx-without-react-21d23346e5dc

export default function createElement(tag, props, ...children)
{
    if (typeof tag === "function")
    {
        return tag(props, ...children);
    }

    const element = document.createElement(tag);

    Object.entries(props || {}).forEach(([key, value]) => {

        if (key.startsWith("on") && key.toLowerCase() in window)
        {
            element.addEventListener(key.toLowerCase().substring(2), value);
        }
        else
        {
            element.setAttribute(key, value.toString());
        }
    });

    children.forEach(child => {

        appendChild(element, child);
    });

    return element;
}

function appendChild(parent, child)
{
    if (Array.isArray(child))
    {
        child.forEach(nestedChild => appendChild(parent, nestedChild))
    }
    else
    {
        parent.appendChild(
            child.nodeType ? child : document.createTextNode(child.toString())
        );
    }
}