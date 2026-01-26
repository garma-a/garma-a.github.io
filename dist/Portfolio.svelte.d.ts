export default Portfolio;
type Portfolio = SvelteComponent<{
    aboutImage?: string;
    title?: string;
    aboutText?: string;
    name?: string;
    motto?: string;
    resumeUrl?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    instagramUrl?: string;
    whatsappUrl?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> & {
    $$bindings?: string;
};
declare const Portfolio: $$__sveltets_2_IsomorphicComponent<{
    aboutImage?: string;
    title?: string;
    aboutText?: string;
    name?: string;
    motto?: string;
    resumeUrl?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    instagramUrl?: string;
    whatsappUrl?: string;
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
