import Header from "./components/Header";
import { createElement } from "./utils/createElement";

export default function About()
{
    const header = Header();

    return [ header.element ];
}