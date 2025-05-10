"use strict";

// stolen from https://betterprogramming.pub/how-to-use-jsx-without-react-21d23346e5dc

export function createElement(tag, props, ...children)
{
    if (typeof tag === "function")
    {
        return tag(props, ...children);
    }

    const attributeMap = {
        class: "className",
        for: "htmlFor",
        ariaLabel: "aria-label",
        role: "role",
    };

    const element = document.createElement(tag);

    if (element instanceof HTMLUnknownElement)
    {
        throw new Error("Invalid HTML tag name: " + tag);
    }

    Object.entries(props ?? {}).forEach(([key, value]) => {

        if (key.startsWith("on") && key.toLowerCase() in window)
        {
            element.addEventListener(key.toLowerCase().substring(2), value);
        }
        else if (key.startsWith("--"))
        {
            element.style.setProperty(key, value);
        }
        else if (key in element)
        {
            element[key] = String(value);
        }
        else if (key in attributeMap)
        {
            element[attributeMap[key]] = String(value);
        }
        else
        {
            throw new Error("Invalid HTML element attribute: " + key);
        }
    });

    children.forEach(child => {

        appendChild(element, child);
    });

    return element;
}

export function createFragment(...children)
{
    return children;
}

function appendChild(parent, child)
{
    if (Array.isArray(child))
    {
        child.forEach(nestedChild => appendChild(parent, nestedChild))
    }
    else
    {
        if (!(child instanceof Element) && !(typeof child === "string"))
        {
            throw new Error("Invalid child: " + child);
        }
        
        parent.appendChild(
            child.nodeType ? child : document.createTextNode(String(child))
        );
    }
}