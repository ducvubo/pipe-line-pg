import { defineStore } from 'pinia';
import { activatePipeline, getPipelineStatus,generateTag } from '../apiService';

export const usePipelineStore = defineStore('pipeline', {
    state: () => ({
        projects: [{
            id: 1,
            pipelineToken: 'glptt-057e04d69e3f25d6fa4fa1872e63a351d92c5c64',
            name: "Back_PG",
            pipelines: {
                id: '',
                status: ''
            }
        },
        {
            id: 2,
            pipelineToken: 'glptt-4b9cdb2e041e3a3d6d55ad3c9398d65331497ba9',
            name:"Inventory_PG",
            pipelines: {
                id: '',
                status: ''
            }
        },{
            id: 3,
            pipelineToken: 'glptt-f930794daa44ad53231b68444b1b138a8b692bf9',
            name:"Order_PG",
            pipelines: {
                id: '',
                status: ''
            }
        },
        {
            id: 4,
            pipelineToken: 'glptt-8ee11b937166a340ffa338b42ab7b442bb2f3b43',
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
