/**
 * admin.js - Lógica da página de administração (CRUD de vagas e visualização de candidatos)
 */

let editingJobId = null;

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se está logado
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    // Carrega as vagas
    loadAdminJobs();

    // Event listeners
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('addJobBtn').addEventListener('click', () => openJobModal());
    document.getElementById('jobForm').addEventListener('submit', handleJobSubmit);
});

/**
 * Verifica se o usuário está logado
 */
function isLoggedIn() {
    const isLogged = localStorage.getItem('inhire_admin_logged') === 'true';
    const loginTime = parseInt(localStorage.getItem('inhire_admin_login_time') || '0');
    const currentTime = new Date().getTime();
    const SESSION_DURATION = 24 * 60 * 60 * 1000;
    
    return isLogged && (currentTime - loginTime) < SESSION_DURATION;
}

/**
 * Faz logout
 */
function handleLogout() {
    localStorage.removeItem('inhire_admin_logged');
    localStorage.removeItem('inhire_admin_login_time');
    window.location.href = 'login.html';
}

/**
 * Carrega as vagas para a área administrativa
 */
function loadAdminJobs() {
    const jobs = getJobsFromStorage();
    const candidatures = getCandidaturesFromStorage();

    // Atualiza as estatísticas
    updateStats(jobs, candidatures);

    // Exibe a tabela de vagas
    displayJobsTable(jobs, candidatures);
}

/**
 * Atualiza as estatísticas
 */
function updateStats(jobs, candidatures) {
    const activeJobs = jobs.filter(job => job.active !== false).length;
    document.getElementById('totalJobs').textContent = activeJobs;
    document.getElementById('totalCandidates').textContent = candidatures.length;
}

/**
 * Exibe a tabela de vagas
 */
