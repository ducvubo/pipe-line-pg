import { defineStore } from "pinia";
import {
  activatePipeline,
  getPipelineStatus,
  generateTag,
} from "../apiService";

export const usePipelineStore = defineStore("pipeline", {
  state: () => ({
    projects: [
      {
        id: 1,
        pipelineToken: "glpat-byNn6DQCuvdfz6UGxZuj",
        name: "Dish Service",
        pipelines: {
          id: "",
          status: "",
        },
        linkGithub: "https://github.com/ducvubo/bk-pg",
        linkGitlab: "http://gitlab.taphoaictu.id.vn:8929/vuducbo/back_pg",
        linkApp: "https://back.pg.taphoaictu.id.vn/swagger",
      },
      {
        id: 4,
        pipelineToken: "glptt-a5146554655f2547e09a6149d8c4c980958f0f8a",
        name: "Inventory Service",
        pipelines: {
          id: "",
          status: "",
        },
        linkGithub: "https://github.com/ducvubo/inventory_pg",
        linkGitlab: "http://gitlab.taphoaictu.id.vn:8929/vuducbo/inventory_pg",
        linkApp: "https://inventory.pg.taphoaictu.id.vn/swagger",
      },
      {
        id: 5,
        pipelineToken: "glptt-218206359f25b219b65c6aa2f46a8c2f990a1c10",
        name: "Order Service",
        pipelines: {
          id: "",
          status: "",
        },
        linkGithub: "https://github.com/ducvubo/order-pg",
        linkGitlab: "http://gitlab.taphoaictu.id.vn:8929/vuducbo/order_pg",
        linkApp: "https://order.pg.taphoaictu.id.vn/swagger",
      },
      {
        id: 3,
        pipelineToken: "glptt-cbb1e86b2a09ff6214598e4a3821b27368ea5cf8",
        name: "Employee Service",
        pipelines: {
          id: "",
          status: "",
        },
        linkGithub: "https://github.com/ducvubo/employee-pg",
        linkGitlab: "http://gitlab.taphoaictu.id.vn:8929/vuducbo/employee_pg",
        linkApp: "https://employee.pg.taphoaictu.id.vn",
      },
      {
        id: 2,
        pipelineToken: "glptt-70bb6617860bcb7b42a924f495606ec7308790d2",
        name: "Blog Service",
        pipelines: {
          id: "",
          status: "",
        },
        linkGithub: "https://github.com/ducvubo/blog-pg",
        linkGitlab: "http://gitlab.taphoaictu.id.vn:8929/vuducbo/blog_pg",
        linkApp: "https://blog.pg.taphoaictu.id.vn/swagger",
      },
      {
        id: 7,
        pipelineToken: "glptt-2aab54f7fa8d12613a1a78f3dd530654156346f6",
        name: "Internal Service",
        pipelines: {
          id: "",
          status: "",
        },
        linkGithub: "https://github.com/ducvubo/system-management-pg",
        linkGitlab:
          "http://gitlab.taphoaictu.id.vn:8929/vuducbo/system_management_pg",
        linkApp:
          "https://system.management.pg.taphoaictu.id.vn/swagger/index.html",
      },
      {
        id: 6,
        pipelineToken: "glptt-fd2eba7b0d6bdb463fe888c5db8cc91477f97ba4",
        name: "Restaurant Service",
        pipelines: {
          id: "",
          status: "",
        },
        linkGithub: "https://github.com/ducvubo/restaurant-pg",
        linkGitlab: "http://gitlab.taphoaictu.id.vn:8929/vuducbo/restaurant_pg",
        linkApp: "https://restaurant.pg.taphoaictu.id.vn",
      },
      {
        id: 8,
        pipelineToken: "glptt-7243c65ef7bf68e0ff943383bbd8d3d381fb4ea5",
        name: "Pato Service",
        pipelines: {
          id: "",
          status: "",
        },
        linkGithub: "https://github.com/ducvubo/user-pg",
        linkGitlab: "http://gitlab.taphoaictu.id.vn:8929/vuducbo/user_pg",
        linkApp: "https://pato.taphoaictu.id.vn",
      },
      {
        id: 9,
        name: "Room Service",
        pipelines: {
          id: "",
          status: "",
        },

        linkGithub: "https://github.com/ducvubo/rooms-pg",
        linkGitlab: "http://gitlab.taphoaictu.id.vn:8929/vuducbo/rooms_pg",
        linkApp: "https://rooms.pg.taphoaictu.id.vn",
      }
    ],
  }),

  actions: {
    async triggerPipeline(projectId, branch, pipelineToken, nameRepo) {
      const pipeline = await generateTag("1.0.0", projectId, branch);
      this.fetchPipelineStatus(projectId, pipeline.id, nameRepo);
      localStorage.setItem(projectId, pipeline.id);
    },

    async fetchPipelineStatus(projectId, pipelineId, nameRepo) {
      const status = await getPipelineStatus(projectId, pipelineId);
      this.updatePipelineStatus(
        projectId,
        status.id,
        status.status,
        nameRepo
      );
    },

    addPipeline(projectId, pipeline) {
      const project = this.projects.find((p) => p.id === projectId);
      project.pipelines.push(pipeline);
    },

    updatePipelineStatus(
      projectId,
      pipelineId,
      status,
      nameRepo
    ) {
      const project = this.projects.find((p) => p.id === projectId);
      project.pipelines.id = pipelineId;
      project.pipelines.status = status;
    },
  },
});
