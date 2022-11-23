"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../components/header/header");
require("../../components/form-button/form-btn");
require("../../components/button/btn");
const state_1 = require("../../state");
class Chat extends HTMLElement {
    shadow = this.attachShadow({ "mode": "open" });
    mensajes = [];
    roomId;
    constructor() {
        super();
        state_1.state.subscribe(() => {
            let current = state_1.state.getState();
            this.mensajes = current.messages;
            this.roomId = current.roomId;
            console.log(this.mensajes);
            this.render();
        });
        this.render();
    }
    render() {
        this.roomId = state_1.state.getState().roomId;
        let style = document.createElement("style");
        style.innerHTML = `
            .chatContainer{
                width:${90}%;
                margin:0 auto;
                height: ${100}vh;
                display:flex;
                flex-direction:column;
                align-items:center;
                overflow:hidden;
            }
            .top{
                width:100%;
                height:auto;
                display:flex;
                flex-direction:column;
            }
            .top h1{
                font-size:52px;
                margin-bottom:-10px;
            }
            .top h3, .top span{
                font-size:24px;
            }
            .mensajes{
                width:${100}%;
                height:${60}vh;
                overflow-y:scroll;
            }
            .mensajes p{
                position:relative;
                font-size: 2rem;
                margin-right:10px;
            }
            .mensajes p span{
                position:absolute;
                top: -26%;
                font-size: 10px;
                opacity: 0.5;
            }
            .Guido{
                text-align:right;
            }
            .input{
                width:305px;
                height:55px;
                border-radius:.5rem;
                font-size:18px;
                margin-bottom:10px;
            }
            @media (min-width:960px){
                .chatContainer{
                    width:${50}%;
                }
                .mensajes{
                    height:40vh;
                }
            }
        `;
        this.shadow.innerHTML = `
            <custom-header></custom-header>

            <div class="chatContainer">
            <div class="top">
            <h1>Chat</h1>
            <h3>room Id: <span class="room">${this.roomId}</span></h3>
            </div>

            <div class="mensajes">
                ${this.mensajes.map(el => {
            return `<p class=${el.from}><span class="name">${el.from}</span>${el.message}</p>`;
        }).join("")}
            </div>

            <form class ="form">
                <input type="text" class="input">
                <custom-btn class="btn">Enviar</custom-btn>
            </form>

            </div>
        `;
        let btn = this.shadow.querySelector(".btn");
        let input = this.shadow.querySelector("input");
        btn.addEventListener("click", e => {
            let message = input.value;
            state_1.state.pushMessages(message);
            console.log(message);
        });
        this.shadow.appendChild(style);
    }
}
customElements.define("chat-page", Chat);
