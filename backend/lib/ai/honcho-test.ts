// import honcho from "./honchoClient"


// const honchoTest = async () => {
//     const app = await honcho.apps.getOrCreate("Defendant")

//     const user = await honcho.apps.users.create(app.id, {
//         name: "Parth Agrawal",
//         metadata: { email: "parthagrawal@gmail.com", phone: "9876543210" }
//     })

//     const session = await honcho.apps.users.sessions.create(app.id, user.id, {
//         metadata: { location_id: "default" }
//     })

//     await honcho.apps.users.sessions.messages.create(app.id, user.id, session.id, { content: "Hello, World!", is_user: true })

//     for await (const session of honcho.apps.users.sessions.list(app.id, user.id)) {
//         console.log(session)
//     }

// }

// const readApp = async () => {
//     for await (const app of honcho.apps()) {
//         console.log(app)
//     }

// }
// honchoTest()

