# Modelo de datos — Torneo Deportivo Internacional

## Resumen
Este documento describe el **modelo de datos** propuesto para la base de datos del Torneo Deportivo Internacional. El enfoque usa un **modelo híbrido** en MongoDB: referencias entre colecciones para entidades que cambian o son compartidas (países, disciplinas, delegaciones, equipos, atletas, resultados, logros) y datos embebidos cuando tiene sentido (listas pequeñas y estáticas dentro de un documento).

---

## Colecciones y campos principales

### 1. `paises`
Documento de ejemplo:
```json
{
  "_id": ObjectId,
  "nombre": "Colombia",
  "codigo_iso": "COL",
  "continente": "América",
  "poblacion": 51500000,
}
```
**Campos / Tipos**: `_id` (ObjectId), `nombre` (string), `codigo_iso` (string), `continente` (string), `poblacion` (number).

### 2. `disciplinas`
Documento de ejemplo:
```json
{
  "_id": ObjectId,
  "nombre": "Atletismo",
  "tipo": "Individual",
  "categoria": ["Masculino","Femenino","Mixto"],
  "descripcion": "Texto..."
}
```
**Campos / Tipos**: `_id`, `nombre` (string), `tipo` (string), `categoria` (array<string>), `descripcion` (string).

### 3. `delegaciones`
Documento de ejemplo:
```json
{
  "_id": ObjectId,
  "pais_id": ObjectId,
  "disciplina_id": ObjectId,
  "fecha_inscripcion": ISODate,
  "numero_atletas": 12,
  "jefe_delegacion": "Nombre"
}
```
**Campos / Tipos**: referencias `pais_id`, `disciplina_id` (ObjectId), `fecha_inscripcion` (date), `numero_atletas` (number), `jefe_delegacion` (string).

### 4. `equipos`
Documento de ejemplo:
```json
{
  "_id": ObjectId,
  "nombre": "Equipo X",
  "disciplina_id": ObjectId,
  "delegacion_id": ObjectId,
  "entrenador": "Nombre",
  "anio_fundacion": 1995
}
```
**Campos / Tipos**: referencias a disciplina y delegación, strings y números.

### 5. `atletas`
Documento de ejemplo:
```json
{
  "_id": ObjectId,
  "nombre": "Atleta Y",
  "edad": 23,
  "genero": "M",
  "pais_id": ObjectId,
  "equipo_id": ObjectId,
  "especialidad": "100m",
  "peso_kg": 72.5,
  "altura_cm": 180,
  "registro_federado": true
}
```
**Campos / Tipos**: números, booleanos, referencias a país y equipo, strings.
**Nota**: 'registro_federado' se refiere a si un atleta está inscrito oficialmente en una federación deportiva reconocida, es decir:
- True: 
  - Tiene licencia oficial para competir.
  - Cumple con los requisitos de la federación de su país o disciplina.
  - Puede participar en eventos oficiales nacionales e internacionales.
- Flase:
  - Solo compite a nivel aficionado o local.
  - No pertenece a ninguna federación.
  - Participa como invitado, principiante o en eventos no oficiales.

### 6. `resultados`
Documento de ejemplo:
```json
{
  "_id": ObjectId,
  "atleta_id": ObjectId,
  "evento": "100m - Final",
  "fecha": ISODate,
  "marca": "10.12",
  "unidad": "segundos",
  "posicion": 1,
  "record": false
}
```
**Campos / Tipos**: referencias, fechas, strings (marca), números y booleanos.

### 7. `logros`
Documento de ejemplo:
```json
{
  "_id": ObjectId,
  "pais_id": ObjectId,
  "anio": 2024,
  "tipo": "Medalla de Oro",
  "disciplina": "Natación",
  "evento": "200m mariposa",
  "descripcion": "..."
}
```
**Campos / Tipos**: referencias, string, número, etc.

---

## Tipo de datos manejados
- **Strings**: nombres, códigos, descripciones.
- **Números**: edad, población, posiciones, anio_fundacion.
- **Booleanos**: `registro_federado`, `record`.
- **Fechas**: `fecha`, `fecha_inscripcion` — usar ISODate para facilitar consultas con operadores de fecha.
- **Arrays**: `categoria` en `disciplinas` (ej. ["Masculino","Femenino","Mixto"]). También pueden aparecer arrays para listas de miembros si fuese necesario.
- **Subdocumentos**: pueden usarse para estadísticas internas (por ejemplo `estadisticas: { partidos: 10, ganados: 7 }`).

---

## Justificación de la estructura
- **Referencias** para entidades compartidas y de tamaño variable (paises, disciplinas, delegaciones, equipos, atletas, etc.) permiten evitar inconsistencias y duplicación de datos (por ejemplo nombre de país).
- **Embebidos** para información que está fuertemente ligada y no se consulta por separado (ej. pequeñas listas o configuración de disciplina).
- **Escalabilidad**: el modelo permite añadir más disciplinas, ediciones del torneo, y estadísticas históricas sin reestructurar las colecciones principales.
- **Consultas eficientes**: la mezcla permite consultas por id (lookup) rápidas y desnormalización parcial cuando es necesario para performance.

---
