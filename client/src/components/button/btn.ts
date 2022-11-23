class Button extends HTMLElement{
    shadow=this.attachShadow({"mode":"open"})
    constructor(){
        super()
        this.render()
    }
    render(){
        let text = this.textContent
        let div = document.createElement("div")
        let style = document.createElement("style")

        style.innerHTML = `
            .btn{
                width:312px;
                height:55px;
                background-color:#9CBBE9;
                border: none;
                border-radius:.3rem;
                font-size:22px;
            }
        `

        div.innerHTML= `
            <button class="btn">${text}</button>
        `
        this.shadow.appendChild(style)
        this.shadow.appendChild(div)
    }
}

customElements.define("custom-btn",Button)