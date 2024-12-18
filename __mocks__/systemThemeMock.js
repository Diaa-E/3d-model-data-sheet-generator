export default function mockSystemTheme(dark)
{
    window.matchMedia = (mediaQuery) => {

        return { matches: (mediaQuery === "(prefers-color-scheme: dark)" && dark) };
    };
}