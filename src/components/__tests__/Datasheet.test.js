import Datasheet from "../Datasheet";

describe("Datasheet Component", () => {

    beforeEach(() => {

        jest.resetAllMocks();
        cleanup();
    });

    const types = {
        orderedList: "orderedList",
        unorderedList: "unorderedList",
        text: "text"
    };

    function createSets(length, type)
    {
        const sets = [];

        for (let i = 0; i < length; i++)
        {
            sets.push(
                {
                    title: "title1",
                    type: types[type],
                    data: [`data${i}_1`, `data${i}_2`, `data${i}_3`]
                }
            );
        }

        return sets;
    }

    it("Throws when passed 1n empty title", () => {

        const sets = createSets(4, types.orderedList);

        expect(() => {

            Datasheet({
                title: "",
                sets: sets
            })
        }).toThrow(/invalid\stitle/i);
    });

    it("Throws when passed a non-string title", () => {

        const sets = createSets(4, types.orderedList);

        expect(() => {

            Datasheet({
                title: 12,
                sets: sets
            })
        }).toThrow(/invalid\stitle/i);
    });

    it("Throws when passed a non-array sets props", () => {

        expect(() => {

            Datasheet({
                title: "mainTitle",
                sets: 23
            })
        }).toThrow(/invalid\ssets/i);
    });

    it("Throws when passed an empty array sets props", () => {

        expect(() => {

            Datasheet({
                title: "mainTitle",
                sets: []
            })
        }).toThrow(/invalid\ssets/i);
    });

    it("Throws when a list item has no title", () => {

        const sets = createSets(4, types.orderedList);
        sets[3].title = "";

        expect(() => {

            Datasheet({
                title: "mainTitle",
                sets: sets
            })
        }).toThrow(/invalid\sset\stitle/i);
    });

    it("Throws when a list item has a non-string title", () => {

        const sets = createSets(4, types.orderedList);
        sets[2].title = 23;

        expect(() => {

            Datasheet({
                title: "mainTitle",
                sets: sets
            })
        }).toThrow(/invalid\sset\stitle/i);
    });

    it("Throws when passed an invalid type", () => {

        const sets = createSets(4, types.orderedList);
        sets[2].type = "someType";

        expect(() => {

            Datasheet({
                title: "mainTitle",
                sets: sets
            })
        }).toThrow(/invalid\sfieldset\stype/i);
    });

    it("Renders datasheet title from props", () => {

        const sets = createSets(4, types.orderedList);

        render(
            Datasheet({
                title: "mainTitle",
                sets: sets
            }).element
        );

        const title = document.querySelector("h1");

        expect(title.textContent).toBe("mainTitle");
    });

    it("Renders a set of the type text correctly", () => {

        const sets = createSets(2, types.text);
    
        expect.assertions(sets[0].data.length + sets[1].data.length);

        render(
            Datasheet({
                title: "mainTitle",
                sets: sets
            }).element
        );

        const textList = document.querySelectorAll("p");

        sets[0].data.forEach(item => {

            expect(textList[0].textContent).toContain(item);
        });

        sets[1].data.forEach(item => {

            expect(textList[1].textContent).toContain(item);
        });
    });

    it("Renders a set of the type orderedList correctly", () => {

        const sets = createSets(1, types.orderedList);

        render(
            Datasheet({
                title: "mainTitle",
                sets: sets
            }).element
        );

        const orderedList = document.querySelector("ol");
        expect(orderedList).not.toBeNull();

        const listItems = orderedList.querySelectorAll("li");
        expect(listItems).toHaveLength(sets[0].data.length);

        for (let i = 0; i < sets[0].data.length; i++)
        {
            expect(listItems[i].textContent).toContain(sets[0].data[i]);
        }
    });

    it("Renders a set of the type unorderedList correctly", () => {

        const sets = createSets(1, types.unorderedList);

        render(
            Datasheet({
                title: "mainTitle",
                sets: sets
            }).element
        );

        const unorderedList = document.querySelector("ul");
        expect(unorderedList).not.toBeNull();

        const listItems = unorderedList.querySelectorAll("li");
        expect(listItems).toHaveLength(sets[0].data.length);

        for (let i = 0; i < sets[0].data.length; i++)
        {
            expect(listItems[i].textContent).toContain(sets[0].data[i]);
        }
    });
});