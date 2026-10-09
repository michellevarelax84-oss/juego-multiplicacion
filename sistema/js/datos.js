/**
 * PLATAFORMA EDUCATIVA "MIS TABLAS"
 * Base de Datos Pedagógica y Didáctica
 * Diseñado especialmente para estudiantes de 4° Básico (Currículum Nacional de Matemáticas)
 */

const DATOS = {
  // Información didáctica de las tablas del 2 al 10
  tablas: {
    2: {
      numero: 2,
      nombre: "Tabla del 2",
      apodo: "El Doble Mágico",
      icono: "🍒",
      color: "#3B82F6",
      descripcion: "¡Multiplicar por 2 es encontrar el doble de cualquier número!",
      patron: "Todos los resultados de la tabla del 2 son NÚMEROS PARES y siempre terminan en 0, 2, 4, 6 u 8.",
      truco: "💡 Truco del Doble: Si tienes una cantidad, solo súmale la misma cantidad. Ejemplo: 2 × 7 es 7 + 7 = 14.",
      objeto: "cerezas",
      ejercicios: [
        { factor: 1, prod: 2, suma: "2", pista: "1 grupo de 2 cerezas = 2." },
        { factor: 2, prod: 4, suma: "2 + 2", pista: "El doble de 2 es 4." },
        { factor: 3, prod: 6, suma: "2 + 2 + 2", pista: "3 pares de zapatos son 6 zapatos." },
        { factor: 4, prod: 8, suma: "2 + 2 + 2 + 2", pista: "El doble de 4 es 8." },
        { factor: 5, prod: 10, suma: "2 + 2 + 2 + 2 + 2", pista: "5 pares de medias = 10 medias." },
        { factor: 6, prod: 12, suma: "2 + 2 + 2 + 2 + 2 + 2", pista: "El doble de 6 es 12 (una docena)." },
        { factor: 7, prod: 14, suma: "2 + 2 + 2 + 2 + 2 + 2 + 2", pista: "El doble de 7 es 14." },
        { factor: 8, prod: 16, suma: "2 + 2 + 2 + 2 + 2 + 2 + 2 + 2", pista: "El doble de 8 es 16." },
        { factor: 9, prod: 18, suma: "2 + 2 + 2 + 2 + 2 + 2 + 2 + 2 + 2", pista: "El doble de 9 es 18." },
        { factor: 10, prod: 20, suma: "2 repetido 10 veces", pista: "El doble de 10 es 20." }
      ]
    },
    3: {
      numero: 3,
      nombre: "Tabla del 3",
      apodo: "El Trío Saltarín",
      icono: "☘️",
      color: "#10B981",
      descripcion: "Multiplicar por 3 es calcular el triple o contar de tres en tres.",
      patron: "Si sumas los dígitos de cualquier resultado de la tabla del 3, siempre obtendrás 3, 6 o 9. ¡Pruébalo con 27: 2 + 7 = 9!",
      truco: "💡 Truco del Triple: Multiplica por 2 (el doble) y luego súmale una vez más el número. Ejemplo: 3 × 6 = (6 + 6) + 6 = 18.",
      objeto: "tréboles",
      ejercicios: [
        { factor: 1, prod: 3, suma: "3", pista: "1 trébol con 3 hojas = 3." },
        { factor: 2, prod: 6, suma: "3 + 3", pista: "El doble de 3 es 6." },
        { factor: 3, prod: 9, suma: "3 + 3 + 3", pista: "3 grupos de 3 es 9." },
        { factor: 4, prod: 12, suma: "3 + 3 + 3 + 3", pista: "Piensa en 3 × 2 = 6, y el doble es 12." },
        { factor: 5, prod: 15, suma: "3 + 3 + 3 + 3 + 3", pista: "Termina en 5: 15." },
        { factor: 6, prod: 18, suma: "3 + 3 + 3 + 3 + 3 + 3", pista: "3 × 5 son 15, más 3 son 18." },
        { factor: 7, prod: 21, suma: "3 + 3 + 3 + 3 + 3 + 3 + 3", pista: "3 semanas de 7 días = 21 días." },
        { factor: 8, prod: 24, suma: "3 + 3 + 3 + 3 + 3 + 3 + 3 + 3", pista: "Un día tiene 24 horas (3 × 8)." },
        { factor: 9, prod: 27, suma: "3 repetido 9 veces", pista: "2 + 7 = 9. El resultado es 27." },
        { factor: 10, prod: 30, suma: "3 repetido 10 veces", pista: "3 decenas = 30." }
      ]
    },
    4: {
      numero: 4,
      nombre: "Tabla del 4",
      apodo: "El Doble del Doble",
      icono: "🚗",
      color: "#F59E0B",
      descripcion: "¡Multiplicar por 4 es como sacar el doble dos veces seguidas!",
      patron: "Todos los múltiplos de 4 son números pares. Los últimos dos dígitos siempre son divisibles por 4.",
      truco: "💡 Truco del Doble Doble: Para 4 × 6: primero haz 6 + 6 = 12, y luego 12 + 12 = 24. ¡Súper fácil!",
      objeto: "ruedas",
      ejercicios: [
        { factor: 1, prod: 4, suma: "4", pista: "1 auto tiene 4 ruedas = 4." },
        { factor: 2, prod: 8, suma: "4 + 4", pista: "2 autos tienen 8 ruedas." },
        { factor: 3, prod: 12, suma: "4 + 4 + 4", pista: "El triple de 4 es 12." },
        { factor: 4, prod: 16, suma: "4 + 4 + 4 + 4", pista: "4 al cuadrado = 16." },
        { factor: 5, prod: 20, suma: "4 + 4 + 4 + 4 + 4", pista: "La mitad de 40 es 20." },
        { factor: 6, prod: 24, suma: "4 + 4 + 4 + 4 + 4 + 4", pista: "Doble de 6 es 12, doble de 12 es 24." },
        { factor: 7, prod: 28, suma: "4 + 4 + 4 + 4 + 4 + 4 + 4", pista: "Febrero bisiesto tiene 28 días regulares." },
        { factor: 8, prod: 32, suma: "4 + 4 + 4 + 4 + 4 + 4 + 4 + 4", pista: "Doble de 16 = 32." },
        { factor: 9, prod: 36, suma: "4 repetido 9 veces", pista: "4 × 10 son 40, réstale 4 y da 36." },
        { factor: 10, prod: 40, suma: "4 repetido 10 veces", pista: "4 decenas = 40." }
      ]
    },
    5: {
      numero: 5,
      nombre: "Tabla del 5",
      apodo: "La Manito Veloz",
      icono: "⭐",
      color: "#EC4899",
      descripcion: "¡La tabla más rítmica y divertida! Como contar los minutos en un reloj de pared.",
      patron: "Todos los resultados terminan en 0 o en 5, alternándose: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50.",
      truco: "💡 Truco del Reloj: Si multiplicas 5 por un número par termina en 0 (ej: 5 × 6 = 30). Si es impar termina en 5 (ej: 5 × 7 = 35).",
      objeto: "estrellas",
      ejercicios: [
        { factor: 1, prod: 5, suma: "5", pista: "Los 5 dedos de una mano = 5." },
        { factor: 2, prod: 10, suma: "5 + 5", pista: "Los 10 dedos de dos manos = 10." },
        { factor: 3, prod: 15, suma: "5 + 5 + 5", pista: "Un cuarto de hora en el reloj = 15 minutos." },
        { factor: 4, prod: 20, suma: "5 + 5 + 5 + 5", pista: "Termina en cero: 20." },
        { factor: 5, prod: 25, suma: "5 + 5 + 5 + 5 + 5", pista: "5 monedas de $5 = $25." },
        { factor: 6, prod: 30, suma: "5 + 5 + 5 + 5 + 5 + 5", pista: "Media hora en el reloj = 30 minutos." },
        { factor: 7, prod: 35, suma: "5 + 5 + 5 + 5 + 5 + 5 + 5", pista: "30 más 5 es 35." },
        { factor: 8, prod: 40, suma: "5 + 5 + 5 + 5 + 5 + 5 + 5 + 5", pista: "La mitad de 80 es 40." },
        { factor: 9, prod: 45, suma: "5 repetido 9 veces", pista: "Tres cuartos de hora = 45 minutos." },
        { factor: 10, prod: 50, suma: "5 repetido 10 veces", pista: "Medio centenar = 50." }
      ]
    },
    6: {
      numero: 6,
      nombre: "Tabla del 6",
      apodo: "El Dado Mágico",
      icono: "🎲",
      color: "#8B5CF6",
      descripcion: "El 6 es el doble de 3. ¡Si sabes la del 3, solo duplica el resultado!",
      patron: "Al multiplicar 6 por un número par, el resultado termina exactamente en ese mismo número: 6 × 2 = 12, 6 × 4 = 24, 6 × 6 = 36, 6 × 8 = 48.",
      truco: "💡 Truco del Par: ¡Fíjate en la rima! Seis por cuatro veinticuatro, seis por seis treinta y seis, seis por ocho cuarenta y ocho.",
      objeto: "dados",
      ejercicios: [
        { factor: 1, prod: 6, suma: "6", pista: "Un dado con 6 caras = 6." },
        { factor: 2, prod: 12, suma: "6 + 6", pista: "Una docena de huevos = 12." },
        { factor: 3, prod: 18, suma: "6 + 6 + 6", pista: "Doble de 9 = 18." },
        { factor: 4, prod: 24, suma: "6 + 6 + 6 + 6", pista: "Termina en 4: veinticuatro." },
        { factor: 5, prod: 30, suma: "6 + 6 + 6 + 6 + 6", pista: "La mitad de 60 = 30." },
        { factor: 6, prod: 36, suma: "6 + 6 + 6 + 6 + 6 + 6", pista: "Termina en 6: treinta y seis." },
        { factor: 7, prod: 42, suma: "6 + 6 + 6 + 6 + 6 + 6 + 6", pista: "6 × 6 son 36, más 6 son 42." },
        { factor: 8, prod: 48, suma: "6 + 6 + 6 + 6 + 6 + 6 + 6 + 6", pista: "Termina en 8: cuarenta y ocho." },
        { factor: 9, prod: 54, suma: "6 repetido 9 veces", pista: "6 × 10 son 60, réstale 6 = 54." },
        { factor: 10, prod: 60, suma: "6 repetido 10 veces", pista: "6 decenas = 60." }
      ]
    },
    7: {
      numero: 7,
      nombre: "Tabla del 7",
      apodo: "Los Días de la Semana",
      icono: "🌈",
      color: "#06B6D4",
      descripcion: "¡La tabla de las semanas! Cada semana tiene 7 días: lunes a domingo.",
      patron: "Es una tabla con mucha personalidad. Puedes apoyarte en las tablas que ya conoces gracias a la propiedad conmutativa: 7 × 5 es igual a 5 × 7.",
      truco: "💡 Truco de las Semanas: 1 semana = 7 días, 2 semanas = 14 días, 3 semanas = 21 días, 4 semanas = 28 días.",
      objeto: "arcoíris",
      ejercicios: [
        { factor: 1, prod: 7, suma: "7", pista: "1 semana = 7 días." },
        { factor: 2, prod: 14, suma: "7 + 7", pista: "2 semanas = 14 días." },
        { factor: 3, prod: 21, suma: "7 + 7 + 7", pista: "3 semanas = 21 días." },
        { factor: 4, prod: 28, suma: "7 + 7 + 7 + 7", pista: "4 semanas = 28 días (un mes lunar)." },
        { factor: 5, prod: 35, suma: "7 + 7 + 7 + 7 + 7", pista: "7 × 5 es igual a 5 × 7 = 35." },
        { factor: 6, prod: 42, suma: "7 + 7 + 7 + 7 + 7 + 7", pista: "6 semanas = 42 días." },
        { factor: 7, prod: 49, suma: "7 + 7 + 7 + 7 + 7 + 7 + 7", pista: "7 al cuadrado = 49." },
        { factor: 8, prod: 56, suma: "7 + 7 + 7 + 7 + 7 + 7 + 7 + 7", pista: "¡El secreto 5, 6, 7, 8! 56 = 7 × 8." },
        { factor: 9, prod: 63, suma: "7 repetido 9 veces", pista: "7 × 10 son 70, réstale 7 = 63." },
        { factor: 10, prod: 70, suma: "7 repetido 10 veces", pista: "7 decenas = 70." }
      ]
    },
    8: {
      numero: 8,
      nombre: "Tabla del 8",
      apodo: "El Pulpo Multiplicador",
      icono: "🐙",
      color: "#6366F1",
      descripcion: "¡El pulpo tiene 8 tentáculos! El 8 es el doble del 4, y el doble del doble del 2.",
      patron: "Las unidades de los resultados van bajando de 2 en 2: 8, 6, 4, 2, 0, 8, 6, 4, 2, 0.",
      truco: "💡 Truco del Triple Doble: Para 8 × 5: Doble de 5 = 10, doble de 10 = 20, doble de 20 = 40.",
      objeto: "tentáculos",
      ejercicios: [
        { factor: 1, prod: 8, suma: "8", pista: "1 pulpo tiene 8 tentáculos = 8." },
        { factor: 2, prod: 16, suma: "8 + 8", pista: "2 pulpos tienen 16 tentáculos." },
        { factor: 3, prod: 24, suma: "8 + 8 + 8", pista: "8 × 3 es igual a 3 × 8 = 24." },
        { factor: 4, prod: 32, suma: "8 + 8 + 8 + 8", pista: "Doble de 16 = 32." },
        { factor: 5, prod: 40, suma: "8 + 8 + 8 + 8 + 8", pista: "8 × 5 es la mitad de 80 = 40." },
        { factor: 6, prod: 48, suma: "8 + 8 + 8 + 8 + 8 + 8", pista: "Seis por ocho cuarenta y ocho." },
        { factor: 7, prod: 56, suma: "8 + 8 + 8 + 8 + 8 + 8 + 8", pista: "¡Recuerda los números seguidos: 5, 6, 7, 8! 56 = 7 × 8." },
        { factor: 8, prod: 64, suma: "8 + 8 + 8 + 8 + 8 + 8 + 8 + 8", pista: "Un tablero de ajedrez tiene 64 casillas (8 × 8)." },
        { factor: 9, prod: 72, suma: "8 repetido 9 veces", pista: "8 × 10 son 80, réstale 8 = 72." },
        { factor: 10, prod: 80, suma: "8 repetido 10 veces", pista: "8 decenas = 80." }
      ]
    },
    9: {
      numero: 9,
      nombre: "Tabla del 9",
      apodo: "El Secreto de los Dedos",
      icono: "🪐",
      color: "#D946EF",
      descripcion: "¡La tabla más misteriosa y llena de patrones sorprendentes del universo!",
      patron: "Las decenas aumentan de 0 a 9 mientras las unidades disminuyen de 9 a 0 (09, 18, 27, 36, 45, 54, 63, 72, 81, 90). ¡Y la suma de sus dígitos SIEMPRE es 9!",
      truco: "💡 Truco de los Dedos: Pon tus 10 dedos. Para 9 × 4, baja tu 4° dedo. A la izquierda te quedan 3 dedos y a la derecha 6 dedos: ¡El resultado es 36!",
      objeto: "planetas",
      ejercicios: [
        { factor: 1, prod: 9, suma: "9", pista: "0 + 9 = 9." },
        { factor: 2, prod: 18, suma: "9 + 9", pista: "1 + 8 = 9. El resultado es 18." },
        { factor: 3, prod: 27, suma: "9 + 9 + 9", pista: "2 + 7 = 9. El resultado es 27." },
        { factor: 4, prod: 36, suma: "9 + 9 + 9 + 9", pista: "3 + 6 = 9. El resultado es 36." },
        { factor: 5, prod: 45, suma: "9 + 9 + 9 + 9 + 9", pista: "4 + 5 = 9. El resultado es 45." },
        { factor: 6, prod: 54, suma: "9 + 9 + 9 + 9 + 9 + 9", pista: "¡Es el inverso de 45! 5 + 4 = 9 -> 54." },
        { factor: 7, prod: 63, suma: "9 + 9 + 9 + 9 + 9 + 9 + 9", pista: "¡Inverso de 36! 6 + 3 = 9 -> 63." },
        { factor: 8, prod: 72, suma: "9 + 9 + 9 + 9 + 9 + 9 + 9 + 9", pista: "¡Inverso de 27! 7 + 2 = 9 -> 72." },
        { factor: 9, prod: 81, suma: "9 repetido 9 veces", pista: "¡Inverso de 18! 8 + 1 = 9 -> 81." },
        { factor: 10, prod: 90, suma: "9 repetido 10 veces", pista: "9 decenas = 90." }
      ]
    },
    10: {
      numero: 10,
      nombre: "Tabla del 10",
      apodo: "El Toque del Cero Mágico",
      icono: "💰",
      color: "#14B8A6",
      descripcion: "¡La tabla más fácil y poderosa del sistema decimal!",
      patron: "Todos los múltiplos de 10 terminan invariablemente en un cero (0).",
      truco: "💡 El Cero Mágico: Solo escribe el número por el que estás multiplicando y agrégale un cero al final. Ejemplo: 10 × 7 = 7 con un cero = 70.",
      objeto: "monedas",
      ejercicios: [
        { factor: 1, prod: 10, suma: "10", pista: "1 billete de 10 = 10." },
        { factor: 2, prod: 20, suma: "10 + 10", pista: "2 con un cero = 20." },
        { factor: 3, prod: 30, suma: "10 + 10 + 10", pista: "3 con un cero = 30." },
        { factor: 4, prod: 40, suma: "10 + 10 + 10 + 10", pista: "4 con un cero = 40." },
        { factor: 5, prod: 50, suma: "10 + 10 + 10 + 10 + 10", pista: "5 con un cero = 50." },
        { factor: 6, prod: 60, suma: "10 + 10 + 10 + 10 + 10 + 10", pista: "6 con un cero = 60." },
        { factor: 7, prod: 70, suma: "10 + 10 + 10 + 10 + 10 + 10 + 10", pista: "7 con un cero = 70." },
        { factor: 8, prod: 80, suma: "10 + 10 + 10 + 10 + 10 + 10 + 10 + 10", pista: "8 con un cero = 80." },
        { factor: 9, prod: 90, suma: "10 repetido 9 veces", pista: "9 con un cero = 90." },
        { factor: 10, prod: 100, suma: "10 repetido 10 veces", pista: "10 con un cero = 100 (¡una centena!)." }
      ]
    }
  },

  // 10 Preguntas Contextualizadas Tipo SIMCE 4° Básico
  simcePreguntas: [
    {
      id: 1,
      contexto: "Situaciones Escolares / Materiales",
      icono: "✏️",
      enunciado: "En la sala de 4° básico, la profesora reparte estuches para el taller de arte. Si hay 6 mesas de trabajo y en cada mesa entrega un estuche con 8 lápices de colores, ¿cuántos lápices de colores repartió en total la profesora?",
      opciones: [
        "42 lápices",
        "48 lápices",
        "54 lápices",
        "14 lápices"
      ],
      correcta: 1, // 48
      operacion: "6 × 8 = 48",
      explicacion: "Para calcular el total de lápices debemos multiplicar la cantidad de mesas (6) por los lápices de cada estuche (8). La operación es 6 × 8 = 48 lápices repartidos en total."
    },
    {
      id: 2,
      contexto: "Compras y Precios en la Feria",
      icono: "🍎",
      enunciado: "Don Carlos fue a la feria libre de su barrio a comprar fruta fresca. Si compró 7 mallas de naranjas y cada malla cuesta $900 (equivalente a 9 monedas de $100), ¿cuántas monedas de $100 gastó en total don Carlos?",
      opciones: [
        "56 monedas",
        "63 monedas",
        "72 monedas",
        "16 monedas"
      ],
      correcta: 1, // 63
      operacion: "7 × 9 = 63",
      explicacion: "Multiplicamos la cantidad de mallas (7) por las monedas de cada una (9). 7 × 9 = 63 monedas de $100 (que equivalen a $6.300)."
    },
    {
      id: 3,
      contexto: "Organización de Grupos / Acto Escolar",
      icono: "🪑",
      enunciado: "Para el acto de Fiestas Patrias en el gimnasio del colegio, los profesores ordenaron las sillas en filas perfectas. Si colocaron 9 filas y cada fila tiene exactamente 8 sillas, ¿cuántas personas podrán sentarse en total?",
      opciones: [
        "72 personas",
        "64 personas",
        "81 personas",
        "17 personas"
      ],
      correcta: 0, // 72
      operacion: "9 × 8 = 72",
      explicacion: "Este problema corresponde a un arreglo rectangular o matriz de filas por columnas. Multiplicamos 9 filas por 8 sillas por fila: 9 × 8 = 72 sillas disponibles para 72 personas."
    },
    {
      id: 4,
      contexto: "Distribución de Alimentos / Colecta Solidaria",
      icono: "📦",
      enunciado: "En la campaña de solidaridad escolar, los estudiantes de 4° básico armaron 8 cajas de mercadería. Si en cada caja guardaron 5 paquetes de fideos, ¿cuántos paquetes de fideos se reunieron en total?",
      opciones: [
        "35 paquetes",
        "40 paquetes",
        "45 paquetes",
        "13 paquetes"
      ],
      correcta: 1, // 40
      operacion: "8 × 5 = 40",
      explicacion: "Multiplicamos el número de cajas (8) por la cantidad de paquetes en cada caja (5). 8 × 5 = 40 paquetes de fideos reunidos."
    },
    {
      id: 5,
      contexto: "Biblioteca del Colegio / Cantidad de Objetos",
      icono: "📚",
      enunciado: "La encargada de la biblioteca escolar está ordenando los libros de cuentos infantiles. En un estante hay 4 repisas y en cada repisa caben exactamente 9 libros. ¿Cuántos libros hay en total en ese estante?",
      opciones: [
        "28 libros",
        "32 libros",
        "36 libros",
        "45 libros"
      ],
      correcta: 2, // 36
      operacion: "4 × 9 = 36",
      explicacion: "Calculamos el producto entre las repisas (4) y los libros por repisa (9). 4 × 9 = 36 libros en total en el estante."
    },
    {
      id: 6,
      contexto: "Juegos y Colecciones / Álbum Escolar",
      icono: "🃏",
      enunciado: "Matías está completando un álbum de dinosaurios. Su abuela le regaló 6 sobres de láminas. Si cada sobre contiene 7 láminas adentro, ¿cuántas láminas nuevas recibió Matías en total?",
      opciones: [
        "42 láminas",
        "48 láminas",
        "35 láminas",
        "13 láminas"
      ],
      correcta: 0, // 42
      operacion: "6 × 7 = 42",
      explicacion: "Multiplicamos los 6 sobres por las 7 láminas de cada sobre. 6 × 7 = 42 láminas que recibió Matías."
    },
    {
      id: 7,
      contexto: "Huerto Escolar / Arreglos y Siembra",
      icono: "🌱",
      enunciado: "En el taller de ciencias, el curso sembró plantines de lechuga en el huerto escolar. Formaron 5 canteros y en cada cantero plantaron 6 plantines en línea recta. ¿Cuántos plantines de lechuga sembraron en total?",
      opciones: [
        "25 plantines",
        "30 plantines",
        "35 plantines",
        "11 plantines"
      ],
      correcta: 1, // 30
      operacion: "5 × 6 = 30",
      explicacion: "Multiplicamos los 5 canteros por los 6 plantines por cantero. 5 × 6 = 30 plantines de lechuga sembrados."
    },
    {
      id: 8,
      contexto: "Fiesta y Celebración / Sorpresas de Cumpleaños",
      icono: "🎈",
      enunciado: "Para la fiesta de cumpleaños de Florencia, prepararon 10 bolsitas de sorpresas. Si en cada bolsita pusieron 6 dulces ricos, ¿cuántos dulces se usaron en total para armar todas las bolsitas?",
      opciones: [
        "50 dulces",
        "60 dulces",
        "70 dulces",
        "16 dulces"
      ],
      correcta: 1, // 60
      operacion: "10 × 6 = 60",
      explicacion: "Aplicamos la tabla del 10: 10 bolsitas por 6 dulces cada una: 10 × 6 = 60 dulces en total."
    },
    {
      id: 9,
      contexto: "Juegos y Deportes / Torneo Escolar",
      icono: "🏀",
      enunciado: "En el campeonato de básquetbol del colegio, el equipo 'Los Halcones' jugó 7 partidos. En cada partido consiguieron anotar exactamente 4 canastas triples (que valen 3 puntos cada una, sumando 4 canastas en total). ¿Cuántas canastas anotaron en los 7 partidos?",
      opciones: [
        "24 canastas",
        "28 canastas",
        "32 canastas",
        "11 canastas"
      ],
      correcta: 1, // 28
      operacion: "7 × 4 = 28",
      explicacion: "Multiplicamos la cantidad de partidos jugados (7) por las canastas logradas en cada uno (4). 7 × 4 = 28 canastas logradas."
    },
    {
      id: 10,
      contexto: "Problemas de la Vida Cotidiana / Ahorro Familiar",
      icono: "🪙",
      enunciado: "Sofía ahorra todos los días monedas de $10 en su alcancía. Si ahorró durante 8 días seguidos la misma cantidad de 8 monedas por día, ¿cuántas monedas tiene en su alcancía al terminar los 8 días?",
      opciones: [
        "56 monedas",
        "60 monedas",
        "64 monedas",
        "72 monedas"
      ],
      correcta: 2, // 64
      operacion: "8 × 8 = 64",
      explicacion: "Calculamos el producto de los días (8) por las monedas diarias (8). 8 × 8 = 64 monedas ahorradas por Sofía."
    }
  ],

  // Casos para "¿Quién tiene la respuesta?"
  quienTieneRespuesta: [
    {
      pregunta: "¿Cuánto es 7 × 6?",
      personajes: [
        { nombre: "Búho Tito", respuesta: 42, correcta: true, mensaje: "¡Ju-ju! Siete veces seis son exactamente 42." },
        { nombre: "Mono Lalo", respuesta: 36, correcta: false, mensaje: "¡Uh-uh! Yo creo que son 36... ¿o me equivoqué?" },
        { nombre: "Ranita Pipa", respuesta: 48, correcta: false, mensaje: "¡Croac! Yo salté hasta el 48, pero creo que me pasé." }
      ]
    },
    {
      pregunta: "¿Cuánto es 8 × 4?",
      personajes: [
        { nombre: "Búho Tito", respuesta: 28, correcta: false, mensaje: "Casi, pero 28 es 7 × 4." },
        { nombre: "Mono Lalo", respuesta: 32, correcta: true, mensaje: "¡Sííí! Ocho por cuatro son 32 bananas sabrosas." },
        { nombre: "Ranita Pipa", respuesta: 36, correcta: false, mensaje: "¡Croac! Treinta y seis es 9 × 4." }
      ]
    },
    {
      pregunta: "¿Cuánto es 9 × 5?",
      personajes: [
        { nombre: "Búho Tito", respuesta: 40, correcta: false, mensaje: "Cuarenta es 8 × 5, no 9 × 5." },
        { nombre: "Mono Lalo", respuesta: 54, correcta: false, mensaje: "Cincuenta y cuatro es 9 × 6." },
        { nombre: "Ranita Pipa", respuesta: 45, correcta: true, mensaje: "¡Croac! Nueve por cinco termina en cinco: ¡45!" }
      ]
    },
    {
      pregunta: "¿Cuánto es 6 × 6?",
      personajes: [
        { nombre: "Búho Tito", respuesta: 36, correcta: true, mensaje: "¡Por supuesto! Seis por seis treinta y seis, rima perfecta." },
        { nombre: "Mono Lalo", respuesta: 30, correcta: false, mensaje: "Treinta es solo 6 × 5." },
        { nombre: "Ranita Pipa", respuesta: 42, correcta: false, mensaje: "Cuarenta y dos es 6 × 7." }
      ]
    },
    {
      pregunta: "¿Cuánto es 8 × 7?",
      personajes: [
        { nombre: "Búho Tito", respuesta: 54, correcta: false, mensaje: "54 es 9 × 6." },
        { nombre: "Mono Lalo", respuesta: 56, correcta: true, mensaje: "¡Recuerda los números 5, 6, 7, 8! 56 = 7 × 8." },
        { nombre: "Ranita Pipa", respuesta: 58, correcta: false, mensaje: "¡58 ni siquiera está en la tabla del 8!" }
      ]
    }
  ],

  // Enigmas para "Detective Matemático"
  detectiveEnigmas: [
    {
      id: 1,
      titulo: "El Misterio de la Frutería",
      pistas: [
        "🕵️ Pista 1: Pertenezco a la tabla del 6.",
        "🕵️ Pista 2: Soy mayor que 20 y menor que 30.",
        "🕵️ Pista 3: La suma de mis dos dígitos es 6 (2 + 4 = 6)."
      ],
      respuesta: 24,
      explicacion: "24 pertenece a la tabla del 6 (6 × 4 = 24), está entre 20 y 30, y sus cifras 2 + 4 suman 6."
    },
    {
      id: 2,
      titulo: "El Enigma de la Caja Fuerte",
      pistas: [
        "🕵️ Pista 1: Pertenezco a la tabla del 7.",
        "🕵️ Pista 2: Soy mayor que 40 y menor que 50.",
        "🕵️ Pista 3: Mis dos dígitos suman 13 (4 + 9)."
      ],
      respuesta: 49,
      explicacion: "49 pertenece a la tabla del 7 (7 × 7 = 49), es mayor que 40 y menor que 50, y 4 + 9 = 13."
    },
    {
      id: 3,
      titulo: "El Código Secreto Espacial",
      pistas: [
        "🕵️ Pista 1: Pertenezco a la tabla del 8.",
        "🕵️ Pista 2: Soy un número par mayor que 50 y menor que 60.",
        "🕵️ Pista 3: Mis cifras son dos números consecutivos: 5 y 6."
      ],
      respuesta: 56,
      explicacion: "56 pertenece a la tabla del 8 (8 × 7 = 56), está entre 50 y 60, y sus cifras son 5 y 6."
    },
    {
      id: 4,
      titulo: "La Llave del Faraón",
      pistas: [
        "🕵️ Pista 1: Pertenezco a la tabla del 9.",
        "🕵️ Pista 2: Soy mayor que 60 y menor que 70.",
        "🕵️ Pista 3: La suma de mis cifras da 9 (6 + 3)."
      ],
      respuesta: 63,
      explicacion: "63 pertenece a la tabla del 9 (9 × 7 = 63), está entre 60 y 70, y 6 + 3 = 9."
    },
    {
      id: 5,
      titulo: "El Tesoro del Pirata",
      pistas: [
        "🕵️ Pista 1: Estoy al mismo tiempo en la tabla del 4 y en la tabla del 5.",
        "🕵️ Pista 2: Termino en el número cero.",
        "🕵️ Pista 3: Soy menor que 30."
      ],
      respuesta: 20,
      explicacion: "20 está en la tabla del 4 (4 × 5) y en la del 5 (5 × 4), termina en cero y es menor que 30."
    }
  ],

  // Logros y Medallas del Sistema
  logros: [
    { id: "primer_paso", nombre: "Primer Paso", icono: "🌱", desc: "Completaste tu primera actividad interactiva", desbloqueado: false },
    { id: "doble_maestro", nombre: "Maestro del Doble", icono: "🍒", desc: "Dominaste la tabla del 2 con 3 estrellas", desbloqueado: false },
    { id: "reloj_veloz", nombre: "Minutero Mágico", icono: "⭐", desc: "Dominaste la tabla del 5 sin equivocarte", desbloqueado: false },
    { id: "memoria_pro", nombre: "Mente Brillante", icono: "🧠", desc: "Ganaste una partida de Memoria Matemática", desbloqueado: false },
    { id: "cazador_burbujas", nombre: "Atrapador Veloz", icono: "🫧", desc: "Atrapaste 5 resultados correctos seguidos", desbloqueado: false },
    { id: "detective_oro", nombre: "Gran Detective", icono: "🕵️", desc: "Descifraste un enigma de la caja fuerte", desbloqueado: false },
    { id: "constructor", nombre: "Arquitecto Numérico", icono: "🧱", desc: "Construiste multiplicaciones agrupando objetos", desbloqueado: false },
    { id: "simce_estrella", nombre: "Genio SIMCE", icono: "🎓", desc: "Obtuviste Nivel Adecuado en el Ensayo SIMCE", desbloqueado: false },
    { id: "maestro_total", nombre: "Rey de las Tablas", icono: "👑", desc: "Alcanzaste más de 500 puntos de XP", desbloqueado: false }
  ]
};
