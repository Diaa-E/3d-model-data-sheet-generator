import Div from "./Div";
import domUtility from "../dom.utility";

export default function ErrorPanel(id)
{
    const divError = Div({
        classes: ["error"],
        id: id,
    });

    function showError(errorMsg)
    {
        domUtility.removeClasses(divError, ["info"]);
        divError.textContent = errorMsg;
    }

    function showInfo(info)
    {
        domUtility.addClasses(divError, ["info"]);
        divError.textContent = info;
    }

    function clearError()
    {
        domUtility.removeClasses(divError, ["info"]); //avoid class duplication
        divError.textContent = "";
    }

    return {element: divError, showError, clearError, showInfo};
}