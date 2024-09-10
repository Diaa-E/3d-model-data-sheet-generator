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