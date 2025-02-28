<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-2">
    <PipelineCard
      v-for="project in projects"
      :key="project.id"
      :project="project"
      @trigger="
        triggerPipeline(
          project.id,
          'main',
          project.pipelineToken,
          project.gitHubRepo.name
        )
      "
    />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { usePipelineStore } from "../store/pipeline";
import PipelineCard from "./PipelineCard.vue";

const store = usePipelineStore();
const projects = store.projects;

const triggerPipeline = (projectId, branch, pipelineToken, nameRepo) => {
  store.triggerPipeline(projectId, branch, pipelineToken, nameRepo);
};

onMounted(() => {
  store.projects.forEach((project) => {
    const pipelineId = localStorage.getItem(project.id);
    if (pipelineId) project.pipelines.id = pipelineId;
    store.fetchPipelineStatus(
      project.id,
      project.pipelines.id,
      project.gitHubRepo.name
    );
  });

  setInterval(() => {
    store.projects.forEach((project) => {
      store.fetchPipelineStatus(
        project.id,
        project.pipelines.id,
        project.gitHubRepo.name
      );
    });
  }, 3000);
});
</script>
