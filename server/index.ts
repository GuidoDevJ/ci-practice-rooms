import * as  express from "express"
import { bdrt,fireStore } from "./db.js"
import { nanoid } from 'nanoid'
import * as cors from "cors"
const app = express()
const port = 3001
app.use(cors())
app.use(express.json())

const userCollection = fireStore.collection("users")
const roomsCollection = fireStore.collection("rooms")
// Base de Datos  

app.post("/singup",(req,res)=>{
    const email = req.body.email
    const nombre = req.body.nombre
    userCollection.where("email","==",email).get().then(result=>{
        if(result.empty){
            userCollection.add({
                email,
                nombre
            }).then(newUser=>{
                res.json({
                    id:newUser.id,
                    new:true
                })
            })
        }else{
            res.status(400).json({
                message:"user has already exist",
                status:400
            })
        }
    })
})
app.post("/auth",(req,res)=>{
    const email = req.body.email
    userCollection.where("email","==",email).get().then(result=>{
        if(result.empty){
            res.status(404).json({
                message: "user dosnt exist"
            })
        }else{
            res.json({
                id : result.docs[0].id
            })
        }
    })
})

app.post("/rooms",(req,res)=>{
    const {userId} = req.body
    userCollection.doc(userId.toString()).get().then(snap=>{
        if(snap.exists){
            let newRoom = bdrt.ref("/rooms/" + nanoid())
            newRoom.set({
               messages:[],
               owner:userId 
            }).then(()=>{
                const roomLongId = newRoom.key
                const roomId = 1000+ Math.floor(Math.random() * 999)
                roomsCollection.doc(roomId.toString()).set({
                    rtdbRoomId:roomLongId
                }).then(()=>{
                    res.json({
                        id:roomId.toString()
                    })

                })
            })
        }else{
            res.status(402).json({
                message:"El usuario no existe"
            })
        }
    })
})
app.post("/rooms/:rtdbId",(req,res)=>{
    const {rtdbId} = req.params
    const {from,message} = req.body
    bdrt.ref("/rooms/"+rtdbId).push({
        from,
        message
    }).then(()=>{
        res.json("Salio todo ok")
    })
})
app.get("/rooms/:roomId",(req,res)=>{
    const chatRoomId = req.params.roomId;
	const chatRoomDoc = roomsCollection.doc(`${chatRoomId.toString()}`);
	chatRoomDoc.get().then((docSnap) => {
		if (docSnap.exists) {
			const snapData = docSnap.data();
			res.status(200).json(snapData);
		} else {
			res.status(404).json({
				message:
					"ID de sala incorrecto. Compruebe que el ID se ingresó correctamente de lo contrario cree una sala",
			});
		}
	});
})
app.get("/rooms/:roomId",(req,res)=>{
    const {userId} = req.query
    const {roomId} = req.params
    userCollection.doc(userId.toString()).get().then(snap=>{
        if(snap.exists){
            roomsCollection.doc(roomId).get().then(snap=>{
                const data = snap.data()
                res.json(data)
            })
        }else{
            res.status(402).json({
                message:"El usuario no existe"
            })
        }
    })
})
app.use(express.static("public"));

app.get("*", (req, res) => {
	res.sendFile(__dirname+"/public/index.html");
});

app.listen(port,()=>{
    console.log("Escuchando los cambios")
})