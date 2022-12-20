"use strict";

export default {
    addClasses,
    createDomElement,
    setElementAttributes,
    setElementText,
    removeClasses    
};
import "./style.css";

function addClasses(element, cssClasses = [])
{
    if (cssClasses.length === 0) return

    cssClasses.forEach(cssClass => {

        element.classList.add(cssClass);
    });
};

function createDomElement(elementTag = "div", elementInnerText = null, elementId = "")
{   
    const newElement =  document.createElement(elementTag);
    if (elementInnerText !== null) newElement.innerText = elementInnerText;
    if (elementId !== "") newElement.setAttribute("id", elementId);

    return newElement;
};

function setElementAttributes(element, attributes = [], values = [])
{
    //each attribute is passed as a string followed by its value
    for (let i = 0; i < attributes.length ; i++)
    {
        element.setAttribute(attributes[i], values[i]);
    }
};

function setElementText(element, value)
{
    element.innerText = value;
};


function removeClasses(element, cssClasses = [])
{
    if (cssClasses.length === 0) return
    
    cssClasses.forEach(cssClass => {

        element.classList.remove(cssClass);
    });
};