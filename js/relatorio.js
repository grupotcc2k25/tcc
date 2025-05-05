// Toggle dropdown do perfil
function toggleProfileMenu() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.classList.toggle('active');
  }
  
  // Fecha dropdown ao clicar fora
  document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('profileDropdown');
    const userCard = document.querySelector('.user-profile');
  
    if (!dropdown.contains(event.target) && !userCard.contains(event.target)) {
      dropdown.classList.remove('active');
    }
  });
  
  // Logout
  document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logout-button");
  
    logoutButton.addEventListener("click", function(e) {
      e.preventDefault();
      const confirmLogout = confirm("Tem certeza que deseja sair?");
      if (confirmLogout) {
        // Adicionando animação de saída
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          sessionStorage.removeItem("logado");
          window.location.href = "../html/index.html";
        }, 300);
      }
    });
  });
  
  // Menu mobile
  function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("active");
  }
  
  // Efeito visual ao passar o mouse nos botões
  function setupButtonHover() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 4px 8px rgba(162, 89, 255, 0.3)';
      });
      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
        button.style.boxShadow = '';
      });
    });
  }
  
  // Gerenciamento de anexos
  document.addEventListener('DOMContentLoaded', function() {
    const arquivoInput = document.getElementById('arquivoInput');
    const botaoEnviar = document.getElementById('enviarRelatoriosBtn');
    const tabelaBody = document.querySelector('.tabela-estilosa tbody');
    const arquivosAnexados = [];
    const tabelaWrapper = document.querySelector('.tabela-wrapper');
  
    // Configuração inicial
    setupButtonHover();
    atualizarEstadoBotao();
  
    // Atualiza estado do botão de envio
    function atualizarEstadoBotao() {
      const temAnexos = arquivosAnexados.length > 0;
      botaoEnviar.disabled = !temAnexos;
      botaoEnviar.style.opacity = temAnexos ? "1" : "0.6";
      botaoEnviar.style.cursor = temAnexos ? "pointer" : "not-allowed";
      
      // Efeito visual quando ativado
      if (temAnexos) {
        botaoEnviar.style.background = 'linear-gradient(135deg, #a259ff, #6d28d9)';
        botaoEnviar.style.color = 'white';
      }
    }
  
    // Processamento de arquivos
    arquivoInput.addEventListener('change', function() {
      const tiposPermitidos = ['application/pdf', 
                             'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const arquivosSelecionados = Array.from(this.files);
      const arquivosInvalidos = arquivosSelecionados.filter(
        file => !tiposPermitidos.includes(file.type)
      );
  
      // Validação de tipo com estilo
      if (arquivosInvalidos.length > 0) {
        showCustomAlert(`❌ Tipo não permitido<br><small>Apenas PDF e DOCX são aceitos</small>`, '#ff4444');
        this.value = '';
        return;
      }
  
      if (arquivosSelecionados.length > 0) {
        // Mostra tabela com animação
        if (tabelaBody.rows.length === 0) {
          tabelaWrapper.classList.remove('oculta');
          tabelaWrapper.style.animation = 'fadeIn 0.5s ease-out';
          tabelaWrapper.style.overflowY = 'auto';
        }
  
        // Adiciona cada arquivo com efeito visual
        arquivosSelecionados.forEach((arquivo, i) => {
          setTimeout(() => {
            arquivosAnexados.push(arquivo);
            const novaLinha = tabelaBody.insertRow();
            novaLinha.style.animation = 'slideIn 0.3s ease-out';
            
            novaLinha.innerHTML = `
              <td data-label="Data">${obterDataAtual()}</td>
              <td data-label="Atividade">
                <a href="#" class="download-link" 
                   data-arquivo-index="${arquivosAnexados.length - 1}" 
                   download="${arquivo.name}">
                  <span class="file-icon">📄</span> ${arquivo.name}
                </a>
              </td>
              <td data-label="Apagar">
                <button class="remover-arquivo-btn">
                  <span class="trash-icon">🗑️</span> Remover
                </button>
              </td>
            `;
  
            // Evento de remoção com confirmação estilizada
            novaLinha.querySelector('button').addEventListener('click', function() {
              showConfirmDialog(
                "Remover arquivo?",
                `Deseja remover "${arquivo.name}"?`,
                () => {
                  const index = novaLinha.rowIndex - 1;
                  arquivosAnexados.splice(index, 1);
                  novaLinha.style.animation = 'fadeOut 0.3s ease-out';
                  setTimeout(() => {
                    tabelaBody.deleteRow(index);
                    atualizarIndicesDownload();
                    atualizarEstadoBotao();
                    if (tabelaBody.rows.length === 0) {
                      tabelaWrapper.classList.add('oculta');
                    }
                  }, 250);
                }
              );
            });
          }, i * 100); // Efeito cascata
        });
  
        showCustomAlert(`✅ ${arquivosSelecionados.length} arquivo(s) adicionado(s)`, '#4CAF50');
        this.value = '';
        atualizarEstadoBotao();
      }
    });
  
    // Download de arquivos
    tabelaBody.addEventListener('click', function(e) {
      if (e.target.closest('.download-link')) {
        e.preventDefault();
        const link = e.target.closest('.download-link');
        const index = parseInt(link.getAttribute('data-arquivo-index'));
        
        if (arquivosAnexados[index]) {
          // Efeito visual no download
          link.style.transform = 'scale(0.95)';
          setTimeout(() => link.style.transform = '', 200);
          
          const url = URL.createObjectURL(arquivosAnexados[index]);
          const tempLink = document.createElement('a');
          tempLink.href = url;
          tempLink.download = arquivosAnexados[index].name;
          document.body.appendChild(tempLink);
          tempLink.click();
          document.body.removeChild(tempLink);
          URL.revokeObjectURL(url);
        }
      }
    });
  
    // Envio de relatórios com efeito
    botaoEnviar.addEventListener("click", function() {
      if (arquivosAnexados.length === 0) return;
      
      // Animação de envio
      this.innerHTML = 'Enviando... <span class="spinner">⏳</span>';
      this.disabled = true;
      
      setTimeout(() => {
        showCustomAlert(`📤 Relatórios enviados com sucesso!<br><small>Os arquivos permanecem disponíveis</small>`, '#a259ff');
        this.innerHTML = 'Enviar Relatórios';
        atualizarEstadoBotao();
      }, 1500);
    });
  
    // Funções auxiliares melhoradas
    function atualizarIndicesDownload() {
      document.querySelectorAll('.download-link').forEach((link, index) => {
        link.setAttribute('data-arquivo-index', index);
      });
    }
  
    function obterDataAtual() {
      return new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
  
    // Alertas personalizados
    function showCustomAlert(message, color) {
      const alert = document.createElement('div');
      alert.className = 'custom-alert';
      alert.innerHTML = message;
      alert.style.backgroundColor = color;
      document.body.appendChild(alert);
      
      setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
      }, 3000);
    }
  
    // Diálogo de confirmação
    function showConfirmDialog(title, message, onConfirm) {
      const dialog = document.createElement('div');
      dialog.className = 'custom-dialog';
      dialog.innerHTML = `
        <div class="dialog-content">
          <h3>${title}</h3>
          <p>${message}</p>
          <div class="dialog-buttons">
            <button class="cancel-btn">Cancelar</button>
            <button class="confirm-btn">Confirmar</button>
          </div>
        </div>
      `;
      
      dialog.querySelector('.cancel-btn').addEventListener('click', () => dialog.remove());
      dialog.querySelector('.confirm-btn').addEventListener('click', () => {
        onConfirm();
        dialog.remove();
      });
      
      document.body.appendChild(dialog);
    }
  });
