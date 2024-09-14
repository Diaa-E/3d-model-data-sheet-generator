import Fieldset from "../Fieldset";
import TextArea from "../TextArea";
import TextInput from "../TextInput"

export default function ModelInfo(props = {
    
})
{
    const titleField = TextInput({
        autocomplete: "off",
        name: "modelTitle",
        onChange: () => {},
        placeholder: "Model Title",
        required: true,
        text: "Title",
    });

    const descriptionField = TextArea({
        placeholder: "Model Description",
        text: "Description",
        onChange: () => {}
    })

    const fieldSet = Fieldset({
        legend: "Title and Description",
        children: [
            titleField,
            descriptionField
        ]
    });

    return fieldSet;
}