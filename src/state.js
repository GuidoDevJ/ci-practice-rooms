"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
const rtdb_1 = require("./rtdb");
const BASE_URL = "http://localhost:3001/";
const state = {
    data: {
        from: "",
        email: "",
        messages: [],
        userId: "",
        roomId: "",
        rtdbId: ""
    },
    listeners: [],
    init() {
        const dataLocal = JSON.parse(localStorage.getItem("state"));
        if (dataLocal !== null) {
            this.setState(dataLocal);
            this.listenRoom();
        }
    },
    listenRoom() {
        const cs = this.getState();
        const chatroomsRef = rtdb_1.rtdb.ref("/rooms/" + cs.rtdbId);
        chatroomsRef.on("value", (snapshot) => {
            const messagesFromServer = snapshot.val();
            let messagesList = Object.values(messagesFromServer);
            messagesList = messagesList.filter(el => typeof el === "object");
            console.log(messagesList);
            cs.messages = messagesList;
            this.setState(cs);
        });
    },
    getState() {
        return this.data;
    },
    setState(newState) {
        this.data = newState;
        for (let cb of this.listeners) {
            cb();
        }
        localStorage.setItem("state", JSON.stringify(newState));
        console.log("el state ha cambiado", this.data);
    },
    setEmailAndFullname(email, name) {
        let current = this.getState();
        current.from = name;
        current.email = email;
        this.setState(current);
    },
    singIn(cb) {
        const cs = this.getState();
        if (cs.email && cs.from) {
            fetch(BASE_URL + "auth", {
                method: "post",
                body: JSON.stringify({
                    email: this.data.email,
                    nombre: this.data.from
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(data => {
                return data.json();
            }).then(data => {
                cs.userId = data.id;
                this.setState(cs);
                if (cb) {
                    cb();
                }
            });
        }
        else {
            console.error("No hay datos en el state");
            cb();
        }
    },
    askNewRoom(cb) {
        const cs = this.getState();
        fetch(BASE_URL + "rooms", {
            method: "post",
            body: JSON.stringify({
                userId: cs.userId
            }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(data => {
            return data.json();
        }).then(data => {
            cs.roomId = data.id;
            this.setState(cs);
            if (cb) {
                cb();
            }
        });
    },
    getData() {
        const cs = this.getState();
        fetch(BASE_URL + "rooms/" + cs.roomId + "?" + new URLSearchParams({ userId: cs.userId }))
            .then(data => {
            return data.json();
        }).then(data => {
            cs.rtdbId = data.rtdbRoomId;
            this.setState(cs);
            this.listenRoom();
        });
    },
    async sincronizarDatos(id) {
        console.log("Soy la sincronizacion", id);
        const cs = this.getState();
        cs.roomId = id;
        const data = await fetch(BASE_URL + "rooms/" + id);
        let json = await data.json();
        console.log(json);
        cs.rtdbId = json.rtdbRoomId;
        console.log(cs);
        this.setState(cs);
    },
    pushMessages(msg) {
        const cs = this.getState();
        const nombreState = cs.from;
        console.log(nombreState);
        fetch(BASE_URL + "rooms/" + cs.rtdbId, {
            method: "post",
            body: JSON.stringify({
                from: nombreState,
                message: msg
            }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        // .then(data=>{
        //     console.log(data) 
        // } )
    },
    subscribe(callback) {
        // recibe callbacks para ser avisados posteriormente
        this.listeners.push(callback);
    }
};
exports.state = state;
