export default SkillsSection;
type SkillsSection = SvelteComponent<{
    codeforcesUrl?: string;
    leetcodeUrl?: string;
    neetcodeUrl?: string;
    skillCategories?: ({
        title: string;
        icon: string;
        highlight: boolean;
        skills: {
            name: string;
            icon: string;
        }[];
    } | {
        title: string;
        icon: string;
        skills: {
            name: string;
            icon: string;
        }[];
        highlight?: undefined;
    })[];
}, {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string;
};
declare const SkillsSection: $$__sveltets_2_IsomorphicComponent<{
    codeforcesUrl?: string;
    leetcodeUrl?: string;
    neetcodeUrl?: string;
    skillCategories?: ({
        title: string;
        icon: string;
        highlight: boolean;
        skills: {
            name: string;
            icon: string;
        }[];
    } | {
        title: string;
        icon: string;
        skills: {
            name: string;
            icon: string;
        }[];
        highlight?: undefined;
    })[];
}, {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import("svelte").ComponentConstructorOptions<Props>): import("svelte").SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
