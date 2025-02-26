import { defineStore } from "pinia";
import {
  activatePipeline,
  getPipelineStatus,
  generateTag,
  getLatestGithubAction,
} from "../apiService";

export const usePipelineStore = defineStore("pipeline", {
  state: () => ({
    projects: [
      {
        id: 1,
        pipelineToken: "glptt-1d03de5d9d16a9bd8eac27403028a54e3795df7c",
        name: "Back PG",
        pipelines: {
          id: "",
          status: "",
        },
        gitHubRepo: {
          name: "bk-pg",
          status: "",
        },
        linkGithub: "https://github.com/ducvubo/bk-pg",
        linkGitlab: "https://gitlab.taphoaictu.id.vn/vuducbo/back_pg",
      },
      {
        id: 2,
        pipelineToken: "glptt-eff15efcbe31911eaa8197630f7786c627c298dd",
        name: "Inventory PG",
        pipelines: {
          id: "",
          status: "",
        },
        gitHubRepo: {
          name: "inventory_pg",
          status: "",
        },   linkGithub: "https://github.com/ducvubo/inventory_pg",
        linkGitlab: "https://gitlab.taphoaictu.id.vn/vuducbo/inventory_pg",
      },
      {
        id: 3,
        pipelineToken: "glptt-29ca0bf9c9463c91a3ef60e40bcb7bf94fd855c5",
        name: "Order PG",
        pipelines: {
          id: "",
          status: "",
        },
        gitHubRepo: {
          name: "order-pg",
          status: "",
        },   linkGithub: "https://github.com/ducvubo/order-pg",
        linkGitlab: "https://gitlab.taphoaictu.id.vn/vuducbo/order_pg",
      },
      {
        id: 4,
        pipelineToken: "glptt-82e10d310a0e07a808b89006019b9a5ad860d48e",
        name: "Employee PG",
        pipelines: {
          id: "",
          status: "",
        },
        gitHubRepo: {
          name: "employee-pg",
          status: "",
        },   linkGithub: "https://github.com/ducvubo/employee-pg",
        linkGitlab: "https://gitlab.taphoaictu.id.vn/vuducbo/employee_pg",
      },
      {
        id: 5,
        pipelineToken: "glptt-c18a72821f23df673f64c082c3ca18de0bcd5fec",
        name: "Blog PG",
        pipelines: {
          id: "",
          status: "",
        },
        gitHubRepo: {
          name: "blog-pg",
          status: "",
        },   linkGithub: "https://github.com/ducvubo/blog-pg",
        linkGitlab: "https://gitlab.taphoaictu.id.vn/vuducbo/blog_pg",
      },
      {
        id: 6,
        pipelineToken: "glptt-32961bfc4730e0d20846cb66b27647b245dc05d6",
        name: "System Management PG",
        pipelines: {
          id: "",
          status: "",
        },
        gitHubRepo: {
          name: "system-management-pg",
          status: "",
        },   linkGithub: "https://github.com/ducvubo/system-management-pg",
        linkGitlab: "https://gitlab.taphoaictu.id.vn/vuducbo/system_management_pg",
      },
      {
        id: 7,
        pipelineToken: "glptt-564553d5bdee3c8e3b3f29c5553efff797bdca52",
        name: "Restaurant PG",
        pipelines: {
          id: "",
          status: "",
        },
        gitHubRepo: {
          name: "restaurant-pg",
          status: "",
        },   linkGithub: "https://github.com/ducvubo/restaurant-pg",
        linkGitlab: "https://gitlab.taphoaictu.id.vn/vuducbo/restaurant_pg",
      },
    ],
  }),

  actions: {
    async triggerPipeline(projectId, branch, pipelineToken,nameRepo) {
      const pipeline = await generateTag("1.0.0", projectId, branch);
      this.fetchPipelineStatus(projectId, pipeline.id,nameRepo);
      localStorage.setItem(projectId, pipeline.id);
    },

    async fetchPipelineStatus(projectId, pipelineId, nameRepo) {
      const status = await getPipelineStatus(projectId, pipelineId);
      const statusGithub = await getLatestGithubAction(nameRepo);
      this.updatePipelineStatus(projectId,status.id, status.status,statusGithub,nameRepo);
    },

    addPipeline(projectId, pipeline) {
      const project = this.projects.find((p) => p.id === projectId);
      project.pipelines.push(pipeline);
    },

    updatePipelineStatus(projectId, pipelineId, status, statusGitHub = "test", nameRepo) {
      const project = this.projects.find((p) => p.id === projectId);
      project.pipelines.id = pipelineId;
      project.pipelines.status = status;
      project.gitHubRepo.status = statusGitHub;
      project.gitHubRepo.name = nameRepo;
    },
  },
});
