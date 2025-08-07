# Torneo Deportivo Internacional

**Estudiante:** Bryan Andres Villabona  
**Base de datos:** `torneo2025`  
**Entorno:** MongoDB

---

## 📌 Descripción general

Este proyecto consiste en el modelado, implementación y consulta de una base de datos para un **Torneo Deportivo Internacional**, siguiendo las especificaciones dadas en el taller.

Se definieron colecciones para países, disciplinas, delegaciones, equipos, atletas, resultados y logros.  
Cada colección contiene al menos 15 documentos con datos variados.

---

## 📂 Archivos del repositorio

- **`modelo_de_datos.md`** → Explicación de cada colección, sus campos y la justificación de la estructura (referencias vs. datos embebidos).
- **`*.json`** → Datos de ejemplo para cada colección.
- **`README.md`** → Descripción general y consultas.

---

## ⚙️ Cómo ejecutar

### Importar los `.json` directamente
Usando `mongoimport` (reemplaza la ruta con tu carpeta):
```bash
mongoimport --db torneo2025 --collection paises --file paises.json --jsonArray
mongoimport --db torneo2025 --collection disciplinas --file disciplinas.json --jsonArray
mongoimport --db torneo2025 --collection delegaciones --file delegaciones.json --jsonArray
mongoimport --db torneo2025 --collection equipos --file equipos.json --jsonArray
mongoimport --db torneo2025 --collection atletas --file atletas.json --jsonArray
mongoimport --db torneo2025 --collection resultados --file resultados.json --jsonArray
mongoimport --db torneo2025 --collection logros --file logros.json --jsonArray
```

## 🔍 Consultas

### Consultas sencillas (sin operadores complejos)

1️⃣ **Buscar todos los equipos de la disciplina Atletismo**
```js
db.equipos.find({
  disciplina_id: ObjectId("2c453fe42bbef5f10e40906c")
})
```
📖 *Explicación:* Busca en la colección `equipos` todos aquellos que tengan como `disciplina_id` el ID correspondiente a "Atletismo".  
📊 *Resultado esperado:* Lista de documentos de equipos de atletismo (campos como `nombre`, `anio_fundacion`, etc.).

---

2️⃣ **Consultar atletas del país Colombia**
```js
db.atletas.find({
  pais_id: ObjectId("f1dd9a02dd8613488738a947")
})
```
📖 *Explicación:* Devuelve todos los atletas cuyo `pais_id` corresponde al país "Colombia".  
📊 *Resultado esperado:* Muestra atletas colombianos con sus datos (`nombre`, `edad`, `peso_kg`, etc.).

---

3️⃣ **Mostrar delegaciones de España**
```js
db.delegaciones.find({
  pais_id: ObjectId("7fae9e7189070625f4834299")
})
```
📖 *Explicación:* Filtra las delegaciones cuyo país es España.  
📊 *Resultado esperado:* Lista de documentos de delegaciones asociadas a España.

---

4️⃣ **Listar resultados en la fecha 2025-08-11**
```js
db.resultados.find({
  fecha: ISODate("2025-08-11T00:00:00Z")
})
```
📖 *Explicación:* Devuelve todas las competencias (resultados) celebradas en esa fecha exacta.  
📊 *Resultado esperado:* Lista de resultados con `posicion`, `tiempo_marca`, etc.

---

5️⃣ **Listar logros de tipo Medalla de Oro**
```js
db.logros.find({
  tipo: "Medalla de Oro"
})
```
📖 *Explicación:* Busca todos los logros cuyo campo `tipo` sea "Medalla de Oro".  
📊 *Resultado esperado:* Lista de logros con ese tipo, mostrando país y año.

---

### Consultas con operadores

1️⃣ **Equipos fundados después del año 2000**
```js
db.equipos.find({
  anio_fundacion: { $gt: 2000 }
})
```
📖 *Explicación:* Devuelve equipos cuyo año de fundación es mayor a 2000.  
📊 *Resultado esperado:* Lista de equipos recientes.

---

2️⃣ **Atletas con edad entre 20 y 25 años**
```js
db.atletas.find({
  edad: { $gte: 20, $lte: 25 }
})
```
📖 *Explicación:* Busca atletas cuya edad está entre 20 y 25 (inclusive).  
📊 *Resultado esperado:* Lista de atletas jóvenes en ese rango.

---

3️⃣ **Delegaciones con más de 10 atletas**
```js
db.delegaciones.find({
  numero_atletas: { $gt: 10 }
})
```
📖 *Explicación:* Filtra delegaciones con más de 10 atletas registrados.  
📊 *Resultado esperado:* Lista de delegaciones grandes.

---

4️⃣ **Resultados posteriores al 1 de agosto de 2025**
```js
db.resultados.find({
  fecha: { $gte: ISODate("2025-08-01T00:00:00Z") }
})
```
📖 *Explicación:* Busca competencias celebradas en o después de esa fecha.  
📊 *Resultado esperado:* Lista de resultados recientes.

---

5️⃣ **Atletas no federados**
```js
db.atletas.find({
  registro_federado: false
})
```
📖 *Explicación:* Filtra atletas cuyo campo `registro_federado` sea `false`.  
📊 *Resultado esperado:* Lista de atletas sin registro oficial.

---

6️⃣ **Equipos en lista específica**
```js
db.equipos.find({
  nombre: { $in: ["Equipo Atletismo 1", "Equipo Fútbol 2", "Equipo Ciclismo 3"] }
})
```
📖 *Explicación:* Busca equipos cuyo nombre está en esa lista exacta.  
📊 *Resultado esperado:* Lista de esos 3 equipos si existen.

---

7️⃣ **Delegaciones que no sean de Estados Unidos ni China**
```js
db.delegaciones.find({
  pais_id: { $nin: [ ObjectId("a1a4b542bdc524f01c744d03"), ObjectId("c73736613dfe8b6adc18412c") ] }
})
```
📖 *Explicación:* Excluye delegaciones de esos 2 países.  
📊 *Resultado esperado:* Lista de delegaciones del resto de países.

---

8️⃣ **Atletas menores de 19 años o con peso > 90 kg**
```js
db.atletas.find({
  $or: [
    { edad: { $lt: 19 } },
    { peso_kg: { $gt: 90 } }
  ]
})
```
📖 *Explicación:* Devuelve atletas adolescentes o de gran peso.  
📊 *Resultado esperado:* Lista de atletas que cumplan alguna de las condiciones.

---

9️⃣ **Resultados con posición ≤ 3 y récord**
```js
db.resultados.find({
  $and: [
    { posicion: { $lte: 3 } },
    { record: true }
  ]
})
```
📖 *Explicación:* Filtra medallistas que además lograron récord.  
📊 *Resultado esperado:* Lista de resultados de podio con récord.

---

🔟 **Disciplinas con categoría "Mixto"**
```js
db.disciplinas.find({
  categoria: "Mixto"
})
```
📖 *Explicación:* Busca disciplinas cuya categoría sea "Mixto".  
📊 *Resultado esperado:* Lista de disciplinas mixtas.

---

1️⃣1️⃣ **Atletas cuyo género no sea 'M'**
```js
db.atletas.find({
  genero: { $ne: "M" }
})
```
📖 *Explicación:* Devuelve atletas de género distinto a masculino.  
📊 *Resultado esperado:* Lista de atletas femeninas o de otro género.

---
