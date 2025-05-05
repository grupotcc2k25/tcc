// META E VARIÁVEIS GLOBAIS
const META_MENSAL = 200; // 200 horas = 100% do progresso total acumulado
const LIMITE_DIARIO = 20; // Limite de 20h por dia

// -------------------- CALCULOS --------------------
function calcularHorasPorPeriodo() {
  const hoje = new Date().toLocaleDateString('pt-BR');
  const mesAtual = new Date().getMonth() + 1;
  const anoAtual = new Date().getFullYear();

  let horasHoje = 0;
  let horasMes = 0;
  let totalHoras = 0;

  document.querySelectorAll('.tabela-horas tbody tr').forEach(linha => {
    const cols = linha.querySelectorAll('td');
    const data = cols[0].textContent;
    const horas = parseFloat(cols[2].textContent.replace('h', '')) || 0;

    const [dia, mes, ano] = data.split('/').map(Number);

    totalHoras += horas;
    if (data === hoje) horasHoje += horas;
    if (mes === mesAtual && ano === anoAtual) horasMes += horas;
  });

  return { totalHoras, horasHoje, horasMes };
}

function calcularTotalHoras() {
  const linhas = document.querySelectorAll('.tabela-horas tbody tr');
  let totalHoras = 0;

  linhas.forEach(linha => {
    const celulaHoras = linha.querySelector('td:nth-child(3)');
    const textoHoras = celulaHoras.textContent.trim();
    const horas = parseFloat(textoHoras.replace(/[^\d.,]/g, '').replace(',', '.'));
    if (!isNaN(horas)) totalHoras += horas;
  });

  const totalElement = document.getElementById('total-horas');
  if (totalElement) totalElement.textContent = `Total: ${totalHoras.toFixed(1)}h`;
  return totalHoras;
}

// -------------------- INDICADORES --------------------
function atualizarIndicadores() {
    const { totalHoras, horasHoje, horasMes } = calcularHorasPorPeriodo();
    const progresso = Math.min((totalHoras / META_MENSAL) * 100, 100);
  
    const horasHojeLimitadas = Math.min(horasHoje, LIMITE_DIARIO);
  
    document.getElementById('total-horas').textContent = `Total: ${totalHoras.toFixed(1)}h`;
    document.querySelector('.card:nth-child(1) p').textContent = `${horasHojeLimitadas.toFixed(1)}h`;
    document.querySelector('.card:nth-child(2) p').textContent = `${horasMes.toFixed(1)}h`;
    document.querySelector('.card:nth-child(3) p').textContent = `${progresso.toFixed(1)}%`;
  
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      progressBar.style.width = `${progresso}%`;
      progressBar.textContent = `${Math.round(progresso)}%`;
    }
  
    atualizarTags(horasHojeLimitadas, horasMes, progresso);
  }
  
  function atualizarProgresso() {
    const totalHoras = calcularTotalHoras();
    const metaHoras = 200; // Meta total de horas
    const porcentagem = Math.min((totalHoras / metaHoras) * 100, 100);
  
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      progressBar.style.width = `${porcentagem}%`;
      progressBar.textContent = `${Math.round(porcentagem)}%`;
    }
  
    const progressCard = document.querySelector('.card:nth-child(3) p');
    if (progressCard) {
      progressCard.textContent = `${Math.round(porcentagem)}%`;
    }
  }
  
  function atualizarTags(horasHoje, horasMes, progresso) {
    const tags = document.querySelectorAll('.tag');
    const cards = document.querySelectorAll('.card');
  
    if (horasHoje > 8) {
      tags[0].textContent = '#recorde';
      tags[0].style.background = 'rgba(255, 193, 7, 0.2)';
      tags[0].style.color = '#FFC107';
    }
  
    if (horasMes >= META_MENSAL) {
      tags[1].textContent = '#meta-cumprida';
      tags[1].style.background = 'rgba(76, 175, 80, 0.2)';
      tags[1].style.color = '#4CAF50';
    } else if (horasMes >= META_MENSAL * 0.8) {
      tags[1].textContent = '#quase-lá';
      tags[1].style.background = 'rgba(255, 152, 0, 0.2)';
      tags[1].style.color = '#FF9800';
    }
  
    if (progresso >= 100) {
      tags[2].textContent = '#concluído';
      cards[2].classList.add('card-meta-alcancada');
    } else if (progresso >= 75) {
      tags[2].textContent = '#bom-progresso';
    } else if (progresso >= 50) {
      tags[2].textContent = '#em-andamento';
    }
  }
