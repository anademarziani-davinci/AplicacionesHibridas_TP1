export function createPage(content, title = "App") {
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="/style.css" />
  <title>${title}</title>
</head>
<body>

  <header>
    <h1>
      <a href="/">Mi Aplicación</a>
    </h1>
    <nav>
      <a href="/proyectos">Proyectos</a>
      <a href="/clientes">Clientes</a>
    </nav>
  </header>

  <main>
    ${content}
  </main>

</body>
</html>`
}
