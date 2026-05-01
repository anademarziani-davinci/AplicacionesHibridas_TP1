import { createPage } from "./base.view.js"

export function crearListaProyectos(proyectos, filtros = {}) {
    const { nombre = "", seccion = "" } = filtros;
    const hayFiltros = nombre || seccion;

    const cards = proyectos.map(proyecto => `
        <div class="project-card">
            <div class="card-image-wrapper">
                <img src="${proyecto.img}" alt="${proyecto.name}" class="card-img" />
                <span class="card-section">${proyecto.section}</span>
            </div>
            <div class="card-body">
                <div class="card-header">
                    <a class="card-title" href="${proyecto.link}"> ${proyecto.name}</a>
                    <span class="card-id">#${proyecto._id}</span>
                </div>
                <p class="card-description">${proyecto.description}</p>
                <div class="card-tags">
                    ${(proyecto.technologies ?? []).map(tech => `<span class="tag">${tech}</span>`).join("")}
                </div>
                <div class="card-client">
                    <img src="${proyecto.cliente?.foto}" alt="${proyecto.cliente?.nombre}" class="avatar" />
                    <span class="card-client-name">${proyecto.cliente?.nombre}</span>
                </div>
            </div>
        </div>`).join("")

    const html = `

    <div class="page-header">
        <h1 class="page-title">Proyectos</h1>
        <form class="filter-form" method="get" action="/proyectos">
            <input class="filter-input" type="text" name="nombre" placeholder="Nombre" value="${nombre}" />
            <input class="filter-input" type="text" name="seccion" placeholder="Sección" value="${seccion}" />
            <button class="filter-btn" type="submit">Filtrar</button>
            ${hayFiltros ? `<a class="filter-clear" href="/proyectos">Limpiar</a>` : ""}
        </form>
    </div>

    <div class="projects-grid">
        ${cards || `<p class="empty-state">No se encontraron proyectos.</p>`}
    </div>`

    return createPage(html, "Proyectos");
}