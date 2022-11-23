class Header extends HTMLElement{
    shadow = this.attachShadow({"mode":"open"})
    constructor(){
        super()
        this.render()
    }
   
    render(){
        let header = document.createElement("header")
        let style = document.createElement("style")

        style.innerHTML = `
            .header{
                width:${100}%;
                height : ${60}px;
                background-color: #FF8282;
            }
        `
        header.classList.add("header")
        this.shadow.appendChild(style)
        this.shadow.appendChild(header)
    }
}
customElements.define("custom-header",Header)