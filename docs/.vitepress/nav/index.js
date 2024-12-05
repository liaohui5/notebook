import javascript from "./javascript";
import vue from "./vue";
import react from "./react";
import deploy from "./deploy";
import fragment from "./fragment";
import rust from "./rust";

// https://vitepress.dev/reference/default-theme-config
export default [
	{
		text: "AboutMe",
		link: "/aboutMe",
	},
	{
		// css //
		text: "CSS",
		link: "/css/",
	},
	{
		text: "Database",
		link: "/database/",
	},
	javascript,
	vue,
	react,
	rust,
	deploy,
	fragment,
];
