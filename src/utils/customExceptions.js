export const InvalidFieldsetException = customExceptionFActory("InvalidFieldException");

function customExceptionFActory(name = "customException")
{
    return function customException(message = "")
    {
        Object.defineProperty(this, "name", {

            enumerable: false,
            writable: false,
            value: name
        });
    
        Object.defineProperty(this, "message", {
            enumerable: false,
            writable: true,
            value: message
        });
    
        if(Error.hasOwnProperty("captureStackTrace"))
        {
            Error.captureStackTrace(this, customException);
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
            Object.setPrototypeOf(customException.prototype, Error.prototype);
        }
        else
        {
            customException.prototype = Object.create(Error.prototype, {
                constructor: { value: customException }
            });
        }
    }
}