// -------------------- ATIVIDADES --------------------
function adicionarAtividade(data, atividade, duracao) {
  const tbody = document.querySelector('.tabela-horas tbody');
  if (!tbody) return;

  const novaLinha = document.createElement('tr');
  novaLinha.innerHTML = `
    <td>${data}</td>
    <td>${atividade}</td>
    <td>${duracao}h</td>
  `;

  tbody.appendChild(novaLinha);
  novaLinha.style.animation = 'fadeIn 0.5s ease-in-out';
  setTimeout(() => novaLinha.style.animation = '', 500);

  salvarAtividades();
  atualizarIndicadores();
}

function salvarAtividades() {
  const linhas = document.querySelectorAll('.tabela-horas tbody tr');
  const atividades = [];

  linhas.forEach(linha => {
    const colunas = linha.querySelectorAll('td');
    atividades.push({
      data: colunas[0].textContent,
      atividade: colunas[1].textContent,
      duracao: colunas[2].textContent
    });
  });

  localStorage.setItem('atividadesSRA', JSON.stringify(atividades));
}

function carregarAtividades() {
  const salvas = localStorage.getItem('atividadesSRA');
  if (salvas) {
    const atividades = JSON.parse(salvas);
    const tbody = document.querySelector('.tabela-horas tbody');
    tbody.innerHTML = '';

    atividades.forEach(item => {
      const novaLinha = document.createElement('tr');
      novaLinha.innerHTML = `
        <td>${item.data}</td>
        <td>${item.atividade}</td>
        <td>${item.duracao}</td>
      `;
      tbody.appendChild(novaLinha);
    });

    calcularTotalHoras();
  }
}

function novaAtividade() {
  const modal = document.getElementById('atividadeModal');
  if (modal) modal.style.display = 'block';

  document.querySelector('.close').onclick = () => modal.style.display = 'none';

  window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
  };

  document.getElementById('formAtividade').onsubmit = function (e) {
    e.preventDefault();
    const data = document.getElementById('dataAtividade').value;
    const tipo = document.getElementById('tipoAtividade').value;
    const descricao = document.getElementById('descricaoAtividade').value;
    const duracao = document.getElementById('duracaoAtividade').value;

    const dataFormatada = new Date(data).toLocaleDateString('pt-BR');
    adicionarAtividade(dataFormatada, `${tipo}: ${descricao}`, duracao);

    this.reset();
    modal.style.display = 'none';
  };
}

function removerAtividade() {
  const linhas = document.querySelectorAll('.tabela-horas tbody tr');
  if (linhas.length === 0) return alert('Não há atividades para remover!');

  const atividadesList = Array.from(linhas).map((linha, index) => {
    const cols = linha.querySelectorAll('td');
    return `${index + 1}. ${cols[0].textContent} - ${cols[1].textContent} (${cols[2].textContent})`;
  }).join('\n');

  const numero = prompt(`Qual atividade deseja remover?\n\n${atividadesList}\n\nDigite o número da atividade:`);
  const indice = parseInt(numero) - 1;

  if (isNaN(indice) || indice < 0 || indice >= linhas.length) return alert('Número inválido!');

  if (confirm('Tem certeza que deseja remover esta atividade?')) {
    linhas[indice].remove();
    salvarAtividades();
    atualizarIndicadores();
    alert('Atividade removida com sucesso!');
  }
}

function gerarRelatorio() {
  alert('Relatório gerado com sucesso!');
}

function filtrarAtividades() {
  alert('Abrindo filtros...');
}

// -------------------- INICIALIZAÇÃO --------------------
document.addEventListener('DOMContentLoaded', function () {
  carregarAtividades();
  atualizarIndicadores();
  calcularTotalHoras();
  atualizarProgresso();

  document.getElementById('btnNovaAtividade').addEventListener('click', novaAtividade);
  document.getElementById('btnRemoverAtividade').addEventListener('click', removerAtividade);

  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 150);
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.4s ease';
  });

  setTimeout(() => {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) progressBar.style.width = '72%';
  }, 300);
});
