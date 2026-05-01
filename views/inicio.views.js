import { createPage } from "./base.view.js"

export function renderInicio(clientes, proyectos) {
    const clientesHtml = clientes.map(c => `
        <tr>
          <td>
            ${c.foto
              ? `<img class="avatar" src="${c.foto}" alt="${c.nombre}" />`
              : `<div class="avatar-placeholder">—</div>`
            }
          </td>
          <td>${c.nombre}</td>
          <td>${c.descripcion}</td>
          <td><a href="/clientes/${c._id}">Ver proyectos</a></td>
        </tr>`).join("")

    const proyectosHtml = proyectos.map(p => `
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
    <section class="home-section">
      <div class="section-header">
        <h2>Últimos Proyectos</h2>
        <a href="/proyectos">Ver todos →</a>
      </div>
      <div class="projects-grid">${proyectosHtml}</div>
    </section>

    <section class="home-section">
      <div class="section-header">
        <h2>Últimos Clientes</h2>
        <a href="/clientes">Ver todos →</a>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${clientesHtml}</tbody>
        </table>
      </div>
    </section>`

    return createPage(content, "Inicio")
}
