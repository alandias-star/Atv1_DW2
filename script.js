document.addEventListener("DOMContentLoaded", () => {
  //  Destaque da Página Ativa no NAV

  const linksNav = document.querySelectorAll(".nav-principal a");
  const paginaAtual = window.location.pathname.split("/").pop() || "index.html";

  linksNav.forEach((link) => {
    const hrefLink = link.getAttribute("href");
    if (hrefLink === paginaAtual) {
      link.style.backgroundColor = "#ffffff";
      link.style.color = "var(--cor-primaria)";
      link.setAttribute("aria-current", "page");
    }
  });

  //  Contador Regressivo

  const headerTopo = document.getElementById("topo");
  if (headerTopo) {
    const anoAtual = new Date().getFullYear();
    const dataEvento = new Date(`October 15, ${anoAtual} 10:00:00`).getTime();

    const contadorContainer = document.createElement("div");
    contadorContainer.style.marginTop = "1rem";
    contadorContainer.style.fontSize = "1.1rem";
    contadorContainer.style.fontWeight = "bold";
    contadorContainer.style.color = "#f1f5f9";
    headerTopo.appendChild(contadorContainer);

    const atualizarContador = () => {
      const agora = new Date().getTime();
      const diferenca = dataEvento - agora;

      if (diferenca > 0) {
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor(
          (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutos = Math.floor(
          (diferenca % (1000 * 60 * 60)) / (1000 * 60),
        );
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        contadorContainer.innerHTML = `⏳ Faltam <strong>${dias}d ${horas}h ${minutos}m ${segundos}s</strong> para o festival!`;
      } else {
        contadorContainer.innerHTML = "🎉 O festival está acontecendo agora!";
      }
    };

    atualizarContador();
    setInterval(atualizarContador, 1000);
  }

  //  Campo de Busca em Tempo Real no Cardápio

  const secaoCardapio = document.getElementById("cardapio");
  if (secaoCardapio) {
    const campoBusca = document.createElement("input");
    campoBusca.type = "text";
    campoBusca.placeholder =
      "🔍 Buscar prato ou ingrediente (ex: Sashimi, Ramen, Matcha)...";
    campoBusca.style.width = "100%";
    campoBusca.style.padding = "0.75rem";
    campoBusca.style.marginTop = "1rem";
    campoBusca.style.marginBottom = "1.5rem";
    campoBusca.style.borderRadius = "6px";
    campoBusca.style.border = "1px solid #cbd5e1";
    campoBusca.style.fontSize = "1rem";

    secaoCardapio.insertBefore(
      campoBusca,
      secaoCardapio.querySelector("article"),
    );

    const itensCardapio = secaoCardapio.querySelectorAll("li");

    campoBusca.addEventListener("input", (e) => {
      const termo = e.target.value.toLowerCase();

      itensCardapio.forEach((item) => {
        const texto = item.textContent.toLowerCase();
        if (texto.includes(termo)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  }

  // Modal/Zoom para Figuras da Galeria

  const figuras = document.querySelectorAll(".galeria-figure");
  if (figuras.length > 0) {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.backgroundColor = "rgba(0,0,0,0.85)";
    modal.style.display = "none";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "2000";
    modal.style.cursor = "pointer";

    const modalConteudo = document.createElement("div");
    modalConteudo.style.backgroundColor = "#fff";
    modalConteudo.style.padding = "1.5rem";
    modalConteudo.style.borderRadius = "8px";
    modalConteudo.style.textAlign = "center";
    modalConteudo.style.maxWidth = "90%";

    modal.appendChild(modalConteudo);
    document.body.appendChild(modal);

    figuras.forEach((figura) => {
      figura.style.cursor = "pointer";
      figura.title = "Clique para ampliar";

      figura.addEventListener("click", () => {
        modalConteudo.innerHTML = figura.innerHTML;

        const imgModal = modalConteudo.querySelector("img");
        if (imgModal) imgModal.style.maxHeight = "60vh";

        const svgModal = modalConteudo.querySelector("svg");
        if (svgModal) {
          svgModal.setAttribute("width", "220");
          svgModal.setAttribute("height", "220");
        }

        modal.style.display = "flex";
      });
    });

    modal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  //  Botão "Voltar ao Topo"

  const rodape = document.querySelector(".rodape-principal");
  if (rodape) {
    const btnTopo = document.createElement("button");
    btnTopo.innerText = "↑ Voltar ao Topo";
    btnTopo.style.marginTop = "1rem";
    btnTopo.style.padding = "0.6rem 1.2rem";
    btnTopo.style.backgroundColor = "var(--cor-primaria)";
    btnTopo.style.color = "#ffffff";
    btnTopo.style.border = "none";
    btnTopo.style.borderRadius = "4px";
    btnTopo.style.cursor = "pointer";
    btnTopo.style.fontWeight = "bold";
    btnTopo.style.transition = "transform 0.2s";

    btnTopo.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    rodape.appendChild(btnTopo);
  }
});
