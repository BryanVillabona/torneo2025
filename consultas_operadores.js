// 1) Equipos fundados después del año 2000
printjson(
  db.equipos.find({
    anio_fundacion: { $gt: 2000 }
  }).toArray()
)

// 2) Atletas con edad entre 20 y 25 años
printjson(
  db.atletas.find({
    edad: { $gte: 20, $lte: 25 }
  }).toArray()
)

// 3) Delegaciones con más de 10 atletas
printjson(
  db.delegaciones.find({
    numero_atletas: { $gt: 10 }
  }).toArray()
)

// 4) Resultados posteriores al 1 de agosto de 2025
printjson(
  db.resultados.find({
    fecha: { $gte: ISODate("2025-08-01T00:00:00Z") }
  }).toArray()
)

// 5) Atletas no federados
printjson(
  db.atletas.find({
    registro_federado: false
  }).toArray()
)

// 6) Equipos en lista específica
printjson(
  db.equipos.find({
    nombre: { $in: ["Equipo Atletismo 1", "Equipo Fútbol 2", "Equipo Ciclismo 3"] }
  }).toArray()
)

// 7) Delegaciones que no sean de Estados Unidos ni China
printjson(
  db.delegaciones.find({
    pais_id: { $nin: [ ObjectId("a1a4b542bdc524f01c744d03"), ObjectId("c73736613dfe8b6adc18412c") ] }
  }).toArray()
)

// 8) Atletas menores de 19 años o con peso > 90 kg
printjson(
  db.atletas.find({
    $or: [
      { edad: { $lt: 19 } },
      { peso_kg: { $gt: 90 } }
    ]
  }).toArray()
)

// 9) Resultados con posición ≤ 3 y récord
printjson(
  db.resultados.find({
    $and: [
      { posicion: { $lte: 3 } },
      { record: true }
    ]
  }).toArray()
)

// 10) Disciplinas con categoría "Mixto"
printjson(
  db.disciplinas.find({
    categoria: "Mixto"
  }).toArray()
)

// 11) Atletas cuyo género no sea 'M'
printjson(
  db.atletas.find({
    genero: { $ne: "M" }
  }).toArray()
)
