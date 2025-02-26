<template>
    <Card class="bg-white">
        <template #title>{{ project.name }}</template>
        {{ project.pipelineToken }}
        <template #content>
            <div class="flex flex-col items-start gap-2 my-2">
                <div>Pipeline: #{{ project.pipelines.id }}</div>
                <div class="flex items-center gap-2">
                    <span>Trạng thái pipeline:</span>
                    <Tag :severity="getSeverity(project.pipelines.status)" :value="getText(project.pipelines.status)">
                    </Tag>
                </div>
                <div class="flex items-center gap-2">
                    <span>Trạng thái push: </span>
                    <Tag :severity="getSeverityGitHub(project.gitHubRepo.status)"
                        :value="getTextGitHub(project.pipelines.status)">
                    </Tag>
                </div>
                <div class="flex items-center gap-5">
                    <a :href="project.linkGithub" target="_blank" class="text-blue-500">Github Repo</a>
                    <a :href="project.linkGitlab" target="_blank" class="text-blue-500">Gitlab Repo</a>
                </div>
            </div>
        </template>
        <template #footer>
            <Button :disabled="project.pipelines.status === 'running' || project.pipelines.status === 'created'"
                :label="getText(project.pipelines.status)" severity="success" @click="triggerPipeline" />
        </template>
    </Card>
</template>

<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
import Tag from 'primevue/tag';

const props = defineProps(['project']);
const emit = defineEmits(['trigger']);

const triggerPipeline = () => {
    emit('trigger');
};

const getSeverity = (status) => {
    switch (status) {
        case 'created':
            return 'help'
        case 'running':
            return 'info'
        case 'pending':
            return 'warn'
        case 'success':
            return 'success'
        case 'failed':
            return 'danger'
        default:
            return status
    }
}

const getText = (status) => {
    switch (status) {
        case 'created':
            return 'Đã kích hoạt'
        case 'pending':
            return 'Đang chờ'
        case 'running':
            return 'Đang chạy...'
        case 'success':
            return 'Thành công'
        case 'failed':
            return 'Lỗi chạy pipeline'
        default:
            return "Không xác định"
    }
}

const getSeverityGitHub = (status) => {
    switch (status) {
        case 'queued':
            return 'warn'
        case 'in_progress':
            return 'info'
        case 'success':
            return 'success'
        case 'failure':
            return 'danger'
        default:
            return "contrast"
    }
}

const getTextGitHub = (status) => {
    switch (status) {
        case 'queued':
            return 'Đang chờ'
        case 'in_progress':
            return 'Đang chạy...'
        case 'success':
            return 'Thành công'
        case 'failure':
            return 'Lỗi push'
        default:
            return "Không xác định"
    }
}



</script>