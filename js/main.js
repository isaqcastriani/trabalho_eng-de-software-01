
// main.js - Lógica da página inicial (listagem de vagas)

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
            const response = await fetch('data/nonexistent_jobs.json'); // Non-existent file
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
