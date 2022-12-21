"use strict";

export default {
    addClasses,
    setElementAttributes,
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

function setElementAttributes(element, attributes = [], values = [])
{
    //each attribute is passed as a string followed by its value
    for (let i = 0; i < attributes.length ; i++)
    {
        element.setAttribute(attributes[i], values[i]);
    }
};

function removeClasses(element, cssClasses = [])
{
    if (cssClasses.length === 0) return
    
    cssClasses.forEach(cssClass => {

        element.classList.remove(cssClass);
    });
};