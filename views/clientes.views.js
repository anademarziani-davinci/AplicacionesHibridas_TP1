import {createPage} from "./base.view.js"

export function crearListaClientes(clientes, title) {
    let html = `
    <div class="page-header">
        <h1 class="page-title">Clientes</h1>
    </div
    >`
    html += `<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Foto</th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      ${clientes.map(cliente => `
        <tr>
          <td>
            ${cliente.foto
              ? `<img class="avatar" src="${cliente.foto}" alt="${cliente.nombre}" />`
              : `<div class="avatar-placeholder">—</div>`
            }
          </td>
          <td>${cliente.nombre}</td>
          <td>${cliente.descripcion}</td>
          <td><a href="/clientes/${cliente._id}">Ver proyectos</a></td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</div>
`
    

    return createPage(html, "Clientes");
}

export function verProyectosDeCliente(cliente, proyectos) {
    const proyectosHtml = proyectos.length === 0
        ? `<p class="empty-state">Este cliente no tiene proyectos aún.</p>`
        : proyectos.map(p => `
            <div class="project-card">
              <div class="card-image-wrapper">
                <img src="${p.img}" alt="${p.name}" class="card-img" />
                <span class="card-section">${p.section}</span>
              </div>
              <div class="card-body">
                <div class="card-header">
                  <p class="card-title">${p.name}</p>
                  <span class="card-id">#${p._id}</span>
                </div>
                <p class="card-description">${p.description}</p>
                <div class="card-tags">
                  ${(p.technologies ?? []).map(t => `<span class="tag">${t}</span>`).join("")}
                </div>
              </div>
            </div>`).join("")

    const content = `
    <div class="profile-layout">
      <aside class="profile-sidebar">
        ${cliente.foto
            ? `<img class="profile-avatar" src="${cliente.foto}" alt="${cliente.nombre}" />`
            : `<div class="profile-avatar-placeholder">?</div>`
        }
        <h2 class="profile-name">${cliente.nombre}</h2>
        ${cliente.descripcion ? `<p class="profile-description">${cliente.descripcion}</p>` : ""}
      </aside>

      <section class="profile-projects">
        <h2>Proyectos</h2>
        <div class="projects-grid">
          ${proyectosHtml}
        </div>
      </section>
    </div>`

    return createPage(content, cliente.nombre)
}