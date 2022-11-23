import "../../components/header/header"
import "../../components/button/btn"
import { state } from "../../state"
import { Router } from '@vaadin/router';
class Home extends HTMLElement{
    shadow = this.attachShadow({"mode":"open"})
    constructor(){
        super()
        this.render()
    }
    render(){
        let div = document.createElement("div")
        let style = document.createElement("style")
        style.innerHTML = `
            .container{
                width:80%;
                height:100vh;
                margin:0 auto;
                display:flex;
                flex-direction:column;
                align-items:center;
            }
            .container h1{
                font-size:52px;
                font-wight:700;
            }
            
            .inputs{
                width:100%;
                height:50%;
                display:flex;
                flex-direction:column;
                justify-content:space-around;
            }
            .inputs div{
                display:flex;
                flex-direction:column;
                align-items: flex-start;
                overflow:hidden;
            }
            .inputs div input{
                width:312px;
                height:55px;
                border-radius:4px;
            }
            .inputs div label{
                font-size:24px;
                font-weight:500;
            }
            .inputs div select{
                width:312px;
                height:55px;
                border-radius:4px;
                font-size:24px;
                font-weight:500;
            }
            .btn{
                margin-top: 4rem;
            }
           
        `
        div.innerHTML= `
            <custom-header></custom-header>
            <div class="container">
            <h1>Bienvenidos</h1>

            <div class="inputs">
                <div>
                    <label for="email">Email</label>
                    <input type="text" id="email">
                </div>
                <div>
                    <label for="nombre">Tu nombre</label>
                    <input type="text" id="nombre">
                </div>
                <div>
                    <label for="room">Room</label>
                    <select name="rooms" id="room">
                        <option value="new">Nuevo Room</option>
                        <option value="old">Room Existente</option>
                    </select>
                </div>
                <div>
                    <label for="id">Room id</label>
                    <input type="text" id="id">
                </div>
            </div>
            <custom-btn class="btn">Comenzar</custom-btn>
            </div>
        `

        let $email =    div.querySelector("#email") as any
        let $name = div.querySelector("#nombre") as any 
        let $room = div.querySelector("#room") as any 
        let $id = div.querySelector("#id") as any
        let btn = div.querySelector(".btn") as any
        btn?.addEventListener("click",(e : any)=>{
            let name = $name.value
            let email = $email.value
            state.setEmailAndFullname(email,name)
            if($room.value ==="new"){
              state.singIn((error)=>{
            if (error) console.error("hubo un error en el signIn");
                 state.askNewRoom(()=>{
                state.getData()
                Router.go("/chat")
             })
        })
            }else if($room.value ==="old"){

             state.sincronizarDatos($id.value)
             Router.go("/chat")

            }
            
        })
        this.shadow.appendChild(style)
        this.shadow.appendChild(div)
    }
}

customElements.define("custom-home",Home)