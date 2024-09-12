global.render = (elements) => {

    if (Array.isArray(elements))
    {
        document.body.append(...elements);
    }
    else
    {
        document.body.append(elements);
    }
}

global.cleanup = () => {
    
    document.body.innerHTML = ""
}

global.changeElementValue = (element, newValue) => {
    
    element.value = newValue;
    element.dispatchEvent(new Event("change"));
}