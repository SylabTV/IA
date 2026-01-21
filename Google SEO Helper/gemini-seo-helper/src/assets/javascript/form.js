import { GoogleGenerativeAI as GoogleGenAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai/+esm";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const ai = new GoogleGenAI("AIzaSyBV09rvMkympp4VoKj-bZ9lecqZ3lq1jBU");

export class ContentForm {
    #searchInput;
    #contentInput;
    #form;

    constructor() {
        this.#form = document.querySelector("#content-form");
        this.#searchInput = document.querySelector("#seo-search");
        this.#contentInput = document.querySelector("#content");

        this.#form.addEventListener("submit", (event) => this.#submit(event, this));
    }

    async #request(terms){
        const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent({
            contents: [
                { parts: [{ text: terms }] }
            ]
        });

        const response = await result.response;

        // hide loader
        let modal = document.querySelector("div.modal");
        modal.style.display = "none";

        // show response
        let section = document.querySelector("#gemini-answer");
        section.scrollIntoView();

        const text = response.text();
        section.innerHTML = marked.parse(text);
    }

    #submit(event, that)
    {
        event.preventDefault();

        // show loader
        let modal = document.querySelector("div.modal");
        modal.style.display = "grid";

        let search = that.#searchInput.value;
        let content = that.#contentInput.value;

        let terms = `Bonjour, pourrais-tu me calculer un score SEO pour un contenu que je vais
        t'envoyer en format Markdown. Les termes de recherches pour lesquels calculer sont les suivants : ${search}.
        Le contenu est le suivant : ${content}. J'aurais besoin d'une réponse synthétique au format Markdown avec un score sur 20. Merci !`;

        that.#request(terms);
    }
}
