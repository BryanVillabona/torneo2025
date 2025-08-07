// 1) Buscar todos los equipos de la disciplina Atletismo
printjson(
  db.equipos.find({
    disciplina_id: ObjectId("2c453fe42bbef5f10e40906c")
  }).toArray()
)

// 2) Consultar atletas del país Colombia
printjson(
  db.atletas.find({
    pais_id: ObjectId("f1dd9a02dd8613488738a947")
  }).toArray()
)

// 3) Mostrar delegaciones de España
printjson(
  db.delegaciones.find({
    pais_id: ObjectId("7fae9e7189070625f4834299")
  }).toArray()
)

// 4) Listar resultados en la fecha 2025-08-11
printjson(
  db.resultados.find({
    fecha: ISODate("2025-08-11T00:00:00Z")
  }).toArray()
)

// 5) Listar logros de tipo Medalla de Oro
printjson(
  db.logros.find({
    tipo: "Medalla de Oro"
  }).toArray()
)
