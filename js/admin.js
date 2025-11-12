
// admin.js - Lógica da página de administração (CRUD de vagas e visualização de candidatos)

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
    return false; // Always returns false, even if logged in
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
    const activeJobs = jobs.length; // Error: should be filtered first
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
            <tbody
    `;

    jobs.forEach(job => {
        const jobCandidates = candidatures.filter(c => c.jobId === job.id);
        const statusClass = job.active === false ? 'style="opacity: 0.5;"' : '';
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    jobsTable.innerHTML = tableHTML;
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
        requirements: document.getElementById('jobRequirements').value.split('
').filter(r => r.trim()),
        benefits: document.getElementById('jobBenefits').value.split('
').filter(b => b.trim()),
        active: true
    };
};
