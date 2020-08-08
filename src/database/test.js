const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    // inserir dados

    proffyValue = {
        name: 'Rafaella Coelho',
        avatar: 'https://avatars2.githubusercontent.com/u/32441267?s=460&u=e120e786301cdd14f31e248a4b4f0f7a9201f23b&v=4',
        whatsapp: '31999999999',
        bio: 'Instrutor de Programação',
    }

    classValue = {
        subject: 1,
        cost: '20',
        // o proffy id virá pelo banco de dados
    }

    const classScheduleValues = [
        {
          weekday: 1,
          time_from: 720,
          time_to: 1220,
        },
        {
          weekday: 0,
          time_from: 520,
          time_to: 1220,
        },
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consultar os dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    // consultar as classes de um determinado professor
    // e trazer junto os dados do professor

    const selectClassesAndProffys = await db.all(`
      SELECT classes.*, proffys.*
      FROM proffys
      JOIN classes on (proffys.id = classes.proffy_id)
      WHERE classes.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys)

    // o horário que a pessoa trabalha é das 8 - 18h
    // o horário do time_from (8h) precisa ser menor ou igual ao horário solicitado
    // o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
      SELECT class_schedule.*
      FROM class_schedule
      WHERE class_schedule.class_id = "1"
      AND class_schedule.weekday = "0"
      AND class_schedule.time_from <= "1300"
      AND class_schedule.time_to > "1300"
    `)
    
    // console.log(selectClassesSchedules)

})