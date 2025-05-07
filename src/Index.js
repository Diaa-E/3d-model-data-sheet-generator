import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

export default function Index()
{
    const hero = Hero();

    return [ hero.element ];
}

document.getElementById("root").append(
    Header().element,
    ...Index(),
    Footer().element,
)