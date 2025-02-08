import { defineStore } from 'pinia';
import { activatePipeline, getPipelineStatus,generateTag } from '../apiService';

export const usePipelineStore = defineStore('pipeline', {
    state: () => ({
        projects: [{
            id: 1,
            pipelineToken: 'glptt-067cb6ca638547544433e8c01ea422cfc644c69d',
            name: "Back_PG",
            pipelines: {
                id: '',
                status: ''
            }
        },
        {
            id: 2,
            pipelineToken: 'glptt-3137e9903220edb496eaa26fc08e2b93ca927eee',
            name: "Inventory_pg",
            pipelines: {
                id: '',
                status: ''
            }
        },
        {
            id: 3,
            pipelineToken: 'glptt-9b2bf803a010e573c2d73913bdbe3a2b534019dc',
            name: "Order_pg",
            pipelines: {
                id: '',
                status: ''
            }
        },
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
