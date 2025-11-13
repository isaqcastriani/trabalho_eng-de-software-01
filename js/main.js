/**
 * main.js - Lógica da página inicial (listagem de vagas)
 */

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    loadJobs();
});

/**
 * Carrega as vagas do localStorage ou do arquivo JSON
 */
async function loadJobs() {
    try {
        let jobs = getJobsFromStorage();
        
        // Se não houver vagas no localStorage, carrega do arquivo JSON
        if (!jobs || jobs.length === 0) {
            const response = await fetch('data/jobs.json');
            jobs = await response.json();
            saveJobsToStorage(jobs);
        }

        // Filtra apenas vagas ativas
        const activeJobs = jobs.filter(job => job.active !== false);
        
        displayJobs(activeJobs);
        updateJobsCount(activeJobs.length);
    } catch (error) {
        console.error('Erro ao carregar vagas:', error);
        showNoJobs();
    }
}

/**
 * Exibe as vagas na página
 */
function displayJobs(jobs) {
    const jobsList = document.getElementById('jobsList');
    const noJobs = document.getElementById('noJobs');
    
    if (jobs.length === 0) {
        showNoJobs();
        return;
    }

    jobsList.innerHTML = '';
    noJobs.style.display = 'none';

    jobs.forEach(job => {
        const jobCard = createJobCard(job);
        jobsList.appendChild(jobCard);
    });
}

/**
 * Cria um card de vaga
 */
function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.onclick = () => viewJob(job.id);

    card.innerHTML = `
        <div class="job-card-header">
            <h4>${job.title}</h4>
            <div class="job-company">${job.company}</div>
        </div>
        
        <div class="job-meta">
            <div class="job-meta-item">
                <span>📍 ${job.location}</span>
            </div>
            <div class="job-meta-item">
                <span>💼 ${job.type}</span>
            </div>
        </div>

        <p class="job-description">${job.description}</p>
        
        <div class="job-salary">💰 ${job.salary}</div>
        
        <button class="btn-view">Ver detalhes</button>
    `;

    return card;
}

/**
 * Redireciona para a página de detalhes da vaga
 */
function viewJob(jobId) {
    window.location.href = `job.html?id=${jobId}`;
}

/**
 * Atualiza o contador de vagas
 */
function updateJobsCount(count) {
    const jobsCount = document.getElementById('jobsCount');
    jobsCount.textContent = count;
}

/**
 * Exibe mensagem quando não há vagas
 */
function showNoJobs() {
    const jobsList = document.getElementById('jobsList');
    const noJobs = document.getElementById('noJobs');
    
    jobsList.innerHTML = '';
    noJobs.style.display = 'block';
    updateJobsCount(0);
}

/**
 * Obtém as vagas do localStorage
 */
function getJobsFromStorage() {
    const jobs = localStorage.getItem('inhire_jobs');
    return jobs ? JSON.parse(jobs) : null;
}

/**
 * Salva as vagas no localStorage
 */
function saveJobsToStorage(jobs) {
    localStorage.setItem('inhire_jobs', JSON.stringify(jobs));
}
