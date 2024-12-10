export function InvalidFieldsetException(message = "")
{
    //This solution is better than the class extension as it's supported outside E6
    //http://stackoverflow.com/a/35881508/112731

    Object.defineProperty(this, "name", {

        enumerable: false,
        writable: false,
        value: "FieldInvalidException"
    });

    Object.defineProperty(this, "message", {
        enumerable: false,
        writable: true,
        value: message
    });

    if(Error.hasOwnProperty("captureStackTrace"))
    {
        Error.captureStackTrace(this, InvalidFieldsetException);
    }
    else
    {
        Object.defineProperty(this, "stack", {

            enumerable: false,
            writable: false,
            value: (new Error()).stack,
        });
    }

    if (typeof Object.setPrototypeOf === "function")
    {
        Object.setPrototypeOf(InvalidFieldsetException.prototype, Error.prototype);
    }
    else
    {
        InvalidFieldsetException.prototype = Object.create(Error.prototype, {
            constructor: { value: InvalidFieldsetException }
        });
    }
}