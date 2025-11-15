const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {

    this.userProfile.innerHTML = `<div class="info">
                                       <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                     <div class="data">
                                       <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                       <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                     </div>
                                  </div> 
                                  <div class="userInformation">
                                     <h2>Informações do usuário</h2> 
                                     <ul>
                                       <li>Seguidores: ${user.followers}</li>
                                       <li>Seguindo: ${user.following}</li>
                                     </ul>
                                  </div>`

    let eventsItens = ""
    let repositoriesItens = ""

    user.events.forEach(event => {
      if (event.type === "PushEvent" && event.payload.commits && event.payload.commits.length > 0) eventsItens += `<li>${event.repo.name} - <span>${event.payload.commits[0].message}</span></li>`
      else if (event.type === "PushEvent") eventsItens += `<li>${event.repo.name} - <span>Push sem mensagem de commit</span></li>`
    });

    user.repositories.forEach(repo => {

      repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li> 
                            <li class="nerdy-information">
                               <ul>
                                  <li title="Garfos"><i class="fa-solid fa-utensils"></i> ${repo.forks_count}</li> 
                                  <li title="Estrelas"><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</li>
                                  <li title="Olhos"><i class="fa-solid fa-eye"></i>  ${repo.watchers_count}</li>
                                  <li title="Linguagem de programação"><i class="fa-solid fa-code"></i>${repo.language ?? "❌"}</li>
                               </ul>
                           </li>`
    })

    if (user.events.length > 0) this.userProfile.innerHTML += `<div class="list-events">
                                                                  <h2>Eventos do usuário</h2>
                                                                  <ul>${eventsItens}</ul>
                                                               <div>`
    else this.userProfile.innerHTML += `<h3>Sem Eventos ❌</h3>`

    if (user.repositories.length > 0) this.userProfile.innerHTML += `<section class="repositories">
                                                                        <h2>Repositórios</h2>
                                                                        <ul>${repositoriesItens}</ul>
                                                                     </section>`
    else this.userProfile.innerHTML += `<h3>Sem Repositórios ❌</h3>`

  },

  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
  }

};

export { screen }