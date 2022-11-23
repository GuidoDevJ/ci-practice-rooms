"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../components/button/btn");
class FormBtn extends HTMLElement {
    shadow = this.attachShadow({ "mode": "open" });
    constructor() {
        super();
        this.render();
    }
    render() {
        let div = document.createElement("div");
        div.classList.add("container");
        let style = document.createElement("style");
        style.innerHTML = `
            .container{
                margin-top:10px;
                width:100%;
                display:flex;
                flex-direction:column;
            }
            
        `;
        div.innerHTML = `
            
        `;
        this.shadow.appendChild(style);
        this.shadow.appendChild(div);
    }
}
customElements.define("form-btn", FormBtn);
