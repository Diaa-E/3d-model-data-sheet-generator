import Div from "./Div";
import ErrorPanel from "./ErrorPanel";
import InputNumber from "./InputNumber";
import Label from "./Label";


export default function PolyCount() {
    const lblTitle = Label({
        text: "Poly Count",
        classes: ["label"]
    });

    const lblTris = Label({
        text: "Number of Triangles",
        classes: ["label-input"],
        for: "tris",
    });

    const txtTris = InputNumber({
        name: "tris",
        id: "tris",
        classes: ["text-input"],
        min: "1",
        placeholder: "How many triangles is your model?",
        required: true,
        errorMsg: "Any model must consist of at least 1 polygon",
    });

    txtTris.element.addEventListener("input", () => {

        if (!txtTris.isValid()) {
            showError(txtTris.getError());
        }

        else {
            clearError();
        }
    });

    const divTris = Div({
        classes: ["input-container"],
        children: [lblTris, txtTris.element]
    });

    const lblVerts = Label({
        text: "Number of vertices",
        classes: ["label-input"],
        for: "verts",
    });

    const txtVerts = InputNumber({
        name: "verts",
        id: "verts",
        classes: ["text-input"],
        min: "1",
        placeholder: "How many vertices is your model?",
        required: true,
        errorMsg: "Any model must consist of at least 1 vertex",
    });

    txtVerts.element.addEventListener("input", () => {

        if (!txtVerts.isValid()) {
            showError(txtVerts.getError());
        }

        else {
            clearError();
        }
    });

    const divVerts = Div({
        classes: ["input-container"],
        children: [lblVerts, txtVerts.element]
    });

    const divPolyCount = Div({
        children: [divTris, divVerts],
        classes: ["option", "add", "no-button"],
    });

    const divError = ErrorPanel("polycountError");

    const divWrapper = Div({
        id: "polyCount",
        classes: ["card"],
        children: [
            lblTitle,
            divError.element,
            divPolyCount,
        ]
    });

    function getData() {
        return {
            tris: txtTris.getContent(),
            verts: txtVerts.getContent(),
        };
    }

    function showError(errorMsg) {
        divError.showError(errorMsg);
    }

    function clearError() {
        divError.clearError();
    }

    return { component: divWrapper, getData, showError, clearError };
}
