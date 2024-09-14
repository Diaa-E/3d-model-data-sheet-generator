import Fieldset from "../Fieldset";
import TextArea from "../TextArea";
import TextInput from "../TextInput";

export default function ModelInfo()
{
    const data = {

        title: "",
        description: ""
    };

    const titleField = TextInput({
        autocomplete: "off",
        name: "modelTitle",
        onInput: (e) => {

            data.title = e.target.value;
        },
        placeholder: "Model Title",
        required: true,
        text: "Title",
    });

    const descriptionField = TextArea({
        placeholder: "Model Description",
        text: "Description",
        onInput: (e) => {

            data.description = e.target.value;
        }
    });

    const fieldSet = Fieldset({
        legend: "Title and Description",
        children: [
            titleField,
            descriptionField
        ]
    });

    function getData()
    {
        return data;
    }

    return {element: fieldSet, getData: getData};
}