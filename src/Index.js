import Header from "./components/Header";
import Hero from "./components/Hero";
import { createElement } from "./utils/createElement";

export default function Index()
{
    const hero = Hero();

    return [ hero.element ];
}