function displayJobsTable(jobs, candidatures) {
    const jobsTable = document.getElementById('jobsTable');

    if (jobs.length === 0) {
        jobsTable.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Nenhuma vaga cadastrada.</p>';
        return;
    }

    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Empresa</th>
                    <th>Localização</th>
                    <th>Tipo</th>
                    <th>Candidatos</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;

    jobs.forEach(job => {
        const jobCandidates = candidatures.filter(c => c.jobId === job.id);
        const statusClass = job.active === false ? 'style="opacity: 0.5;"' : '';

        tableHTML += `
            <tr ${statusClass}>
                <td>${job.id}</td>
                <td>${job.title}</td>
                <td>${job.company}</td>
                <td>${job.location}</td>
                <td>${job.type}</td>
                <td>
                    <button class="btn-view-candidates" onclick="viewCandidates(${job.id})">
                        ${jobCandidates.length} candidato(s)
                    </button>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn-icon" onclick="editJob(${job.id})" title="Editar">
                            ✏️
                        </button>
                        <button class="btn-icon btn-delete" onclick="deleteJob(${job.id})" title="Excluir">
                            🗑️
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    jobsTable.innerHTML = tableHTML;
}

/**
 * Abre o modal para adicionar ou editar vaga
 */
function openJobModal(jobId = null) {
    const modal = document.getElementById('jobModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('jobForm');

    editingJobId = jobId;

    if (jobId) {
        // Modo de edição
        modalTitle.textContent = 'Editar Vaga';
        const jobs = getJobsFromStorage();
        const job = jobs.find(j => j.id === jobId);
        
        if (job) {
            document.getElementById('jobTitle').value = job.title;
            document.getElementById('jobCompany').value = job.company;
            document.getElementById('jobLocation').value = job.location;
            document.getElementById('jobType').value = job.type;
            document.getElementById('jobSalary').value = job.salary;
            document.getElementById('jobDescription').value = job.description;
            document.getElementById('jobRequirements').value = job.requirements.join('\n');
            document.getElementById('jobBenefits').value = job.benefits.join('\n');
        }
    } else {
        // Modo de criação
        modalTitle.textContent = 'Nova Vaga';
        form.reset();
    }

    modal.style.display = 'flex';
}

/**
 * Fecha o modal de vaga
 */
function closeJobModal() {
    const modal = document.getElementById('jobModal');
    modal.style.display = 'none';
    editingJobId = null;
}

/**
 * Processa o envio do formulário de vaga
 */
function handleJobSubmit(event) {
    event.preventDefault();

    const jobData = {
        title: document.getElementById('jobTitle').value,
        company: document.getElementById('jobCompany').value,
        location: document.getElementById('jobLocation').value,
        type: document.getElementById('jobType').value,
        salary: document.getElementById('jobSalary').value,
        description: document.getElementById('jobDescription').value,
        requirements: document.getElementById('jobRequirements').value.split('\n').filter(r => r.trim()),
        benefits: document.getElementById('jobBenefits').value.split('\n').filter(b => b.trim()),
        active: true
    };

    let jobs = getJobsFromStorage();

    if (editingJobId) {
        // Atualiza vaga existente
        const index = jobs.findIndex(j => j.id === editingJobId);
        if (index !== -1) {
            jobs[index] = { ...jobs[index], ...jobData };
        }
    } else {
        // Cria nova vaga
        const newId = jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1;
        jobData.id = newId;
        jobs.push(jobData);
    }

    // Salva no localStorage
    saveJobsToStorage(jobs);

    // Fecha o modal e recarrega a lista
    closeJobModal();
    loadAdminJobs();
}

/**
 * Edita uma vaga
 */
function editJob(jobId) {
    openJobModal(jobId);
}

/**
 * Exclui uma vaga
 */
function deleteJob(jobId) {
    if (!confirm('Tem certeza que deseja excluir esta vaga?')) {
        return;
    }

    let jobs = getJobsFromStorage();
    jobs = jobs.filter(job => job.id !== jobId);
    saveJobsToStorage(jobs);
    loadAdminJobs();
}

/**
 * Visualiza os candidatos de uma vaga
 */
function viewCandidates(jobId) {
    const jobs = getJobsFromStorage();
    const job = jobs.find(j => j.id === jobId);
    const candidatures = getCandidaturesFromStorage();
    const jobCandidates = candidatures.filter(c => c.jobId === jobId);

    const modal = document.getElementById('candidatesModal');
    const title = document.getElementById('candidatesTitle');
    const list = document.getElementById('candidatesList');

    title.textContent = `Candidatos - ${job.title}`;

    if (jobCandidates.length === 0) {
        list.innerHTML = '<div class="no-candidates"><p>Nenhum candidato para esta vaga.</p></div>';
    } else {
        let html = '';
        jobCandidates.forEach(candidate => {
            const date = new Date(candidate.appliedAt).toLocaleDateString('pt-BR');
            html += `
                <div class="candidate-card">
                    <h4>${candidate.name}</h4>
                    <div class="candidate-info">
                        <div class="candidate-info-item">
                            <strong>E-mail:</strong>
                            ${candidate.email}
                        </div>
                        <div class="candidate-info-item">
                            <strong>Telefone:</strong>
                            ${candidate.phone}
                        </div>
                        <div class="candidate-info-item">
                            <strong>Currículo:</strong>
                            ${candidate.resumeFileName}
                        </div>
                        <div class="candidate-info-item">
                            <strong>Data:</strong>
                            ${date}
                        </div>
                    </div>
                    ${candidate.message ? `<p style="margin-top: 1rem;"><strong>Mensagem:</strong> ${candidate.message}</p>` : ''}
                </div>
            `;
        });
        list.innerHTML = html;
    }

    modal.style.display = 'flex';
}

/**
 * Fecha o modal de candidatos
 */
function closeCandidatesModal() {
    const modal = document.getElementById('candidatesModal');
    modal.style.display = 'none';
}

/**
 * Obtém as vagas do localStorage
 */
function getJobsFromStorage() {
    const jobs = localStorage.getItem('inhire_jobs');
    return jobs ? JSON.parse(jobs) : [];
}

/**
 * Salva as vagas no localStorage
 */
function saveJobsToStorage(jobs) {
    localStorage.setItem('inhire_jobs', JSON.stringify(jobs));
}

/**
 * Obtém as candidaturas do localStorage
 */
function getCandidaturesFromStorage() {
    const candidatures = localStorage.getItem('inhire_candidatures');
    return candidatures ? JSON.parse(candidatures) : [];
}
