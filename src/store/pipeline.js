import { defineStore } from 'pinia';
import { activatePipeline, getPipelineStatus,generateTag } from '../apiService';

export const usePipelineStore = defineStore('pipeline', {
    state: () => ({
        projects: [
        {
            id: 1,
            pipelineToken: 'glptt-8bd68afb8719d1c1791d57d7352fbcb2ada7c0da',
            name: "Next CMS",
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
