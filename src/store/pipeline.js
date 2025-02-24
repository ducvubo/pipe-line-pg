import { defineStore } from 'pinia';
import { activatePipeline, getPipelineStatus,generateTag } from '../apiService';

export const usePipelineStore = defineStore('pipeline', {
    state: () => ({
        projects: [
        {
            id: 1,
            pipelineToken: 'glptt-1d03de5d9d16a9bd8eac27403028a54e3795df7c',
            name: "Back PG",
            pipelines: {
                id: '',
                status: ''
            }
        },
        {
            id: 2,
            pipelineToken: 'glptt-eff15efcbe31911eaa8197630f7786c627c298dd',
            name: "Inventory PG",
            pipelines: {
                id: '',
                status: ''
            }
        },
        {
            id: 3,
            pipelineToken: 'glptt-29ca0bf9c9463c91a3ef60e40bcb7bf94fd855c5',
            name: "Order PG",
            pipelines: {
                id: '',
                status: ''
            }
        },
        {
            id: 4,
            pipelineToken: 'glptt-82e10d310a0e07a808b89006019b9a5ad860d48e',
            name: "Employee PG",
            pipelines: {
                id: '',
                status: ''
            }
        },
        {
            id: 5,
            pipelineToken: 'glptt-c18a72821f23df673f64c082c3ca18de0bcd5fec',
            name: "Blog PG",
            pipelines: {
                id: '',
                status: ''
            }
        },
        {
            id: 6,
            pipelineToken: 'glptt-32961bfc4730e0d20846cb66b27647b245dc05d6',
            name: "System Management PG",
            pipelines: {
                id: '',
                status: ''
            }
        }
    ],
    }),

    actions: {
        async triggerPipeline(projectId, branch, pipelineToken) {
            // const pipeline = await activatePipeline(projectId, branch, pipelineToken);
            const pipeline = await generateTag('1.0.0',projectId, branch);
            this.fetchPipelineStatus(projectId, pipeline.id);
            localStorage.setItem(projectId, pipeline.id);
        },

        async fetchPipelineStatus(projectId, pipelineId) {
            const status = await getPipelineStatus(projectId, pipelineId);
            // console.log(status);
            this.updatePipelineStatus(projectId, status.id, status.status);
        },

        addPipeline(projectId, pipeline) {
            const project = this.projects.find(p => p.id === projectId);
            project.pipelines.push(pipeline);
        },

        updatePipelineStatus(projectId, pipelineId, status) {
            const project = this.projects.find(p => p.id === projectId);
            project.pipelines.id = pipelineId;
            project.pipelines.status = status;
        },
    },
});
